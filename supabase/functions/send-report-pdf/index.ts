import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { Resend } from "npm:resend@2.0.0";
import { jsPDF } from "npm:jspdf@2.5.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  sessionId: string;
  reportText: string;
  name: string;
  email: string;
  phone: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, reportText, name, email, phone }: RequestBody = await req.json();

    console.log("Starting PDF report generation for session:", sessionId);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save contact to database
    const { error: contactError } = await supabase
      .from("audit_contacts")
      .insert({
        session_id: sessionId,
        name,
        email,
        phone,
        report_sent: true,
      });

    if (contactError) {
      console.error("Error saving contact:", contactError);
      throw new Error("Failed to save contact information");
    }

    console.log("Contact saved successfully");

    // Generate PDF from reportText
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add branding header
    doc.setFillColor(59, 130, 246); // blue
    doc.rect(0, 0, 210, 30, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("Raport de Automatizare AI", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Personalizat pentru ${name}`, 105, 22, { align: "center" });

    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    // Add content
    doc.setFontSize(11);
    let yPosition = 40;
    const pageHeight = 297;
    const marginBottom = 20;
    const lineHeight = 7;
    const maxWidth = 170;

    // Split report text into paragraphs and add to PDF
    const paragraphs = reportText.split("\n\n");
    
    for (const paragraph of paragraphs) {
      if (!paragraph.trim()) continue;

      // Check for headers (lines starting with #)
      if (paragraph.startsWith("# ")) {
        doc.setFontSize(16);
        doc.setFont(undefined, "bold");
        const headerText = paragraph.replace("# ", "");
        doc.text(headerText, 20, yPosition, { maxWidth });
        yPosition += lineHeight + 2;
        doc.setFontSize(11);
        doc.setFont(undefined, "normal");
      } else if (paragraph.startsWith("## ")) {
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        const headerText = paragraph.replace("## ", "");
        doc.text(headerText, 20, yPosition, { maxWidth });
        yPosition += lineHeight;
        doc.setFontSize(11);
        doc.setFont(undefined, "normal");
      } else if (paragraph.startsWith("### ")) {
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        const headerText = paragraph.replace("### ", "");
        doc.text(headerText, 20, yPosition, { maxWidth });
        yPosition += lineHeight;
        doc.setFontSize(11);
        doc.setFont(undefined, "normal");
      } else {
        // Regular paragraph
        const lines = doc.splitTextToSize(paragraph, maxWidth);
        
        for (const line of lines) {
          if (yPosition > pageHeight - marginBottom) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, 20, yPosition);
          yPosition += lineHeight;
        }
        yPosition += 3; // Extra space between paragraphs
      }

      // Check if we need a new page
      if (yPosition > pageHeight - marginBottom) {
        doc.addPage();
        yPosition = 20;
      }
    }

    // Add footer to last page
    const pageCount = doc.internal.pages.length - 1;
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Generat pentru ${name} | © ${new Date().getFullYear()} Jelco Consulting`,
      105,
      pageHeight - 10,
      { align: "center" }
    );

    console.log("PDF generated successfully");

    // Convert PDF to buffer
    const pdfBuffer = doc.output("arraybuffer");
    const pdfBlob = new Uint8Array(pdfBuffer);

    // Upload to Supabase Storage
    const fileName = `report-${sessionId}-${Date.now()}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("audit-reports")
      .upload(fileName, pdfBlob, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading PDF:", uploadError);
      throw new Error("Failed to upload PDF to storage");
    }

    console.log("PDF uploaded successfully:", fileName);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("audit-reports")
      .getPublicUrl(fileName);

    console.log("Public URL generated:", publicUrl);

    // Send email with Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #3b82f6;
              color: white !important;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #6b7280;
              font-size: 14px;
            }
            h1 { margin: 0; font-size: 28px; }
            h2 { color: #1f2937; margin-top: 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Raportul Tău Este Gata!</h1>
          </div>
          <div class="content">
            <h2>Salut, ${name}!</h2>
            <p>Raportul tău personalizat de automatizare AI a fost generat cu succes! 🚀</p>
            <p>Am analizat în detaliu business-ul tău și am pregătit recomandări concrete bazate pe AI pentru a-ți optimiza procesele și a crește eficiența.</p>
            <p style="text-align: center;">
              <a href="${publicUrl}" class="button">📥 Descarcă Raportul PDF</a>
            </p>
            <p><strong>Ce vei găsi în raport:</strong></p>
            <ul>
              <li>Analiza completă a business-ului tău</li>
              <li>Recomandări AI personalizate</li>
              <li>Oportunități de automatizare identificate</li>
              <li>Pași concreți de implementare</li>
            </ul>
            <p>Dacă ai întrebări sau vrei să discutăm despre implementare, suntem aici să te ajutăm! 💙</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Jelco Consulting | Automatizare AI pentru Business</p>
            <p>Acest email a fost trimis la ${email}</p>
          </div>
        </body>
      </html>
    `;

    const { error: emailError } = await resend.emails.send({
      from: "Jelco Consulting <onboarding@resend.dev>",
      to: [email],
      subject: `🎉 ${name}, Raportul Tău de Automatizare AI Este Gata!`,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Error sending email:", emailError);
      throw new Error("Failed to send email");
    }

    console.log("Email sent successfully to:", email);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Report sent successfully",
        pdfUrl: publicUrl,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-report-pdf function:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

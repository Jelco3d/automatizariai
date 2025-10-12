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

    console.log(`[${new Date().toISOString()}] 🚀 Starting PDF report generation for session: ${sessionId}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // FIX 3: Save contact with report_sent: false initially
    console.log(`[${new Date().toISOString()}] 💾 Saving contact information for session: ${sessionId}`);
    const { error: contactError } = await supabase
      .from("audit_contacts")
      .insert({
        session_id: sessionId,
        name,
        email,
        phone,
        report_sent: false, // Will be updated to true after successful email send
      });

    if (contactError) {
      console.error(`[${new Date().toISOString()}] ❌ Error saving contact:`, contactError);
      throw new Error("Failed to save contact information");
    }

    console.log(`[${new Date().toISOString()}] ✅ Contact saved successfully (report_sent: false)`);

    // Generate PDF from reportText with brand colors
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Brand colors
    const purple = { r: 168, g: 85, b: 247 };      // #a855f7
    const pink = { r: 236, g: 72, b: 153 };        // #ec4899
    const lightPurple = { r: 192, g: 132, b: 252 }; // #c084fc
    const lightPink = { r: 249, g: 168, b: 212 };  // #f9a8d4
    const darkText = { r: 31, g: 41, b: 55 };      // #1f2937

    // Enhanced header with gradient effect (purple-pink bands)
    doc.setFillColor(purple.r, purple.g, purple.b);
    doc.rect(0, 0, 210, 12, 'F');
    doc.setFillColor(pink.r, pink.g, pink.b);
    doc.rect(0, 12, 210, 12, 'F');
    doc.setFillColor(lightPurple.r, lightPurple.g, lightPurple.b);
    doc.rect(0, 24, 210, 6, 'F');
    
    // Header text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Raport de Automatizare AI', 105, 10, { align: 'center' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Personalizat pentru ${name}`, 105, 20, { align: 'center' });

    // Add decorative line separator
    doc.setDrawColor(lightPurple.r, lightPurple.g, lightPurple.b);
    doc.setLineWidth(0.5);
    doc.line(20, 34, 190, 34);

    // Parse and style content
    doc.setTextColor(darkText.r, darkText.g, darkText.b);
    const lines = reportText.split('\n');
    let yPosition = 42;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = 170;

    lines.forEach((line: string) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }

      // Style headers (###)
      if (line.startsWith('###')) {
        yPosition += 3;
        
        // Draw colored background box for section header
        doc.setFillColor(lightPurple.r, lightPurple.g, lightPurple.b, 0.2);
        doc.roundedRect(18, yPosition - 5, 174, 10, 2, 2, 'F');
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(purple.r, purple.g, purple.b);
        const headerText = line.replace('###', '').trim();
        doc.text(headerText, 20, yPosition + 2);
        
        doc.setTextColor(darkText.r, darkText.g, darkText.b);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        yPosition += 12;
      }
      // Style subheaders (##)
      else if (line.startsWith('##')) {
        yPosition += 2;
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(pink.r, pink.g, pink.b);
        const subheaderText = line.replace('##', '').trim();
        doc.text(subheaderText, 20, yPosition);
        
        // Add decorative line under subheader
        doc.setDrawColor(pink.r, pink.g, pink.b);
        doc.setLineWidth(0.3);
        doc.line(20, yPosition + 2, 190, yPosition + 2);
        
        doc.setTextColor(darkText.r, darkText.g, darkText.b);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        yPosition += 10;
      }
      // Style main headers (#)
      else if (line.startsWith('# ')) {
        yPosition += 3;
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(purple.r, purple.g, purple.b);
        const mainHeaderText = line.replace('# ', '').trim();
        doc.text(mainHeaderText, 20, yPosition);
        
        // Add decorative line
        doc.setDrawColor(purple.r, purple.g, purple.b);
        doc.setLineWidth(0.5);
        doc.line(20, yPosition + 2, 100, yPosition + 2);
        
        doc.setTextColor(darkText.r, darkText.g, darkText.b);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        yPosition += 12;
      }
      // Style bullet points
      else if (line.trim().startsWith('-')) {
        const bulletText = line.replace(/^-\s*/, '').trim();
        const wrappedLines = doc.splitTextToSize(bulletText, contentWidth - 10);
        
        // Draw custom bullet (circle)
        doc.setFillColor(pink.r, pink.g, pink.b);
        doc.circle(22, yPosition - 1.5, 1, 'F');
        
        // Draw text
        wrappedLines.forEach((wrappedLine: string) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(wrappedLine, 27, yPosition);
          yPosition += 5;
        });
        yPosition += 1;
      }
      // Style numbered lists
      else if (line.trim().match(/^\d+\./)) {
        const match = line.trim().match(/^(\d+)\.\s*(.+)$/);
        if (match) {
          const number = match[1];
          const text = match[2];
          const wrappedLines = doc.splitTextToSize(text, contentWidth - 12);
          
          // Draw colored circle with number
          doc.setFillColor(purple.r, purple.g, purple.b);
          doc.circle(23, yPosition - 1.5, 2.5, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(9);
          doc.setFont('helvetica', 'bold');
          doc.text(number, 23, yPosition, { align: 'center' });
          
          // Draw text
          doc.setTextColor(darkText.r, darkText.g, darkText.b);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          wrappedLines.forEach((wrappedLine: string) => {
            if (yPosition > pageHeight - 30) {
              doc.addPage();
              yPosition = 20;
            }
            doc.text(wrappedLine, 29, yPosition);
            yPosition += 5;
          });
          yPosition += 1;
        }
      }
      // Style bold text (**text**)
      else if (line.includes('**')) {
        const wrappedLines = doc.splitTextToSize(line, contentWidth);
        wrappedLines.forEach((wrappedLine: string) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
          }
          
          if (wrappedLine.includes('**')) {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(purple.r, purple.g, purple.b);
            const cleanText = wrappedLine.replace(/\*\*/g, '');
            doc.text(cleanText, 20, yPosition);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(darkText.r, darkText.g, darkText.b);
          } else {
            doc.text(wrappedLine, 20, yPosition);
          }
          yPosition += 5;
        });
      }
      // Regular text
      else if (line.trim()) {
        const wrappedLines = doc.splitTextToSize(line, contentWidth);
        wrappedLines.forEach((wrappedLine: string) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(wrappedLine, 20, yPosition);
          yPosition += 5;
        });
      } else {
        // Empty line - add spacing
        yPosition += 3;
      }
    });

    // Enhanced footer with brand colors on all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      // Footer gradient bands
      const footerY = pageHeight - 20;
      doc.setFillColor(lightPurple.r, lightPurple.g, lightPurple.b, 0.3);
      doc.rect(0, footerY, 210, 8, 'F');
      doc.setFillColor(lightPink.r, lightPink.g, lightPink.b, 0.3);
      doc.rect(0, footerY + 8, 210, 12, 'F');
      
      // Page number
      doc.setFontSize(9);
      doc.setTextColor(purple.r, purple.g, purple.b);
      doc.setFont('helvetica', 'normal');
      doc.text(`Pagina ${i} din ${totalPages}`, 105, footerY + 5, { align: 'center' });
      
      // Contact info
      doc.setFontSize(8);
      doc.setTextColor(darkText.r, darkText.g, darkText.b);
      doc.text('Jelco Consulting | AI Automatizari | aiautomatizari@gmail.com', 105, footerY + 14, { align: 'center' });
    }

    // Convert PDF to buffer
    const pdfBuffer = doc.output("arraybuffer");
    const pdfBlob = new Uint8Array(pdfBuffer);

    console.log(`[${new Date().toISOString()}] 📄 PDF generated successfully with brand colors (${pdfBuffer.byteLength} bytes)`);

    // Upload to Supabase Storage
    const fileName = `report-${sessionId}-${Date.now()}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("audit-reports")
      .upload(fileName, pdfBlob, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.error(`[${new Date().toISOString()}] ❌ Error uploading PDF:`, uploadError);
      throw new Error("Failed to upload PDF to storage");
    }

    console.log(`[${new Date().toISOString()}] ✅ PDF uploaded successfully: ${fileName}`);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("audit-reports")
      .getPublicUrl(fileName);

    console.log(`[${new Date().toISOString()}] 🔗 Public URL generated: ${publicUrl}`);

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
              background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
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
              background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
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
      console.error(`[${new Date().toISOString()}] ❌ Error sending email:`, emailError);
      throw new Error("Failed to send email");
    }

    console.log(`[${new Date().toISOString()}] ✅ Email sent successfully to: ${email}`);

    // FIX 3: Update report_sent flag ONLY after successful email delivery
    const { error: updateError } = await supabase
      .from("audit_contacts")
      .update({ report_sent: true })
      .eq('session_id', sessionId)
      .eq('email', email);

    if (updateError) {
      console.error(`[${new Date().toISOString()}] ⚠️ Warning: Failed to update report_sent flag:`, updateError);
    } else {
      console.log(`[${new Date().toISOString()}] ✅ Report status updated: report_sent = true`);
    }

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
    console.error(`[${new Date().toISOString()}] ❌ Error in send-report-pdf function:`, {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
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

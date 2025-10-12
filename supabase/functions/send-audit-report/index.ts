import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  sessionId: string;
  name: string;
  email: string;
  phone: string;
  downloadUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, name, email, phone, downloadUrl }: RequestBody = await req.json();

    console.log("Sending report email for session:", sessionId);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Save contact information
    const { error: contactError } = await supabaseClient
      .from("audit_contacts")
      .upsert({
        session_id: sessionId,
        name,
        email,
        phone,
        report_sent: true,
      }, {
        onConflict: 'session_id'
      });

    if (contactError) {
      console.error("Error saving contact:", contactError);
    }

    // Send email with PDF download link
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: white;
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .content { 
            padding: 40px 30px;
          }
          .content h2 {
            color: #667eea;
            font-size: 20px;
            margin-top: 0;
          }
          .content ul {
            padding-left: 20px;
          }
          .content ul li {
            margin-bottom: 8px;
          }
          .button { 
            display: inline-block; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white !important; 
            padding: 16px 40px; 
            text-decoration: none; 
            border-radius: 50px; 
            font-weight: bold; 
            margin: 20px 0;
            transition: transform 0.2s;
          }
          .button:hover {
            transform: scale(1.05);
          }
          .info-box {
            background: #f8f9fa;
            padding: 20px;
            border-left: 4px solid #667eea;
            border-radius: 4px;
            margin: 20px 0;
          }
          .info-box strong {
            color: #667eea;
          }
          .divider {
            height: 1px;
            background: #e0e0e0;
            margin: 30px 0;
          }
          .footer { 
            text-align: center; 
            color: #666; 
            font-size: 14px; 
            padding: 30px;
            background-color: #f8f9fa;
          }
          .footer strong {
            color: #667eea;
            display: block;
            margin-bottom: 8px;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Raportul Tău PDF Este Gata!</h1>
          </div>
          
          <div class="content">
            <p>Salut <strong>${name}</strong>! 👋</p>
            
            <p>Raportul tău profesional în format PDF este gata pentru download. Acest document include:</p>
            
            <ul>
              <li>✅ <strong>Rezumat executiv generat de AI</strong> - Analiză profesională personalizată</li>
              <li>✅ <strong>Analiza completă a afacerii</strong> - Toate detaliile discutate</li>
              <li>✅ <strong>Analiza provocărilor</strong> - Pain points și obiective identificate</li>
              <li>✅ <strong>Soluții AI personalizate</strong> - Recomandări concrete și acționabile</li>
              <li>✅ <strong>Plan de implementare</strong> - Roadmap structurat pe faze</li>
              <li>✅ <strong>Analiza ROI</strong> - Impact estimat și beneficii măsurabile</li>
              <li>✅ <strong>Pași următori</strong> - Ce poți face ACUM pentru a începe</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="${downloadUrl}" class="button">📄 Descarcă Raportul PDF</a>
            </div>
            
            <div class="info-box">
              <strong>📌 Important:</strong> Link-ul este valabil 7 zile. Descarcă-l acum pentru a-l salva permanent pe computerul tău.
            </div>
            
            <div class="divider"></div>
            
            <h2>🎯 Vrei să Implementezi Soluțiile?</h2>
            
            <p>Hai să discutăm despre cum putem transforma aceste insights în rezultate concrete pentru afacerea ta!</p>
            
            <p><strong>Programează o consultație strategică GRATUITĂ de 30 de minute:</strong></p>
            
            <ul>
              <li>✅ Analizăm împreună raportul</li>
              <li>✅ Identificăm quick wins (rezultate rapide)</li>
              <li>✅ Creăm un plan de implementare concret</li>
              <li>✅ Răspund la toate întrebările tale</li>
            </ul>
            
            <div style="text-align: center;">
              <a href="https://calendly.com/aiautomatizari/automatizariai" class="button">📅 Programează Consultația</a>
            </div>
          </div>
          
          <div class="footer">
            <strong>AI AUTOMATIZĂRI</strong>
            <p>Transformăm afaceri prin automatizare inteligentă și soluții AI personalizate.</p>
            <p style="margin-top: 16px; font-size: 12px; color: #999;">
              © ${new Date().getFullYear()} AI Automatizări. Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "AI Automatizări <onboarding@resend.dev>",
      to: email,
      subject: `🚀 Raportul Tău PDF - Analiza AI Personalizată`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Raportul a fost trimis cu succes pe email!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-audit-report function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

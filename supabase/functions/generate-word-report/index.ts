import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";
import { 
  Document, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  AlignmentType, 
  Packer,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "npm:docx@8.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  sessionId: string;
  name: string;
  email: string;
  phone: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, name, email, phone }: RequestBody = await req.json();
    console.log("Generating report for session:", sessionId);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    // 1. Fetch insights and messages
    const { data: insights, error: insightsError } = await supabaseClient
      .from('audit_insights')
      .select('*')
      .eq('session_id', sessionId)
      .maybeSingle();

    const { data: messages, error: messagesError } = await supabaseClient
      .from('audit_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error("Error fetching messages:", messagesError);
      throw messagesError;
    }

    // 2. If no insights, extract from conversation
    let extractedInsights = insights;
    if (!extractedInsights) {
      console.log("No insights found, extracting from conversation...");
      
      const conversationText = messages
        .filter((m: any) => m.role === 'user' || m.role === 'assistant')
        .map((m: any) => `${m.role}: ${m.content}`)
        .join('\n');

      const extractResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { 
              role: "system", 
              content: "Extrage informații structurate despre afacere din conversație." 
            },
            { role: "user", content: conversationText }
          ],
          tools: [{
            type: "function",
            function: {
              name: "extract_business_insights",
              description: "Extract structured business information from conversation",
              parameters: {
                type: "object",
                properties: {
                  business_type: { type: "string" },
                  business_description: { type: "string" },
                  painpoints: { type: "array", items: { type: "string" } },
                  goals: { type: "array", items: { type: "string" } },
                  tools_used: { type: "array", items: { type: "string" } },
                  desired_solutions: { type: "array", items: { type: "string" } },
                  target_audience: { type: "string" },
                  team_size: { type: "string" }
                }
              }
            }
          }],
          tool_choice: { type: "function", function: { name: "extract_business_insights" } }
        }),
      });

      const extractData = await extractResponse.json();
      const toolCall = extractData.choices[0].message.tool_calls?.[0];
      if (toolCall) {
        extractedInsights = JSON.parse(toolCall.function.arguments);
        
        // Save to database
        await supabaseClient.from('audit_insights').insert({
          session_id: sessionId,
          ...extractedInsights
        });
      }
    }

    // 3. Generate AI Summary
    console.log("Generating AI summary...");
    const summaryResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `Ești un consultant senior în automatizare și AI pentru afaceri B2B.

Generează un rezumat executiv PROFESIONAL și ACȚIONABIL de 200-300 cuvinte care să includă:

1. **Contextul afacerii clientului** - Ce face, cine servește, câți oameni are în echipă
2. **Provocările identificate** - Top 3-5 pain points concrete
3. **Oportunități de automatizare cu AI** - Soluții specifice pentru provocările lor
4. **Impact estimat** - Timp economisit, costuri reduse, creștere accelerată
5. **Pași următori recomandați** - Acțiuni concrete pe care clientul le poate face

TON: Profesional, empatic, orientat pe soluții concrete și rezultate măsurabile.
FORMAT: Scrie în paragrafe scurte (3-4 propoziții), folosește bullets pentru clarity.` 
          },
          { 
            role: "user", 
            content: `Analizează următoarea conversație și insights-uri extrase pentru a genera rezumatul executiv:

**Insights Structurate:**
${JSON.stringify(extractedInsights, null, 2)}

**Conversație Completă:**
${messages.map((m: any) => `${m.role}: ${m.content}`).join('\n\n')}

Generează un rezumat executiv profesional, acționabil și personalizat pentru această afacere.` 
          }
        ],
        temperature: 0.7,
      }),
    });

    const summaryData = await summaryResponse.json();
    const aiGeneratedSummary = summaryData.choices[0].message.content;

    console.log("AI summary generated successfully");

    // 4. Download logo
    const logoUrl = `${Deno.env.get('SUPABASE_URL')}/storage/v1/object/public/lovable-uploads/new-logo.png`;
    const logoResponse = await fetch(logoUrl);
    const logoBuffer = await logoResponse.arrayBuffer();

    // 5. Build Word document
    console.log("Building Word document...");

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // Cover Page
          new Paragraph({
            children: [
              new ImageRun({
                data: logoBuffer,
                transformation: {
                  width: 150,
                  height: 150,
                },
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "RAPORT ANALIZA AI",
                size: 48,
                bold: true,
                color: "667eea",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: `Pentru ${extractedInsights?.business_type || "Afacerea Ta"}`,
                size: 28,
                color: "764ba2",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          
          // Info table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Client:", bold: true })] })],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph(name)],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Email:", bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph(email)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: "Data:", bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph(new Date().toLocaleDateString('ro-RO'))],
                  }),
                ],
              }),
            ],
          }),
          
          // Page Break
          new Paragraph({ pageBreakBefore: true }),
          
          // Executive Summary
          new Paragraph({
            children: [
              new TextRun({
                text: "REZUMAT EXECUTIV",
                size: 36,
                bold: true,
                color: "667eea",
              }),
            ],
            spacing: { after: 400 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: aiGeneratedSummary,
                size: 24,
              }),
            ],
            spacing: { after: 600, line: 360 },
          }),
          
          // Business Profile
          new Paragraph({ pageBreakBefore: true }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFILUL AFACERII",
                size: 36,
                bold: true,
                color: "667eea",
              }),
            ],
            spacing: { after: 400 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Tip Afacere",
                size: 28,
                bold: true,
                color: "764ba2",
              }),
            ],
            spacing: { before: 240, after: 120 },
          }),
          new Paragraph({
            text: extractedInsights?.business_type || "N/A",
            spacing: { after: 240 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Descriere Afacere",
                size: 28,
                bold: true,
                color: "764ba2",
              }),
            ],
            spacing: { before: 240, after: 120 },
          }),
          new Paragraph({
            text: extractedInsights?.business_description || "N/A",
            spacing: { after: 240 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Public Țintă",
                size: 28,
                bold: true,
                color: "764ba2",
              }),
            ],
            spacing: { before: 240, after: 120 },
          }),
          new Paragraph({
            text: extractedInsights?.target_audience || "N/A",
            spacing: { after: 240 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Mărime Echipă",
                size: 28,
                bold: true,
                color: "764ba2",
              }),
            ],
            spacing: { before: 240, after: 120 },
          }),
          new Paragraph({
            text: extractedInsights?.team_size || "N/A",
            spacing: { after: 240 },
          }),
          
          // Situation Analysis
          new Paragraph({ pageBreakBefore: true }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "ANALIZA SITUAȚIEI",
                size: 36,
                bold: true,
                color: "667eea",
              }),
            ],
            spacing: { after: 400 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "⚠️ Provocări Identificate",
                size: 28,
                bold: true,
                color: "764ba2",
              }),
            ],
            spacing: { before: 240, after: 120 },
          }),
          
          ...(extractedInsights?.painpoints || []).map((painPoint: string) => 
            new Paragraph({
              text: `• ${painPoint}`,
              spacing: { after: 120 },
              bullet: { level: 0 },
            })
          ),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "🎯 Obiective",
                size: 28,
                bold: true,
                color: "764ba2",
              }),
            ],
            spacing: { before: 360, after: 120 },
          }),
          
          ...(extractedInsights?.goals || []).map((goal: string) => 
            new Paragraph({
              text: `• ${goal}`,
              spacing: { after: 120 },
              bullet: { level: 0 },
            })
          ),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "🛠️ Instrumente Actuale",
                size: 28,
                bold: true,
                color: "764ba2",
              }),
            ],
            spacing: { before: 360, after: 120 },
          }),
          
          ...(extractedInsights?.tools_used || []).map((tool: string) => 
            new Paragraph({
              text: `• ${tool}`,
              spacing: { after: 120 },
              bullet: { level: 0 },
            })
          ),
          
          // Recommended Solutions
          new Paragraph({ pageBreakBefore: true }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "SOLUȚII RECOMANDATE",
                size: 36,
                bold: true,
                color: "667eea",
              }),
            ],
            spacing: { after: 400 },
          }),
          
          ...(extractedInsights?.desired_solutions || []).map((solution: string) => 
            new Paragraph({
              text: `✅ ${solution}`,
              spacing: { after: 120 },
              bullet: { level: 0 },
            })
          ),
          
          // Next Steps
          new Paragraph({ pageBreakBefore: true }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "PAȘI URMĂTORI",
                size: 36,
                bold: true,
                color: "667eea",
              }),
            ],
            spacing: { after: 400 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "🎯 Consultație Strategică GRATUITĂ",
                size: 28,
                bold: true,
                color: "764ba2",
              }),
            ],
            spacing: { before: 240, after: 240 },
          }),
          
          new Paragraph({
            text: "Pregătit să transformi aceste insights în rezultate concrete? Programează o consultație strategică de 30 de minute pentru a discuta implementarea soluțiilor personalizate pentru afacerea ta!",
            spacing: { after: 360 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "📅 Programează aici:",
                bold: true,
              }),
            ],
            spacing: { after: 120 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "https://calendly.com/aiautomatizari/automatizariai",
                color: "667eea",
                underline: {},
              }),
            ],
            spacing: { after: 600 },
          }),
          
          // Footer
          new Paragraph({
            children: [
              new TextRun({
                text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
                color: "cccccc",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 600, after: 240 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "AI AUTOMATIZĂRI",
                size: 24,
                bold: true,
                color: "667eea",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Transformăm afaceri prin automatizare inteligentă și soluții AI personalizate.",
                size: 20,
                color: "666666",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: `© ${new Date().getFullYear()} AI Automatizări. Toate drepturile rezervate.`,
                size: 18,
                color: "999999",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
      }],
    });

    // 6. Generate buffer
    const buffer = await Packer.toBuffer(doc);
    console.log("Word document generated, buffer size:", buffer.byteLength);

    // 7. Upload to Supabase Storage
    const fileName = `raport-${sessionId}-${Date.now()}.docx`;
    const { error: uploadError } = await supabaseClient.storage
      .from('audit-reports')
      .upload(fileName, buffer, {
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        upsert: false
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw uploadError;
    }

    // 8. Get public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('audit-reports')
      .getPublicUrl(fileName);

    console.log("Document uploaded successfully:", publicUrl);

    // 9. Save contact info
    await supabaseClient.from('audit_contacts').insert({
      session_id: sessionId,
      name,
      email,
      phone,
      report_sent: true
    });

    // 10. Send email
    console.log("Sending email...");
    const { error: emailError } = await resend.emails.send({
      from: "AI Automatizări <onboarding@resend.dev>",
      to: [email],
      subject: `🚀 Raportul Tău Word - Analiza AI pentru ${extractedInsights?.business_type || 'Afacerea Ta'}`,
      html: `
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
              <h1>🎉 Raportul Tău Word Este Gata!</h1>
            </div>
            
            <div class="content">
              <p>Salut <strong>${name}</strong>! 👋</p>
              
              <p>Raportul tău personalizat Word este gata pentru download. Acest document include:</p>
              
              <ul>
                <li>✅ <strong>Rezumat executiv generat de AI</strong> - Analiză profesională personalizată</li>
                <li>✅ <strong>Profilul complet al afacerii</strong> - Toate detaliile discutate</li>
                <li>✅ <strong>Analiza provocărilor</strong> - Pain points și obiective identificate</li>
                <li>✅ <strong>Soluții recomandate</strong> - Plan concret de automatizare</li>
                <li>✅ <strong>Pași următori</strong> - Ce poți face ACUM pentru a începe</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${publicUrl}" class="button">📄 Descarcă Raportul Word</a>
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
      `
    });

    if (emailError) {
      console.error("Email send error:", emailError);
      throw emailError;
    }

    console.log("Email sent successfully!");

    return new Response(
      JSON.stringify({ 
        success: true,
        documentUrl: publicUrl 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error in generate-word-report function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);

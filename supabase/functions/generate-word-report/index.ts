import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";
import PDFDocument from "npm:pdfkit@0.15.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  sessionId: string;
  name?: string;
  email?: string;
  phone?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, name, email, phone }: RequestBody = await req.json();
    const generateOnly = !name && !email && !phone;
    console.log("Generating report for session:", sessionId);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch insights
    const { data: insights, error: insightsError } = await supabaseClient
      .from('audit_insights')
      .select('*')
      .eq('session_id', sessionId)
      .maybeSingle();

    // Fetch messages
    const { data: messages, error: messagesError } = await supabaseClient
      .from('audit_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error("Error fetching messages:", messagesError);
      throw messagesError;
    }

    // If no insights, extract from conversation
    let finalInsights = insights;
    if (!insights) {
      console.log("No insights found, extracting from conversation...");
      
      const conversationText = (messages || [])
        .filter((m: any) => m.role === 'user' || m.role === 'assistant')
        .map((m: any) => `${m.role}: ${m.content}`)
        .join('\n');

      const extractResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: `Extrage următoarele informații din conversație în format JSON:
- business_type: tipul de afacere
- business_description: descriere scurtă
- target_audience: publicul țintă
- team_size: mărimea echipei
- painpoints: array de provocări
- goals: array de obiective
- tools_used: array de instrumente folosite
- desired_solutions: array de soluții dorite`
            },
            { role: "user", content: conversationText }
          ],
          tools: [{
            type: "function",
            function: {
              name: "extract_business_insights",
              description: "Extract business insights from conversation",
              parameters: {
                type: "object",
                properties: {
                  business_type: { type: "string" },
                  business_description: { type: "string" },
                  target_audience: { type: "string" },
                  team_size: { type: "string" },
                  painpoints: { type: "array", items: { type: "string" } },
                  goals: { type: "array", items: { type: "string" } },
                  tools_used: { type: "array", items: { type: "string" } },
                  desired_solutions: { type: "array", items: { type: "string" } }
                },
                required: ["business_type", "painpoints", "goals"]
              }
            }
          }],
          tool_choice: { type: "function", function: { name: "extract_business_insights" } }
        }),
      });

      const extractData = await extractResponse.json();
      const toolCall = extractData.choices[0].message.tool_calls?.[0];
      
      if (toolCall) {
        const extractedData = JSON.parse(toolCall.function.arguments);
        
        // Save to database
        const { data: savedInsights } = await supabaseClient
          .from('audit_insights')
          .insert({
            session_id: sessionId,
            ...extractedData
          })
          .select()
          .single();
        
        finalInsights = savedInsights;
      }
    }

    // Generate AI Summary
    console.log("Generating AI summary...");
    const summaryResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
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
FORMAT: Scrie în paragrafe scurte (3-4 propoziții), folosește structură clară.` 
          },
          { 
            role: "user", 
            content: `Analizează următoarea conversație și insights-uri extrase pentru a genera rezumatul executiv:

**Insights Structurate:**
${JSON.stringify(finalInsights, null, 2)}

**Conversație Completă:**
${(messages || []).map((m: any) => `${m.role}: ${m.content}`).join('\n\n')}

Generează un rezumat executiv profesional, acționabil și personalizat pentru această afacere.` 
          }
        ],
        temperature: 0.7,
      }),
    });

    const summaryData = await summaryResponse.json();
    const aiGeneratedSummary = summaryData.choices[0].message.content;
    console.log("AI summary generated successfully");

    // Download logo
    console.log("Downloading logo...");
    const logoResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/storage/v1/object/public/lovable-uploads/new-logo.png`);
    const logoBuffer = await logoResponse.arrayBuffer();

    // Build PDF document
    console.log("Building PDF document...");
    
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
      bufferPages: true,
      info: {
        Title: 'Raport Analiza AI',
        Author: 'AI Automatizări',
        Subject: `Analiză pentru ${finalInsights?.business_type || "Afacerea Ta"}`,
      }
    });

    const chunks: Uint8Array[] = [];
    doc.on('data', (chunk: Uint8Array) => chunks.push(chunk));
    
    const pdfPromise = new Promise<Uint8Array>((resolve, reject) => {
      doc.on('end', () => {
        const result = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
        let offset = 0;
        for (const chunk of chunks) {
          result.set(chunk, offset);
          offset += chunk.length;
        }
        resolve(result);
      });
      doc.on('error', reject);
    });

    // Helper functions
    const addTitle = (text: string, size = 24, color = '#667eea') => {
      doc.fontSize(size).fillColor(color).font('Helvetica-Bold').text(text, { align: 'left' });
      doc.moveDown(0.5);
    };

    const addSubtitle = (text: string) => {
      doc.fontSize(16).fillColor('#764ba2').font('Helvetica-Bold').text(text);
      doc.moveDown(0.3);
    };

    const addText = (text: string, fontSize = 11) => {
      doc.fontSize(fontSize).fillColor('#333333').font('Helvetica').text(text, { align: 'justify' });
      doc.moveDown(0.5);
    };

    const addBullet = (text: string) => {
      doc.fontSize(11).fillColor('#333333').font('Helvetica').text(`• ${text}`, { indent: 20 });
      doc.moveDown(0.3);
    };

    // Cover Page
    try {
      doc.image(logoBuffer, (doc.page.width - 150) / 2, 100, { width: 150 });
    } catch (e) {
      console.error("Error adding logo:", e);
    }
    
    doc.moveDown(10);
    doc.fontSize(32).fillColor('#667eea').font('Helvetica-Bold').text('RAPORT ANALIZA AI', { align: 'center' });
    doc.moveDown(1);
    doc.fontSize(18).fillColor('#764ba2').font('Helvetica').text(`Pentru ${finalInsights?.business_type || "Afacerea Ta"}`, { align: 'center' });
    doc.moveDown(3);

    // Info Box
    doc.rect(100, doc.y, doc.page.width - 200, 100).fillAndStroke('#f8f9fa', '#667eea');
    const infoY = doc.y - 85;
    doc.fontSize(11).fillColor('#333333').font('Helvetica-Bold').text('Client:', 120, infoY);
    doc.font('Helvetica').text(name || 'N/A', 200, infoY);
    doc.font('Helvetica-Bold').text('Email:', 120, infoY + 25);
    doc.font('Helvetica').text(email || 'N/A', 200, infoY + 25);
    doc.font('Helvetica-Bold').text('Data:', 120, infoY + 50);
    doc.font('Helvetica').text(new Date().toLocaleDateString('ro-RO'), 200, infoY + 50);
    doc.moveDown(4);

    // Executive Summary
    doc.addPage();
    addTitle('REZUMAT EXECUTIV');
    addText(aiGeneratedSummary, 12);
    doc.moveDown(1);

    // Business Profile
    doc.addPage();
    addTitle('PROFILUL AFACERII');
    
    addSubtitle('Tip Afacere');
    addText(finalInsights?.business_type || 'N/A');
    
    addSubtitle('Descriere Afacere');
    addText(finalInsights?.business_description || 'N/A');
    
    addSubtitle('Public Țintă');
    addText(finalInsights?.target_audience || 'N/A');
    
    addSubtitle('Mărime Echipă');
    addText(finalInsights?.team_size || 'N/A');

    // Situation Analysis
    doc.addPage();
    addTitle('ANALIZA SITUAȚIEI');
    
    addSubtitle('⚠️ Provocări Identificate');
    (finalInsights?.painpoints || []).forEach((painPoint: string) => {
      addBullet(painPoint);
    });
    doc.moveDown(1);
    
    addSubtitle('🎯 Obiective');
    (finalInsights?.goals || []).forEach((goal: string) => {
      addBullet(goal);
    });
    doc.moveDown(1);
    
    addSubtitle('🛠️ Instrumente Actuale');
    (finalInsights?.tools_used || []).forEach((tool: string) => {
      addBullet(tool);
    });

    // Recommended Solutions
    doc.addPage();
    addTitle('SOLUȚII RECOMANDATE');
    (finalInsights?.desired_solutions || []).forEach((solution: string) => {
      addBullet(`✅ ${solution}`);
    });

    // Next Steps
    doc.addPage();
    addTitle('PAȘI URMĂTORI');
    
    addSubtitle('🎯 Consultație Strategică GRATUITĂ');
    addText('Pregătit să transformi aceste insights în rezultate concrete? Programează o consultație strategică de 30 de minute pentru a discuta implementarea soluțiilor personalizate pentru afacerea ta!');
    
    doc.fontSize(11).fillColor('#333333').font('Helvetica-Bold').text('📅 Programează aici:');
    doc.fontSize(11).fillColor('#667eea').font('Helvetica').text('https://calendly.com/aiautomatizari/automatizariai', { link: 'https://calendly.com/aiautomatizari/automatizariai' });
    doc.moveDown(2);

    // Footer
    doc.fontSize(10).fillColor('#cccccc').font('Helvetica').text('━'.repeat(80), { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(14).fillColor('#667eea').font('Helvetica-Bold').text('AI AUTOMATIZĂRI', { align: 'center' });
    doc.moveDown(0.3);
    doc.fontSize(10).fillColor('#666666').font('Helvetica').text('Transformăm afaceri prin automatizare inteligentă și soluții AI personalizate.', { align: 'center' });
    doc.moveDown(0.3);
    doc.fontSize(9).fillColor('#999999').text(`© ${new Date().getFullYear()} AI Automatizări. Toate drepturile rezervate.`, { align: 'center' });

    // Finalize PDF
    doc.end();
    const buffer = await pdfPromise;

    // Upload to storage
    const fileName = `raport-${sessionId}-${Date.now()}.pdf`;
    console.log("Uploading to storage:", fileName);
    
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('audit-reports')
      .upload(fileName, buffer, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('audit-reports')
      .getPublicUrl(fileName);

    console.log("Document PDF generat:", publicUrl);

    // Save contact
    await supabaseClient.from('audit_contacts').insert({
      session_id: sessionId,
      name,
      email,
      phone,
      report_sent: true,
    });

    // Send email
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "AI Automatizări <onboarding@resend.dev>",
      to: [email],
      subject: `🚀 Raportul Tău PDF - Analiza AI pentru ${finalInsights?.business_type || "Afacerea Ta"}`,
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
              <h1>🎉 Raportul Tău PDF Este Gata!</h1>
            </div>
            
            <div class="content">
              <p>Salut <strong>${name}</strong>! 👋</p>
              
              <p>Raportul tău profesional în format PDF este gata pentru download. Acest document include:</p>
              
              <ul>
                <li>✅ <strong>Rezumat executiv generat de AI</strong> - Analiză profesională personalizată</li>
                <li>✅ <strong>Profilul complet al afacerii</strong> - Toate detaliile discutate</li>
                <li>✅ <strong>Analiza provocărilor</strong> - Pain points și obiective identificate</li>
                <li>✅ <strong>Soluții recomandate</strong> - Plan concret de automatizare</li>
                <li>✅ <strong>Pași următori</strong> - Ce poți face ACUM pentru a începe</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${publicUrl}" class="button">📄 Descarcă Raportul PDF</a>
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

    console.log("Email trimis cu succes!");

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

  } catch (error: any) {
    console.error("Error in generate-word-report function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);

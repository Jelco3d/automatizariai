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

    // Generate AI-Powered Personalized Report Content
    console.log("Generating AI-powered personalized report...");
    const reportResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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

Generează un raport profesional personalizat pentru clientul de mai jos. Raportul trebuie să fie CONCIS (maximum 8-10 pagini când e tipărit) și să conțină exact următoarele secțiuni în format JSON:

{
  "executive_summary": "Rezumat executiv de 250-300 cuvinte: Context afacere, provocări, oportunități AI, impact estimat, pași următori",
  "business_analysis": "Analiză detaliată 200-250 cuvinte: Industrie, maturitate, readiness score, public țintă, echipă",
  "challenges_deep_dive": "Analiză provocări 200-250 cuvinte: Fiecare pain point cu impact și cauze",
  "ai_solutions": "Soluții AI personalizate 300-350 cuvinte: 3-5 soluții concrete cu tehnologii specifice și beneficii",
  "implementation_roadmap": "Plan implementare 250-300 cuvinte: Faze (Quick Wins 0-1 luni, Core Systems 1-3 luni, Advanced 3-6 luni)",
  "roi_analysis": "Analiză ROI 200-250 cuvinte: Investiție estimată, economii timp/costuri, breakeven",
  "next_steps": "Pași concreți 150-200 cuvinte: Ce face clientul ACUM (3-4 acțiuni concrete)"
}

**EXTREM DE IMPORTANT:**
- Scrie CONCIS și LA OBIECT - respectă limitele de cuvinte
- TON: Profesional, consultativ, orientat pe ROI măsurabil
- Folosește date concrete când sunt disponibile
- Personalizează fiecare secțiune pentru industriea și situația specifică
- Nu repeta informații între secțiuni` 
          },
          { 
            role: "user", 
            content: `Generează raportul personalizat pentru acest client:

**Date Structurate:**
${JSON.stringify(finalInsights, null, 2)}

**Conversație Completă:**
${(messages || []).map((m: any) => `${m.role}: ${m.content}`).join('\n\n')}

Returnează DOAR JSON-ul cu cele 7 secțiuni, fără text suplimentar.` 
          }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    const reportData = await reportResponse.json();
    let aiReport;
    try {
      const content = reportData.choices[0].message.content;
      // Try to extract JSON from markdown code block if present
      const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      aiReport = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse AI report:", e);
      // Fallback to basic report
      aiReport = {
        executive_summary: reportData.choices[0].message.content || "Raport generat pentru afacerea dvs.",
        business_analysis: `Industrie: ${finalInsights?.industry || 'N/A'}`,
        challenges_deep_dive: (finalInsights?.painpoints || []).join(', '),
        ai_solutions: (finalInsights?.desired_solutions || []).join(', '),
        implementation_roadmap: "Plan de implementare personalizat",
        roi_analysis: "Analiză ROI estimativă",
        next_steps: "Programează o consultație"
      };
    }
    console.log("AI report generated successfully");

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
    addText(aiReport.executive_summary, 12);
    doc.moveDown(1);

    // Business Analysis
    doc.addPage();
    addTitle('ANALIZA AFACERII');
    addText(aiReport.business_analysis, 11);
    doc.moveDown(1);
    
    // Add key metrics if available
    if (finalInsights?.industry || finalInsights?.automation_readiness_score) {
      doc.fontSize(10).fillColor('#666666').font('Helvetica-Bold').text('Metrici Cheie:');
      doc.moveDown(0.3);
      if (finalInsights?.industry) {
        addBullet(`Industrie: ${finalInsights.industry}`);
      }
      if (finalInsights?.company_maturity) {
        addBullet(`Maturitate: ${finalInsights.company_maturity}`);
      }
      if (finalInsights?.automation_readiness_score) {
        addBullet(`Automation Readiness Score: ${finalInsights.automation_readiness_score}/10`);
      }
      doc.moveDown(1);
    }

    // Challenges Deep Dive
    doc.addPage();
    addTitle('PROVOCĂRI ȘI OPORTUNITĂȚI');
    addText(aiReport.challenges_deep_dive, 11);
    doc.moveDown(1);

    // AI Solutions
    doc.addPage();
    addTitle('SOLUȚII AI PERSONALIZATE');
    addText(aiReport.ai_solutions, 11);
    doc.moveDown(1);

    // Implementation Roadmap
    doc.addPage();
    addTitle('PLAN DE IMPLEMENTARE');
    addText(aiReport.implementation_roadmap, 11);
    doc.moveDown(1);

    // ROI Analysis
    doc.addPage();
    addTitle('ANALIZA ROI');
    addText(aiReport.roi_analysis, 11);
    doc.moveDown(1);

    // Next Steps
    doc.addPage();
    addTitle('PAȘI URMĂTORI');
    addText(aiReport.next_steps, 11);
    doc.moveDown(1);
    
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
      to: email,
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

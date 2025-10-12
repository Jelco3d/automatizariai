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
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, name, email, phone }: RequestBody = await req.json();

    console.log("Generating report for session:", sessionId);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch conversation messages first
    const { data: messages, error: messagesError } = await supabaseClient
      .from("audit_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (messagesError || !messages || messages.length === 0) {
      console.error("Error fetching messages:", messagesError);
      throw new Error("Nu am găsit conversația");
    }

    // Try to fetch existing insights
    let { data: insights } = await supabaseClient
      .from("audit_insights")
      .select("*")
      .eq("session_id", sessionId)
      .single();

    // If no insights exist, extract them from the conversation using AI
    if (!insights) {
      console.log("No insights found, extracting from conversation...");
      
      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      if (!LOVABLE_API_KEY) {
        throw new Error("LOVABLE_API_KEY is not configured");
      }

      // Create conversation text for AI analysis
      const conversationText = messages
        .map(msg => `${msg.role === 'user' ? 'Utilizator' : 'Asistent'}: ${msg.content}`)
        .join('\n\n');

      const extractionPrompt = `Analizează următoarea conversație și extrage informațiile structurate despre afacere.

Conversație:
${conversationText}

Returnează DOAR un obiect JSON valid cu următoarele câmpuri (folosește informațiile din conversație, dacă ceva nu e menționat pune un string gol sau array gol):
{
  "business_type": "tipul afacerii (ex: e-commerce, servicii, producție)",
  "business_description": "descriere scurtă a afacerii",
  "target_audience": "publicul țintă",
  "team_size": "mărimea echipei",
  "painpoints": ["listă", "cu", "probleme"],
  "desired_solutions": ["listă", "cu", "soluții", "dorite"],
  "tools_used": ["listă", "cu", "instrumente", "folosite"],
  "goals": ["listă", "cu", "obiective"]
}`;

      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "user", content: extractionPrompt }
          ],
          temperature: 0.3,
        }),
      });

      if (!aiResponse.ok) {
        console.error("AI extraction failed:", aiResponse.status);
        throw new Error("Nu am putut extrage datele din conversație");
      }

      const aiData = await aiResponse.json();
      const extractedData = JSON.parse(aiData.choices[0].message.content);

      // Save extracted insights to database
      const { data: savedInsights, error: saveError } = await supabaseClient
        .from("audit_insights")
        .insert({
          session_id: sessionId,
          business_type: extractedData.business_type || "",
          business_description: extractedData.business_description || "",
          target_audience: extractedData.target_audience || "",
          team_size: extractedData.team_size || "",
          painpoints: extractedData.painpoints || [],
          desired_solutions: extractedData.desired_solutions || [],
          tools_used: extractedData.tools_used || [],
          goals: extractedData.goals || []
        })
        .select()
        .single();

      if (saveError) {
        console.error("Error saving extracted insights:", saveError);
        throw new Error("Nu am putut salva datele extrase");
      }

      insights = savedInsights;
      console.log("Insights extracted and saved successfully");
    }

    // Save contact information
    const { error: contactError } = await supabaseClient
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
    }

    // Generate HTML report
    const htmlReport = generateHTMLReport(name, insights, messages);

    // Send email
    const emailResponse = await resend.emails.send({
      from: "AI Automatizări <onboarding@resend.dev>",
      to: [email],
      subject: `🚀 Raportul Tău Personalizat - Analiza AI pentru ${insights.business_type || "Afacerea Ta"}`,
      html: htmlReport,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Raportul a fost trimis cu succes!" }),
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

function generateHTMLReport(name: string, insights: any, messages: any[]): string {
  const painpoints = Array.isArray(insights.painpoints) ? insights.painpoints : [];
  const goals = Array.isArray(insights.goals) ? insights.goals : [];
  const toolsUsed = Array.isArray(insights.tools_used) ? insights.tools_used : [];
  const desiredSolutions = Array.isArray(insights.desired_solutions) ? insights.desired_solutions : [];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Raport Analiză AI - ${name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
    }
    .container {
      max-width: 700px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .header p {
      font-size: 18px;
      opacity: 0.95;
    }
    .content {
      padding: 40px 30px;
    }
    .section {
      margin-bottom: 40px;
    }
    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 3px solid #667eea;
    }
    .subsection {
      margin-bottom: 24px;
    }
    .subsection-title {
      font-size: 18px;
      font-weight: 600;
      color: #764ba2;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .text-block {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      margin-bottom: 12px;
    }
    .list {
      list-style: none;
      padding: 0;
    }
    .list-item {
      background: #f8f9fa;
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 8px;
      border-left: 4px solid #764ba2;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .list-item::before {
      content: "✓";
      color: #667eea;
      font-weight: bold;
      font-size: 18px;
      flex-shrink: 0;
    }
    .benefit-box {
      background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 16px;
      border: 2px solid #667eea30;
    }
    .benefit-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }
    .benefit-title {
      font-size: 20px;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 8px;
    }
    .benefit-text {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }
    .cta-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      color: white;
      margin-top: 40px;
    }
    .cta-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .cta-text {
      font-size: 18px;
      margin-bottom: 24px;
      opacity: 0.95;
    }
    .cta-button {
      display: inline-block;
      background: white;
      color: #667eea;
      padding: 16px 40px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 18px;
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: scale(1.05);
    }
    .footer {
      padding: 30px;
      text-align: center;
      background: #f8f9fa;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Raportul Tău Personalizat</h1>
      <p>Analiza AI pentru ${insights.business_type || "Afacerea Ta"}</p>
    </div>

    <div class="content">
      <p style="font-size: 18px; margin-bottom: 30px;">
        Bună <strong>${name}</strong>! 👋<br>
        Mulțumim pentru timpul acordat! Iată analiza completă a afacerii tale și recomandările noastre personalizate.
      </p>

      <!-- Secțiunea 1: Rezumat Afacere -->
      <div class="section">
        <h2 class="section-title">📋 Rezumatul Afacerii Tale</h2>
        <div class="subsection">
          ${insights.business_type ? `
          <div class="text-block">
            <strong>Tipul afacerii:</strong> ${insights.business_type}
          </div>
          ` : ''}
          ${insights.business_description ? `
          <div class="text-block">
            <strong>Descriere:</strong> ${insights.business_description}
          </div>
          ` : ''}
          ${insights.target_audience ? `
          <div class="text-block">
            <strong>Public țintă:</strong> ${insights.target_audience}
          </div>
          ` : ''}
          ${insights.team_size ? `
          <div class="text-block">
            <strong>Mărimea echipei:</strong> ${insights.team_size}
          </div>
          ` : ''}
        </div>
      </div>

      <!-- Secțiunea 2: Analiza Detaliată -->
      <div class="section">
        <h2 class="section-title">🔍 Analiza Situației Actuale</h2>
        
        ${painpoints.length > 0 ? `
        <div class="subsection">
          <h3 class="subsection-title">⚠️ Provocări Identificate</h3>
          <ul class="list">
            ${painpoints.map((pain: string) => `<li class="list-item">${pain}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${goals.length > 0 ? `
        <div class="subsection">
          <h3 class="subsection-title">🎯 Obiectivele Tale</h3>
          <ul class="list">
            ${goals.map((goal: string) => `<li class="list-item">${goal}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${toolsUsed.length > 0 ? `
        <div class="subsection">
          <h3 class="subsection-title">🛠️ Instrumente Actuale</h3>
          <ul class="list">
            ${toolsUsed.map((tool: string) => `<li class="list-item">${tool}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
      </div>

      <!-- Secțiunea 3: Soluții AI -->
      <div class="section">
        <h2 class="section-title">💡 Soluții și Recomandări AI</h2>
        ${insights.ai_recommendations ? `
        <div class="text-block">
          ${insights.ai_recommendations}
        </div>
        ` : ''}
        
        ${desiredSolutions.length > 0 ? `
        <div class="subsection">
          <h3 class="subsection-title">✨ Soluții Personalizate</h3>
          <ul class="list">
            ${desiredSolutions.map((solution: string) => `<li class="list-item">${solution}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
      </div>

      <!-- Secțiunea 4: Beneficii Concrete -->
      <div class="section">
        <h2 class="section-title">🎁 Ce Vei Câștiga</h2>
        
        <div class="benefit-box">
          <div class="benefit-icon">⏰</div>
          <div class="benefit-title">Timp Economisit</div>
          <div class="benefit-text">
            Economisește între <strong>10-20 de ore pe săptămână</strong> prin automatizarea sarcinilor repetitive. 
            Asta înseamnă aproximativ <strong>50-100 ore pe lună</strong> pe care le poți dedica creșterii afacerii și strategiei.
          </div>
        </div>

        <div class="benefit-box">
          <div class="benefit-icon">💰</div>
          <div class="benefit-title">Reducere Costuri</div>
          <div class="benefit-text">
            Scade costurile operaționale cu <strong>30-50%</strong> prin eliminarea taskurilor manuale și optimizarea proceselor. 
            Pentru o afacere medie, asta înseamnă economii de <strong>€1,000 - €5,000 lunar</strong>.
          </div>
        </div>

        <div class="benefit-box">
          <div class="benefit-icon">🧘</div>
          <div class="benefit-title">Sănătate Mentală</div>
          <div class="benefit-text">
            <strong>Mai puțin stres și mai multă claritate</strong>. Automatizarea te scapă de presiunea sarcinilor repetitive, 
            îți oferă control complet asupra afacerii și timp pentru tine și familia ta. 
            Rezultat: <strong>Work-life balance îmbunătățit semnificativ</strong>.
          </div>
        </div>

        <div class="benefit-box">
          <div class="benefit-icon">📈</div>
          <div class="benefit-title">Creștere Accelerată</div>
          <div class="benefit-text">
            Scalează afacerea <strong>de 2-3 ori mai rapid</strong> fără a crește proportional costurile sau numărul de angajați. 
            AI-ul lucrează 24/7 pentru tine, generând rezultate constante și predictibile.
          </div>
        </div>
      </div>

      <!-- Secțiunea 5: Call to Action -->
      <div class="cta-section">
        <h2 class="cta-title">🎯 Următorul Pas</h2>
        <p class="cta-text">
          Vrei să discutăm despre cum poți implementa aceste soluții în afacerea ta?<br>
          Programează o consultație strategică GRATUITĂ de 30 de minute!
        </p>
        <a href="https://calendly.com/gabrieljelcoi/30min" class="cta-button">
          📅 Programează Consultația Gratuită
        </a>
        <p style="margin-top: 20px; font-size: 14px; opacity: 0.9;">
          În această consultație vom analiza în detaliu situația ta și vom crea un plan pas cu pas pentru implementare.
        </p>
      </div>
    </div>

    <div class="footer">
      <p><strong>AI Automatizări</strong></p>
      <p style="margin-top: 8px;">Transformăm afaceri prin automatizare inteligentă și soluții AI personalizate.</p>
      <p style="margin-top: 12px; font-size: 12px;">
        © ${new Date().getFullYear()} AI Automatizări. Toate drepturile rezervate.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

serve(handler);

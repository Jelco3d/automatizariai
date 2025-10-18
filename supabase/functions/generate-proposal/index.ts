import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessName, businessDescription, automationNeeds, timeframe, price } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert business proposal writer specializing in AI automation solutions. You generate complete HTML documents using a specific template format.`;

    const userPrompt = `Generate a complete HTML proposal document using this EXACT template structure. Fill in all dynamic sections with relevant, professional content based on the client data.

CLIENT DATA:
- Business Name: ${businessName}
- Business Description: ${businessDescription}
- Automation Needs: ${automationNeeds}
- Implementation Timeframe: ${timeframe}
- Proposed Investment: ${price} RON

TEMPLATE TO USE (preserve ALL HTML structure, CSS, and classes):
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Propunere Automatizare AI</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @page { size: A4; margin: 0; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: white; }
        .page { width: 210mm; min-height: 297mm; padding: 20mm; margin: 0 auto; background: white; page-break-after: always; }
        .header { border-bottom: 4px solid #8b5cf6; padding-bottom: 20px; margin-bottom: 30px; display: flex; align-items: center; gap: 20px; }
        .logo { width: 80px; height: 80px; }
        .header-text { flex: 1; }
        .company-name { font-size: 28px; font-weight: bold; color: #8b5cf6; margin-bottom: 5px; }
        .tagline { font-size: 14px; color: #666; font-style: italic; }
        .proposal-title { font-size: 24px; font-weight: bold; color: #7c3aed; margin: 40px 0 20px 0; text-align: center; }
        .meta-info { background: #faf5ff; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #8b5cf6; }
        .meta-row { display: flex; margin-bottom: 10px; }
        .meta-label { font-weight: bold; min-width: 120px; color: #7c3aed; }
        .section { margin: 30px 0; }
        .section-title { font-size: 20px; font-weight: bold; color: #7c3aed; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #e9d5ff; }
        .section-number { color: #8b5cf6; margin-right: 10px; }
        .subsection-title { font-size: 16px; font-weight: bold; color: #374151; margin: 20px 0 10px 0; }
        .content { text-align: justify; margin-bottom: 15px; }
        .highlight-box { background: #faf5ff; border-left: 4px solid #8b5cf6; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .challenge-list, .opportunity-list { margin: 15px 0 15px 20px; }
        .challenge-list li, .opportunity-list li { margin-bottom: 12px; padding-left: 10px; }
        .challenge-list li strong { color: #dc2626; }
        .opportunity-list li strong { color: #16a34a; }
        .timeline { margin: 20px 0; }
        .timeline-item { background: #faf5ff; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6; }
        .timeline-week { font-weight: bold; color: #8b5cf6; margin-bottom: 8px; }
        .benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .benefit-card { background: #faf5ff; padding: 15px; border-radius: 8px; border-top: 3px solid #8b5cf6; }
        .benefit-title { font-weight: bold; color: #7c3aed; margin-bottom: 8px; }
        .price-box { background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0; }
        .price-label { font-size: 16px; margin-bottom: 10px; opacity: 0.9; }
        .price-amount { font-size: 48px; font-weight: bold; margin: 10px 0; }
        .price-timeframe { font-size: 14px; opacity: 0.9; }
        .payment-terms { background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        .cta-section { background: #faf5ff; padding: 30px; border-radius: 12px; margin-top: 40px; text-align: center; }
        .cta-title { font-size: 22px; font-weight: bold; color: #7c3aed; margin-bottom: 20px; }
        .steps-list { text-align: left; max-width: 600px; margin: 20px auto; }
        .steps-list li { margin-bottom: 10px; padding-left: 10px; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #666; font-size: 14px; }
        .signature-section { margin-top: 50px; display: flex; justify-content: space-between; }
        .signature-box { width: 45%; }
        .signature-label { font-weight: bold; margin-bottom: 40px; }
        .signature-line { border-top: 2px solid #333; padding-top: 5px; font-size: 12px; color: #666; }
        @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } .page { margin: 0; border: none; box-shadow: none; } }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <img src="https://ututdskuykdosmbgjkzh.supabase.co/storage/v1/object/public/invoice-logos/new-logo.png" alt="AI Automatizari Logo" class="logo">
            <div class="header-text">
                <div class="company-name">AI Automatizări</div>
                <div class="tagline">Soluții inteligente pentru afaceri moderne</div>
            </div>
        </div>
        <div class="proposal-title">Propunere de Soluție de Automatizare AI</div>
        <div class="meta-info">
            <div class="meta-row"><span class="meta-label">Data:</span><span id="currentDate"></span></div>
            <div class="meta-row"><span class="meta-label">Către:</span><span>${businessName}</span></div>
            <div class="meta-row"><span class="meta-label">De la:</span><span>AI Automatizări - Jelco</span></div>
            <div class="meta-row"><span class="meta-label">Subiect:</span><span>[REPLACE: Titlu scurt descriptiv bazat pe automation needs]</span></div>
        </div>
        <div class="section">
            <h2 class="section-title"><span class="section-number">1.</span>Rezumat Executiv</h2>
            <div class="content">[REPLACE: 2-3 paragrafe despre soluție, obiective, beneficii principale]</div>
            <div class="highlight-box"><strong>Beneficii principale:</strong> [REPLACE: 3-4 beneficii cheie]</div>
        </div>
        <div class="section">
            <h2 class="section-title"><span class="section-number">2.</span>Înțelegerea Afacerii Clientului</h2>
            <div class="content">[REPLACE: Descriere business client, provocări specifice industriei, context]</div>
        </div>
        <div class="section">
            <h2 class="section-title"><span class="section-number">3.</span>Provocări și Oportunități</h2>
            <h3 class="subsection-title">Provocări Actuale:</h3>
            <ul class="challenge-list">
                [REPLACE: 4-5 <li> cu provocări specifice]
            </ul>
            <h3 class="subsection-title">Oportunități AI:</h3>
            <ul class="opportunity-list">
                [REPLACE: 4-5 <li> cu oportunități]
            </ul>
        </div>
    </div>
    <div class="page">
        <div class="section">
            <h2 class="section-title"><span class="section-number">4.</span>Soluția Propusă de Automatizare AI</h2>
            <div class="content">[REPLACE: Descriere soluție, arhitectură, tehnologii]</div>
            <h3 class="subsection-title">Arhitectura Soluției:</h3>
            <div class="content">[REPLACE: 5-6 componente cu descrieri]</div>
            <div class="highlight-box"><strong>Tehnologii:</strong> [REPLACE: listă tehnologii]</div>
        </div>
        <div class="section">
            <h2 class="section-title"><span class="section-number">5.</span>Plan de Implementare</h2>
            <div class="timeline">
                [REPLACE: 4 timeline-item cu săptămâni, bazat pe timeframe]
            </div>
        </div>
        <div class="section">
            <h2 class="section-title"><span class="section-number">6.</span>Beneficii și ROI</h2>
            <div class="benefits-grid">
                [REPLACE: 4 benefit-card cu titlu și descriere]
            </div>
            <div class="highlight-box"><strong>Perioada de Recuperare:</strong> [REPLACE: estimare ROI]</div>
        </div>
    </div>
    <div class="page">
        <div class="section">
            <h2 class="section-title"><span class="section-number">7.</span>Detalii Investiție</h2>
            <div class="price-box">
                <div class="price-label">Investiție Totală</div>
                <div class="price-amount">${price.toLocaleString('ro-RO')} RON</div>
                <div class="price-timeframe">Implementare în ${timeframe}</div>
            </div>
            <div class="content"><strong>Pachetul include:</strong><ul style="margin: 15px 0 15px 20px;">[REPLACE: 7-8 <li> cu ce include]</ul></div>
            <div class="payment-terms"><strong>Termeni de Plată:</strong><br><br>[REPLACE: Detalii plată]</div>
        </div>
        <div class="section">
            <h2 class="section-title"><span class="section-number">8.</span>Pași Următori</h2>
            <div class="cta-section">
                <div class="cta-title">Haideți să transformăm împreună afacerea dumneavoastră!</div>
                <div class="steps-list"><ol>[REPLACE: 4 <li> cu pași următori]</ol></div>
            </div>
        </div>
        <div class="signature-section">
            <div class="signature-box">
                <div class="signature-label">Pentru AI Automatizări (Jelco):</div>
                <div class="signature-line">Semnătură și Dată</div>
            </div>
            <div class="signature-box">
                <div class="signature-label">Pentru ${businessName}:</div>
                <div class="signature-line">Semnătură și Dată</div>
            </div>
        </div>
        <div class="footer">
            <strong>AI Automatizări</strong><br>
            Jelco | Email: contact@aiautomatizari.ro | Tel: +40 XXX XXX XXX<br>
            www.aiautomatizari.ro
        </div>
    </div>
    <script>
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('currentDate').textContent = today.toLocaleDateString('ro-RO', options);
    </script>
</body>
</html>

INSTRUCTIONS:
1. Replace ALL [REPLACE: ...] sections with relevant, professional content based on client data
2. Keep ALL HTML structure, CSS classes, and styling EXACTLY as shown
3. Write in Romanian language, professional and persuasive tone
4. Adapt timeline based on the timeframe provided (${timeframe})
5. Make sure all content is specific to client's automation needs
6. Return ONLY the complete HTML document, no markdown or explanations
7. Ensure proper HTML escaping for special characters`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to generate proposal");
    }

    const data = await response.json();
    const generatedProposal = data.choices[0].message.content;

    return new Response(JSON.stringify({ generatedProposal }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-proposal function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
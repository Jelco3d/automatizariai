import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  sessionId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json() as RequestBody;
    console.log('Generating persuasive report for session:', sessionId);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch audit insights
    const { data: insights, error: insightsError } = await supabase
      .from('audit_insights')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (insightsError || !insights) {
      console.error('Error fetching insights:', insightsError);
      return new Response(
        JSON.stringify({ error: 'Nu am găsit date pentru acest audit' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Insights found:', insights);

    // Create persuasive prompt for AI
    const systemPrompt = `Ești un copywriter expert în AI și automatizare pentru business-uri. 
Scopul tău este să creezi un raport persuasiv, profesional și personalizat care să convingă clientul 
că soluțiile tale de automatizare AI sunt exact ce le trebuie pentru a-și dezvolta afacerea.

Raportul trebuie să fie:
- Personalizat pe baza datelor concrete ale clientului
- Persuasiv, arătând beneficii clare și ROI
- Profesional, dar prietenos și accesibil
- Structurat clar cu secțiuni bine definite
- Axat pe rezultate și transformarea business-ului

Folosește un ton încurajator și motivant, arătând oportunități concrete de creștere.`;

    const userPrompt = `Generează un raport persuasiv pentru următorul business:

INFORMAȚII BUSINESS:
- Tip business: ${insights.business_type || 'N/A'}
- Descriere: ${insights.business_description || 'N/A'}
- Industrie: ${insights.industry || 'N/A'}
- Public țintă: ${insights.target_audience || 'N/A'}
- Mărimea echipei: ${insights.team_size || 'N/A'}
- Nivel de maturitate: ${insights.company_maturity || 'N/A'}

PROVOCĂRI IDENTIFICATE:
${insights.painpoints && Array.isArray(insights.painpoints) ? insights.painpoints.map((p: string) => `- ${p}`).join('\n') : 'Nu au fost identificate provocări specifice'}

OBIECTIVE:
${insights.goals && Array.isArray(insights.goals) ? insights.goals.map((g: string) => `- ${g}`).join('\n') : 'Nu au fost identificate obiective specifice'}

SOLUȚII DORITE:
${insights.desired_solutions && Array.isArray(insights.desired_solutions) ? insights.desired_solutions.map((s: string) => `- ${s}`).join('\n') : 'Nu au fost identificate soluții specifice'}

UNELTE FOLOSITE:
${insights.tools_used && Array.isArray(insights.tools_used) ? insights.tools_used.map((t: string) => `- ${t}`).join('\n') : 'Nu au fost menționate unelte'}

GRAD DE PREGĂTIRE PENTRU AUTOMATIZARE: ${insights.automation_readiness_score || 'N/A'}/10

Creează un raport persuasiv structurat astfel:

# 📊 Raportul Tău Personalizat de Automatizare AI

## 🎯 Despre Business-ul Tău
[Rezumat personalizat al business-ului și contextului]

## 💡 Oportunități Majore Identificate
[3-5 oportunități concrete de îmbunătățire prin AI, bazate pe provocările și obiectivele lor]

## 🚀 Cum Te Poate Ajuta Automatizarea AI
[Soluții concrete și personalizate pentru provocările lor, cu beneficii clare]

## 💰 Impactul Estimat Asupra Business-ului
[ROI estimat, economii de timp, creștere potențială - bazat pe datele lor]

## ⚡ Pașii Următori Recomandați
[3-4 pași concreți și acționabili pentru implementare]

## 🎁 Oferta Noastră Pentru Tine
[Call-to-action persuasiv cu ofertă de consultanță gratuită]

Folosește emoji-uri pentru a face raportul mai vizual și mai ușor de citit.
Fii specific și concret, nu generic. Folosește datele reale ale clientului.
Arată că înțelegi provocările lor și ai soluții concrete.`;

    // Call Lovable AI Gateway
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Calling Lovable AI Gateway...');
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const persuasiveReport = aiData.choices[0].message.content;

    console.log('Persuasive report generated successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        report: persuasiveReport,
        sessionId: sessionId
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in ai-copywriter function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

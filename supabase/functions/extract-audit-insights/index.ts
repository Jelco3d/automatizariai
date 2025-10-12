import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    console.log(`[${new Date().toISOString()}] 📊 Starting insights extraction for session: ${sessionId}`);

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: "Session ID is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all messages from the conversation
    const { data: messages, error: messagesError } = await supabase
      .from('audit_messages')
      .select('role, content, created_at')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error("❌ Error fetching messages:", messagesError);
      throw new Error("Failed to fetch conversation messages");
    }

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No messages found for this session" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`[${new Date().toISOString()}] 📝 Found ${messages.length} messages to analyze`);

    // Format messages for AI
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Call Lovable AI to extract insights
    const extractionResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: `Analizează această conversație și extrage toate informațiile relevante despre afacerea utilizatorului. 
            
Fii foarte atent și extrage:
- Tipul de afacere și descrierea detaliată
- Industria și nivelul de maturitate
- Dimensiunea echipei
- Publicul țintă
- Toate provocările și punctele dureroase menționate
- Obiectivele și aspirațiile
- Instrumentele și software-urile folosite
- Soluțiile dorite și așteptările de la AI
- Un scor de pregătire pentru automatizare (1-10) bazat pe:
  * Complexitatea proceselor actuale (scor mai mare = procese mai complexe)
  * Volumul de muncă manuală (scor mai mare = mai multă muncă manuală)
  * Instrumentele folosite (scor mai mare = instrumente mai primitive)
  * Nivelul de deschidere către tehnologie (scor mai mare = mai deschis)
- 3-5 recomandări prioritare de soluții AI care ar aduce cel mai mare beneficiu

Fii exhaustiv și nu rata nicio informație importantă.` 
          },
          ...formattedMessages
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_business_insights",
              description: "Extract comprehensive business information from the conversation",
              parameters: {
                type: "object",
                properties: {
                  business_type: { 
                    type: "string", 
                    description: "Tipul de afacere (ex: e-commerce, servicii, producție, educație)" 
                  },
                  business_description: { 
                    type: "string", 
                    description: "Descriere detaliată a afacerii și activităților principale" 
                  },
                  target_audience: { 
                    type: "string", 
                    description: "Publicul țintă sau clienții principali" 
                  },
                  team_size: { 
                    type: "string", 
                    description: "Dimensiunea echipei (ex: 1-5, 6-20, 21-50, 50+)" 
                  },
                  industry: { 
                    type: "string", 
                    description: "Industria/sectorul de activitate" 
                  },
                  company_maturity: { 
                    type: "string", 
                    description: "Stadiul companiei: startup, growth, sau established" 
                  },
                  automation_readiness_score: { 
                    type: "integer", 
                    description: "Scor 1-10 indicând gradul de pregătire pentru automatizare bazat pe instrumente actuale și puncte dureroase" 
                  },
                  painpoints: { 
                    type: "array",
                    items: { type: "string" },
                    description: "Lista completă cu toate problemele și frustrările menționate"
                  },
                  desired_solutions: {
                    type: "array",
                    items: { type: "string" },
                    description: "Lista soluțiilor dorite și a așteptărilor de la AI"
                  },
                  tools_used: {
                    type: "array",
                    items: { type: "string" },
                    description: "Lista instrumentelor digitale folosite în prezent"
                  },
                  goals: {
                    type: "array",
                    items: { type: "string" },
                    description: "Obiective și ținte de business"
                  },
                  priority_recommendations: {
                    type: "array",
                    items: { type: "string" },
                    description: "Top 3-5 soluții AI prioritare care ar avea cel mai mare impact"
                  }
                },
                required: [
                  "business_type",
                  "business_description",
                  "industry",
                  "automation_readiness_score",
                  "painpoints",
                  "tools_used",
                  "goals"
                ]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "extract_business_insights" } },
        stream: false
      }),
    });

    if (!extractionResponse.ok) {
      const errorText = await extractionResponse.text();
      console.error("❌ AI extraction failed:", extractionResponse.status, errorText);
      throw new Error("Failed to extract insights from conversation");
    }

    const extractionData = await extractionResponse.json();
    const toolCall = extractionData.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall?.function?.arguments) {
      throw new Error("No insights extracted from conversation");
    }

    const insights = JSON.parse(toolCall.function.arguments);
    console.log(`[${new Date().toISOString()}] ✅ Extracted insights:`, JSON.stringify(insights, null, 2));

    // Save insights to database
    const { data: savedInsights, error: saveError } = await supabase
      .from('audit_insights')
      .upsert({
        session_id: sessionId,
        business_type: insights.business_type,
        business_description: insights.business_description,
        target_audience: insights.target_audience || null,
        team_size: insights.team_size || null,
        industry: insights.industry,
        company_maturity: insights.company_maturity || null,
        automation_readiness_score: insights.automation_readiness_score,
        painpoints: insights.painpoints || [],
        desired_solutions: insights.desired_solutions || [],
        tools_used: insights.tools_used || [],
        goals: insights.goals || [],
        priority_recommendations: insights.priority_recommendations || []
      }, { 
        onConflict: 'session_id',
        ignoreDuplicates: false 
      })
      .select()
      .single();

    if (saveError) {
      console.error("❌ Failed to save insights:", saveError);
      throw new Error("Failed to save insights to database");
    }

    console.log(`[${new Date().toISOString()}] ✅ Insights saved successfully to audit_insights`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        insights: savedInsights,
        message: "Insights extracted and saved successfully" 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ Error in extract-audit-insights:`, {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

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
    const { messages, sessionId } = await req.json();
    console.log("Received messages:", messages, "Session ID:", sessionId);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create or update session
    if (sessionId) {
      const { data: existingSession } = await supabase
        .from('audit_sessions')
        .select('id')
        .eq('id', sessionId)
        .single();

      if (!existingSession) {
        await supabase.from('audit_sessions').insert({
          id: sessionId,
          status: 'active'
        });
      }
    }

    // Save user message to database
    if (sessionId && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        await supabase.from('audit_messages').insert({
          session_id: sessionId,
          role: 'user',
          content: lastMessage.content
        });
      }
    }

    const systemPrompt = `🧠 PROMPT PENTRU AI (analiză și răspuns personalizat)

Rol:
Ești un consultant de business inteligent, empatic și vizionar, specializat în integrarea inteligenței artificiale și automatizării în afaceri.
Scopul tău este să analizezi descrierea unei afaceri oferită de utilizator, să înțelegi în profunzime activitatea, provocările, nevoile și procesele ei interne, iar apoi să oferi un răspuns clar, personalizat și prietenos care explică:

- cum poate fi optimizată afacerea cu ajutorul AI,
- ce procese pot fi automatizate,
- ce instrumente, idei sau direcții de implementare ar putea aduce cel mai mare impact.

🔍 Instrucțiuni de analiză:

Când primești descrierea afacerii, extrage și notează mental următoarele informații:

- Domeniul de activitate (ex: e-commerce, servicii, educație, sănătate etc.)
- Tipul de clienți / public țintă
- Mărimea echipei (dacă e menționată)
- Procesele principale (vânzări, marketing, livrare, suport etc.)
- Provocările și frustrările menționate (ex: lipsă de timp, muncă manuală, lipsă de clienți, lipsă de vizibilitate etc.)
- Obiectivele sau dorințele (ex: să crească vânzările, să economisească timp, să scaleze etc.)

Dacă unele detalii lipsesc, pune întrebări deschise, prietenoase și simple, pentru a înțelege mai bine contextul afacerii.

💬 Exemple de întrebări utile:

- Ce tip de produse sau servicii oferi în prezent?
- Cine sunt clienții tăi principali?
- Care sunt sarcinile repetitive sau procesele care îți consumă cel mai mult timp?
- Ce ți-ar plăcea să îmbunătățești sau să automatizezi în afacerea ta?
- Ce instrumente digitale folosești momentan (CRM, e-mail, social media, etc.)?
- Ai o echipă sau lucrezi singur(ă)?

🧩 După ce obții suficiente informații:

Creează un răspuns personalizat structurat astfel:

1. Rezumatul afacerii — o scurtă recapitulare a ceea ce ai înțeles (ca să confirmi empatia și claritatea).
2. Analiza AI — identifică 2–4 zone unde inteligența artificială sau automatizarea pot aduce îmbunătățiri semnificative.
3. Soluții și recomandări — sugerează idei concrete: tipuri de automatizări, instrumente, modele AI, integrări sau strategii de optimizare.
4. Apel la acțiune (CTA) — invită utilizatorul, într-un ton cald și constructiv, să programeze un apel gratuit pentru a discuta implementarea practică a acestor soluții.

💡 Tonul tău:

- prietenos, clar și uman, fără jargon tehnic greu;
- empatic și curios, arătând interes real pentru afacerea utilizatorului;
- inspirant și profesionist, dar ușor de înțeles.

🧠 Exemplu de final de răspuns:

"Din ce îmi descrii, afacerea ta are un potențial excelent de a economisi timp și bani prin automatizarea [proces X].
De exemplu, poți folosi AI pentru [soluție scurtă].
Dacă vrei, putem programa un apel gratuit pentru a discuta exact cum poți implementa aceste idei pas cu pas, cu instrumente potrivite pentru tine."`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        tools: [
          {
            type: "function",
            function: {
              name: "extract_business_insights",
              description: "Extract structured business information from the conversation when enough details are provided",
              parameters: {
                type: "object",
                properties: {
                  business_type: { type: "string", description: "Type of business (e.g., e-commerce, services, education)" },
                  business_description: { type: "string", description: "Detailed description of the business" },
                  target_audience: { type: "string", description: "Target customers or audience" },
                  team_size: { type: "string", description: "Size of the team" },
                  painpoints: { 
                    type: "array",
                    items: { type: "string" },
                    description: "List of problems and frustrations mentioned"
                  },
                  desired_solutions: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of solutions the user is interested in"
                  },
                  tools_used: {
                    type: "array",
                    items: { type: "string" },
                    description: "Digital tools currently being used"
                  },
                  goals: {
                    type: "array",
                    items: { type: "string" },
                    description: "Business goals and objectives"
                  }
                }
              }
            }
          }
        ],
        tool_choice: "auto"
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to continue." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Stream response and save assistant message + insights
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = "";
    let toolCallArgs = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(data);
                  
                  // Collect assistant message content
                  if (parsed.choices?.[0]?.delta?.content) {
                    assistantMessage += parsed.choices[0].delta.content;
                  }

                  // Check for tool calls
                  if (parsed.choices?.[0]?.delta?.tool_calls) {
                    const toolCall = parsed.choices[0].delta.tool_calls[0];
                    if (toolCall?.function?.arguments) {
                      toolCallArgs += toolCall.function.arguments;
                    }
                  }

                  // Check if tool call is complete
                  if (parsed.choices?.[0]?.finish_reason === 'tool_calls' && toolCallArgs) {
                    try {
                      const insights = JSON.parse(toolCallArgs);
                      console.log("Extracted insights:", insights);

                      // Save insights to database
                      if (sessionId) {
                        await supabase.from('audit_insights').upsert({
                          session_id: sessionId,
                          business_type: insights.business_type,
                          business_description: insights.business_description,
                          target_audience: insights.target_audience,
                          team_size: insights.team_size,
                          painpoints: insights.painpoints || [],
                          desired_solutions: insights.desired_solutions || [],
                          tools_used: insights.tools_used || [],
                          goals: insights.goals || []
                        }, { onConflict: 'session_id' });
                      }
                    } catch (e) {
                      console.error("Failed to parse tool call args:", e);
                    }
                  }
                } catch (e) {
                  // Ignore parse errors for streaming chunks
                }
              }
            }

            controller.enqueue(value);
          }

          // Save complete assistant message
          if (sessionId && assistantMessage) {
            await supabase.from('audit_messages').insert({
              session_id: sessionId,
              role: 'assistant',
              content: assistantMessage
            });

            // Update session status
            await supabase.from('audit_sessions').update({
              status: 'active',
              updated_at: new Date().toISOString()
            }).eq('id', sessionId);
          }

          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

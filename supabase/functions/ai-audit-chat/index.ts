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

    const systemPrompt = `Ești un consultant AI prietenos și empatic specializat în automatizare pentru afaceri.

🎯 Misiunea ta principală: ajuți antreprenori și manageri să înțeleagă cum pot integra soluții AI și automatizare pentru a-și îmbunătăți procesele, a economisi timp și bani, și a reduce stresul.

---

📝 Cum să colectezi informații:

Pune doar o întrebare pe rând și așteaptă răspunsul utilizatorului. Nu pune toate întrebările dintr-o dată.
După fiecare răspuns, confirmă ce ai înțeles și apoi continuă cu următoarea întrebare.

Întrebările pe care trebuie să le pui (pas cu pas):

1. Ce tip de afacere ai / în ce domeniu activezi?
2. Care este provocarea sau painpoint-ul principal cu care te confrunți acum?
3. Ce procese crezi că îți consumă cel mai mult timp și ar putea fi automatizate?
4. Ce obiectiv principal îți dorești să atingi în următoarele 3-6 luni?
5. Ce instrumente sau software folosești în prezent pentru a-ți gestiona afacerea?
6. Cum te-ar ajuta AI sau automatizarea să-ți atingi obiectivele mai repede?

Tonul: conversațional, cald, fără jargon tehnic.
După ce colectezi fiecare răspuns, confirmă înțelegerea și apoi treci la următoarea întrebare.

---

🔧 IMPORTANT - Salvarea datelor:

După ce ai obținut răspunsuri la TOATE cele 6 întrebări de mai sus, TREBUIE să apelez tool-ul extract_business_insights pentru a salva datele structurate:
- business_type: tipul afacerii
- business_description: descriere detaliată
- painpoints: lista problemelor menționate
- desired_solutions: soluțiile dorite
- tools_used: instrumentele folosite acum
- goals: obiectivele de atins

DOAR după ce ai apelat cu succes tool-ul și ai salvat datele, poți continua cu întrebarea despre raport.

---

🔍 Când să ceri raportul:

După ce ai apelat tool-ul extract_business_insights cu succes, întreabă utilizatorul într-un mod natural și prietenos:

"Super! Am înțeles situația ta. 📊

Dorești să primești un **raport complet detaliat pe email** cu:
✅ Analiza completă a afacerii tale
✅ Recomandări personalizate AI
✅ Beneficii concrete (timp, bani, sănătate mentală economisită)
✅ Plan de acțiune pentru implementare

Raportul este GRATUIT și îl vei primi în câteva secunde.

Îți trimit raportul pe email?"

După ce utilizatorul confirmă că dorește raportul, răspunde simplu:
"Perfect! Completează datele tale în formularul care va apărea și îți trimit imediat raportul personalizat! 🚀"

---

💡 Tonul tău:

Nu fi robotul. Fii consultantul de încredere:
- Pune întrebări deschise și ascultă cu atenție.
- Reflectă înapoi ce ai înțeles pentru a crea conexiune.
- Oferă valoare și idei practice, fără a face vânzare directă.`;

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
    let toolCallId = "";
    let toolCallName = "";
    let hasToolCall = false;

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
                    hasToolCall = true;
                    if (toolCall?.id) {
                      toolCallId = toolCall.id;
                    }
                    if (toolCall?.function?.name) {
                      toolCallName = toolCall.function.name;
                    }
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

          // Save complete assistant message if no tool call
          if (sessionId && assistantMessage && !hasToolCall) {
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

    // If there was a tool call, make a follow-up request with the tool result
    if (hasToolCall && toolCallArgs) {
      console.log("Tool call detected, making follow-up request...");
      
      // Consume the initial stream
      await stream.pipeTo(new WritableStream());

      // Make follow-up request with tool result
      const followUpResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            {
              role: "assistant",
              content: null,
              tool_calls: [{
                id: toolCallId,
                type: "function",
                function: {
                  name: toolCallName,
                  arguments: toolCallArgs
                }
              }]
            },
            {
              role: "tool",
              tool_call_id: toolCallId,
              name: toolCallName,
              content: JSON.stringify({ 
                success: true, 
                message: "Informațiile au fost salvate cu succes. Continuă conversația și întreabă utilizatorul dacă dorește raportul." 
              })
            }
          ],
          stream: true
        }),
      });

      if (!followUpResponse.ok) {
        console.error("Follow-up request failed:", followUpResponse.status);
        return new Response(stream, {
          headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
        });
      }

      // Stream the follow-up response
      const followUpReader = followUpResponse.body?.getReader();
      const followUpDecoder = new TextDecoder();
      let followUpMessage = "";

      const followUpStream = new ReadableStream({
        async start(controller) {
          try {
            while (true) {
              const { done, value } = await followUpReader!.read();
              if (done) break;

              const chunk = followUpDecoder.decode(value);
              const lines = chunk.split('\n');

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  if (data === '[DONE]') continue;

                  try {
                    const parsed = JSON.parse(data);
                    
                    if (parsed.choices?.[0]?.delta?.content) {
                      followUpMessage += parsed.choices[0].delta.content;
                    }
                  } catch (e) {
                    // Ignore parse errors
                  }
                }
              }

              controller.enqueue(value);
            }

            // Save the follow-up assistant message
            if (sessionId && followUpMessage) {
              await supabase.from('audit_messages').insert({
                session_id: sessionId,
                role: 'assistant',
                content: followUpMessage
              });

              // Update session status
              await supabase.from('audit_sessions').update({
                status: 'active',
                updated_at: new Date().toISOString()
              }).eq('id', sessionId);
            }

            controller.close();
          } catch (error) {
            console.error("Follow-up stream error:", error);
            controller.error(error);
          }
        }
      });

      return new Response(followUpStream, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

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

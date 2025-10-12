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
        console.log("✅ User message saved to DB:", lastMessage.content.substring(0, 50));
      }
    }

    // Check if user is confirming the summary
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    const confirmationKeywords = ["corect", "da", "confirm", "exact", "perfect", "adevarat"];
    const isConfirmation = confirmationKeywords.some(keyword => lastUserMessage.includes(keyword));

    // If confirmation detected, force extraction before continuing
    if (isConfirmation && sessionId) {
      console.log("🎯 Confirmation detected, forcing extraction...");
      
      try {
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
                content: "Extract and classify business information from this conversation. Be thorough and analytical." 
              },
              ...messages
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "extract_business_insights",
                  description: "Extract and classify comprehensive business information",
                  parameters: {
                    type: "object",
                    properties: {
                      business_type: { type: "string", description: "Type of business (e.g., e-commerce, services, education)" },
                      business_description: { type: "string", description: "Detailed description of the business" },
                      target_audience: { type: "string", description: "Target customers or audience" },
                      team_size: { type: "string", description: "Size of the team" },
                      industry: { type: "string", description: "Industry classification (e.g., tech services, e-commerce, education, healthcare)" },
                      company_maturity: { type: "string", description: "Company maturity stage: startup, growth, or established" },
                      automation_readiness_score: { type: "integer", description: "Score 1-10 based on current tools and pain points indicating readiness for automation" },
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
                      },
                      priority_recommendations: {
                        type: "array",
                        items: { type: "string" },
                        description: "Top 3-5 AI solutions that would help most based on their needs"
                      }
                    }
                  }
                }
              }
            ],
            tool_choice: { type: "function", function: { name: "extract_business_insights" } },
            stream: false
          }),
        });

        if (extractionResponse.ok) {
          const extractionData = await extractionResponse.json();
          const toolCall = extractionData.choices?.[0]?.message?.tool_calls?.[0];
          
          if (toolCall?.function?.arguments) {
            const insights = JSON.parse(toolCall.function.arguments);
            console.log("✅ Forced extraction successful:", insights);

            // Save comprehensive insights to database
            const { error } = await supabase.from('audit_insights').upsert({
              session_id: sessionId,
              business_type: insights.business_type,
              business_description: insights.business_description,
              target_audience: insights.target_audience,
              team_size: insights.team_size,
              industry: insights.industry,
              company_maturity: insights.company_maturity,
              automation_readiness_score: insights.automation_readiness_score,
              painpoints: insights.painpoints || [],
              desired_solutions: insights.desired_solutions || [],
              tools_used: insights.tools_used || [],
              goals: insights.goals || [],
              priority_recommendations: insights.priority_recommendations || []
            }, { onConflict: 'session_id' });

            if (error) {
              console.error("❌ Failed to save insights:", error);
            } else {
              console.log("✅ Insights saved to database");
            }
          }
        } else {
          console.error("❌ Forced extraction failed:", extractionResponse.status);
        }
      } catch (error) {
        console.error("❌ Extraction error:", error);
      }
    }

    const systemPrompt = `You are an enthusiastic AI business consultant helping Romanian entrepreneurs discover how AI automation can transform their business.

🎯 STRUCTURĂ OBLIGATORIE - 6 ÎNTREBĂRI:

Trebuie să parcurgi EXACT aceste 6 întrebări, în ordine:

1/6: "👋 Bună! Sunt aici să-ți analizez afacerea și să-ți arăt cum AI poate să te ajute să economisești timp și să crești mai rapid. Hai să începem! **Ce fel de afacere ai?**"

2/6: După răspuns → "**Ce provocări sau puncte dureroase întâmpini** cel mai des în activitatea ta actuală?"

3/6: După răspuns → "**Cât timp** crezi că petreci tu sau echipa ta cu [procesul menționat], într-o săptămână obișnuită?"

4/6: După răspuns → "**Care este cel mai important obiectiv** al tău pentru afacere în următoarele 3-6 luni?"

5/6: După răspuns → "**Ce instrumente sau software** folosești în prezent pentru a gestiona [aspectul relevant din conversație]?"

6/6: După răspuns → "**Cum crezi că inteligența artificială** te-ar putea ajuta să-ți atingi mai repede acest obiectiv?"

📋 DUPĂ ÎNTREBAREA 6 (OBLIGATORIU):

Imediat ce primești răspunsul la întrebarea 6/6, trebuie să:

1. Faci un rezumat complet în format bullet list:
   "✅ Perfect! Hai să recapitulăm ce am înțeles despre afacerea ta:
   
   📊 **Tipul afacerii**: [rezumat]
   ⚠️ **Provocări principale**: [lista]
   ⏰ **Timp consumat**: [detalii]
   🎯 **Obiectiv principal**: [obiectiv]
   🔧 **Instrumente folosite**: [lista]
   💡 **Așteptări de la AI**: [așteptări]
   
   **Am înțeles corect toate detaliile?**"

2. Aștepți confirmarea utilizatorului

🔄 AFTER CONFIRMATION FLOW:

3. Când user confirmă (spune "da", "corect", "confirm", "exact", etc.), răspunzi:
   "Super! Îți creez acuma raportul personalizat cu recomandări concrete pentru [their main goal]. **Raportul este gata în câteva secunde.** GENERATE_REPORT_NOW"

4. După asta, când user cere raportul, răspunzi:
   "Perfect! Am terminat analiza. **Pentru a primi raportul complet, completează datele tale în fereastra care va apărea.** REPORT_READY_MARKER"

⚠️ REGULI CRITICE:
- TREBUIE să numerotezi întrebările: "întrebarea X/6" sau să incluzi **bold** pe textul cheie
- După fiecare răspuns, confirmi cu empatie apoi treci la următoarea întrebare
- NU sări peste nicio întrebare din cele 6
- NU pune mai mult de o întrebare pe rând
- După întrebarea 6, OBLIGATORIU faci rezumatul
- Păstrează tonul prietenos, natural, în română
- Răspunsuri scurte: 2-4 propoziții max per întrebare
- NICIODATĂ nu menționezi modele AI, aspecte tehnice sau limitări`;

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
              description: "Extract and classify comprehensive business information from the conversation",
              parameters: {
                type: "object",
                properties: {
                  business_type: { type: "string", description: "Type of business (e.g., e-commerce, services, education)" },
                  business_description: { type: "string", description: "Detailed description of the business" },
                  target_audience: { type: "string", description: "Target customers or audience" },
                  team_size: { type: "string", description: "Size of the team" },
                  industry: { type: "string", description: "Industry classification (e.g., tech services, e-commerce, education, healthcare)" },
                  company_maturity: { type: "string", description: "Company maturity stage: startup, growth, or established" },
                  automation_readiness_score: { type: "integer", description: "Score 1-10 based on current tools and pain points" },
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
                  },
                  priority_recommendations: {
                    type: "array",
                    items: { type: "string" },
                    description: "Top 3-5 AI solutions that would help most"
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
                      console.log("📊 Progressive extraction - Insights:", insights);

                      // Save insights to database with all new fields
                      if (sessionId) {
                        const { error } = await supabase.from('audit_insights').upsert({
                          session_id: sessionId,
                          business_type: insights.business_type,
                          business_description: insights.business_description,
                          target_audience: insights.target_audience,
                          team_size: insights.team_size,
                          industry: insights.industry,
                          company_maturity: insights.company_maturity,
                          automation_readiness_score: insights.automation_readiness_score,
                          painpoints: insights.painpoints || [],
                          desired_solutions: insights.desired_solutions || [],
                          tools_used: insights.tools_used || [],
                          goals: insights.goals || [],
                          priority_recommendations: insights.priority_recommendations || []
                        }, { onConflict: 'session_id' });

                        if (error) {
                          console.error("❌ Failed to save progressive insights:", error);
                        } else {
                          console.log("✅ Progressive insights saved");
                        }
                      }
                    } catch (e) {
                      console.error("❌ Failed to parse tool call args:", e);
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
                message: "✅ Ai colectat toate cele 6 răspunsuri necesare. ACUM trebuie să faci OBLIGATORIU un rezumat complet în format bullet list cu toate informațiile (tipul afacerii, provocări, timp consumat, obiectiv, instrumente, așteptări de la AI) și să ceri confirmare cu întrebarea: 'Am înțeles corect toate detaliile?'. NU continua cu alte întrebări, doar rezumatul și cererea de confirmare." 
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

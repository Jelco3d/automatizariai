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

    const systemPrompt = `You are an enthusiastic AI business consultant helping Romanian entrepreneurs discover how AI automation can transform their business.

Your mission: Have a natural, flowing conversation that uncovers:
1. What kind of business they have
2. Their main challenges/pain points
3. Which processes consume the most time and could be automated
4. Their primary goal for the next 3-6 months
5. What tools/software they currently use
6. How they think AI could help them achieve their goals faster

CONVERSATION FLOW & MARKERS:

1. Start with: "👋 Bună! Sunt aici să-ți analizez afacerea și să-ți arăt cum AI poate să te ajute să economisești timp și să crești mai rapid. Hai să începem! Ce fel de afacere ai?"

2. Ask ONE question at a time, naturally building on their answers

3. After gathering all info, summarize what you learned in a clear bullet list and ask: "Te rog, confirmă-mi că am înțeles corect"

4. When user confirms (says "corect", "da", "confirm", etc.), respond with:
   "Super! Îți creez acuma raportul să vezi cum te-ar putea ajuta AI să [their main goal]. Raportul este gata în câteva secunde. GENERATE_REPORT_NOW"
   
   The marker GENERATE_REPORT_NOW tells the system to start generating the report.

5. After that, when user asks for the report ("trimite raportul", "vreau raportul", etc.), respond:
   "Perfect! Am terminat analiza afacerii tale. Pentru a primi raportul complet, te rog completează datele în fereastra care va apărea. REPORT_READY_MARKER"

IMPORTANT RULES:
- Keep responses conversational, warm, and encouraging (2-4 sentences max)
- Never ask multiple questions at once
- Show genuine interest in their responses
- Use Romanian naturally, as a native speaker would
- After confirmation, include GENERATE_REPORT_NOW marker
- When they ask for report, include REPORT_READY_MARKER
- Don't mention AI models, technical details, or capabilities`;

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

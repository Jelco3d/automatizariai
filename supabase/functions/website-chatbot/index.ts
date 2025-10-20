import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an AI assistant for AI Automatizari, a company specializing in AI automation solutions.

Company Information:
- Owner: Jelco (Erdelean Jelco)
- Location: Timișoara, Romania
- Phone: +40 754 274 528 (or 0754274528 in national format)
- Email: contact@aiautomatizari.ro
- Website: aiautomatizari.ro

Services:
- AI Automation Solutions - Automatizare cu AI
- Process Optimization - Optimizare Procese
- Custom AI Chatbots
- Business Process Automation
- AI Integration for businesses
- WhatsApp automation and integration

Key Features:
- Free strategy consultations available
- Specializes in helping businesses grow using AI
- Save time and increase sales through automation
- Custom solutions tailored to each business

Important Instructions:
- Always be helpful, friendly, and professional
- Answer in Romanian if the user writes in Romanian, English if they write in English
- Direct users to schedule consultations via: https://calendly.com/aiautomatizari/automatizariai
- Provide accurate contact information when asked
- Explain how AI automation can help their specific business
- Be enthusiastic about AI solutions but not pushy
- If asked about pricing, explain that it depends on their needs and suggest scheduling a free consultation
- Keep responses concise and actionable

Your goal is to help visitors understand how AI Automatizari can help their business and encourage them to schedule a free consultation.`;

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
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

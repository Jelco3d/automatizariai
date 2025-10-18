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

    const systemPrompt = `You are an expert business proposal writer specializing in AI automation solutions. Create comprehensive, professional proposals that:
- Highlight the business value and ROI
- Explain technical solutions in accessible language
- Include clear implementation timelines
- Build trust and credibility
- Are structured and well-formatted`;

    const userPrompt = `Create a comprehensive business proposal for the following client:

Business Name: ${businessName}
Business Description: ${businessDescription}
Automation Needs: ${automationNeeds}
Implementation Timeframe: ${timeframe}
Proposed Investment: ${price} RON

Generate a professional proposal that includes:
1. Executive Summary
2. Understanding of Client's Business
3. Identified Challenges and Opportunities
4. Proposed AI Automation Solution (detailed)
5. Implementation Plan and Timeline
6. Expected Benefits and ROI
7. Investment Details
8. Next Steps

Make it persuasive, professional, and tailored to this specific client. Use Romanian language for the proposal.`;

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
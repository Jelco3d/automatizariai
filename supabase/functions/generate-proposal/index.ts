import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Normalize Romanian diacritics to correct comma-below forms
const normalizeRomanian = (text: string): string => {
  return text
    .replace(/\u015F/g, "ș") // ş → ș (s with comma below)
    .replace(/\u015E/g, "Ș") // Ş → Ș
    .replace(/\u0163/g, "ț") // ţ → ț (t with comma below)
    .replace(/\u0162/g, "Ț") // Ţ → Ț
    .normalize("NFC");
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

    const systemPrompt = `You are an expert business proposal writer for AI Automatizari, a leading company specializing in AI automation solutions.

Company Information:
- Company: AI Automatizari
- Expert: Jelco Da
- Phone: +40754274528
- Email: contact@aiautomatizari.ro
- Website: aiautomatizari.ro

Create comprehensive, professional proposals that:
- Highlight the business value and ROI
- Explain technical solutions in accessible language
- Include clear implementation timelines
- Build trust and credibility
- Are structured and well-formatted
- ALWAYS include complete contact information at the end
- CRITICAL: Use proper Romanian diacritics (ă, â, î, ț, ș) throughout the entire text`;

    const userPrompt = `Create a comprehensive business proposal for the following client:

Business Name: ${businessName}
Business Description: ${businessDescription}
Automation Needs: ${automationNeeds}
Implementation Timeframe: ${timeframe}
Proposed Investment: ${price} RON

Generate a professional proposal in Romanian that includes:
1. Executive Summary
2. Understanding of Client's Business
3. Identified Challenges and Opportunities
4. Proposed AI Automation Solution (detailed)
5. Implementation Plan and Timeline
6. Expected Benefits and ROI
7. Investment Details
8. Next Steps
9. Contact și Informații (MANDATORY section at the end with:
   - AI Automatizari
   - Jelco Da - Expert în Soluții AI
   - Telefon: +40754274528
   - Email: contact@aiautomatizari.ro
   - Website: aiautomatizari.ro)

Make it persuasive, professional, and tailored to this specific client. 
IMPORTANT: The contact section must be professionally formatted and clearly visible at the end of every proposal.
CRITICAL: Use ONLY proper Romanian language with ALL diacritics (ă, â, î, ț, ș). Never write Romanian text without diacritics.`;

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
    const generatedProposalRaw = data.choices[0].message.content || "";
    const generatedProposal = normalizeRomanian(generatedProposalRaw);

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
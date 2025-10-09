import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    console.log("Received messages:", messages);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Ești un consultant AI specializat în automatizare și optimizare pentru afaceri din România.

ROLUL TĂU:
- Analizezi afacerile utilizatorilor și identifici oportunități de automatizare prin AI
- Oferi recomandări concrete și practice
- Vorbești într-un mod prietenos și profesionist în limba română
- Faci conversația interactivă, punând întrebări relevante

PROCESUL DE ANALIZĂ:
1. Întreabă despre tipul afacerii și industria în care activează
2. Află care sunt provocările zilnice și procesele repetitive
3. Identifică unde se pierde cel mai mult timp
4. Înțelege obiectivele de creștere
5. Pe baza informațiilor, oferă recomandări specifice despre:
   - Procese care pot fi automatizate
   - Instrumente AI potrivite
   - Economii de timp și costuri estimate
   - Pași concreți de implementare

STIL:
- Folosește emoji-uri moderat pentru a face conversația mai prietenoasă
- Fii concis dar complet
- Dă exemple concrete
- Întreabă câte o întrebare pe rând pentru a nu copleși utilizatorul

IMPORTANT:
- După ce ai adunat suficiente informații (minim 3-4 întrebări), oferă un raport de analiză personalizat
- În raport, sugerează programarea unei consultații gratuite pentru implementare`;

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

    return new Response(response.body, {
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

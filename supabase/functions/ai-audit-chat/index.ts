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

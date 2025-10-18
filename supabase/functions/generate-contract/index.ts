import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const normalizeRomanian = (text: string): string => {
  return text
    .replace(/\u015F/g, "ș")
    .replace(/\u015E/g, "Ș")
    .replace(/\u0163/g, "ț")
    .replace(/\u0162/g, "Ț")
    .normalize("NFC");
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientData, proposalData, contractData } = await req.json();
    
    console.log('Generating contract for:', { 
      client: clientData.name, 
      contractType: contractData.contract_type 
    });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `Ești un asistent juridic specializat în redactarea contractelor comerciale în limba română.

INSTRUCȚIUNI CRITICE:
1. Folosește ÎNTOTDEAUNA diacriticele românești corecte: ă, â, î, ș, ț (folosește ș cu virgulă dedesubt, NU ş cu sedilă; folosește ț cu virgulă dedesubt, NU ţ cu sedilă)
2. Scrie textul contractului în format profesional și structurat
3. Respectă limba juridică formală și precisă din România
4. Include toate clauzele esențiale pentru un contract valabil
5. Structurează contractul cu articole și alineate clare

STRUCTURA OBLIGATORIE A CONTRACTULUI:

1. PĂRȚILE CONTRACTANTE

FURNIZOR:
- Denumire: Unison Loge Fx SRL
- Contact: +40754274528
- Email: contact@aiautomatizari.ro
- Reprezentant legal: Jelco, având funcția de Administrator

CLIENT:
- Date complete client (din clientData)
- Reprezentanți legali și calitatea acestora (dacă sunt disponibile)

2. OBIECTUL CONTRACTULUI
   - Descriere detaliată a serviciilor (bazată pe proposal și contract_type)
   - Scopul colaborării
   - Specificații tehnice relevante

3. DURATA CONTRACTULUI
   - Data de început
   - Data de încheiere (dacă există)
   - Condiții de prelungire

4. VALOAREA CONTRACTULUI ȘI MODALITĂȚI DE PLATĂ
   - Valoare totală
   - TVA (19%)
   - Valoare totală cu TVA
   - Modalități de plată
   - Termene de plată
   - Date bancare

5. OBLIGAȚIILE PĂRȚILOR
   - Obligațiile furnizorului
   - Obligațiile clientului
   - Termene de îndeplinire

6. PROPRIETATE INTELECTUALĂ
   - Drepturi de autor
   - Licențe de utilizare
   - Restricții de folosire

7. CONFIDENȚIALITATE
   - Informații confidențiale
   - Obligații de confidențialitate
   - Durata confidențialității

8. GARANȚII ȘI ASIGURAREA CALITĂȚII
   - Garanții oferite
   - Nivel de calitate așteptat
   - Proceduri de testare/acceptare

9. RĂSPUNDERE ȘI DAUNE
   - Limitări de răspundere
   - Cazuri de forță majoră
   - Penalități pentru neîndeplinire

10. REZILIEREA CONTRACTULUI
    - Condiții de reziliere
    - Preaviz necesar
    - Efecte ale rezilierii

11. SOLUȚIONAREA LITIGIILOR
    - Metode amiabile
    - Instanța competentă
    - Legea aplicabilă

12. DISPOZIȚII FINALE
    - Comunicări oficiale
    - Modificări ale contractului
    - Anexe
    - Număr de exemplare
    
ÎNCHEIAT astăzi, [DATA CONTRACTULUI]

FURNIZOR:                                    CLIENT:
Unison Loge Fx SRL                          [Nume Client]
Reprezentant legal: Jelco                   Reprezentant legal: [Nume]
Administrator                               [Funcție]

Semnătură și ștampilă:                      Semnătură și ștampilă:


_____________________                       _____________________

IMPORTANT:
- Folosește articolul în loc de paragraful: "Art. 1", "Art. 2", etc.
- Folosește alineate (1), (2), (3) pentru subdiviziuni
- Include spații albe pentru lizibilitate
- Termină cu spații pentru semnături și ștampile
- Folosește limbaj juridic profesional dar clar`;

    const userPrompt = `Generează un contract comercial complet pentru:

INFORMAȚII FURNIZOR (OBLIGATORIU - folosește exact aceste date):
Denumire: Unison Loge Fx SRL
Contact: +40754274528
Email: contact@aiautomatizari.ro
Reprezentant legal: Jelco, având funcția de Administrator

INFORMAȚII CLIENT:
Nume: ${clientData.name}
${clientData.cui ? `CUI: ${clientData.cui}` : ''}
Adresă: ${clientData.address || 'Adresa din România'}
Email: ${clientData.email}
${clientData.phone ? `Telefon: ${clientData.phone}` : ''}

INFORMAȚII PROPUNERE (dacă există):
${proposalData ? `
Descriere business: ${proposalData.business_description}
Nevoi de automatizare: ${proposalData.automation_needs}
Interval de timp: ${proposalData.timeframe}
Propunere generată: ${proposalData.generated_proposal?.substring(0, 500)}...
` : 'Nu există propunere asociată'}

DETALII CONTRACT:
Tip contract: ${contractData.contract_type}
Data început: ${contractData.start_date}
${contractData.end_date ? `Data încheiere: ${contractData.end_date}` : 'Contract pe durată nedeterminată'}
Valoare totală: ${contractData.total_value} RON

DATA CONTRACT: ${contractData.start_date}

Generează un contract complet, profesional, conform cu legislația română, care include toate clauzele menționate în instrucțiuni. 

Asigură-te că:
1. Folosești NUMAI diacriticele corecte cu virgulă (ș, ț) și NU sedilă (ş, ţ)
2. La finalul contractului incluzi secțiunea de semnături cu:
   - Data curentă: ${contractData.start_date}
   - Numele complet al firmei furnizor: Unison Loge Fx SRL
   - Spații pentru semnături și ștampile pentru ambele părți`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit depășit. Încercați din nou în câteva momente.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Fonduri insuficiente. Adăugați credite în contul Lovable AI.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContractRaw = data.choices[0].message.content;
    const generatedContract = normalizeRomanian(generatedContractRaw);

    console.log('Contract generated successfully');

    return new Response(
      JSON.stringify({ generatedContract }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-contract function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
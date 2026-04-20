import { Link } from "react-router-dom";

export function CostAutomatizareAIRomania2026() {
  return (
    <>
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          TL;DR — răspunsul scurt
        </h2>
        <p>
          În România, în 2026, o <strong>automatizare AI pentru un proces singular</strong>{" "}
          (ex: chatbot WhatsApp, răspuns automat la emailuri, generare oferte) costă tipic:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Setup inițial</strong>: 800 – 3.500 EUR (open-source stack, n8n + API AI)
          </li>
          <li>
            <strong>Abonament lunar operare</strong>: 100 – 400 EUR (API calls AI + hosting + tool licenses)
          </li>
          <li>
            <strong>Cost per flux adițional</strong>: ~40% mai mic după primul
          </li>
        </ul>
        <p>
          Pentru un <strong>pachet complex</strong> (3-5 procese integrate, CRM + WhatsApp + email + facturare),
          investiția totală în primul an este între <strong>5.000 și 18.000 EUR</strong>, cu un{" "}
          <strong>ROI mediu între 3 și 9 luni</strong> pentru IMM-urile cu 5-30 de angajați.
        </p>
        <p>
          <strong>Cine plătește mai mult?</strong> Firmele care aleg soluții enterprise (Salesforce, IBM Watson,
          custom GPT fine-tuning) pot ajunge la 50.000+ EUR/an.{" "}
          <strong>Cine plătește mai puțin?</strong> Proiectele pilot single-flow, pe stack open-source, pot porni
          de la 800 EUR setup + 100 EUR/lună.
        </p>
      </section>

      <section id="ce-inseamna-automatizare-ai" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          1. Ce înseamnă de fapt „automatizare AI" și de ce diferă prețul față de RPA clasic
        </h2>
        <p>
          Când spunem „automatizare AI", referim la un flux tehnic care combină trei elemente:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Un trigger</strong> (ce pornește fluxul) — un mesaj pe WhatsApp, un email nou, un lead în
            formular, o factură care trebuie emisă
          </li>
          <li>
            <strong>Un LLM (Large Language Model)</strong> care ia o decizie sau generează conținut — GPT-4,
            Claude, Gemini sau un model open-source găzduit local
          </li>
          <li>
            <strong>Una sau mai multe acțiuni</strong> — trimite răspuns, creează task în CRM, generează PDF,
            notifică prin Slack, actualizează Google Sheet
          </li>
        </ol>
        <p>
          Diferența față de <strong>RPA clasic</strong> (Robotic Process Automation, gen UiPath, Automation
          Anywhere) este că RPA urmează reguli rigide: „dacă X, atunci Y". <strong>Automatizarea AI</strong> ia
          decizii contextuale: înțelege un mesaj liber, extrage informații, clasifică intent, răspunde în limbaj
          natural.
        </p>
        <p>
          <strong>Impactul asupra prețului:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>RPA clasic se plătește per „bot" sau per licență, adesea 800-2.000 EUR/lună per bot</li>
          <li>Automatizarea AI pe stack open-source se plătește la consum — plătești API calls, nu licență fixă</li>
        </ul>
        <p>
          Rezultatul: pentru IMM-uri, automatizarea AI este tipic{" "}
          <strong>3-5× mai ieftină decât RPA clasic enterprise</strong>, pentru cazurile de uz echivalente.
        </p>
      </section>

      <section id="tabel-preturi" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          2. Cât costă automatizarea AI în România 2026 — tabel complet cu prețuri
        </h2>
        <p>
          Pe baza proiectelor livrate în 2025-2026 de agenții de automatizare din România, iată trei{" "}
          <strong>tier-uri tipice de preț</strong> pentru IMM-uri:
        </p>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-white/[0.05]">
                <th className="border border-white/10 px-4 py-3 text-left">Tier</th>
                <th className="border border-white/10 px-4 py-3 text-left">Ce include</th>
                <th className="border border-white/10 px-4 py-3 text-left">Setup (EUR)</th>
                <th className="border border-white/10 px-4 py-3 text-left">Lunar (EUR)</th>
                <th className="border border-white/10 px-4 py-3 text-left">Cost primul an</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white/10 px-4 py-3 font-semibold">Pilot — 1 flow</td>
                <td className="border border-white/10 px-4 py-3">
                  1 automatizare (ex: chatbot WhatsApp SAU generare ofertă)
                </td>
                <td className="border border-white/10 px-4 py-3">800 – 2.000</td>
                <td className="border border-white/10 px-4 py-3">100 – 300</td>
                <td className="border border-white/10 px-4 py-3">2.000 – 5.600</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3 font-semibold">Standard — 3-5 flows</td>
                <td className="border border-white/10 px-4 py-3">
                  Pachet integrat: WhatsApp + Email + CRM sync + raportare
                </td>
                <td className="border border-white/10 px-4 py-3">3.500 – 8.000</td>
                <td className="border border-white/10 px-4 py-3">250 – 600</td>
                <td className="border border-white/10 px-4 py-3">6.500 – 15.200</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3 font-semibold">Growth — 6+ flows</td>
                <td className="border border-white/10 px-4 py-3">
                  Stack complet: chatbot multi-canal + fidelizare + facturare + analytics + onboarding
                </td>
                <td className="border border-white/10 px-4 py-3">8.000 – 18.000</td>
                <td className="border border-white/10 px-4 py-3">500 – 1.200</td>
                <td className="border border-white/10 px-4 py-3">14.000 – 32.400</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-400 italic">
          Surse: eComunicate (Workflow-uri AI 2026), Rifter (Cost digitalizare IMM 2026), date interne AI Automatizări.
        </p>
        <div className="bg-purple-500/10 border-l-4 border-purple-400 p-4 rounded my-6">
          <p className="m-0">
            💡 <strong>Nu ești sigur ce tier ți se potrivește?</strong>{" "}
            <Link to="/audit-gratuit" className="text-purple-300 underline">
              Fă un audit gratuit
            </Link>{" "}
            și primești o estimare personalizată în maxim 48 de ore, cu prioritizare pe ROI.
          </p>
        </div>
      </section>

      <section id="factori-pret" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          3. Cei 7 factori care determină prețul real al unei automatizări
        </h2>
        <p>
          Un range de preț (800-2.000 EUR) spune foarte puțin fără context. Iată{" "}
          <strong>factorii concreți</strong> care mută prețul în sus sau în jos:
        </p>

        <h3 className="text-xl font-bold text-white mt-6">3.1. Complexitatea procesului</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Simplu</strong> (single-step, single-decision): „când vine email cu cuvântul X, răspunde cu
            template Y" → costul minim
          </li>
          <li>
            <strong>Mediu</strong> (multi-step, 2-3 decizii): „clasifică emailul în 5 categorii → routes la
            persoana potrivită → creează task în CRM" → cost standard
          </li>
          <li>
            <strong>Complex</strong> (multi-step, multi-system, loop-back): „conversație multi-turn cu memorie
            → extrage cerințe → generează ofertă → urmărește răspunsul → recalibrează" → cost premium
          </li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6">3.2. Volumul de date procesate</h3>
        <p>
          Costurile API AI sunt <strong>per token</strong>. La Claude Sonnet 4.6 în 2026, tarifele sunt
          aproximativ $3/million tokens input și $15/million tokens output.
        </p>
        <p>
          Pentru un chatbot care răspunde la 100 conversații/zi, fiecare cu ~2.000 tokens total →{" "}
          <strong>~6M tokens/lună → ~$45/lună doar API</strong>. La 10.000 conversații/zi → $4.500/lună.
        </p>
        <p>
          Regula: pentru volume mari, merită pre-procesare (filtrare ieftină) + cache + modele mai mici (Haiku)
          pentru răspunsuri simple.
        </p>

        <h3 className="text-xl font-bold text-white mt-6">3.3. Numărul și complexitatea integrărilor</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Integrări native n8n / Make</strong> (Gmail, Sheets, Slack, Stripe): 0.5-2h setup, gratis
          </li>
          <li>
            <strong>Integrări cu API publice</strong> (Pipedrive, HubSpot, WhatsApp Business): 2-6h setup
          </li>
          <li>
            <strong>Integrări cu sisteme locale RO</strong> (Smartbill, FacturaImm, RoMobil): 4-12h, uneori
            middleware custom
          </li>
          <li>
            <strong>Integrări cu ERP custom sau sisteme legacy</strong>: 2-5 zile — aici prețul explodează
          </li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6">3.4. On-premise vs cloud</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Cloud managed</strong> (n8n Cloud, Make, Zapier): mai scump lunar, zero headache
            infrastructură
          </li>
          <li>
            <strong>Self-hosted</strong> (n8n pe Hetzner/DigitalOcean): 5-10 EUR/lună VPS + 0 cost licență →
            mult mai ieftin
          </li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6">3.5. Modelul AI ales</h3>
        <p>În 2026, tarifele aproximative pe API-uri (input/output per milion tokens):</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Claude Haiku 4.5</strong>: $0.80 / $4 — clasificări, extractions rapide
          </li>
          <li>
            <strong>Claude Sonnet 4.6</strong>: $3 / $15 — default pentru majoritatea cazurilor
          </li>
          <li>
            <strong>Claude Opus 4.7</strong>: $15 / $75 — raționament complex, reports
          </li>
          <li>
            <strong>GPT-4o</strong>: $2.50 / $10 — competitiv cu Sonnet
          </li>
          <li>
            <strong>Modele open-source</strong> (Llama 3, Mistral): cost marginal zero per token, plătești
            infrastructura
          </li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6">3.6. GDPR și cerințe de compliance</h3>
        <p>
          Pentru industriile reglementate (medical, financiar, legal), trebuie DPA cu fiecare furnizor,
          infrastructură în UE, anonimizare date. <strong>Impact preț: +20-40%</strong> față de un proiect
          echivalent fără compliance strict.
        </p>

        <h3 className="text-xl font-bold text-white mt-6">3.7. Cine implementează</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>DIY</strong>: 0 EUR, dar 40-100h timp tău
          </li>
          <li>
            <strong>Freelancer începător</strong>: 300-800 EUR per flow, risc de livrare slabă
          </li>
          <li>
            <strong>Freelancer senior RO</strong>: 1.500-3.500 EUR per flow
          </li>
          <li>
            <strong>Agenție specializată</strong>: 2.500-8.000 EUR per flow, include mentenanță și garanție
          </li>
        </ul>
      </section>

      <section id="comparatie-stack" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          4. n8n vs Make vs Zapier vs Custom — comparație cu prețuri
        </h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-white/[0.05]">
                <th className="border border-white/10 px-4 py-3 text-left">Criteriu</th>
                <th className="border border-white/10 px-4 py-3 text-left">n8n self-hosted</th>
                <th className="border border-white/10 px-4 py-3 text-left">n8n Cloud</th>
                <th className="border border-white/10 px-4 py-3 text-left">Make</th>
                <th className="border border-white/10 px-4 py-3 text-left">Zapier</th>
                <th className="border border-white/10 px-4 py-3 text-left">Custom</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white/10 px-4 py-3 font-semibold">Preț pornire</td>
                <td className="border border-white/10 px-4 py-3">~7 EUR/lună</td>
                <td className="border border-white/10 px-4 py-3">20 EUR/lună</td>
                <td className="border border-white/10 px-4 py-3">9 EUR/lună</td>
                <td className="border border-white/10 px-4 py-3">20 USD/lună</td>
                <td className="border border-white/10 px-4 py-3">0 (dev)</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3 font-semibold">La 50k ops/lună</td>
                <td className="border border-white/10 px-4 py-3">~15 EUR</td>
                <td className="border border-white/10 px-4 py-3">50 EUR</td>
                <td className="border border-white/10 px-4 py-3">29 EUR</td>
                <td className="border border-white/10 px-4 py-3">73 USD</td>
                <td className="border border-white/10 px-4 py-3">20-50 EUR</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3 font-semibold">Integrări</td>
                <td className="border border-white/10 px-4 py-3">400+</td>
                <td className="border border-white/10 px-4 py-3">400+</td>
                <td className="border border-white/10 px-4 py-3">1500+</td>
                <td className="border border-white/10 px-4 py-3">6000+</td>
                <td className="border border-white/10 px-4 py-3">0 (scrii)</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3 font-semibold">GDPR/EU</td>
                <td className="border border-white/10 px-4 py-3">Da</td>
                <td className="border border-white/10 px-4 py-3">Da (EU)</td>
                <td className="border border-white/10 px-4 py-3">Parțial</td>
                <td className="border border-white/10 px-4 py-3">Parțial</td>
                <td className="border border-white/10 px-4 py-3">Da</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3 font-semibold">Ideal pentru</td>
                <td className="border border-white/10 px-4 py-3">IMM tehnic, agenții</td>
                <td className="border border-white/10 px-4 py-3">IMM non-tehnic</td>
                <td className="border border-white/10 px-4 py-3">Volume mari</td>
                <td className="border border-white/10 px-4 py-3">Setup rapid, pilot</td>
                <td className="border border-white/10 px-4 py-3">Enterprise</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Recomandarea pentru IMM-uri din România</strong>: începe cu <strong>n8n self-hosted</strong>{" "}
          pe un VPS Hetzner (5-10 EUR/lună). Dacă nu ai resursă tehnică internă, n8n Cloud EU sau Make (ambele
          cu hosting în UE). Evită Zapier pentru volume mari (prețul explodează la 5.000+ ops/lună).
        </p>
      </section>

      <section id="scenarii" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          5. 3 scenarii reale din piața RO cu cifre concrete
        </h2>

        <h3 className="text-xl font-bold text-white mt-6">
          Scenariul A — Clinică dentară cu fidelizare automată
        </h3>
        <p>
          <strong>Context</strong>: clinică cu 1.200 pacienți activi, pierdea ~18% anual din pacienți din cauza
          răspunsurilor târzii pe WhatsApp și lipsei de follow-up.
        </p>
        <p>
          <strong>Implementat</strong>: chatbot WhatsApp AI 24/7 pentru programări + reminder rechemări +
          follow-up post-tratament + dashboard front-desk.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Setup: 4.200 EUR (~45h, integrare cu softul de programări existent)</li>
          <li>Lunar: 320 EUR (WhatsApp Business API + Claude Haiku + Sonnet + VPS)</li>
          <li>
            <strong>Primul an: 8.040 EUR</strong>
          </li>
        </ul>
        <p>
          <strong>Rezultat</strong>: reducere churn de la 18% la 6% → ~220 pacienți salvați/an → ~88.000 EUR
          revenue estimat. <strong>ROI la 1.5 luni.</strong>
        </p>
        <p>
          Vezi detalii complete:{" "}
          <Link to="/fidelizare-pacienti" className="text-purple-300 underline">
            Fidelizare pacienți pentru clinici dentare
          </Link>
          .
        </p>

        <h3 className="text-xl font-bold text-white mt-6">
          Scenariul B — Agenție digitală cu automatizare ofertare
        </h3>
        <p>
          <strong>Context</strong>: agenție cu 8 oameni, 60-80 cereri ofertă/lună. Fiecare ofertă dura 2-3h.
        </p>
        <p>
          <strong>Implementat</strong>: AI extrage brief din conversație → calculează estimare din rule-uri
          interne → generează PDF branded → trimite automat → urmărește răspuns cu follow-up la 3 și 7 zile.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Setup: 6.500 EUR (~60h, include template-uri PDF + CRM + knowledge base intern)</li>
          <li>Lunar: 280 EUR</li>
          <li>
            <strong>Primul an: 9.860 EUR</strong>
          </li>
        </ul>
        <p>
          <strong>Rezultat</strong>: timp per ofertă de la 2.5h la 15 min → echivalent 160h/lună (~2 FTE).
          Conversion rate ofertă → contract crescut de la 18% la 27%. <strong>ROI la 2 luni.</strong>
        </p>

        <h3 className="text-xl font-bold text-white mt-6">
          Scenariul C — E-commerce cu facturare și follow-up automate
        </h3>
        <p>
          <strong>Context</strong>: magazin online, 1.500 comenzi/lună, founder-ul petrecea 10h/săpt pe
          facturare și customer service.
        </p>
        <p>
          <strong>Implementat</strong>: facturare auto via Smartbill + email post-cumpărare personalizat +
          follow-up review Google la 14 zile + chatbot AI site și email + raport săptămânal KPI.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Setup: 5.800 EUR</li>
          <li>Lunar: 390 EUR</li>
          <li>
            <strong>Primul an: 10.480 EUR</strong>
          </li>
        </ul>
        <p>
          <strong>Rezultat</strong>: 8h/săpt recuperate founder (~16.000 EUR/an). Review-uri Google 4× creștere
          → +12% trafic organic local. Tichete suport -60%. <strong>ROI la 4-5 luni.</strong>
        </p>

        <div className="bg-purple-500/10 border-l-4 border-purple-400 p-4 rounded my-6">
          <p className="m-0">
            💡 <strong>Vrei studii de caz reale cu cifre verificabile?</strong>{" "}
            <Link to="/portfolio" className="text-purple-300 underline">
              Explorează portofoliul AI Automatizări
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="roi" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          6. Formula ROI + când îți iei banii înapoi dintr-o automatizare AI
        </h2>
        <p>
          <strong>Formula simplificată pentru un IMM:</strong>
        </p>
        <pre className="bg-black/40 p-4 rounded overflow-x-auto text-sm">
{`ROI (luni) = Investiție inițială / (Valoare lunară recuperată − Cost lunar operare)

Unde:
  Valoare lunară recuperată = Ore economisite × cost orar angajat + Revenue suplimentar
  Cost lunar operare = API AI + hosting + licențe tool-uri`}
        </pre>

        <h3 className="text-xl font-bold text-white mt-6">Exemplu practic (Scenariul B, agenție)</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Investiție inițială: 6.500 EUR</li>
          <li>Ore economisite: 160h/lună × 15 EUR/h = 2.400 EUR/lună recuperare</li>
          <li>Cost lunar operare: 280 EUR</li>
          <li>Net lunar: 2.120 EUR</li>
          <li>
            <strong>ROI = 6.500 / 2.120 ≈ 3 luni</strong>
          </li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6">Benchmark-uri tipice de ROI în piața RO</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-white/[0.05]">
                <th className="border border-white/10 px-4 py-3 text-left">Scenariu</th>
                <th className="border border-white/10 px-4 py-3 text-left">ROI tipic</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white/10 px-4 py-3">Chatbot single-flow (pilot)</td>
                <td className="border border-white/10 px-4 py-3">1-3 luni</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3">Fidelizare clienți (retail, clinici)</td>
                <td className="border border-white/10 px-4 py-3">1-4 luni</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3">Automatizare sales (ofertare, follow-up)</td>
                <td className="border border-white/10 px-4 py-3">2-5 luni</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3">Automatizare operațiuni interne</td>
                <td className="border border-white/10 px-4 py-3">4-8 luni</td>
              </tr>
              <tr>
                <td className="border border-white/10 px-4 py-3">Stack complex (5+ flows)</td>
                <td className="border border-white/10 px-4 py-3">6-12 luni</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Datele agregate arată că automatizarea poate reduce costurile operaționale cu{" "}
          <strong>30-50%</strong>, iar agenții AI complecși pot reduce costul per tranzacție cu{" "}
          <strong>până la 70%</strong>{" "}
          <em>(sursă: Integrare.ai, raport 2026 — outsourcing-today.ro)</em>.
        </p>
      </section>

      <section id="costuri-ascunse" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          7. Costuri ascunse de evitat (avertismente din experiență)
        </h2>

        <h3 className="text-xl font-bold text-white mt-6">7.1. Uitarea costului API pe măsură ce scalezi</h3>
        <p>
          Multe firme încep cu 100 conversații/lună și plătesc 30 EUR API. La 5.000 conversații/lună, API ajunge
          la 600 EUR. <strong>Soluție</strong>: folosește Haiku pentru majoritatea task-urilor, escalează la
          Sonnet doar când e necesar. Implementează caching pentru răspunsuri repetate.
        </p>

        <h3 className="text-xl font-bold text-white mt-6">7.2. Licențe tool-uri care se adună</h3>
        <p>
          CRM + email provider + scheduler + storage + monitoring — fiecare cu abonamentul său. Am văzut firme
          plătind 300 EUR/lună pe 12 tool-uri suprapuse. <strong>Soluție</strong>: audit stack la 6 luni.
        </p>

        <h3 className="text-xl font-bold text-white mt-6">7.3. Întreținere post-implementare</h3>
        <p>
          Procesele se schimbă, apar bug-uri după update-uri API. <strong>Bugetează 10-20% din valoarea
          inițială/an pentru mentenanță</strong> (sau include-o în contract).
        </p>

        <h3 className="text-xl font-bold text-white mt-6">7.4. Compliance retroactiv</h3>
        <p>
          Dacă implementezi fără să te gândești la GDPR de la început, redesign-ul pentru conformitate poate
          însemna +30-60% peste costul inițial. <strong>Implementează best practices GDPR de la start.</strong>
        </p>

        <h3 className="text-xl font-bold text-white mt-6">7.5. Vendor lock-in</h3>
        <p>
          Soluții proprietare fac migrarea scumpă. <strong>Preferă open-source</strong> (n8n) sau cu export
          ușor.
        </p>

        <h3 className="text-xl font-bold text-white mt-6">7.6. Costul de oportunitate al DIY</h3>
        <p>
          „Fac eu, nu plătesc pe nimeni." Sună bine — până când treci prin 80h învățare + debugging. Timpul
          echivalent la 50 EUR/h = 4.000 EUR. <strong>Dacă ești în zona ta de expertiză, valoarea ta e acolo.</strong>
        </p>
      </section>

      <section id="faq" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">8. Întrebări frecvente</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">
              Cât durează implementarea unei automatizări AI simple?
            </h3>
            <p>
              Pentru un flow simplu (chatbot cu 3-5 intenții, sau o automatizare email), implementarea durează{" "}
              <strong>3-7 zile lucrătoare</strong>. Un pachet Standard (3-5 flows integrate) durează{" "}
              <strong>2-4 săptămâni</strong>. La AI Automatizări, ne-am angajat să livrăm primul flow în 5 zile
              sau mai puțin.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Am nevoie de dev intern pentru a gestiona o automatizare AI?
            </h3>
            <p>
              <strong>Nu, dacă</strong> alegi un stack managed (n8n Cloud sau Make) și cineva în echipă e
              confortabil cu no-code. <strong>Da, dacă</strong> alegi self-hosted sau vrei integrări custom cu
              sisteme legacy.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Ce se întâmplă dacă AI-ul greșește la un client important?
            </h3>
            <p>
              Orice automatizare AI serioasă include <strong>escape hatches</strong>: reguli de escalare la om
              pentru cazuri ambigue, confidence scoring (AI spune „nu sunt sigur, pasez la operator"), logging
              complet pentru audit.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Cât costă un chatbot WhatsApp AI pentru o afacere mică?
            </h3>
            <p>
              Pentru o afacere mică (50-200 conversații/zi), bugetul tipic este{" "}
              <strong>1.500-3.000 EUR setup + 150-250 EUR/lună</strong>. Detalii și demo live:{" "}
              <Link to="/whatsapp-demo" className="text-purple-300 underline">
                WhatsApp AI Demo
              </Link>
              .
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Pot aplica la fonduri europene pentru automatizare AI?</h3>
            <p>
              Da — linii active în 2026 pentru digitalizare IMM prin PNRR și fonduri structurale. Valoarea
              finanțării: tipic 50-90% din proiect, maxim 50-200k EUR per IMM.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Este compatibil cu GDPR?</h3>
            <p>
              <strong>Da, dacă e implementat corect.</strong> Necesar: DPA cu fiecare furnizor, infrastructură
              în UE (Hetzner/OVH Germania, Supabase EU, Claude EU), anonimizare/pseudonimizare datelor
              sensibile înainte de trimitere la LLM, logs accesibile pentru exercitarea drepturilor GDPR.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Cât costă doar auditul?</h3>
            <p>
              La AI Automatizări,{" "}
              <Link to="/audit-gratuit" className="text-purple-300 underline">
                auditul este gratuit
              </Link>{" "}
              — rezultate în 48h, fără angajament.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Diferența între RPA clasic și automatizare AI — care e mai ieftin?
            </h3>
            <p>
              <strong>Automatizarea AI e tipic 3-5× mai ieftină</strong> pentru IMM-uri față de RPA clasic
              enterprise (UiPath, Automation Anywhere), pentru cazuri de uz echivalente. RPA clasic are sens la
              volume foarte mari, procese rigide reglementate. AI automation câștigă la procese cu text liber
              și decizii contextuale.
            </p>
          </div>
        </div>
      </section>

      <section id="concluzie" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">9. Concluzie și următorul pas</h2>
        <p>
          Prețul unei automatizări AI în România 2026 e <strong>accesibil pentru orice IMM serios</strong> —
          startul e de la 800 EUR pentru un flux pilot, iar ROI tipic e sub 6 luni. Ce costă cu adevărat e să{" "}
          <strong>amâni decizia</strong> cu încă un an: fiecare lună în care operațiunile merg manual e o lună
          de timp și cost de oportunitate pe care nu-l mai recuperezi.
        </p>

        <p>
          <strong>Trei lucruri de făcut chiar acum:</strong>
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Listează top 3 procese repetitive care îți iau cel mai mult timp</li>
          <li>Estimează ore/săptămână petrecute pe fiecare (chiar și aproximativ)</li>
          <li>Cere un audit gratuit — primești în 48h un raport concret cu ROI-uri</li>
        </ol>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 p-6 rounded-lg my-8">
          <h3 className="text-xl font-bold text-white mb-3">Gata să afli ce poți automatiza?</h3>
          <p className="mb-4">
            <Link
              to="/audit-gratuit"
              className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition"
            >
              Cere auditul gratuit →
            </Link>
          </p>
          <p className="text-sm text-gray-300 m-0">Zero risc, zero angajament, răspuns în 48h.</p>
        </div>
      </section>

      <section className="space-y-4 border-t border-white/10 pt-8 mt-8">
        <h3 className="text-lg font-bold text-white">Despre autor</h3>
        <p>
          <strong>Erdelean Jelco</strong> este fondatorul AI Automatizări, agenție din Timișoara specializată
          în automatizări AI pentru IMM-urile din România. Contact: erdelean@aiautomatizari.ro.
        </p>

        <h3 className="text-lg font-bold text-white mt-6">Surse</h3>
        <ol className="list-decimal pl-6 space-y-1 text-sm text-gray-400">
          <li>
            <a
              href="https://www.ecomunicate.ro/articole/automatizari-cu-ai-in-afacerile-romanesti-5-workflow-uri-care-chiar-aduc-bani-in-2026/"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              eComunicate — Automatizări cu AI în afacerile românești: 5 workflow-uri care chiar aduc bani în 2026
            </a>
          </li>
          <li>
            <a
              href="https://rifter.ro/blog/cat-costa-digitalizarea-imm-romania-2026/"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              Rifter — Cât costă digitalizarea unui IMM în România în 2026
            </a>
          </li>
          <li>
            <a
              href="https://www.interlink.ro/blog/automatizari-ai-business-2026"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              Interlink — Automatizări AI pentru business în 2026
            </a>
          </li>
          <li>
            <a
              href="https://outsourcing-today.ro/?p=14905"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              Outsourcing Today — Integrare.ai: 2026 is the year of AI agents in Romania
            </a>
          </li>
        </ol>
      </section>
    </>
  );
}

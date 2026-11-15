import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";

const ARTICLE_URL = "https://aiautomatizari.ro/blog/automatizari-ai";
const ARTICLE_TITLE = "Automatizări AI pentru IMM-uri: ghid practic, pas cu pas";
const ARTICLE_DESCRIPTION =
  "Automatizări AI pentru firme mici: cum alegi primul proces, ce pregătești, ce rămâne la om. Ghid pas cu pas, checklist și tabel manual vs AI.";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ce sunt automatizările AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sunt fluxuri de lucru în care aplicațiile firmei sunt legate între ele, iar inteligența artificială citește și înțelege text sau documente. Preiau sarcini repetitive, ca emailuri, oferte sau facturi, și lasă omului deciziile importante.",
      },
    },
    {
      "@type": "Question",
      name: "Cât costă automatizările AI pentru o firmă?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depinde de proces, de aplicațiile pe care le folosești deja și de câte excepții are fluxul. Un cost corect se poate estima abia după ce procesul e descris. De aceea, primul pas potrivit este un audit al proceselor.",
      },
    },
    {
      "@type": "Question",
      name: "Am nevoie de un programator în firmă?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nu neapărat. Pentru procese simple există unelte vizuale, precum n8n, Make sau Zapier. Pentru legături mai complicate între aplicații lucrezi cu cineva care le construiește. Tu trebuie să cunoști procesul, nu codul.",
      },
    },
    {
      "@type": "Question",
      name: "Ce proces e bun pentru prima automatizare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unul care se repetă des, are un punct de pornire clar și un rezultat clar. Exemple bune: răspunsuri la cereri de ofertă, înregistrarea contactelor noi în CRM sau sortarea emailurilor primite.",
      },
    },
    {
      "@type": "Question",
      name: "Datele firmei sunt în siguranță?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pot fi, dacă procesul e gândit corect: acces doar la datele necesare, conturi separate, aprobare umană pentru acțiunile sensibile și respectarea GDPR. Înainte de pornire, întreabă exact ce date vede automatizarea și unde sunt păstrate.",
      },
    },
  ],
};

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Automatizări AI pentru IMM-uri: ghid practic pentru patroni",
  description: ARTICLE_DESCRIPTION,
  inLanguage: "ro-RO",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": ARTICLE_URL,
  },
  author: {
    "@type": "Organization",
    name: "AI Automatizări",
    url: "https://aiautomatizari.ro/",
  },
  publisher: {
    "@type": "Organization",
    name: "AI Automatizări",
    url: "https://aiautomatizari.ro/",
    logo: {
      "@type": "ImageObject",
      url: "https://aiautomatizari.ro/lovable-uploads/new-logo.png",
    },
  },
};

const sectionClass = "space-y-4";
const headingClass = "text-2xl md:text-3xl font-bold leading-tight text-foreground";
const subheadingClass = "pt-3 text-xl font-bold text-foreground";
const paragraphClass = "leading-relaxed text-muted-foreground";
const listClass = "list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground";
const tableCellClass = "border border-border/15 px-4 py-3 align-top leading-relaxed";

const steps = [
  {
    lead: "Ține o săptămână un jurnal al sarcinilor repetitive.",
    text: " Roagă fiecare om din echipă să noteze ce face de mână și se repetă: date copiate din emailuri, oferte aproape identice, răspunsuri la aceleași întrebări, facturi căutate prin dosare. Nu ai nevoie de un program special. Ajunge o foaie comună în care scrie toată lumea.",
  },
  {
    lead: "Alege un singur proces, nu toată firma.",
    text: " Din jurnal, alege procesul care se repetă des, are reguli destul de clare și te deranjează cel mai mult. Un proces bun pentru început are un punct de pornire clar (un email, un formular, un mesaj) și un rezultat clar (o ofertă trimisă, o programare făcută, o factură înregistrată).",
  },
  {
    lead: "Scrie pașii procesului așa cum se fac azi.",
    text: " Pe o singură pagină: de unde vine cererea, cine o citește, ce date scoate din ea, în ce aplicație le pune, ce trimite înapoi și când. Notează și excepțiile: ce faceți când lipsește o informație sau când clientul cere ceva neobișnuit. Fără excepțiile scrise, automatizarea se blochează exact la cazurile grele.",
  },
  {
    lead: "Stabilește ce rămâne la om.",
    text: " Hotărăște dinainte ce pași trebuie aprobați de cineva: prețul dintr-o ofertă, un răspuns la o reclamație, orice plată. AI-ul poate pregăti ciorna, dar decizia rămâne la voi. Așa eviți greșelile care ajung direct la client.",
  },
  {
    lead: "Adună accesul și exemplele reale.",
    text: " Fă o listă cu aplicațiile implicate (email, CRM, tabel, program de facturare, WhatsApp Business) și notează cine are contul de administrator. Pune deoparte câteva exemple reale de cereri, emailuri sau documente, fără date personale de care nu e nevoie. Pe ele se testează automatizarea.",
  },
  {
    lead: "Testează în paralel cu echipa, apoi pornește.",
    text: " O perioadă, automatizarea lucrează „în umbra” omului: pregătește rezultatul, iar omul verifică dacă e corect. Abia când rezultatele sunt bune în mod constant îi dai voie să trimită singură.",
  },
  {
    lead: "Măsoară și alege următorul proces.",
    text: " Compară cu jurnalul de la început: cât timp se pierdea înainte, câte cereri rămâneau fără răspuns, câte greșeli apăreau. Dacă primul proces merge, treci la următorul din listă. Dacă nu merge, ajustezi regulile înainte să adaugi altceva.",
  },
];

const checklistItems = [
  "Am o listă cu sarcinile repetitive din ultima săptămână.",
  "Am ales un singur proces pentru început.",
  "Pașii procesului sunt scriși, inclusiv excepțiile.",
  "Știu ce pași trebuie aprobați de un om.",
  "Știu în ce aplicații stau datele și cine are acces de administrator.",
  "Am exemple reale pentru testare.",
  "Am un om din firmă care răspunde de proces după pornire.",
  "Știu cum arată situația de „înainte”, ca să o pot compara cu cea de „după”.",
  "Am verificat ce date personale atinge procesul și cine le poate vedea.",
];

const comparisonRows = [
  [
    "Cereri de ofertă pe email",
    "Cineva citește emailul, caută produsele și scrie oferta de la zero",
    "AI-ul extrage ce cere clientul și pregătește ciorna ofertei după modelul firmei",
    "Verifică prețurile și trimite oferta",
  ],
  [
    "Întrebări repetitive de la clienți",
    "Același răspuns, scris de mai multe ori pe zi, pe canale diferite",
    "Răspuns automat din informațiile aprobate de firmă, pe email sau WhatsApp",
    "Preia întrebările neobișnuite și reclamațiile",
  ],
  [
    "Facturi de la furnizori",
    "Datele se copiază de mână din PDF în programul de contabilitate",
    "Datele se extrag din document și se pregătesc pentru înregistrare",
    "Confirmă cazurile neclare",
  ],
  [
    "Contacte noi din formulare",
    "Datele ajung într-un email și se pierd printre altele",
    "Contactul intră direct în CRM, cu o notă despre ce vrea clientul",
    "Sună clientul și închide vânzarea",
  ],
  [
    "Programări",
    "Telefon, mesaje și calendar ținute separat",
    "Clientul primește variante libere, iar programarea intră în calendar",
    "Rezolvă schimbările speciale",
  ],
  [
    "Raport săptămânal",
    "Cineva adună date din mai multe tabele",
    "Raportul se strânge singur și ajunge pe email",
    "Citește raportul și ia decizii",
  ],
];

const faqs = [
  {
    question: "Ce sunt automatizările AI?",
    answer:
      "Sunt fluxuri de lucru în care aplicațiile firmei sunt legate între ele, iar inteligența artificială citește și înțelege text sau documente. Preiau sarcini repetitive, ca emailuri, oferte sau facturi, și lasă omului deciziile importante.",
  },
  {
    question: "Cât costă automatizările AI pentru o firmă?",
    answer:
      "Depinde de proces, de aplicațiile pe care le folosești deja și de câte excepții are fluxul. Un cost corect se poate estima abia după ce procesul e descris. De aceea, primul pas potrivit este un audit al proceselor.",
  },
  {
    question: "Am nevoie de un programator în firmă?",
    answer:
      "Nu neapărat. Pentru procese simple există unelte vizuale, precum n8n, Make sau Zapier. Pentru legături mai complicate între aplicații lucrezi cu cineva care le construiește. Tu trebuie să cunoști procesul, nu codul.",
  },
  {
    question: "Ce proces e bun pentru prima automatizare?",
    answer:
      "Unul care se repetă des, are un punct de pornire clar și un rezultat clar. Exemple bune: răspunsuri la cereri de ofertă, înregistrarea contactelor noi în CRM sau sortarea emailurilor primite.",
  },
  {
    question: "Datele firmei sunt în siguranță?",
    answer:
      "Pot fi, dacă procesul e gândit corect: acces doar la datele necesare, conturi separate, aprobare umană pentru acțiunile sensibile și respectarea GDPR. Înainte de pornire, întreabă exact ce date vede automatizarea și unde sunt păstrate.",
  },
];

export default function AutomatizariAI() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLanguage = document.documentElement.lang;
    document.title = ARTICLE_TITLE;
    document.documentElement.lang = "ro";

    const restorers: Array<() => void> = [];
    const metaTags = [
      { attribute: "name", key: "description", content: ARTICLE_DESCRIPTION },
      { attribute: "property", key: "og:title", content: ARTICLE_TITLE },
      { attribute: "property", key: "og:description", content: ARTICLE_DESCRIPTION },
      { attribute: "property", key: "og:url", content: ARTICLE_URL },
      { attribute: "property", key: "og:type", content: "article" },
      { attribute: "property", key: "og:locale", content: "ro_RO" },
      {
        attribute: "property",
        key: "og:image",
        content: "https://aiautomatizari.ro/og-image.png",
      },
    ];

    metaTags.forEach(({ attribute, key, content }) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      const wasCreated = !tag;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      const previousContent = tag.getAttribute("content");
      tag.setAttribute("content", content);
      restorers.push(() => {
        if (wasCreated) {
          tag?.remove();
        } else if (previousContent === null) {
          tag?.removeAttribute("content");
        } else {
          tag?.setAttribute("content", previousContent);
        }
      });
    });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalWasCreated = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    const previousCanonical = canonical.getAttribute("href");
    canonical.href = ARTICLE_URL;

    const schemaScripts = [FAQ_SCHEMA, ARTICLE_SCHEMA].map((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.automatizariAiSeo = "true";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLanguage;
      restorers.forEach((restore) => restore());
      if (canonicalWasCreated) {
        canonical?.remove();
      } else if (previousCanonical === null) {
        canonical?.removeAttribute("href");
      } else {
        canonical?.setAttribute("href", previousCanonical);
      }
      schemaScripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="blog-article-theme min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <article className="container mx-auto max-w-4xl space-y-10 px-4 pb-24 pt-28 md:pt-32">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 rounded text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Înapoi la blog
          </a>

          <header>
            <h1 className="blog-article-title text-3xl font-bold leading-tight md:text-5xl">
              Automatizări AI pentru IMM-uri: ghid practic pentru patroni
            </h1>
          </header>

          <p className="blog-article-summary rounded-r-lg p-5 leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Pe scurt:</strong> Automatizările AI sunt fluxuri de
            lucru în care aplicațiile firmei preiau singure sarcinile repetitive (emailuri, oferte,
            facturi, răspunsuri la clienți), iar inteligența artificială se ocupă de partea cu text:
            citește, sortează și pregătește răspunsuri. Pentru un IMM din România, primul pas nu este
            alegerea unei aplicații, ci o listă scrisă cu sarcinile pe care echipa le face de mână în
            fiecare săptămână. Din lista aceea alegi un singur proces, îl automatizezi, îl verifici și
            abia apoi treci la următorul.
          </p>

          {/* Loc rezervat pentru un video viitor: [VIDEO – SEO - Director] */}

          <section className={sectionClass}>
            <h2 className={headingClass}>Ce înseamnă automatizări AI, pe înțelesul unui patron</h2>
            <p className={paragraphClass}>
              O automatizare obișnuită urmează reguli fixe: „când vine un formular, pune datele în
              tabel și trimite un email de confirmare”. Merge foarte bine cât timp datele vin mereu în
              aceeași formă.
            </p>
            <p className={paragraphClass}>
              Greul începe când informația vine „în cuvintele omului”: un client scrie pe WhatsApp că
              vrea o ofertă, un furnizor trimite o factură scanată, cineva cere o programare într-un
              email lung. Aici intră inteligența artificială. Ea înțelege textul, scoate din el datele
              importante și pregătește următorul pas.
            </p>
            <p className={paragraphClass}>Pe scurt, automatizările AI combină trei lucruri:</p>
            <ul className={listClass}>
              <li>
                <strong className="text-foreground">reguli clare</strong>, pentru ce trebuie să se
                întâmple mereu la fel;
              </li>
              <li>
                <strong className="text-foreground">legături între aplicații</strong> (email, CRM,
                tabel, program de facturare, WhatsApp), ca datele să nu mai fie copiate de mână;
              </li>
              <li>
                <strong className="text-foreground">AI pentru text și documente</strong>, acolo unde o
                regulă simplă nu ajunge.
              </li>
            </ul>
            <p className={paragraphClass}>
              Omul nu dispare din proces. Rămâne cel care aprobă ce contează: o ofertă, o plată, un
              răspuns delicat către un client.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>De ce se blochează multe firme înainte să înceapă</h2>
            <p className={paragraphClass}>
              Multe materiale despre automatizări AI vorbesc mai ales despre aplicații: care e mai
              bună, ce poate face fiecare, cum se leagă între ele. E util, dar pentru patronul unei
              firme mici blocajul nu e acolo.
            </p>
            <p className={paragraphClass}>Blocajul apare, de obicei, în altă parte:</p>
            <ul className={listClass}>
              <li>
                nimeni nu a scris vreodată pașii exacți ai unui proces, pentru că „fiecare știe ce are
                de făcut”;
              </li>
              <li>
                datele stau în locuri diferite: în emailul cuiva, într-un tabel vechi, în telefonul
                vânzătorului;
              </li>
              <li>nu e clar cine răspunde de automatizare după ce pornește;</li>
              <li>
                nu există o măsură a situației de „înainte”, deci nu poți spune dacă a meritat.
              </li>
            </ul>
            <p className={paragraphClass}>
              Ghidul de mai jos pornește de la partea asta, de la pregătirea din interiorul firmei.
              Aplicația se alege la final, după ce știi exact ce vrei să automatizezi.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Cum faci prima automatizare AI în firmă, pas cu pas</h2>
            <ol className="list-decimal space-y-4 pl-6 leading-relaxed text-muted-foreground">
              {steps.map((step) => (
                <li key={step.lead} className="pl-1">
                  <strong className="text-foreground">{step.lead}</strong>
                  {step.text}
                </li>
              ))}
            </ol>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Checklist: firma ta e pregătită pentru automatizări AI?</h2>
            <p className={paragraphClass}>Bifează înainte să ceri o ofertă sau să alegi o aplicație:</p>
            <ul className="space-y-3 rounded-lg border border-border/10 bg-foreground/[0.03] p-5">
              {checklistItems.map((item, index) => (
                <li key={item}>
                  <label
                    htmlFor={`automatizari-check-${index}`}
                    className="flex cursor-pointer items-start gap-3 leading-relaxed text-muted-foreground"
                  >
                    <input
                      id={`automatizari-check-${index}`}
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
            <p className={paragraphClass}>
              Dacă ai bifat aproape tot, ești gata pentru discuția despre unelte. Dacă nu, completează
              întâi lista. Te scutește de bani cheltuiți degeaba și de nervi mai târziu.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Manual vs automatizat cu AI: comparație pe sarcini obișnuite</h2>
            <div className="overflow-x-auto rounded-lg border border-border/10">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm text-muted-foreground">
                <thead className="bg-foreground/[0.05] text-foreground">
                  <tr>
                    <th scope="col" className={tableCellClass}>Sarcină</th>
                    <th scope="col" className={tableCellClass}>Cum se face manual</th>
                    <th scope="col" className={tableCellClass}>Cum arată cu automatizări AI</th>
                    <th scope="col" className={tableCellClass}>Ce rămâne la om</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td
                          key={cell}
                          className={`${tableCellClass}${index === 0 ? " font-semibold text-foreground" : ""}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={paragraphClass}>
              Coloana din dreapta contează cel mai mult. O automatizare bună nu scoate omul din proces,
              ci îl scoate din partea plictisitoare a procesului.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Unde ajută AI-ul și unde ajung regulile simple</h2>
            <p className={paragraphClass}>
              Nu orice automatizare are nevoie de AI. Dacă datele vin mereu în aceeași formă, de exemplu
              un formular cu câmpuri fixe, o regulă simplă e mai sigură și mai ușor de întreținut.
            </p>
            <p className={paragraphClass}>
              AI-ul își are locul acolo unde informația vine în forme diferite: emailuri scrise liber,
              mesaje pe WhatsApp, documente care nu arată niciodată la fel. Un sistem bun le combină pe
              toate trei: regulile verifică datele, AI-ul înțelege textul, iar omul aprobă ce e
              important.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Ce nu merită automatizat la început</h2>
            <p className={paragraphClass}>
              Nu orice sarcină e potrivită pentru primul proiect. Lasă deoparte, cel puțin la început:
            </p>
            <ul className={listClass}>
              <li>
                procesele care se schimbă des sau pe care nici echipa nu le face la fel de fiecare
                dată;
              </li>
              <li>
                deciziile importante luate fără verificare umană: plăți, contracte, angajări;
              </li>
              <li>
                sarcinile care apar foarte rar, unde pregătirea ar dura mai mult decât munca în sine;
              </li>
              <li>
                procesele în care datele sunt împrăștiate și nimeni nu știe unde e varianta corectă.
              </li>
            </ul>
            <p className={paragraphClass}>
              Mai întâi pui ordine în proces, abia apoi îl automatizezi. Dacă automatizezi haosul, obții
              doar haos mai rapid.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Întrebări frecvente despre automatizări AI</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <section key={faq.question} className="space-y-2">
                  <h3 className={subheadingClass}>{faq.question}</h3>
                  <p className={paragraphClass}>{faq.answer}</p>
                </section>
              ))}
            </div>
          </section>

          <section className="space-y-5 rounded-lg border border-border/10 bg-foreground/[0.03] p-6 md:p-8">
            <h2 className={headingClass}>Următorul pas: află ce merită automatizat în firma ta</h2>
            <p className={paragraphClass}>
              Dacă ai făcut deja jurnalul de sarcini, ai jumătate din drum parcurs. Dacă nu, nu e o
              problemă: putem să-l facem împreună. În auditul gratuit ne uităm la procesele firmei tale,
              alegem unul potrivit pentru început și îți spunem sincer dacă merită automatizat sau nu.
            </p>
            <div>
              <a
                href="/audit-gratuit"
                className="btn-3d-gold inline-block rounded-lg px-6 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <strong>Cere auditul gratuit</strong>
              </a>
            </div>
            <p className={paragraphClass}>
              sau vezi mai întâi{" "}
              <a href="/services" className="rounded text-primary underline underline-offset-4 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
                ce automatizări construim pentru IMM-uri
              </a>
              . Dacă preferi să vorbim direct, scrie-ne pe{" "}
              <a href="/contact" className="rounded text-primary underline underline-offset-4 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
                pagina de contact
              </a>
              . Mai multe despre noi găsești pe{" "}
              <a href="/" className="rounded text-primary underline underline-offset-4 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">
                pagina principală AI Automatizări
              </a>
              .
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

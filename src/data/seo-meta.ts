export const SITE_URL = "https://aiautomatizari.ro";
export const SITE_NAME = "AI Automatizări";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export type PageSEO = {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  noindex?: boolean;
  structuredData?: object | object[];
};

export const PAGE_SEO: Record<string, PageSEO> = {
  "/": {
    title:
      "AI Automatizări — Automatizări AI pentru IMM-uri în 5 zile | Timișoara",
    description:
      "Implementăm automatizări cu AI în 5 zile sau mai puțin. Recuperează 20+ ore pe săptămână din emailuri, CRM, oferte și facturare. Agenție din Timișoara, servim toată România.",
  },

  "/services": {
    title: "Servicii de Automatizare AI pentru Business | AI Automatizări",
    description:
      "Chatbot WhatsApp AI, automatizare CRM, fidelizare clienți, generare oferte automată, integrări Smartbill și n8n. Ofertă personalizată și audit gratuit pentru IMM-urile din România.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Servicii de Automatizare AI",
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: { "@type": "Country", name: "Romania" },
      serviceType: [
        "Automatizare procese business cu AI",
        "Chatbot AI WhatsApp",
        "Integrare AI cu CRM",
        "Automatizare generare oferte",
        "Automatizare email marketing",
      ],
    },
  },

  "/about": {
    title: "Despre noi — Erdelean Jelco | AI Automatizări, Timișoara",
    description:
      "AI Automatizări este agenția din Timișoara care ajută IMM-urile din România să automatizeze procese repetitive cu AI. Fondată de Erdelean Jelco.",
    ogType: "profile",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Despre AI Automatizări",
      url: `${SITE_URL}/about`,
      mainEntity: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        founder: {
          "@type": "Person",
          name: "Erdelean Jelco",
        },
      },
    },
  },

  "/portfolio": {
    title:
      "Portofoliu — Studii de Caz Automatizări AI | AI Automatizări",
    description:
      "Studii de caz reale: automatizări AI implementate pentru clinici, agenții digitale și IMM-uri. Vezi ce procese am automatizat și ce rezultate concrete am obținut.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Portofoliu AI Automatizări",
      url: `${SITE_URL}/portfolio`,
      about: "Studii de caz automatizare AI pentru IMM-uri din România",
    },
  },

  "/blog": {
    title:
      "Blog — Automatizare AI, AEO/GEO și Creștere pentru IMM-uri | AI Automatizări",
    description:
      "Articole despre automatizare AI pentru business, optimizare AEO/GEO, studii de caz și ghiduri practice. Scrise de Erdelean Jelco, fondator AI Automatizări.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog AI Automatizări",
      url: `${SITE_URL}/blog`,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      inLanguage: "ro-RO",
    },
  },

  "/contact": {
    title: "Contact | AI Automatizări — Timișoara, România",
    description:
      "Contactează-ne pentru o discuție gratuită despre automatizarea proceselor cu AI. Email: erdelean@aiautomatizari.ro. Locație: Timișoara.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact AI Automatizări",
      url: `${SITE_URL}/contact`,
      mainEntity: {
        "@type": "Organization",
        name: SITE_NAME,
        email: "erdelean@aiautomatizari.ro",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Timișoara",
          addressCountry: "RO",
        },
      },
    },
  },

  "/audit-gratuit": {
    title:
      "Audit Gratuit AI — Descoperă ce procese poți automatiza | AI Automatizări",
    description:
      "Audit gratuit, fără angajament, pentru a identifica procesele din firma ta care pot fi automatizate cu AI. Rezultate în 48h. Recuperează 20+ ore pe săptămână.",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Audit Gratuit Automatizare AI",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "Romania" },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "RON",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Cât costă auditul?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Auditul este complet gratuit, fără angajament. Investim timpul pentru că știm că multe firme nu sunt conștiente câte procese pot fi automatizate.",
            },
          },
          {
            "@type": "Question",
            name: "Cât durează auditul?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Primești rezultatele auditului în maximum 48 de ore de la completarea formularului. Include o listă concretă de procese automatizabile, prioritizate după impact.",
            },
          },
          {
            "@type": "Question",
            name: "Ce primesc după audit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Primești un raport cu procesele identificate ca fiind automatizabile, estimarea timpului economisit pe fiecare, prioritizare după ROI și o propunere de plan de implementare.",
            },
          },
          {
            "@type": "Question",
            name: "Sunt obligat să cumpăr ceva după audit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nu. Auditul este 100% gratuit, fără obligație. Multe firme folosesc raportul pentru a implementa intern automatizările identificate.",
            },
          },
        ],
      },
    ],
  },

  "/cerere-oferta": {
    title:
      "Cerere Ofertă Automatizare AI — Răspuns în 24h | AI Automatizări",
    description:
      "Solicită o ofertă personalizată pentru automatizarea proceselor afacerii tale cu AI. Răspuns în 24h, implementare în 5 zile sau mai puțin.",
  },

  "/showroom-vsl": {
    title:
      "Showroom — Vezi cum funcționează automatizările AI în practică | AI Automatizări",
    description:
      "Video demonstrativ și exemple live cu automatizări AI pentru IMM-uri. Vezi cum arată integrările reale cu WhatsApp, CRM, Smartbill și alte tool-uri populare.",
  },

  "/fidelizare-pacienti": {
    title:
      "Fidelizare Pacienți pentru Clinici Dentare — Sistem Automat AI | AI Automatizări",
    description:
      "Oprește pierderea pacienților din cauza răspunsurilor întârziate. Sistem automat de fidelizare cu AI pentru clinici dentare din România. Demo gratuit.",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Sistem de Fidelizare Pacienți pentru Clinici Dentare",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: { "@type": "Country", name: "Romania" },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Clinici dentare",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Cum funcționează sistemul de fidelizare?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sistemul automat răspunde pacienților instant pe WhatsApp 24/7, trimite reminder-e pentru programări, follow-up post-tratament și reactivează pacienții inactivi — toate automat, cu AI.",
            },
          },
          {
            "@type": "Question",
            name: "În cât timp se implementează?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sistemul se implementează în 5 zile sau mai puțin. Nu este necesară schimbarea softului curent — se integrează cu sistemele existente.",
            },
          },
          {
            "@type": "Question",
            name: "Este compatibil GDPR?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Da. Sistemul este 100% compatibil GDPR, inclusiv pentru date medicale sensibile. Toate datele sunt stocate pe servere UE, cu criptare end-to-end.",
            },
          },
        ],
      },
    ],
  },

  "/whatsapp-demo": {
    title:
      "WhatsApp Chatbot AI — Demo Live pentru Business | AI Automatizări",
    description:
      "Vezi cum funcționează un chatbot AI pe WhatsApp Business: răspunsuri instant 24/7, calificare lead-uri, programări automate. Demo live și integrare rapidă.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Chatbot AI pentru WhatsApp Business",
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: { "@type": "Country", name: "Romania" },
      serviceType: "Chatbot AI WhatsApp",
    },
  },

  "/business-card": {
    title: "Business Card Digital — Erdelean Jelco | AI Automatizări",
    description:
      "Business card digital AI Automatizări. Contact direct, servicii, portfolio — toate într-un singur link.",
  },

  "/linktree": {
    title: "Link-uri AI Automatizări — Toate resursele într-un loc",
    description:
      "Toate canalele și resursele AI Automatizări: servicii, portofoliu, blog, contact și social media.",
  },

  "/terms": {
    title: "Termeni și Condiții | AI Automatizări",
    description:
      "Termeni și condiții de utilizare a serviciilor AI Automatizări.",
  },

  "/gdpr": {
    title: "Politică GDPR | AI Automatizări",
    description:
      "Informații despre prelucrarea datelor personale conform GDPR în cadrul AI Automatizări.",
  },

  "/privacy": {
    title: "Politică de Confidențialitate | AI Automatizări",
    description:
      "Cum colectăm, folosim și protejăm datele tale personale. Politica de confidențialitate AI Automatizări.",
  },

  "/cookies": {
    title: "Politică Cookies | AI Automatizări",
    description:
      "Cum folosim cookie-uri și tehnologii similare pe site-ul AI Automatizări.",
  },
};

export function getPageSEO(pathname: string): PageSEO | null {
  if (PAGE_SEO[pathname]) return PAGE_SEO[pathname];
  const normalized = pathname.replace(/\/$/, "") || "/";
  return PAGE_SEO[normalized] ?? null;
}

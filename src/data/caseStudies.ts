import { CaseStudy, Category } from "@/types/portfolio";

export const categories: Category[] = [
  { id: "productivity", label: "Productivitate" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "sales", label: "Vânzări" },
  { id: "more", label: "Și Altele" },
];

export const caseStudies: CaseStudy[] = [
  {
    client: "Asistent AI Personal",
    industry: "Productivitate Personală",
    category: "productivity",
    challenge: "Gestionarea manuală a sarcinilor zilnice, programărilor și organizării personale",
    solution: "Implementarea unui asistent AI comprehensiv pentru managementul sarcinilor, organizarea calendarului și automatizarea fluxului de lucru personal",
    results: {
      timeReduction: "80%",
      costSaving: "150.000€ anual",
      roi: "450%",
      timeline: "2 luni"
    },
    beforeAfter: {
      before: "6+ ore zilnic pentru management personal",
      after: "Gestionare automată a sarcinilor, programare inteligentă"
    }
  },
  {
    client: "Asistent Email AI",
    industry: "Automatizare Procese de Afaceri",
    category: "productivity",
    challenge: "Gestionarea manuală a unui volum mare de email-uri, programări și comunicare cu clienții",
    solution: "Implementarea unui asistent email bazat pe AI pentru gestionarea automată a răspunsurilor, programărilor și comunicării cu clienții",
    results: {
      timeReduction: "95%",
      costSaving: "200.000€ anual",
      roi: "500%",
      timeline: "1 lună"
    },
    beforeAfter: {
      before: "4+ ore zilnic pentru gestionarea email-urilor",
      after: "Răspunsuri automate, programare instantanee"
    }
  },
  {
    client: "Asistent Întâlniri AI",
    industry: "Productivitate Corporativă",
    category: "productivity",
    challenge: "Timp pierdut în întâlniri neproductive și luare manuală de notițe",
    solution: "Dezvoltarea unui asistent AI pentru întâlniri cu transcriere automată, extragerea punctelor de acțiune și gestionarea follow-up-urilor",
    results: {
      timeReduction: "70%",
      costSaving: "180.000€ anual",
      roi: "400%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "3+ ore zilnic pentru managementul întâlnirilor",
      after: "Transcrieri și puncte de acțiune automate"
    }
  },
  {
    client: "Procesare Documente AI",
    industry: "Servicii Legale",
    category: "productivity",
    challenge: "Revizuirea manuală a documentelor și extragerea datelor care durează excesiv de mult",
    solution: "Implementarea unui sistem de analiză a documentelor bazat pe AI și extragerea datelor",
    results: {
      timeReduction: "85%",
      costSaving: "300.000€ anual",
      roi: "550%",
      timeline: "4 luni"
    },
    beforeAfter: {
      before: "8+ ore pe lot de documente",
      after: "15 minute pe lot cu AI"
    }
  },
  {
    client: "Asistent de Cercetare AI",
    industry: "Cercetare Academică",
    category: "productivity",
    challenge: "Procesul consumator de timp de revizuire a literaturii și sinteză a cercetării",
    solution: "Dezvoltarea unui asistent de cercetare bazat pe AI pentru analiza automată a lucrărilor, generarea de rezumate și gestionarea citatelor",
    results: {
      timeReduction: "75%",
      costSaving: "100.000€ anual",
      roi: "350%",
      timeline: "2 luni"
    },
    beforeAfter: {
      before: "40+ ore pe revizuirea unei lucrări de cercetare",
      after: "10 ore cu asistență AI"
    }
  },
  {
    client: "Asistent de Scriere AI",
    industry: "Creare de Conținut",
    category: "productivity",
    challenge: "Proces lent de creare și editare a conținutului",
    solution: "Implementarea unui asistent de scriere AI pentru generarea de conținut, editare și consistență stilistică",
    results: {
      timeReduction: "65%",
      costSaving: "90.000€ anual",
      roi: "300%",
      timeline: "1.5 luni"
    },
    beforeAfter: {
      before: "20+ ore pe piesă de conținut",
      after: "7 ore cu asistență AI"
    }
  },
  {
    client: "AI pentru Managementul Proiectelor",
    industry: "Dezvoltare Software",
    category: "productivity",
    challenge: "Urmărirea ineficientă a proiectelor și alocarea resurselor",
    solution: "Crearea unui sistem de management al proiectelor bazat pe AI pentru atribuirea automată a sarcinilor și urmărirea progresului",
    results: {
      timeReduction: "55%",
      costSaving: "200.000€ anual",
      roi: "400%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "30+ ore săptămânal pentru managementul proiectelor",
      after: "13 ore cu automatizare AI"
    }
  },
  {
    client: "TechCorp Solutions",
    industry: "Producție",
    category: "ecommerce",
    challenge: "Procesare manuală a datelor care durează 40+ ore săptămânal",
    solution: "Implementarea procesării documentelor bazate pe AI",
    results: {
      timeReduction: "85%",
      costSaving: "120.000€ anual",
      roi: "380%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "Introducere manuală a datelor, rate mari de eroare",
      after: "Procesare automată, 99.9% acuratețe"
    }
  },
  {
    client: "Global Logistics Inc",
    industry: "Transport",
    category: "sales",
    challenge: "Planificare și programare ineficientă a rutelor",
    solution: "Sistem de optimizare a rutelor bazat pe AI",
    results: {
      timeReduction: "60%",
      costSaving: "250.000€ anual",
      roi: "450%",
      timeline: "4 luni"
    },
    beforeAfter: {
      before: "Planificare manuală a rutelor, risipă de combustibil",
      after: "Rute optimizate, economii de combustibil de 40%"
    }
  },
  {
    client: "Inovații Financiare",
    industry: "Servicii Financiare",
    category: "more",
    challenge: "Întârziere de 72+ ore în suportul clienților",
    solution: "Chatbot AI și automatizare a tichetelor",
    results: {
      timeReduction: "90%",
      costSaving: "180.000€ anual",
      roi: "320%",
      timeline: "2 luni"
    },
    beforeAfter: {
      before: "Timp de răspuns de 72 de ore",
      after: "Răspunsuri instantanee, satisfacție de 95%"
    }
  },
  {
    client: "Magazin de Ceasuri de Lux",
    industry: "E-commerce Shopify",
    category: "ecommerce",
    challenge: "Personalizare manuală a produselor și procesare a comenzilor",
    solution: "Implementarea unui configurator de produse automatizat și flux de lucru pentru comenzi",
    results: {
      timeReduction: "85%",
      costSaving: "120.000€ anual",
      roi: "400%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "Proces de personalizare manuală, procesare a comenzilor în 2 zile",
      after: "Personalizare instantanee, procesare în aceeași zi"
    }
  },
  {
    client: "Piața de Alimente Organice",
    industry: "E-commerce Shopify",
    category: "ecommerce",
    challenge: "Gestionarea complexă a abonamentelor și programarea livrărilor",
    solution: "Sistem automatizat de abonamente cu optimizare inteligentă a livrărilor",
    results: {
      timeReduction: "70%",
      costSaving: "90.000€ anual",
      roi: "350%",
      timeline: "2 luni"
    },
    beforeAfter: {
      before: "Urmărire manuală a abonamentelor",
      after: "Gestionare automată a abonamentelor"
    }
  },
  {
    client: "Magazin de Mobilier Designer",
    industry: "E-commerce Shopify",
    category: "ecommerce",
    challenge: "Proces ineficient de realizare la comandă și gestionare a stocurilor",
    solution: "Implementarea unui sistem automatizat de urmărire a producției și prognozare a stocurilor",
    results: {
      timeReduction: "75%",
      costSaving: "150.000€ anual",
      roi: "425%",
      timeline: "4 luni"
    },
    beforeAfter: {
      before: "Urmărire manuală a producției",
      after: "Monitorizare în timp real a producției"
    }
  },
  {
    client: "Brand de Produse de Wellness",
    industry: "E-commerce Shopify",
    category: "ecommerce",
    challenge: "Gestionarea complexă a stocurilor pe mai multe canale",
    solution: "Implementarea sincronizării stocurilor între platforme",
    results: {
      timeReduction: "80%",
      costSaving: "100.000€ anual",
      roi: "375%",
      timeline: "2.5 luni"
    },
    beforeAfter: {
      before: "Actualizări manuale ale stocurilor pe canale",
      after: "Sincronizare automată pe mai multe canale"
    }
  },
  {
    client: "Magazin de Colecționari Vintage",
    industry: "E-commerce Shopify",
    category: "ecommerce",
    challenge: "Proces manual de autentificare și stabilire a prețurilor",
    solution: "Flux de lucru automatizat pentru autentificare și sistem dinamic de stabilire a prețurilor",
    results: {
      timeReduction: "65%",
      costSaving: "80.000€ anual",
      roi: "300%",
      timeline: "2 luni"
    },
    beforeAfter: {
      before: "Proces manual de autentificare",
      after: "Flux de lucru de autentificare simplificat"
    }
  },
  {
    client: "Piața de Meșteșuguri Handmade",
    industry: "E-commerce Shopify",
    category: "ecommerce",
    challenge: "Gestionarea complexă a plăților artiștilor și urmărirea comisioanelor",
    solution: "Distribuție automată a plăților și calcularea comisioanelor",
    results: {
      timeReduction: "90%",
      costSaving: "130.000€ anual",
      roi: "450%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "Procesare manuală a plăților",
      after: "Plăți automate instantanee"
    }
  },
  {
    client: "Produse pentru Pisici Premium",
    industry: "E-commerce Shopify",
    category: "ecommerce",
    challenge: "Recomandări de produse personalizate ineficiente",
    solution: "Motor de recomandare bazat pe AI cu profiluri pentru animale de companie",
    results: {
      timeReduction: "75%",
      costSaving: "95.000€ anual",
      roi: "380%",
      timeline: "2 luni"
    },
    beforeAfter: {
      before: "Sugestii de produse generice",
      after: "Recomandări personalizate pentru animale de companie"
    }
  },
  {
    client: "Brand de Îmbrăcăminte Sportivă",
    industry: "E-commerce Shopify",
    category: "ecommerce",
    challenge: "Sistem complex de recomandare a mărimilor",
    solution: "Implementarea unui algoritm de predicție a mărimii bazat pe AI",
    results: {
      timeReduction: "70%",
      costSaving: "110.000€ anual",
      roi: "400%",
      timeline: "2.5 luni"
    },
    beforeAfter: {
      before: "Rată mare de returnare din cauza problemelor de mărime",
      after: "Reducere de 50% a returnărilor legate de mărime"
    }
  },
  {
    client: "Prăjitorie de Cafea Gourmet",
    industry: "E-commerce Shopify",
    category: "ecommerce",
    challenge: "Personalizare manuală a abonamentelor și programarea prăjirii",
    solution: "Preferințe automate pentru abonamente și planificare a producției",
    results: {
      timeReduction: "85%",
      costSaving: "75.000€ anual",
      roi: "350%",
      timeline: "2 luni"
    },
    beforeAfter: {
      before: "Gestionarea manuală a programului de prăjire",
      after: "Optimizare automată a producției"
    }
  },
  {
    client: "Serviciu de Imprimare Personalizată",
    industry: "E-commerce Shopify",
    category: "ecommerce",
    challenge: "Flux de lucru complex pentru aprobat designul și producția",
    solution: "Verificare automată a designului și pipeline de producție",
    results: {
      timeReduction: "80%",
      costSaving: "140.000€ anual",
      roi: "425%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "Proces manual de revizuire a designului",
      after: "Verificare automată a designului"
    }
  },
  {
    client: "Furnizor de Soluții pentru Întreprinderi",
    industry: "Vânzări B2B",
    category: "sales",
    challenge: "Gestionarea complexă a ciclului de vânzări pentru întreprinderi",
    solution: "Implementarea automatizării pipeline-ului de vânzări bazată pe AI",
    results: {
      timeReduction: "60%",
      costSaving: "300.000€ anual",
      roi: "500%",
      timeline: "4 luni"
    },
    beforeAfter: {
      before: "Ciclul mediu de vânzări de 6 luni",
      after: "Ciclul mediu de vânzări de 2.5 luni"
    }
  },
  {
    client: "Firmă de Servicii Financiare",
    industry: "Vânzări Financiare",
    category: "sales",
    challenge: "Gestionarea manuală a portofoliului de clienți",
    solution: "Urmărirea automată a portofoliului și detectarea oportunităților",
    results: {
      timeReduction: "75%",
      costSaving: "250.000€ anual",
      roi: "450%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "Revizuire manuală a portofoliului",
      after: "Optimizare în timp real a portofoliului"
    }
  },
  {
    client: "Echipamente de Producție",
    industry: "Vânzări Industriale",
    category: "sales",
    challenge: "Proces complex de generare a ofertelor",
    solution: "Generare automată a ofertelor și flux de aprobat",
    results: {
      timeReduction: "85%",
      costSaving: "200.000€ anual",
      roi: "400%",
      timeline: "2.5 luni"
    },
    beforeAfter: {
      before: "Timp de răspuns de 48 de ore pentru ofertă",
      after: "Generare instantanee a ofertelor"
    }
  },
  {
    client: "Soluții pentru Sănătate",
    industry: "Vânzări Medicale",
    category: "sales",
    challenge: "Documentație de vânzări supusă conformității",
    solution: "Verificare automată a conformității și documentației",
    results: {
      timeReduction: "70%",
      costSaving: "180.000€ anual",
      roi: "380%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "Verificări manuale ale conformității",
      after: "Verificare automată a conformității"
    }
  },
  {
    client: "Furnizor de Servicii Cloud",
    industry: "Vânzări Tehnologice",
    category: "sales",
    challenge: "Pachetare și stabilire a prețurilor complexe",
    solution: "Motor de configurare a serviciilor și stabilire a prețurilor bazat pe AI",
    results: {
      timeReduction: "80%",
      costSaving: "350.000€ anual",
      roi: "520%",
      timeline: "4 luni"
    },
    beforeAfter: {
      before: "Configurare manuală a serviciilor",
      after: "Optimizare instantanee a pachetelor"
    }
  },
  {
    client: "Pro Lead Generation",
    industry: "Vânzări B2B",
    category: "sales",
    challenge: "Proces manual de identificare și calificare a lead-urilor",
    solution: "Sistem de calificare și scorare a lead-urilor bazat pe AI",
    results: {
      timeReduction: "88%",
      costSaving: "280.000€ anual",
      roi: "490%",
      timeline: "2 luni"
    },
    beforeAfter: {
      before: "Calificare manuală a lead-urilor",
      after: "Scorare și prioritizare automată a lead-urilor"
    }
  },
  {
    client: "Master Campanii Email",
    industry: "Marketing Digital",
    category: "sales",
    challenge: "Gestionarea ineficientă a campaniilor email și personalizare",
    solution: "Platformă de automatizare a marketingului prin email bazată pe AI",
    results: {
      timeReduction: "92%",
      costSaving: "320.000€ anual",
      roi: "510%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "Crearea manuală a campaniilor email",
      after: "Campanii personalizate automate"
    }
  },
  {
    client: "Social Sales Connect",
    industry: "Vânzări Sociale",
    category: "sales",
    challenge: "Eforturi de generare de lead-uri pe rețele sociale deconectate",
    solution: "Platformă integrată de prospectare și angajare pe rețele sociale",
    results: {
      timeReduction: "85%",
      costSaving: "240.000€ anual",
      roi: "460%",
      timeline: "2.5 luni"
    },
    beforeAfter: {
      before: "Prospectare manuală pe rețele sociale",
      after: "Generare automată de lead-uri sociale"
    }
  },
  {
    client: "Hub de Inteligență în Vânzări",
    industry: "Analiza Vânzărilor",
    category: "sales",
    challenge: "Vizibilitate limitată în oportunitățile și tendințele de vânzări",
    solution: "Platformă de inteligență și prognoză în vânzări bazată pe AI",
    results: {
      timeReduction: "78%",
      costSaving: "290.000€ anual",
      roi: "480%",
      timeline: "3.5 luni"
    },
    beforeAfter: {
      before: "Analiză manuală a vânzărilor",
      after: "Inteligență în vânzări în timp real"
    }
  },
  {
    client: "Optimizator de Pipeline",
    industry: "Operațiuni de Vânzări",
    category: "sales",
    challenge: "Gestionare ineficientă a pipeline-ului de vânzări",
    solution: "Sistem de optimizare automată a pipeline-ului și urmărire a ofertelor",
    results: {
      timeReduction: "82%",
      costSaving: "310.000€ anual",
      roi: "495%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "Actualizări manuale ale pipeline-ului",
      after: "Gestionare automată a pipeline-ului"
    }
  },
  {
    client: "Pro Marketing Bazat pe Conturi",
    industry: "Marketing B2B",
    category: "sales",
    challenge: "Executarea fragmentată a campaniilor ABM",
    solution: "Platformă integrată de automatizare ABM",
    results: {
      timeReduction: "87%",
      costSaving: "270.000€ anual",
      roi: "470%",
      timeline: "2.5 luni"
    },
    beforeAfter: {
      before: "Gestionare manuală a campaniilor ABM",
      after: "ABM automatizat pe mai multe canale"
    }
  },
  {
    client: "Suită de Angajament în Vânzări",
    industry: "Tehnologie în Vânzări",
    category: "sales",
    challenge: "Procese de angajament în vânzări inconsistente",
    solution: "Platformă automată de angajament în vânzări pe mai multe canale",
    results: {
      timeReduction: "90%",
      costSaving: "330.000€ anual",
      roi: "530%",
      timeline: "3 luni"
    },
    beforeAfter: {
      before: "Urmărire manuală a angajamentului",
      after: "Orchestrare automată a angajamentului"
    }
  }
];

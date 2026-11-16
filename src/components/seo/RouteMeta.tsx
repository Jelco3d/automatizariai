import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://aiautomatizari.ro";

type Meta = { title: string; description: string; noindex?: boolean };

const META: Record<string, Meta> = {
  "/": { title: "AI Automatizări — Automatizări cu AI pentru IMM-uri în 5 zile sau mai puțin", description: "Implementăm automatizări cu AI pentru IMM-uri din România în 5 zile sau mai puțin. Recuperează 20+ ore pe săptămână din taskuri repetitive." },
  "/acasă": { title: "Erdelean Jelco — Automatizări cu AI pentru firme", description: "Află cum Erdelean Jelco ajută firmele din România să automatizeze vânzările, suportul și operațiunile cu agenți AI." },
  "/services": { title: "Servicii de automatizare AI pentru firme | AI Automatizări", description: "Agenți AI, automatizări CRM, chatboți și integrări personalizate pentru IMM-uri. Vezi toate serviciile și ce poți automatiza." },
  "/about": { title: "Despre noi — Povestea AI Automatizări", description: "Cine suntem, cum lucrăm și de ce ne-am specializat în automatizări cu AI pentru antreprenorii din România." },
  "/portfolio": { title: "Portofoliu și studii de caz | AI Automatizări", description: "Povești de succes și rezultate reale obținute de clienții noștri prin automatizări cu AI." },
  "/terms": { title: "Termeni și condiții | AI Automatizări", description: "Termenii și condițiile de utilizare a site-ului și serviciilor AI Automatizări." },
  "/gdpr": { title: "Politica GDPR | AI Automatizări", description: "Cum respectăm Regulamentul GDPR și ce drepturi ai asupra datelor tale personale." },
  "/privacy": { title: "Politica de confidențialitate | AI Automatizări", description: "Ce date colectăm, de ce le folosim și cum le protejăm." },
  "/cookies": { title: "Politica de cookie-uri | AI Automatizări", description: "Ce cookie-uri folosește site-ul AI Automatizări și cum le poți gestiona." },
  "/blog": { title: "Blog AI Automatizări — ghiduri despre AI pentru afaceri", description: "Articole practice despre automatizări cu AI, costuri, unelte și studii de caz pentru IMM-urile din România." },
  "/contact": { title: "Contact | AI Automatizări", description: "Contactează-ne pentru o discuție despre automatizarea afacerii tale cu AI. Telefon, email și programare directă." },
  "/business-card": { title: "Card de vizită digital — Jelco, AI Automatizări", description: "Cardul de vizită digital al lui Jelco: date de contact, rețele sociale și servicii AI Automatizări." },
  "/linktree": { title: "Profil și linkuri — Jelco, AI Automatizări", description: "Toate linkurile importante: website, servicii, portofoliu, rețele sociale și contact direct." },
  "/fidelizare-pacienti": { title: "Sistem de fidelizare automată pentru clinici dentare", description: "Cum pot clinicile dentare să-și crească programările cu un sistem automat de fidelizare a pacienților, fără reclame." },
  "/cerere-oferta": { title: "Cerere ofertă personalizată | AI Automatizări", description: "Completează formularul și primești o ofertă personalizată de automatizare AI pentru afacerea ta." },
};

const PRIVATE: Meta = { title: "AI Automatizări", description: "Zonă privată AI Automatizări.", noindex: true };

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.content = value;
}

/** Sets a self-referencing canonical + page-specific title/description on every route.
 *  Blog articles (/blog/:slug) manage their own tags in BlogPost. */
export default function RouteMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith("/blog/")) return;
    const path = decodeURI(pathname).replace(/\/+$/, "") || "/";
    const meta = META[path] ?? PRIVATE;
    const url = SITE + (path === "/" ? "/" : encodeURI(path));
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "robots", meta.noindex ? "noindex, nofollow" : "index, follow");
    let canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = url;
  }, [pathname]);
  return null;
}

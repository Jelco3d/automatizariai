import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  PhoneOff,
  MessageCircle,
  Trophy,
  LayoutDashboard,
  GraduationCap,
  ShieldCheck,
  Clock,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Calendar,
} from "lucide-react";
import { Navigation } from "@/components/website/Navigation";

const Footer = lazy(() =>
  import("@/components/website/Footer").then((m) => ({ default: m.Footer }))
);
const AuditFormModal = lazy(() =>
  import("@/components/website/AuditFormModal").then((m) => ({
    default: m.AuditFormModal,
  }))
);

const problems = [
  "Clienții te sună de 30-50 ori pe zi să întrebe „gata comanda mea?”",
  "Un angajat pierde 20% din timp doar răspunzând la telefon în loc să producă",
  "Pierzi 3-5 comenzi mari/săptămână pentru că mesajele se amestecă între WhatsApp, Gmail și telefon",
  "Clienții vechi uită să revină pentru că n-ai niciun sistem să-i stimulezi",
  "Simți că lucrezi pentru afacerea ta, nu invers",
];

const solutions = [
  {
    icon: PhoneOff,
    title: "Portal Clienți Privat",
    desc: "Fiecare client are cont propriu. Intră, vede comenzile, stadiul producției, istoric, facturi. Nu te mai sună niciodată să întrebe.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Notificări Automate",
    desc: "Când comanda trece dintr-o fază în alta (primită → în producție → gata → livrată), clientul primește automat un mesaj pe WhatsApp.",
  },
  {
    icon: Trophy,
    title: "Sistem de Recompense Gamified",
    desc: "Cu cât un client comandă mai mult, cu atât primește reduceri mai mari. Îi transformi în clienți recurenți fără efort manual.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard pentru tine",
    desc: "Vezi în timp real: comenzi active, întârzieri, valoare pipeline, clienți top. Știi exact unde ești.",
  },
  {
    icon: GraduationCap,
    title: "Setup complet + training echipă",
    desc: "Nu primești un link și „descurcă-te.” Eu fac tot — tu și echipa învățați în 1 oră cum să-l folosiți.",
  },
];

const timeline = [
  { day: "Ziua 1", text: "Call discovery 60 min — îți aflu fluxul, comenzile, clienții" },
  { day: "Ziua 2-3", text: "Arhitectura sistemului + design portal" },
  { day: "Ziua 4-10", text: "Construiesc portalul, WhatsApp flows, gamification" },
  { day: "Ziua 11-12", text: "Integrare date (clienți existenți, comenzi active)" },
  { day: "Ziua 13", text: "Training pentru tine + echipă (1h)" },
  { day: "Ziua 14", text: "GO LIVE — sistemul rulează" },
  { day: "Ziua 15-45", text: "30 zile de suport gratuit — orice ajustare, o fac" },
];

const includes = [
  "Portal clienți complet, branded cu firma ta",
  "WhatsApp automation (notificări pe fiecare fază)",
  "Sistem de recompense & loyalty gamification",
  "Dashboard pentru tine",
  "Integrare cu sistemul tău actual (Excel, ERP, CRM — ce ai)",
  "Training echipă (1h live)",
  "30 zile suport + ajustări gratuit",
  "Garanție: ROI în 60 zile sau returnez banii integral",
];

const faqs = [
  {
    q: "Nu am ERP, am doar Excel și WhatsApp. Merge?",
    a: "Da. Majoritatea clienților mei au exact asta. Construiesc peste ce ai, nu te forțez să schimbi totul.",
  },
  {
    q: "Cât durează până văd rezultate?",
    a: "Apelurile scad din prima săptămână GO LIVE. Comenzile recuperate — din prima lună. ROI financiar în 60 zile sau returnez banii.",
  },
  {
    q: "Ce se întâmplă după 30 de zile de suport?",
    a: "Alegi: (1) nu mai plătești nimic și sistemul rulează singur, (2) retainer opțional €400/lună pentru ajustări + features noi.",
  },
  {
    q: "Lucrezi cu străinătatea?",
    a: "Momentan doar România. Anul viitor extind spre Spania și Italia.",
  },
  {
    q: "Ce dacă sistemul pică?",
    a: "E hosted pe infrastructură enterprise (99.9% uptime). În 12 luni, primul client n-a avut niciun downtime.",
  },
  {
    q: "De ce €6.500 și nu €2.000 ca alții?",
    a: "Pentru că nu îți vând un template. Construiesc sistem custom pentru fluxul tău specific, cu training, suport și garanție de ROI. Un template de €2.000 îl arunci în 2 luni. Al meu îți aduce €80K+/an.",
  },
];

const ClientPortalSystem = () => {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const openModal = () => setIsAuditModalOpen(true);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden relative">
      <Helmet>
        <title>Portal Clienți + WhatsApp Automation | 14 zile, ROI 60 zile</title>
        <meta
          name="description"
          content="Portal clienți + WhatsApp automation pentru ateliere cu producție la comandă. Livrat în 14 zile. ROI în mai puțin de 60 de zile sau returnez banii."
        />
        <link rel="canonical" href="https://automatizariai.lovable.app/client-portal-system" />
      </Helmet>

      <Navigation onOpenAuditModal={openModal} />

      {/* Background orbs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ contain: "layout style paint" }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-orb-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-orb-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <main className="relative z-10">
        {/* HERO */}
        <section className="container mx-auto px-4 pt-24 md:pt-32 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-semibold">
                Pentru ateliere cu producție la comandă
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Clienții tăi te sună de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                10 ori pe zi
              </span>{" "}
              să întrebe dacă e gata comanda.
            </h1>
            <p className="text-lg md:text-2xl text-white/70 mb-4 font-medium">
              Eu construiesc sistemul care îi face să nu mai sune{" "}
              <span className="text-yellow-400 font-bold">niciodată</span>.
            </p>
            <p className="text-white/50 text-base md:text-lg max-w-3xl mx-auto mb-10">
              Portal clienți + WhatsApp automation pentru ateliere cu producție la comandă.
              Livrat în <span className="text-yellow-400 font-semibold">14 zile</span>. ROI în
              mai puțin de <span className="text-yellow-400 font-semibold">60 de zile</span> —
              sau îți returnez banii.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Button
                onClick={openModal}
                className="btn-3d-gold px-6 py-5 md:px-10 md:py-7 h-auto text-base md:text-lg rounded-xl animate-glow-pulse"
              >
                Programează un apel de 15 minute — Gratuit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-white/40 text-sm">
                Ultimul client a recuperat{" "}
                <span className="text-yellow-400 font-semibold">€7.000-€10.000/lună</span> în
                primele 30 de zile.
              </p>
            </div>
          </motion.div>
        </section>

        {/* PROBLEM */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
              <h2 className="text-2xl md:text-4xl font-bold text-center">
                Dacă ai fabrică care produce la comandă, recunoști asta:
              </h2>
            </div>
            <div className="space-y-3 mt-10">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 md:p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-red-400/30 transition-all"
                >
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 text-base md:text-lg">{p}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-amber-500/5 border border-yellow-400/30">
              <p className="text-lg md:text-xl text-white mb-3">
                💡 Dacă ai dat din cap la 2 din 5 — pierzi{" "}
                <span className="text-yellow-400 font-bold">€5.000-€15.000/lună</span>. Chiar
                acum.
              </p>
              <p className="text-white/70">
                Nu pentru că ești prost. Pentru că ai construit o afacere, nu un sistem. Ai doi
                pumni. Nu poți răspunde la 50 de apeluri ȘI să produci ȘI să vinzi ȘI să
                conduci oamenii. Ori angajezi încă o persoană (€1.500+/lună), ori construiești
                un sistem care o face pentru tine — o dată, și lucrează pentru totdeauna.
              </p>
            </div>
          </motion.div>
        </section>

        {/* SOLUTION */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-4">
              Soluția — Client Portal System
            </h2>
            <p className="text-white/60 text-lg">
              Un sistem complet care transformă haosul telefonului într-un flux automat.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-yellow-400/40 transition-all group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/10 border border-yellow-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <s.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      {s.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CASE STUDY */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                Case Study
              </span>{" "}
              — Fabrică de mobilă, România
            </h2>
            <p className="text-center text-white/50 mb-12">Rezultate reale, în 3 săptămâni.</p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/[0.02] border border-red-400/20">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5" /> Înainte
                  </h3>
                  <ul className="space-y-3 text-white/70">
                    <li>• 30-50 comenzi/lună</li>
                    <li>• Clienți sună pe telefon, WhatsApp și email — haos total</li>
                    <li>• 3-5 comenzi mari pierdute/săptămână din miscomunicare</li>
                    <li>• Un angajat pierdea 20% din timp pe apeluri</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-400/10 to-amber-500/5 border border-yellow-400/40">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> După (3 săptămâni)
                  </h3>
                  <ul className="space-y-3 text-white/80">
                    <li>✅ Apelurile „gata comanda?” au scăzut 100%</li>
                    <li>✅ Zero comenzi pierdute pe lună curentă</li>
                    <li>✅ €7.000-€10.000/lună recuperate în profit</li>
                    <li>✅ Output producție +18%</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
                <p className="text-white/50 text-sm mb-1">Investiție</p>
                <p className="text-2xl font-bold text-yellow-400">€3.500</p>
                <p className="text-white/40 text-xs mt-1">(preț vechi — acum €6.500)</p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
                <p className="text-white/50 text-sm mb-1">Payback</p>
                <p className="text-2xl font-bold text-yellow-400">2 săptămâni</p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center">
                <p className="text-white/50 text-sm mb-1">ROI 12 luni</p>
                <p className="text-2xl font-bold text-yellow-400">€84K-€120K</p>
              </div>
            </div>

            <blockquote className="mt-10 p-6 md:p-8 rounded-2xl bg-white/[0.04] border-l-4 border-yellow-400 italic text-white/80 text-lg md:text-xl">
              „Nu mai răspund la telefon toată ziua. Clienții văd singuri ce se întâmplă. A
              meritat de 20 de ori.”
              <footer className="mt-3 text-sm text-white/50 not-italic">
                — Client fabrică de mobilă, Oradea
              </footer>
            </blockquote>
          </motion.div>
        </section>

        {/* TIMELINE */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 mb-4">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-semibold">
                  14 zile de la contract la livrare
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                Cum funcționează
              </h2>
            </div>

            <div className="space-y-3">
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-stretch gap-4 group"
                >
                  <div className="flex-shrink-0 w-28 md:w-36 px-3 py-4 rounded-xl bg-gradient-to-br from-yellow-400/15 to-amber-500/5 border border-yellow-400/30 flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-sm md:text-base">
                      {t.day}
                    </span>
                  </div>
                  <div className="flex-1 px-4 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-yellow-400/30 transition-all flex items-center">
                    <p className="text-white/80 text-sm md:text-base">{t.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PRICING */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-3">
                Investiție
              </h2>
              <p className="text-white/60">Un preț. Tot inclus. Garanție de ROI.</p>
            </div>

            <Card className="bg-gradient-to-br from-yellow-400/[0.08] to-amber-500/[0.03] border-2 border-yellow-400/40 overflow-hidden relative">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-yellow-400 text-black text-xs font-bold rounded-bl-xl">
                DOAR 3 SLOTURI/LUNĂ
              </div>
              <CardContent className="p-6 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Client Portal System
                </h3>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                    €6.500
                  </span>
                  <span className="text-white/40 text-sm">one-time</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-6">
                  <p className="text-white/70 text-sm mb-2 font-semibold">Condiții de plată:</p>
                  <p className="text-white/60 text-sm">• 50% la contract (€3.250)</p>
                  <p className="text-white/60 text-sm">• 50% la GO LIVE (€3.250)</p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <Button
                    onClick={openModal}
                    className="btn-3d-gold w-full px-6 py-6 h-auto text-base md:text-lg rounded-xl animate-glow-pulse"
                  >
                    Programează apel gratuit de 15 min
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <p className="text-white/40 text-xs text-center">
                    Doar 3 sloturi pe lună — sunt singur developer. Dacă e plin, te pun pe
                    waiting list.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 p-5 rounded-xl bg-white/[0.03] border border-yellow-400/20 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/70 text-sm">
                <span className="text-yellow-400 font-semibold">
                  Garanție ROI în 60 de zile
                </span>{" "}
                — dacă sistemul nu generează rezultate măsurabile, returnez banii integral.
              </p>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-10">
              Întrebări frecvente
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl bg-white/[0.03] border border-white/[0.08] px-5 hover:border-yellow-400/30 transition-all"
                >
                  <AccordionTrigger className="text-left text-white hover:text-yellow-400 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-white/[0.03] border border-white/[0.08]">
              <CardContent className="p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-6">
                  Despre mine
                </h2>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Sunt <span className="text-white font-semibold">Erdelean Jelco</span>. Am
                    crescut cu tata și bunica. Am construit o afacere cu 20 de angajați în
                    Spania — pierdută în pandemie. Ani întregi am încercat să găsesc o cale de
                    a construi online fără să știu să scriu cod.
                  </p>
                  <p>
                    Am găsit-o în <span className="text-yellow-400 font-semibold">AI</span>.
                  </p>
                  <p>
                    Azi construiesc pentru ateliere românești exact ce mi-ar fi plăcut să am
                    când aveam afacerea în Spania: sisteme care îți dau timp înapoi și opresc
                    pierderea de comenzi.
                  </p>
                  <p className="text-white/90 italic">
                    Nu sunt „AI guru.” Sunt antreprenor care a pierdut o afacere și nu vreau să
                    pierzi tu una.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* FINAL CTA */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-400/10 border border-red-400/30 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-semibold">FINAL CTA</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Programează un apel{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
                gratuit de 15 minute
              </span>
            </h2>
            <p className="text-white/60 text-lg mb-10">
              Aflăm dacă sistemul se potrivește afacerii tale. Dacă nu — îți recomand alte 3
              soluții gratis.
            </p>

            <Button
              onClick={openModal}
              className="btn-3d-gold px-6 py-6 md:px-10 md:py-7 h-auto text-base md:text-lg rounded-xl animate-glow-pulse"
            >
              <Calendar className="mr-2 w-5 h-5" />
              Rezervă slot acum
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-white/30 text-sm mt-4">
              Fără costuri ascunse. Fără obligații.
            </p>

            <div className="mt-12 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-left">
              <p className="text-white/70 leading-relaxed">
                <span className="text-yellow-400 font-bold">P.S.</span> Dacă n-ai apelat încă,
                calculează: câte apeluri ai primit azi cu „gata comanda mea?” Câte comenzi ai
                pierdut săptămâna asta? Înmulțește cu 52. Acela e costul inacțiunii tale.{" "}
                <span className="text-white font-semibold">€6.500 pare mult.</span>{" "}
                <span className="text-yellow-400 font-semibold">Pierderea e mai mare.</span>
              </p>
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-white/50 text-sm">
              <TrendingUp className="w-4 h-4 text-yellow-400" />
              Ultimul client: <span className="text-yellow-400 font-semibold">€7K-€10K/lună</span>{" "}
              recuperați în 30 zile
            </div>
          </motion.div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <AuditFormModal
          isOpen={isAuditModalOpen}
          onClose={() => setIsAuditModalOpen(false)}
        />
      </Suspense>
    </div>
  );
};

export default ClientPortalSystem;

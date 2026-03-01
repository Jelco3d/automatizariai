
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Brain, Network, Building2, Shield, Handshake } from "lucide-react";

export const DetailedServices = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: Bot, title: "Automatizare Procese", desc: "Transformați operațiunile de afaceri cu soluții de automatizare bazate pe AI care optimizează fluxurile de lucru și reduc sarcinile manuale.", items: ["Optimizarea fluxului de lucru", "Procesarea documentelor", "Automatizarea introducerii datelor"] },
          { icon: Brain, title: "Analiză AI", desc: "Utilizați algoritmi AI avansați pentru a analiza datele și a extrage informații acționabile pentru decizii mai bune.", items: ["Analiză predictivă", "Recunoașterea tiparelor", "Monitorizare în timp real"] },
          { icon: Network, title: "Servicii de Integrare", desc: "Conectați perfect sistemele existente cu soluții AI de ultimă generație pentru productivitate îmbunătățită.", items: ["Dezvoltare API", "Integrare sisteme", "Conectori personalizați"] },
          { icon: Building2, title: "Soluții Întreprinderi", desc: "Soluții AI complete adaptate pentru operațiuni de afaceri la scară largă și fluxuri de lucru complexe.", items: ["Arhitectură scalabilă", "Securitate pentru întreprinderi", "Suport 24/7"] },
          { icon: Shield, title: "Securitate & Conformitate", desc: "Asigurați-vă că implementările AI respectă standardele industriei și cerințele de reglementare.", items: ["Protecția datelor", "Audituri de conformitate", "Evaluarea riscurilor"] },
          { icon: Handshake, title: "Servicii de Consultanță", desc: "Îndrumare expertă privind strategia AI, implementarea și optimizarea pentru nevoile afacerii dumneavoastră.", items: ["Planificare strategică", "Consultanță tehnică", "Suport implementare"] },
        ].map(({ icon: Icon, title, desc, items }, i) => (
          <Card key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-yellow-400/30 transition-all hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/[0.05]">
            <CardContent className="p-6">
              <Icon className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
              <p className="text-white/60 mb-4">{desc}</p>
              <ul className="text-white/60 space-y-2">
                {items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-400/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};


import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, Bot, Cog } from "lucide-react";

export const DetailedServices = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Building2,
            title: "Creare Platforme Interne Personalizate",
            desc: "Platforme custom construite pe nevoile afacerii dumneavoastră — de la CRM-uri la dashboarduri interne și sisteme de management.",
            items: [
              "CRM-uri și dashboarduri adaptate proceselor dvs.",
              "Interfețe intuitive pentru echipa internă",
              "Scalabilitate și integrare cu sistemele existente",
            ],
          },
          {
            icon: Bot,
            title: "Integrare Agenți AI Personalizați",
            desc: "Agenți AI antrenați pe datele și procesele specifice ale afacerii dumneavoastră, gata să preia sarcini repetitive.",
            items: [
              "Antrenați pe datele și documentele companiei",
              "Răspunsuri automate pentru clienți și echipă",
              "Învățare continuă și îmbunătățire constantă",
            ],
          },
          {
            icon: Cog,
            title: "Automatizări Personalizate",
            desc: "Fluxuri de lucru automatizate, adaptate proceselor unice ale companiei dumneavoastră, pentru eficiență maximă.",
            items: [
              "Automatizare facturare, raportare și notificări",
              "Conectare între aplicațiile pe care le folosiți deja",
              "Reducerea erorilor umane și economisirea timpului",
            ],
          },
        ].map(({ icon: Icon, title, desc, items }, i) => (
          <Card key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-yellow-400/30 transition-all hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/[0.05]">
            <CardContent className="p-6">
              <Icon className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
              <p className="text-white/60 mb-4">{desc}</p>
              <ul className="text-white/60 space-y-2">
                {items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-yellow-400/60 flex-shrink-0" />
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

import { Card, CardContent } from "@/components/ui/card";
import { Database, Cloud, Lock, Cog } from "lucide-react";

export const TechnicalCapabilities = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 text-center mb-12">
        Capabilități Tehnice
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: Database, title: "Procesare Date", desc: "Algoritmi avansați pentru procesarea eficientă a datelor" },
          { icon: Cloud, title: "Integrare Cloud", desc: "Integrare perfectă cu serviciile cloud" },
          { icon: Lock, title: "Securitate", desc: "Protocoale de securitate la nivel de întreprindere" },
          { icon: Cog, title: "Personalizare", desc: "Soluții flexibile și personalizabile" },
        ].map(({ icon: Icon, title, desc }, i) => (
          <Card key={i} className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-yellow-400/30 transition-all">
            <CardContent className="p-6 text-center">
              <Icon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-white/60">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

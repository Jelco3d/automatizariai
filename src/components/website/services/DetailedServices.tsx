
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Brain, Network, Building2, Shield, Handshake } from "lucide-react";

export const DetailedServices = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <CardContent className="p-6">
            <Bot className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Automatizare Procese</h3>
            <p className="text-gray-300 mb-4">Transformați operațiunile de afaceri cu soluții de automatizare bazate pe AI care optimizează fluxurile de lucru și reduc sarcinile manuale.</p>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Optimizarea fluxului de lucru
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Procesarea documentelor
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Automatizarea introducerii datelor
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <CardContent className="p-6">
            <Brain className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Analiză AI</h3>
            <p className="text-gray-300 mb-4">Utilizați algoritmi AI avansați pentru a analiza datele și a extrage informații acționabile pentru decizii mai bune.</p>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Analiză predictivă
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Recunoașterea tiparelor
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Monitorizare în timp real
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <CardContent className="p-6">
            <Network className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Servicii de Integrare</h3>
            <p className="text-gray-300 mb-4">Conectați perfect sistemele existente cu soluții AI de ultimă generație pentru productivitate îmbunătățită.</p>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Dezvoltare API
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Integrare sisteme
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Conectori personalizați
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <CardContent className="p-6">
            <Building2 className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Soluții Întreprinderi</h3>
            <p className="text-gray-300 mb-4">Soluții AI complete adaptate pentru operațiuni de afaceri la scară largă și fluxuri de lucru complexe.</p>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Arhitectură scalabilă
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Securitate pentru întreprinderi
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Suport 24/7
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <CardContent className="p-6">
            <Shield className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Securitate & Conformitate</h3>
            <p className="text-gray-300 mb-4">Asigurați-vă că implementările AI respectă standardele industriei și cerințele de reglementare.</p>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Protecția datelor
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Audituri de conformitate
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Evaluarea riscurilor
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <CardContent className="p-6">
            <Handshake className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Servicii de Consultanță</h3>
            <p className="text-gray-300 mb-4">Îndrumare expertă privind strategia AI, implementarea și optimizarea pentru nevoile afacerii dumneavoastră.</p>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Planificare strategică
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Consultanță tehnică
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-purple-400" />
                Suport implementare
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

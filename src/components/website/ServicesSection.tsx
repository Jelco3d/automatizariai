
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Brain, Zap, Database, Cloud, Lock } from "lucide-react";

export const ServicesSection = () => {
  return (
    <div className="container mx-auto px-4 pt-8 pb-16 relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
        Servicii Complete de Automatizare AI
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Automatizare Procese de Business</h3>
            <p className="text-gray-300">Transformă procesele manuale repetitive în fluxuri de lucru automatizate și inteligente, crescând eficiența operațională cu până la 80%.</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Analiză Predictivă AI</h3>
            <p className="text-gray-300">Utilizează puterea inteligenței artificiale pentru a analiza date complexe și a lua decizii informate bazate pe predicții avansate.</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Optimizare Flux de Lucru</h3>
            <p className="text-gray-300">Streamline-ează procesele de afaceri prin automatizare inteligentă, reducând timpul de procesare cu până la 70%.</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Database className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Automatizare Gestionare Date</h3>
            <p className="text-gray-300">Sincronizează și procesează automat date între multiple platforme, asigurând acuratețe și consistență în timp real.</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Cloud className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Soluții Cloud AI</h3>
            <p className="text-gray-300">Implementează soluții de automatizare scalabile în cloud, optimizate pentru performanță și accesibilitate 24/7.</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Securitate Automatizată</h3>
            <p className="text-gray-300">Implementează protocoale de securitate automate și conformitate GDPR pentru protecția completă a datelor tale.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

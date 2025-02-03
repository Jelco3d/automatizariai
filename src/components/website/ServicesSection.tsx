import { Card, CardContent } from "@/components/ui/card";
import { Bot, Brain, Zap, Database, Cloud, Lock } from "lucide-react";

export const ServicesSection = () => {
  return (
    <div className="container mx-auto px-4 pt-8 pb-16 relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">Serviciile Noastre</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Automatizare Procese cu AI</h3>
            <p className="text-gray-300">Automatizează sarcini și fluxuri de lucru repetitive cu soluții bazate pe AI</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Analiză Date</h3>
            <p className="text-gray-300">Transformă datele brute în informații acționabile cu analiza AI</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Optimizare Flux de Lucru</h3>
            <p className="text-gray-300">Eficientizează procesele de afaceri pentru maximă productivitate</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Database className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Integrare Date</h3>
            <p className="text-gray-300">Conectează și sincronizează date între multiple platforme fără probleme</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Cloud className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Soluții Cloud</h3>
            <p className="text-gray-300">Utilizează tehnologia cloud pentru automatizare scalabilă și eficientă</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1A1F2C]/80 backdrop-blur-xl border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group">
          <CardContent className="p-6 text-center">
            <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Automatizare Securitate</h3>
            <p className="text-gray-300">Automatizează protocoalele de securitate și monitorizarea conformității</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
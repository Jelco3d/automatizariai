import { Clock, Coins, Star, Bot, Brain, Zap } from "lucide-react";

export const BenefitsSection = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-[#1A1F2C]/50 backdrop-blur-xl relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">De Ce Să Alegeți Automatizarea AI?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Clock className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Economisiți Timp</h3>
            <p className="text-gray-300">Reduceți orele de muncă manuală cu până la 70% prin procese automatizate</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Coins className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Reduceți Costurile</h3>
            <p className="text-gray-300">Diminuați costurile operaționale prin automatizare eficientă</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Star className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Îmbunătățiți Calitatea</h3>
            <p className="text-gray-300">Creșteți acuratețea și consistența în operațiunile dvs.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Bot className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Operare 24/7</h3>
            <p className="text-gray-300">Sistemele automatizate funcționează non-stop, fără pauze</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Brain className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Decizii Inteligente</h3>
            <p className="text-gray-300">Valorificați informațiile AI pentru decizii de afaceri mai bune</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Zap className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Creștere Rapidă</h3>
            <p className="text-gray-300">Scalați operațiunile de afaceri mai eficient</p>
          </div>
        </div>
      </div>
    </div>
  );
};
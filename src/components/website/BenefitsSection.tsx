
import { Clock, Coins, Star, Bot, Brain, Zap } from "lucide-react";

export const BenefitsSection = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-[#1A1F2C]/50 backdrop-blur-xl relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">
        Beneficiile Automatizării AI pentru Afacerea Ta
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Clock className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Eficiență Operațională</h3>
            <p className="text-gray-300">Reduce timpul de procesare cu până la 70% prin automatizarea inteligentă a proceselor repetitive și complexe.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Coins className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Optimizare Costuri</h3>
            <p className="text-gray-300">Reduce costurile operaționale cu până la 60% prin implementarea soluțiilor de automatizare AI personalizate.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Star className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Calitate Superioară</h3>
            <p className="text-gray-300">Asigură acuratețe de 99.9% în procesele automatizate, eliminând erorile umane și inconsistențele.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Bot className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Disponibilitate 24/7</h3>
            <p className="text-gray-300">Menține operațiunile active non-stop cu sisteme automatizate care nu necesită pauze sau timp de odihnă.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Brain className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Decizii Bazate pe Date</h3>
            <p className="text-gray-300">Utilizează algoritmi AI avansați pentru analiză predictivă și luarea deciziilor strategice informate.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Zap className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Scalabilitate Rapidă</h3>
            <p className="text-gray-300">Adaptează și scalează automat operațiunile în funcție de cerințele în creștere ale afacerii tale.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

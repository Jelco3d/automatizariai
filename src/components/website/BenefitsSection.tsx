
import { Clock, Coins, Battery, TrendingUp, Users, Zap } from "lucide-react";

export const BenefitsSection = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 relative">
      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-3">
        Ce Câștigi Ca Patron?
      </h2>
      <p className="text-gray-300 text-center mb-8 md:mb-12 text-sm md:text-base max-w-2xl mx-auto">
        Rezultate concrete pentru afacerea ta - economisești timp, bani și energie
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/30 hover:border-purple-400 transition-all">
          <Clock className="w-6 h-6 md:w-8 md:h-8 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Economisești Timp Prețios</h3>
            <p className="text-gray-300 text-sm md:text-base">Recuperezi 20-30 ore pe săptămână din task-uri repetitive. Mai mult timp pentru dezvoltare strategică și creștere.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/30 hover:border-purple-400 transition-all">
          <Coins className="w-6 h-6 md:w-8 md:h-8 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Reduci Costurile cu 40-60%</h3>
            <p className="text-gray-300 text-sm md:text-base">Mai puține cheltuieli operaționale, mai puțini angajați pentru sarcini repetitive. ROI în 3-6 luni.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/30 hover:border-purple-400 transition-all">
          <Battery className="w-6 h-6 md:w-8 md:h-8 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Mai Multă Energie pentru Ce Contează</h3>
            <p className="text-gray-300 text-sm md:text-base">Scapi de stresul sarcinilor manuale și a erorilor umane. Focus pe inovare și relații cu clienții.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/30 hover:border-purple-400 transition-all">
          <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Crești mai Rapid</h3>
            <p className="text-gray-300 text-sm md:text-base">Scalezi afacerea fără să angajezi proporțional. Procesele automate cresc productivitatea cu 3-5x.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/30 hover:border-purple-400 transition-all">
          <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Echipa Ta Lucrează mai Inteligent</h3>
            <p className="text-gray-300 text-sm md:text-base">Angajații se concentrează pe munca creativă și de valoare, nu pe task-uri plictisitoare. Moralul crește.</p>
          </div>
        </div>
        <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/30 hover:border-purple-400 transition-all">
          <Zap className="w-6 h-6 md:w-8 md:h-8 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Avantaj Competitiv Real</h3>
            <p className="text-gray-300 text-sm md:text-base">Răspunzi mai rapid, lucrezi mai eficient și oferi servicii mai bune decât concurența. Clienții observă diferența.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

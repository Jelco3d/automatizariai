import { Clock, Coins, Star, Bot, Brain, Zap } from "lucide-react";

export const BenefitsSection = () => {
  console.log("Rendering BenefitsSection component");
  
  return (
    <div className="container mx-auto px-4 py-16 bg-[#1A1F2C]/50 backdrop-blur-xl relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-center mb-12">Why Choose AI Automation?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Clock className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Save Time</h3>
            <p className="text-gray-300">Reduce manual work hours by up to 70% with automated processes</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Coins className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Reduce Costs</h3>
            <p className="text-gray-300">Lower operational costs through efficient automation</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Star className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Improve Quality</h3>
            <p className="text-gray-300">Enhance accuracy and consistency in your operations</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Bot className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">24/7 Operation</h3>
            <p className="text-gray-300">Automated systems work around the clock without breaks</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Brain className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Smart Decisions</h3>
            <p className="text-gray-300">Leverage AI insights for better business choices</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 p-6 bg-[#1A1F2C]/80 rounded-lg backdrop-blur-xl border border-purple-500/50 hover:border-purple-400 transition-all hover:scale-105">
          <Zap className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Faster Growth</h3>
            <p className="text-gray-300">Scale your business operations more efficiently</p>
          </div>
        </div>
      </div>
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export const HeroSection = () => {
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank');
  };
  return <div className="container mx-auto px-4 py-16 text-center relative">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6 animate-[fade-in_1s_ease-out]">
        Automatizare Inteligentă cu AI pentru Afaceri
      </h1>
      <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-8 animate-[fade-in_1s_ease-out_0.3s]">
        Expertul tău în automatizare AI pentru creșterea eficienței operaționale. Implementăm soluții personalizate de automatizare bazate pe inteligență artificială, reducând costurile cu până la 60% și crescând productivitatea cu peste 80%.
      </p>
      <Button onClick={handleBooking} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-base transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 animate-[fade-in_1s_ease-out_0.6s] rounded-lg px-[24px]">
        Programează Consultație Strategică Gratuită
        <ArrowRight className="ml-2 animate-bounce" />
      </Button>
    </div>;
};
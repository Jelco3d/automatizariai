import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export const HeroSection = () => {
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank');
  };
  return <div className="container mx-auto px-4 py-16 text-center relative">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6 animate-[fade-in_1s_ease-out]">Automatizare  AI Pentru Afaceri</h1>
      <p className="text-base text-gray-300 max-w-3xl mx-auto mb-8 animate-[fade-in_1s_ease-out_0.3s] my-[20px] md:text-3xl">🚀 Lasă AI-ul Să Lucreze Pentru Tine!   


Automatizează Procesele Repetitive, Economisește Timp & Crește Afacerea Fără Efort. 🔥</p>
      <Button onClick={handleBooking} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 animate-[fade-in_1s_ease-out_0.6s] py-[2px] px-[5px] rounded-md">
        Programează Consultație Strategică Gratuită
        <ArrowRight className="ml-2 animate-bounce w-4 h-4" />
      </Button>
    </div>;
};
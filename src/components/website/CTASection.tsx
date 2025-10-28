
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {

  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16 text-center relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
        Transformă-ți Afacerea cu Automatizare AI
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        Experții noștri sunt pregătiți să analizeze procesele tale de business și să creeze o strategie personalizată de automatizare care să maximizeze eficiența și să reducă costurile.
      </p>
      <Button 
        onClick={handleBooking}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
      >
        Programează Audit AI Gratuit
        <ArrowRight className="ml-2 animate-bounce" />
      </Button>
    </div>
  );
};

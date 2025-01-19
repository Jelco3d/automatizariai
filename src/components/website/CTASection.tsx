import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16 text-center relative">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">Gata să-ți Transformi Afacerea?</h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
        Programează o consultație gratuită pentru a descoperi cum automatizarea AI poate beneficia afacerii tale
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

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = ({ handleBooking }: { handleBooking: () => void }) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6">
        Pregătiți să Vă Transformați Afacerea?
      </h2>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
        Programați o consultație gratuită pentru a descoperi cum serviciile noastre de automatizare AI vă pot ajuta afacerea
      </p>
      <Button 
        onClick={handleBooking}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-4 text-base rounded-lg transform transition-all hover:scale-105"
      >
        Programează Consultația Gratuită
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
};


import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = ({ handleBooking }: { handleBooking: () => void }) => {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Pregătiți să Vă Transformați Afacerea?
      </h2>
      <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
        Programați o consultație gratuită pentru a descoperi cum serviciile noastre de automatizare AI vă pot ajuta afacerea
      </p>
      <Button 
        onClick={handleBooking}
        className="btn-3d-gold px-8 py-4 text-base rounded-lg animate-glow-pulse"
      >
        Programează Consultația Gratuită
        <ArrowRight className="ml-2" />
      </Button>
      <p className="text-white/30 text-sm mt-4">Fără costuri ascunse. Fără obligații.</p>
    </div>
  );
};

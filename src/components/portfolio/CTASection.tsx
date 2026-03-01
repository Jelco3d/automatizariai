
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  console.log("Rendering CTASection");
  
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="container mx-auto px-4 py-16 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        Pregătit să-ți Transformi Afacerea?
      </h2>
      <Button
        onClick={handleBooking}
        className="btn-3d-gold animate-glow-pulse"
      >
        Programează o Consultație
        <ArrowRight className="ml-2" />
      </Button>
      <p className="text-white/30 text-sm mt-4">Fără costuri ascunse. Fără obligații.</p>
    </motion.section>
  );
};

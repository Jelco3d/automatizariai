import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CTASectionProps {
  onOpenAuditModal?: () => void;
}

export const CTASection = ({ onOpenAuditModal }: CTASectionProps) => {
  const handleBooking = () => {
    onOpenAuditModal?.();
  };

  return (
    <section className="py-16 md:py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-6">
          Gata să-ți transformi afacerea?
        </h2>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
          Programează o discuție gratuită și descoperă cum poți recupera 20–40 de ore pe săptămână cu automatizări inteligente.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Button
            onClick={handleBooking}
            className="btn-3d-gold px-10 py-7 h-auto text-lg rounded-xl animate-glow-pulse"
          >
            Programează Audit AI Gratuit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <span className="text-white/30 text-sm">
            Fără costuri ascunse. Fără obligații.
          </span>
        </div>
      </motion.div>
    </section>
  );
};

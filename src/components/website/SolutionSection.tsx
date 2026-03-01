import { CheckCircle, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const points = [
  "Gata în mai puțin de 30 de zile",
  "Fără developeri scumpi",
  "Fără proiecte care durează luni de zile",
];

interface SolutionSectionProps {
  onOpenAuditModal?: () => void;
}

export const SolutionSection = ({ onOpenAuditModal }: SolutionSectionProps) => {
  const handleBooking = () => {
    onOpenAuditModal?.();
  };

  return (
    <section className="py-6 md:py-14 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-8"
        >
          „Există o cale mult mai inteligentă."
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/70 leading-relaxed mb-10"
        >
          Creăm pentru tine o{" "}
          <span className="text-white font-semibold">platformă internă custom</span>{" "}
          care preia automat cele mai consumatoare task-uri repetitive, folosind{" "}
          <span className="text-white font-semibold">agenți AI și automatizări inteligente</span>.
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3 hover:border-yellow-400/20 transition-all duration-300"
            >
              <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <span className="text-white text-base md:text-lg">{point}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-yellow-400/[0.08] to-amber-500/[0.04] border border-yellow-400/20 rounded-2xl p-5 md:p-8 mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-bold text-white">Rezultatul?</h3>
          </div>
          <p className="text-lg md:text-xl text-white/70">
            Recuperezi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 font-bold">
              20–40 de ore pe săptămână
            </span>{" "}
            și poți să te concentrezi pe creșterea reală a afacerii.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            onClick={handleBooking}
            className="btn-3d-gold text-base px-8 py-6 h-auto rounded-xl"
          >
            Vreau să automatizez și eu
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

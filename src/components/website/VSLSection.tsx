import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

interface VSLSectionProps {
  onOpenAuditModal?: () => void;
}

export const VSLSection = ({ onOpenAuditModal }: VSLSectionProps) => {
  const handleBooking = () => {
    onOpenAuditModal?.();
  };

  return (
    <section className="py-10 md:py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-extrabold text-center text-white/90 mb-10 leading-tight max-w-3xl mx-auto"
        >
          Cum Am Ajutat Antreprenori Ca Tine Să Recupereze{" "}
          <span className="text-yellow-400">Zeci De Ore</span> Pe Săptămână
          <br />
          <span className="text-white/50 text-lg md:text-2xl font-medium mt-2 block">
            în mai puțin de{" "}
            <span className="text-yellow-400 font-bold">30 de zile</span>
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video rounded-2xl overflow-hidden border border-yellow-400/20 bg-white/[0.02] mb-8 shadow-lg shadow-yellow-500/[0.05]"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-yellow-500/30">
              <Play className="w-8 h-8 text-black ml-1" />
            </div>
            <p className="text-white/40 text-sm font-medium">Video în curând</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={handleBooking}
            className="btn-3d-gold text-base md:text-lg px-8 py-6 h-auto rounded-xl"
          >
            Vreau să aflu cum poți face și tu la fel
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

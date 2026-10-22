import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

interface VSLSectionProps {
  onOpenAuditModal?: () => void;
}

export const VSLSection = ({ onOpenAuditModal }: VSLSectionProps) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleBooking = () => {
    onOpenAuditModal?.();
  };

  return (
    <section className="py-6 md:py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-4xl font-extrabold text-center text-white/90 mb-10 leading-tight max-w-3xl mx-auto"
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
          {showVideo ? (
            <iframe
              src="https://www.loom.com/embed/1e8e609e6b73490ba33fa5a4b0c091aa?autoplay=1"
              frameBorder="0"
              allowFullScreen
              allow="autoplay"
              loading="lazy"
              title="Video prezentare AI Automatizări"
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              onClick={() => setShowVideo(true)}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0e1a] to-[#1a1e2e] cursor-pointer group"
              aria-label="Pornește video prezentare"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" />
              </div>
              <span className="absolute bottom-4 text-white/50 text-sm">Click pentru a vedea video</span>
            </button>
          )}
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
            Programează AI Audit Gratuit!
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

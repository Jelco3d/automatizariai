import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onOpenAuditModal?: () => void;
}

export const HeroSection = ({ onOpenAuditModal }: HeroSectionProps) => {
  const handleBooking = () => {
    onOpenAuditModal?.();
  };

  return (
    <section className="flex items-center justify-center relative px-6 pt-32 pb-16 md:pt-44 md:pb-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-5 py-2 mb-8 shadow-lg shadow-yellow-500/[0.03]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
          <span className="text-white/50 text-sm font-medium tracking-wide">
            Agenți AI · Automatizări · Platforme Interne
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 max-w-4xl mx-auto text-white tracking-tight"
        >
          Ajut Antreprenorii Din România Să Implementeze{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-orange-500">
            Infrastructura Internă, Agenți AI
          </span>{" "}
          Și Automatizări Inteligente
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Recuperând timp, crescând veniturile și livrând rezultate în mai puțin de 30 de zile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto mb-10"
        >
          {[
            { value: "20–40h", label: "recuperate / săpt." },
            { value: "+30%", label: "creștere afacere" },
            { value: "<30", label: "zile implementare" },
          ].map((metric, i) => (
            <div key={i} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/[0.08] to-transparent rounded-2xl transition-all duration-300 group-hover:from-yellow-400/[0.15]" />
              <div className="relative flex flex-col items-center py-5 px-3 rounded-2xl border border-white/[0.06] group-hover:border-yellow-400/30 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-yellow-500/[0.05]">
                <span className="text-yellow-400 text-3xl md:text-4xl font-black leading-none">
                  {metric.value}
                </span>
                <span className="text-white/40 text-xs md:text-sm mt-1.5 font-medium">
                  {metric.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <Button
            onClick={handleBooking}
            size="lg"
            className="btn-3d-gold text-base md:text-lg px-10 py-7 h-auto rounded-xl animate-glow-pulse"
          >
            Programează o discuție gratuită
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <span className="text-white/30 text-sm">
            Fără costuri ascunse. Fără obligații.
          </span>
        </motion.div>
      </div>
    </section>
  );
};

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { HERO_CLASSES, HERO_COPY } from "./heroContent";

interface HeroSectionProps {
  onOpenAuditModal?: () => void;
}

export const HeroSection = ({ onOpenAuditModal }: HeroSectionProps) => {
  const handleBooking = () => {
    onOpenAuditModal?.();
  };

  return (
    <section className={HERO_CLASSES.section}>
      <div className={HERO_CLASSES.container}>
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

        <h1 className={HERO_CLASSES.heading}>
          {HERO_COPY.headlineStart}{" "}
          <span className={HERO_CLASSES.accent}>
            {HERO_COPY.headlineAccent}
          </span>{" "}
          {HERO_COPY.headlineEnd}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={HERO_CLASSES.description}
        >
          {HERO_COPY.description}
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
              <div className="relative flex flex-col items-center py-3 px-2 md:py-5 md:px-3 rounded-2xl border border-white/[0.06] group-hover:border-yellow-400/30 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-yellow-500/[0.05]">
                <span className="text-yellow-400 text-2xl md:text-3xl lg:text-4xl font-black leading-none">
                  {metric.value}
                </span>
                <span className="text-white/40 text-xs md:text-sm mt-1.5 font-medium">{metric.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

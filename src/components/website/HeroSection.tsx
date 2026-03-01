import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  return (
    <section className="flex items-center justify-center relative px-6 pt-32 pb-16 md:pt-44 md:pb-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/60 text-sm font-medium tracking-wide">Agenți AI · Automatizări · Platforme Interne</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.15] mb-6 max-w-4xl mx-auto text-white tracking-tight">
          Ajut antreprenorii din România să construiască{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
            infrastructura internă
          </span>{" "}
          cu agenți AI și automatizări inteligente
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
          Recuperând timp, crescând veniturile și livrând rezultate în mai puțin de 30 de zile.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto mb-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent rounded-2xl" />
            <div className="relative flex flex-col items-center py-5 px-3 rounded-2xl border border-white/[0.06]">
              <span className="text-yellow-400 text-3xl md:text-4xl font-black leading-none">20–40h</span>
              <span className="text-white/40 text-xs md:text-sm mt-1.5 font-medium">recuperate / săpt.</span>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent rounded-2xl" />
            <div className="relative flex flex-col items-center py-5 px-3 rounded-2xl border border-white/[0.06]">
              <span className="text-yellow-400 text-3xl md:text-4xl font-black leading-none">+30%</span>
              <span className="text-white/40 text-xs md:text-sm mt-1.5 font-medium">creștere afacere</span>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent rounded-2xl" />
            <div className="relative flex flex-col items-center py-5 px-3 rounded-2xl border border-white/[0.06]">
              <span className="text-yellow-400 text-3xl md:text-4xl font-black leading-none">&lt;30</span>
              <span className="text-white/40 text-xs md:text-sm mt-1.5 font-medium">zile implementare</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleBooking}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold text-base px-8 py-6 h-auto rounded-xl shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 transition-all hover:scale-105">
            Programează o discuție gratuită
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>);

};
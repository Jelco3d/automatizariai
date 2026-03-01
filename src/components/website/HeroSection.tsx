import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  return (
    <section className="flex items-center justify-center relative px-4 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="max-w-5xl mx-auto text-center py-0 my-0">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-white/70 mb-6 max-w-3xl mx-auto tracking-wide uppercase font-medium">
          Agenți AI · Automatizări · Platforme Interne
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 max-w-4xl mx-auto text-white">
          Ajut Antreprenorii Din România Să Își Construiască{" "}
          <span className="text-white">Infrastructura Internă</span>{" "}
          Cu Agenți AI Și Automatizări
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-5 py-2.5">
            <span className="text-yellow-400 text-xl font-bold">20–40h</span>
            <span className="text-white/80 text-sm">recuperate / săptămână</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-5 py-2.5">
            <span className="text-yellow-400 text-xl font-bold">+30%</span>
            <span className="text-white/80 text-sm">creștere afacere</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-5 py-2.5">
            <span className="text-yellow-400 text-xl font-bold">&lt;30 zile</span>
            <span className="text-white/80 text-sm">implementare completă</span>
          </div>
        </motion.div>













        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-4">

          






          


        </motion.div>
      </div>
    </section>);

};
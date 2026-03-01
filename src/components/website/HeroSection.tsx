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
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-7xl text-primary lg:text-2xl">

          <span className="bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-4xl bg-[#f0f7ff]/0 text-white font-extrabold">
            Crescând Afacerea Cu Până La 30%
          </span>{" "}
          <span className="text-[#ffb10a]">
            În Mai Puțin De 30 De Zile....
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-white/80 mb-2 max-w-3xl mx-auto">
          <br /><br />
          <span className="text-yellow-400 font-extrabold">Recuperând 20–40 De Ore Pe Săptămână</span>
        </motion.p>













        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-4">

          






          


        </motion.div>
      </div>
    </section>);

};
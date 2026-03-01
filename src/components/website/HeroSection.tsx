import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  return (
    <section className="flex items-center justify-center relative px-4 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold leading-tight mb-8 max-w-7xl text-primary lg:text-2xl">

          <span className="bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 text-4xl bg-[#f0f7ff]/0 text-white font-extrabold">Ajut Antreprenorii din România Să Își Construiască Infrastructura Internă Cu Agenți AI Și Automatizări, Recuperând 20–40 De Ore Pe Săptămână Și Crescând Cu Până La 30% În Mai Puțin De 30 De Zile....

          </span>{" "}
          <span className="text-white">
            În Mai Puțin De 30 De Zile, Creând Platforme Interne Custom Cu Agenți AI Și Automatizări Inteligente.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-2 mb-10">

          
          <p className="text-lg md:text-xl text-gray-300">Fără proiecte care durează luni de zile.</p>
          <p className="text-lg md:text-xl text-purple-300 font-semibold">

          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-4">

          






          <p className="text-sm text-gray-400">
            Doar 8 locuri disponibile în această lună • Fără vânzare • Fără obligații
          </p>
        </motion.div>
      </div>
    </section>);

};
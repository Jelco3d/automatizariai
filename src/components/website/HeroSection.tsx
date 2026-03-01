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

          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Ajut Antreprenori Din Romania Să Recupereze 20–40 De Ore Pe Săptămână Să 

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

          <p className="text-lg md:text-xl text-gray-300">Fără developeri scumpi.</p>
          <p className="text-lg md:text-xl text-gray-300">Fără proiecte care durează luni de zile.</p>
          <p className="text-lg md:text-xl text-purple-300 font-semibold">
            Platformă internă custom, gata în doar 7–14 zile.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-4">

          <Button
            onClick={handleBooking}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-base md:text-lg px-8 py-6 h-auto rounded-xl transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">

            Rezervă-ți Auditul Strategic Gratuit de 20 minute
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-gray-400">
            Doar 8 locuri disponibile în această lună • Fără vânzare • Fără obligații
          </p>
        </motion.div>
      </div>
    </section>);

};
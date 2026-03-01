import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export const VSLSection = () => {
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  return (
    <section className="py-10 md:py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl text-white mb-10 leading-tight py-[15px] mx-px font-extrabold text-center md:text-4xl">

          Cum Am Ajutat Antreprenori Ca Tine Să Recupereze Zeci De Ore Pe Săptămână…{" "}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            În Mai Puțin De 30 De zile
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video rounded-2xl overflow-hidden border border-purple-500/30 bg-[#0f1119] mb-8">

          {/* Placeholder for VSL video */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 border-2 border-[#d38517] rounded-2xl opacity-95 mx-px text-[#e9ac07] bg-[#b4a2a2]/0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-purple-500/30">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <p className="text-gray-400 text-sm">Video în curând</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center">

          <Button
            onClick={handleBooking}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-base md:text-lg px-8 py-6 h-auto rounded-xl transform transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">

            Vreau să aflu cum poți face și tu la fel
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>);

};
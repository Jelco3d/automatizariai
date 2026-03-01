import { CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

const points = [
  "Gata în mai puțin de 30 de zile",
  "Fără developeri scumpi",
  "Fără proiecte care durează luni de zile",
];

export const SolutionSection = () => {
  return (
    <section className="py-10 md:py-14 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-8"
        >
          „Există o cale mult mai inteligentă."
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10"
        >
          Creăm pentru tine o{" "}
          <span className="text-white font-semibold">platformă internă custom</span>{" "}
          care preia automat cele mai consumatoare task-uri repetitive, folosind{" "}
          <span className="text-white font-semibold">agenți AI și automatizări inteligente</span>.
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-white text-base md:text-lg">{point}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl md:text-2xl font-bold text-white">Rezultatul?</h3>
          </div>
          <p className="text-lg md:text-xl text-gray-300">
            Recuperezi{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 font-bold">
              20–40 de ore pe săptămână
            </span>{" "}
            și poți să te concentrezi pe creșterea reală a afacerii.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

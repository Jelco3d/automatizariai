import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="flex items-center justify-center relative px-4 pt-28 pb-8 md:pt-32 md:pb-12">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          <span className="text-white">
            Ajut Antreprenorii din România Să Implementeze Infrastructura Internă Cu Agenți AI Și Automatizări,{" "}
          </span>
          <span className="text-yellow-400 font-extrabold">
            Recuperând 20–40 De Ore Pe Săptămână
          </span>
          <span className="text-white"> & </span>
          <span className="text-yellow-400 font-extrabold">
            Crescând Afacerea Cu Până La 30%
          </span>
          <span className="text-white">
            {" "}În Mai Puțin De 30 De Zile....
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mt-4">
          Fără proiecte care durează luni de zile.
        </motion.p>
      </div>
    </section>
  );
};

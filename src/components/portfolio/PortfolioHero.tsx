import { motion } from "framer-motion";

export const PortfolioHero = () => {
  console.log("Rendering PortfolioHero");
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 pt-24 pb-16"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Povești de Succes
      </h1>
      <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
        Descoperă cum soluțiile noastre de automatizare AI au transformat afaceri și au adus rezultate măsurabile.
      </p>
    </motion.section>
  );
};
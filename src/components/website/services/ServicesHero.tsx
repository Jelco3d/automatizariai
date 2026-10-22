import { motion } from "framer-motion";

export const ServicesHero = ({
  handleBooking
}: {
  handleBooking: () => void;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 pt-24 md:pt-32 pb-16 text-center relative"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 tracking-tight">
        Serviciile Noastre
      </h1>
      <p className="text-white/60 max-w-3xl mx-auto mt-6 font-medium text-xl">
        Soluții Complete De Automatizare AI Adaptate Nevoilor Afacerii Dumneavoastră
      </p>
    </motion.div>
  );
};

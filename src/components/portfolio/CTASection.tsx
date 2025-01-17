import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  console.log("Rendering CTASection");
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="container mx-auto px-4 py-16 text-center"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        Ready to Transform Your Business?
      </h2>
      <Button
        onClick={() => window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank')}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        Book a Consultation
        <ArrowRight className="ml-2" />
      </Button>
    </motion.section>
  );
};
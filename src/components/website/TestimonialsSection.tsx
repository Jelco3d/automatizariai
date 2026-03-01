import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Am recuperat 28 de ore pe săptămână în primele 30 de zile",
    name: "Cristinel I.",
    industry: "Distribuție materiale construcții",
    location: "Timișoara",
  },
  {
    quote: "Predicția stocului ne-a redus pierderile cu 27% în doar 3 săptămâni",
    name: "Ioana M.",
    industry: "Distribuție lactate",
    location: "",
  },
  {
    quote: "Răspundem instant la clienți și am crescut conversia cu 35%",
    name: "Mihai D.",
    industry: "Magazin cosmetice & seturi cadou",
    location: "",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-10 md:py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-center text-white mb-12"
        >
          Nu mă crede pe cuvânt –{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            uite ce au obținut alții
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/40 transition-colors"
            >
              <Quote className="w-8 h-8 text-purple-400/60 mb-4" />
              <p className="text-white text-lg font-medium leading-relaxed mb-6">
                „{t.quote}"
              </p>
              <div className="border-t border-purple-500/20 pt-4">
                <p className="text-purple-300 font-semibold">{t.name}</p>
                <p className="text-gray-400 text-sm">{t.industry}</p>
                {t.location && (
                  <p className="text-gray-500 text-sm">{t.location}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

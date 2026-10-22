import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Am recuperat 28 de ore pe săptămână în primele 30 de zile",
    highlight: "28 de ore",
    name: "Cristinel I.",
    industry: "Distribuție materiale construcții",
    location: "Timișoara",
  },
  {
    quote: "Predicția stocului ne-a redus pierderile cu 27% în doar 3 săptămâni",
    highlight: "27%",
    name: "Ioana M.",
    industry: "Distribuție lactate",
    location: "",
  },
  {
    quote: "Răspundem instant la clienți și am crescut conversia cu 35%",
    highlight: "35%",
    name: "Mihai D.",
    industry: "Magazin cosmetice & seturi cadou",
    location: "",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-6 md:py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-center text-white mb-12"
        >
          Nu mă crede pe cuvânt –{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
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
              className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-4 md:p-6 hover:border-yellow-400/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-yellow-400/40 mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-white text-lg font-medium leading-relaxed mb-6">
                „{t.quote.split(t.highlight).map((part, i, arr) =>
                  i < arr.length - 1 ? (
                    <span key={i}>
                      {part}
                      <span className="text-yellow-400 font-bold">{t.highlight}</span>
                    </span>
                  ) : (
                    part
                  )
                )}"
              </p>

              <div className="border-t border-yellow-400/20 pt-4">
                <p className="text-yellow-300 font-semibold">{t.name}</p>
                <p className="text-white/40 text-sm">{t.industry}</p>
                {t.location && (
                  <p className="text-white/30 text-sm">{t.location}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

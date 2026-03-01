import { Calculator, PackageX, Users, MessageSquare, Clock } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
  {
    icon: Calculator,
    text: "Petreci ore întregi calculând oferte manuale, iar clienții aleg concurența pentru că răspunzi prea târziu",
  },
  {
    icon: PackageX,
    text: "Rămâi fără stoc sau arunci produse expirate lună de lună",
  },
  {
    icon: Users,
    text: "Echipa ta mică este permanent suprasolicitată cu task-uri repetitive",
  },
  {
    icon: MessageSquare,
    text: "Răspunzi la zeci de mesaje identice pe WhatsApp și email în fiecare zi",
  },
  {
    icon: Clock,
    text: "Vrei să crești afacerea, dar pur și simplu nu mai ai timp fizic",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-6 md:py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-center text-white mb-12 leading-tight"
        >
          Dacă te regăsești în oricare din situațiile de mai jos,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
            continuă să citești…
          </span>
        </motion.h2>

        <div className="space-y-3 md:space-y-5">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl p-3.5 md:p-5 hover:border-yellow-400/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 flex items-center gap-3">
                <span className="text-yellow-400/40 font-bold text-lg">{index + 1}</span>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400/15 to-amber-500/10 flex items-center justify-center">
                  <problem.icon className="w-5 h-5 text-yellow-400/80" />
                </div>
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">{problem.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-lg md:text-2xl text-yellow-300 font-semibold mt-12"
        >
          „Nu ești singurul. Și nu trebuie să mai continui așa."
        </motion.p>
      </div>
    </section>
  );
};

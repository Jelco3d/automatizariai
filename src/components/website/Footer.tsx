import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16 border-t border-white/[0.08]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
            Soluții de Automatizare AI
          </h3>
          <p className="text-white/50">
            Transformăm afacerile prin soluții inteligente de automatizare.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
            Link-uri Rapide
          </h3>
          <div className="flex flex-col space-y-2">
            <Link to="/services" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">Servicii</Link>
            <Link to="/about" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">Despre Noi</Link>
            <Link to="/portfolio" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">Portofoliu</Link>
            <Link to="/contact" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">Contact</Link>
            <Link to="/terms" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">Termeni și Condiții</Link>
            <Link to="/gdpr" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">Politica GDPR</Link>
            <Link to="/privacy" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">Politica de Confidențialitate</Link>
            <Link to="/cookies" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">Politica de Cookie-uri</Link>
            <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">ANPC</a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
            Conectează-te cu Noi
          </h3>
          <div className="space-y-3">
            <div className="text-white/50">
              <p>Telefon: +40754274528</p>
              <p>Email: contact@aiautomatizari.ro</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:contact@aiautomatizari.ro" className="text-white/50 hover:text-yellow-400 transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 text-white/30 text-sm">
        © {new Date().getFullYear()} Soluții de Automatizare AI. Toate drepturile rezervate.
      </div>
    </div>
  );
};

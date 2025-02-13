
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="container mx-auto px-4 py-16 border-t border-purple-500/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Soluții de Automatizare AI
          </h3>
          <p className="text-gray-300">
            Transformăm afacerile prin soluții inteligente de automatizare.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Link-uri Rapide
          </h3>
          <div className="flex flex-col space-y-2">
            <Link to="/services" className="text-gray-300 hover:text-purple-400 transition-colors">Servicii</Link>
            <Link to="/about" className="text-gray-300 hover:text-purple-400 transition-colors">Despre Noi</Link>
            <Link to="/portfolio" className="text-gray-300 hover:text-purple-400 transition-colors">Portofoliu</Link>
            <Link to="/terms" className="text-gray-300 hover:text-purple-400 transition-colors">Termeni și Condiții</Link>
            <Link to="/gdpr" className="text-gray-300 hover:text-purple-400 transition-colors">Politica GDPR</Link>
            <Link to="/privacy" className="text-gray-300 hover:text-purple-400 transition-colors">Politica de Confidențialitate</Link>
            <a 
              href="https://anpc.ro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              ANPC
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Conectează-te cu Noi
          </h3>
          <div className="flex space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:automationaisolution@gmail.com"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-12 text-gray-400 text-sm">
        © {new Date().getFullYear()} Soluții de Automatizare AI. Toate drepturile rezervate.
      </div>
    </div>
  );
};

import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="container mx-auto px-4 py-16 border-t border-purple-500/20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            AI Automation Solutions
          </h3>
          <p className="text-gray-300">
            Transforming businesses through intelligent automation solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Quick Links
          </h3>
          <div className="flex flex-col space-y-2">
            <Link to="/services" className="text-gray-300 hover:text-purple-400 transition-colors">Services</Link>
            <Link to="/about" className="text-gray-300 hover:text-purple-400 transition-colors">About Us</Link>
            <Link to="/portfolio" className="text-gray-300 hover:text-purple-400 transition-colors">Portfolio</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Connect With Us
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
        © {new Date().getFullYear()} AI Automation Solutions. All rights reserved.
      </div>
    </div>
  );
};
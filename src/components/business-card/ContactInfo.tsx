import { Globe, Mail, Phone } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-xl text-purple-800">Contact:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a 
          href="tel:+1234567890" 
          className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors group"
        >
          <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>+1 (234) 567-890</span>
        </a>
        <a 
          href="mailto:contact@example.com"
          className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors group"
        >
          <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>contact@example.com</span>
        </a>
        <a 
          href="https://yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors group"
        >
          <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>yourwebsite.com</span>
        </a>
      </div>
    </div>
  );
};
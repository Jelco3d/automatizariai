
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Briefcase, Globe, Mail, Phone, User, Facebook, Instagram, Video, Twitter } from "lucide-react";
import { WebsiteChatbot } from "@/components/website/WebsiteChatbot";
import { openBooking } from "@/config/booking";

const Index = () => {
  console.log("Rendering Index page");
  const handleBooking = () => {
    openBooking();
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] flex items-center justify-center p-2 md:p-4">
      <Card className="w-full max-w-2xl bg-[#1A1F2C] border-amber-500/50">
        <CardHeader className="text-center space-y-3 md:space-y-6 pb-4 md:pb-8 px-3 md:px-6">
          <div className="mx-auto bg-amber-500/20 rounded-full p-1 md:p-2 w-fit">
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <AvatarImage src="/lovable-uploads/6d88c142-2eb2-4748-beed-6a725d1dc7e1.png" alt="Erdelean Jelco" className="object-cover" />
              <AvatarFallback>
                <User className="w-12 h-12 text-amber-400" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1 md:space-y-2">
            <h1 className="text-lg md:text-2xl font-semibold text-white">
              Erdelean Jelco — Automatizări cu AI pentru firme
            </h1>
            <CardTitle className="text-2xl md:text-4xl font-bold text-white"></CardTitle>
            <div className="flex justify-center gap-4 md:gap-8 pt-2 md:pt-6">
              <a href="https://www.instagram.com/erdeleanjelco/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors">
                <Instagram className="w-4 h-4 md:w-6 md:h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors">
                <Facebook className="w-4 h-4 md:w-6 md:h-6" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors">
                <Video className="w-4 h-4 md:w-6 md:h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-300 transition-colors">
                <Twitter className="w-4 h-4 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-10 px-3 md:px-6">
          <p className="text-sm md:text-lg text-white max-w-lg mx-auto leading-relaxed font-medium text-center whitespace-pre-line">
            {"🚀 Ajut firmele să crească folosind AI\n| Economisești timp ⏳ | Crești vânzările 💰 |\n\n📩 Contactează-mă pentru automatizare"}
          </p>

          <div className="grid gap-2 md:gap-6">
            <h2 className="font-semibold text-base md:text-xl text-white">Ce facem:</h2>
            <div className="flex flex-wrap gap-2 md:gap-4">
              <div className="flex-1 flex items-center gap-2 md:gap-3 bg-amber-900/30 p-2 md:p-4 rounded-lg border border-amber-500/50 hover:border-amber-400 transition-all duration-300 hover:bg-amber-900/40 group cursor-pointer">
                <Briefcase className="w-4 h-4 md:w-6 md:h-6 text-amber-400 flex-shrink-0 group-hover:text-amber-300 transition-colors" />
                <span className="text-xs md:text-base text-white group-hover:text-amber-100">Automatizare cu AI</span>
              </div>
              <div className="flex-1 flex items-center gap-2 md:gap-3 bg-amber-900/30 p-2 md:p-4 rounded-lg border border-amber-500/50 hover:border-amber-400 transition-all duration-300 hover:bg-amber-900/40 group cursor-pointer">
                <Briefcase className="w-4 h-4 md:w-6 md:h-6 text-amber-400 flex-shrink-0 group-hover:text-amber-300 transition-colors" />
                <span className="text-xs md:text-base text-white group-hover:text-amber-100">Optimizare Procese</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:space-y-6">
            <h2 className="font-semibold text-base md:text-xl text-white">Contact:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
              <a href="tel:0754274528" className="flex items-center gap-2 md:gap-3 text-white hover:text-amber-300 transition-colors text-xs md:text-base">
                <Phone className="w-3 h-3 md:w-5 md:h-5" />
                <span>0754274528</span>
              </a>
              <a href="mailto:contact@aiautomatizari.ro" className="flex items-center gap-2 md:gap-3 text-white hover:text-amber-300 transition-colors text-xs md:text-base">
                <Mail className="w-3 h-3 md:w-5 md:h-5" />
                <span>contact@aiautomatizari.ro</span>
              </a>
              <Link to="/website" className="flex items-center gap-2 md:gap-3 text-white hover:text-amber-300 transition-colors text-xs md:text-base">
                <Globe className="w-3 h-3 md:w-5 md:h-5" />
                <span>Vezi Site-ul</span>
              </Link>
            </div>
          </div>

          <div className="text-center pt-2 md:pt-6">
            <button onClick={handleBooking} className="
                relative
                bg-gradient-to-r from-[#F5B814] to-[#D97706]
                text-white
                hover:from-[#D97706] hover:to-[#FBBF24]
                transition-all duration-300
                text-sm md:text-lg
                px-6 md:px-10
                py-3 md:py-4
                h-auto rounded-lg
                shadow-[0_0_20px_rgba(139,92,246,0.3)]
                hover:shadow-[0_0_30px_rgba(217,70,239,0.4)]
                border border-amber-400/30
                backdrop-blur-sm
                animate-pulse
                hover:animate-none
                hover:scale-105
                before:absolute
                before:inset-0
                before:bg-gradient-to-r
                before:from-[#F5B814]/10
                before:to-[#FBBF24]/10
                before:rounded-lg
                before:opacity-0
                hover:before:opacity-100
                before:transition-opacity
                font-medium
                tracking-wide
              ">
              Programează o Discuție Gratuită
            </button>
          </div>
        </CardContent>
      </Card>
      <Toaster />
      <WebsiteChatbot />
    </div>;
};
export default Index;

import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Globe, Mail, Phone, User, Facebook, Instagram, Video, Twitter } from "lucide-react";

const Index = () => {
  console.log("Rendering Index page");
  
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/30min?month=2024-12', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] flex items-center justify-center p-2 md:p-4">
      <Card className="w-full max-w-2xl bg-[#1A1F2C] border-purple-500/50">
        <CardHeader className="text-center space-y-3 md:space-y-6 pb-4 md:pb-8 px-3 md:px-6">
          <div className="mx-auto bg-purple-500/20 rounded-full p-4 md:p-8 w-fit">
            <User className="w-8 h-8 md:w-16 md:h-16 text-purple-400" />
          </div>
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-lg md:text-2xl font-semibold text-white">
              Erdelean Jelco
            </h2>
            <CardTitle className="text-2xl md:text-4xl font-bold text-white">
              AI Automation Expert
            </CardTitle>
            {/* Social Media Links */}
            <div className="flex justify-center gap-4 md:gap-8 pt-2 md:pt-6">
              <a 
                href="https://www.instagram.com/erdeleanjelco/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-300 transition-colors"
              >
                <Instagram className="w-4 h-4 md:w-6 md:h-6" />
              </a>
              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-300 transition-colors"
              >
                <Facebook className="w-4 h-4 md:w-6 md:h-6" />
              </a>
              <a 
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-300 transition-colors"
              >
                <Video className="w-4 h-4 md:w-6 md:h-6" />
              </a>
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-300 transition-colors"
              >
                <Twitter className="w-4 h-4 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
          <CardDescription className="text-sm md:text-lg text-white max-w-lg mx-auto leading-relaxed font-medium">
            Helping businesses save 10+ hours weekly through AI automation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 md:space-y-10 px-3 md:px-6">
          {/* Bio Section */}
          <p className="text-xs md:text-base text-center text-white max-w-xl mx-auto leading-relaxed font-medium">
            I help businesses automate repetitive tasks and processes using AI tools, 
            reducing operational costs and boosting productivity. From data analysis 
            to workflow optimization, I create seamless automation systems.
          </p>

          {/* Services */}
          <div className="grid gap-2 md:gap-6">
            <h3 className="font-semibold text-base md:text-xl text-white">Services:</h3>
            <div className="flex flex-wrap gap-2 md:gap-4">
              <div className="flex-1 flex items-center gap-2 md:gap-3 bg-purple-900/30 p-2 md:p-4 rounded-lg border border-purple-500/50 hover:border-purple-400 transition-all duration-300 hover:bg-purple-900/40 group cursor-pointer">
                <Briefcase className="w-4 h-4 md:w-6 md:h-6 text-purple-400 flex-shrink-0 group-hover:text-purple-300 transition-colors" />
                <span className="text-xs md:text-base text-white group-hover:text-purple-100">AI Automation Solutions</span>
              </div>
              <div className="flex-1 flex items-center gap-2 md:gap-3 bg-purple-900/30 p-2 md:p-4 rounded-lg border border-purple-500/50 hover:border-purple-400 transition-all duration-300 hover:bg-purple-900/40 group cursor-pointer">
                <Briefcase className="w-4 h-4 md:w-6 md:h-6 text-purple-400 flex-shrink-0 group-hover:text-purple-300 transition-colors" />
                <span className="text-xs md:text-base text-white group-hover:text-purple-100">Process Automation</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2 md:space-y-6">
            <h3 className="font-semibold text-base md:text-xl text-white">Contact:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
              <a 
                href="tel:0754274528" 
                className="flex items-center gap-2 md:gap-3 text-white hover:text-purple-300 transition-colors text-xs md:text-base"
              >
                <Phone className="w-3 h-3 md:w-5 md:h-5" />
                <span>0754274528</span>
              </a>
              <a 
                href="mailto:automationaisolution@gmail.com"
                className="flex items-center gap-2 md:gap-3 text-white hover:text-purple-300 transition-colors text-xs md:text-base"
              >
                <Mail className="w-3 h-3 md:w-5 md:h-5" />
                <span>automationaisolution@gmail.com</span>
              </a>
              <Link 
                to="/website"
                className="flex items-center gap-2 md:gap-3 text-white hover:text-purple-300 transition-colors text-xs md:text-base"
              >
                <Globe className="w-3 h-3 md:w-5 md:h-5" />
                <span>View Full Website</span>
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center pt-2 md:pt-6">
            <button 
              onClick={handleBooking}
              className="bg-purple-500 text-white hover:bg-purple-600 transition-colors text-sm md:text-lg px-4 md:px-8 py-2 md:py-6 h-auto rounded-md"
            >
              Book a Free AI Audit
            </button>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default Index;

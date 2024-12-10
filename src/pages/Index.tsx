import { Button } from "@/components/ui/button";
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="mx-auto bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full p-8 w-fit shadow-2xl relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 blur-xl"></div>
            <User className="w-16 h-16 text-purple-300 relative z-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-purple-300">
              Erdelean Jelco
            </h2>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent">
              AI Automation Expert
            </CardTitle>
          </div>
          <CardDescription className="text-lg text-purple-100/80 max-w-lg mx-auto leading-relaxed">
            Helping businesses save 10+ hours weekly through AI automation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-10">
          {/* Bio Section */}
          <p className="text-center text-purple-100/70 max-w-xl mx-auto leading-relaxed">
            I help businesses automate repetitive tasks and processes using AI tools, 
            reducing operational costs and boosting productivity. From data analysis 
            to workflow optimization, I create seamless automation systems.
          </p>

          {/* Services */}
          <div className="grid gap-6">
            <h3 className="font-semibold text-xl text-purple-200">Services:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-4 rounded-lg hover:from-purple-500/20 hover:to-purple-600/10 transition-all duration-300 border border-purple-500/20">
                <Briefcase className="w-6 h-6 text-purple-300 flex-shrink-0" />
                <span className="text-purple-100">AI Automation Solutions</span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-4 rounded-lg hover:from-purple-500/20 hover:to-purple-600/10 transition-all duration-300 border border-purple-500/20">
                <Briefcase className="w-6 h-6 text-purple-300 flex-shrink-0" />
                <span className="text-purple-100">Process Automation</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="font-semibold text-xl text-purple-200">Contact:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a 
                href="tel:0754274528" 
                className="flex items-center gap-3 text-purple-100/80 hover:text-purple-300 transition-colors group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>0754274528</span>
              </a>
              <a 
                href="mailto:automationaisolution@gmail.com"
                className="flex items-center gap-3 text-purple-100/80 hover:text-purple-300 transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>automationaisolution@gmail.com</span>
              </a>
              <a 
                href="https://automatizariai.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-purple-100/80 hover:text-purple-300 transition-colors group"
              >
                <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>automatizariAi.ro</span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center gap-8 pt-6">
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300/60 hover:text-purple-300 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300/60 hover:text-purple-300 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300/60 hover:text-purple-300 transition-all duration-300 hover:scale-110"
              >
                <Video className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300/60 hover:text-purple-300 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center pt-6">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 transition-all duration-300 text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 border border-purple-400/20"
            >
              Book a Free AI Audit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
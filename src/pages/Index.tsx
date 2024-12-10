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
      <Card className="w-full max-w-2xl bg-[#1A1F2C] border-purple-500/50">
        <CardHeader className="text-center space-y-6 pb-8 px-4 md:px-6">
          <div className="mx-auto bg-purple-500/20 rounded-full p-6 md:p-8 w-fit">
            <User className="w-12 h-12 md:w-16 md:h-16 text-purple-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Erdelean Jelco
            </h2>
            <CardTitle className="text-3xl md:text-4xl font-bold text-white">
              AI Automation Expert
            </CardTitle>
            {/* Social Media Links moved here */}
            <div className="flex justify-center gap-6 md:gap-8 pt-4 md:pt-6">
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-300 transition-colors"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-300 transition-colors"
              >
                <Facebook className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a 
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-300 transition-colors"
              >
                <Video className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-purple-300 transition-colors"
              >
                <Twitter className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
          <CardDescription className="text-base md:text-lg text-white max-w-lg mx-auto leading-relaxed font-medium">
            Helping businesses save 10+ hours weekly through AI automation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8 md:space-y-10 px-4 md:px-6">
          {/* Bio Section */}
          <p className="text-sm md:text-base text-center text-white max-w-xl mx-auto leading-relaxed font-medium">
            I help businesses automate repetitive tasks and processes using AI tools, 
            reducing operational costs and boosting productivity. From data analysis 
            to workflow optimization, I create seamless automation systems.
          </p>

          {/* Services */}
          <div className="grid gap-4 md:gap-6">
            <h3 className="font-semibold text-lg md:text-xl text-white">Services:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-center gap-3 bg-purple-900/30 p-3 md:p-4 rounded-lg border border-purple-500">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0" />
                <span className="text-sm md:text-base text-white">AI Automation Solutions</span>
              </div>
              <div className="flex items-center gap-3 bg-purple-900/30 p-3 md:p-4 rounded-lg border border-purple-500">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-white flex-shrink-0" />
                <span className="text-sm md:text-base text-white">Process Automation</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="font-semibold text-lg md:text-xl text-white">Contact:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <a 
                href="tel:0754274528" 
                className="flex items-center gap-3 text-white hover:text-purple-300 transition-colors text-sm md:text-base"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span>0754274528</span>
              </a>
              <a 
                href="mailto:automationaisolution@gmail.com"
                className="flex items-center gap-3 text-white hover:text-purple-300 transition-colors text-sm md:text-base"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span>automationaisolution@gmail.com</span>
              </a>
              <a 
                href="https://automatizariai.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-purple-300 transition-colors text-sm md:text-base"
              >
                <Globe className="w-4 h-4 md:w-5 md:h-5" />
                <span>automatizariAi.ro</span>
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center pt-4 md:pt-6">
            <Button 
              size="lg" 
              className="bg-purple-500 text-white hover:bg-purple-600 transition-colors text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto"
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
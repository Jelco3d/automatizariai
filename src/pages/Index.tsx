import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Globe, Mail, Phone, User } from "lucide-react";

const Index = () => {
  console.log("Rendering Index page");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto bg-gradient-to-br from-purple-100 to-purple-200 rounded-full p-6 w-fit shadow-inner">
            <User className="w-16 h-16 text-purple-600" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            AI Automation Expert
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
            Helping businesses save 10+ hours weekly through AI automation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-10">
          {/* Bio Section */}
          <p className="text-center text-gray-600 max-w-xl mx-auto leading-relaxed">
            I help businesses automate repetitive tasks and processes using AI tools, 
            reducing operational costs and boosting productivity. From lead generation 
            to data entry, I create seamless automation systems.
          </p>

          {/* Services */}
          <div className="grid gap-6">
            <h3 className="font-semibold text-xl text-purple-800">Services:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors">
                <Briefcase className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">AI Automation Solutions</span>
              </div>
              <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors">
                <Briefcase className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Workflow Optimization</span>
              </div>
              <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors">
                <Briefcase className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Lead Generation</span>
              </div>
              <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors">
                <Briefcase className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700">Process Automation</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
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

          {/* CTA Button */}
          <div className="text-center pt-6">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 transition-colors text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl"
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
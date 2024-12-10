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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-purple-100 rounded-full p-4 w-fit">
            <User className="w-12 h-12 text-purple-600" />
          </div>
          <CardTitle className="text-3xl font-bold">AI Automation Expert</CardTitle>
          <CardDescription className="text-lg">
            Helping businesses save 10+ hours weekly through AI automation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Bio Section */}
          <p className="text-center text-gray-600 max-w-xl mx-auto">
            I help businesses automate repetitive tasks and processes using AI tools, 
            reducing operational costs and boosting productivity. From lead generation 
            to data entry, I create seamless automation systems.
          </p>

          {/* Services */}
          <div className="grid gap-4">
            <h3 className="font-semibold text-lg">Services:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <span>AI Automation Solutions</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <span>Workflow Optimization</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <span>Lead Generation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <span>Process Automation</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+1 (234) 567-890</span>
              </a>
              <a 
                href="mailto:contact@example.com"
                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>contact@example.com</span>
              </a>
              <a 
                href="https://yourwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span>yourwebsite.com</span>
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center pt-4">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 transition-colors"
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileHeader } from "@/components/business-card/ProfileHeader";
import { ServicesList } from "@/components/business-card/ServicesList";
import { ContactInfo } from "@/components/business-card/ContactInfo";

const Index = () => {
  console.log("Rendering Index page");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <ProfileHeader />
        </CardHeader>
        
        <CardContent className="space-y-10">
          {/* Bio Section */}
          <p className="text-center text-gray-600 max-w-xl mx-auto leading-relaxed">
            I help businesses automate repetitive tasks and processes using AI tools, 
            reducing operational costs and boosting productivity. From lead generation 
            to data entry, I create seamless automation systems.
          </p>

          <ServicesList />
          <ContactInfo />

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
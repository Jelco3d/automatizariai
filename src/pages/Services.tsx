
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { ServicesHero } from "@/components/website/services/ServicesHero";
import { DetailedServices } from "@/components/website/services/DetailedServices";
import { PricingPlans } from "@/components/website/services/PricingPlans";
import { CaseStudies } from "@/components/website/services/CaseStudies";
import { TechnicalCapabilities } from "@/components/website/services/TechnicalCapabilities";
import { IntegrationOptions } from "@/components/website/services/IntegrationOptions";
import { CTASection } from "@/components/website/services/CTASection";
import { WebsiteChatbot } from "@/components/website/WebsiteChatbot";

const Services = () => {
  console.log("Rendering Services page");

  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] relative overflow-hidden">
      <Navigation />
      
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-yellow-500/[0.07] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-yellow-400/[0.04] rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <ServicesHero handleBooking={handleBooking} />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <DetailedServices />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <PricingPlans handleBooking={handleBooking} />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <CaseStudies />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <TechnicalCapabilities />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <IntegrationOptions />
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
        <CTASection handleBooking={handleBooking} />

        <Footer />
      </div>
      <WebsiteChatbot />
    </div>
  );
};

export default Services;

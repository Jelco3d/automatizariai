
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
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      <Navigation />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <ServicesHero handleBooking={handleBooking} />
      <DetailedServices />
      <PricingPlans handleBooking={handleBooking} />
      <CaseStudies />
      <TechnicalCapabilities />
      <IntegrationOptions />
      <CTASection handleBooking={handleBooking} />

      <Footer />
      <WebsiteChatbot />
    </div>
  );
};

export default Services;

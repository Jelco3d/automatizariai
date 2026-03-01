
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
      
      {/* Animated background elements - gold/amber like Homepage */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <ServicesHero handleBooking={handleBooking} />
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mx-auto" />
      <DetailedServices />
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mx-auto" />
      <PricingPlans handleBooking={handleBooking} />
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mx-auto" />
      <CaseStudies />
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mx-auto" />
      <TechnicalCapabilities />
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mx-auto" />
      <IntegrationOptions />
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent mx-auto" />
      <CTASection handleBooking={handleBooking} />

      <Footer />
      <WebsiteChatbot />
    </div>);

};

export default Services;
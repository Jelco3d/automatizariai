
import { Link } from "react-router-dom";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { HeroSection } from "@/components/website/HeroSection";
import { ServicesSection } from "@/components/website/ServicesSection";
import { BenefitsSection } from "@/components/website/BenefitsSection";
import { TestimonialsSection } from "@/components/website/TestimonialsSection";
import { CTASection } from "@/components/website/CTASection";
import { TechStackSection } from "@/components/website/TechStackSection";

const Website = () => {
  console.log("Rendering Website page");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      <Navigation />
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <HeroSection />
      <ServicesSection />
      <BenefitsSection />
      <TechStackSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />

      {/* Navigation back to card */}
      <div className="container mx-auto px-4 py-8 text-center">
        <Link to="/acasă" className="text-purple-400 hover:text-purple-300 transition-colors">
          ← Către Cartea de Vizită
        </Link>
      </div>
    </div>
  );
};

export default Website;

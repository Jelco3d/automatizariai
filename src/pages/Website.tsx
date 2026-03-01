import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { HeroSection } from "@/components/website/HeroSection";
import { VSLSection } from "@/components/website/VSLSection";
import { ProblemSection } from "@/components/website/ProblemSection";
import { SolutionSection } from "@/components/website/SolutionSection";
import { TestimonialsSection } from "@/components/website/TestimonialsSection";
import { WebsiteChatbot } from "@/components/website/WebsiteChatbot";

const Website = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C1F3C] to-[#1A1F2C] relative overflow-hidden">
      <Navigation />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 right-1/4 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <HeroSection />
      <VSLSection />
      <ProblemSection />
      <SolutionSection />
      <TestimonialsSection />
      <Footer />

      <WebsiteChatbot />
    </div>
  );
};

export default Website;

import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { HeroSection } from "@/components/website/HeroSection";
import { VSLSection } from "@/components/website/VSLSection";
import { ProblemSection } from "@/components/website/ProblemSection";
import { SolutionSection } from "@/components/website/SolutionSection";
import { TestimonialsSection } from "@/components/website/TestimonialsSection";
import { WebsiteChatbot } from "@/components/website/WebsiteChatbot";
import { CTASection } from "@/components/website/CTASection";

const Website = () => {
  return (
    <div className="min-h-screen bg-[#0a0e1a] relative overflow-hidden">
      <Navigation />

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-yellow-500/[0.07] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute bottom-40 right-1/4 w-[300px] h-[300px] bg-yellow-400/[0.04] rounded-full blur-[80px] animate-pulse delay-500" />
        <div className="absolute top-1/4 left-1/3 w-[200px] h-[200px] bg-amber-400/[0.03] rounded-full blur-[60px] animate-pulse delay-700" />
      </div>

      <HeroSection />

      {/* Divider */}
      <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <VSLSection />

      <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <ProblemSection />

      <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <SolutionSection />

      <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <TestimonialsSection />

      <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />

      <CTASection />

      <Footer />

      <WebsiteChatbot />
    </div>
  );
};

export default Website;

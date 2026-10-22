
import { useState } from "react";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { CTASection } from "@/components/portfolio/CTASection";
import { CategoryFilters } from "@/components/portfolio/CategoryFilters";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { CaseStudiesGrid } from "@/components/portfolio/CaseStudiesGrid";
import { categories, caseStudies } from "@/data/caseStudies";
import { WebsiteChatbot } from "@/components/website/WebsiteChatbot";

const Portfolio = () => {
  console.log("Rendering Portfolio page");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCaseStudies = activeCategory === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-yellow-500/[0.07] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
        <PortfolioHero />
        <CategoryFilters 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <CaseStudiesGrid caseStudies={filteredCaseStudies} />
        <CTASection />
        <Footer />
      </div>
      <WebsiteChatbot />
    </div>
  );
};

export default Portfolio;

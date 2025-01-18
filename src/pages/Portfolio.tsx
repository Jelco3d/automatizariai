import { useState } from "react";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { CTASection } from "@/components/portfolio/CTASection";
import { CategoryFilters } from "@/components/portfolio/CategoryFilters";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { CaseStudiesGrid } from "@/components/portfolio/CaseStudiesGrid";
import { categories, caseStudies } from "@/data/caseStudies";

const Portfolio = () => {
  console.log("Rendering Portfolio page");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCaseStudies = activeCategory === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white overflow-hidden">
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
  );
};

export default Portfolio;
import { motion } from "framer-motion";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { CaseStudyCard } from "@/components/portfolio/CaseStudyCard";
import { CTASection } from "@/components/portfolio/CTASection";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Portfolio = () => {
  console.log("Rendering Portfolio page");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "productivity", label: "Productivity" },
    { id: "ecommerce", label: "Ecommerce" },
    { id: "sales", label: "Sales" },
    { id: "more", label: "And More" },
  ];

  const caseStudies = [
    {
      client: "Personal AI Assistant",
      industry: "Personal Productivity",
      category: "productivity",
      challenge: "Managing daily tasks, scheduling, and personal organization manually",
      solution: "Implemented a comprehensive AI assistant for task management, calendar organization, and personal workflow automation",
      results: {
        timeReduction: "80%",
        costSaving: "$150,000 annually",
        roi: "450%",
        timeline: "2 months"
      },
      beforeAfter: {
        before: "6+ hours daily on personal management",
        after: "Automated task handling, smart scheduling"
      }
    },
    {
      client: "AI Email Assistant",
      industry: "Business Process Automation",
      category: "productivity",
      challenge: "Managing high volume of emails, scheduling, and client communication manually",
      solution: "Implemented an AI-powered email assistant for automated response handling, appointment scheduling, and client communication management",
      results: {
        timeReduction: "95%",
        costSaving: "$200,000 annually",
        roi: "500%",
        timeline: "1 month"
      },
      beforeAfter: {
        before: "4+ hours daily on email management",
        after: "Automated responses, instant scheduling"
      }
    },
    {
      client: "AI Meeting Assistant",
      industry: "Corporate Productivity",
      category: "productivity",
      challenge: "Time wasted in unproductive meetings and manual note-taking",
      solution: "Developed an AI meeting assistant for automated transcription, action item extraction, and follow-up management",
      results: {
        timeReduction: "70%",
        costSaving: "$180,000 annually",
        roi: "400%",
        timeline: "3 months"
      },
      beforeAfter: {
        before: "3+ hours daily on meeting management",
        after: "Automated transcripts and action items"
      }
    },
    {
      client: "Document Processing AI",
      industry: "Legal Services",
      category: "productivity",
      challenge: "Manual document review and data extraction taking excessive time",
      solution: "Implemented AI-powered document analysis and data extraction system",
      results: {
        timeReduction: "85%",
        costSaving: "$300,000 annually",
        roi: "550%",
        timeline: "4 months"
      },
      beforeAfter: {
        before: "8+ hours per document batch",
        after: "15 minutes per batch with AI"
      }
    },
    {
      client: "TechCorp Solutions",
      industry: "Manufacturing",
      category: "ecommerce",
      challenge: "Manual data processing taking 40+ hours weekly",
      solution: "Implemented AI-powered document processing",
      results: {
        timeReduction: "85%",
        costSaving: "$120,000 annually",
        roi: "380%",
        timeline: "3 months"
      },
      beforeAfter: {
        before: "Manual data entry, high error rates",
        after: "Automated processing, 99.9% accuracy"
      }
    },
    {
      client: "Global Logistics Inc",
      industry: "Transportation",
      category: "sales",
      challenge: "Inefficient route planning and scheduling",
      solution: "AI route optimization system",
      results: {
        timeReduction: "60%",
        costSaving: "$250,000 annually",
        roi: "450%",
        timeline: "4 months"
      },
      beforeAfter: {
        before: "Manual route planning, fuel wastage",
        after: "Optimized routes, 40% fuel savings"
      }
    },
    {
      client: "FinTech Innovations",
      industry: "Financial Services",
      category: "more",
      challenge: "Customer support backlog of 72+ hours",
      solution: "AI chatbot and ticket automation",
      results: {
        timeReduction: "90%",
        costSaving: "$180,000 annually",
        roi: "320%",
        timeline: "2 months"
      },
      beforeAfter: {
        before: "72-hour response time",
        after: "Instant responses, 95% satisfaction"
      }
    }
  ];

  const filteredCaseStudies = activeCategory === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 pt-24 pb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Success Stories
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Discover how our AI automation solutions have transformed businesses and delivered measurable results.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => setActiveCategory("all")}
            className="bg-purple-500 hover:bg-purple-600"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={activeCategory === category.id ? "bg-purple-500 hover:bg-purple-600" : ""}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </motion.section>

      {/* Case Studies Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCaseStudies.map((study, index) => (
            <CaseStudyCard key={index} {...study} />
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
};

export default Portfolio;

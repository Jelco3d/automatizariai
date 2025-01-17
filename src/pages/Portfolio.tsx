import { motion } from "framer-motion";
import { Navigation } from "@/components/website/Navigation";
import { Footer } from "@/components/website/Footer";
import { CaseStudyCard } from "@/components/portfolio/CaseStudyCard";
import { CTASection } from "@/components/portfolio/CTASection";

const Portfolio = () => {
  console.log("Rendering Portfolio page");

  const caseStudies = [
    {
      client: "AI Email Assistant",
      industry: "Business Process Automation",
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
      client: "TechCorp Solutions",
      industry: "Manufacturing",
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
      </motion.section>

      {/* Case Studies Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
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
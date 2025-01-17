import { motion } from "framer-motion";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudy } from "@/types/portfolio";

interface CaseStudiesGridProps {
  caseStudies: CaseStudy[];
}

export const CaseStudiesGrid = ({ caseStudies }: CaseStudiesGridProps) => {
  console.log("Rendering CaseStudiesGrid, count:", caseStudies.length);
  
  return (
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
  );
};
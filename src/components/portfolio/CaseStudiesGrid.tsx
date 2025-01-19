import { motion } from "framer-motion";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudy } from "@/types/portfolio";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

interface CaseStudiesGridProps {
  caseStudies: CaseStudy[];
}

export const CaseStudiesGrid = ({ caseStudies }: CaseStudiesGridProps) => {
  console.log("Rendering CaseStudiesGrid, count:", caseStudies.length);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(caseStudies.length / itemsPerPage);
  
  // Calculate the current page's case studies
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCaseStudies = caseStudies.slice(startIndex, endIndex);

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="container mx-auto px-4 py-16 bg-transparent"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {currentCaseStudies.map((study, index) => (
          <CaseStudyCard key={index} {...study} />
        ))}
      </div>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {pageNumbers.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                onClick={() => setCurrentPage(pageNum)}
                isActive={currentPage === pageNum}
                className="cursor-pointer"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.section>
  );
};
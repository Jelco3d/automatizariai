import { motion } from "framer-motion";
import { useState } from "react";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudy } from "@/types/portfolio";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CaseStudiesGridProps {
  caseStudies: CaseStudy[];
}

export const CaseStudiesGrid = ({ caseStudies }: CaseStudiesGridProps) => {
  console.log("Rendering CaseStudiesGrid, count:", caseStudies.length);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Calculate pagination
  const totalPages = Math.ceil(caseStudies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCaseStudies = caseStudies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {currentCaseStudies.map((study, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-8 -top-4 text-4xl font-bold text-gray-500 opacity-50">
              {startIndex + index + 1}
            </div>
            <CaseStudyCard {...study} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </motion.section>
  );
};
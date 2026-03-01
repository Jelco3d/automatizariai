
import { Button } from "@/components/ui/button";
import { categories } from "@/data/caseStudies";

interface CategoryFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilters = ({ activeCategory, onCategoryChange }: CategoryFiltersProps) => {
  console.log("Rendering CategoryFilters with activeCategory:", activeCategory);
  
  return (
    <div className="flex flex-wrap justify-center md:justify-center gap-1.5 md:gap-2 mb-6">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
        className={`${
          activeCategory === "all" 
            ? "bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" 
            : "border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
        }`}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className={`${
            activeCategory === category.id 
              ? "bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" 
              : "border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

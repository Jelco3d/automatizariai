import { Button } from "@/components/ui/button";
import { categories } from "@/data/caseStudies";

interface CategoryFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilters = ({ activeCategory, onCategoryChange }: CategoryFiltersProps) => {
  console.log("Rendering CategoryFilters with activeCategory:", activeCategory);
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
        className={`${
          activeCategory === "all" 
            ? "bg-purple-500 hover:bg-purple-600" 
            : "border-purple-500 text-purple-500 hover:bg-purple-100/10"
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
              ? "bg-purple-500 hover:bg-purple-600" 
              : "border-purple-500 text-purple-500 hover:bg-purple-100/10"
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};
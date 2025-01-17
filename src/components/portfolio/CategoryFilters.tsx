import { Button } from "@/components/ui/button";
import { Category } from "@/types/portfolio";

interface CategoryFiltersProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFiltersProps) => {
  console.log("Rendering CategoryFilters, active:", activeCategory);
  
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
        className={`${
          activeCategory === "all" 
            ? "bg-purple-500 hover:bg-purple-600" 
            : "border-purple-500 text-purple-500 hover:bg-purple-100"
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
              : "border-purple-500 text-purple-500 hover:bg-purple-100"
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};
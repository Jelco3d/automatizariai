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
        className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className={activeCategory === category.id ? "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90" : ""}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};
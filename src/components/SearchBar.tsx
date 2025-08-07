import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 h-5 w-5 transition-colors group-focus-within:text-primary" />
      <Input
        type="text"
        placeholder="Caută servicii, soluții AI..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 h-12 bg-background/10 backdrop-blur-md border border-white/20 rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-background/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-background/15"
      />
    </div>
  );
};
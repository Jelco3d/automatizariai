import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (results: string) => void;
}

export const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const handleSearch = async (searchValue: string) => {
    if (!searchValue.trim() || !onSearch) return;

    try {
      const response = await fetch('https://ejelco8.app.n8n.cloud/webhook/a2020483-44a2-4eff-9bfd-b6b73e42fc54', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          message: searchValue,
          chat_messages: [],
          vin_car: null,
          timestamp: new Date().toISOString(),
          user: 'website-visitor'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      onSearch(responseText);
    } catch (error) {
      console.error('Error searching:', error);
      onSearch('Ne pare rău, a apărut o eroare în procesarea căutării. Te rog încearcă din nou.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(value);
    }
  };

  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 h-5 w-5 transition-colors group-focus-within:text-primary" />
      <Input
        type="text"
        placeholder="Caută piese auto..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pl-12 h-12 bg-background/10 backdrop-blur-md border border-white/20 rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-background/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-background/15"
      />
    </div>
  );
};
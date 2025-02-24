
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

export function Header() {
  return (
    <header className="bg-[#1A1F2C] border-b border-purple-500/20 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
      </div>
    </header>
  );
}

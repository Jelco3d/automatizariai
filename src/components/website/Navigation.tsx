
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export function Navigation() {
  console.log("Rendering Navigation component");
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizariai', '_blank');
  };
  return <div className="fixed top-0 left-0 right-0 z-50 flex md:justify-center justify-center items-center px-5 py-2 relative">
      <Link to="/" className="flex items-center">
        <img alt="AI Automatizari Logo" src="/lovable-uploads/new-logo.png" className="h-16 md:h-24 w-auto rounded-3xl object-contain" />
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="bg-background/20 backdrop-blur-sm border-purple-500/50 hover:bg-purple-500/20 absolute right-4 top-1/2 -translate-y-1/2">
            <Menu className="h-5 w-5 text-purple-400" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] bg-[#1A1F2C]/95 backdrop-blur-lg border-purple-500/20">
          <nav className="flex flex-col gap-4 mt-8">
            <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors px-4 py-2 rounded-lg hover:bg-purple-500/10">
              Acasă
            </Link>
            <Link to="/services" className="text-gray-300 hover:text-purple-400 transition-colors px-4 py-2 rounded-lg hover:bg-purple-500/10">
              Servicii
            </Link>
            <Link to="/search" className="text-gray-300 hover:text-purple-400 transition-colors px-4 py-2 rounded-lg hover:bg-purple-500/10">
              Căutare
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-purple-400 transition-colors px-4 py-2 rounded-lg hover:bg-purple-500/10">
              Despre Noi
            </Link>
            <Link to="/portfolio" className="text-gray-300 hover:text-purple-400 transition-colors px-4 py-2 rounded-lg hover:bg-purple-500/10">
              Portofoliu
            </Link>
            <Button onClick={handleBooking} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white mt-4">
              Programează Consultație
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>;
}

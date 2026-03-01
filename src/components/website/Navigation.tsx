import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export function Navigation() {
  const handleBooking = () => {
    window.open('https://calendly.com/aiautomatizari/automatizari-ai', '_blank');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-2">
      <Link to="/" className="flex flex-col items-center gap-1 group">
        <div className="relative w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110">
          <img 
            src="/lovable-uploads/new-logo.png" 
            alt="AI Automatizari Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
          AUTOMATIZĂRI
        </span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/[0.05] backdrop-blur-sm border-yellow-400/30 hover:bg-yellow-400/10 hover:border-yellow-400/50 absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300"
          >
            <Menu className="h-5 w-5 text-yellow-400" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] bg-[#0a0e1a]/95 backdrop-blur-xl border-white/[0.08]">
          <nav className="flex flex-col gap-4 mt-8">
            <Link to="/" className="text-white/70 hover:text-yellow-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-yellow-400/[0.06]">
              Acasă
            </Link>
            <Link to="/services" className="text-white/70 hover:text-yellow-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-yellow-400/[0.06]">
              Servicii
            </Link>
            <Link to="/audit-gratuit" className="text-white/70 hover:text-yellow-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-yellow-400/[0.06]">
              Audit Gratuit
            </Link>
            <Link to="/about" className="text-white/70 hover:text-yellow-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-yellow-400/[0.06]">
              Despre Noi
            </Link>
            <Link to="/portfolio" className="text-white/70 hover:text-yellow-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-yellow-400/[0.06]">
              Portofoliu
            </Link>
            <Link to="/contact" className="text-white/70 hover:text-yellow-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-yellow-400/[0.06]">
              Contact
            </Link>
            <Button
              onClick={handleBooking}
              className="btn-3d-gold mt-4"
            >
              Programează Consultație
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

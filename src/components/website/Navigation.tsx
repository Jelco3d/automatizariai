import logoDark from "@/assets/logo-dark.png.asset.json";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

interface NavigationProps {
  onOpenAuditModal?: () => void;
}

export function Navigation({ onOpenAuditModal }: NavigationProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleBooking = () => {
    setSheetOpen(false);
    onOpenAuditModal?.();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-1.5 md:py-2">
      <Link to="/" className="flex items-center group" aria-label="AI Automatizări">
        <img src={logoDark.url} alt="AI Automatizări" className="h-12 md:h-16 lg:h-20 w-auto transition-transform duration-300 group-hover:scale-105" />
      </Link>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Deschide meniu navigare"
            className="bg-white/[0.05] backdrop-blur-sm border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400/50 absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300"
          >
            <Menu className="h-5 w-5 text-cyan-400" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] bg-[#051535]/95 backdrop-blur-xl border-white/[0.08]">
          <nav className="flex flex-col gap-4 mt-8">
            <Link to="/" className="text-white/70 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-cyan-400/[0.06]">
              Acasă
            </Link>
            <Link to="/services" className="text-white/70 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-cyan-400/[0.06]">
              Servicii
            </Link>
            <Link to="/audit-gratuit" className="text-white/70 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-cyan-400/[0.06]">
              Audit Gratuit
            </Link>
            <Link to="/about" className="text-white/70 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-cyan-400/[0.06]">
              Despre Noi
            </Link>
            <Link to="/portfolio" className="text-white/70 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-cyan-400/[0.06]">
              Portofoliu
            </Link>
            <Link to="/contact" className="text-white/70 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-cyan-400/[0.06]">
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

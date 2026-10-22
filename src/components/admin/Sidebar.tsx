import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  FileSpreadsheet, 
  Lightbulb,
  FileCheck, 
  Users, 
  LogOut,
  Menu,
  X,
  CreditCard,
  CalendarDays,
  UserPlus
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navSections = [
  {
    label: "Principal",
    links: [
      { to: "/business-dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/business-dashboard/leads", icon: UserPlus, label: "Leads" },
      { to: "/business-dashboard/calendar", icon: CalendarDays, label: "Calendar" },
    ],
  },
  {
    label: "Documente",
    links: [
      { to: "/business-dashboard/proposals", icon: Lightbulb, label: "Propuneri" },
      { to: "/business-dashboard/contracts", icon: FileCheck, label: "Contracte" },
      { to: "/business-dashboard/quotes", icon: FileSpreadsheet, label: "Oferte" },
    ],
  },
  {
    label: "Financiar",
    links: [
      { to: "/business-dashboard/invoices", icon: FileText, label: "Încasări" },
      { to: "/business-dashboard/plati", icon: CreditCard, label: "Plăți" },
      { to: "/business-dashboard/clients", icon: Users, label: "Clienți" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Deconectat", description: "Ai fost deconectat cu succes." });
    navigate("/auth");
    setOpen(false);
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <Link to="/business-dashboard" className="flex items-center justify-center mb-8 mt-2" onClick={() => setOpen(false)}>
        <img 
          src="/lovable-uploads/ed45f672-b988-4257-832b-bec499caad23.png" 
          alt="AI Automatizari" 
          className="h-14 w-auto rounded-xl opacity-90 hover:opacity-100 transition-opacity" 
        />
      </Link>

      <nav className="flex-1 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="sidebar-section-label">{section.label}</p>
            <div className="space-y-0.5">
              {section.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "sidebar-link",
                    isActive(link.to) ? "sidebar-link-active" : "sidebar-link-inactive"
                  )}
                >
                  <link.icon className="h-4 w-4 flex-shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/[0.06] pt-3 mt-4">
        <button 
          onClick={handleLogout}
          className="sidebar-link sidebar-link-inactive w-full text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.06]"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Deconectare
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="glass-card border border-white/10 hover:bg-white/[0.06]">
              {open ? <X className="h-5 w-5 text-gray-300" /> : <Menu className="h-5 w-5 text-gray-300" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sidebar-premium border-white/[0.06] p-4 w-64">
            <NavContent />
          </SheetContent>
        </Sheet>
        
        <Link to="/business-dashboard" className="flex items-center">
          <img src="/lovable-uploads/ed45f672-b988-4257-832b-bec499caad23.png" alt="AI Automatizari" className="h-10 w-auto rounded-lg" />
        </Link>
        <div className="w-10" />
      </div>

      {/* Desktop */}
      <aside className="w-60 sidebar-premium border-r border-white/[0.06] p-4 hidden md:flex md:flex-col flex-shrink-0">
        <NavContent />
      </aside>
    </>
  );
}

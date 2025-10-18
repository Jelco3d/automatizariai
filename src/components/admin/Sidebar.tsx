
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  FileSpreadsheet, 
  FileCheck, 
  Users, 
  LogOut
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Deconectat",
      description: "Ai fost deconectat cu succes.",
    });
    navigate("/auth");
  };

  return (
    <aside className="w-64 bg-[#1A1F2C] border-r border-purple-500/20 p-4 hidden md:block">
      <Link to="/business-dashboard" className="flex items-center justify-center mb-8">
        <img 
          src="/lovable-uploads/ed45f672-b988-4257-832b-bec499caad23.png" 
          alt="AI Automatizari" 
          className="h-16 w-auto rounded-xl" 
        />
      </Link>

      <nav className="space-y-2">
        <Link 
          to="/business-dashboard" 
          className={`flex items-center gap-2 p-2 rounded-lg ${
            isActive("/business-dashboard") 
              ? "text-purple-400 bg-purple-500/10" 
              : "text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link 
          to="/business-dashboard/invoices" 
          className={`flex items-center gap-2 p-2 rounded-lg ${
            isActive("/business-dashboard/invoices") 
              ? "text-purple-400 bg-purple-500/10" 
              : "text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
          }`}
        >
          <FileText className="h-5 w-5" />
          Facturi
        </Link>
        <Link 
          to="/business-dashboard/quotes" 
          className={`flex items-center gap-2 p-2 rounded-lg ${
            isActive("/business-dashboard/quotes") 
              ? "text-purple-400 bg-purple-500/10" 
              : "text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
          }`}
        >
          <FileSpreadsheet className="h-5 w-5" />
          Oferte
        </Link>
        <Link 
          to="/business-dashboard/contracts" 
          className={`flex items-center gap-2 p-2 rounded-lg ${
            isActive("/business-dashboard/contracts") 
              ? "text-purple-400 bg-purple-500/10" 
              : "text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
          }`}
        >
          <FileCheck className="h-5 w-5" />
          Contracte
        </Link>
        <Link 
          to="/business-dashboard/clients" 
          className={`flex items-center gap-2 p-2 rounded-lg ${
            isActive("/business-dashboard/clients") 
              ? "text-purple-400 bg-purple-500/10" 
              : "text-gray-400 hover:text-purple-400 hover:bg-purple-500/10"
          }`}
        >
          <Users className="h-5 w-5" />
          Clienți
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-purple-400 p-2 rounded-lg hover:bg-purple-500/10 w-full"
        >
          <LogOut className="h-5 w-5" />
          Deconectare
        </button>
      </nav>
    </aside>
  );
}

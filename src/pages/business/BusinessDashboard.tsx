import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileSpreadsheet, FileCheck, Users, TrendingUp, DollarSign } from "lucide-react";
import { Session } from "@supabase/supabase-js";

export default function BusinessDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen bg-[#0F1117] flex items-center justify-center">
      <p className="text-white">Se încarcă...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard Business</h1>
          <div className="flex md:hidden justify-center w-full">
            <img 
              src="/lovable-uploads/ed45f672-b988-4257-832b-bec499caad23.png" 
              alt="AI Automatizari" 
              className="h-12 w-auto rounded-lg" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#1A1F2C] border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Facturi</CardTitle>
              <FileText className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400 mt-1">Luna curentă</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C] border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Oferte Trimise</CardTitle>
              <FileSpreadsheet className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400 mt-1">Luna curentă</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C] border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Contracte Active</CardTitle>
              <FileCheck className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400 mt-1">Active acum</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C] border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Clienți</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400 mt-1">Clienți înregistrați</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C] border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Venit Luna Curentă</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0 RON</div>
              <p className="text-xs text-gray-400 mt-1">Facturi plătite</p>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1F2C] border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Venit Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0 RON</div>
              <p className="text-xs text-gray-400 mt-1">Toate perioadele</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1A1F2C] border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Activitate Recentă</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 text-center py-8">
              Nu există activitate recentă. Începe prin a crea prima factură, ofertă sau contract!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

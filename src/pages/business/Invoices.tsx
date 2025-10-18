import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Session } from "@supabase/supabase-js";
import { InvoicesTable } from "@/components/business/invoices/InvoicesTable";
import { InvoiceForm } from "@/components/business/invoices/InvoiceForm";

export default function Invoices() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
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
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Facturi</h1>
          <Button onClick={() => setFormOpen(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Factură Nouă
          </Button>
        </div>

        <InvoicesTable />
        <InvoiceForm open={formOpen} onOpenChange={setFormOpen} />
      </div>
    </div>
  );
}

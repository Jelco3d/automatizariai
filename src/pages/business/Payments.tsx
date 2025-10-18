import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, CheckCircle2 } from "lucide-react";
import { usePayableInvoices } from "@/hooks/usePayableInvoices";
import { PayableInvoicesTable } from "@/components/business/invoices/PayableInvoicesTable";
import { PayableInvoiceForm } from "@/components/business/invoices/PayableInvoiceForm";
import { Session } from "@supabase/supabase-js";
import { formatCurrency } from "@/utils/numberFormatters";

export default function Payments() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPayableForm, setShowPayableForm] = useState(false);
  const navigate = useNavigate();
  const { payableInvoices, isLoading } = usePayableInvoices();

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

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center">
        <p className="text-white">Se încarcă...</p>
      </div>
    );
  }

  const unpaidInvoices = payableInvoices.filter(inv => inv.status === 'unpaid');
  const paidInvoices = payableInvoices.filter(inv => inv.status === 'paid');

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Plăți</h1>
          <div className="flex md:hidden justify-center w-full">
            <img 
              src="/lovable-uploads/ed45f672-b988-4257-832b-bec499caad23.png" 
              alt="AI Automatizari" 
              className="h-12 w-auto rounded-lg" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-[#1A1F2C] border-red-500/20 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Facturi de Plată</p>
                <p className="text-2xl md:text-3xl font-bold text-white mt-2">{unpaidInvoices.length}</p>
                <p className="text-red-400 text-sm mt-1">{formatCurrency(unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0))}</p>
              </div>
              <FileText className="h-8 w-8 md:h-10 md:w-10 text-red-400" />
            </div>
          </Card>

          <Card className="bg-[#1A1F2C] border-green-500/20 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Facturi Plătite</p>
                <p className="text-2xl md:text-3xl font-bold text-white mt-2">{paidInvoices.length}</p>
                <p className="text-green-400 text-sm mt-1">{formatCurrency(paidInvoices.reduce((sum, inv) => sum + inv.total, 0))}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-green-400" />
            </div>
          </Card>
        </div>

        <Card className="bg-[#1A1F2C] border-purple-500/20 p-4 md:p-6">
          <Tabs defaultValue="unpaid" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
              <TabsList className="bg-[#0F1117] w-full md:w-auto">
                <TabsTrigger value="unpaid" className="flex-1 md:flex-none">
                  Facturi de Plată
                </TabsTrigger>
                <TabsTrigger value="paid" className="flex-1 md:flex-none">
                  Facturi Plătite
                </TabsTrigger>
              </TabsList>
              <Button 
                onClick={() => setShowPayableForm(true)}
                className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adaugă Factură de Plată
              </Button>
            </div>

            <TabsContent value="unpaid">
              <PayableInvoicesTable statusFilter="unpaid" />
            </TabsContent>

            <TabsContent value="paid">
              <PayableInvoicesTable statusFilter="paid" />
            </TabsContent>
          </Tabs>
        </Card>

        <PayableInvoiceForm open={showPayableForm} onOpenChange={setShowPayableForm} />
      </div>
    </div>
  );
}

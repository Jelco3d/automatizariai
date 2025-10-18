import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Session } from "@supabase/supabase-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoicesTable } from "@/components/business/invoices/InvoicesTable";
import { InvoiceForm } from "@/components/business/invoices/InvoiceForm";
import { PayableInvoicesTable } from "@/components/business/invoices/PayableInvoicesTable";
import { PayableInvoiceForm } from "@/components/business/invoices/PayableInvoiceForm";
import { InvoiceTemplatesTable } from "@/components/business/invoices/InvoiceTemplatesTable";
import { InvoiceTemplateForm } from "@/components/business/invoices/InvoiceTemplateForm";

export default function Invoices() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [issuedFormOpen, setIssuedFormOpen] = useState(false);
  const [payableFormOpen, setPayableFormOpen] = useState(false);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('issued');
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
          <h1 className="text-2xl md:text-3xl font-bold text-white">Facturi</h1>
          <Button 
            onClick={() => {
              if (activeTab === 'issued') setIssuedFormOpen(true);
              else if (activeTab === 'payable') setPayableFormOpen(true);
              else setTemplateFormOpen(true);
            }} 
            className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="truncate">{activeTab === 'issued' ? 'Factură Nouă' : activeTab === 'payable' ? 'Factură de Plată' : 'Template Nou'}</span>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <TabsList className="bg-[#1A1F2C] border-purple-500/20 mb-4 md:mb-6 inline-flex w-auto min-w-full md:min-w-0">
              <TabsTrigger value="issued" className="data-[state=active]:bg-purple-600 whitespace-nowrap">
                Facturi Emise
              </TabsTrigger>
              <TabsTrigger value="payable" className="data-[state=active]:bg-purple-600 whitespace-nowrap">
                Facturi de Plată
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600 whitespace-nowrap">
                Template-uri
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="issued">
            <InvoicesTable />
          </TabsContent>

          <TabsContent value="payable">
            <PayableInvoicesTable />
          </TabsContent>

          <TabsContent value="templates">
            <InvoiceTemplatesTable />
          </TabsContent>
        </Tabs>

        <InvoiceForm open={issuedFormOpen} onOpenChange={setIssuedFormOpen} />
        <PayableInvoiceForm open={payableFormOpen} onOpenChange={setPayableFormOpen} />
        <InvoiceTemplateForm open={templateFormOpen} onOpenChange={setTemplateFormOpen} />
      </div>
    </div>
  );
}

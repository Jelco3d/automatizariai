import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoicesTable } from "@/components/business/invoices/InvoicesTable";
import { InvoiceForm } from "@/components/business/invoices/InvoiceForm";
import { InvoiceTemplatesTable } from "@/components/business/invoices/InvoiceTemplatesTable";
import { InvoiceTemplateForm } from "@/components/business/invoices/InvoiceTemplateForm";
import { PaidInvoicesTable } from "@/components/business/invoices/PaidInvoicesTable";
import { PageShell } from "@/components/business/shared/PageShell";
import { PageHeader } from "@/components/business/shared/PageHeader";

export default function Invoices() {
  const [issuedFormOpen, setIssuedFormOpen] = useState(false);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('issued');

  return (
    <PageShell>
      <PageHeader
        title="Facturi"
        action={
          activeTab !== 'paid' ? (
            <Button 
              onClick={() => {
                if (activeTab === 'issued') setIssuedFormOpen(true);
                else setTemplateFormOpen(true);
              }} 
              className="btn-3d-gold w-full md:w-auto text-sm md:text-base px-5"
            >
              <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{activeTab === 'issued' ? 'Factură Nouă' : 'Template Nou'}</span>
            </Button>
          ) : undefined
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <TabsList className="glass-card border border-white/[0.06] mb-6 inline-flex w-auto min-w-full md:min-w-0">
            <TabsTrigger value="issued" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white whitespace-nowrap">
              Facturi Emise
            </TabsTrigger>
            <TabsTrigger value="paid" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white whitespace-nowrap">
              Facturi Încasate
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white whitespace-nowrap">
              Template-uri
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="issued"><InvoicesTable /></TabsContent>
        <TabsContent value="paid"><PaidInvoicesTable /></TabsContent>
        <TabsContent value="templates"><InvoiceTemplatesTable /></TabsContent>
      </Tabs>

      <InvoiceForm open={issuedFormOpen} onOpenChange={setIssuedFormOpen} />
      <InvoiceTemplateForm open={templateFormOpen} onOpenChange={setTemplateFormOpen} />
    </PageShell>
  );
}

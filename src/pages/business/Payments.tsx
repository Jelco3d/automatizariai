import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, CheckCircle2 } from "lucide-react";
import { usePayableInvoices } from "@/hooks/usePayableInvoices";
import { PayableInvoicesTable } from "@/components/business/invoices/PayableInvoicesTable";
import { PayableInvoiceForm } from "@/components/business/invoices/PayableInvoiceForm";
import { formatCurrency } from "@/utils/numberFormatters";
import { PageShell } from "@/components/business/shared/PageShell";
import { PageHeader } from "@/components/business/shared/PageHeader";
import { StatCard } from "@/components/business/shared/StatCard";

export default function Payments() {
  const [showPayableForm, setShowPayableForm] = useState(false);
  const { payableInvoices, isLoading } = usePayableInvoices();

  const unpaidInvoices = payableInvoices.filter(inv => inv.status === 'unpaid');
  const paidInvoices = payableInvoices.filter(inv => inv.status === 'paid');

  return (
    <PageShell loading={isLoading}>
      <PageHeader title="Plăți" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StatCard label="Facturi de Plată" value={unpaidInvoices.length} subtitle={formatCurrency(unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0))} icon={FileText} variant="red" />
        <StatCard label="Facturi Plătite" value={paidInvoices.length} subtitle={formatCurrency(paidInvoices.reduce((sum, inv) => sum + inv.total, 0))} icon={CheckCircle2} variant="green" />
      </div>

      <div className="glass-card rounded-xl border border-white/[0.06] p-4 md:p-5">
        <Tabs defaultValue="unpaid" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
            <TabsList className="glass-card border border-white/[0.06] w-full md:w-auto">
              <TabsTrigger value="unpaid" className="flex-1 md:flex-none text-xs md:text-sm data-[state=active]:bg-red-600/80 data-[state=active]:text-white">Facturi de Plată</TabsTrigger>
              <TabsTrigger value="paid" className="flex-1 md:flex-none text-xs md:text-sm data-[state=active]:bg-emerald-600/80 data-[state=active]:text-white">Facturi Plătite</TabsTrigger>
            </TabsList>
            <Button onClick={() => setShowPayableForm(true)} className="btn-3d-gold w-full md:w-auto text-xs md:text-sm h-9 px-4">
              <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              Adaugă Factură de Plată
            </Button>
          </div>
          <TabsContent value="unpaid"><PayableInvoicesTable statusFilter="unpaid" /></TabsContent>
          <TabsContent value="paid"><PayableInvoicesTable statusFilter="paid" /></TabsContent>
        </Tabs>
      </div>

      <PayableInvoiceForm open={showPayableForm} onOpenChange={setShowPayableForm} />
    </PageShell>
  );
}

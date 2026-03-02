import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, CheckCircle2, XCircle } from "lucide-react";
import { useQuotes } from "@/hooks/useQuotes";
import { QuotesTable } from "@/components/business/quotes/QuotesTable";
import { QuoteForm } from "@/components/business/quotes/QuoteForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QuoteFormData } from "@/schemas/quoteSchema";
import { formatCurrency } from "@/utils/numberFormatters";
import { PageShell } from "@/components/business/shared/PageShell";
import { PageHeader } from "@/components/business/shared/PageHeader";
import { StatCard } from "@/components/business/shared/StatCard";

export default function Quotes() {
  const [newQuoteDialogOpen, setNewQuoteDialogOpen] = useState(false);
  const { quotes, isLoading, createQuote, updateQuote, deleteQuote, updateStatus } = useQuotes();

  const activeQuotes = quotes.filter(q => q.status === 'draft' || q.status === 'sent');
  const acceptedQuotes = quotes.filter(q => q.status === 'accepted');
  const expiredRejectedQuotes = quotes.filter(q => q.status === 'expired' || q.status === 'rejected');

  const totalActiveValue = activeQuotes.reduce((sum, q) => sum + q.total, 0);
  const totalAcceptedValue = acceptedQuotes.reduce((sum, q) => sum + q.total, 0);

  const handleCreateQuote = (data: QuoteFormData) => {
    createQuote.mutate(data);
    setNewQuoteDialogOpen(false);
  };

  const handleUpdateQuote = (id: string, data: QuoteFormData) => {
    updateQuote.mutate({ id, data });
  };

  const handleDeleteQuote = (id: string) => {
    deleteQuote.mutate(id);
  };

  const handleStatusChange = (id: string, status: any) => {
    updateStatus.mutate({ id, status });
  };

  return (
    <PageShell loading={isLoading}>
      <PageHeader
        title="Oferte"
        action={
          <Button onClick={() => setNewQuoteDialogOpen(true)} className="btn-3d-gold w-full md:w-auto text-sm md:text-base px-5">
            <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Ofertă Nouă</span>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Oferte Active" value={activeQuotes.length} subtitle={formatCurrency(totalActiveValue)} icon={FileText} variant="blue" />
        <StatCard label="Oferte Acceptate" value={acceptedQuotes.length} subtitle={formatCurrency(totalAcceptedValue)} icon={CheckCircle2} variant="green" />
        <StatCard label="Expirate/Respinse" value={expiredRejectedQuotes.length} icon={XCircle} variant="red" />
      </div>

      <div className="glass-card rounded-xl border border-white/[0.06] p-4 md:p-5">
        <h2 className="text-base font-semibold text-white mb-4">Toate Ofertele</h2>
        <QuotesTable quotes={quotes} onDelete={handleDeleteQuote} onUpdate={handleUpdateQuote} onStatusChange={handleStatusChange} />
      </div>

      <Dialog open={newQuoteDialogOpen} onOpenChange={setNewQuoteDialogOpen}>
        <DialogContent className="glass-card bg-[#0f1220] border-white/[0.08] text-white w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-2xl">Ofertă Nouă</DialogTitle>
          </DialogHeader>
          <QuoteForm onSubmit={handleCreateQuote} isSubmitting={createQuote.isPending} />
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText, CheckCircle2, XCircle } from "lucide-react";
import { useQuotes } from "@/hooks/useQuotes";
import { QuotesTable } from "@/components/business/quotes/QuotesTable";
import { QuoteForm } from "@/components/business/quotes/QuoteForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QuoteFormData } from "@/schemas/quoteSchema";
import { formatCurrency } from "@/utils/numberFormatters";
import { useEffect } from "react";
import { Session } from "@supabase/supabase-js";

export default function Quotes() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [newQuoteDialogOpen, setNewQuoteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { quotes, isLoading, createQuote, updateQuote, deleteQuote, updateStatus } = useQuotes();

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
    <div className="min-h-screen bg-[#0F1117] text-white flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Oferte</h1>
          <Button 
            onClick={() => setNewQuoteDialogOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ofertă Nouă
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#1A1F2C] border-blue-500/20 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Oferte Active</p>
                <p className="text-2xl md:text-3xl font-bold text-white mt-2">{activeQuotes.length}</p>
                <p className="text-blue-400 text-xs md:text-sm mt-1">{formatCurrency(totalActiveValue)}</p>
              </div>
              <FileText className="h-8 w-8 md:h-10 md:w-10 text-blue-400" />
            </div>
          </Card>

          <Card className="bg-[#1A1F2C] border-green-500/20 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Oferte Acceptate</p>
                <p className="text-2xl md:text-3xl font-bold text-white mt-2">{acceptedQuotes.length}</p>
                <p className="text-green-400 text-xs md:text-sm mt-1">{formatCurrency(totalAcceptedValue)}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 md:h-10 md:w-10 text-green-400" />
            </div>
          </Card>

          <Card className="bg-[#1A1F2C] border-red-500/20 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Expirate/Respinse</p>
                <p className="text-2xl md:text-3xl font-bold text-white mt-2">{expiredRejectedQuotes.length}</p>
              </div>
              <XCircle className="h-8 w-8 md:h-10 md:w-10 text-red-400" />
            </div>
          </Card>
        </div>

        <Card className="bg-[#1A1F2C] border-purple-500/20 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Toate Ofertele</h2>
          <QuotesTable
            quotes={quotes}
            onDelete={handleDeleteQuote}
            onUpdate={handleUpdateQuote}
            onStatusChange={handleStatusChange}
          />
        </Card>

        <Dialog open={newQuoteDialogOpen} onOpenChange={setNewQuoteDialogOpen}>
          <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl">Ofertă Nouă</DialogTitle>
            </DialogHeader>
            <QuoteForm onSubmit={handleCreateQuote} isSubmitting={createQuote.isPending} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

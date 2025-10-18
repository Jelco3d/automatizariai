import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Quote } from '@/hooks/useQuotes';
import { QuoteForm } from './QuoteForm';
import { QuoteFormData } from '@/schemas/quoteSchema';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EditQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: Quote;
  onUpdate: (id: string, data: QuoteFormData) => void;
}

export function EditQuoteDialog({ open, onOpenChange, quote, onUpdate }: EditQuoteDialogProps) {
  const [initialData, setInitialData] = useState<QuoteFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open && quote) {
      loadQuoteData();
    }
  }, [open, quote]);

  const loadQuoteData = async () => {
    setIsLoading(true);
    try {
      const { data: items, error } = await supabase
        .from('quote_items')
        .select('*')
        .eq('quote_id', quote.id);

      if (error) throw error;

      setInitialData({
        client_id: quote.client_id,
        issue_date: new Date(quote.issue_date),
        valid_until: new Date(quote.valid_until),
        discount: quote.discount,
        terms: quote.terms,
        notes: quote.notes,
        items: items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
        })),
      });
    } catch (error) {
      console.error('Error loading quote data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (data: QuoteFormData) => {
    onUpdate(quote.id, data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Editează Oferta {quote.quote_number}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-400">Se încarcă...</p>
          </div>
        ) : initialData ? (
          <QuoteForm onSubmit={handleSubmit} initialData={initialData} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { QuoteFormData } from '@/schemas/quoteSchema';
import { generateQuoteNumber } from '@/utils/documentNumbers';

export interface Quote {
  id: string;
  client_id: string;
  quote_number: string;
  issue_date: string;
  valid_until: string;
  subtotal: number;
  discount: number;
  vat_amount: number;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  terms?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  clients?: {
    name: string;
    email: string;
    cui?: string;
  };
}

export interface QuoteItem {
  id: string;
  quote_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export function useQuotes() {
  const queryClient = useQueryClient();

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['quotes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select('*, clients(name, email, cui)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Quote[];
    },
  });

  const createQuote = useMutation({
    mutationFn: async (quoteData: QuoteFormData) => {
      // Get count for quote number generation
      const { count } = await supabase
        .from('quotes')
        .select('*', { count: 'exact', head: true });

      const quoteNumber = generateQuoteNumber(count || 0);

      // Calculate totals
      const subtotal = quoteData.items.reduce(
        (sum, item) => sum + item.quantity * item.unit_price,
        0
      );
      const discountAmount = (subtotal * (quoteData.discount || 0)) / 100;
      const subtotalAfterDiscount = subtotal - discountAmount;
      const vatAmount = subtotalAfterDiscount * 0.19;
      const total = subtotalAfterDiscount + vatAmount;

      // Insert quote
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          client_id: quoteData.client_id,
          quote_number: quoteNumber,
          issue_date: quoteData.issue_date.toISOString().split('T')[0],
          valid_until: quoteData.valid_until.toISOString().split('T')[0],
          subtotal,
          discount: quoteData.discount || 0,
          vat_amount: vatAmount,
          total,
          terms: quoteData.terms,
          notes: quoteData.notes,
        })
        .select()
        .single();

      if (quoteError) throw quoteError;

      // Insert items
      const items = quoteData.items.map(item => ({
        quote_id: quote.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total: item.quantity * item.unit_price,
      }));

      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(items);

      if (itemsError) throw itemsError;

      return quote;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast({
        title: 'Succes',
        description: 'Oferta a fost creată cu succes',
      });
    },
    onError: (error) => {
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la crearea ofertei',
        variant: 'destructive',
      });
      console.error('Error creating quote:', error);
    },
  });

  const updateQuote = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: QuoteFormData }) => {
      const subtotal = data.items.reduce(
        (sum, item) => sum + item.quantity * item.unit_price,
        0
      );
      const discountAmount = (subtotal * (data.discount || 0)) / 100;
      const subtotalAfterDiscount = subtotal - discountAmount;
      const vatAmount = subtotalAfterDiscount * 0.19;
      const total = subtotalAfterDiscount + vatAmount;

      const { error: quoteError } = await supabase
        .from('quotes')
        .update({
          client_id: data.client_id,
          issue_date: data.issue_date.toISOString().split('T')[0],
          valid_until: data.valid_until.toISOString().split('T')[0],
          subtotal,
          discount: data.discount || 0,
          vat_amount: vatAmount,
          total,
          terms: data.terms,
          notes: data.notes,
        })
        .eq('id', id);

      if (quoteError) throw quoteError;

      // Delete existing items
      await supabase.from('quote_items').delete().eq('quote_id', id);

      // Insert new items
      const items = data.items.map(item => ({
        quote_id: id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total: item.quantity * item.unit_price,
      }));

      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(items);

      if (itemsError) throw itemsError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast({
        title: 'Succes',
        description: 'Oferta a fost actualizată cu succes',
      });
    },
    onError: (error) => {
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la actualizarea ofertei',
        variant: 'destructive',
      });
      console.error('Error updating quote:', error);
    },
  });

  const deleteQuote = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('quotes').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast({
        title: 'Succes',
        description: 'Oferta a fost ștearsă cu succes',
      });
    },
    onError: (error) => {
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la ștergerea ofertei',
        variant: 'destructive',
      });
      console.error('Error deleting quote:', error);
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Quote['status'] }) => {
      const { error } = await supabase
        .from('quotes')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      toast({
        title: 'Succes',
        description: 'Statusul ofertei a fost actualizat',
      });
    },
    onError: (error) => {
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la actualizarea statusului',
        variant: 'destructive',
      });
      console.error('Error updating status:', error);
    },
  });

  return {
    quotes,
    isLoading,
    createQuote,
    updateQuote,
    deleteQuote,
    updateStatus,
  };
}

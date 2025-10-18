import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type PayableInvoice = Tables<'payable_invoices'>;
type PayableInvoiceInsert = TablesInsert<'payable_invoices'>;
type PayableInvoiceUpdate = TablesUpdate<'payable_invoices'>;

export function usePayableInvoices() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: payableInvoices = [], isLoading } = useQuery({
    queryKey: ['payable-invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payable_invoices')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PayableInvoice[];
    },
  });

  const createPayableInvoice = useMutation({
    mutationFn: async (invoice: PayableInvoiceInsert) => {
      const { data, error } = await supabase
        .from('payable_invoices')
        .insert(invoice)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payable-invoices'] });
      toast({ title: 'Factură adăugată cu succes' });
    },
    onError: (error: Error) => {
      toast({ title: 'Eroare', description: error.message, variant: 'destructive' });
    },
  });

  const updatePayableInvoice = useMutation({
    mutationFn: async ({ id, ...updates }: PayableInvoiceUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('payable_invoices')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payable-invoices'] });
      toast({ title: 'Factură actualizată cu succes' });
    },
    onError: (error: Error) => {
      toast({ title: 'Eroare', description: error.message, variant: 'destructive' });
    },
  });

  const deletePayableInvoice = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('payable_invoices')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payable-invoices'] });
      toast({ title: 'Factură ștearsă cu succes' });
    },
    onError: (error: Error) => {
      toast({ title: 'Eroare', description: error.message, variant: 'destructive' });
    },
  });

  return {
    payableInvoices,
    isLoading,
    createPayableInvoice,
    updatePayableInvoice,
    deletePayableInvoice,
  };
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { generateInvoiceNumber } from '@/utils/documentNumbers';
import { calculateInvoiceTotal } from '@/utils/calculations';

type Invoice = Tables<'invoices'>;
type InvoiceItem = Tables<'invoice_items'>;

interface InvoiceWithItems extends Invoice {
  client?: Tables<'clients'>;
  items?: InvoiceItem[];
}

export function useInvoices() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          client:clients(*),
          items:invoice_items(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as InvoiceWithItems[];
    },
  });

  const createInvoice = useMutation({
    mutationFn: async (data: {
      invoice: Omit<TablesInsert<'invoices'>, 'invoice_number'>;
      items: Array<Omit<TablesInsert<'invoice_items'>, 'invoice_id'>>;
    }) => {
      // Get count for invoice number generation
      const { count } = await supabase
        .from('invoices')
        .select('*', { count: 'exact', head: true });
      
      const invoice_number = generateInvoiceNumber(count || 0);
      
      // Calculate totals
      const { subtotal, vatAmount, total } = calculateInvoiceTotal(
        data.items.map(item => ({
          quantity: item.quantity,
          unit_price: item.unit_price,
          vat_rate: item.vat_rate,
        }))
      );

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          ...data.invoice,
          invoice_number,
          subtotal,
          vat_amount: vatAmount,
          total,
        })
        .select()
        .single();
      
      if (invoiceError) throw invoiceError;

      // Create invoice items
      const itemsWithInvoiceId = data.items.map(item => ({
        ...item,
        invoice_id: invoice.id,
        total: item.quantity * item.unit_price,
      }));

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsWithInvoiceId);
      
      if (itemsError) throw itemsError;

      return invoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: 'Factură creată cu succes' });
    },
    onError: (error: Error) => {
      toast({ title: 'Eroare', description: error.message, variant: 'destructive' });
    },
  });

  const updateInvoiceStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' }) => {
      const { data, error } = await supabase
        .from('invoices')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: 'Status actualizat cu succes' });
    },
    onError: (error: Error) => {
      toast({ title: 'Eroare', description: error.message, variant: 'destructive' });
    },
  });

  const deleteInvoice = useMutation({
    mutationFn: async (id: string) => {
      // Delete items first
      const { error: itemsError } = await supabase
        .from('invoice_items')
        .delete()
        .eq('invoice_id', id);
      
      if (itemsError) throw itemsError;

      // Delete invoice
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({ title: 'Factură ștearsă cu succes' });
    },
    onError: (error: Error) => {
      toast({ title: 'Eroare', description: error.message, variant: 'destructive' });
    },
  });

  const updateInvoice = useMutation({
    mutationFn: async (data: {
      id: string;
      data: {
        client_id: string;
        issue_date: Date;
        due_date: Date;
        payment_terms?: string;
        notes?: string;
        items: Array<{
          description: string;
          quantity: number;
          unit_price: number;
          vat_rate: number;
        }>;
      };
    }) => {
      // Calculate totals
      const items = data.data.items;
      const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
      const vatAmount = items.reduce((sum, item) => {
        const itemTotal = item.quantity * item.unit_price;
        return sum + (itemTotal * item.vat_rate / 100);
      }, 0);
      const total = subtotal + vatAmount;

      // Update invoice
      const { error: invoiceError } = await supabase
        .from('invoices')
        .update({
          client_id: data.data.client_id,
          issue_date: data.data.issue_date.toISOString().split('T')[0],
          due_date: data.data.due_date.toISOString().split('T')[0],
          payment_terms: data.data.payment_terms,
          notes: data.data.notes,
          subtotal,
          vat_amount: vatAmount,
          total,
        })
        .eq('id', data.id);

      if (invoiceError) throw invoiceError;

      // Delete existing items
      const { error: deleteError } = await supabase
        .from('invoice_items')
        .delete()
        .eq('invoice_id', data.id);

      if (deleteError) throw deleteError;

      // Insert new items
      const itemsWithInvoiceId = items.map(item => ({
        invoice_id: data.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        vat_rate: item.vat_rate,
        total: item.quantity * item.unit_price,
      }));

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsWithInvoiceId);

      if (itemsError) throw itemsError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: 'Factură actualizată cu succes',
      });
    },
    onError: (error) => {
      toast({
        title: 'Eroare la actualizarea facturii',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    invoices,
    isLoading,
    createInvoice,
    updateInvoice,
    updateInvoiceStatus,
    deleteInvoice,
  };
}

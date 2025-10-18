import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceSchema, type InvoiceFormData } from '@/schemas/invoiceSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useInvoices } from '@/hooks/useInvoices';
import { ClientSelector } from '@/components/business/shared/ClientSelector';
import { InvoiceItemsManager } from './InvoiceItemsManager';
import { addDays } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface InvoiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceForm({ open, onOpenChange }: InvoiceFormProps) {
  const { createInvoice } = useInvoices();

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      client_id: '',
      issue_date: new Date(),
      due_date: addDays(new Date(), 30),
      payment_terms: '',
      notes: '',
      items: [{ description: '', quantity: 1, unit_price: 0, vat_rate: 19 }],
    },
  });

  const onSubmit = async (data: InvoiceFormData) => {
    const itemsWithTotal = data.items.map(item => ({
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      vat_rate: item.vat_rate,
      total: item.quantity * item.unit_price,
    }));

    await createInvoice.mutateAsync({
      invoice: {
        client_id: data.client_id,
        issue_date: data.issue_date.toISOString().split('T')[0],
        due_date: data.due_date.toISOString().split('T')[0],
        payment_terms: data.payment_terms || null,
        notes: data.notes || null,
        status: 'draft' as const,
        subtotal: 0, // Will be calculated in the mutation
        vat_amount: 0,
        total: 0,
      },
      items: itemsWithTotal,
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Factură nouă</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="client_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client *</FormLabel>
                      <ClientSelector value={field.value} onChange={field.onChange} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issue_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data emiterii *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? field.value.toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                          className="bg-[#0F1117] border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data scadentă *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? field.value.toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                          className="bg-[#0F1117] border-gray-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payment_terms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Termeni de plată</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-[#0F1117] border-gray-700 text-white" placeholder="Ex: 30 zile" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <InvoiceItemsManager form={form} />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notițe</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-[#0F1117] border-gray-700 text-white" rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4 sticky bottom-0 bg-[#1A1F2C] pb-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="bg-[#0F1117] text-white border-gray-700 hover:bg-gray-800"
                >
                  Anulează
                </Button>
                <Button
                  type="submit"
                  disabled={createInvoice.isPending}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {createInvoice.isPending ? 'Se creează...' : 'Creează factură'}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { invoiceSchema, type InvoiceFormData } from '@/schemas/invoiceSchema';
import { useInvoices } from '@/hooks/useInvoices';
import { InvoiceItemsManager } from './InvoiceItemsManager';
import { ClientSelector } from '../shared/ClientSelector';

interface EditInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: {
    id: string;
    client_id: string;
    issue_date: string;
    due_date: string;
    payment_terms?: string | null;
    notes?: string | null;
    items: Array<{
      id: string;
      description: string;
      quantity: number;
      unit_price: number;
      vat_rate: number;
    }>;
  };
}

export function EditInvoiceDialog({ open, onOpenChange, invoice }: EditInvoiceDialogProps) {
  const { updateInvoice } = useInvoices();

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      client_id: invoice.client_id,
      issue_date: new Date(invoice.issue_date),
      due_date: new Date(invoice.due_date),
      payment_terms: invoice.payment_terms || '',
      notes: invoice.notes || '',
      items: invoice.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        vat_rate: item.vat_rate,
      })),
    },
  });

  const onSubmit = (data: InvoiceFormData) => {
    updateInvoice.mutate(
      { 
        id: invoice.id, 
        data: {
          client_id: data.client_id,
          issue_date: data.issue_date,
          due_date: data.due_date,
          payment_terms: data.payment_terms || '',
          notes: data.notes || '',
          items: data.items.map(item => ({
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unit_price,
            vat_rate: item.vat_rate,
          })),
        }
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editează factura</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client *</FormLabel>
                  <FormControl>
                    <ClientSelector
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="issue_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data emiterii *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
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
                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                        className="bg-[#0F1117] border-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="payment_terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Termeni de plată</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-[#0F1117] border-gray-700 text-white" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <InvoiceItemsManager form={form} />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Anulează
              </Button>
              <Button
                type="submit"
                disabled={updateInvoice.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {updateInvoice.isPending ? 'Se salvează...' : 'Salvează modificările'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
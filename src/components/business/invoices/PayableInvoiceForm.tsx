import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { usePayableInvoices } from '@/hooks/usePayableInvoices';
import { payableInvoiceSchema, type PayableInvoiceFormData } from '@/schemas/payableInvoiceSchema';

interface PayableInvoiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PayableInvoiceForm({ open, onOpenChange }: PayableInvoiceFormProps) {
  const { createPayableInvoice } = usePayableInvoices();

  const form = useForm<PayableInvoiceFormData>({
    resolver: zodResolver(payableInvoiceSchema),
    defaultValues: {
      supplier_name: '',
      supplier_cui: '',
      invoice_number: '',
      issue_date: new Date().toISOString().split('T')[0],
      due_date: new Date().toISOString().split('T')[0],
      total: 0,
      status: 'unpaid',
      payment_date: '',
      notes: '',
    },
  });

  const onSubmit = async (data: PayableInvoiceFormData) => {
    await createPayableInvoice.mutateAsync({
      supplier_name: data.supplier_name,
      supplier_cui: data.supplier_cui || null,
      invoice_number: data.invoice_number,
      issue_date: data.issue_date,
      due_date: data.due_date,
      total: data.total,
      status: data.status,
      payment_date: data.payment_date || null,
      notes: data.notes || null,
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adaugă factură de plată</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="supplier_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Furnizor *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nume furnizor"
                      className="bg-[#0F1117] border-gray-700 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supplier_cui"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CUI Furnizor</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="CUI"
                      className="bg-[#0F1117] border-gray-700 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoice_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Număr factură *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="F-2024-001"
                      className="bg-[#0F1117] border-gray-700 text-white"
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
                        {...field}
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
                        {...field}
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
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total (RON) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      className="bg-[#0F1117] border-gray-700 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status *</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="bg-[#0F1117] border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1A1F2C] border-gray-700 text-white">
                      <SelectItem value="unpaid">Neplătită</SelectItem>
                      <SelectItem value="paid">Plătită</SelectItem>
                      <SelectItem value="overdue">Restantă</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data plății</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="bg-[#0F1117] border-gray-700 text-white"
                    />
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
                    <Textarea
                      {...field}
                      placeholder="Notițe adiționale..."
                      className="bg-[#0F1117] border-gray-700 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
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
                disabled={createPayableInvoice.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {createPayableInvoice.isPending ? 'Se adaugă...' : 'Adaugă factură'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

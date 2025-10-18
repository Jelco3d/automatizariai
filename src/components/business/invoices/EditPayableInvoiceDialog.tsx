import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { payableInvoiceSchema, type PayableInvoiceFormData } from '@/schemas/payableInvoiceSchema';
import { usePayableInvoices } from '@/hooks/usePayableInvoices';

interface EditPayableInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: {
    id: string;
    supplier_name: string;
    supplier_cui?: string | null;
    invoice_number: string;
    issue_date: string;
    due_date: string;
    total: number;
    status: string;
    payment_date?: string | null;
    notes?: string | null;
    pdf_file_path?: string | null;
  };
}

export function EditPayableInvoiceDialog({ open, onOpenChange, invoice }: EditPayableInvoiceDialogProps) {
  const { updatePayableInvoice } = usePayableInvoices();
  
  const form = useForm<PayableInvoiceFormData>({
    resolver: zodResolver(payableInvoiceSchema),
    defaultValues: {
      supplier_name: invoice.supplier_name,
      supplier_cui: invoice.supplier_cui || '',
      invoice_number: invoice.invoice_number,
      issue_date: invoice.issue_date,
      due_date: invoice.due_date,
      total: invoice.total,
      status: invoice.status as 'unpaid' | 'paid' | 'overdue',
      payment_date: invoice.payment_date || '',
      notes: invoice.notes || '',
      pdf_file_path: invoice.pdf_file_path || '',
    },
  });

  const onSubmit = (data: PayableInvoiceFormData) => {
    updatePayableInvoice.mutate(
      { id: invoice.id, ...data },
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
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editează factura de plată</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supplier_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume furnizor *</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#0F1117] border-gray-700 text-white" />
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
                    <FormLabel>CUI furnizor</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#0F1117] border-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="invoice_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Număr factură *</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#0F1117] border-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="issue_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data emiterii *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="bg-[#0F1117] border-gray-700 text-white" />
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
                      <Input type="date" {...field} className="bg-[#0F1117] border-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#0F1117] border-gray-700 text-white">
                          <SelectValue placeholder="Selectează status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1A1F2C] border-gray-700">
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
                      <Input type="date" {...field} className="bg-[#0F1117] border-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                disabled={updatePayableInvoice.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {updatePayableInvoice.isPending ? 'Se salvează...' : 'Salvează modificările'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

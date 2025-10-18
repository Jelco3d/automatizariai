import { useState } from 'react';
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
import { Plus, FileText } from 'lucide-react';
import { ClientForm } from '@/components/business/clients/ClientForm';
import { useInvoiceTemplates } from '@/hooks/useInvoiceTemplates';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InvoiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceForm({ open, onOpenChange }: InvoiceFormProps) {
  const { createInvoice } = useInvoices();
  const { data: templates } = useInvoiceTemplates();
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [newClientId, setNewClientId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

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

  const handleClientCreated = (clientId: string) => {
    setNewClientId(clientId);
    form.setValue('client_id', clientId);
    setClientFormOpen(false);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates?.find(t => t.id === templateId);
    if (!template) return;

    // Save the selected template ID
    setSelectedTemplateId(templateId);

    // Pre-fill payment terms and notes
    form.setValue('payment_terms', template.payment_terms || '');
    form.setValue('notes', template.notes || '');
    
    // Pre-fill invoice items
    if (template.items && template.items.length > 0) {
      form.setValue('items', template.items.map((item: any) => ({
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        vat_rate: item.vat_rate,
      })));
    }
  };

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
        template_id: selectedTemplateId,
        status: 'draft' as const,
        subtotal: 0, // Will be calculated in the mutation
        vat_amount: 0,
        total: 0,
      },
      items: itemsWithTotal,
    });
    onOpenChange(false);
    form.reset();
    setSelectedTemplateId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white w-[95vw] max-w-4xl max-h-[90vh] md:w-full p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-2xl">Factură nouă</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-1 md:pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-6">
              {templates && templates.length > 0 && (
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 md:border-2 p-2.5 md:p-5 rounded-lg shadow-lg">
                  <div className="flex items-start gap-2 mb-2 md:mb-3">
                    <FileText className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs md:text-base font-semibold text-purple-300 block">Template</span>
                      <p className="text-xs text-gray-400 mt-0.5 hidden md:block">
                        Pre-completează factura cu date și articole salvate
                      </p>
                    </div>
                  </div>
                  <Select onValueChange={handleTemplateSelect} value={selectedTemplateId || undefined}>
                    <SelectTrigger className="bg-[#0F1117] border-purple-500/30 text-white hover:border-purple-500/50 transition-colors text-sm md:text-base h-9 md:h-10">
                      <SelectValue placeholder="Selectează template..." />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id} className="text-sm md:text-base">
                          <div className="flex flex-col">
                            <span className="font-medium">{template.name}</span>
                            {template.description && (
                              <span className="text-xs text-gray-400 line-clamp-1">{template.description}</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
                <FormField
                  control={form.control}
                  name="client_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs md:text-sm">Client *</FormLabel>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <ClientSelector value={field.value} onChange={field.onChange} />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setClientFormOpen(true)}
                          className="bg-purple-600 hover:bg-purple-700 text-white border-0 shrink-0 h-9 w-9 md:h-10 md:w-10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issue_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs md:text-sm">Data emiterii *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? field.value.toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                          className="bg-[#0F1117] border-gray-700 text-white text-sm h-9 md:h-10"
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
                      <FormLabel className="text-xs md:text-sm">Data scadentă *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? field.value.toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                          className="bg-[#0F1117] border-gray-700 text-white text-sm h-9 md:h-10"
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
                      <FormLabel className="text-xs md:text-sm">Termeni de plată</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-[#0F1117] border-gray-700 text-white text-sm h-9 md:h-10" placeholder="Ex: 30 zile" />
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
                      <FormLabel className="text-xs md:text-sm">Notițe</FormLabel>
                      <FormControl>
                      <Textarea {...field} className="bg-[#0F1117] border-gray-700 text-white text-sm" rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-3 md:pt-4 sticky bottom-0 bg-[#1A1F2C] pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="bg-[#0F1117] text-white border-gray-700 hover:bg-gray-800 w-full sm:w-auto text-sm h-9 md:h-10"
                >
                  Anulează
                </Button>
                <Button
                  type="submit"
                  disabled={createInvoice.isPending}
                  className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-sm h-9 md:h-10"
                >
                  {createInvoice.isPending ? 'Se creează...' : 'Creează factură'}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>

      <ClientForm 
        open={clientFormOpen} 
        onOpenChange={setClientFormOpen}
        client={null}
        onClientCreated={handleClientCreated}
      />
    </Dialog>
  );
}

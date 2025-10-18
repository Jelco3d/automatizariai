import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  invoiceTemplateSchema,
  type InvoiceTemplateFormData,
} from "@/schemas/invoiceTemplateSchema";
import { InvoiceTemplateItemsManager } from "./InvoiceTemplateItemsManager";
import { useCreateInvoiceTemplate, useUpdateInvoiceTemplate } from "@/hooks/useInvoiceTemplates";

interface InvoiceTemplateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: any;
}

export function InvoiceTemplateForm({ open, onOpenChange, template }: InvoiceTemplateFormProps) {
  const createTemplate = useCreateInvoiceTemplate();
  const updateTemplate = useUpdateInvoiceTemplate();

  const form = useForm<InvoiceTemplateFormData>({
    resolver: zodResolver(invoiceTemplateSchema),
    defaultValues: template
      ? {
          name: template.name,
          description: template.description || '',
          payment_terms: template.payment_terms || '',
          notes: template.notes || '',
          items: template.items || [{ description: '', quantity: 1, unit_price: 0, vat_rate: 19 }],
        }
      : {
          name: '',
          description: '',
          payment_terms: '',
          notes: '',
          items: [{ description: '', quantity: 1, unit_price: 0, vat_rate: 19 }],
        },
  });

  const onSubmit = async (data: InvoiceTemplateFormData) => {
    try {
      if (template) {
        await updateTemplate.mutateAsync({ id: template.id, data });
      } else {
        await createTemplate.mutateAsync(data);
      }
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            {template ? 'Editează Template' : 'Template Nou'}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-80px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6 pb-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume Template *</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Consultanță Standard" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descriere</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descriere template..."
                        className="min-h-[80px]"
                        {...field}
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
                    <FormLabel>Termeni de Plată</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ex: Plata se va efectua în termen de 30 de zile..."
                        className="min-h-[80px]"
                        {...field}
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
                        placeholder="Notițe suplimentare..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <InvoiceTemplateItemsManager form={form} />

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onOpenChange(false);
                    form.reset();
                  }}
                >
                  Anulează
                </Button>
                <Button
                  type="submit"
                  disabled={createTemplate.isPending || updateTemplate.isPending}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {template ? 'Actualizează Template' : 'Creează Template'}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  invoiceTemplateSchema,
  type InvoiceTemplateFormData,
} from "@/schemas/invoiceTemplateSchema";
import { InvoiceTemplateItemsManager } from "./InvoiceTemplateItemsManager";
import { useCreateInvoiceTemplate, useUpdateInvoiceTemplate } from "@/hooks/useInvoiceTemplates";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

interface InvoiceTemplateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: any;
}

export function InvoiceTemplateForm({ open, onOpenChange, template }: InvoiceTemplateFormProps) {
  const createTemplate = useCreateInvoiceTemplate();
  const updateTemplate = useUpdateInvoiceTemplate();
  const { toast } = useToast();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(template?.logo_url || null);

  const form = useForm<InvoiceTemplateFormData>({
    resolver: zodResolver(invoiceTemplateSchema),
    defaultValues: template
      ? {
          name: template.name,
          description: template.description || '',
          payment_terms: template.payment_terms || '',
          notes: template.notes || '',
          company_name: template.company_name || 'UNISON LOGE FX SRL',
          company_cui: template.company_cui || '44751786',
          company_registration: template.company_registration || 'J35/3295/2021',
          company_address: template.company_address || 'Str. 2N 866 Ap. BIR. 1 Cod 307455',
          logo_url: template.logo_url || '',
          items: template.items || [{ description: '', quantity: 1, unit_price: 0, vat_rate: 19 }],
        }
      : {
          name: '',
          description: '',
          payment_terms: '',
          notes: '',
          company_name: 'UNISON LOGE FX SRL',
          company_cui: '44751786',
          company_registration: 'J35/3295/2021',
          company_address: 'Str. 2N 866 Ap. BIR. 1 Cod 307455',
          logo_url: '',
          items: [{ description: '', quantity: 1, unit_price: 0, vat_rate: 19 }],
        },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tip fișier invalid",
        description: "Vă rugăm selectați o imagine (PNG, JPG, JPEG)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Fișier prea mare",
        description: "Logo-ul trebuie să fie mai mic de 2MB",
        variant: "destructive",
      });
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    form.setValue('logo_url', '');
  };

  const onSubmit = async (data: InvoiceTemplateFormData) => {
    try {
      let logoUrl = data.logo_url;

      // Upload logo if a new file was selected
      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('invoice-logos')
          .upload(filePath, logoFile);

        if (uploadError) {
          toast({
            title: "Eroare la upload logo",
            description: uploadError.message,
            variant: "destructive",
          });
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('invoice-logos')
          .getPublicUrl(filePath);

        logoUrl = publicUrl;

        // Delete old logo if updating
        if (template?.logo_url) {
          const oldPath = template.logo_url.split('/').pop();
          if (oldPath) {
            await supabase.storage
              .from('invoice-logos')
              .remove([oldPath]);
          }
        }
      }

      const templateData = { ...data, logo_url: logoUrl };

      if (template) {
        await updateTemplate.mutateAsync({ id: template.id, data: templateData });
      } else {
        await createTemplate.mutateAsync(templateData);
      }
      onOpenChange(false);
      form.reset();
      setLogoFile(null);
      setLogoPreview(null);
    } catch (error) {
      console.error("Error saving template:", error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la salvarea template-ului",
        variant: "destructive",
      });
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

              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Date Companie</h3>
                
                <div>
                  <FormLabel>Logo Companie</FormLabel>
                  <div className="mt-2 space-y-4">
                    {logoPreview ? (
                      <div className="relative inline-block">
                        <img 
                          src={logoPreview} 
                          alt="Logo preview" 
                          className="h-24 w-auto border rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={handleRemoveLogo}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('logo-upload')?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Încarcă Logo
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          PNG, JPG, JPEG (max 2MB)
                        </span>
                      </div>
                    )}
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nume Companie *</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: UNISON LOGE FX SRL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company_cui"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CUI *</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: 44751786" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company_registration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nr. Înmatriculare *</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: J35/3295/2021" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresă *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="ex: Str. 2N 866 Ap. BIR. 1 Cod 307455"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />

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

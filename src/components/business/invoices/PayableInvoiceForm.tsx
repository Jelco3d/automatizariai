import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePayableInvoices } from "@/hooks/usePayableInvoices";
import { payableInvoiceSchema, type PayableInvoiceFormData } from "@/schemas/payableInvoiceSchema";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText, Loader2 } from "lucide-react";

interface PayableInvoiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PayableInvoiceForm({ open, onOpenChange }: PayableInvoiceFormProps) {
  const { createPayableInvoice } = usePayableInvoices();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState<string | null>(null);

  const form = useForm<PayableInvoiceFormData>({
    resolver: zodResolver(payableInvoiceSchema),
    defaultValues: {
      supplier_name: "",
      supplier_cui: "",
      invoice_number: "",
      issue_date: new Date().toISOString().split('T')[0],
      due_date: "",
      total: 0,
      status: "unpaid",
      payment_date: "",
      notes: "",
      pdf_file_path: "",
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setUploadedFilePath(null);
    } else {
      toast({
        title: "Fișier invalid",
        description: "Te rugăm să selectezi un fișier PDF",
        variant: "destructive",
      });
    }
  };

  const handleExtractData = async () => {
    if (!selectedFile) {
      toast({
        title: "Niciun fișier selectat",
        description: "Te rugăm să selectezi un PDF mai întâi",
        variant: "destructive",
      });
      return;
    }

    setIsExtracting(true);

    try {
      // Upload PDF to storage
      const fileExt = 'pdf';
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('payable-invoices-pdfs')
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      setUploadedFilePath(filePath);

      toast({
        title: "PDF încărcat",
        description: "Se extrag datele...",
      });

      // Call edge function to extract data
      const { data: extractionData, error: functionError } = await supabase.functions.invoke('extract-invoice-data', {
        body: { filePath }
      });

      if (functionError) {
        throw functionError;
      }

      if (!extractionData.success) {
        throw new Error(extractionData.error || 'Failed to extract data');
      }

      const extracted = extractionData.data;

      // Pre-fill form with extracted data
      form.setValue('supplier_name', extracted.supplier_name || '');
      form.setValue('supplier_cui', extracted.supplier_cui || '');
      form.setValue('invoice_number', extracted.invoice_number || '');
      form.setValue('issue_date', extracted.issue_date || '');
      form.setValue('due_date', extracted.due_date || '');
      form.setValue('total', extracted.total || 0);
      form.setValue('pdf_file_path', filePath);

      toast({
        title: "Date extrase cu succes!",
        description: "Verifică și editează datele dacă este necesar",
      });

    } catch (error) {
      console.error('Error extracting invoice data:', error);
      
      // If extraction failed but file was uploaded, still save the path
      if (uploadedFilePath) {
        form.setValue('pdf_file_path', uploadedFilePath);
      }

      toast({
        title: "Eroare la extragerea datelor",
        description: error instanceof Error ? error.message : "Completează manual câmpurile",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const onSubmit = async (data: PayableInvoiceFormData) => {
    try {
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
        pdf_file_path: data.pdf_file_path || uploadedFilePath || null,
      });
      
      form.reset();
      setSelectedFile(null);
      setUploadedFilePath(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating payable invoice:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adaugă Factură de Plată</DialogTitle>
        </DialogHeader>

        {/* PDF Upload Section */}
        <div className="space-y-4 p-4 border border-purple-500/20 rounded-lg bg-[#0F1117]">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-400" />
            <h3 className="font-medium">Import PDF și Extragere Automată</h3>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                disabled={isExtracting}
                className="bg-[#1A1F2C] border-gray-700 text-white"
              />
              {selectedFile && (
                <p className="text-sm text-gray-400 mt-1">
                  {selectedFile.name}
                </p>
              )}
            </div>
            <Button
              type="button"
              onClick={handleExtractData}
              disabled={!selectedFile || isExtracting}
              className="whitespace-nowrap bg-purple-600 hover:bg-purple-700"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Se extrag...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Extrage Date
                </>
              )}
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supplier_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume Furnizor *</FormLabel>
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
                    <FormLabel>CUI Furnizor</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-[#0F1117] border-gray-700 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="invoice_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Număr Factură *</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-[#0F1117] border-gray-700 text-white" />
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
                    <FormLabel>Data Emiterii *</FormLabel>
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
                    <FormLabel>Data Scadentă *</FormLabel>
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#0F1117] border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1A1F2C] border-gray-700 text-white">
                        <SelectItem value="unpaid">Neplătită</SelectItem>
                        <SelectItem value="paid">Plătită</SelectItem>
                        <SelectItem value="overdue">Restanță</SelectItem>
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
                    <FormLabel>Data Plății</FormLabel>
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
                    <Textarea {...field} className="bg-[#0F1117] border-gray-700 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setSelectedFile(null);
                  setUploadedFilePath(null);
                  onOpenChange(false);
                }}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Anulează
              </Button>
              <Button type="submit" disabled={createPayableInvoice.isPending} className="bg-purple-600 hover:bg-purple-700">
                {createPayableInvoice.isPending ? "Se adaugă..." : "Adaugă Factură"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
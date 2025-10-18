import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, Trash2, FileDown, Pencil } from 'lucide-react';
import { usePayableInvoices } from '@/hooks/usePayableInvoices';
import { formatDate } from '@/utils/dateFormatters';
import { formatCurrency } from '@/utils/numberFormatters';
import { DeleteDialog } from '@/components/business/shared/DeleteDialog';
import { EditPayableInvoiceDialog } from './EditPayableInvoiceDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function PayableInvoicesTable() {
  const { payableInvoices, isLoading, deletePayableInvoice } = usePayableInvoices();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editInvoice, setEditInvoice] = useState<typeof payableInvoices[0] | null>(null);
  const { toast } = useToast();

  const filteredInvoices = payableInvoices.filter(
    (invoice) =>
      invoice.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      invoice.supplier_name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-500/20 text-green-400 border-green-500/30',
      unpaid: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      overdue: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    
    const labels = {
      paid: 'Plătită',
      unpaid: 'Neplătită',
      overdue: 'Restantă',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const handleDownloadPDF = async (filePath: string, invoiceNumber: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('payable-invoices-pdfs')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `factura-${invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "PDF descărcat",
        description: "Factura a fost descărcată cu succes",
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut descărca PDF-ul",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="bg-[#1A1F2C] border-purple-500/20 p-3 md:p-6">
        <div className="mb-3 md:mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Caută factură..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#0F1117] border-gray-700 text-white text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-3 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableHead className="text-gray-400 text-xs md:text-sm">Număr</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm">Furnizor</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm">Emisă</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm">Scadență</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm">Total</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm">Status</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm">PDF</TableHead>
                    <TableHead className="text-gray-400 text-xs md:text-sm">Acțiuni</TableHead>
                  </TableRow>
                </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-400">
                    Se încarcă...
                  </TableCell>
                </TableRow>
              ) : filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-400">
                    Nu există facturi de plată
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="text-white font-medium text-xs md:text-sm">{invoice.invoice_number}</TableCell>
                    <TableCell className="text-gray-300 text-xs md:text-sm">{invoice.supplier_name}</TableCell>
                    <TableCell className="text-gray-300 text-xs md:text-sm">{formatDate(invoice.issue_date)}</TableCell>
                    <TableCell className="text-gray-300 text-xs md:text-sm">{formatDate(invoice.due_date)}</TableCell>
                    <TableCell className="text-white font-semibold text-xs md:text-sm">{formatCurrency(invoice.total)}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      {invoice.pdf_file_path ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadPDF(invoice.pdf_file_path!, invoice.invoice_number)}
                          className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                          title="Descarcă PDF"
                        >
                          <FileDown className="h-4 w-4" />
                        </Button>
                      ) : (
                        <span className="text-gray-500 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditInvoice(invoice)}
                          className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                          title="Editează"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(invoice.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          title="Șterge"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
              </TableBody>
            </Table>
          </div>
        </div>
        </div>
      </Card>

      {editInvoice && (
        <EditPayableInvoiceDialog
          open={!!editInvoice}
          onOpenChange={(open) => !open && setEditInvoice(null)}
          invoice={editInvoice}
        />
      )}

      <DeleteDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deletePayableInvoice.mutate(deleteId);
            setDeleteId(null);
          }
        }}
        title="Șterge factura"
        description="Ești sigur că vrei să ștergi această factură? Această acțiune nu poate fi anulată."
        isLoading={deletePayableInvoice.isPending}
      />
    </>
  );
}

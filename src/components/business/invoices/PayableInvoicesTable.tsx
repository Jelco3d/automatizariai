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

export function PayableInvoicesTable({ statusFilter }: { statusFilter?: string }) {
  const { payableInvoices, isLoading, deletePayableInvoice } = usePayableInvoices();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editInvoice, setEditInvoice] = useState<typeof payableInvoices[0] | null>(null);
  const { toast } = useToast();

  const filteredInvoices = payableInvoices
    .filter((invoice) => !statusFilter || invoice.status === statusFilter)
    .filter(
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

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {isLoading ? (
            <div className="text-center text-gray-400 py-8">Se încarcă...</div>
          ) : filteredInvoices.length === 0 ? (
            <div className="text-center text-gray-400 py-8">Nu există facturi de plată</div>
          ) : (
            filteredInvoices.map((invoice) => (
              <Card key={invoice.id} className="bg-[#0F1117] border-gray-700 p-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white font-semibold text-sm">{invoice.invoice_number}</p>
                      <p className="text-gray-400 text-xs">{invoice.supplier_name}</p>
                    </div>
                    {getStatusBadge(invoice.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-400">Emisă</p>
                      <p className="text-white">{formatDate(invoice.issue_date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Scadență</p>
                      <p className="text-white">{formatDate(invoice.due_date)}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-gray-400 text-xs">Total</p>
                    <p className="text-white font-bold text-lg">{formatCurrency(invoice.total)}</p>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    {invoice.pdf_file_path && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadPDF(invoice.pdf_file_path!, invoice.invoice_number)}
                        className="flex-1 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 text-xs"
                      >
                        <FileDown className="h-3 w-3 mr-1" />
                        PDF
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditInvoice(invoice)}
                      className="flex-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 text-xs"
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Editează
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteId(invoice.id)}
                      className="flex-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Șterge
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="text-gray-400">Număr</TableHead>
                <TableHead className="text-gray-400">Furnizor</TableHead>
                <TableHead className="text-gray-400">Emisă</TableHead>
                <TableHead className="text-gray-400">Scadență</TableHead>
                <TableHead className="text-gray-400">Total</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">PDF</TableHead>
                <TableHead className="text-gray-400">Acțiuni</TableHead>
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
                    <TableCell className="text-white font-medium">{invoice.invoice_number}</TableCell>
                    <TableCell className="text-gray-300">{invoice.supplier_name}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(invoice.issue_date)}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(invoice.due_date)}</TableCell>
                    <TableCell className="text-white font-semibold">{formatCurrency(invoice.total)}</TableCell>
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

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, FileText, Edit, RefreshCw, Trash2 } from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';
import { StatusBadge } from '@/components/business/shared/StatusBadge';
import { DeleteDialog } from '@/components/business/shared/DeleteDialog';
import { formatDate } from '@/utils/dateFormatters';
import { formatCurrency } from '@/utils/numberFormatters';
import { EditInvoiceDialog } from './EditInvoiceDialog';
import { InvoiceStatusDialog } from './InvoiceStatusDialog';
import { downloadInvoicePDF } from '@/utils/generateInvoicePDF';
import { toast } from '@/hooks/use-toast';

export function InvoicesTable() {
  const { invoices, isLoading, deleteInvoice } = useInvoices();
  const [search, setSearch] = useState('');
  const [editInvoice, setEditInvoice] = useState<any>(null);
  const [statusInvoice, setStatusInvoice] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      invoice.client?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadPDF = async (invoice: any) => {
    try {
      if (!invoice.template) {
        toast({
          title: 'Template lipsă',
          description: 'Această factură nu are un template asociat. Te rog să editezi factura și să asociezi un template.',
          variant: 'destructive',
        });
        return;
      }
      await downloadInvoicePDF(invoice, invoice.template);
      toast({
        title: 'PDF descărcat cu succes',
      });
    } catch (error) {
      toast({
        title: 'Eroare la descărcarea PDF',
        description: 'Nu s-a putut genera PDF-ul',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteInvoice.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  return (
    <Card className="bg-[#1A1F2C] border-purple-500/20 p-6">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Caută factură..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-[#0F1117] border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-transparent">
              <TableHead className="text-gray-400">Număr factură</TableHead>
              <TableHead className="text-gray-400">Client</TableHead>
              <TableHead className="text-gray-400">Data emiterii</TableHead>
              <TableHead className="text-gray-400">Data scadență</TableHead>
              <TableHead className="text-gray-400">Total</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400 text-center">PDF</TableHead>
              <TableHead className="text-gray-400 text-center">Acțiuni</TableHead>
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
                  Nu există facturi
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="border-gray-700 hover:bg-gray-800/50">
                  <TableCell className="text-white font-medium">{invoice.invoice_number}</TableCell>
                  <TableCell className="text-gray-300">{invoice.client?.name || '-'}</TableCell>
                  <TableCell className="text-gray-300">{formatDate(invoice.issue_date)}</TableCell>
                  <TableCell className="text-gray-300">{formatDate(invoice.due_date)}</TableCell>
                  <TableCell className="text-white font-semibold">{formatCurrency(invoice.total)}</TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} type="invoice" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadPDF(invoice)}
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditInvoice(invoice)}
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStatusInvoice(invoice)}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(invoice.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
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

      {editInvoice && (
        <EditInvoiceDialog
          open={!!editInvoice}
          onOpenChange={(open) => !open && setEditInvoice(null)}
          invoice={editInvoice}
        />
      )}

      {statusInvoice && (
        <InvoiceStatusDialog
          open={!!statusInvoice}
          onOpenChange={(open) => !open && setStatusInvoice(null)}
          invoice={statusInvoice}
        />
      )}

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Șterge factura"
        description="Ești sigur că vrei să ștergi această factură? Această acțiune nu poate fi anulată."
        isLoading={deleteInvoice.isPending}
      />
    </Card>
  );
}

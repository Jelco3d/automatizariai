import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, Trash2 } from 'lucide-react';
import { usePayableInvoices } from '@/hooks/usePayableInvoices';
import { formatDate } from '@/utils/dateFormatters';
import { formatCurrency } from '@/utils/numberFormatters';
import { DeleteDialog } from '@/components/business/shared/DeleteDialog';

export function PayableInvoicesTable() {
  const { payableInvoices, isLoading, deletePayableInvoice } = usePayableInvoices();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  return (
    <>
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
                <TableHead className="text-gray-400">Furnizor</TableHead>
                <TableHead className="text-gray-400">Data emiterii</TableHead>
                <TableHead className="text-gray-400">Data scadentă</TableHead>
                <TableHead className="text-gray-400">Total</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-400">
                    Se încarcă...
                  </TableCell>
                </TableRow>
              ) : filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-400">
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(invoice.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

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

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, FileText, Eye } from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';
import { StatusBadge } from '@/components/business/shared/StatusBadge';
import { formatDate } from '@/utils/dateFormatters';
import { formatCurrency } from '@/utils/numberFormatters';
import { downloadInvoicePDF } from '@/utils/generateInvoicePDF';
import { toast } from '@/hooks/use-toast';

export function PaidInvoicesTable() {
  const { invoices, isLoading } = useInvoices();
  const [search, setSearch] = useState('');

  // Filter only paid invoices
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid');

  const filteredInvoices = paidInvoices.filter(
    (invoice) =>
      invoice.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      invoice.client?.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadPDF = async (invoice: any) => {
    try {
      if (!invoice.template) {
        toast({
          title: 'Template lipsă',
          description: 'Această factură nu are un template asociat.',
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

  return (
    <Card className="bg-[#1A1F2C] border-purple-500/20 p-3 md:p-6">
      <div className="mb-3 md:mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Caută factură încasată..."
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
                  <TableHead className="text-gray-400 text-xs md:text-sm">Client</TableHead>
                  <TableHead className="text-gray-400 text-xs md:text-sm">Emisă</TableHead>
                  <TableHead className="text-gray-400 text-xs md:text-sm">Data Plății</TableHead>
                  <TableHead className="text-gray-400 text-xs md:text-sm">Total</TableHead>
                  <TableHead className="text-gray-400 text-xs md:text-sm">Status</TableHead>
                  <TableHead className="text-gray-400 text-xs md:text-sm text-center">Acțiuni</TableHead>
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
                    <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                      {paidInvoices.length === 0 
                        ? 'Nu există facturi încasate încă' 
                        : 'Nu s-au găsit facturi pentru căutarea ta'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="border-gray-700 hover:bg-gray-800/50">
                      <TableCell className="text-white font-medium text-xs md:text-sm">{invoice.invoice_number}</TableCell>
                      <TableCell className="text-gray-300 text-xs md:text-sm">{invoice.client?.name || '-'}</TableCell>
                      <TableCell className="text-gray-300 text-xs md:text-sm">{formatDate(invoice.issue_date)}</TableCell>
                      <TableCell className="text-green-400 text-xs md:text-sm">{formatDate(invoice.due_date)}</TableCell>
                      <TableCell className="text-white font-semibold text-xs md:text-sm">{formatCurrency(invoice.total)}</TableCell>
                      <TableCell>
                        <StatusBadge status={invoice.status} type="invoice" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadPDF(invoice)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            title="Descarcă PDF"
                          >
                            <FileText className="h-4 w-4" />
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

      {/* Summary Stats */}
      {paidInvoices.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Total Facturi Încasate</p>
              <p className="text-xl font-bold text-green-400">{paidInvoices.length}</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Valoare Totală Încasată</p>
              <p className="text-xl font-bold text-green-400">
                {formatCurrency(paidInvoices.reduce((sum, inv) => sum + Number(inv.total), 0))}
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

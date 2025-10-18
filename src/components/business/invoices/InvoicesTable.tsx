import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';
import { StatusBadge } from '@/components/business/shared/StatusBadge';
import { formatDate } from '@/utils/dateFormatters';
import { formatCurrency } from '@/utils/numberFormatters';

export function InvoicesTable() {
  const { invoices, isLoading } = useInvoices();
  const [search, setSearch] = useState('');

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      invoice.client?.name.toLowerCase().includes(search.toLowerCase())
  );

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
              <TableHead className="text-gray-400">Data scadentă</TableHead>
              <TableHead className="text-gray-400">Total</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400">
                  Se încarcă...
                </TableCell>
              </TableRow>
            ) : filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400">
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

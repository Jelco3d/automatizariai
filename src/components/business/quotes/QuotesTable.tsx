import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Pencil, Trash2, Download, Search, CheckCircle2 } from 'lucide-react';
import { Quote } from '@/hooks/useQuotes';
import { formatDate } from '@/utils/dateFormatters';
import { formatCurrency } from '@/utils/numberFormatters';
import { StatusBadge } from '@/components/business/shared/StatusBadge';
import { DeleteDialog } from '@/components/business/shared/DeleteDialog';
import { EditQuoteDialog } from './EditQuoteDialog';
import { QuoteStatusDialog } from './QuoteStatusDialog';
import { generateQuotePDF } from '@/utils/generateQuotePDF';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface QuotesTableProps {
  quotes: Quote[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: any) => void;
  onStatusChange: (id: string, status: Quote['status']) => void;
}

export function QuotesTable({ quotes, onDelete, onUpdate, onStatusChange }: QuotesTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const filteredQuotes = quotes.filter(quote =>
    quote.quote_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.clients?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (selectedQuote) {
      onDelete(selectedQuote.id);
      setDeleteDialogOpen(false);
      setSelectedQuote(null);
    }
  };

  const handleDownloadPDF = async (quote: Quote) => {
    try {
      const { data: items, error } = await supabase
        .from('quote_items')
        .select('*')
        .eq('quote_id', quote.id);

      if (error) throw error;

      await generateQuotePDF(quote, items);
      
      toast({
        title: 'Succes',
        description: 'PDF-ul a fost descărcat',
      });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la descărcarea PDF-ului',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Caută după număr ofertă sau client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#0F1117] border-gray-700 text-white text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-400 text-xs md:text-sm">Număr</TableHead>
                <TableHead className="text-gray-400 text-xs md:text-sm">Client</TableHead>
                <TableHead className="text-gray-400 text-xs md:text-sm">Data</TableHead>
                <TableHead className="text-gray-400 text-xs md:text-sm">Valabil până</TableHead>
                <TableHead className="text-gray-400 text-xs md:text-sm">Total</TableHead>
                <TableHead className="text-gray-400 text-xs md:text-sm">Status</TableHead>
                <TableHead className="text-gray-400 text-right text-xs md:text-sm">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id} className="border-gray-700">
                  <TableCell className="text-white font-medium text-xs md:text-sm">
                    {quote.quote_number}
                  </TableCell>
                  <TableCell className="text-white text-xs md:text-sm">
                    {quote.clients?.name}
                  </TableCell>
                  <TableCell className="text-gray-400 text-xs md:text-sm">
                    {formatDate(quote.issue_date)}
                  </TableCell>
                  <TableCell className="text-gray-400 text-xs md:text-sm">
                    {formatDate(quote.valid_until)}
                  </TableCell>
                  <TableCell className="text-white font-medium text-xs md:text-sm">
                    {formatCurrency(quote.total)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={quote.status} type="quote" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadPDF(quote)}
                        className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                        title="Descarcă PDF"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setStatusDialogOpen(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        title="Schimbă status"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setEditDialogOpen(true);
                        }}
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredQuotes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-400 py-8">
                    Nu există oferte
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedQuote && (
        <>
          <DeleteDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={handleDelete}
            title="Șterge oferta"
            description={`Ești sigur că vrei să ștergi oferta ${selectedQuote.quote_number}?`}
          />
          <EditQuoteDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            quote={selectedQuote}
            onUpdate={onUpdate}
          />
          <QuoteStatusDialog
            open={statusDialogOpen}
            onOpenChange={setStatusDialogOpen}
            quote={selectedQuote}
            onStatusChange={onStatusChange}
          />
        </>
      )}
    </div>
  );
}

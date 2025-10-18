import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Search, Eye } from 'lucide-react';
import { Proposal } from '@/hooks/useProposals';
import { formatDate } from '@/utils/dateFormatters';
import { formatCurrency } from '@/utils/numberFormatters';
import { DeleteDialog } from '@/components/business/shared/DeleteDialog';
import { ProposalPreviewDialog } from './ProposalPreviewDialog';
import { StatusBadge } from '@/components/business/shared/StatusBadge';
import { ProposalStatusDialog } from './ProposalStatusDialog';

interface ProposalsTableProps {
  proposals: Proposal[];
  onDelete: (id: string) => void;
  onEdit: (proposal: Proposal) => void;
  onUpdateProposal: any;
}

export function ProposalsTable({ proposals, onDelete, onEdit, onUpdateProposal }: ProposalsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewProposal, setPreviewProposal] = useState<Proposal | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusProposal, setStatusProposal] = useState<Proposal | null>(null);

  const filteredProposals = proposals.filter(proposal =>
    proposal.business_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (selectedProposal) {
      onDelete(selectedProposal.id);
      setDeleteDialogOpen(false);
      setSelectedProposal(null);
    }
  };

  const handleUpdateStatus = (id: string, status: string) => {
    onUpdateProposal.mutate({ 
      id, 
      data: { status } 
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Caută după nume business..."
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
                <TableHead className="text-gray-400 text-xs md:text-sm">Business</TableHead>
                <TableHead className="text-gray-400 text-xs md:text-sm">Automatizare</TableHead>
                <TableHead className="text-gray-400 text-xs md:text-sm">Timeframe</TableHead>
                <TableHead className="text-gray-400 text-xs md:text-sm">Preț</TableHead>
                <TableHead className="text-gray-400 text-xs md:text-sm">Status</TableHead>
                <TableHead className="text-gray-400 text-xs md:text-sm">Data</TableHead>
                <TableHead className="text-gray-400 text-center text-xs md:text-sm">Propunere</TableHead>
                <TableHead className="text-gray-400 text-right text-xs md:text-sm">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProposals.map((proposal) => (
                <TableRow key={proposal.id} className="border-gray-700">
                  <TableCell className="text-white font-medium text-xs md:text-sm">
                    {proposal.business_name}
                  </TableCell>
                  <TableCell className="text-gray-400 text-xs md:text-sm max-w-xs truncate">
                    {proposal.automation_needs}
                  </TableCell>
                  <TableCell className="text-gray-400 text-xs md:text-sm">
                    {proposal.timeframe}
                  </TableCell>
                  <TableCell className="text-white font-medium text-xs md:text-sm">
                    {formatCurrency(proposal.price)}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        setStatusProposal(proposal);
                        setStatusDialogOpen(true);
                      }}
                      className="cursor-pointer hover:opacity-80"
                    >
                      <StatusBadge status={proposal.status} type="proposal" />
                    </button>
                  </TableCell>
                  <TableCell className="text-gray-400 text-xs md:text-sm">
                    {formatDate(proposal.created_at)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setPreviewProposal(proposal);
                        setPreviewDialogOpen(true);
                      }}
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(proposal)}
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedProposal(proposal);
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
              {filteredProposals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-400 py-8">
                    Nu există propuneri
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedProposal && (
        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDelete}
          title="Șterge propunerea"
          description={`Ești sigur că vrei să ștergi propunerea pentru ${selectedProposal.business_name}?`}
        />
      )}
      
      <ProposalPreviewDialog
        open={previewDialogOpen}
        onOpenChange={setPreviewDialogOpen}
        proposal={previewProposal}
        onUpdateProposal={onUpdateProposal}
      />

      <ProposalStatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        proposal={statusProposal}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}

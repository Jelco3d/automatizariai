import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Proposal } from '@/hooks/useProposals';

interface ProposalStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal | null;
  onUpdateStatus: (id: string, status: string) => void;
}

const statusOptions = [
  { value: 'draft', label: 'Ciornă' },
  { value: 'sent', label: 'Trimisă' },
  { value: 'accepted', label: 'Acceptată' },
  { value: 'rejected', label: 'Respinsă' },
];

export function ProposalStatusDialog({ open, onOpenChange, proposal, onUpdateStatus }: ProposalStatusDialogProps) {
  const [status, setStatus] = useState(proposal?.status || 'draft');

  // Sync when proposal changes (avoid resetting on every render)
  useEffect(() => {
    setStatus(proposal?.status || 'draft');
  }, [proposal?.id, proposal?.status, open]);

  const handleSubmit = () => {
    if (proposal) {
      onUpdateStatus(proposal.id, status);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white">
        <DialogHeader>
          <DialogTitle>Schimbă Status Propunere</DialogTitle>
          <DialogDescription>Alege statusul propunerii și salvează.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-gray-400">Business</Label>
            <p className="text-white font-medium">{proposal?.business_name}</p>
          </div>
          <div>
            <Label htmlFor="status" className="text-gray-400">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-[#0F1117] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-purple-500/20">
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-700 text-gray-400 hover:bg-gray-700"
            >
              Anulează
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Salvează
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

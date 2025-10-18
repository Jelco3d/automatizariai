import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProposalPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: string | null;
  businessName: string;
}

export function ProposalPreviewDialog({ open, onOpenChange, proposal, businessName }: ProposalPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] bg-[#1A1F2C] border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-white">Propunere pentru {businessName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="prose prose-invert max-w-none">
            {proposal ? (
              <div className="whitespace-pre-wrap text-gray-300">{proposal}</div>
            ) : (
              <p className="text-gray-400">Nu există propunere generată pentru acest client.</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
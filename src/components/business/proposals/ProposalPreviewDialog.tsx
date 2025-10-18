import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProposalHTMLPreview } from './ProposalHTMLPreview';

interface ProposalPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: string | null;
  businessName: string;
}

export function ProposalPreviewDialog({ open, onOpenChange, proposal, businessName }: ProposalPreviewDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>Propunere pentru {businessName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          {proposal ? (
            <ProposalHTMLPreview htmlContent={proposal} businessName={businessName} />
          ) : (
            <p className="text-gray-400">Nu există propunere generată pentru acest client.</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
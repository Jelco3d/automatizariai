import { Dialog, DialogContent } from '@/components/ui/dialog';
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
      <DialogContent className="max-w-[95vw] h-[90vh] bg-[#1A1F2C] border-purple-500/20 p-6">
        {proposal ? (
          <ProposalHTMLPreview htmlContent={proposal} businessName={businessName} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Nu există propunere generată pentru acest client.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
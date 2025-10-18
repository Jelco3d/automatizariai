import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { generateProposalPDF } from '@/utils/generateProposalPDF';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface ProposalPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: string | null;
  businessName: string;
}

export function ProposalPreviewDialog({ open, onOpenChange, proposal, businessName }: ProposalPreviewDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!proposal) {
      toast({
        title: 'Eroare',
        description: 'Nu există propunere de descărcat',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      await generateProposalPDF(businessName, proposal);
      toast({
        title: 'Succes',
        description: 'PDF-ul a fost descărcat cu succes',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la generarea PDF-ului',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] bg-[#1A1F2C] border-purple-500/20">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">Propunere pentru {businessName}</DialogTitle>
            <Button
              onClick={handleDownloadPDF}
              disabled={!proposal || isGenerating}
              className="bg-purple-600 hover:bg-purple-700"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generez...' : 'Descarcă PDF'}
            </Button>
          </div>
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
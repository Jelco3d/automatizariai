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
      <DialogContent className="max-w-5xl h-[85vh] bg-[#1A1F2C] border-purple-500/20 flex flex-col">
        <DialogHeader className="flex-shrink-0">
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
        <ScrollArea className="flex-1 mt-4">
          <div className="space-y-4 pr-4">
            {proposal ? (
              <div className="bg-white/5 border border-purple-500/20 rounded-lg p-6">
                <pre className="whitespace-pre-wrap font-sans text-gray-100 leading-relaxed text-sm">
                  {proposal}
                </pre>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  Nu există propunere generată pentru acest client.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Creați o nouă propunere pentru a genera conținut.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
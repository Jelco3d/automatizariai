import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Download, Edit, Save, X } from 'lucide-react';
import { generateProposalPDF } from '@/utils/generateProposalPDF';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Proposal } from '@/hooks/useProposals';

interface ProposalPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal | null;
  onUpdateProposal: any;
}

export function ProposalPreviewDialog({ open, onOpenChange, proposal, onUpdateProposal }: ProposalPreviewDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [currentProposal, setCurrentProposal] = useState<Proposal | null>(null);

  // Update local proposal when prop changes
  useEffect(() => {
    if (proposal) {
      setCurrentProposal(proposal);
    }
  }, [proposal]);

  const handleDownloadPDF = async () => {
    const proposalText = currentProposal?.generated_proposal;
    if (!proposalText) {
      toast({
        title: 'Eroare',
        description: 'Nu există propunere de descărcat',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      await generateProposalPDF(currentProposal.business_name, proposalText);
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

  const handleEdit = () => {
    if (currentProposal?.generated_proposal) {
      setEditedText(currentProposal.generated_proposal);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!currentProposal || !editedText.trim()) {
      toast({
        title: 'Eroare',
        description: 'Textul nu poate fi gol',
        variant: 'destructive',
      });
      return;
    }

    // Update local state immediately
    setCurrentProposal({
      ...currentProposal,
      generated_proposal: editedText,
    });

    onUpdateProposal.mutate({
      id: currentProposal.id,
      data: {
        business_name: currentProposal.business_name,
        business_description: currentProposal.business_description,
        automation_needs: currentProposal.automation_needs,
        timeframe: currentProposal.timeframe,
        price: currentProposal.price,
        generated_proposal: editedText,
      }
    });
    
    setIsEditing(false);
    toast({
      title: 'Succes',
      description: 'Propunerea a fost actualizată',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] bg-[#1A1F2C] border-purple-500/20 flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">Propunere pentru {currentProposal?.business_name}</DialogTitle>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Anulează
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Salvează
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleEdit}
                    disabled={!currentProposal?.generated_proposal}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editează
                  </Button>
                  <Button
                    onClick={handleDownloadPDF}
                    disabled={!currentProposal?.generated_proposal || isGenerating}
                    className="bg-purple-600 hover:bg-purple-700"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isGenerating ? 'Generez...' : 'Descarcă PDF'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 mt-4">
          <div className="space-y-4 pr-4">
            {currentProposal?.generated_proposal ? (
              <div className="bg-white/5 border border-purple-500/20 rounded-lg p-6">
                {isEditing ? (
                  <Textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="min-h-[500px] bg-[#0F1117] border-gray-700 text-white font-sans text-sm leading-relaxed resize-none"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap font-sans text-gray-100 leading-relaxed text-sm">
                    {currentProposal.generated_proposal}
                  </pre>
                )}
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
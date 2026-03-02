import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { useProposals, Proposal } from "@/hooks/useProposals";
import { ProposalsTable } from "@/components/business/proposals/ProposalsTable";
import { ProposalForm } from "@/components/business/proposals/ProposalForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProposalFormData } from "@/schemas/proposalSchema";
import { formatCurrency } from "@/utils/numberFormatters";
import { PageShell } from "@/components/business/shared/PageShell";
import { PageHeader } from "@/components/business/shared/PageHeader";
import { StatCard } from "@/components/business/shared/StatCard";

export default function Proposals() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const { proposals, isLoading, createProposal, updateProposal, deleteProposal, updateStatus } = useProposals();

  const totalValue = proposals.reduce((sum, p) => sum + p.price, 0);

  const handleCreateProposal = (data: ProposalFormData) => {
    createProposal.mutate(data);
    setDialogOpen(false);
  };

  const handleUpdateProposal = (data: ProposalFormData) => {
    if (editingProposal) {
      updateProposal.mutate({ id: editingProposal.id, data });
      setDialogOpen(false);
      setEditingProposal(null);
    }
  };

  const handleDeleteProposal = (id: string) => {
    deleteProposal.mutate(id);
  };

  const handleEdit = (proposal: Proposal) => {
    setEditingProposal(proposal);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProposal(null);
  };

  return (
    <PageShell loading={isLoading}>
      <PageHeader
        title="Propuneri"
        action={
          <Button onClick={() => { setEditingProposal(null); setDialogOpen(true); }} className="btn-3d-gold w-full md:w-auto text-sm md:text-base px-5">
            <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Propunere Nouă</span>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StatCard label="Total Propuneri" value={proposals.length} icon={FileText} variant="purple" />
        <StatCard label="Valoare Totală" value={formatCurrency(totalValue)} icon={FileText} variant="green" />
      </div>

      <div className="glass-card rounded-xl border border-white/[0.06] p-4 md:p-5">
        <h2 className="text-base font-semibold text-white mb-4">Toate Propunerile</h2>
        <ProposalsTable proposals={proposals} onDelete={handleDeleteProposal} onEdit={handleEdit} onUpdateProposal={updateProposal} onUpdateStatus={updateStatus} />
      </div>

      <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="glass-card bg-[#0f1220] border-white/[0.08] text-white w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-2xl">{editingProposal ? 'Editează Propunerea' : 'Propunere Nouă'}</DialogTitle>
          </DialogHeader>
          <ProposalForm 
            onSubmit={editingProposal ? handleUpdateProposal : handleCreateProposal}
            initialData={editingProposal ? {
              business_name: editingProposal.business_name,
              business_description: editingProposal.business_description,
              automation_needs: editingProposal.automation_needs,
              timeframe: editingProposal.timeframe,
              price: editingProposal.price,
            } : undefined}
            isSubmitting={createProposal.isPending || updateProposal.isPending}
          />
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}

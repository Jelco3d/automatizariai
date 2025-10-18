import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { useProposals, Proposal } from "@/hooks/useProposals";
import { ProposalsTable } from "@/components/business/proposals/ProposalsTable";
import { ProposalForm } from "@/components/business/proposals/ProposalForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProposalFormData } from "@/schemas/proposalSchema";
import { formatCurrency } from "@/utils/numberFormatters";
import { Session } from "@supabase/supabase-js";

export default function Proposals() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const navigate = useNavigate();
  const { proposals, isLoading, createProposal, updateProposal, deleteProposal, updateStatus } = useProposals();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center">
        <p className="text-white">Se încarcă...</p>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#0F1117] text-white flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Propuneri</h1>
          <Button 
            onClick={() => {
              setEditingProposal(null);
              setDialogOpen(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Propunere Nouă
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-[#1A1F2C] border-purple-500/20 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Propuneri</p>
                <p className="text-2xl md:text-3xl font-bold text-white mt-2">{proposals.length}</p>
              </div>
              <FileText className="h-8 w-8 md:h-10 md:w-10 text-purple-400" />
            </div>
          </Card>

          <Card className="bg-[#1A1F2C] border-green-500/20 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Valoare Totală</p>
                <p className="text-2xl md:text-3xl font-bold text-white mt-2">{formatCurrency(totalValue)}</p>
              </div>
              <FileText className="h-8 w-8 md:h-10 md:w-10 text-green-400" />
            </div>
          </Card>
        </div>

        <Card className="bg-[#1A1F2C] border-purple-500/20 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Toate Propunerile</h2>
          <ProposalsTable
            proposals={proposals}
            onDelete={handleDeleteProposal}
            onEdit={handleEdit}
            onUpdateProposal={updateProposal}
            onUpdateStatus={updateStatus}
          />
        </Card>

        <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl">
                {editingProposal ? 'Editează Propunerea' : 'Propunere Nouă'}
              </DialogTitle>
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
      </div>
    </div>
  );
}

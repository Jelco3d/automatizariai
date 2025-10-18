import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { useProposals, Proposal } from "@/hooks/useProposals";
import { useProposalTemplates, ProposalTemplate } from "@/hooks/useProposalTemplates";
import { ProposalsTable } from "@/components/business/proposals/ProposalsTable";
import { ProposalTemplatesTable } from "@/components/business/proposals/ProposalTemplatesTable";
import { ProposalForm } from "@/components/business/proposals/ProposalForm";
import { ProposalTemplateForm } from "@/components/business/proposals/ProposalTemplateForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProposalFormData } from "@/schemas/proposalSchema";
import { ProposalTemplateFormData } from "@/schemas/proposalTemplateSchema";
import { formatCurrency } from "@/utils/numberFormatters";
import { Session } from "@supabase/supabase-js";

export default function Proposals() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("proposals");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<ProposalTemplate | null>(null);
  const navigate = useNavigate();
  const { proposals, isLoading, createProposal, updateProposal, deleteProposal } = useProposals();
  const { templates, isLoading: templatesLoading, createTemplate, updateTemplate, deleteTemplate } = useProposalTemplates();

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

  if (loading || isLoading || templatesLoading) {
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

  const handleCreateTemplate = (data: ProposalTemplateFormData) => {
    createTemplate.mutate(data);
    setTemplateDialogOpen(false);
  };

  const handleUpdateTemplate = (data: ProposalTemplateFormData) => {
    if (editingTemplate) {
      updateTemplate.mutate({ id: editingTemplate.id, data });
      setTemplateDialogOpen(false);
      setEditingTemplate(null);
    }
  };

  const handleDeleteTemplate = (id: string) => {
    deleteTemplate.mutate(id);
  };

  const handleEditTemplate = (template: ProposalTemplate) => {
    setEditingTemplate(template);
    setTemplateDialogOpen(true);
  };

  const handleCloseTemplateDialog = () => {
    setTemplateDialogOpen(false);
    setEditingTemplate(null);
  };

  const handleUseTemplate = (template: ProposalTemplate) => {
    setEditingProposal({
      id: "",
      business_name: "",
      business_description: "",
      automation_needs: template.automation_needs_template || "",
      timeframe: template.timeframe_template || "",
      price: template.default_price || 0,
      status: "draft",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      generated_proposal: null,
    } as Proposal);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Propuneri</h1>
          <Button 
            onClick={() => {
              if (activeTab === "proposals") {
                setEditingProposal(null);
                setDialogOpen(true);
              } else {
                setEditingTemplate(null);
                setTemplateDialogOpen(true);
              }
            }}
            className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === "proposals" ? "Propunere Nouă" : "Template Nou"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-6">
            <TabsTrigger value="proposals">Propuneri</TabsTrigger>
            <TabsTrigger value="templates">Template-uri</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              />
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card className="bg-[#1A1F2C] border-purple-500/20 p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Template-uri Propuneri</h2>
              <ProposalTemplatesTable
                templates={templates}
                onDelete={handleDeleteTemplate}
                onEdit={handleEditTemplate}
                onUseTemplate={handleUseTemplate}
              />
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl">
                {editingProposal?.id ? 'Editează Propunerea' : 'Propunere Nouă'}
              </DialogTitle>
            </DialogHeader>
            <ProposalForm 
              onSubmit={editingProposal?.id ? handleUpdateProposal : handleCreateProposal}
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

        <Dialog open={templateDialogOpen} onOpenChange={handleCloseTemplateDialog}>
          <DialogContent className="bg-[#1A1F2C] border-purple-500/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl">
                {editingTemplate ? 'Editează Template' : 'Template Nou'}
              </DialogTitle>
            </DialogHeader>
            <ProposalTemplateForm 
              onSubmit={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
              initialData={editingTemplate ? {
                name: editingTemplate.name,
                description: editingTemplate.description,
                business_type: editingTemplate.business_type,
                automation_needs_template: editingTemplate.automation_needs_template,
                timeframe_template: editingTemplate.timeframe_template,
                default_price: editingTemplate.default_price,
                proposal_structure: editingTemplate.proposal_structure,
                code_snippets: editingTemplate.code_snippets,
              } : undefined}
              isSubmitting={createTemplate.isPending || updateTemplate.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

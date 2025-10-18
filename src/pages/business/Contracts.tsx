import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, FileText } from "lucide-react";
import { Session } from "@supabase/supabase-js";
import { useContracts, Contract } from "@/hooks/useContracts";
import { ContractForm } from "@/components/business/contracts/ContractForm";
import { ContractsTable } from "@/components/business/contracts/ContractsTable";
import { ContractStatusDialog } from "@/components/business/contracts/ContractStatusDialog";
import { SignatureLinkDialog } from "@/components/business/contracts/SignatureLinkDialog";
import { ContractFormData } from "@/schemas/contractSchema";
import { generateContractPDF } from "@/utils/generateContractPDF";
import { generateDocumentNumber } from "@/utils/documentNumbers";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/utils/numberFormatters";

export default function Contracts() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [viewContract, setViewContract] = useState<Contract | null>(null);
  const [statusContract, setStatusContract] = useState<Contract | null>(null);
  const [signatureLinkContract, setSignatureLinkContract] = useState<Contract | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { contracts, isLoading, refetch, createContract, updateContract, deleteContract, updateStatus, generateSignatureLink } = useContracts();

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

  const totalValue = contracts?.reduce((sum, contract) => sum + Number(contract.total_value), 0) || 0;
  const activeContracts = contracts?.filter(c => c.fully_signed_at !== null).length || 0;

  const handleCreateContract = async (data: ContractFormData & { generated_contract?: string; proposal_id?: string }) => {
    const contractNumber = await generateDocumentNumber('CONTRACT');
    
    createContract({
      ...data,
      contract_number: contractNumber,
      provider_name: 'Unison Loge Fx SRL',
      start_date: data.start_date.toISOString().split('T')[0],
      end_date: data.end_date ? data.end_date.toISOString().split('T')[0] : undefined,
      status: 'draft',
    });
    
    setIsDialogOpen(false);
  };

  const handleUpdateContract = async (data: ContractFormData & { generated_contract?: string; proposal_id?: string }) => {
    if (!editingContract) return;

    updateContract({
      id: editingContract.id,
      ...data,
      start_date: data.start_date.toISOString().split('T')[0],
      end_date: data.end_date ? data.end_date.toISOString().split('T')[0] : undefined,
    });

    setIsDialogOpen(false);
    setEditingContract(null);
  };

  const handleEdit = (contract: Contract) => {
    setEditingContract(contract);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sigur doriți să ștergeți acest contract?')) {
      deleteContract(id);
    }
  };

  const handleDownloadPDF = async (contract: Contract) => {
    try {
      const contractText = contract.generated_contract || 
        `${contract.terms || ''}\n\n${contract.clauses || ''}`;
      
      await generateContractPDF(
        contract.contract_number,
        contract.contract_type || 'PRESTĂRI SERVICII',
        contract.clients?.name || 'Client',
        contractText,
        contract.provider_signature_data || undefined,
        contract.provider_signature_name || undefined,
        contract.client_signature_data || undefined,
        contract.client_signature_name || undefined,
        contract.provider_name || undefined
      );
      
      toast({
        title: contract.fully_signed_at ? "PDF semnat descărcat" : "PDF generat",
        description: contract.fully_signed_at
          ? "Varianta semnată a contractului a fost descărcată."
          : "Contractul a fost descărcat.",
      });
    } catch (error) {
      console.error('Error generating contract PDF:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut genera PDF-ul.",
        variant: "destructive",
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingContract(null);
  };

  const handleChangeStatus = (contract: Contract) => {
    setStatusContract(contract);
  };

  const handleStatusChange = (contractId: string, status: Contract['status']) => {
    updateStatus({ id: contractId, status });
  };

  const handleGenerateSignatureLink = async (contract: Contract) => {
    try {
      await generateSignatureLink(contract.id);
      setSignatureLinkContract(contract);
    } catch (error) {
      console.error('Error generating signature link:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-white flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 pt-20 md:pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Contracte</h1>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto text-sm md:text-base px-4"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Contract Nou</span>
          </Button>
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-3 mb-4 md:mb-6">
          <Card className="bg-[#1A1F2C] border-purple-500/20 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-400">Total Contracte</p>
                <p className="text-xl md:text-2xl font-bold text-white">{contracts?.length || 0}</p>
              </div>
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />
            </div>
          </Card>

          <Card className="bg-[#1A1F2C] border-purple-500/20 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-400">Contracte Active</p>
                <p className="text-xl md:text-2xl font-bold text-white">{activeContracts}</p>
              </div>
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
            </div>
          </Card>

          <Card className="bg-[#1A1F2C] border-purple-500/20 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-400">Valoare Totală</p>
                <p className="text-xl md:text-2xl font-bold text-white">{formatCurrency(totalValue)}</p>
              </div>
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
            </div>
          </Card>
        </div>

        {contracts && contracts.length > 0 ? (
          <ContractsTable
            contracts={contracts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownloadPDF={handleDownloadPDF}
            onView={setViewContract}
            onChangeStatus={handleChangeStatus}
            onGenerateSignatureLink={handleGenerateSignatureLink}
          />
        ) : (
          <Card className="bg-[#1A1F2C] border-purple-500/20 p-8">
            <p className="text-gray-400 text-center">
              Nu ai niciun contract încă. Creează primul tău contract!
            </p>
          </Card>
        )}

        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1A1F2C] text-white p-4 md:p-6">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl">
                {editingContract ? 'Editează Contract' : 'Contract Nou'}
              </DialogTitle>
            </DialogHeader>
            <ContractForm
              onSubmit={editingContract ? handleUpdateContract : handleCreateContract}
              initialData={editingContract ? {
                contract_type: editingContract.contract_type,
                client_id: editingContract.client_id,
                start_date: new Date(editingContract.start_date),
                end_date: editingContract.end_date ? new Date(editingContract.end_date) : undefined,
                total_value: Number(editingContract.total_value),
                terms: editingContract.terms,
                clauses: editingContract.clauses,
                generated_contract: editingContract.generated_contract,
              } : undefined}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={!!viewContract} onOpenChange={() => setViewContract(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1A1F2C] text-white">
            <DialogHeader>
              <DialogTitle>Contract {viewContract?.contract_number}</DialogTitle>
            </DialogHeader>
            {viewContract && (
              <div className="space-y-4">
                <div className="whitespace-pre-wrap font-mono text-sm">
                  {viewContract.generated_contract || 
                    `${viewContract.terms || ''}\n\n${viewContract.clauses || ''}`}
                </div>
                <Button onClick={() => handleDownloadPDF(viewContract)} className="w-full">
                  Descarcă PDF
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <ContractStatusDialog
          contract={statusContract}
          open={!!statusContract}
          onOpenChange={(open) => !open && setStatusContract(null)}
          onStatusChange={handleStatusChange}
        />

        <SignatureLinkDialog
          open={!!signatureLinkContract}
          onOpenChange={(open) => !open && setSignatureLinkContract(null)}
          contract={signatureLinkContract}
          onRefresh={refetch}
        />
      </div>
    </div>
  );
}

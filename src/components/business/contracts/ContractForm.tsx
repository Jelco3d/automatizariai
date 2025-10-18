import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contractSchema, ContractFormData, contractTypes } from "@/schemas/contractSchema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ClientSelector } from "@/components/business/shared/ClientSelector";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { formatDateForInput } from "@/utils/dateFormatters";

interface ContractFormProps {
  onSubmit: (data: ContractFormData & { generated_contract?: string; proposal_id?: string }) => void;
  initialData?: Partial<ContractFormData>;
}

export function ContractForm({ onSubmit, initialData }: ContractFormProps) {
  const { toast } = useToast();
  const [selectedProposalId, setSelectedProposalId] = useState<string>("");
  const [generatedContract, setGeneratedContract] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      contract_type: initialData?.contract_type || "",
      client_id: initialData?.client_id || "",
      start_date: initialData?.start_date || new Date(),
      end_date: initialData?.end_date,
      total_value: initialData?.total_value || 0,
      terms: initialData?.terms || "",
      clauses: initialData?.clauses || "",
    },
  });

  const { data: proposals } = useQuery({
    queryKey: ['proposals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const handleProposalChange = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    const proposal = proposals?.find(p => p.id === proposalId);
    if (proposal) {
      form.setValue('total_value', proposal.price);
    }
  };

  const handleGenerateContract = async () => {
    const values = form.getValues();
    
    if (!values.client_id || !values.contract_type || !values.start_date || !values.total_value) {
      toast({
        title: "Completează câmpurile",
        description: "Te rog să completezi toate câmpurile obligatorii înainte de a genera contractul.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const client = clients?.find(c => c.id === values.client_id);
      const proposal = selectedProposalId ? proposals?.find(p => p.id === selectedProposalId) : null;

      const { data, error } = await supabase.functions.invoke('generate-contract', {
        body: {
          clientData: client,
          proposalData: proposal,
          contractData: {
            contract_type: values.contract_type,
            start_date: values.start_date.toISOString().split('T')[0],
            end_date: values.end_date ? values.end_date.toISOString().split('T')[0] : null,
            total_value: values.total_value,
          }
        }
      });

      if (error) throw error;

      setGeneratedContract(data.generatedContract);
      toast({
        title: "Contract generat",
        description: "Contractul a fost generat cu succes. Verifică-l mai jos.",
      });
    } catch (error: any) {
      console.error('Error generating contract:', error);
      toast({
        title: "Eroare",
        description: error.message || "Nu s-a putut genera contractul.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (data: ContractFormData) => {
    onSubmit({
      ...data,
      generated_contract: generatedContract || undefined,
      proposal_id: selectedProposalId || undefined,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <FormControl>
                <ClientSelector value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Propunere (opțional)</FormLabel>
          <Select value={selectedProposalId} onValueChange={handleProposalChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selectează o propunere" />
            </SelectTrigger>
            <SelectContent>
              {proposals?.map((proposal) => (
                <SelectItem key={proposal.id} value={proposal.id}>
                  {proposal.business_name} - {proposal.price} RON
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <FormField
          control={form.control}
          name="contract_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tip Contract</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează tipul" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contractTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Început</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={formatDateForInput(field.value)}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Încheiere (opțional)</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ? formatDateForInput(field.value) : ''}
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="total_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valoare Totală (RON)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button
            type="button"
            onClick={handleGenerateContract}
            disabled={isGenerating}
            variant="outline"
            className="w-full"
          >
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generează Contract cu AI
          </Button>
        </div>

        {generatedContract && (
          <div className="space-y-2">
            <FormLabel>Contract Generat</FormLabel>
            <Textarea
              value={generatedContract}
              onChange={(e) => setGeneratedContract(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Termeni și Condiții</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clauses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clauze Speciale</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Salvează Contract
        </Button>
      </form>
    </Form>
  );
}
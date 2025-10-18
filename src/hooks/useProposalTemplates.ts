import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ProposalTemplateFormData } from "@/schemas/proposalTemplateSchema";

export interface ProposalTemplate {
  id: string;
  name: string;
  description?: string;
  business_type?: string;
  automation_needs_template?: string;
  timeframe_template?: string;
  default_price?: number;
  proposal_structure?: string;
  code_snippets?: string;
  created_at: string;
  updated_at: string;
}

export const useProposalTemplates = () => {
  const queryClient = useQueryClient();

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["proposal-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("proposal_templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ProposalTemplate[];
    },
  });

  const createTemplate = useMutation({
    mutationFn: async (data: ProposalTemplateFormData) => {
      const { error } = await supabase
        .from("proposal_templates")
        .insert([{
          name: data.name,
          description: data.description,
          business_type: data.business_type,
          automation_needs_template: data.automation_needs_template,
          timeframe_template: data.timeframe_template,
          default_price: data.default_price,
          proposal_structure: data.proposal_structure,
          code_snippets: data.code_snippets,
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal-templates"] });
      toast({
        title: "Success",
        description: "Template creat cu succes!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Eroare la crearea template-ului: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateTemplate = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProposalTemplateFormData }) => {
      const { error } = await supabase
        .from("proposal_templates")
        .update({
          name: data.name,
          description: data.description,
          business_type: data.business_type,
          automation_needs_template: data.automation_needs_template,
          timeframe_template: data.timeframe_template,
          default_price: data.default_price,
          proposal_structure: data.proposal_structure,
          code_snippets: data.code_snippets,
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal-templates"] });
      toast({
        title: "Success",
        description: "Template actualizat cu succes!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Eroare la actualizarea template-ului: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteTemplate = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("proposal_templates")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposal-templates"] });
      toast({
        title: "Success",
        description: "Template șters cu succes!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Eroare la ștergerea template-ului: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    templates,
    isLoading,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  };
};

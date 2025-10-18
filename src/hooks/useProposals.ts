import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ProposalFormData } from '@/schemas/proposalSchema';

export interface Proposal {
  id: string;
  business_name: string;
  business_description: string;
  automation_needs: string;
  timeframe: string;
  price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useProposals() {
  const queryClient = useQueryClient();

  const { data: proposals = [], isLoading } = useQuery({
    queryKey: ['proposals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Proposal[];
    },
  });

  const createProposal = useMutation({
    mutationFn: async (proposalData: ProposalFormData) => {
      const { data, error } = await supabase
        .from('proposals')
        .insert({
          business_name: proposalData.business_name,
          business_description: proposalData.business_description,
          automation_needs: proposalData.automation_needs,
          timeframe: proposalData.timeframe,
          price: proposalData.price,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast({
        title: 'Succes',
        description: 'Propunerea a fost creată cu succes',
      });
    },
    onError: (error) => {
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la crearea propunerii',
        variant: 'destructive',
      });
      console.error('Error creating proposal:', error);
    },
  });

  const updateProposal = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProposalFormData }) => {
      const { error } = await supabase
        .from('proposals')
        .update({
          business_name: data.business_name,
          business_description: data.business_description,
          automation_needs: data.automation_needs,
          timeframe: data.timeframe,
          price: data.price,
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast({
        title: 'Succes',
        description: 'Propunerea a fost actualizată cu succes',
      });
    },
    onError: (error) => {
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la actualizarea propunerii',
        variant: 'destructive',
      });
      console.error('Error updating proposal:', error);
    },
  });

  const deleteProposal = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('proposals').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast({
        title: 'Succes',
        description: 'Propunerea a fost ștearsă cu succes',
      });
    },
    onError: (error) => {
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la ștergerea propunerii',
        variant: 'destructive',
      });
      console.error('Error deleting proposal:', error);
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('proposals')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast({
        title: 'Succes',
        description: 'Statusul propunerii a fost actualizat',
      });
    },
    onError: (error) => {
      toast({
        title: 'Eroare',
        description: 'A apărut o eroare la actualizarea statusului',
        variant: 'destructive',
      });
      console.error('Error updating status:', error);
    },
  });

  return {
    proposals,
    isLoading,
    createProposal,
    updateProposal,
    deleteProposal,
    updateStatus,
  };
}

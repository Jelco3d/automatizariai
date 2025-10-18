import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Contract {
  id: string;
  client_id: string;
  proposal_id?: string;
  contract_number: string;
  contract_type: string;
  start_date: string;
  end_date?: string;
  total_value: number;
  status: 'draft' | 'pending' | 'active' | 'expired' | 'terminated' | 'signed';
  terms?: string;
  clauses?: string;
  generated_contract?: string;
  signature_token?: string;
  signature_link_expires_at?: string;
  provider_signed_at?: string;
  provider_signature_data?: string;
  provider_signature_name?: string;
  client_signed_at?: string;
  client_signature_data?: string;
  client_signature_name?: string;
  fully_signed_at?: string;
  created_at: string;
  updated_at: string;
  clients?: {
    name: string;
    cui?: string;
    email: string;
  };
}

export const useContracts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contracts, isLoading, refetch } = useQuery({
    queryKey: ['contracts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          clients (
            name,
            cui,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Contract[];
    },
  });

  const createContract = useMutation({
    mutationFn: async (contractData: any) => {
      const { data, error } = await supabase
        .from('contracts')
        .insert([contractData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Contract creat',
        description: 'Contractul a fost creat cu succes.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Eroare',
        description: `Nu s-a putut crea contractul: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const updateContract = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Contract> & { id: string }) => {
      const { data, error } = await supabase
        .from('contracts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Contract actualizat',
        description: 'Contractul a fost actualizat cu succes.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Eroare',
        description: `Nu s-a putut actualiza contractul: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const deleteContract = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contracts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Contract șters',
        description: 'Contractul a fost șters cu succes.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Eroare',
        description: `Nu s-a putut șterge contractul: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Contract['status'] }) => {
      const { data, error } = await supabase
        .from('contracts')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Status actualizat',
        description: 'Statusul contractului a fost actualizat.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Eroare',
        description: `Nu s-a putut actualiza statusul: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const generateSignatureLink = useMutation({
    mutationFn: async (contractId: string) => {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

      const { data, error } = await supabase
        .from('contracts')
        .update({
          signature_link_expires_at: expiresAt.toISOString(),
        })
        .eq('id', contractId)
        .select('signature_token')
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Link generat',
        description: 'Link-ul pentru semnare a fost generat cu succes.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Eroare',
        description: `Nu s-a putut genera link-ul: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  return {
    contracts,
    isLoading,
    refetch,
    createContract: createContract.mutate,
    updateContract: updateContract.mutate,
    deleteContract: deleteContract.mutate,
    updateStatus: updateStatus.mutate,
    generateSignatureLink: generateSignatureLink.mutateAsync,
  };
};
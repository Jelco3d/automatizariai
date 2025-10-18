-- Add generated_contract and proposal_id fields to contracts table
ALTER TABLE public.contracts
ADD COLUMN generated_contract TEXT,
ADD COLUMN proposal_id UUID REFERENCES public.proposals(id) ON DELETE SET NULL;

-- Create index for faster lookups by proposal
CREATE INDEX idx_contracts_proposal_id ON public.contracts(proposal_id);
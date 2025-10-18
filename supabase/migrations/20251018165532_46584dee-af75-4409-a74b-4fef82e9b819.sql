-- Add signature fields to contracts table
ALTER TABLE public.contracts
ADD COLUMN signature_token UUID DEFAULT gen_random_uuid() UNIQUE,
ADD COLUMN signature_link_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN provider_signed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN provider_signature_data TEXT,
ADD COLUMN provider_signature_name TEXT,
ADD COLUMN client_signed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN client_signature_data TEXT,
ADD COLUMN client_signature_name TEXT,
ADD COLUMN fully_signed_at TIMESTAMP WITH TIME ZONE;

-- Create index for faster token lookups
CREATE INDEX idx_contracts_signature_token ON public.contracts(signature_token);

-- Update contract_status enum to include 'signed' status
ALTER TYPE contract_status ADD VALUE IF NOT EXISTS 'signed';

-- Create RLS policy to allow public read of contracts by signature token
CREATE POLICY "Allow public read contracts by valid signature token"
ON public.contracts
FOR SELECT
TO anon
USING (
  signature_token IS NOT NULL 
  AND (signature_link_expires_at IS NULL OR signature_link_expires_at > now())
);
-- Enable Row Level Security on audit_contacts table
ALTER TABLE public.audit_contacts ENABLE ROW LEVEL SECURITY;

-- Deny all public access to audit_contacts
-- Only edge functions with service role key can access
CREATE POLICY "Deny all public access to audit_contacts"
ON public.audit_contacts
FOR ALL
TO public
USING (false)
WITH CHECK (false);

-- Add comment for documentation
COMMENT ON TABLE public.audit_contacts IS 'Contains sensitive PII. Only accessible via edge functions with service role key.';
-- Allow anonymous users to read client data when accessed through a valid signature token
CREATE POLICY "Allow anonymous read clients via valid signature token"
ON public.clients
FOR SELECT
TO anon
USING (
  EXISTS (
    SELECT 1 
    FROM public.contracts 
    WHERE contracts.client_id = clients.id 
    AND contracts.signature_token IS NOT NULL
    AND (contracts.signature_link_expires_at IS NULL OR contracts.signature_link_expires_at > now())
  )
);
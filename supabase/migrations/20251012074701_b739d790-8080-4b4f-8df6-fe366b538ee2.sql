-- Create table for storing contacts who request the audit report
CREATE TABLE public.audit_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.audit_sessions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  report_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.audit_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies to deny public access (only edge functions can access)
CREATE POLICY "Deny public delete access to audit_contacts" 
ON public.audit_contacts 
FOR DELETE 
TO PUBLIC
USING (false);

CREATE POLICY "Deny public insert to audit_contacts" 
ON public.audit_contacts 
FOR INSERT 
TO PUBLIC
WITH CHECK (false);

CREATE POLICY "Deny public read access to audit_contacts" 
ON public.audit_contacts 
FOR SELECT 
TO PUBLIC
USING (false);

CREATE POLICY "Deny public update access to audit_contacts" 
ON public.audit_contacts 
FOR UPDATE 
TO PUBLIC
USING (false);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_audit_contacts_updated_at
BEFORE UPDATE ON public.audit_contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_audit_contacts_session_id ON public.audit_contacts(session_id);
CREATE INDEX idx_audit_contacts_email ON public.audit_contacts(email);
-- Add company information columns to invoice_templates
ALTER TABLE invoice_templates 
ADD COLUMN company_name text,
ADD COLUMN company_cui text,
ADD COLUMN company_registration text,
ADD COLUMN company_address text,
ADD COLUMN logo_url text;

-- Create storage bucket for invoice logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('invoice-logos', 'invoice-logos', true);

-- RLS policies for invoice-logos bucket
CREATE POLICY "Admins can upload invoice logos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'invoice-logos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update invoice logos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'invoice-logos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete invoice logos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'invoice-logos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Anyone can view invoice logos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'invoice-logos');
-- Create storage bucket for payable invoice PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('payable-invoices-pdfs', 'payable-invoices-pdfs', false);

-- Create storage policies for payable invoices PDFs
CREATE POLICY "Admins can view payable invoice PDFs"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'payable-invoices-pdfs' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can upload payable invoice PDFs"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'payable-invoices-pdfs' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete payable invoice PDFs"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'payable-invoices-pdfs' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Add pdf_file_path column to payable_invoices table
ALTER TABLE public.payable_invoices
ADD COLUMN pdf_file_path TEXT;
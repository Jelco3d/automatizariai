-- Add template_id reference to invoices
ALTER TABLE invoices 
ADD COLUMN template_id uuid REFERENCES invoice_templates(id) ON DELETE SET NULL;

-- Add bank details and city to invoice_templates
ALTER TABLE invoice_templates 
ADD COLUMN bank_name text,
ADD COLUMN bank_account text,
ADD COLUMN company_city text;
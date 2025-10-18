-- Create invoice_templates table
CREATE TABLE public.invoice_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  payment_terms TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoice_template_items table
CREATE TABLE public.invoice_template_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID NOT NULL REFERENCES public.invoice_templates(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  vat_rate NUMERIC NOT NULL DEFAULT 19
);

-- Enable RLS
ALTER TABLE public.invoice_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_template_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for invoice_templates
CREATE POLICY "Admins can view all invoice templates"
ON public.invoice_templates
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert invoice templates"
ON public.invoice_templates
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update invoice templates"
ON public.invoice_templates
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete invoice templates"
ON public.invoice_templates
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for invoice_template_items
CREATE POLICY "Admins can view invoice template items"
ON public.invoice_template_items
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert invoice template items"
ON public.invoice_template_items
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update invoice template items"
ON public.invoice_template_items
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete invoice template items"
ON public.invoice_template_items
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_invoice_templates_updated_at
BEFORE UPDATE ON public.invoice_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
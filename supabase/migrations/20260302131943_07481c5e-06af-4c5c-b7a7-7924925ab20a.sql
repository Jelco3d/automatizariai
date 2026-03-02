
-- Create table for leadmagnet audit strategic form data
CREATE TABLE public."leadmagnet-audit-strategic" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  company_name text NOT NULL,
  business_type text,
  business_type_other text,
  team_size text,
  revenue text,
  excel_count text,
  platforms jsonb,
  platforms_other text,
  time_lost text,
  frustrations text,
  impact_scale integer,
  weekly_quotes text,
  daily_interactions text,
  motivation text,
  budget text,
  source text DEFAULT 'audit-form-modal',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public."leadmagnet-audit-strategic" ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert (visitors filling the form)
CREATE POLICY "Allow public insert"
ON public."leadmagnet-audit-strategic"
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admin can select
CREATE POLICY "Admins can view leads"
ON public."leadmagnet-audit-strategic"
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can update
CREATE POLICY "Admins can update leads"
ON public."leadmagnet-audit-strategic"
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete
CREATE POLICY "Admins can delete leads"
ON public."leadmagnet-audit-strategic"
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

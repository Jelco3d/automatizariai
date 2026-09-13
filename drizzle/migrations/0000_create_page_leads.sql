CREATE TABLE public.page_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  source text NOT NULL DEFAULT 'unknown',
  source_path text,
  extra jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.page_leads TO authenticated;
GRANT ALL ON public.page_leads TO service_role;
GRANT INSERT ON public.page_leads TO anon, authenticated;

ALTER TABLE public.page_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
ON public.page_leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads"
ON public.page_leads FOR SELECT
TO authenticated
USING (true);

CREATE INDEX idx_page_leads_created_at ON public.page_leads (created_at DESC);
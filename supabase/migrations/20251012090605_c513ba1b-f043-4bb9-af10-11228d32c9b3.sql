-- Add new classification fields to audit_insights table
ALTER TABLE public.audit_insights
ADD COLUMN IF NOT EXISTS industry text,
ADD COLUMN IF NOT EXISTS company_maturity text,
ADD COLUMN IF NOT EXISTS automation_readiness_score integer,
ADD COLUMN IF NOT EXISTS priority_recommendations jsonb DEFAULT '[]'::jsonb;
-- Add code_snippets field to proposal_templates table
ALTER TABLE public.proposal_templates 
ADD COLUMN code_snippets TEXT;
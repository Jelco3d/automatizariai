-- Add unique constraint on session_id in audit_insights table
ALTER TABLE public.audit_insights
ADD CONSTRAINT audit_insights_session_id_key UNIQUE (session_id);
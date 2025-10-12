-- Create public storage bucket for audit reports
INSERT INTO storage.buckets (id, name, public)
VALUES ('audit-reports', 'audit-reports', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policy for public read access to audit reports
CREATE POLICY "Public Access to Audit Reports"
ON storage.objects FOR SELECT
USING (bucket_id = 'audit-reports');

-- RLS Policy for service role upload
CREATE POLICY "Service Role Upload to Audit Reports"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'audit-reports' AND auth.role() = 'service_role');
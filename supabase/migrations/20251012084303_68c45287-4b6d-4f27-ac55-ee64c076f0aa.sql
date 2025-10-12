-- Create public storage bucket for audit reports (skip if exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('audit-reports', 'audit-reports', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access to Audit Reports" ON storage.objects;
DROP POLICY IF EXISTS "Service Role Upload to Audit Reports" ON storage.objects;

-- RLS Policy for public read access to audit reports
CREATE POLICY "Public Access to Audit Reports"
ON storage.objects FOR SELECT
USING (bucket_id = 'audit-reports');

-- RLS Policy for service role upload
CREATE POLICY "Service Role Upload to Audit Reports"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'audit-reports');
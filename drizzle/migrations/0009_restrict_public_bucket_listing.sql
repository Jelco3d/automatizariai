DROP POLICY IF EXISTS "Anyone can view invoice logos" ON storage.objects;
DROP POLICY IF EXISTS "Public Access to Audit Reports" ON storage.objects;
CREATE POLICY "Admins can list invoice logos" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'invoice-logos' AND public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can list audit reports" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'audit-reports' AND public.has_role(auth.uid(), 'admin'::app_role));
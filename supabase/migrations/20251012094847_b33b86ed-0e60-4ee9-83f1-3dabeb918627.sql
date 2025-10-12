-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Deny public insert to audit_contacts" ON audit_contacts;
DROP POLICY IF EXISTS "Deny public read access to audit_contacts" ON audit_contacts;
DROP POLICY IF EXISTS "Deny public update access to audit_contacts" ON audit_contacts;
DROP POLICY IF EXISTS "Deny public delete access to audit_contacts" ON audit_contacts;

-- Since this table contains PII and is only accessed by backend (service role),
-- we keep RLS enabled but don't create any permissive policies.
-- This means only service_role can access it (which is what we want).
-- The service role key used in edge functions bypasses RLS automatically.

-- Just to be explicit, we ensure RLS is enabled
ALTER TABLE audit_contacts ENABLE ROW LEVEL SECURITY;
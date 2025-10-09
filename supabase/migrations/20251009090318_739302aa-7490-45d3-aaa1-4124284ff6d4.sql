-- Properly secure audit tables by blocking direct public reads
-- All data access should go through the edge function which properly filters by session_id

-- ============================================
-- audit_sessions table
-- ============================================

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Users can read own audit sessions" ON audit_sessions;
DROP POLICY IF EXISTS "Users can update own audit sessions" ON audit_sessions;

-- No public read access - only edge function with service role can read
-- This prevents email harvesting via direct database queries

-- Only allow updates through edge function (service role)
-- Remove the public update policy entirely

-- ============================================
-- audit_insights table  
-- ============================================

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Users can read own audit insights" ON audit_insights;
DROP POLICY IF EXISTS "Users can update own audit insights" ON audit_insights;

-- No public read access - only edge function with service role can read
-- This protects business data from competitors

-- ============================================
-- audit_messages table
-- ============================================

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can read own audit messages" ON audit_messages;

-- No public read access - only edge function with service role can read
-- This protects private conversations from unauthorized access

-- Note: INSERT policies remain as "true" to allow the edge function to save data
-- The edge function uses service_role_key which bypasses RLS, so it can still read/update everything
-- But direct queries using the anon key are now blocked
-- Final security lockdown: Block all public INSERT operations
-- Only the edge function (using service role) should be able to write data
-- This prevents database spam attacks

-- ============================================
-- audit_sessions table
-- ============================================

-- Drop the public INSERT policy
DROP POLICY IF EXISTS "Anyone can create audit sessions" ON audit_sessions;

-- Create a deny policy for INSERT
CREATE POLICY "Deny public insert to audit_sessions"
ON audit_sessions
FOR INSERT
WITH CHECK (false);

-- ============================================
-- audit_insights table
-- ============================================

-- Drop the public INSERT policy  
DROP POLICY IF EXISTS "Anyone can create audit insights" ON audit_insights;

-- Create a deny policy for INSERT
CREATE POLICY "Deny public insert to audit_insights"
ON audit_insights
FOR INSERT
WITH CHECK (false);

-- ============================================
-- audit_messages table
-- ============================================

-- Drop the public INSERT policy
DROP POLICY IF EXISTS "Anyone can create audit messages" ON audit_messages;

-- Create a deny policy for INSERT
CREATE POLICY "Deny public insert to audit_messages"
ON audit_messages
FOR INSERT
WITH CHECK (false);

-- RESULT: Now ALL operations (SELECT, INSERT, UPDATE, DELETE) are denied for public
-- Only the edge function using service_role_key can access these tables
-- This provides maximum security while maintaining functionality through the edge function
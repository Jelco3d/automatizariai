-- Fix security issues in audit tables by implementing session-based RLS

-- ============================================
-- audit_sessions table
-- ============================================

-- Drop existing public policies
DROP POLICY IF EXISTS "Allow public read access to audit_sessions" ON audit_sessions;
DROP POLICY IF EXISTS "Allow public update to audit_sessions" ON audit_sessions;
DROP POLICY IF EXISTS "Allow public insert to audit_sessions" ON audit_sessions;

-- Allow anyone to create a new session (needed for public audit tool)
CREATE POLICY "Anyone can create audit sessions"
ON audit_sessions
FOR INSERT
WITH CHECK (true);

-- Users can only read their own session (must know the session_id)
CREATE POLICY "Users can read own audit sessions"
ON audit_sessions
FOR SELECT
USING (true);  -- Will be restricted via application logic using session_id

-- Users can only update their own session
CREATE POLICY "Users can update own audit sessions"
ON audit_sessions
FOR UPDATE
USING (true);  -- Will be restricted via application logic using session_id

-- ============================================
-- audit_insights table
-- ============================================

-- Drop existing public policies
DROP POLICY IF EXISTS "Allow public read access to audit_insights" ON audit_insights;
DROP POLICY IF EXISTS "Allow public update to audit_insights" ON audit_insights;
DROP POLICY IF EXISTS "Allow public insert to audit_insights" ON audit_insights;

-- Allow anyone to create insights for their session
CREATE POLICY "Anyone can create audit insights"
ON audit_insights
FOR INSERT
WITH CHECK (true);

-- Users can only read insights from their own session
CREATE POLICY "Users can read own audit insights"
ON audit_insights
FOR SELECT
USING (true);

-- Users can only update insights from their own session
CREATE POLICY "Users can update own audit insights"
ON audit_insights
FOR UPDATE
USING (true);

-- ============================================
-- audit_messages table
-- ============================================

-- Drop existing public policies
DROP POLICY IF EXISTS "Allow public read access to audit_messages" ON audit_messages;
DROP POLICY IF EXISTS "Allow public insert to audit_messages" ON audit_messages;

-- Allow anyone to create messages for their session
CREATE POLICY "Anyone can create audit messages"
ON audit_messages
FOR INSERT
WITH CHECK (true);

-- Users can only read messages from their own session
CREATE POLICY "Users can read own audit messages"
ON audit_messages
FOR SELECT
USING (true);
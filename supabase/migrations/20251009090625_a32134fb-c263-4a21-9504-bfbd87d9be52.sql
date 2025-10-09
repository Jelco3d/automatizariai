-- Add explicit deny policies for public read access
-- This makes it crystal clear that public users cannot read these tables

-- ============================================
-- audit_sessions table
-- ============================================

-- Explicitly deny public SELECT access
CREATE POLICY "Deny public read access to audit_sessions"
ON audit_sessions
FOR SELECT
USING (false);

-- Explicitly deny public UPDATE access  
CREATE POLICY "Deny public update access to audit_sessions"
ON audit_sessions
FOR UPDATE
USING (false);

-- Explicitly deny public DELETE access
CREATE POLICY "Deny public delete access to audit_sessions"
ON audit_sessions
FOR DELETE
USING (false);

-- ============================================
-- audit_insights table
-- ============================================

-- Explicitly deny public SELECT access
CREATE POLICY "Deny public read access to audit_insights"
ON audit_insights
FOR SELECT
USING (false);

-- Explicitly deny public UPDATE access
CREATE POLICY "Deny public update access to audit_insights"
ON audit_insights
FOR UPDATE
USING (false);

-- Explicitly deny public DELETE access
CREATE POLICY "Deny public delete access to audit_insights"
ON audit_insights
FOR DELETE
USING (false);

-- ============================================
-- audit_messages table
-- ============================================

-- Explicitly deny public SELECT access
CREATE POLICY "Deny public read access to audit_messages"
ON audit_messages
FOR SELECT
USING (false);

-- Explicitly deny public UPDATE access
CREATE POLICY "Deny public update access to audit_messages"
ON audit_messages
FOR UPDATE
USING (false);

-- Explicitly deny public DELETE access
CREATE POLICY "Deny public delete access to audit_messages"
ON audit_messages
FOR DELETE
USING (false);
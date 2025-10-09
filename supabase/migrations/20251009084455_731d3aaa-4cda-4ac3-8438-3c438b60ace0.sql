-- Create audit_sessions table
CREATE TABLE public.audit_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  user_email TEXT
);

-- Create audit_messages table
CREATE TABLE public.audit_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.audit_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create audit_insights table
CREATE TABLE public.audit_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.audit_sessions(id) ON DELETE CASCADE,
  business_type TEXT,
  business_description TEXT,
  target_audience TEXT,
  team_size TEXT,
  painpoints JSONB DEFAULT '[]'::jsonb,
  desired_solutions JSONB DEFAULT '[]'::jsonb,
  tools_used JSONB DEFAULT '[]'::jsonb,
  goals JSONB DEFAULT '[]'::jsonb,
  ai_recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_audit_messages_session_id ON public.audit_messages(session_id);
CREATE INDEX idx_audit_insights_session_id ON public.audit_insights(session_id);
CREATE INDEX idx_audit_sessions_created_at ON public.audit_sessions(created_at DESC);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_audit_sessions_updated_at
  BEFORE UPDATE ON public.audit_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audit_insights_updated_at
  BEFORE UPDATE ON public.audit_insights
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security (but make tables publicly accessible)
ALTER TABLE public.audit_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_insights ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
CREATE POLICY "Allow public read access to audit_sessions"
  ON public.audit_sessions FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to audit_sessions"
  ON public.audit_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to audit_sessions"
  ON public.audit_sessions FOR UPDATE
  USING (true);

CREATE POLICY "Allow public read access to audit_messages"
  ON public.audit_messages FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to audit_messages"
  ON public.audit_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read access to audit_insights"
  ON public.audit_insights FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to audit_insights"
  ON public.audit_insights FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to audit_insights"
  ON public.audit_insights FOR UPDATE
  USING (true);
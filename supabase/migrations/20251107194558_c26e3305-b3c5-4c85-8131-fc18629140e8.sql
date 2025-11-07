-- Create table for AI-generated business insights
CREATE TABLE IF NOT EXISTS public.business_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  insights JSONB NOT NULL,
  summary TEXT NOT NULL,
  metrics JSONB,
  recommendations TEXT[],
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_insights ENABLE ROW LEVEL SECURITY;

-- Users can view their own insights
CREATE POLICY "Users can view their own insights" 
ON public.business_insights 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_business_insights_user_id ON public.business_insights(user_id);
CREATE INDEX idx_business_insights_created_at ON public.business_insights(created_at DESC);
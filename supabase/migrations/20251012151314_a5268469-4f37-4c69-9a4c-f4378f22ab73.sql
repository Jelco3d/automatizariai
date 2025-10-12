-- Fix security issues and configure webhook URL

-- Create settings table to store webhook URL
CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on app_settings
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Deny all public access to app_settings
CREATE POLICY "Deny all public access to app_settings" ON app_settings FOR ALL USING (false);

-- Insert n8n webhook URL
INSERT INTO app_settings (key, value) 
VALUES ('n8n_webhook_url', 'https://n8n.srv1055552.hstgr.cloud/webhook-test/4cd0dce5-2f3f-42ed-9c56-22f3a0f0431a')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Recreate function with search_path set for security
CREATE OR REPLACE FUNCTION notify_n8n_on_insights_change()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT;
  request_id BIGINT;
BEGIN
  -- Get webhook URL from app_settings
  SELECT value INTO webhook_url 
  FROM app_settings 
  WHERE key = 'n8n_webhook_url';
  
  -- If webhook URL is configured, send the data
  IF webhook_url IS NOT NULL AND webhook_url != '' THEN
    -- Make async HTTP POST request to n8n webhook
    SELECT net.http_post(
      url := webhook_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'session_id', NEW.session_id,
        'insights', row_to_json(NEW),
        'event_type', TG_OP,
        'timestamp', NOW()
      )
    ) INTO request_id;
    
    RAISE LOG 'Sent insights to n8n, request_id: %, session_id: %', request_id, NEW.session_id;
  ELSE
    RAISE LOG 'N8N webhook URL not configured';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
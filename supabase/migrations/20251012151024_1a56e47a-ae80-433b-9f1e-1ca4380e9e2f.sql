-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to send insights to n8n webhook
CREATE OR REPLACE FUNCTION notify_n8n_on_insights_change()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT;
  request_id BIGINT;
BEGIN
  -- Get webhook URL from vault or use environment variable
  -- Note: The actual webhook URL will be provided via Supabase secrets
  webhook_url := current_setting('app.settings.n8n_webhook_url', true);
  
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
    
    RAISE LOG 'Sent insights to n8n, request_id: %', request_id;
  ELSE
    RAISE LOG 'N8N webhook URL not configured';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for INSERT and UPDATE on audit_insights
DROP TRIGGER IF EXISTS trigger_notify_n8n_on_insights_change ON audit_insights;

CREATE TRIGGER trigger_notify_n8n_on_insights_change
  AFTER INSERT OR UPDATE ON audit_insights
  FOR EACH ROW
  EXECUTE FUNCTION notify_n8n_on_insights_change();

-- Grant necessary permissions for pg_net
GRANT USAGE ON SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA net TO postgres, anon, authenticated, service_role;
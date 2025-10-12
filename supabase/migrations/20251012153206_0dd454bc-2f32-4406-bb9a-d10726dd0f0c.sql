-- Update n8n webhook URL from test to production
UPDATE app_settings
SET value = 'https://n8n.srv1055552.hstgr.cloud/webhook/4cd0dce5-2f3f-42ed-9c56-22f3a0f0431a',
    updated_at = now()
WHERE key = 'n8n_webhook_url';
-- Add provider_name column to contracts table
ALTER TABLE contracts ADD COLUMN IF NOT EXISTS provider_name TEXT DEFAULT 'Unison Loge Fx SRL';

-- Update existing contracts to have provider name
UPDATE contracts SET provider_name = 'Unison Loge Fx SRL' WHERE provider_name IS NULL;
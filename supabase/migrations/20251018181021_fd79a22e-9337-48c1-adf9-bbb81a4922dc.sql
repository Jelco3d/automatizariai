-- Add status column to clients table
ALTER TABLE public.clients 
ADD COLUMN status TEXT NOT NULL DEFAULT 'active';

-- Add comment to explain the column
COMMENT ON COLUMN public.clients.status IS 'Client status: active (client activ), prospect (potential client), inactive (client inactiv)';

-- Create index for better query performance
CREATE INDEX idx_clients_status ON public.clients(status);
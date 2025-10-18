-- Add vat_rate column to quote_items table
ALTER TABLE quote_items 
ADD COLUMN vat_rate NUMERIC NOT NULL DEFAULT 19.00;
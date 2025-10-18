-- Add generated_proposal column to proposals table
ALTER TABLE proposals 
ADD COLUMN generated_proposal TEXT;
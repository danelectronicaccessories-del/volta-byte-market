-- Add condition field to products table for new/refurbished
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_condition') THEN
    CREATE TYPE product_condition AS ENUM ('new', 'refurbished');
  END IF;
END $$;

ALTER TABLE products ADD COLUMN IF NOT EXISTS condition product_condition DEFAULT 'new';
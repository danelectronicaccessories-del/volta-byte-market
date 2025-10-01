-- Add new product categories: TVs and Fridges
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'tvs';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'fridges';

-- Add brand column to products table for filtering
ALTER TABLE products ADD COLUMN IF NOT EXISTS brand TEXT;

-- Create index for better search performance
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_name ON products USING gin(to_tsvector('english', name));
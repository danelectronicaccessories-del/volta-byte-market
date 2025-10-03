-- Insert sample TV products
INSERT INTO products (name, description, price, original_price, category, brand, stock_quantity, is_featured, discount_percentage, rating, review_count, image_url, condition)
VALUES
  ('Samsung 65" QLED 4K Smart TV', 'Quantum Dot technology with HDR and smart features', 1299.99, 1799.99, 'tvs', 'Samsung', 25, false, 28, 4.7, 342, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500', 'new'),
  ('LG 55" OLED 4K Smart TV', 'Perfect blacks with self-lit pixels and AI processing', 1499.99, 1999.99, 'tvs', 'LG', 18, false, 25, 4.8, 567, 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500', 'new'),
  ('Sony 75" LED 4K Smart TV', 'Large screen with X1 processor and Google TV', 1899.99, 2499.99, 'tvs', 'Sony', 12, false, 24, 4.6, 289, 'https://images.unsplash.com/photo-1593359863503-7f37c8b2c5f7?w=500', 'new'),
  ('TCL 43" Roku Smart TV', 'Budget-friendly smart TV with built-in Roku', 299.99, 449.99, 'tvs', 'TCL', 45, false, 33, 4.4, 456, 'https://images.unsplash.com/photo-1571382095-0e2530c0f750?w=500', 'new'),
  ('Hisense 50" 4K Android TV', 'Android TV with Dolby Vision and voice control', 449.99, 599.99, 'tvs', 'Hisense', 30, false, 25, 4.5, 234, 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500', 'new');

-- Insert sample Fridge products
INSERT INTO products (name, description, price, original_price, category, brand, stock_quantity, is_featured, discount_percentage, rating, review_count, image_url, condition)
VALUES
  ('Samsung French Door Refrigerator 28 cu ft', 'Smart refrigerator with Family Hub and FlexZone', 2499.99, 2999.99, 'fridges', 'Samsung', 15, false, 17, 4.7, 445, 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500', 'new'),
  ('LG Side-by-Side Refrigerator 26 cu ft', 'InstaView Door-in-Door with dual ice makers', 1999.99, 2499.99, 'fridges', 'LG', 20, false, 20, 4.6, 338, 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500', 'new'),
  ('Whirlpool Top Freezer 18 cu ft', 'Classic design with adjustable shelves and crisper', 899.99, 1199.99, 'fridges', 'Whirlpool', 35, false, 25, 4.5, 567, 'https://images.unsplash.com/photo-1565183928294-7d22ca9609c5?w=500', 'new'),
  ('GE Bottom Freezer 21 cu ft', 'Energy efficient with LED lighting and spill-proof shelves', 1299.99, 1599.99, 'fridges', 'GE', 28, false, 19, 4.6, 412, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500', 'new'),
  ('Frigidaire Compact Refrigerator 4.5 cu ft', 'Perfect for dorms, offices, or small apartments', 249.99, 349.99, 'fridges', 'Frigidaire', 50, false, 29, 4.4, 289, 'https://images.unsplash.com/photo-1622616651788-1f61a4d3eea5?w=500', 'new');
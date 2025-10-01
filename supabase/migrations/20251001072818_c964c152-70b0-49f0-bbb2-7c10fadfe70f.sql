-- Insert mock products for all categories

-- Phones
INSERT INTO public.products (name, description, price, original_price, category, image_url, stock_quantity, rating, review_count, discount_percentage, is_featured) VALUES
('iPhone 15 Pro Max', 'Latest flagship iPhone with A17 Pro chip and titanium design', 1299.99, 1499.99, 'phones', 'https://images.unsplash.com/photo-1592286927505-4d13c0eb89a5?w=500', 50, 4.8, 342, 13, true),
('Samsung Galaxy S24 Ultra', 'Premium Android phone with S Pen and 200MP camera', 1199.99, 1399.99, 'phones', 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500', 45, 4.7, 289, 14, true),
('Google Pixel 8 Pro', 'Best Android camera phone with AI features', 899.99, 999.99, 'phones', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500', 60, 4.6, 198, 10, false),
('OnePlus 12', 'Fast charging flagship with 120Hz display', 699.99, 799.99, 'phones', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', 40, 4.5, 156, 12, false),
('Xiaomi 14 Pro', 'Flagship phone with Leica camera system', 649.99, 749.99, 'phones', 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500', 35, 4.4, 134, 13, false);

-- Phone Spares
INSERT INTO public.products (name, description, price, original_price, category, image_url, stock_quantity, rating, review_count, discount_percentage, is_featured) VALUES
('iPhone 15 Pro Screen Protector', 'Tempered glass screen protector with 9H hardness', 19.99, 29.99, 'phone_spares', 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500', 200, 4.6, 89, 33, false),
('Universal Phone Case', 'Shockproof silicone case for most smartphones', 14.99, 24.99, 'phone_spares', 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500', 150, 4.4, 67, 40, false),
('USB-C Fast Charger 65W', 'Quick charge adapter with multiple ports', 34.99, 49.99, 'phone_spares', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500', 120, 4.7, 234, 30, true),
('Wireless Charging Pad', '15W Qi wireless charger with cooling fan', 29.99, 39.99, 'phone_spares', 'https://images.unsplash.com/photo-1591290619762-c588f0aa11e1?w=500', 100, 4.5, 145, 25, false),
('Phone Ring Holder', 'Magnetic ring stand with 360° rotation', 9.99, 14.99, 'phone_spares', 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500', 250, 4.3, 78, 33, false);

-- Laptops
INSERT INTO public.products (name, description, price, original_price, category, image_url, stock_quantity, rating, review_count, discount_percentage, is_featured) VALUES
('MacBook Pro 16" M3', 'Professional laptop with M3 Pro chip and stunning display', 2499.99, 2799.99, 'laptops', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', 30, 4.9, 456, 11, true),
('Dell XPS 15', 'Premium Windows laptop with 4K OLED display', 1899.99, 2199.99, 'laptops', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500', 25, 4.7, 312, 14, true),
('ThinkPad X1 Carbon', 'Business laptop with military-grade durability', 1599.99, 1899.99, 'laptops', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500', 40, 4.6, 267, 16, false),
('ASUS ROG Zephyrus G14', 'Gaming laptop with RTX 4060 and Ryzen 9', 1499.99, 1799.99, 'laptops', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500', 20, 4.7, 189, 17, false),
('HP Spectre x360', 'Convertible laptop with touchscreen', 1299.99, 1599.99, 'laptops', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500', 35, 4.5, 198, 19, false);

-- Accessories
INSERT INTO public.products (name, description, price, original_price, category, image_url, stock_quantity, rating, review_count, discount_percentage, is_featured) VALUES
('Logitech MX Master 3S', 'Premium wireless mouse with ergonomic design', 99.99, 129.99, 'accessories', 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500', 80, 4.8, 567, 23, true),
('Mechanical Keyboard RGB', 'Gaming keyboard with Cherry MX switches', 149.99, 199.99, 'accessories', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500', 60, 4.6, 423, 25, false),
('USB-C Hub 7-in-1', 'Multi-port adapter for laptops', 49.99, 69.99, 'accessories', 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500', 100, 4.5, 234, 29, false),
('Laptop Stand Aluminum', 'Adjustable ergonomic laptop riser', 39.99, 59.99, 'accessories', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', 75, 4.4, 189, 33, false),
('Webcam 4K', 'Professional streaming camera with auto-focus', 89.99, 119.99, 'accessories', 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500', 45, 4.7, 312, 25, false);

-- Smart Devices
INSERT INTO public.products (name, description, price, original_price, category, image_url, stock_quantity, rating, review_count, discount_percentage, is_featured) VALUES
('Amazon Echo Dot 5th Gen', 'Smart speaker with Alexa voice control', 49.99, 59.99, 'smart_devices', 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500', 150, 4.5, 678, 17, true),
('Google Nest Hub Max', 'Smart display with Google Assistant', 199.99, 229.99, 'smart_devices', 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500', 50, 4.6, 345, 13, false),
('Philips Hue Starter Kit', 'Smart LED bulbs with color changing', 129.99, 179.99, 'smart_devices', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', 70, 4.7, 456, 28, false),
('Ring Video Doorbell', 'Smart doorbell with HD video and motion detection', 99.99, 129.99, 'smart_devices', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500', 60, 4.5, 289, 23, false),
('Smart Thermostat', 'Wi-Fi enabled temperature control system', 149.99, 199.99, 'smart_devices', 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=500', 40, 4.4, 167, 25, false);

-- Audio
INSERT INTO public.products (name, description, price, original_price, category, image_url, stock_quantity, rating, review_count, discount_percentage, is_featured) VALUES
('Sony WH-1000XM5', 'Premium noise-cancelling headphones', 379.99, 429.99, 'audio', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500', 65, 4.9, 892, 12, true),
('AirPods Pro 2nd Gen', 'Apple wireless earbuds with ANC', 249.99, 279.99, 'audio', 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500', 100, 4.8, 734, 11, true),
('JBL Flip 6', 'Portable Bluetooth speaker waterproof', 99.99, 129.99, 'audio', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500', 90, 4.6, 456, 23, false),
('Bose QuietComfort 45', 'Comfortable noise-cancelling headphones', 299.99, 349.99, 'audio', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500', 55, 4.7, 567, 14, false),
('Soundbar 5.1 Surround', 'Home theater sound system with subwoofer', 349.99, 449.99, 'audio', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500', 30, 4.5, 289, 22, false);

-- Gaming
INSERT INTO public.products (name, description, price, original_price, category, image_url, stock_quantity, rating, review_count, discount_percentage, is_featured) VALUES
('PlayStation 5', 'Next-gen gaming console with 4K gaming', 499.99, 549.99, 'gaming', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500', 40, 4.9, 1234, 9, true),
('Xbox Series X', 'Powerful gaming console with Game Pass', 499.99, 549.99, 'gaming', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500', 35, 4.8, 987, 9, true),
('Gaming Monitor 27" 144Hz', 'Fast refresh rate display for competitive gaming', 299.99, 399.99, 'gaming', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500', 50, 4.7, 456, 25, false),
('RGB Gaming Chair', 'Ergonomic chair with lumbar support', 249.99, 349.99, 'gaming', 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500', 25, 4.5, 234, 29, false),
('Gaming Headset 7.1', 'Surround sound headset with RGB lighting', 79.99, 119.99, 'gaming', 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500', 80, 4.6, 345, 33, false);

-- Cameras
INSERT INTO public.products (name, description, price, original_price, category, image_url, stock_quantity, rating, review_count, discount_percentage, is_featured) VALUES
('Canon EOS R6 Mark II', 'Professional mirrorless camera with 24MP sensor', 2499.99, 2799.99, 'cameras', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500', 20, 4.8, 267, 11, true),
('Sony A7 IV', 'Full-frame hybrid camera for photo and video', 2299.99, 2599.99, 'cameras', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500', 25, 4.9, 345, 12, true),
('Nikon Z6 III', 'Versatile mirrorless camera with 4K 60fps', 1999.99, 2399.99, 'cameras', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500', 18, 4.7, 198, 17, false),
('GoPro Hero 12', 'Action camera with 5.3K video recording', 399.99, 499.99, 'cameras', 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500', 60, 4.6, 567, 20, false),
('DJI Mini 4 Pro', 'Compact drone with 4K camera', 759.99, 899.99, 'cameras', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500', 30, 4.8, 423, 16, false);

-- Wearables
INSERT INTO public.products (name, description, price, original_price, category, image_url, stock_quantity, rating, review_count, discount_percentage, is_featured) VALUES
('Apple Watch Series 9', 'Advanced smartwatch with health tracking', 399.99, 449.99, 'wearables', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500', 70, 4.8, 789, 11, true),
('Samsung Galaxy Watch 6', 'Android smartwatch with fitness features', 299.99, 349.99, 'wearables', 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=500', 60, 4.6, 456, 14, false),
('Fitbit Charge 6', 'Fitness tracker with heart rate monitoring', 149.99, 179.99, 'wearables', 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500', 100, 4.5, 567, 17, false),
('Garmin Forerunner 965', 'GPS running watch for athletes', 599.99, 699.99, 'wearables', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500', 40, 4.7, 234, 14, false),
('Meta Ray-Ban Smart Glasses', 'Smart glasses with camera and audio', 299.99, 379.99, 'wearables', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500', 50, 4.4, 189, 21, false);
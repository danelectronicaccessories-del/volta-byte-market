-- Fix infinite recursion in profiles policies
-- Drop the problematic admin view policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a new admin view policy without recursion
-- We'll use a direct check on auth.jwt() instead
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  (auth.uid() = id) OR 
  (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
);

-- Fix cart_items policies to avoid recursion
DROP POLICY IF EXISTS "Admins can manage cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Admins can view all cart items" ON public.cart_items;

CREATE POLICY "Admins can manage cart items" 
ON public.cart_items 
FOR ALL 
USING (
  (auth.uid() = user_id) OR 
  (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
);

-- Fix order policies to avoid recursion
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
);

CREATE POLICY "Admins can update orders" 
ON public.orders 
FOR UPDATE 
USING (
  (auth.uid() = user_id) OR 
  (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
);

-- Fix order_items policies
DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;

CREATE POLICY "Admins can view all order items" 
ON public.order_items 
FOR SELECT 
USING (
  (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )) OR 
  (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
);
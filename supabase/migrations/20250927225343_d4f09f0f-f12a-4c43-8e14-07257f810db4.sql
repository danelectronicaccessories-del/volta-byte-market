-- Add admin oversight policies for cart_items to address the security warning
-- This allows authorized staff to view and manage cart items when necessary for customer support

CREATE POLICY "Admins can view all cart items" 
ON public.cart_items 
FOR SELECT 
USING (EXISTS (
  SELECT 1 
  FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'::user_role
));

CREATE POLICY "Admins can manage cart items" 
ON public.cart_items 
FOR ALL 
USING (EXISTS (
  SELECT 1 
  FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'::user_role
));
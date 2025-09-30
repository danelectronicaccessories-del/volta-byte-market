-- Revert the previous policies and implement proper user roles system
-- Drop the policies that reference user_metadata
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;

-- Create a security definer function to check admin role
-- This avoids recursion by using the role column directly from profiles
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'::user_role
  )
$$;

-- Recreate policies using the security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING ((auth.uid() = id) OR public.is_admin());

CREATE POLICY "Admins can manage cart items" 
ON public.cart_items 
FOR ALL 
USING ((auth.uid() = user_id) OR public.is_admin());

CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING ((auth.uid() = user_id) OR public.is_admin());

CREATE POLICY "Admins can update orders" 
ON public.orders 
FOR UPDATE 
USING ((auth.uid() = user_id) OR public.is_admin());

CREATE POLICY "Admins can view all order items" 
ON public.order_items 
FOR SELECT 
USING (
  (EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  )) OR 
  public.is_admin()
);

-- Also update products policy
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

CREATE POLICY "Admins can manage products" 
ON public.products 
FOR ALL 
USING (public.is_admin());
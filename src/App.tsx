import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import Index from "./pages/Index";
import Phones from "./pages/Phones";
import PhoneSpares from "./pages/PhoneSpares";
import Laptops from "./pages/Laptops";
import Accessories from "./pages/Accessories";
import SmartDevices from "./pages/SmartDevices";
import Audio from "./pages/Audio";
import Gaming from "./pages/Gaming";
import Cameras from "./pages/Cameras";
import Wearables from "./pages/Wearables";
import Tvs from "./pages/Tvs";
import Fridges from "./pages/Fridges";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/phones" element={<Phones />} />
              <Route path="/phone-spares" element={<PhoneSpares />} />
              <Route path="/laptops" element={<Laptops />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/smart-devices" element={<SmartDevices />} />
              <Route path="/audio" element={<Audio />} />
              <Route path="/gaming" element={<Gaming />} />
              <Route path="/cameras" element={<Cameras />} />
              <Route path="/wearables" element={<Wearables />} />
              <Route path="/tvs" element={<Tvs />} />
              <Route path="/fridges" element={<Fridges />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/auth" element={<Auth />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

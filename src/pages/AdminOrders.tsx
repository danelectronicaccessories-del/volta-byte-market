import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { 
  Menu, 
  Search, 
  Download,
  Package,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  DollarSign
} from "lucide-react";
import { generateOrderReceipt } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  phone_number: string;
  profiles: {
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
  };
  order_items: Array<{
    id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    product: {
      id: string;
      name: string;
      price: number;
      image_url: string;
    };
  }>;
}

const AdminOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/admin/auth');
      return;
    }
    loadOrders();
  }, [user, navigate]);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          total_amount,
          status,
          shipping_address,
          shipping_city,
          shipping_postal_code,
          phone_number,
          profiles!inner(
            full_name,
            email,
            phone_number,
            address
          ),
          order_items(
            id,
            quantity,
            unit_price,
            total_price,
            product:products(
              id,
              name,
              price,
              image_url
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      console.error('Error loading orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to load orders',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = (order: Order) => {
    try {
      generateOrderReceipt(order);
      toast({
        title: 'Success',
        description: 'Receipt downloaded successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate receipt',
        variant: 'destructive'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.profiles.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.profiles.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-card shadow-sm border-b">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger>
                  <Menu className="w-5 h-5" />
                </SidebarTrigger>
                <h1 className="text-xl font-semibold text-foreground">Order Management</h1>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 bg-muted/30">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleDownloadReceipt(order)}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download Receipt
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Customer & Shipping Info */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Customer Information
                          </h3>
                          <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                              <span className="font-medium">Name:</span>
                              {order.profiles.full_name}
                            </p>
                            <p className="flex items-center gap-2">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {order.profiles.email}
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {order.phone_number}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Shipping Address
                          </h3>
                          <div className="text-sm space-y-1">
                            <p>{order.shipping_address}</p>
                            <p>{order.shipping_city}, {order.shipping_postal_code}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Order Items ({order.order_items.length})
                        </h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                              <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                  {item.product.name}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Qty: {item.quantity} × ${item.unit_price.toFixed(2)}
                                </p>
                                <p className="text-sm font-semibold mt-1">
                                  ${item.total_price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              Total Amount:
                            </span>
                            <span className="text-xl font-bold text-primary">
                              ${order.total_amount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredOrders.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No orders found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminOrders;

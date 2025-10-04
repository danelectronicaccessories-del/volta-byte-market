import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, DollarSign, ShoppingCart, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersByStatus: { status: string; count: number; fill: string }[];
  revenueByMonth: { month: string; revenue: number }[];
  topProducts: { name: string; sales: number }[];
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function AdminAnalytics() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    revenueGrowth: 0,
    ordersByStatus: [],
    revenueByMonth: [],
    topProducts: [],
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/auth');
      return;
    }
    loadAnalytics();
  }, [user, navigate]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*, order_items(*)');

      if (ordersError) throw ordersError;

      // Fetch products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) throw productsError;

      // Calculate analytics
      const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const totalOrders = orders?.length || 0;
      const totalProducts = products?.length || 0;

      // Orders by status
      const statusCounts = orders?.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const ordersByStatus = Object.entries(statusCounts).map(([status, count], index) => ({
        status,
        count,
        fill: COLORS[index % COLORS.length],
      }));

      // Revenue by month (last 6 months)
      const monthlyRevenue = orders?.reduce((acc, order) => {
        const month = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + Number(order.total_amount);
        return acc;
      }, {} as Record<string, number>) || {};

      const revenueByMonth = Object.entries(monthlyRevenue)
        .slice(-6)
        .map(([month, revenue]) => ({ month, revenue }));

      // Top products by sales
      const productSales = orders?.flatMap(order => 
        order.order_items?.map((item: any) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })) || []
      ).reduce((acc, item) => {
        acc[item.product_id] = (acc[item.product_id] || 0) + item.quantity;
        return acc;
      }, {} as Record<string, number>) || {};

      const topProducts = Object.entries(productSales)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([productId, sales]) => {
          const product = products?.find(p => p.id === productId);
          return {
            name: product?.name || 'Unknown',
            sales,
          };
        });

      setAnalytics({
        totalRevenue,
        totalOrders,
        totalProducts,
        revenueGrowth: 12.5, // Mock data
        ordersByStatus,
        revenueByMonth,
        topProducts,
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-card sticky top-0 z-10 flex items-center gap-4 px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh {analytics.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3" /> +{analytics.revenueGrowth}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalOrders}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalProducts}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    KSh {analytics.totalOrders > 0 ? Math.round(analytics.totalRevenue / analytics.totalOrders).toLocaleString() : 0}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Over Time</CardTitle>
                  <CardDescription>Monthly revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analytics.revenueByMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Orders by Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Orders by Status</CardTitle>
                  <CardDescription>Distribution of order statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      count: {
                        label: "Orders",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analytics.ordersByStatus}
                          dataKey="count"
                          nameKey="status"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {analytics.ordersByStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Best performing products by quantity sold</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: {
                      label: "Sales",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.topProducts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" fill="hsl(var(--chart-2))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

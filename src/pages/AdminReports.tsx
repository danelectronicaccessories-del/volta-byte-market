import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type ReportType = 'sales' | 'inventory' | 'users' | 'revenue';
type ReportPeriod = 'week' | 'month' | 'quarter' | 'year';

export default function AdminReports() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState<ReportType>('sales');
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>('month');

  useEffect(() => {
    if (!user) {
      navigate('/admin/auth');
    }
  }, [user, navigate]);

  const generateSalesReport = async () => {
    const { data: orders } = await supabase
      .from('orders')
      .select('*, order_items(*, products(name))')
      .order('created_at', { ascending: false });

    return {
      title: 'Sales Report',
      data: orders || [],
      summary: {
        totalOrders: orders?.length || 0,
        totalRevenue: orders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0,
        avgOrderValue: orders?.length ? (orders.reduce((sum, o) => sum + Number(o.total_amount), 0) / orders.length) : 0,
      }
    };
  };

  const generateInventoryReport = async () => {
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .order('stock_quantity', { ascending: true });

    return {
      title: 'Inventory Report',
      data: products || [],
      summary: {
        totalProducts: products?.length || 0,
        lowStock: products?.filter(p => p.stock_quantity < 10).length || 0,
        outOfStock: products?.filter(p => p.stock_quantity === 0).length || 0,
      }
    };
  };

  const generateUsersReport = async () => {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    return {
      title: 'Users Report',
      data: profiles || [],
      summary: {
        totalUsers: profiles?.length || 0,
        admins: profiles?.filter(p => p.role === 'admin').length || 0,
        regularUsers: profiles?.filter(p => p.role === 'user').length || 0,
      }
    };
  };

  const generateRevenueReport = async () => {
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'delivered')
      .order('created_at', { ascending: false });

    const monthlyRevenue = orders?.reduce((acc, order) => {
      const month = new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      acc[month] = (acc[month] || 0) + Number(order.total_amount);
      return acc;
    }, {} as Record<string, number>) || {};

    return {
      title: 'Revenue Report',
      data: orders || [],
      summary: {
        totalRevenue: orders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0,
        deliveredOrders: orders?.length || 0,
        monthlyBreakdown: monthlyRevenue,
      }
    };
  };

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      
      let reportData;
      switch (reportType) {
        case 'sales':
          reportData = await generateSalesReport();
          break;
        case 'inventory':
          reportData = await generateInventoryReport();
          break;
        case 'users':
          reportData = await generateUsersReport();
          break;
        case 'revenue':
          reportData = await generateRevenueReport();
          break;
      }

      // Generate PDF
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text(reportData.title, 14, 20);
      
      // Add date
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);
      doc.text(`Period: ${reportPeriod}`, 14, 35);
      
      // Add summary
      doc.setFontSize(12);
      doc.text('Summary:', 14, 45);
      
      let yPos = 52;
      Object.entries(reportData.summary).forEach(([key, value]) => {
        if (typeof value === 'object') {
          doc.text(`${key}:`, 14, yPos);
          yPos += 7;
          Object.entries(value).forEach(([k, v]) => {
            doc.text(`  ${k}: ${v}`, 20, yPos);
            yPos += 7;
          });
        } else {
          doc.text(`${key}: ${value}`, 14, yPos);
          yPos += 7;
        }
      });

      // Save PDF
      doc.save(`${reportType}-report-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Success",
        description: "Report generated successfully",
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-card sticky top-0 z-10 flex items-center gap-4 px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold text-foreground">Reports</h1>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Report Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Generate Report</CardTitle>
                  <CardDescription>Select report type and period to generate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Report Type</label>
                      <Select value={reportType} onValueChange={(value) => setReportType(value as ReportType)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales Report</SelectItem>
                          <SelectItem value="inventory">Inventory Report</SelectItem>
                          <SelectItem value="users">Users Report</SelectItem>
                          <SelectItem value="revenue">Revenue Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Period</label>
                      <Select value={reportPeriod} onValueChange={(value) => setReportPeriod(value as ReportPeriod)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Last Week</SelectItem>
                          <SelectItem value="month">Last Month</SelectItem>
                          <SelectItem value="quarter">Last Quarter</SelectItem>
                          <SelectItem value="year">Last Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerateReport} 
                    disabled={loading}
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {loading ? 'Generating...' : 'Generate & Download PDF'}
                  </Button>
                </CardContent>
              </Card>

              {/* Report Types Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Sales Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive sales data including order details, revenue, and trends over the selected period.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Inventory Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Current stock levels, low stock alerts, and product availability status.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Users Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      User registration trends, role distribution, and user activity metrics.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Revenue Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Total revenue, monthly breakdown, and financial performance metrics.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell, Shield, Mail, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    siteName: "TechGear Kenya",
    siteEmail: "admin@techgear.ke",
    supportEmail: "support@techgear.ke",
    enableNotifications: true,
    enableEmailAlerts: true,
    enableOrderConfirmations: true,
    enableLowStockAlerts: true,
    maintenanceMode: false,
    allowGuestCheckout: true,
    requireEmailVerification: false,
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/auth');
    }
  }, [user, navigate]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Here you would save settings to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
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
            <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        General Settings
                      </CardTitle>
                      <CardDescription>Manage basic store settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Store Name</Label>
                        <Input
                          id="siteName"
                          value={settings.siteName}
                          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="siteEmail">Store Email</Label>
                        <Input
                          id="siteEmail"
                          type="email"
                          value={settings.siteEmail}
                          onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="supportEmail">Support Email</Label>
                        <Input
                          id="supportEmail"
                          type="email"
                          value={settings.supportEmail}
                          onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Allow Guest Checkout</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow customers to checkout without creating an account
                          </p>
                        </div>
                        <Switch
                          checked={settings.allowGuestCheckout}
                          onCheckedChange={(checked) => 
                            setSettings({ ...settings, allowGuestCheckout: checked })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notification Settings
                      </CardTitle>
                      <CardDescription>Configure notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive system notifications
                          </p>
                        </div>
                        <Switch
                          checked={settings.enableNotifications}
                          onCheckedChange={(checked) => 
                            setSettings({ ...settings, enableNotifications: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive important updates via email
                          </p>
                        </div>
                        <Switch
                          checked={settings.enableEmailAlerts}
                          onCheckedChange={(checked) => 
                            setSettings({ ...settings, enableEmailAlerts: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Order Confirmations</Label>
                          <p className="text-sm text-muted-foreground">
                            Send email confirmations for new orders
                          </p>
                        </div>
                        <Switch
                          checked={settings.enableOrderConfirmations}
                          onCheckedChange={(checked) => 
                            setSettings({ ...settings, enableOrderConfirmations: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Low Stock Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Alert when products are running low
                          </p>
                        </div>
                        <Switch
                          checked={settings.enableLowStockAlerts}
                          onCheckedChange={(checked) => 
                            setSettings({ ...settings, enableLowStockAlerts: checked })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security Settings
                      </CardTitle>
                      <CardDescription>Manage security and access control</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Require Email Verification</Label>
                          <p className="text-sm text-muted-foreground">
                            Users must verify their email before accessing the store
                          </p>
                        </div>
                        <Switch
                          checked={settings.requireEmailVerification}
                          onCheckedChange={(checked) => 
                            setSettings({ ...settings, requireEmailVerification: checked })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Add an extra layer of security to admin accounts
                        </p>
                        <Button variant="outline">Configure 2FA</Button>
                      </div>

                      <div className="space-y-2">
                        <Label>API Keys</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Manage API keys for integrations
                        </p>
                        <Button variant="outline">Manage API Keys</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Advanced */}
                <TabsContent value="advanced" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Advanced Settings
                      </CardTitle>
                      <CardDescription>Advanced configuration options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Maintenance Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Temporarily disable the store for maintenance
                          </p>
                        </div>
                        <Switch
                          checked={settings.maintenanceMode}
                          onCheckedChange={(checked) => 
                            setSettings({ ...settings, maintenanceMode: checked })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Database Backup</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Create a backup of your database
                        </p>
                        <Button variant="outline">Create Backup</Button>
                      </div>

                      <div className="space-y-2">
                        <Label>Clear Cache</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Clear application cache to improve performance
                        </p>
                        <Button variant="outline">Clear Cache</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Save Button */}
              <div className="flex justify-end mt-6">
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

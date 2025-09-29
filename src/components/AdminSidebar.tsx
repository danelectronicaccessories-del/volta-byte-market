import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  Settings,
  FileText,
  TrendingUp,
  Grid,
  Calendar,
  MessageSquare,
  Home,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const navigationItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const widgetItems = [
  { title: "Charts", url: "/admin/charts", icon: TrendingUp },
  { title: "Widgets", url: "/admin/widgets", icon: Grid },
  { title: "Calendar", url: "/admin/calendar", icon: Calendar },
  { title: "Messages", url: "/admin/messages", icon: MessageSquare },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/auth');
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-sidebar border-r border-sidebar-border`}>
      <SidebarContent className="bg-sidebar">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-semibold text-sm text-sidebar-foreground">Admin Panel</h1>
                <p className="text-xs text-sidebar-foreground/70">v3.0</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            {!collapsed && "Main Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Widgets Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            {!collapsed && "Widgets"}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {widgetItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sign Out */}
        <div className="mt-auto p-2 border-t border-sidebar-border">
          <button
            onClick={handleSignOut}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span className="text-sm">Sign Out</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
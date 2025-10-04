import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Users, UserCheck, UserX, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
  phone_number: string | null;
  city: string | null;
}

export default function AdminUsers() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    users: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/auth');
      return;
    }
    loadUsers();
  }, [user, navigate]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProfiles(data || []);
      setFilteredProfiles(data || []);
      
      // Calculate stats
      const admins = data?.filter(p => p.role === 'admin').length || 0;
      const users = data?.filter(p => p.role === 'user').length || 0;
      
      setStats({
        total: data?.length || 0,
        admins,
        users,
      });
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = profiles.filter(profile => 
        profile.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.city?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProfiles(filtered);
    } else {
      setFilteredProfiles(profiles);
    }
  }, [searchQuery, profiles]);

  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'default' : 'secondary';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b border-border bg-card sticky top-0 z-10 flex items-center gap-4 px-6">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold text-foreground">User Management</h1>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Administrators</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.admins}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
                  <UserX className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.users}</div>
                </CardContent>
              </Card>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage and view all registered users</CardDescription>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by email, name, or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProfiles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-muted-foreground">
                            No users found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredProfiles.map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell className="font-medium">
                              {profile.full_name || 'N/A'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                {profile.email}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={getRoleBadgeVariant(profile.role)}>
                                {profile.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{profile.phone_number || 'N/A'}</TableCell>
                            <TableCell>{profile.city || 'N/A'}</TableCell>
                            <TableCell>
                              {new Date(profile.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

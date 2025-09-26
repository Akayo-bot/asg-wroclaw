import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  FileText, 
  Images, 
  Calendar, 
  Users, 
  UserCog, 
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const AdminLayout = () => {
  const { user, profile, signOut, loading } = useAuth();
  const t = useTranslation();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Show insufficient permissions message
    if (!loading && user && profile && profile.role !== 'admin' && profile.role !== 'editor') {
      toast({
        title: t.errors.insufficientPermissions || 'Insufficient Permissions',
        description: t.errors.adminAccessRequired || 'Admin or Editor access required',
        variant: 'destructive'
      });
    }
  }, [loading, user, profile, toast, t]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect unauthenticated users to auth page with return URL
  if (!user || !profile) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth?returnUrl=${returnUrl}`} replace />;
  }

  // Redirect users without proper role to home with message
  if (profile.role !== 'admin' && profile.role !== 'editor') {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: t.admin.dashboard, path: '/admin' },
    { icon: FileText, label: t.admin.articles, path: '/admin/articles' },
    { icon: Images, label: t.admin.gallery, path: '/admin/gallery' },
    { icon: Calendar, label: t.admin.events, path: '/admin/events' },
    { icon: Users, label: t.admin.team, path: '/admin/team' },
    { icon: UserCog, label: t.admin.users, path: '/admin/users' },
    { icon: BarChart3, label: t.admin.statistics, path: '/admin/stats' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarContent>
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-primary">
                {t.admin.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {profile.display_name}
              </p>
            </div>
            
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto p-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t.auth.logout}
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border flex items-center px-6">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-xl font-semibold">
                {t.admin.title}
              </h1>
            </div>
          </header>

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/contexts/I18nContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Users, 
  Calendar, 
  Eye, 
  TrendingUp,
  Images,
  UserCheck,
  Palette
} from 'lucide-react';

interface AdminStats {
  total_articles: number;
  published_articles: number;
  draft_articles: number;
  total_events: number;
  upcoming_events: number;
  completed_events: number;
  total_users: number;
  admin_users: number;
  editor_users: number;
  regular_users: number;
  total_registrations: number;
  gallery_items: number;
  team_members: number;
}

const AdminDashboard = () => {
  const { t } = useI18n();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.rpc('get_admin_stats');
        if (error) throw error;
        if (data && typeof data === 'object') {
          setStats(data as unknown as AdminStats);
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-8">{t('common.loading', 'Loading...')}</div>;
  }

  if (!stats) {
    return <div className="text-center py-8 text-destructive">{t('common.error', 'Error')}</div>;
  }

  const statCards = [
    {
      title: t('admin.totalArticles', 'Total Articles'),
      value: stats.total_articles,
      subtitle: `${stats.published_articles} ${t('admin.published', 'Published')}, ${stats.draft_articles} ${t('admin.drafts', 'Drafts')}`,
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      title: t('admin.totalUsers', 'Total Users'),
      value: stats.total_users,
      subtitle: `${stats.admin_users} ${t('admin.admins', 'Admins')}, ${stats.editor_users} ${t('admin.editors', 'Editors')}`,
      icon: Users,
      color: 'text-green-600',
    },
    {
      title: t('admin.totalEvents', 'Total Events'),
      value: stats.total_events,
      subtitle: `${stats.upcoming_events} ${t('admin.upcoming', 'Upcoming')}, ${stats.completed_events} ${t('admin.completed', 'Completed')}`,
      icon: Calendar,
      color: 'text-purple-600',
    },
    {
      title: t('admin.totalRegistrations', 'Total Registrations'),
      value: stats.total_registrations,
      subtitle: t('admin.eventRegistrations', 'Event Registrations'),
      icon: UserCheck,
      color: 'text-orange-600',
    },
    {
      title: t('admin.galleryItems', 'Gallery Items'),
      value: stats.gallery_items,
      subtitle: t('admin.photosAndVideos', 'Photos and Videos'),
      icon: Images,
      color: 'text-pink-600',
    },
    {
      title: t('admin.teamMembers', 'Team Members'),
      value: stats.team_members,
      subtitle: t('admin.activeMembers', 'Active Members'),
      icon: TrendingUp,
      color: 'text-cyan-600',
    },
  ];

  const adminActions = [
    {
      title: t('admin.roles.title', 'Role Management'),
      description: t('admin.roles.description', 'Assign roles to users'),
      icon: UserCheck,
      href: '/admin/roles',
      color: 'text-blue-500'
    },
    {
      title: t('admin.branding.title', 'Brand Management'),
      description: t('admin.branding.description', 'Customize site branding and appearance'),
      icon: Palette,
      href: '/admin/branding',
      color: 'text-pink-500'
    },
    {
      title: t('admin.articles.title', 'Articles'),
      description: t('admin.articles.description', 'Create and edit articles'),
      icon: FileText,
      href: '/admin/articles',
      color: 'text-green-500'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('admin.dashboard', 'Dashboard')}</h1>
        <p className="text-muted-foreground">{t('admin.dashboardSubtitle', 'Manage site content and settings')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Actions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminActions.map((action) => (
          <Card key={action.href} className="group hover:shadow-lg transition-shadow">
            <Link to={action.href}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                  {action.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.quickActions', 'Quick Actions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link 
              to="/admin/articles/new" 
              className="block p-3 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span>{t('admin.createArticle', 'Create Article')}</span>
              </div>
            </Link>
            <Link 
              to="/admin/branding" 
              className="block p-3 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-primary" />
                <span>{t('admin.branding.title', 'Brand Management')}</span>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('admin.systemInfo', 'System Info')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t('admin.databaseStatus', 'Database Status')}</span>
                <span className="text-green-600 font-medium">{t('admin.online', 'Online')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('admin.lastBackup', 'Last Backup')}</span>
                <span className="text-muted-foreground">{t('admin.automated', 'Automated')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
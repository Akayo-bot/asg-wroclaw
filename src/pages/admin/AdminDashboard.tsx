import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Users, 
  Calendar, 
  Eye, 
  TrendingUp,
  Images,
  UserCheck
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
  const t = useTranslation();
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
    return <div className="text-center py-8">{t.common.loading}</div>;
  }

  if (!stats) {
    return <div className="text-center py-8 text-destructive">{t.common.error}</div>;
  }

  const statCards = [
    {
      title: t.admin.totalArticles,
      value: stats.total_articles,
      subtitle: `${stats.published_articles} ${t.admin.published}, ${stats.draft_articles} ${t.admin.drafts}`,
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      title: t.admin.totalUsers,
      value: stats.total_users,
      subtitle: `${stats.admin_users} ${t.admin.admins}, ${stats.editor_users} ${t.admin.editors}`,
      icon: Users,
      color: 'text-green-600',
    },
    {
      title: t.admin.totalEvents,
      value: stats.total_events,
      subtitle: `${stats.upcoming_events} ${t.admin.upcoming}, ${stats.completed_events} ${t.admin.completed}`,
      icon: Calendar,
      color: 'text-purple-600',
    },
    {
      title: t.admin.totalRegistrations,
      value: stats.total_registrations,
      subtitle: t.admin.eventRegistrations,
      icon: UserCheck,
      color: 'text-orange-600',
    },
    {
      title: t.admin.galleryItems,
      value: stats.gallery_items,
      subtitle: t.admin.photosAndVideos,
      icon: Images,
      color: 'text-pink-600',
    },
    {
      title: t.admin.teamMembers,
      value: stats.team_members,
      subtitle: t.admin.activeMembers,
      icon: TrendingUp,
      color: 'text-cyan-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.admin.dashboard}</h1>
        <p className="text-muted-foreground">{t.admin.dashboardSubtitle}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.admin.quickActions}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a 
              href="/admin/articles/new" 
              className="block p-3 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span>{t.admin.createArticle}</span>
              </div>
            </a>
            <a 
              href="/admin/events/new" 
              className="block p-3 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{t.admin.createEvent}</span>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.admin.systemInfo}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t.admin.databaseStatus}</span>
                <span className="text-green-600 font-medium">{t.admin.online}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.admin.lastBackup}</span>
                <span className="text-muted-foreground">{t.admin.automated}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
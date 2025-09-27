import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PasswordChangeForm from '@/components/auth/PasswordChangeForm';
import { User, Settings, Heart, Trophy, Calendar, Bell } from 'lucide-react';
import { languages } from '@/data/translations';

export default function ProfilePage() {
  const { profile, updateProfile } = useAuth();
  const { language, setLanguage, t } = useI18n();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [gameHistory, setGameHistory] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    bio: profile?.bio || '',
    preferred_language: profile?.preferred_language || 'uk',
    notifications_enabled: profile?.notifications_enabled ?? true
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        preferred_language: profile.preferred_language,
        notifications_enabled: profile.notifications_enabled
      });
      
      fetchUserData();
    }
  }, [profile]);

  const fetchUserData = async () => {
    if (!profile) return;

    // Fetch favorites
    const { data: favoritesData } = await supabase
      .from('user_favorites')
      .select('*')
      .eq('user_id', profile.user_id);

    setFavorites(favoritesData || []);

    // Fetch test results
    const { data: testResultsData } = await supabase
      .from('user_test_results')
      .select('*')
      .eq('user_id', profile.user_id)
      .order('completed_at', { ascending: false });

    setTestResults(testResultsData || []);

    // Fetch game registrations
    const { data: gameHistoryData } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('user_id', profile.user_id)
      .order('created_at', { ascending: false });

    setGameHistory(gameHistoryData || []);
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    
    try {
      const { error } = await updateProfile(formData);
      
      if (error) throw error;

      // Update language context if changed
      if (formData.preferred_language !== currentLanguage) {
        setLanguage(formData.preferred_language as any);
      }

      toast({
        title: t.common.success,
        description: t.profile.updateSuccess
      });
    } catch (error: any) {
      toast({
        title: t.common.error,
        description: error.message || t.profile.updateError,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'editor': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">{t.profile.notLoggedIn}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url || ''} alt={profile.display_name || ''} />
                <AvatarFallback className="text-lg">
                  {profile.display_name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{profile.display_name}</h1>
                <Badge className={getRoleColor(profile.role)}>
                  {t.profile.roles[profile.role]}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {t.profile.memberSince}: {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="info" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t.profile.tabs.info}
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {t.profile.tabs.security}
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              {t.profile.tabs.favorites}
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              {t.profile.tabs.tests}
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t.profile.tabs.games}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {t.profile.settings}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">{t.profile.displayName}</Label>
                    <Input
                      id="displayName"
                      value={formData.display_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                      placeholder={t.profile.displayNamePlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">{t.profile.language}</Label>
                    <Select
                      value={formData.preferred_language}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">{t.profile.bio}</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder={t.profile.bioPlaceholder}
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      {t.profile.notifications}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t.profile.notificationsDescription}
                    </p>
                  </div>
                  <Switch
                    checked={formData.notifications_enabled}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notifications_enabled: checked }))}
                  />
                </div>

                <Button onClick={handleUpdateProfile} disabled={loading} className="w-full">
                  {loading ? t.common.loading : t.profile.updateProfile}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <PasswordChangeForm />
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.profile.favoriteItems}</CardTitle>
              </CardHeader>
              <CardContent>
                {favorites.length > 0 ? (
                  <div className="space-y-2">
                    {favorites.map((favorite) => (
                      <div key={favorite.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{favorite.entity_type}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(favorite.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge>{favorite.entity_type}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">{t.profile.noFavorites}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.profile.testResults}</CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length > 0 ? (
                  <div className="space-y-2">
                    {testResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{result.test_id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(result.completed_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {t.profile.score}: {result.score || 0}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">{t.profile.noTestResults}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.profile.gameHistory}</CardTitle>
              </CardHeader>
              <CardContent>
                {gameHistory.length > 0 ? (
                  <div className="space-y-2">
                    {gameHistory.map((registration) => (
                      <div key={registration.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{registration.event_id}</p>
                          <p className="text-sm text-muted-foregroup">
                            {new Date(registration.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(registration.status)}>
                          {t.profile.statuses[registration.status]}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">{t.profile.noGameHistory}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
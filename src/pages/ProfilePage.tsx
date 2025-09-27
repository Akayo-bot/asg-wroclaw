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
    avatar_url: profile?.avatar_url || '',
    preferred_language: profile?.preferred_language || language,
    notifications_enabled: profile?.notifications_enabled ?? true,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        preferred_language: profile.preferred_language || language,
        notifications_enabled: profile.notifications_enabled ?? true,
      });
    }
  }, [profile, language]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    if (!profile?.id) return;

    try {
      // Fetch favorites
      const { data: favData } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', profile.id);
      setFavorites(favData || []);

      // Fetch test results
      const { data: testData } = await supabase
        .from('user_test_results')
        .select('*')
        .eq('user_id', profile.id);
      setTestResults(testData || []);

      // Fetch game history (placeholder - would need events registration data)
      setGameHistory([]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          preferred_language: formData.preferred_language,
          notifications_enabled: formData.notifications_enabled,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', profile?.user_id);

      if (error) throw error;

      // Update language context if changed
      if (formData.preferred_language !== language) {
        setLanguage(formData.preferred_language as any);
      }

      toast({
        title: t('common.success', 'Success'),
        description: t('profile.updateSuccess', 'Profile updated successfully')
      });

      // Refresh profile data
      window.location.reload();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: t('common.error', 'Error'),
        description: error.message || t('profile.updateError', 'Failed to update profile'),
        variant: 'destructive'
      });
    }

    setLoading(false);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{t('common.loading', 'Loading...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="font-rajdhani text-3xl font-bold mb-2">
            {t('profile.title', 'Profile Settings')}
          </h1>
          <p className="text-muted-foreground">
            {t('profile.subtitle', 'Manage your account settings and preferences')}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {t('profile.tabs.profile', 'Profile')}
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t('profile.tabs.preferences', 'Preferences')}
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              {t('profile.tabs.activity', 'Activity')}
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              {t('profile.tabs.security', 'Security')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {t('profile.personalInfo', 'Personal Information')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={formData.avatar_url} alt={t('profile.avatar', 'Avatar')} />
                      <AvatarFallback className="text-lg">
                        {formData.display_name?.charAt(0) || profile.display_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Label htmlFor="avatar_url">{t('profile.avatarUrl', 'Avatar URL')}</Label>
                      <Input
                        id="avatar_url"
                        value={formData.avatar_url}
                        onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                        placeholder={t('profile.avatarPlaceholder', 'Enter avatar URL')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="display_name">{t('profile.displayName', 'Display Name')}</Label>
                      <Input
                        id="display_name"
                        value={formData.display_name}
                        onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                        placeholder={t('profile.displayNamePlaceholder', 'Enter your display name')}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">{t('profile.email', 'Email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.user_id}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">{t('profile.bio', 'Bio')}</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder={t('profile.bioPlaceholder', 'Tell us about yourself')}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? t('common.loading', 'Loading...') : t('profile.saveChanges', 'Save Changes')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {t('profile.preferences', 'Preferences')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t('profile.language', 'Language')}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t('profile.languageDescription', 'Choose your preferred language')}
                    </p>
                  </div>
                  <Select
                    value={formData.preferred_language}
                    onValueChange={(value) => setFormData({ ...formData, preferred_language: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uk">🇺🇦 Українська</SelectItem>
                      <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                      <SelectItem value="pl">🇵🇱 Polski</SelectItem>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      {t('profile.notifications', 'Notifications')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('profile.notificationsDescription', 'Receive notifications about events and updates')}
                    </p>
                  </div>
                  <Switch
                    checked={formData.notifications_enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, notifications_enabled: checked })}
                  />
                </div>

                <Button onClick={handleSubmit} disabled={loading} className="w-full">
                  {loading ? t('common.loading', 'Loading...') : t('profile.savePreferences', 'Save Preferences')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <div className="grid gap-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    {t('profile.favorites', 'Favorites')} 
                    <Badge variant="secondary">{favorites.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      {t('profile.noFavorites', 'No favorites yet')}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {favorites.slice(0, 5).map((fav, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                          <div className="font-medium">{fav.entity_type}</div>
                          <div className="text-sm text-muted-foreground">{fav.entity_id}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    {t('profile.testResults', 'Test Results')}
                    <Badge variant="secondary">{testResults.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {testResults.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      {t('profile.noTestResults', 'No test results yet')}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {testResults.slice(0, 5).map((result, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg flex justify-between">
                          <div>
                            <div className="font-medium">{result.test_id}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(result.completed_at).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge variant={result.score >= 80 ? 'default' : 'secondary'}>
                            {result.score}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <PasswordChangeForm />
              
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    {t('profile.accountInfo', 'Account Information')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t('profile.memberSince', 'Member since')}</Label>
                      <div className="text-sm text-muted-foreground">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <Label>{t('profile.lastUpdate', 'Last updated')}</Label>
                      <div className="text-sm text-muted-foreground">
                        {new Date(profile.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>{t('profile.role', 'Role')}</Label>
                    <Badge variant="outline" className="ml-2">
                      {profile.role}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
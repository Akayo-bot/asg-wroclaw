import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useBranding } from '@/contexts/BrandingContext';
import { useI18n } from '@/contexts/I18nContext';
import { Palette, Image, Globe, Type } from 'lucide-react';

const BrandingManager = () => {
  const { settings, updateSettings, loading } = useBranding();
  const { t } = useI18n();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const updates = {
        site_name: formData.get('site_name') as string,
        tagline_uk: formData.get('tagline_uk') as string,
        tagline_ru: formData.get('tagline_ru') as string,
        tagline_pl: formData.get('tagline_pl') as string,
        tagline_en: formData.get('tagline_en') as string,
        logo_light_url: formData.get('logo_light_url') as string,
        logo_dark_url: formData.get('logo_dark_url') as string,
        favicon_url: formData.get('favicon_url') as string,
        og_image_url: formData.get('og_image_url') as string,
        primary_color: formData.get('primary_color') as string,
        accent_color: formData.get('accent_color') as string,
        default_language: formData.get('default_language') as string,
      };

      await updateSettings(updates);
      
      toast({
        title: t('common.success', 'Success'),
        description: t('admin.branding.saved', 'Branding settings saved successfully'),
      });
    } catch (error) {
      console.error('Error saving branding settings:', error);
      toast({
        title: t('common.error', 'Error'),
        description: t('admin.branding.error', 'Failed to save branding settings'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">{t('common.loading', 'Loading...')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('admin.branding.title', 'Brand Management')}</h1>
        <p className="text-muted-foreground">
          {t('admin.branding.description', 'Customize your site\'s appearance and branding')}
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              {t('admin.branding.basic', 'Basic Information')}
            </CardTitle>
            <CardDescription>
              {t('admin.branding.basic_desc', 'Site name and taglines for different languages')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site_name">{t('admin.branding.site_name', 'Site Name')}</Label>
              <Input
                id="site_name"
                name="site_name"
                defaultValue={settings.site_name}
                placeholder="Raven Strike Force"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="tagline_uk">{t('admin.branding.tagline_uk', 'Tagline (Ukrainian)')}</Label>
                <Textarea
                  id="tagline_uk"
                  name="tagline_uk"
                  defaultValue={settings.tagline_uk}
                  placeholder="Страйкбол — це більше, ніж гра"
                />
              </div>
              <div>
                <Label htmlFor="tagline_ru">{t('admin.branding.tagline_ru', 'Tagline (Russian)')}</Label>
                <Textarea
                  id="tagline_ru"
                  name="tagline_ru"
                  defaultValue={settings.tagline_ru}
                  placeholder="Страйкбол — это больше, чем игра"
                />
              </div>
              <div>
                <Label htmlFor="tagline_pl">{t('admin.branding.tagline_pl', 'Tagline (Polish)')}</Label>
                <Textarea
                  id="tagline_pl"
                  name="tagline_pl"
                  defaultValue={settings.tagline_pl}
                  placeholder="Airsoft to coś więcej niż gra"
                />
              </div>
              <div>
                <Label htmlFor="tagline_en">{t('admin.branding.tagline_en', 'Tagline (English)')}</Label>
                <Textarea
                  id="tagline_en"
                  name="tagline_en"
                  defaultValue={settings.tagline_en}
                  placeholder="Airsoft is more than a game"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visual Assets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              {t('admin.branding.assets', 'Visual Assets')}
            </CardTitle>
            <CardDescription>
              {t('admin.branding.assets_desc', 'Logos, favicon, and social media images')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="logo_light_url">{t('admin.branding.logo_light', 'Light Logo URL')}</Label>
                <Input
                  id="logo_light_url"
                  name="logo_light_url"
                  defaultValue={settings.logo_light_url || ''}
                  placeholder="https://example.com/logo-light.png"
                />
              </div>
              <div>
                <Label htmlFor="logo_dark_url">{t('admin.branding.logo_dark', 'Dark Logo URL')}</Label>
                <Input
                  id="logo_dark_url"
                  name="logo_dark_url"
                  defaultValue={settings.logo_dark_url || ''}
                  placeholder="https://example.com/logo-dark.png"
                />
              </div>
              <div>
                <Label htmlFor="favicon_url">{t('admin.branding.favicon', 'Favicon URL')}</Label>
                <Input
                  id="favicon_url"
                  name="favicon_url"
                  defaultValue={settings.favicon_url || ''}
                  placeholder="https://example.com/favicon.ico"
                />
              </div>
              <div>
                <Label htmlFor="og_image_url">{t('admin.branding.og_image', 'Social Media Image URL')}</Label>
                <Input
                  id="og_image_url"
                  name="og_image_url"
                  defaultValue={settings.og_image_url || ''}
                  placeholder="https://example.com/og-image.png"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              {t('admin.branding.colors', 'Brand Colors')}
            </CardTitle>
            <CardDescription>
              {t('admin.branding.colors_desc', 'Primary and accent colors for your brand')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="primary_color">{t('admin.branding.primary_color', 'Primary Color')}</Label>
                <Input
                  id="primary_color"
                  name="primary_color"
                  defaultValue={settings.primary_color}
                  placeholder="hsl(122 39% 49%)"
                />
              </div>
              <div>
                <Label htmlFor="accent_color">{t('admin.branding.accent_color', 'Accent Color')}</Label>
                <Input
                  id="accent_color"
                  name="accent_color"
                  defaultValue={settings.accent_color}
                  placeholder="hsl(4 90% 58%)"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('admin.branding.settings', 'Settings')}
            </CardTitle>
            <CardDescription>
              {t('admin.branding.settings_desc', 'Global site settings')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="default_language">{t('admin.branding.default_language', 'Default Language')}</Label>
              <select
                id="default_language"
                name="default_language"
                defaultValue={settings.default_language}
                className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="uk">🇺🇦 Ukrainian</option>
                <option value="ru">🇷🇺 Russian</option>
                <option value="pl">🇵🇱 Polish</option>
                <option value="en">🏴󠁧󠁢󠁥󠁮󠁧󠁿 English</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? t('common.loading', 'Loading...') : t('common.save', 'Save Changes')}
        </Button>
      </form>
    </div>
  );
};

export default BrandingManager;
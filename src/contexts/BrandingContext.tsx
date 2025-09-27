import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  id: string;
  site_name: string;
  tagline_uk: string;
  tagline_ru: string;
  tagline_pl: string;
  tagline_en: string;
  logo_light_url?: string;
  logo_dark_url?: string;
  favicon_url?: string;
  og_image_url?: string;
  primary_color: string;
  accent_color: string;
  default_language: string;
}

interface BrandingContextType {
  settings: SiteSettings | null;
  loading: boolean;
  updateSettings: (updates: Partial<SiteSettings>) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const BrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching site settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<SiteSettings>) => {
    if (!settings) return;

    try {
      const { error } = await supabase
        .from('site_settings')
        .update(updates)
        .eq('id', settings.id);

      if (error) throw error;
      
      setSettings({ ...settings, ...updates });
      
      // Apply colors to CSS variables immediately
      if (updates.primary_color || updates.accent_color) {
        applyColorsToCSSVariables(updates.primary_color || settings.primary_color, updates.accent_color || settings.accent_color);
      }
    } catch (error) {
      console.error('Error updating site settings:', error);
      throw error;
    }
  };

  const refreshSettings = fetchSettings;

  const applyColorsToCSSVariables = (primaryColor: string, accentColor: string) => {
    const root = document.documentElement;
    
    // Extract HSL values from the color strings
    const primaryHSL = primaryColor.replace('hsl(', '').replace(')', '');
    const accentHSL = accentColor.replace('hsl(', '').replace(')', '');
    
    root.style.setProperty('--primary', primaryHSL);
    root.style.setProperty('--accent', primaryHSL);
    root.style.setProperty('--destructive', accentHSL);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Apply colors when settings load
  useEffect(() => {
    if (settings) {
      applyColorsToCSSVariables(settings.primary_color, settings.accent_color);
      
      // Update favicon if set
      if (settings.favicon_url) {
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (link) {
          link.href = settings.favicon_url;
        }
      }
    }
  }, [settings]);

  return (
    <BrandingContext.Provider value={{ settings, loading, updateSettings, refreshSettings }}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (context === undefined) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};
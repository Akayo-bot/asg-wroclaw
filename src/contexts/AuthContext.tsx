import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { hasAdminAccess } from '@/utils/auth';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  preferred_language: string;
  role: 'superadmin' | 'admin' | 'editor' | 'user';
  bio: string | null;
  notifications_enabled: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  jwtRole: string | null;
  dbRole: string | null;
  rolesSynced: boolean;
  hasAdminAccess: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  refreshRole: () => Promise<void>;
  syncRoleToJWT: () => Promise<{ error: any }>;
  ensureSuperadmin: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [rolesSynced, setRolesSynced] = useState(false);

  // Computed values
  const jwtRole = user?.app_metadata?.role || null;
  const dbRole = profile?.role || null;
  const hasAdminAccessValue = hasAdminAccess(dbRole || jwtRole);

  // Subscribe to profile changes for real-time updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`profile-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Profile updated:', payload);
          if (payload.eventType === 'UPDATE' && payload.new) {
            setProfile(payload.new as Profile);
            // Check if role sync is needed
            const newDbRole = (payload.new as Profile).role;
            const currentJwtRole = user?.app_metadata?.role;
            setRolesSynced(newDbRole === currentJwtRole);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer Supabase calls to avoid deadlocks
          setTimeout(async () => {
            try {
              if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                await supabase.rpc('sync_user_profile', {
                  _user_id: session.user.id,
                  _email: session.user.email || '',
                  _display_name: session.user.user_metadata?.display_name || session.user.user_metadata?.full_name,
                  _avatar_url: session.user.user_metadata?.avatar_url
                });
                
                // Check for emergency superadmin promotion
                await supabase.rpc('ensure_superadmin_exists');
              }
              
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', session.user.id)
                .maybeSingle();
              setProfile(profileData ?? null);
              
              // Check role synchronization
              if (profileData) {
                const jwtRole = session.user.app_metadata?.role;
                const dbRole = profileData.role;
                setRolesSynced(jwtRole === dbRole);
                
                // Auto-sync if out of sync
                if (jwtRole !== dbRole) {
                  console.log('Roles out of sync, syncing...', { jwtRole, dbRole });
                  await supabase.rpc('sync_role_to_jwt');
                }
              }
            } catch (error) {
              console.error('Auth state profile sync error:', error);
              setProfile(null);
            } finally {
              setLoading(false);
            }
          }, 0);
        } else {
          setProfile(null);
          setRolesSynced(false);
          setLoading(false);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Sync user profile on initial load
        try {
          await supabase.rpc('sync_user_profile', {
            _user_id: session.user.id,
            _email: session.user.email || '',
            _display_name: session.user.user_metadata?.display_name || session.user.user_metadata?.full_name,
            _avatar_url: session.user.user_metadata?.avatar_url
          });
        } catch (error) {
          console.error('Error syncing user profile:', error);
        }
        
        // Fetch user profile
        supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()
          .then(({ data: profileData }) => {
            setProfile(profileData);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName
        }
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    return { error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', user.id);

    if (!error && profile) {
      setProfile({ ...profile, ...updates });
    }

    return { error };
  };

  const refreshRole = async () => {
    if (!user) return;
    
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (profileData) {
        setProfile(profileData);
        setRolesSynced(user.app_metadata?.role === profileData.role);
      }
    } catch (error) {
      console.error('Error refreshing role:', error);
    }
  };

  const syncRoleToJWT = async () => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase.rpc('sync_role_to_jwt');
      
      if (error) throw error;
      
      // Refresh session to get updated JWT
      await supabase.auth.refreshSession();
      
      setRolesSynced(true);
      return { error: null };
    } catch (error: any) {
      console.error('Error syncing role to JWT:', error);
      return { error };
    }
  };

  const ensureSuperadmin = async () => {
    try {
      const { data, error } = await supabase.rpc('ensure_superadmin_exists');
      
      if (error) throw error;
      
      // Refresh to get updated profile
      await refreshRole();
      
      return { error: null };
    } catch (error: any) {
      console.error('Error ensuring superadmin:', error);
      return { error };
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    jwtRole,
    dbRole,
    rolesSynced,
    hasAdminAccess: hasAdminAccessValue,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    refreshRole,
    syncRoleToJWT,
    ensureSuperadmin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
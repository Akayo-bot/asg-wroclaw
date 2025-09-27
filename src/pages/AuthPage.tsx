import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const AuthPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useI18n();
  const returnUrl = searchParams.get('returnUrl') || '/';

  useEffect(() => {
    if (!loading && user) {
      navigate(returnUrl);
    }
  }, [user, loading, navigate, returnUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{t('common.loading', 'Loading...')}</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        <Card className="glass-panel">
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-rajdhani font-bold">
              {t('auth.welcomeBack', 'Welcome back!')}
            </CardTitle>
            <CardDescription className="text-base">
              <div className="space-y-1">
                <p>{t('auth.secureAccess', 'Secure access to your account')}</p>
              </div>
              <p className="text-sm mt-3 text-muted-foreground">
                {t('auth.needHelp', 'Need help? Contact support')}
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthModal isOpen={true} onClose={() => navigate('/')} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
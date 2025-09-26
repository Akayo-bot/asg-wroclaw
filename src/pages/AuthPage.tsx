import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const AuthPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const t = useTranslation();
  const returnUrl = searchParams.get('returnUrl') || '/';

  useEffect(() => {
    if (user && !loading) {
      navigate(returnUrl, { replace: true });
    }
  }, [user, loading, navigate, returnUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Raven Strike Force</h1>
          <p className="text-muted-foreground mt-2">
            {t.auth.pleaseLogin}
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{t.auth.login}</CardTitle>
            <CardDescription>
              {t.auth.loginDescription}
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
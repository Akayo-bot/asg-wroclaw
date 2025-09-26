import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, User, Shield, Globe, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const DebugAuthPage = () => {
  const { user, profile, session, loading } = useAuth();
  const t = useTranslation();
  const { currentLanguage } = useLanguage();

  // Show only in development
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Access Denied
            </CardTitle>
            <CardDescription>
              Debug page is only available in development mode.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">🔍 Authentication Debug</h1>
          <p className="text-muted-foreground">Development mode diagnostics</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <strong>Email:</strong>{' '}
                <Badge variant={user?.email ? 'default' : 'destructive'}>
                  {user?.email || 'Not logged in'}
                </Badge>
              </div>
              <div>
                <strong>User ID:</strong>{' '}
                <code className="text-xs bg-muted p-1 rounded">
                  {user?.id || 'null'}
                </code>
              </div>
              <div>
                <strong>Display Name:</strong>{' '}
                {profile?.display_name || 'Not set'}
              </div>
              <div>
                <strong>Loading:</strong>{' '}
                <Badge variant={loading ? 'secondary' : 'outline'}>
                  {loading.toString()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Profile & Role */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Profile & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <strong>Role:</strong>{' '}
                <Badge 
                  variant={
                    profile?.role === 'admin' ? 'destructive' :
                    profile?.role === 'editor' ? 'secondary' : 'outline'
                  }
                >
                  {profile?.role || 'No role'}
                </Badge>
              </div>
              <div>
                <strong>Profile ID:</strong>{' '}
                <code className="text-xs bg-muted p-1 rounded">
                  {profile?.id || 'null'}
                </code>
              </div>
              <div>
                <strong>Notifications:</strong>{' '}
                {profile?.notifications_enabled?.toString() || 'Not set'}
              </div>
              <div>
                <strong>Admin Access:</strong>{' '}
                <Badge variant={
                  profile?.role === 'admin' || profile?.role === 'editor' 
                    ? 'default' : 'destructive'
                }>
                  {profile?.role === 'admin' || profile?.role === 'editor' 
                    ? 'Allowed' : 'Denied'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Session Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Session Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <strong>Session Active:</strong>{' '}
                <Badge variant={session ? 'default' : 'destructive'}>
                  {session ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div>
                <strong>Access Token:</strong>{' '}
                <Badge variant={session?.access_token ? 'default' : 'destructive'}>
                  {session?.access_token ? 'Present' : 'Missing'}
                </Badge>
              </div>
              <div>
                <strong>Expires At:</strong>{' '}
                {session?.expires_at ? 
                  new Date(session.expires_at * 1000).toLocaleString() : 
                  'Not set'
                }
              </div>
              <div>
                <strong>Provider:</strong>{' '}
                {user?.app_metadata?.provider || 'Unknown'}
              </div>
            </CardContent>
          </Card>

          {/* Language & Environment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Environment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <strong>Current Language:</strong>{' '}
                <Badge variant="secondary">{currentLanguage}</Badge>
              </div>
              <div>
                <strong>Preferred Language:</strong>{' '}
                {profile?.preferred_language || 'Not set'}
              </div>
              <div>
                <strong>Environment:</strong>{' '}
                <Badge variant="outline">
                  {process.env.NODE_ENV || 'development'}
                </Badge>
              </div>
              <div>
                <strong>URL:</strong>{' '}
                <code className="text-xs bg-muted p-1 rounded break-all">
                  {window.location.href}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Debug Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3 flex-wrap">
            <Button asChild variant="outline">
              <Link to="/">Home Page</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/profile">Profile Page</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin">Admin Panel</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/auth">Auth Page</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Raw Data (Collapsed) */}
        <details className="bg-muted/50 p-4 rounded-lg">
          <summary className="cursor-pointer font-medium mb-2">
            🔍 Raw Debug Data (Click to expand)
          </summary>
          <div className="space-y-4 text-sm">
            <div>
              <strong>User Object:</strong>
              <pre className="bg-background p-2 rounded mt-1 overflow-auto text-xs">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
            <div>
              <strong>Profile Object:</strong>
              <pre className="bg-background p-2 rounded mt-1 overflow-auto text-xs">
                {JSON.stringify(profile, null, 2)}
              </pre>
            </div>
            <div>
              <strong>Session Object:</strong>
              <pre className="bg-background p-2 rounded mt-1 overflow-auto text-xs">
                {JSON.stringify(session ? {
                  ...session,
                  access_token: session.access_token ? '[REDACTED]' : null,
                  refresh_token: session.refresh_token ? '[REDACTED]' : null
                } : null, null, 2)}
              </pre>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default DebugAuthPage;
import React, { useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, UserCog, AlertTriangle, Crown, Lock, FileText, User } from 'lucide-react';

const RoleManager = () => {
  const { t } = useI18n();
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [newRole, setNewRole] = useState<'superadmin' | 'admin' | 'editor' | 'user'>('user');
  const [protectionStatus, setProtectionStatus] = useState<any>(null);
  const [emergencyCode, setEmergencyCode] = useState('');
  const [showEmergencyRecovery, setShowEmergencyRecovery] = useState(false);

  React.useEffect(() => {
    fetchProtectionStatus();
  }, []);

  const fetchProtectionStatus = async () => {
    try {
      const { data, error } = await supabase.rpc('get_admin_protection_status');
      if (error) throw error;
      setProtectionStatus(data);
      
      // Show emergency recovery if no admin access exists
      if (data && data.total_admin_access === 0) {
        setShowEmergencyRecovery(true);
      }
    } catch (error) {
      console.error('Error fetching protection status:', error);
    }
  };

  const handleChangeRole = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile || !['superadmin', 'admin'].includes(profile.role)) {
      toast({
        title: t('errors.unauthorized', 'Unauthorized'),
        description: t('errors.adminAccessRequired', 'SuperAdmin or Admin access required'),
        variant: 'destructive'
      });
      return;
    }

    if (!email || !newRole) {
      toast({
        title: t('common.error', 'Error'),
        description: 'Email and role are required',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('change_user_role', {
        target_email: email,
        new_role: newRole
      });

      if (error) throw error;

      const result = data as any;
      if (result.success) {
        toast({
          title: t('common.success', 'Success'),
          description: `Role updated: ${email} → ${newRole}`
        });
        setEmail('');
        setNewRole('user');
        fetchProtectionStatus(); // Refresh protection status
      } else {
        throw new Error(result.error || 'Failed to update role');
      }
    } catch (error: any) {
      toast({
        title: t('common.error', 'Error'),
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emergencyCode || !email) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('emergency_admin_recovery', {
        recovery_code: emergencyCode,
        target_email: email
      });

      if (error) throw error;

      const result = data as any;
      if (result.success) {
        toast({
          title: 'Emergency Recovery Successful',
          description: `Admin access restored for ${email}`,
        });
        setEmergencyCode('');
        setEmail('');
        setShowEmergencyRecovery(false);
        fetchProtectionStatus();
      } else {
        throw new Error(result.error || 'Recovery failed');
      }
    } catch (error: any) {
      toast({
        title: 'Recovery Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!['superadmin', 'admin'].includes(profile?.role || '')) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p>{t('errors.adminAccessRequired', 'SuperAdmin or Admin access required')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UserCog className="h-6 w-6" />
          {t('admin.roles.title', 'Role Management')}
        </h1>
        <p className="text-muted-foreground">{t('admin.roles.description', 'Manage user roles and permissions')}</p>
      </div>

      {/* Protection Status */}
      {protectionStatus && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Crown className="h-5 w-5" />
              System Protection Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <Label>SuperAdmins</Label>
                <Badge variant={protectionStatus.superadmin_count > 0 ? 'default' : 'destructive'}>
                  {protectionStatus.superadmin_count}
                </Badge>
              </div>
              <div>
                <Label>Admins</Label>
                <Badge variant="secondary">{protectionStatus.admin_count}</Badge>
              </div>
              <div>
                <Label>Total Admin Access</Label>
                <Badge variant={protectionStatus.total_admin_access > 0 ? 'default' : 'destructive'}>
                  {protectionStatus.total_admin_access}
                </Badge>
              </div>
              <div>
                <Label>Your Role</Label>
                <Badge variant={protectionStatus.current_user_role === 'superadmin' ? 'default' : 'secondary'}>
                  {protectionStatus.current_user_role}
                </Badge>
              </div>
            </div>
            
            {protectionStatus.superadmin_count === 0 && (
              <Alert className="mt-4 border-destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Warning:</strong> No SuperAdmin exists. System protection is compromised.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Emergency Recovery */}
      {showEmergencyRecovery && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Emergency Admin Recovery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                No admin access detected in the system. Use emergency recovery to restore access.
              </AlertDescription>
            </Alert>
            
            <form onSubmit={handleEmergencyRecovery} className="space-y-4">
              <div>
                <Label htmlFor="recovery_email">Email Address</Label>
                <Input
                  id="recovery_email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="emergency_code">Emergency Recovery Code</Label>
                <Input
                  id="emergency_code"
                  type="password"
                  placeholder="Enter recovery code"
                  value={emergencyCode}
                  onChange={(e) => setEmergencyCode(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" disabled={loading} className="w-full" variant="destructive">
                {loading ? 'Recovering...' : 'Restore Admin Access'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t('admin.roles.change_role', 'Change User Role')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangeRole} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('admin.roles.user_email', 'User Email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">{t('admin.roles.new_role', 'New Role')}</Label>
              <Select value={newRole} onValueChange={(value: 'superadmin' | 'admin' | 'editor' | 'user') => setNewRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {profile?.role === 'superadmin' && (
                    <SelectItem value="superadmin">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-primary" />
                        SuperAdmin - Full system access
                      </div>
                    </SelectItem>
                  )}
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      Admin - Full management access
                    </div>
                  </SelectItem>
                  <SelectItem value="editor">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      Editor - Content management
                    </div>
                  </SelectItem>
                  <SelectItem value="user">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      User - Basic access
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {newRole === 'superadmin' && profile?.role !== 'superadmin' && (
                <Alert className="border-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Only SuperAdmin can assign SuperAdmin role.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t('common.loading', 'Loading...') : t('admin.roles.update_role', 'Update Role')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('admin.quickActions', 'Quick Actions')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            onClick={() => {
              setEmail('valera.dreus2001@gmail.com');
              setNewRole('admin');
            }}
            className="w-full"
          >
            {t('admin.roles.set_fallback_admin', 'Set fallback user as Admin')}
          </Button>
          
          {profile?.role === 'superadmin' && (
            <Button
              variant="outline"
              onClick={() => {
                setEmail('valera.dreus2001@gmail.com');
                setNewRole('superadmin');
              }}
              className="w-full"
            >
              <Crown className="h-4 w-4 mr-2" />
              {t('admin.roles.set_fallback_superadmin', 'Set fallback user as SuperAdmin')}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Role Hierarchy Info */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.roles.hierarchy', 'Role Hierarchy')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
              <Crown className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">SuperAdmin</div>
                <div className="text-muted-foreground">Full system access, cannot be removed if last one</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg">
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <div className="font-semibold">Admin</div>
                <div className="text-muted-foreground">Full management access, can manage users and content</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
              <FileText className="h-5 w-5 text-green-500" />
              <div>
                <div className="font-semibold">Editor</div>
                <div className="text-muted-foreground">Content management only</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-500/10 rounded-lg">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <div className="font-semibold">User</div>
                <div className="text-muted-foreground">Basic access, can participate in events</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManager;
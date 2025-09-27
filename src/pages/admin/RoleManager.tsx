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
import { Shield, UserCog } from 'lucide-react';

const RoleManager = () => {
  const { t } = useI18n();
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [newRole, setNewRole] = useState<'superadmin' | 'admin' | 'editor' | 'user'>('user');

  const handleChangeRole = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile || (profile.role !== 'admin' && profile.role !== 'superadmin')) {
      toast({
        title: t('errors.unauthorized', 'Unauthorized'),
        description: t('errors.adminAccessRequired', 'Admin or SuperAdmin access required'),
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
          description: `Role updated: ${email} -> ${newRole}`
        });
        setEmail('');
        setNewRole('user');
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

  if (profile?.role !== 'admin' && profile?.role !== 'superadmin') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            {t('errors.adminAccessRequired', 'Admin or SuperAdmin access required')}
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
          Role Management
        </h1>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Change User Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangeRole} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">User Email</Label>
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
              <Label htmlFor="role">New Role</Label>
              <Select value={newRole} onValueChange={(value: 'superadmin' | 'admin' | 'editor' | 'user') => setNewRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {profile?.role === 'superadmin' && (
                    <SelectItem value="superadmin">SuperAdmin - System access</SelectItem>
                  )}
                  <SelectItem value="admin">Admin - Full access</SelectItem>
                  <SelectItem value="editor">Editor - Content management</SelectItem>
                  <SelectItem value="user">User - Basic access</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t('common.loading', 'Loading...') : 'Update Role'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
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
            Set valera.dreus2001@gmail.com as Admin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManager;
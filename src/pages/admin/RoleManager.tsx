import React, { useState, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, UserCog, Crown, Lock, AlertTriangle, RefreshCw, History } from 'lucide-react';
import { getRoleDisplayName, getRoleBadgeVariant, hasAdminAccess } from '@/utils/auth';

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  role: 'superadmin' | 'admin' | 'editor' | 'user';
  created_at: string;
  updated_at: string;
}

interface RoleChange {
  id: string;
  target_user_id: string;
  old_role: string | null;
  new_role: string;
  changed_by: string;
  created_at: string;
  reason: string | null;
  target_profile?: any;
  changer_profile?: any;
}

const RoleManager = () => {
  const { t } = useI18n();
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [email, setEmail] = useState('');
  const [newRole, setNewRole] = useState<'superadmin' | 'admin' | 'editor' | 'user'>('user');
  const [reason, setReason] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [roleChanges, setRoleChanges] = useState<RoleChange[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (hasAdminAccess(profile?.role)) {
      fetchUsers();
      fetchRoleChanges();
    }
  }, [profile?.role]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      toast({
        title: t('common.error', 'Error'),
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchRoleChanges = async () => {
    try {
      const { data, error } = await supabase
        .from('role_changes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setRoleChanges(data || []);
    } catch (error: any) {
      console.error('Error fetching role changes:', error);
    }
  };

  const handleChangeRole = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile || !hasAdminAccess(profile.role)) {
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
        setReason('');
        fetchUsers();
        fetchRoleChanges();
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

  const handleQuickRoleChange = async (targetUserId: string, targetEmail: string, role: string) => {
    // Prevent self-demotion
    if (targetUserId === user?.id && profile?.role === 'superadmin' && role !== 'superadmin') {
      toast({
        title: 'Error',
        description: 'Cannot demote yourself from SuperAdmin',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('change_user_role', {
        target_email: targetEmail,
        new_role: role as 'superadmin' | 'admin' | 'editor' | 'user'
      });

      if (error) throw error;

      const result = data as any;
      if (result.success) {
        toast({
          title: 'Success',
          description: `${targetEmail} role updated to ${role}`
        });
        fetchUsers();
        fetchRoleChanges();
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!hasAdminAccess(profile?.role)) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
            <p>{t('errors.adminAccessRequired', 'Admin or SuperAdmin access required')}</p>
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Role Change Form */}
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

              <div className="space-y-2">
                <Label htmlFor="reason">Reason (optional)</Label>
                <Textarea
                  id="reason"
                  placeholder="Reason for role change..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={2}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                {loading ? t('common.loading', 'Loading...') : 'Update Role'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              onClick={() => {
                setEmail('valera.dreus2001@gmail.com');
                setNewRole('superadmin');
              }}
              className="w-full"
            >
              <Crown className="w-4 h-4 mr-2" />
              Set valera.dreus2001@gmail.com as SuperAdmin
            </Button>
            
            <Dialog open={showHistory} onOpenChange={setShowHistory}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <History className="w-4 h-4 mr-2" />
                  View Role Change History
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Role Change History</DialogTitle>
                  <DialogDescription>Recent role changes in the system</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {roleChanges.map((change) => (
                    <div key={change.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getRoleBadgeVariant(change.old_role || undefined)}>
                            {getRoleDisplayName(change.old_role || undefined)}
                          </Badge>
                          <span>→</span>
                          <Badge variant={getRoleBadgeVariant(change.new_role)}>
                            {getRoleDisplayName(change.new_role)}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(change.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Target User ID: {change.target_user_id}</p>
                        <p>Changed by: {change.changed_by}</p>
                        {change.reason && <p>Reason: {change.reason}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Users</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchUsers}
            disabled={loadingUsers}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loadingUsers ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((userProfile) => (
                <TableRow key={userProfile.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{userProfile.display_name || 'No name'}</p>
                      <p className="text-sm text-muted-foreground">{userProfile.user_id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(userProfile.role)}>
                      {getRoleDisplayName(userProfile.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(userProfile.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {['user', 'editor', 'admin', ...(profile?.role === 'superadmin' ? ['superadmin'] : [])].map((role) => (
                        <Button
                          key={role}
                          variant={userProfile.role === role ? 'default' : 'outline'}
                          size="sm"
                          disabled={loading || userProfile.role === role}
                          onClick={() => handleQuickRoleChange(userProfile.user_id, userProfile.user_id, role)}
                        >
                          {getRoleDisplayName(role)}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManager;
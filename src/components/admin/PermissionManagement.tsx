import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Shield, Users, Key, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
  isSystemRole: boolean;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  action: string;
}

export default function PermissionManagement() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreateRoleDialogOpen, setIsCreateRoleDialogOpen] = useState(false);

  const modules = [
    '用户管理', '内容管理', '活动管理', '班级管理', '系统设置',
    '数据统计', '通知管理', '文件管理', '权限管理', '日志管理'
  ];

  const mockPermissions: Permission[] = [
    { id: 'user.view', name: '查看用户', description: '查看用户列表和详情', module: '用户管理', action: 'view' },
    { id: 'user.create', name: '创建用户', description: '创建新用户账户', module: '用户管理', action: 'create' },
    { id: 'user.edit', name: '编辑用户', description: '编辑用户信息', module: '用户管理', action: 'edit' },
    { id: 'user.delete', name: '删除用户', description: '删除用户账户', module: '用户管理', action: 'delete' },
    { id: 'content.view', name: '查看内容', description: '查看所有内容', module: '内容管理', action: 'view' },
    { id: 'content.create', name: '创建内容', description: '创建新内容', module: '内容管理', action: 'create' },
    { id: 'content.edit', name: '编辑内容', description: '编辑内容信息', module: '内容管理', action: 'edit' },
    { id: 'content.delete', name: '删除内容', description: '删除内容', module: '内容管理', action: 'delete' },
    { id: 'activity.view', name: '查看活动', description: '查看活动列表', module: '活动管理', action: 'view' },
    { id: 'activity.create', name: '创建活动', description: '创建新活动', module: '活动管理', action: 'create' },
    { id: 'activity.edit', name: '编辑活动', description: '编辑活动信息', module: '活动管理', action: 'edit' },
    { id: 'activity.delete', name: '删除活动', description: '删除活动', module: '活动管理', action: 'delete' },
    { id: 'system.settings', name: '系统设置', description: '修改系统配置', module: '系统设置', action: 'manage' },
    { id: 'system.backup', name: '数据备份', description: '执行数据备份', module: '系统设置', action: 'backup' },
    { id: 'stats.view', name: '查看统计', description: '查看数据统计', module: '数据统计', action: 'view' },
    { id: 'permission.manage', name: '权限管理', description: '管理用户权限', module: '权限管理', action: 'manage' }
  ];

  const mockRoles: Role[] = [
    {
      id: '1',
      name: '超级管理员',
      description: '拥有系统所有权限的最高管理员',
      permissions: mockPermissions.map(p => p.id),
      userCount: 2,
      createdAt: '2024-01-01',
      isSystemRole: true
    },
    {
      id: '2',
      name: '普通管理员',
      description: '拥有大部分管理权限，除敏感系统设置外',
      permissions: mockPermissions.filter(p => !p.id.includes('system')).map(p => p.id),
      userCount: 5,
      createdAt: '2024-01-05',
      isSystemRole: false
    },
    {
      id: '3',
      name: '内容管理员',
      description: '负责内容审核和管理',
      permissions: mockPermissions.filter(p => p.module === '内容管理' || p.module === '用户管理').map(p => p.id),
      userCount: 8,
      createdAt: '2024-01-10',
      isSystemRole: false
    },
    {
      id: '4',
      name: '活动管理员',
      description: '负责活动的创建和管理',
      permissions: mockPermissions.filter(p => p.module === '活动管理').map(p => p.id),
      userCount: 3,
      createdAt: '2024-01-15',
      isSystemRole: false
    },
    {
      id: '5',
      name: '普通用户',
      description: '系统默认用户角色',
      permissions: mockPermissions.filter(p => p.action === 'view').map(p => p.id),
      userCount: 1200,
      createdAt: '2024-01-01',
      isSystemRole: true
    }
  ];

  const handleCreateRole = () => {
    toast.success('角色创建成功');
    setIsCreateRoleDialogOpen(false);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = mockRoles.find(r => r.id === roleId);
    if (role?.isSystemRole) {
      toast.error('系统角色无法删除');
      return;
    }
    toast.success('角色删除成功');
  };

  const handleUpdatePermissions = (roleId: string, permissions: string[]) => {
    toast.success('权限更新成功');
  };

  const getPermissionsByModule = (module: string) => {
    return mockPermissions.filter(p => p.module === module);
  };

  const hasPermission = (roleId: string, permissionId: string) => {
    const role = mockRoles.find(r => r.id === roleId);
    return role?.permissions.includes(permissionId) || false;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">权限管理</h1>
          <p className="text-muted-foreground mt-1">管理用户角色和权限分配</p>
        </div>
        <Dialog open={isCreateRoleDialogOpen} onOpenChange={setIsCreateRoleDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              创建角色
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>创建新角色</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>角色名称</Label>
                <Input placeholder="输入角色名称" />
              </div>
              <div>
                <Label>角色描述</Label>
                <Input placeholder="输入角色描述" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateRoleDialogOpen(false)}>取消</Button>
                <Button onClick={handleCreateRole}>创建</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">总角色</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{mockRoles.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">总权限</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{mockPermissions.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">活跃用户</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{mockRoles.reduce((sum, role) => sum + role.userCount, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">功能模块</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{modules.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="roles">角色管理</TabsTrigger>
          <TabsTrigger value="permissions">权限配置</TabsTrigger>
          <TabsTrigger value="users">用户分配</TabsTrigger>
        </TabsList>

        {/* 角色管理 */}
        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 角色列表 */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>角色列表</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRoles.map((role) => (
                      <div
                        key={role.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedRole?.id === role.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedRole(role)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{role.name}</h3>
                              {role.isSystemRole && (
                                <Badge variant="secondary" className="text-xs">系统</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {role.userCount} 个用户 • {role.permissions.length} 个权限
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 角色详情和权限配置 */}
            <div className="lg:col-span-2">
              {selectedRole ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedRole.name}</CardTitle>
                        <p className="text-muted-foreground">{selectedRole.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          编辑
                        </Button>
                        {!selectedRole.isSystemRole && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteRole(selectedRole.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            删除
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">用户数量:</span>
                          <span className="ml-2 font-medium">{selectedRole.userCount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">创建时间:</span>
                          <span className="ml-2 font-medium">{selectedRole.createdAt}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">权限数量:</span>
                          <span className="ml-2 font-medium">{selectedRole.permissions.length}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">角色类型:</span>
                          <span className="ml-2 font-medium">
                            {selectedRole.isSystemRole ? '系统角色' : '自定义角色'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">权限配置</h4>
                        <div className="space-y-4">
                          {modules.map((module) => {
                            const modulePermissions = getPermissionsByModule(module);
                            const hasAnyPermission = modulePermissions.some(p => 
                              selectedRole.permissions.includes(p.id)
                            );
                            
                            return (
                              <div key={module} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-medium">{module}</h5>
                                  <Badge variant={hasAnyPermission ? "default" : "outline"}>
                                    {modulePermissions.filter(p => selectedRole.permissions.includes(p.id)).length}/{modulePermissions.length}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                  {modulePermissions.map((permission) => (
                                    <div key={permission.id} className="flex items-center justify-between">
                                      <div>
                                        <span className="text-sm font-medium">{permission.name}</span>
                                        <p className="text-xs text-muted-foreground">{permission.description}</p>
                                      </div>
                                      <Switch
                                        checked={selectedRole.permissions.includes(permission.id)}
                                        disabled={selectedRole.isSystemRole}
                                        onCheckedChange={(checked) => {
                                          const newPermissions = checked
                                            ? [...selectedRole.permissions, permission.id]
                                            : selectedRole.permissions.filter(p => p !== permission.id);
                                          handleUpdatePermissions(selectedRole.id, newPermissions);
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">选择角色</h3>
                    <p className="text-muted-foreground">从左侧选择一个角色来查看和编辑权限</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* 权限配置 */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>权限列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {modules.map((module) => {
                  const modulePermissions = getPermissionsByModule(module);
                  return (
                    <div key={module}>
                      <h3 className="font-medium mb-3">{module}</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {modulePermissions.map((permission) => (
                          <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{permission.name}</span>
                                <Badge variant="outline">{permission.action}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{permission.description}</p>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ID: {permission.id}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 用户分配 */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>用户角色分配</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRoles.map((role) => (
                  <div key={role.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{role.userCount} 用户</Badge>
                        <Button variant="outline" size="sm">管理用户</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">权限数量:</span>
                        <span className="ml-2 font-medium">{role.permissions.length}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">用户数量:</span>
                        <span className="ml-2 font-medium">{role.userCount}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">创建时间:</span>
                        <span className="ml-2 font-medium">{role.createdAt}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">状态:</span>
                        <span className="ml-2 font-medium">
                          {role.isSystemRole ? '系统角色' : '自定义角色'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
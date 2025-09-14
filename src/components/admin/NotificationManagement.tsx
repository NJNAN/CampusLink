import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Bell, Send, Users, MessageSquare, Mail, Smartphone, Eye, Edit, Trash2, Plus, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'system' | 'activity' | 'announcement' | 'reminder';
  channels: ('push' | 'email' | 'sms')[];
  targetUsers: 'all' | 'students' | 'teachers' | 'admins' | 'custom';
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  createdAt: string;
  scheduledAt?: string;
  sentAt?: string;
  readCount: number;
  totalRecipients: number;
  createdBy: string;
}

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  content: string;
  type: string;
  variables: string[];
  createdAt: string;
}

export default function NotificationManagement() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const [newNotification, setNewNotification] = useState({
    title: '',
    content: '',
    type: 'announcement',
    channels: ['push'] as ('push' | 'email' | 'sms')[],
    targetUsers: 'all',
    scheduledAt: '',
    customUserIds: ''
  });

  const notificationTypes = {
    system: { label: '系统通知', color: 'blue' },
    activity: { label: '活动通知', color: 'green' },
    announcement: { label: '公告通知', color: 'orange' },
    reminder: { label: '提醒通知', color: 'purple' }
  };

  const statusConfig = {
    draft: { label: '草稿', color: 'gray' },
    scheduled: { label: '已定时', color: 'blue' },
    sent: { label: '已发送', color: 'green' },
    failed: { label: '发送失败', color: 'red' }
  };

  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: '系统维护通知',
      content: '系统将于今晚23:00-01:00进行维护升级，期间可能无法正常访问，请提前做好准备。',
      type: 'system',
      channels: ['push', 'email'],
      targetUsers: 'all',
      status: 'sent',
      createdAt: '2024-01-15 14:30:00',
      sentAt: '2024-01-15 14:35:00',
      readCount: 1256,
      totalRecipients: 1500,
      createdBy: '系统管理员'
    },
    {
      id: '2',
      title: '新春联谊活动报名',
      content: '2024年新春联谊活动即将开始报名，诚邀各位校友参加，共庆新春佳节。',
      type: 'activity',
      channels: ['push', 'email', 'sms'],
      targetUsers: 'students',
      status: 'scheduled',
      createdAt: '2024-01-14 10:00:00',
      scheduledAt: '2024-01-16 09:00:00',
      readCount: 0,
      totalRecipients: 800,
      createdBy: '活动管理员'
    },
    {
      id: '3',
      title: '学校图书馆开放时间调整',
      content: '根据学校安排，图书馆寒假期间开放时间调整为9:00-17:00，请合理安排学习时间。',
      type: 'announcement',
      channels: ['push'],
      targetUsers: 'students',
      status: 'draft',
      createdAt: '2024-01-13 16:20:00',
      readCount: 0,
      totalRecipients: 0,
      createdBy: '教务管理员'
    }
  ];

  const mockTemplates: NotificationTemplate[] = [
    {
      id: '1',
      name: '活动报名提醒',
      title: '【活动提醒】{{activityName}}即将开始报名',
      content: '亲爱的{{userName}}，您关注的活动"{{activityName}}"将于{{startTime}}开始报名，请及时参与。',
      type: 'activity',
      variables: ['userName', 'activityName', 'startTime'],
      createdAt: '2024-01-10 09:00:00'
    },
    {
      id: '2',
      name: '系统维护通知',
      title: '【系统通知】系统维护公告',
      content: '系统将于{{maintenanceTime}}进行维护，预计持续{{duration}}小时，请提前做好准备。',
      type: 'system',
      variables: ['maintenanceTime', 'duration'],
      createdAt: '2024-01-08 15:30:00'
    },
    {
      id: '3',
      name: '成绩发布通知',
      title: '【成绩通知】{{courseName}}成绩已发布',
      content: '{{userName}}同学，您的{{courseName}}课程成绩已发布，请登录系统查看详细信息。',
      type: 'reminder',
      variables: ['userName', 'courseName'],
      createdAt: '2024-01-05 11:15:00'
    }
  ];

  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus;
    const matchesType = filterType === 'all' || notification.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateNotification = () => {
    if (!newNotification.title.trim() || !newNotification.content.trim()) {
      toast.error('请填写通知标题和内容');
      return;
    }

    // 模拟创建通知
    toast.success('通知创建成功');
    setIsCreateDialogOpen(false);
    setNewNotification({
      title: '',
      content: '',
      type: 'announcement',
      channels: ['push'],
      targetUsers: 'all',
      scheduledAt: '',
      customUserIds: ''
    });
  };

  const handleSendNotification = (id: string) => {
    toast.success('通知发送成功');
  };

  const handleDeleteNotification = (id: string) => {
    toast.success('通知已删除');
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'push': return <Bell className="h-3 w-3" />;
      case 'email': return <Mail className="h-3 w-3" />;
      case 'sms': return <Smartphone className="h-3 w-3" />;
      default: return null;
    }
  };

  const getStatusStats = () => {
    return {
      total: mockNotifications.length,
      draft: mockNotifications.filter(n => n.status === 'draft').length,
      scheduled: mockNotifications.filter(n => n.status === 'scheduled').length,
      sent: mockNotifications.filter(n => n.status === 'sent').length,
      failed: mockNotifications.filter(n => n.status === 'failed').length
    };
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">通知管理</h1>
          <p className="text-muted-foreground mt-1">管理系统通知和消息推送</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              创建通知
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>创建新通知</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">通知标题</Label>
                <Input
                  id="title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="输入通知标题"
                />
              </div>
              
              <div>
                <Label htmlFor="content">通知内容</Label>
                <Textarea
                  id="content"
                  value={newNotification.content}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="输入通知内容"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">通知类型</Label>
                  <Select 
                    value={newNotification.type} 
                    onValueChange={(value) => setNewNotification(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">系统通知</SelectItem>
                      <SelectItem value="activity">活动通知</SelectItem>
                      <SelectItem value="announcement">公告通知</SelectItem>
                      <SelectItem value="reminder">提醒通知</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="targetUsers">目标用户</Label>
                  <Select 
                    value={newNotification.targetUsers} 
                    onValueChange={(value) => setNewNotification(prev => ({ ...prev, targetUsers: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部用户</SelectItem>
                      <SelectItem value="students">学生</SelectItem>
                      <SelectItem value="teachers">教师</SelectItem>
                      <SelectItem value="admins">管理员</SelectItem>
                      <SelectItem value="custom">自定义</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>发送渠道</Label>
                <div className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="push"
                      checked={newNotification.channels.includes('push')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewNotification(prev => ({ 
                            ...prev, 
                            channels: [...prev.channels, 'push'] 
                          }));
                        } else {
                          setNewNotification(prev => ({ 
                            ...prev, 
                            channels: prev.channels.filter(c => c !== 'push') 
                          }));
                        }
                      }}
                    />
                    <Label htmlFor="push">推送通知</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="email"
                      checked={newNotification.channels.includes('email')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewNotification(prev => ({ 
                            ...prev, 
                            channels: [...prev.channels, 'email'] 
                          }));
                        } else {
                          setNewNotification(prev => ({ 
                            ...prev, 
                            channels: prev.channels.filter(c => c !== 'email') 
                          }));
                        }
                      }}
                    />
                    <Label htmlFor="email">邮件通知</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sms"
                      checked={newNotification.channels.includes('sms')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewNotification(prev => ({ 
                            ...prev, 
                            channels: [...prev.channels, 'sms'] 
                          }));
                        } else {
                          setNewNotification(prev => ({ 
                            ...prev, 
                            channels: prev.channels.filter(c => c !== 'sms') 
                          }));
                        }
                      }}
                    />
                    <Label htmlFor="sms">短信通知</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="scheduledAt">定时发送（可选）</Label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  value={newNotification.scheduledAt}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, scheduledAt: e.target.value }))}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleCreateNotification}>
                  创建通知
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">总通知</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Edit className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">草稿</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{stats.draft}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">已定时</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{stats.scheduled}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">已发送</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{stats.sent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trash2 className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">失败</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{stats.failed}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="notifications">通知列表</TabsTrigger>
          <TabsTrigger value="templates">通知模板</TabsTrigger>
          <TabsTrigger value="settings">推送设置</TabsTrigger>
          <TabsTrigger value="statistics">发送统计</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* 搜索和筛选 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="搜索通知标题或内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="draft">草稿</SelectItem>
                    <SelectItem value="scheduled">已定时</SelectItem>
                    <SelectItem value="sent">已发送</SelectItem>
                    <SelectItem value="failed">失败</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="system">系统通知</SelectItem>
                    <SelectItem value="activity">活动通知</SelectItem>
                    <SelectItem value="announcement">公告通知</SelectItem>
                    <SelectItem value="reminder">提醒通知</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 通知列表 */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium">{notification.title}</h3>
                        <Badge variant="secondary">
                          {notificationTypes[notification.type].label}
                        </Badge>
                        <Badge 
                          variant={
                            notification.status === 'sent' ? 'default' :
                            notification.status === 'scheduled' ? 'secondary' :
                            notification.status === 'failed' ? 'destructive' : 'outline'
                          }
                        >
                          {statusConfig[notification.status].label}
                        </Badge>
                        <div className="flex space-x-1">
                          {notification.channels.map((channel, index) => (
                            <div key={index} className="w-4 h-4 text-muted-foreground">
                              {getChannelIcon(channel)}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {notification.content}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                        <span>创建时间: {notification.createdAt}</span>
                        <span>创建者: {notification.createdBy}</span>
                        {notification.status === 'sent' && (
                          <>
                            <span>发送时间: {notification.sentAt}</span>
                            <span>阅读数: {notification.readCount}/{notification.totalRecipients}</span>
                          </>
                        )}
                        {notification.status === 'scheduled' && (
                          <span>定时发送: {notification.scheduledAt}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        查看
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      {notification.status === 'draft' && (
                        <Button 
                          size="sm"
                          onClick={() => handleSendNotification(notification.id)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          发送
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>通知模板</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTemplates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{template.name}</h3>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">编辑</Button>
                        <Button variant="outline" size="sm">使用</Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{template.title}</p>
                    <p className="text-sm text-muted-foreground mb-2">{template.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>变量: {template.variables.join(', ')}</span>
                      <span>创建时间: {template.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>推送设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>启用推送通知</Label>
                    <p className="text-sm text-muted-foreground">允许向用户发送推送通知</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>启用邮件通知</Label>
                    <p className="text-sm text-muted-foreground">允许向用户发送邮件通知</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>启用短信通知</Label>
                    <p className="text-sm text-muted-foreground">允许向用户发送短信通知</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>每日发送限制</Label>
                  <Input type="number" defaultValue="100" />
                </div>
                <div>
                  <Label>发送间隔(分钟)</Label>
                  <Input type="number" defaultValue="5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>发送统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold">1,234</p>
                  <p className="text-sm text-muted-foreground">今日发送</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">8,765</p>
                  <p className="text-sm text-muted-foreground">本周发送</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">35,421</p>
                  <p className="text-sm text-muted-foreground">本月发送</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">145,678</p>
                  <p className="text-sm text-muted-foreground">总发送</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">最近发送记录</h4>
                {mockNotifications.filter(n => n.status === 'sent').map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.sentAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{notification.readCount}/{notification.totalRecipients}</p>
                      <p className="text-sm text-muted-foreground">
                        {((notification.readCount / notification.totalRecipients) * 100).toFixed(1)}% 阅读率
                      </p>
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
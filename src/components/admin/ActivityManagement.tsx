import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { 
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface Activity {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  registrationDeadline: string;
  createdAt: string;
  requirements: string;
}

export default function ActivityManagement() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockActivities: Activity[] = [
        {
          id: '1',
          title: '校园摄影大赛',
          description: '用镜头记录美丽校园，展现青春风采',
          type: '文艺活动',
          date: '2024-02-01',
          time: '09:00-17:00',
          location: '全校区',
          organizer: '学生会',
          maxParticipants: 100,
          currentParticipants: 56,
          status: 'published',
          registrationDeadline: '2024-01-25',
          createdAt: '2024-01-10',
          requirements: '在校学生，对摄影有兴趣'
        },
        {
          id: '2',
          title: '编程马拉松',
          description: '48小时编程挑战，与队友一起开发创新项目',
          type: '学术活动',
          date: '2024-01-25',
          time: '18:00-20:00',
          location: '计算机学院实验楼',
          organizer: '计算机学院',
          maxParticipants: 60,
          currentParticipants: 32,
          status: 'ongoing',
          registrationDeadline: '2024-01-20',
          createdAt: '2024-01-05',
          requirements: '具备基础编程能力'
        },
        {
          id: '3',
          title: '新年联欢晚会',
          description: '辞旧迎新，师生共度美好时光',
          type: '文艺活动',
          date: '2024-01-20',
          time: '19:00-21:30',
          location: '大礼堂',
          organizer: '校团委',
          maxParticipants: 800,
          currentParticipants: 500,
          status: 'completed',
          registrationDeadline: '2024-01-15',
          createdAt: '2023-12-20',
          requirements: '全校师生'
        }
      ];

      setActivities(mockActivities);
    } catch (error) {
      console.error('加载活动数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (activityId: string, newStatus: Activity['status']) => {
    setActivities(activities.map(activity => 
      activity.id === activityId ? { ...activity, status: newStatus } : activity
    ));
    toast.success('活动状态已更新');
  };

  const handleDelete = (activityId: string) => {
    if (window.confirm('确定要删除这个活动吗？')) {
      setActivities(activities.filter(activity => activity.id !== activityId));
      toast.success('活动已删除');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'published': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-purple-100 text-purple-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return '草稿';
      case 'published': return '已发布';
      case 'ongoing': return '进行中';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      default: return '未知';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'published': return <Calendar className="w-4 h-4" />;
      case 'ongoing': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: activities.length,
    published: activities.filter(a => a.status === 'published').length,
    ongoing: activities.filter(a => a.status === 'ongoing').length,
    completed: activities.filter(a => a.status === 'completed').length
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">活动管理</h1>
          <p className="text-gray-600 mt-1">管理校园活动和报名信息</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              创建活动
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>创建新活动</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="活动标题" />
              <Input placeholder="活动类型" />
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" placeholder="活动日期" />
                <Input placeholder="活动时间" />
              </div>
              <Input placeholder="活动地点" />
              <Input placeholder="最大参与人数" type="number" />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">取消</Button>
                <Button className="flex-1">创建</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总活动数</p>
                <p className="text-2xl text-gray-900">{stats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">已发布</p>
                <p className="text-2xl text-blue-600">{stats.published}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">进行中</p>
                <p className="text-2xl text-green-600">{stats.ongoing}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">已完成</p>
                <p className="text-2xl text-purple-600">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索活动名称或主办方..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  状态筛选
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  全部状态
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('published')}>
                  已发布
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('ongoing')}>
                  进行中
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                  已完成
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* 活动列表 */}
      <Card>
        <CardHeader>
          <CardTitle>活动列表 ({filteredActivities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>活动信息</TableHead>
                <TableHead>时间地点</TableHead>
                <TableHead>参与情况</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div>
                      <div className="text-sm">{activity.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{activity.description}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                        <span className="text-xs text-gray-500">主办：{activity.organizer}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span>{activity.date} {activity.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span>{activity.currentParticipants}/{activity.maxParticipants}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        报名截止：{activity.registrationDeadline}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs flex items-center gap-1 w-fit ${getStatusColor(activity.status)}`}>
                      {getStatusIcon(activity.status)}
                      {getStatusText(activity.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        {activity.status === 'draft' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(activity.id, 'published')}>
                            发布活动
                          </DropdownMenuItem>
                        )}
                        {activity.status === 'published' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(activity.id, 'ongoing')}>
                            开始活动
                          </DropdownMenuItem>
                        )}
                        {activity.status === 'ongoing' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(activity.id, 'completed')}>
                            完成活动
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(activity.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
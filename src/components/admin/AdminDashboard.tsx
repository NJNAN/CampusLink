import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Eye,
  Activity,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalActivities: number;
  totalBooks: number;
  todayNewUsers: number;
  todayNewPosts: number;
  userGrowthRate: number;
  postGrowthRate: number;
}

interface RecentActivity {
  id: string;
  type: 'user_register' | 'post_create' | 'activity_create' | 'comment_create';
  description: string;
  time: string;
  user: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    totalActivities: 0,
    totalBooks: 0,
    todayNewUsers: 0,
    todayNewPosts: 0,
    userGrowthRate: 0,
    postGrowthRate: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // 模拟加载仪表盘数据
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStats: DashboardStats = {
        totalUsers: 1245,
        totalPosts: 3567,
        totalActivities: 89,
        totalBooks: 234,
        todayNewUsers: 12,
        todayNewPosts: 45,
        userGrowthRate: 15.2,
        postGrowthRate: 23.8
      };

      const mockActivities: RecentActivity[] = [
        {
          id: '1',
          type: 'user_register',
          description: '新用户注册',
          time: '5分钟前',
          user: '李小明'
        },
        {
          id: '2',
          type: 'post_create',
          description: '发布了新动态',
          time: '10分钟前',
          user: '王小红'
        },
        {
          id: '3',
          type: 'activity_create',
          description: '创建了新活动"校园摄影大赛"',
          time: '1小时前',
          user: '管理员'
        },
        {
          id: '4',
          type: 'comment_create',
          description: '评论了动态',
          time: '2小时前',
          user: '张三'
        },
        {
          id: '5',
          type: 'post_create',
          description: '发布了入学感言',
          time: '3小时前',
          user: '刘小花'
        }
      ];

      setStats(mockStats);
      setRecentActivities(mockActivities);
    } catch (error) {
      console.error('加载仪表盘数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_register':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'post_create':
        return <MessageCircle className="w-4 h-4 text-green-500" />;
      case 'activity_create':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'comment_create':
        return <MessageCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
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
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl text-gray-900">仪表盘</h1>
        <p className="text-gray-600 mt-1">校友通讯网管理后台概览</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总用户数</p>
                <p className="text-2xl text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{stats.userGrowthRate}%</span>
                  <span className="text-sm text-gray-500 ml-1">较上月</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总动态数</p>
                <p className="text-2xl text-gray-900">{stats.totalPosts.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{stats.postGrowthRate}%</span>
                  <span className="text-sm text-gray-500 ml-1">较上月</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">活动数量</p>
                <p className="text-2xl text-gray-900">{stats.totalActivities}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">今日新增 {stats.todayNewUsers}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">书籍数量</p>
                <p className="text-2xl text-gray-900">{stats.totalBooks}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">今日新增 {stats.todayNewPosts}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 快捷操作 */}
        <Card>
          <CardHeader>
            <CardTitle>快捷操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center p-4"
                onClick={() => navigate('/admin/alumni')}
              >
                <Users className="w-6 h-6 mb-2 text-blue-600" />
                <span>用户管理</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center p-4"
                onClick={() => navigate('/admin/class-circle')}
              >
                <MessageCircle className="w-6 h-6 mb-2 text-green-600" />
                <span>动态管理</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center p-4"
                onClick={() => navigate('/admin/activities')}
              >
                <Calendar className="w-6 h-6 mb-2 text-purple-600" />
                <span>活动管理</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto flex flex-col items-center p-4"
                onClick={() => navigate('/admin/news')}
              >
                <Eye className="w-6 h-6 mb-2 text-orange-600" />
                <span>新闻管理</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 最近活动 */}
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="text-blue-600">{activity.user}</span> {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigate('/admin/activities')}
              >
                查看所有活动
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 管理模块 */}
      <Card>
        <CardHeader>
          <CardTitle>管理模块</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: '个人信息', path: '/admin/personal-info', icon: Users },
              { label: '入学感言', path: '/admin/enrollment-feeling', icon: MessageCircle },
              { label: '书籍管理', path: '/admin/books', icon: BookOpen },
              { label: '大学规划', path: '/admin/college-planning', icon: Trophy },
              { label: '宿舍管理', path: '/admin/dormitory', icon: Users },
              { label: '岁月管理', path: '/admin/years', icon: Calendar },
              { label: '校历管理', path: '/admin/calendar', icon: Calendar },
              { label: '教师管理', path: '/admin/teachers', icon: Users },
              { label: '新闻管理', path: '/admin/news', icon: Eye },
              { label: '企业管理', path: '/admin/companies', icon: Users },
              { label: '轮播图', path: '/admin/banners', icon: Eye },
              { label: '系统管理', path: '/admin/system', icon: Activity }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto flex flex-col items-center p-4"
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="w-5 h-5 mb-2 text-gray-600" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
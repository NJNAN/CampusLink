import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Image as ImageIcon,
  Heart,
  MessageCircle,
  Share,
  Plus,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClassActivity {
  id: string;
  title: string;
  description: string;
  type: 'study' | 'sports' | 'social' | 'volunteer' | 'cultural' | 'competition';
  date: string;
  time: string;
  location: string;
  organizer: string;
  participants: number;
  maxParticipants?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  images: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  isParticipating: boolean;
}

export default function ClassActivity() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [activities, setActivities] = useState<ClassActivity[]>([
    {
      id: '1',
      title: '班级学习交流会',
      description: '分享学习经验，讨论期末复习计划，共同进步。',
      type: 'study',
      date: '2024-01-20',
      time: '14:00-16:00',
      location: '教学楼A201',
      organizer: '学习委员',
      participants: 35,
      maxParticipants: 45,
      status: 'upcoming',
      images: ['https://picsum.photos/400/200?random=1'],
      likes: 28,
      comments: 12,
      isLiked: false,
      isParticipating: true
    },
    {
      id: '2',
      title: '班级篮球比赛',
      description: '与计算机科学2班进行友谊篮球赛，增进同学友谊。',
      type: 'sports',
      date: '2024-01-18',
      time: '16:00-18:00',
      location: '体育馆篮球场',
      organizer: '体育委员',
      participants: 20,
      maxParticipants: 25,
      status: 'completed',
      images: ['https://picsum.photos/400/200?random=2'],
      likes: 45,
      comments: 23,
      isLiked: true,
      isParticipating: false
    },
    {
      id: '3',
      title: '志愿服务活动',
      description: '前往敬老院开展志愿服务，为老人们带去温暖。',
      type: 'volunteer',
      date: '2024-01-22',
      time: '09:00-15:00',
      location: '福州市第一敬老院',
      organizer: '团支书',
      participants: 15,
      maxParticipants: 20,
      status: 'upcoming',
      images: ['https://picsum.photos/400/200?random=3'],
      likes: 32,
      comments: 8,
      isLiked: false,
      isParticipating: false
    },
    {
      id: '4',
      title: '文艺晚会准备',
      description: '为学院文艺晚会准备节目，展现班级风采。',
      type: 'cultural',
      date: '2024-01-25',
      time: '19:00-21:00',
      location: '学生活动中心',
      organizer: '文艺委员',
      participants: 25,
      status: 'ongoing',
      images: ['https://picsum.photos/400/200?random=4'],
      likes: 18,
      comments: 5,
      isLiked: false,
      isParticipating: true
    }
  ]);

  const handleLike = (activityId: string) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { 
            ...activity, 
            isLiked: !activity.isLiked,
            likes: activity.isLiked ? activity.likes - 1 : activity.likes + 1
          }
        : activity
    ));
  };

  const handleParticipate = (activityId: string) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { 
            ...activity, 
            isParticipating: !activity.isParticipating,
            participants: activity.isParticipating ? activity.participants - 1 : activity.participants + 1
          }
        : activity
    ));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'study': return 'bg-blue-100 text-blue-700';
      case 'sports': return 'bg-green-100 text-green-700';
      case 'social': return 'bg-purple-100 text-purple-700';
      case 'volunteer': return 'bg-red-100 text-red-700';
      case 'cultural': return 'bg-yellow-100 text-yellow-700';
      case 'competition': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'study': return '学习';
      case 'sports': return '体育';
      case 'social': return '社交';
      case 'volunteer': return '志愿';
      case 'cultural': return '文艺';
      case 'competition': return '竞赛';
      default: return '其他';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return '即将开始';
      case 'ongoing': return '进行中';
      case 'completed': return '已结束';
      case 'cancelled': return '已取消';
      default: return '未知';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredActivities = activeTab === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === activeTab || activity.status === activeTab);

  const stats = {
    total: activities.length,
    upcoming: activities.filter(a => a.status === 'upcoming').length,
    completed: activities.filter(a => a.status === 'completed').length,
    participating: activities.filter(a => a.isParticipating).length
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">班级活动</h1>
              <p className="text-sm text-gray-600">丰富多彩的班级生活</p>
            </div>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            发起
          </Button>
        </div>
      </div>

      {/* 活动统计 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-lg text-blue-600">{stats.total}</div>
              <div className="text-xs text-gray-500">总活动</div>
            </div>
            <div>
              <div className="text-lg text-green-600">{stats.upcoming}</div>
              <div className="text-xs text-gray-500">即将开始</div>
            </div>
            <div>
              <div className="text-lg text-purple-600">{stats.completed}</div>
              <div className="text-xs text-gray-500">已完成</div>
            </div>
            <div>
              <div className="text-lg text-orange-600">{stats.participating}</div>
              <div className="text-xs text-gray-500">我参与</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分类筛选 */}
      <div className="px-4 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
              variant={activeTab === 'all' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('all')}
              className="text-xs whitespace-nowrap"
            >
              全部
            </Button>
            <Button 
              variant={activeTab === 'upcoming' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('upcoming')}
              className="text-xs whitespace-nowrap"
            >
              即将开始
            </Button>
            <Button 
              variant={activeTab === 'study' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('study')}
              className="text-xs whitespace-nowrap"
            >
              学习
            </Button>
            <Button 
              variant={activeTab === 'sports' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('sports')}
              className="text-xs whitespace-nowrap"
            >
              体育
            </Button>
            <Button 
              variant={activeTab === 'volunteer' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('volunteer')}
              className="text-xs whitespace-nowrap"
            >
              志愿
            </Button>
            <Button 
              variant={activeTab === 'cultural' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('cultural')}
              className="text-xs whitespace-nowrap"
            >
              文艺
            </Button>
          </div>
        </Tabs>
      </div>

      {/* 活动列表 */}
      <div className="px-4 space-y-4">
        {filteredActivities.map((activity) => (
          <Card key={activity.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              {/* 活动头部 */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-xs ${getTypeColor(activity.type)}`}>
                      {getTypeText(activity.type)}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                      {getStatusText(activity.status)}
                    </Badge>
                  </div>
                  <h3 className="text-sm mb-2">{activity.title}</h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
                </div>
              </div>

              {/* 活动图片 */}
              {activity.images.length > 0 && (
                <img 
                  src={activity.images[0]} 
                  alt={activity.title}
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}

              {/* 活动信息 */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(activity.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>
                      {activity.participants}
                      {activity.maxParticipants && `/${activity.maxParticipants}`}
                      人
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  组织者：{activity.organizer}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(activity.id)}
                    className={`flex items-center gap-1 text-xs ${
                      activity.isLiked ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${activity.isLiked ? 'fill-current' : ''}`} />
                    <span>{activity.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                    <span>{activity.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>

                {activity.status === 'upcoming' && (
                  <Button
                    variant={activity.isParticipating ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleParticipate(activity.id)}
                    className="text-xs"
                  >
                    {activity.isParticipating ? '已参与' : '参与'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">暂无活动</h3>
            <p className="text-sm text-gray-500">该分类下暂无活动</p>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  );
}
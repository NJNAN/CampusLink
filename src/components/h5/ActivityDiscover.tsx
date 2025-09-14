import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Heart,
  Share,
  Search,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  organizer: string;
  location: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  category: string;
  status: 'upcoming' | 'ongoing' | 'ended';
  isRegistered: boolean;
}

export default function ActivityDiscover() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const mockActivities: Activity[] = [
      {
        id: '1',
        title: '校园摄影大赛',
        description: '用镜头记录美丽校园，展现青春风采。欢迎所有摄影爱好者参与！',
        image: '',
        organizer: '学生会',
        location: '全校区',
        date: '2024-02-01',
        time: '09:00-17:00',
        participants: 56,
        maxParticipants: 100,
        category: '文艺',
        status: 'upcoming',
        isRegistered: false
      },
      {
        id: '2',
        title: '编程马拉松',
        description: '48小时编程挑战，与队友一起开发创新项目，赢取丰厚奖品！',
        image: '',
        organizer: '计算机学院',
        location: '计算机学院实验楼',
        date: '2024-01-25',
        time: '18:00-20:00',
        participants: 32,
        maxParticipants: 60,
        category: '学术',
        status: 'upcoming',
        isRegistered: true
      },
      {
        id: '3',
        title: '新年联欢晚会',
        description: '辞旧迎新，同学们展示才艺，共度美好时光。',
        image: '',
        organizer: '校团委',
        location: '大礼堂',
        date: '2024-01-20',
        time: '19:00-21:30',
        participants: 500,
        maxParticipants: 800,
        category: '文艺',
        status: 'ended',
        isRegistered: true
      }
    ];
    setActivities(mockActivities);
  }, []);

  const handleRegister = (activityId: string) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { 
            ...activity, 
            isRegistered: !activity.isRegistered,
            participants: activity.isRegistered 
              ? activity.participants - 1 
              : activity.participants + 1
          }
        : activity
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'ended': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return '即将开始';
      case 'ongoing': return '进行中';
      case 'ended': return '已结束';
      default: return '未知';
    }
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === filter);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl">发现活动</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="flex gap-2 overflow-x-auto">
          {[
            { key: 'all', label: '全部' },
            { key: '学术', label: '学术' },
            { key: '文艺', label: '文艺' },
            { key: '体育', label: '体育' },
            { key: '公益', label: '公益' }
          ].map((category) => (
            <Button
              key={category.key}
              variant={filter === category.key ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setFilter(category.key)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 推荐横幅 */}
      <Card className="m-4 border-0 shadow-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-4">
          <h3 className="text-lg mb-2">热门推荐</h3>
          <p className="text-sm opacity-90">参与校园活动，丰富大学生活！</p>
        </CardContent>
      </Card>

      {/* 活动列表 */}
      <div className="px-4 space-y-4">
        {filteredActivities.map((activity) => (
          <Card 
            key={activity.id} 
            className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/h5/activity-detail/${activity.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm line-clamp-2">{activity.title}</h3>
                    <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                      {getStatusText(activity.status)}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{activity.date}</span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{activity.location}</span>
                      <Users className="w-3 h-3 ml-2" />
                      <span>{activity.participants}/{activity.maxParticipants}人</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-600">主办：{activity.organizer}</span>
                  <Badge variant="secondary" className="text-xs">
                    {activity.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                  {activity.status === 'upcoming' && (
                    <Button
                      size="sm"
                      variant={activity.isRegistered ? "secondary" : "default"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(activity.id);
                      }}
                    >
                      {activity.isRegistered ? '已报名' : '报名'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 底部间距 */}
      <div className="h-20"></div>
    </div>
  );
}
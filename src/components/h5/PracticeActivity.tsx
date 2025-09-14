import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ArrowLeft, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PracticeActivity() {
  const navigate = useNavigate();
  const [activities] = useState([
    {
      id: '1',
      title: '社区志愿服务',
      type: '志愿服务',
      date: '2024-01-15',
      duration: '4小时',
      location: '福州市社区服务中心',
      participants: 25,
      description: '参与社区清洁和老人关怀活动，体验服务社会的意义。',
      organizer: '校团委',
      status: 'completed'
    },
    {
      id: '2',
      title: '科技企业参观',
      type: '企业实践',
      date: '2024-01-20',
      duration: '半天',
      location: '福州软件园',
      participants: 40,
      description: '参观知名科技企业，了解行业发展和技术应用。',
      organizer: '计算机学院',
      status: 'upcoming'
    }
  ]);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg">实践活动</h1>
            <p className="text-sm text-gray-600">记录实践经历</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-sm mb-1">{activity.title}</h3>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {activity.type}
                  </Badge>
                </div>
                <Badge className={activity.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                  {activity.status === 'completed' ? '已完成' : '即将开始'}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
              
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{activity.date}</span>
                  <Clock className="w-3 h-3 ml-2" />
                  <span>{activity.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3 h-3" />
                  <span>{activity.participants}人参与</span>
                  <span className="ml-2">主办：{activity.organizer}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
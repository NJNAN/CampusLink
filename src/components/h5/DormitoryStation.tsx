import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ArrowLeft, MapPin, Users, Award, Calendar, Phone, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DormitoryStation() {
  const navigate = useNavigate();
  const [dormInfo] = useState({
    building: '东区宿舍楼A座',
    room: '301',
    address: '东区宿舍楼A座301室',
    dormLeader: {
      name: '张三',
      avatar: '',
      class: '计算机科学与技术2021级1班',
      phone: '138****8888'
    },
    roommates: [
      { name: '李四', avatar: '', class: '计算机科学与技术2021级1班', bed: '1号床' },
      { name: '王五', avatar: '', class: '计算机科学与技术2021级1班', bed: '2号床' },
      { name: '赵六', avatar: '', class: '计算机科学与技术2021级1班', bed: '3号床' },
      { name: '张三', avatar: '', class: '计算机科学与技术2021级1班', bed: '4号床' }
    ],
    honors: [
      { title: '文明宿舍', year: '2023年', level: '校级' },
      { title: '卫生标兵宿舍', year: '2023年', level: '院级' }
    ],
    facilities: ['空调', '独立卫浴', '阳台', '书桌', '衣柜', 'WiFi'],
    rules: [
      '保持宿舍整洁卫生',
      '按时熄灯就寝',
      '禁止大声喧哗',
      '节约用水用电',
      '互相关爱，和谐相处'
    ]
  });

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">宿舍驿站</h1>
              <p className="text-sm text-gray-600">{dormInfo.address}</p>
            </div>
          </div>
          <Button size="sm">
            <Edit className="w-4 h-4 mr-1" />
            编辑
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 宿舍基本信息 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">宿舍信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{dormInfo.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-gray-500" />
                <span>4人间</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">设施：</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dormInfo.facilities.map((facility, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 舍长信息 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">舍长信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={dormInfo.dormLeader.avatar} />
                <AvatarFallback>{dormInfo.dormLeader.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm">{dormInfo.dormLeader.name}</div>
                <div className="text-xs text-gray-600">{dormInfo.dormLeader.class}</div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Phone className="w-3 h-3" />
                  <span>{dormInfo.dormLeader.phone}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 室友信息 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">室友信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {dormInfo.roommates.map((roommate, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <Avatar className="w-10 h-10 mx-auto mb-2">
                    <AvatarImage src={roommate.avatar} />
                    <AvatarFallback>{roommate.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">{roommate.name}</div>
                  <div className="text-xs text-gray-500">{roommate.bed}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 宿舍荣誉 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              宿舍荣誉
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dormInfo.honors.map((honor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="text-sm">{honor.title}</div>
                    <div className="text-xs text-gray-600">{honor.level}</div>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {honor.year}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 宿舍约定 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">宿舍约定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dormInfo.rules.map((rule, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ArrowLeft, Building, MapPin, Users, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AlumniStreet() {
  const navigate = useNavigate();
  const [alumni] = useState([
    {
      id: '1', name: '李明华', avatar: '', graduationYear: '2020',
      company: '腾讯科技', position: '高级工程师', location: '深圳',
      major: '计算机科学与技术', message: '学弟学妹们加油！'
    },
    {
      id: '2', name: '张小雯', avatar: '', graduationYear: '2019',
      company: '阿里巴巴', position: '产品经理', location: '杭州',
      major: '软件工程', message: '欢迎来阿里实习！'
    },
    {
      id: '3', name: '王建国', avatar: '', graduationYear: '2018',
      company: '华为技术', position: '架构师', location: '北京',
      major: '信息安全', message: '技术改变世界！'
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
            <h1 className="text-lg">校友街</h1>
            <p className="text-sm text-gray-600">优秀校友风采</p>
          </div>
        </div>
      </div>
      
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg text-blue-600">{alumni.length}</div>
              <div className="text-sm text-gray-500">校友</div>
            </div>
            <div>
              <div className="text-lg text-green-600">{new Set(alumni.map(a => a.company)).size}</div>
              <div className="text-sm text-gray-500">企业</div>
            </div>
            <div>
              <div className="text-lg text-purple-600">{new Set(alumni.map(a => a.location)).size}</div>
              <div className="text-sm text-gray-500">城市</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="px-4 space-y-4">
        {alumni.map((alumnus) => (
          <Card key={alumnus.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={alumnus.avatar} />
                  <AvatarFallback>{alumnus.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{alumnus.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {alumnus.graduationYear}届
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{alumnus.major}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span>{alumnus.company} · {alumnus.position}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{alumnus.location}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <p className="text-sm text-gray-700">"{alumnus.message}"</p>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                联系校友
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="h-20"></div>
    </div>
  );
}
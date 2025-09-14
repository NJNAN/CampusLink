import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Award, Calendar, Plus, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HonorCertificate() {
  const navigate = useNavigate();
  const [certificates] = useState([
    {
      id: '1', title: '国家励志奖学金', issuer: '教育部',
      date: '2023-12', level: '国家级', 
      image: 'https://picsum.photos/200/280?random=1'
    },
    {
      id: '2', title: 'ACM程序设计竞赛二等奖', issuer: '中国计算机学会',
      date: '2023-11', level: '省级',
      image: 'https://picsum.photos/200/280?random=2'
    },
    {
      id: '3', title: '优秀学生干部', issuer: '福建师范大学',
      date: '2023-06', level: '校级',
      image: 'https://picsum.photos/200/280?random=3'
    }
  ]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case '国家级': return 'bg-red-100 text-red-700';
      case '省级': return 'bg-orange-100 text-orange-700';
      case '校级': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">荣誉证书</h1>
              <p className="text-sm text-gray-600">我的获奖记录</p>
            </div>
          </div>
          <Button size="sm"><Plus className="w-4 h-4 mr-1" />添加</Button>
        </div>
      </div>
      
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg text-red-600">{certificates.filter(c => c.level === '国家级').length}</div>
              <div className="text-sm text-gray-500">国家级</div>
            </div>
            <div>
              <div className="text-lg text-orange-600">{certificates.filter(c => c.level === '省级').length}</div>
              <div className="text-sm text-gray-500">省级</div>
            </div>
            <div>
              <div className="text-lg text-blue-600">{certificates.filter(c => c.level === '校级').length}</div>
              <div className="text-sm text-gray-500">校级</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="px-4 space-y-4">
        {certificates.map((cert) => (
          <Card key={cert.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <img src={cert.image} alt={cert.title} className="w-16 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm">{cert.title}</h3>
                    <Badge className={`text-xs ${getLevelColor(cert.level)}`}>
                      {cert.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{cert.issuer}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-3 h-3 mr-1" />查看证书
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="h-20"></div>
    </div>
  );
}
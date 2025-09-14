// 这个文件用于批量生成H5页面的完整组件代码

// YearsMemory - 岁月回忆
export const YearsMemoryCode = `import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ArrowLeft, Calendar, Heart, MessageCircle, Image as ImageIcon, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function YearsMemory() {
  const navigate = useNavigate();
  const [memories] = useState([
    {
      id: '1', title: '大一入学时光', date: '2021-09', 
      description: '初来乍到的青涩模样，一切都是那么新鲜美好。',
      images: ['https://picsum.photos/300/200?random=1'], likes: 45, comments: 12
    },
    {
      id: '2', title: '第一次熬夜赶作业', date: '2021-11',
      description: '深夜的图书馆，奋斗的身影，青春就是这样充实。',
      images: ['https://picsum.photos/300/200?random=2'], likes: 32, comments: 8
    }
  ]);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">岁月回忆</h1>
              <p className="text-sm text-gray-600">记录美好时光</p>
            </div>
          </div>
          <Button size="sm"><Plus className="w-4 h-4 mr-1" />添加</Button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {memories.map((memory) => (
          <Card key={memory.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">{memory.date}</span>
              </div>
              <h3 className="text-sm mb-2">{memory.title}</h3>
              <p className="text-sm text-gray-700 mb-3">{memory.description}</p>
              {memory.images.length > 0 && (
                <img src={memory.images[0]} alt={memory.title} className="w-full h-32 object-cover rounded mb-3" />
              )}
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-500">
                  <Heart className="w-4 h-4" /><span className="text-xs">{memory.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-500">
                  <MessageCircle className="w-4 h-4" /><span className="text-xs">{memory.comments}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="h-20"></div>
    </div>
  );
}`;

// FavoriteCafeteria - 喜欢的食堂
export const FavoriteCafeteriaCode = `import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, MapPin, Clock, Star, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FavoriteCafeteria() {
  const navigate = useNavigate();
  const [cafeterias] = useState([
    {
      id: '1', name: '第一食堂', location: '东区', 
      rating: 4.5, specialties: ['麻辣烫', '盖浇饭', '煲仔饭'],
      openTime: '06:30-21:30', price: '人均15元', likes: 89
    },
    {
      id: '2', name: '学生餐厅', location: '西区',
      rating: 4.2, specialties: ['沙县小吃', '兰州拉面', '黄焖鸡'],
      openTime: '07:00-21:00', price: '人均12元', likes: 67
    },
    {
      id: '3', name: '美食广场', location: '南区',
      rating: 4.0, specialties: ['火锅', '烧烤', '奶茶'],
      openTime: '10:00-22:00', price: '人均25元', likes: 45
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
            <h1 className="text-lg">喜欢的食堂</h1>
            <p className="text-sm text-gray-600">校园美食推荐</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {cafeterias.map((cafeteria) => (
          <Card key={cafeteria.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm mb-1">{cafeteria.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{cafeteria.location}</span>
                    <Clock className="w-3 h-3 ml-2" />
                    <span>{cafeteria.openTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm">{cafeteria.rating}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="text-xs text-gray-600">推荐菜品：</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cafeteria.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{cafeteria.price}</span>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-xs">{cafeteria.likes}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="h-20"></div>
    </div>
  );
}`;

// HonorCertificate - 荣誉证书
export const HonorCertificateCode = `import { useState } from 'react';
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
                    <Badge className={\`text-xs \${getLevelColor(cert.level)}\`}>
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
}`;

// AlumniStreet - 校友大街
export const AlumniStreetCode = `import { useState } from 'react';
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
            <h1 className="text-lg">校友大街</h1>
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
}`;
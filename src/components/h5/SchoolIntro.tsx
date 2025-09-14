import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  Award,
  Globe,
  Phone,
  Mail,
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SchoolIntro() {
  const navigate = useNavigate();
  const [schoolInfo] = useState({
    basic: {
      name: '福州理工学院',
      englishName: 'Fuzhou Institute of Technology',
      founded: '2004年',
      type: '民办本科',
      level: '应用型本科院校',
      location: '福建省福州市连江县',
      campuses: ['连江校区', '福州校区'],
      motto: '明德求真，笃行致远',
      website: 'https://www.fit.edu.cn',
      phone: '0591-62990012',
      email: 'info@fit.edu.cn'
    },
    stats: {
      totalStudents: 13000,
      undergraduates: 12500,
      graduates: 500,
      faculty: 800,
      colleges: 10,
      majors: 32,
      campusArea: '1388亩'
    },
    history: [
      {
        year: '2004年',
        event: '福州海峡职业技术学院创立'
      },
      {
        year: '2015年',
        event: '升格为福州理工学院'
      },
      {
        year: '2016年',
        event: '获批学士学位授予权'
      },
      {
        year: '2018年',
        event: '通过教育部本科教学工作合格评估'
      },
      {
        year: '2020年',
        event: '获批专业硕士学位授权建设单位'
      },
      {
        year: '2024年',
        event: '迎来建校20周年'
      }
    ],
    features: [
      {
        title: '实践导向',
        description: '注重应用型人才培养',
        icon: Award
      },
      {
        title: '产教融合',
        description: '与企业深度合作办学',
        icon: Building
      },
      {
        title: '创新创业',
        description: '培养学生创新创业能力',
        icon: BookOpen
      },
      {
        title: '就业优势',
        description: '毕业生就业率持续保持高位',
        icon: Users
      }
    ],
    colleges: [
      '计算机工程学院', '土木工程学院', '机械工程学院', '经济管理学院',
      '电子信息工程学院', '建筑学院', '外国语学院', '艺术设计学院',
      '应用科学学院', '马克思主义学院'
    ],
    specialties: [
      '计算机科学与技术', '软件工程', '网络工程', '物联网工程',
      '土木工程', '工程管理', '机械设计制造及其自动化', '电气工程及其自动化',
      '电子信息工程', '通信工程', '建筑学', '工程造价',
      '国际经济与贸易', '财务管理', '英语', '环境设计'
    ]
  });

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg">学校简介</h1>
            <p className="text-sm text-gray-600">了解我们的大学</p>
          </div>
        </div>
      </div>

      {/* 学校封面图 */}
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
        <img 
          src="https://picsum.photos/400/200?random=school" 
          alt="福州理工学院"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/20 flex items-end">
          <div className="p-4 text-white">
            <h2 className="text-xl mb-1">{schoolInfo.basic.name}</h2>
            <p className="text-sm opacity-90">{schoolInfo.basic.englishName}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-white/20 text-white border-white/30">
                {schoolInfo.basic.level}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                建校{schoolInfo.basic.founded}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">概况</TabsTrigger>
            <TabsTrigger value="history" className="text-xs">历史</TabsTrigger>
            <TabsTrigger value="colleges" className="text-xs">院系</TabsTrigger>
            <TabsTrigger value="contact" className="text-xs">联系</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              {/* 学校特色 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">学校特色</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {schoolInfo.features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                          <Icon className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                          <div className="text-sm mb-1">{feature.title}</div>
                          <div className="text-xs text-gray-600">{feature.description}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 办学规模 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">办学规模</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg text-blue-600">{schoolInfo.stats.totalStudents.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">在校学生</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg text-green-600">{schoolInfo.stats.faculty.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">教职工</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg text-purple-600">{schoolInfo.stats.colleges}</div>
                      <div className="text-xs text-gray-500">学院数</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg text-orange-600">{schoolInfo.stats.majors}</div>
                      <div className="text-xs text-gray-500">本科专业</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t text-center">
                    <div className="text-sm text-gray-600 mb-2">校园面积</div>
                    <div className="text-lg text-indigo-600">{schoolInfo.stats.campusArea}</div>
                  </div>
                </CardContent>
              </Card>

              {/* 优势学科 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">优势学科</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {schoolInfo.specialties.slice(0, 8).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {schoolInfo.specialties.length > 8 && (
                      <Badge variant="outline" className="text-xs">
                        +{schoolInfo.specialties.length - 8}个专业
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 校园分布 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">校园分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schoolInfo.basic.campuses.map((campus, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Building className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="text-sm">{campus}</div>
                          <div className="text-xs text-gray-500">
                            {index === 0 && '主校区，文理科专业'}
                            {index === 1 && '新校区，理工科专业'}
                            {index === 2 && '独立学院'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">发展历程</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schoolInfo.history.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {item.year}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colleges" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">学院设置</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {schoolInfo.colleges.map((college, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm">{college}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-4">
            <div className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">基本信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm">{schoolInfo.basic.location}</div>
                        <div className="text-xs text-gray-500">学校地址</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm">{schoolInfo.basic.phone}</div>
                        <div className="text-xs text-gray-500">联系电话</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm">{schoolInfo.basic.email}</div>
                        <div className="text-xs text-gray-500">邮箱地址</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm">{schoolInfo.basic.website}</div>
                        <div className="text-xs text-gray-500">官方网站</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">校训校风</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg text-blue-800 mb-2">{schoolInfo.basic.motto}</div>
                    <div className="text-sm text-blue-600">校训</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Trophy,
  BookOpen,
  Star,
  MessageCircle,
  Edit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClassMember {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'monitor' | 'deputy' | 'committee';
  studentId: string;
  dormitory: string;
  phone: string;
  email: string;
  hometown: string;
}

interface ClassInfo {
  className: string;
  major: string;
  college: string;
  establishDate: string;
  totalStudents: number;
  maleCount: number;
  femaleCount: number;
  classTeacher: {
    name: string;
    avatar: string;
    phone: string;
    email: string;
    office: string;
  };
  classMotto: string;
  description: string;
  achievements: string[];
  activities: number;
  avgGpa: number;
}

export default function ClassInfo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  
  const [classInfo] = useState<ClassInfo>({
    className: '计算机科学与技术2021级1班',
    major: '计算机科学与技术',
    college: '计算机与网络空间安全学院',
    establishDate: '2021-09-01',
    totalStudents: 45,
    maleCount: 28,
    femaleCount: 17,
    classTeacher: {
      name: '王老师',
      avatar: '',
      phone: '0591-12345678',
      email: 'wangteacher@fjnu.edu.cn',
      office: '计算机楼A301'
    },
    classMotto: '团结拼搏，追求卓越',
    description: '我们是一个充满活力和创造力的班级，致力于在学术和实践中不断进步。',
    achievements: [
      '2023年度优秀班集体',
      '学院篮球比赛冠军',
      '优秀团支部',
      '社会实践先进集体'
    ],
    activities: 28,
    avgGpa: 3.6
  });

  const [classMembers] = useState<ClassMember[]>([
    {
      id: '1',
      name: '张三',
      avatar: '',
      role: 'monitor',
      studentId: '2021001001',
      dormitory: '东区A座301',
      phone: '138****1111',
      email: 'zhangsan@student.fjnu.edu.cn',
      hometown: '福建福州'
    },
    {
      id: '2',
      name: '李小明',
      avatar: '',
      role: 'deputy',
      studentId: '2021001002',
      dormitory: '东区A座302',
      phone: '139****2222',
      email: 'lixiaoming@student.fjnu.edu.cn',
      hometown: '福建厦门'
    },
    {
      id: '3',
      name: '王小红',
      avatar: '',
      role: 'committee',
      studentId: '2021001003',
      dormitory: '西区B座201',
      phone: '137****3333',
      email: 'wangxiaohong@student.fjnu.edu.cn',
      hometown: '福建泉州'
    },
    {
      id: '4',
      name: '刘小花',
      avatar: '',
      role: 'student',
      studentId: '2021001004',
      dormitory: '西区B座202',
      phone: '135****4444',
      email: 'liuxiaohua@student.fjnu.edu.cn',
      hometown: '福建漳州'
    },
    {
      id: '5',
      name: '陈小强',
      avatar: '',
      role: 'student',
      studentId: '2021001005',
      dormitory: '东区C座101',
      phone: '136****5555',
      email: 'chenxiaoqiang@student.fjnu.edu.cn',
      hometown: '福建莆田'
    }
  ]);

  const getRoleText = (role: string) => {
    switch (role) {
      case 'monitor': return '班长';
      case 'deputy': return '副班长';
      case 'committee': return '班委';
      case 'student': return '学生';
      default: return '学生';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'monitor': return 'bg-red-100 text-red-700';
      case 'deputy': return 'bg-orange-100 text-orange-700';
      case 'committee': return 'bg-blue-100 text-blue-700';
      case 'student': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const classLeaders = classMembers.filter(member => member.role !== 'student');
  const regularStudents = classMembers.filter(member => member.role === 'student');

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
              <h1 className="text-lg">班级信息</h1>
              <p className="text-sm text-gray-600">了解我们的班级</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-1" />
            编辑
          </Button>
        </div>
      </div>

      {/* 班级头部信息 */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl text-white mb-1">{classInfo.className}</h2>
          <p className="text-sm text-white/90">{classInfo.college}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-white/20 text-white border-white/30">
              {classInfo.major}
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              {classInfo.totalStudents}人
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info" className="text-xs">班级概况</TabsTrigger>
            <TabsTrigger value="members" className="text-xs">成员名单</TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs">班级荣誉</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4">
            <div className="space-y-4">
              {/* 基本统计 */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg text-blue-600">{classInfo.totalStudents}</div>
                      <div className="text-xs text-gray-500">总人数</div>
                    </div>
                    <div>
                      <div className="text-lg text-green-600">{classInfo.activities}</div>
                      <div className="text-xs text-gray-500">活动次数</div>
                    </div>
                    <div>
                      <div className="text-lg text-purple-600">{classInfo.avgGpa}</div>
                      <div className="text-xs text-gray-500">平均GPA</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 班级信息 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">班级信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm">成立时间</div>
                        <div className="text-xs text-gray-500">{classInfo.establishDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm">男女比例</div>
                        <div className="text-xs text-gray-500">
                          男生 {classInfo.maleCount} 人，女生 {classInfo.femaleCount} 人
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm">专业</div>
                        <div className="text-xs text-gray-500">{classInfo.major}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 班级格言 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">班级格言</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-lg text-blue-800">"{classInfo.classMotto}"</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{classInfo.description}</p>
                </CardContent>
              </Card>

              {/* 班主任信息 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">班主任</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={classInfo.classTeacher.avatar} />
                      <AvatarFallback>{classInfo.classTeacher.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-sm mb-1">{classInfo.classTeacher.name}</h3>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{classInfo.classTeacher.office}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{classInfo.classTeacher.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{classInfo.classTeacher.email}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members" className="mt-4">
            <div className="space-y-4">
              {/* 班级干部 */}
              {classLeaders.length > 0 && (
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">班级干部</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {classLeaders.map((member) => (
                        <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">{member.name}</span>
                              <Badge className={`text-xs ${getRoleColor(member.role)}`}>
                                {getRoleText(member.role)}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500">
                              {member.studentId} • {member.hometown}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 全体成员 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">全体成员 ({classMembers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {classMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">{member.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm truncate">{member.name}</div>
                          <div className="text-xs text-gray-500 truncate">{member.studentId}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            <div className="space-y-4">
              {/* 班级荣誉 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    班级荣誉
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {classInfo.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        <div>
                          <div className="text-sm">{achievement}</div>
                          <div className="text-xs text-gray-500">2023年</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 成绩统计 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Star className="w-4 h-4 text-blue-500" />
                    成绩统计
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg text-blue-600">{classInfo.avgGpa}</div>
                      <div className="text-xs text-gray-500">平均GPA</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg text-green-600">85%</div>
                      <div className="text-xs text-gray-500">优秀率</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg text-purple-600">12</div>
                      <div className="text-xs text-gray-500">获奖人次</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg text-orange-600">95%</div>
                      <div className="text-xs text-gray-500">就业率</div>
                    </div>
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
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, Search, Filter, Users, GraduationCap, Award, BookOpen,
  MoreHorizontal, Eye, Edit, Trash2, Phone, Mail, MapPin,
  UserCheck, UserX, Shield, Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface Teacher {
  id: string;
  name: string;
  avatar: string;
  employeeId: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  position: string;
  title: string;
  office: string;
  specialization: string[];
  hireDate: string;
  status: 'active' | 'inactive' | 'pending';
  role: 'teacher' | 'admin' | 'head';
  courses: string[];
  students: number;
  publications: number;
  awards: number;
  lastLoginDate: string;
}

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTeachers: Teacher[] = [
        {
          id: '1',
          name: '王教授',
          avatar: '',
          employeeId: 'T202101001',
          email: 'wangprof@fjnu.edu.cn',
          phone: '0591-22860001',
          college: '计算机与网络空间安全学院',
          department: '计算机科学与技术系',
          position: '教授',
          title: '博士生导师',
          office: '计算机楼A301',
          specialization: ['人工智能', '机器学习', '数据挖掘'],
          hireDate: '2010-09-01',
          status: 'active',
          role: 'head',
          courses: ['高级人工智能', '机器学习', '数据挖掘'],
          students: 45,
          publications: 68,
          awards: 5,
          lastLoginDate: '2024-01-15'
        },
        {
          id: '2',
          name: '李副教授',
          avatar: '',
          employeeId: 'T202101002',
          email: 'liassoc@fjnu.edu.cn',
          phone: '0591-22860002',
          college: '计算机与网络空间安全学院',
          department: '软件工程系',
          position: '副教授',
          title: '硕士生导师',
          office: '计算机楼B205',
          specialization: ['软件工程', 'Web开发', '移动应用'],
          hireDate: '2015-09-01',
          status: 'active',
          role: 'teacher',
          courses: ['软件工程', 'Web开发技术', '移动应用开发'],
          students: 32,
          publications: 25,
          awards: 2,
          lastLoginDate: '2024-01-14'
        },
        {
          id: '3',
          name: '张讲师',
          avatar: '',
          employeeId: 'T202101003',
          email: 'zhanglec@fjnu.edu.cn',
          phone: '0591-22860003',
          college: '数学与信息学院',
          department: '数学系',
          position: '讲师',
          title: '讲师',
          office: '数学楼C102',
          specialization: ['高等数学', '线性代数', '概率统计'],
          hireDate: '2018-09-01',
          status: 'active',
          role: 'teacher',
          courses: ['高等数学', '线性代数'],
          students: 120,
          publications: 8,
          awards: 1,
          lastLoginDate: '2024-01-13'
        },
        {
          id: '4',
          name: '刘助教',
          avatar: '',
          employeeId: 'T202101004',
          email: 'liuasst@fjnu.edu.cn',
          phone: '0591-22860004',
          college: '外国语学院',
          department: '英语系',
          position: '助教',
          title: '助教',
          office: '外语楼D201',
          specialization: ['英语语言学', '英语文学'],
          hireDate: '2022-09-01',
          status: 'pending',
          role: 'teacher',
          courses: ['大学英语', '英语阅读'],
          students: 80,
          publications: 2,
          awards: 0,
          lastLoginDate: '2024-01-12'
        }
      ];

      setTeachers(mockTeachers);
    } catch (error) {
      console.error('加载教师数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (teacherId: string, newStatus: Teacher['status']) => {
    setTeachers(teachers.map(teacher => 
      teacher.id === teacherId ? { ...teacher, status: newStatus } : teacher
    ));
    toast.success('教师状态已更新');
  };

  const handleRoleChange = (teacherId: string, newRole: Teacher['role']) => {
    setTeachers(teachers.map(teacher => 
      teacher.id === teacherId ? { ...teacher, role: newRole } : teacher
    ));
    toast.success('教师权限已更新');
  };

  const handleDelete = (teacherId: string) => {
    if (window.confirm('确定要删除这位教师吗？')) {
      setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
      toast.success('教师已删除');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '在职';
      case 'inactive': return '离职';
      case 'pending': return '待审核';
      default: return '未知';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'head': return 'bg-red-100 text-red-700';
      case 'admin': return 'bg-blue-100 text-blue-700';
      case 'teacher': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'head': return '系主任';
      case 'admin': return '管理员';
      case 'teacher': return '普通教师';
      default: return '未知';
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position) {
      case '教授': return <GraduationCap className="w-4 h-4 text-red-500" />;
      case '副教授': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case '讲师': return <Users className="w-4 h-4 text-green-500" />;
      case '助教': return <Award className="w-4 h-4 text-purple-500" />;
      default: return <Users className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;
    const matchesCollege = collegeFilter === 'all' || teacher.college === collegeFilter;
    
    return matchesSearch && matchesStatus && matchesCollege;
  });

  const stats = {
    total: teachers.length,
    active: teachers.filter(t => t.status === 'active').length,
    professors: teachers.filter(t => t.position === '教授').length,
    totalStudents: teachers.reduce((sum, t) => sum + t.students, 0)
  };

  const colleges = [...new Set(teachers.map(t => t.college))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">教师管理</h1>
          <p className="text-gray-600 mt-1">管理教师信息和权限</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              添加教师
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新教师</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="教师姓名" />
              <Input placeholder="工号" />
              <Input placeholder="邮箱" />
              <Input placeholder="电话" />
              <select className="w-full border rounded px-3 py-2">
                <option>选择学院</option>
                <option>计算机与网络空间安全学院</option>
                <option>数学与信息学院</option>
                <option>外国语学院</option>
              </select>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">取消</Button>
                <Button className="flex-1">保存</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总教师数</p>
                <p className="text-2xl text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">在职教师</p>
                <p className="text-2xl text-green-600">{stats.active}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">教授数量</p>
                <p className="text-2xl text-purple-600">{stats.professors}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">指导学生</p>
                <p className="text-2xl text-indigo-600">{stats.totalStudents}</p>
              </div>
              <Award className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索教师姓名、工号或邮箱..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  状态筛选
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>全部状态</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>在职</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>离职</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>待审核</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  学院筛选
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCollegeFilter('all')}>全部学院</DropdownMenuItem>
                {colleges.map((college) => (
                  <DropdownMenuItem key={college} onClick={() => setCollegeFilter(college)}>
                    {college}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* 教师列表 */}
      <Card>
        <CardHeader>
          <CardTitle>教师列表 ({filteredTeachers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>教师信息</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>职务信息</TableHead>
                <TableHead>教学统计</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>权限</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={teacher.avatar} />
                        <AvatarFallback>{teacher.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm flex items-center gap-2">
                          {teacher.name}
                          {getPositionIcon(teacher.position)}
                        </div>
                        <div className="text-xs text-gray-500">{teacher.employeeId}</div>
                        <div className="text-xs text-gray-500">{teacher.college}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{teacher.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{teacher.office}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{teacher.position} / {teacher.title}</div>
                      <div className="text-xs text-gray-500">{teacher.department}</div>
                      <div className="text-xs text-gray-500">入职 {teacher.hireDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>学生: {teacher.students}人</div>
                      <div className="text-xs text-gray-500">课程: {teacher.courses.length}门</div>
                      <div className="text-xs text-gray-500">论文: {teacher.publications}篇</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getStatusColor(teacher.status)}`}>
                      {getStatusText(teacher.status)}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      最后登录: {teacher.lastLoginDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getRoleColor(teacher.role)}`}>
                      {getRoleText(teacher.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedTeacher(teacher)}>
                          <Eye className="w-4 h-4 mr-2" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          编辑信息
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="w-4 h-4 mr-2" />
                          权限设置
                        </DropdownMenuItem>
                        {teacher.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleStatusChange(teacher.id, 'inactive')}>
                            <UserX className="w-4 h-4 mr-2" />
                            设为离职
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusChange(teacher.id, 'active')}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            设为在职
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(teacher.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 教师详情对话框 */}
      <Dialog open={!!selectedTeacher} onOpenChange={(open) => !open && setSelectedTeacher(null)}>
        <DialogContent className="max-w-3xl">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTeacher.name} - 详细信息</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">基本信息</TabsTrigger>
                  <TabsTrigger value="teaching">教学信息</TabsTrigger>
                  <TabsTrigger value="research">研究成果</TabsTrigger>
                  <TabsTrigger value="permissions">权限设置</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedTeacher.avatar} />
                      <AvatarFallback>{selectedTeacher.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg">{selectedTeacher.name}</h3>
                      <p className="text-gray-600">{selectedTeacher.position} / {selectedTeacher.title}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge className={`text-xs ${getStatusColor(selectedTeacher.status)}`}>
                          {getStatusText(selectedTeacher.status)}
                        </Badge>
                        <Badge className={`text-xs ${getRoleColor(selectedTeacher.role)}`}>
                          {getRoleText(selectedTeacher.role)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-700 mb-2">联系信息</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>{selectedTeacher.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{selectedTeacher.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{selectedTeacher.office}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2">职务信息</h4>
                      <div className="space-y-2 text-sm">
                        <div>工号: {selectedTeacher.employeeId}</div>
                        <div>学院: {selectedTeacher.college}</div>
                        <div>系别: {selectedTeacher.department}</div>
                        <div>入职时间: {selectedTeacher.hireDate}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-700 mb-2">专业领域</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTeacher.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="teaching" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl text-blue-600">{selectedTeacher.courses.length}</div>
                      <div className="text-sm text-gray-600">授课门数</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl text-green-600">{selectedTeacher.students}</div>
                      <div className="text-sm text-gray-600">指导学生</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl text-purple-600">4.8</div>
                      <div className="text-sm text-gray-600">教学评分</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-700 mb-2">授课课程</h4>
                    <div className="space-y-2">
                      {selectedTeacher.courses.map((course, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{course}</span>
                          <Badge variant="outline" className="text-xs">2023-2024学年</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="research" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl text-orange-600">{selectedTeacher.publications}</div>
                      <div className="text-sm text-gray-600">发表论文</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl text-red-600">{selectedTeacher.awards}</div>
                      <div className="text-sm text-gray-600">获得奖项</div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <div className="text-2xl text-indigo-600">3</div>
                      <div className="text-sm text-gray-600">科研项目</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="permissions" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-700 mb-2">系统角色</h4>
                      <div className="flex gap-2">
                        <Button 
                          variant={selectedTeacher.role === 'teacher' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleRoleChange(selectedTeacher.id, 'teacher')}
                        >
                          普通教师
                        </Button>
                        <Button 
                          variant={selectedTeacher.role === 'admin' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleRoleChange(selectedTeacher.id, 'admin')}
                        >
                          管理员
                        </Button>
                        <Button 
                          variant={selectedTeacher.role === 'head' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleRoleChange(selectedTeacher.id, 'head')}
                        >
                          系主任
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-700 mb-2">系统权限</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>用户管理</span>
                          <Badge className={selectedTeacher.role === 'admin' || selectedTeacher.role === 'head' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {selectedTeacher.role === 'admin' || selectedTeacher.role === 'head' ? '有权限' : '无权限'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>内容管理</span>
                          <Badge className="bg-green-100 text-green-700">有权限</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>成绩管理</span>
                          <Badge className="bg-green-100 text-green-700">有权限</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>系统设置</span>
                          <Badge className={selectedTeacher.role === 'head' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {selectedTeacher.role === 'head' ? '有权限' : '无权限'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedTeacher(null)}>
                  关闭
                </Button>
                <Button>保存更改</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
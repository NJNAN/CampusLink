import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  GraduationCap,
  Building,
  MapPin,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import { toast } from 'sonner';

interface Alumni {
  id: string;
  name: string;
  avatar: string;
  studentId: string;
  class: string;
  major: string;
  graduationYear: string;
  company: string;
  position: string;
  location: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  lastContact: string;
  achievements: string[];
}

export default function AlumniManagement() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [graduationYearFilter, setGraduationYearFilter] = useState('all');
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAlumni();
  }, []);

  const loadAlumni = async () => {
    try {
      // 模拟加载校友数据
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAlumni: Alumni[] = [
        {
          id: '1',
          name: '李明华',
          avatar: '',
          studentId: '2018001001',
          class: '计算机科学与技术2018级1班',
          major: '计算机科学与技术',
          graduationYear: '2022',
          company: '腾讯科技',
          position: '高级软件工程师',
          location: '深圳',
          email: 'liminghua@example.com',
          phone: '138****1234',
          status: 'active',
          lastContact: '2024-01-10',
          achievements: ['优秀毕业生', '国家奖学金', 'ACM竞赛金奖']
        },
        {
          id: '2',
          name: '张小雯',
          avatar: '',
          studentId: '2019002003',
          class: '软件工程2019级2班',
          major: '软件工程',
          graduationYear: '2023',
          company: '阿里巴巴',
          position: '产品经理',
          location: '杭州',
          email: 'zhangxiaowen@example.com',
          phone: '139****5678',
          status: 'active',
          lastContact: '2024-01-08',
          achievements: ['优秀学生干部', '创新创业大赛一等奖']
        },
        {
          id: '3',
          name: '王建国',
          avatar: '',
          studentId: '2017003002',
          class: '信息安全2017级1班',
          major: '信息安全',
          graduationYear: '2021',
          company: '华为技术',
          position: '安全架构师',
          location: '北京',
          email: 'wangjianguo@example.com',
          phone: '136****9012',
          status: 'active',
          lastContact: '2023-12-15',
          achievements: ['学术标兵', '安全技术竞赛冠军']
        },
        {
          id: '4',
          name: '陈思思',
          avatar: '',
          studentId: '2020004001',
          class: '数据科学2020级1班',
          major: '数据科学与大数据技术',
          graduationYear: '2024',
          company: '字节跳动',
          position: '数据分析师',
          location: '北京',
          email: 'chensisi@example.com',
          phone: '135****3456',
          status: 'inactive',
          lastContact: '2023-10-20',
          achievements: ['数学建模竞赛二等奖']
        }
      ];

      setAlumni(mockAlumni);
    } catch (error) {
      console.error('加载校友数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (alumniId: string, newStatus: 'active' | 'inactive') => {
    setAlumni(alumni.map(alumnus => 
      alumnus.id === alumniId ? { ...alumnus, status: newStatus } : alumnus
    ));
    toast.success(`校友状态已更新为${newStatus === 'active' ? '活跃' : '非活跃'}`);
  };

  const handleDelete = (alumniId: string) => {
    if (window.confirm('确定要删除这位校友的信息吗？')) {
      setAlumni(alumni.filter(alumnus => alumnus.id !== alumniId));
      toast.success('校友信息已删除');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '活跃';
      case 'inactive': return '非活跃';
      default: return '未知';
    }
  };

  const filteredAlumni = alumni.filter(alumnus => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alumnus.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alumnus.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || alumnus.status === statusFilter;
    const matchesYear = graduationYearFilter === 'all' || alumnus.graduationYear === graduationYearFilter;
    
    return matchesSearch && matchesStatus && matchesYear;
  });

  const stats = {
    total: alumni.length,
    active: alumni.filter(a => a.status === 'active').length,
    inactive: alumni.filter(a => a.status === 'inactive').length,
    recentGraduates: alumni.filter(a => parseInt(a.graduationYear) >= 2022).length
  };

  const graduationYears = [...new Set(alumni.map(a => a.graduationYear))].sort((a, b) => b.localeCompare(a));

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
          <h1 className="text-2xl text-gray-900">校友管理</h1>
          <p className="text-gray-600 mt-1">管理校友信息和档案</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            导入Excel
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出数据
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                添加校友
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加新校友</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="姓名" />
                  <Input placeholder="学号" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="专业" />
                  <Input placeholder="毕业年份" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="公司" />
                  <Input placeholder="职位" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="邮箱" />
                  <Input placeholder="手机号" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">取消</Button>
                  <Button className="flex-1">添加</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总校友数</p>
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
                <p className="text-sm text-gray-600">活跃校友</p>
                <p className="text-2xl text-green-600">{stats.active}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">非活跃</p>
                <p className="text-2xl text-gray-600">{stats.inactive}</p>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">近期毕业</p>
                <p className="text-2xl text-purple-600">{stats.recentGraduates}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
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
                placeholder="搜索校友姓名、学号或公司..."
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
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  全部状态
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                  活跃
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
                  非活跃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  毕业年份
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setGraduationYearFilter('all')}>
                  全部年份
                </DropdownMenuItem>
                {graduationYears.map((year) => (
                  <DropdownMenuItem key={year} onClick={() => setGraduationYearFilter(year)}>
                    {year}届
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* 校友列表 */}
      <Card>
        <CardHeader>
          <CardTitle>校友列表 ({filteredAlumni.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>校友信息</TableHead>
                <TableHead>毕业信息</TableHead>
                <TableHead>工作信息</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlumni.map((alumnus) => (
                <TableRow key={alumnus.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={alumnus.avatar} />
                        <AvatarFallback>{alumnus.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm">{alumnus.name}</div>
                        <div className="text-xs text-gray-500">{alumnus.studentId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{alumnus.major}</div>
                      <div className="text-xs text-gray-500">{alumnus.graduationYear}届</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{alumnus.company}</div>
                      <div className="text-xs text-gray-500">{alumnus.position}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alumnus.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Mail className="w-3 h-3" />
                        {alumnus.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone className="w-3 h-3" />
                        {alumnus.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getStatusColor(alumnus.status)}`}>
                      {getStatusText(alumnus.status)}
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
                        <DropdownMenuItem onClick={() => setSelectedAlumni(alumnus)}>
                          <Eye className="w-4 h-4 mr-2" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        {alumnus.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleStatusChange(alumnus.id, 'inactive')}>
                            设为非活跃
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusChange(alumnus.id, 'active')}>
                            设为活跃
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(alumnus.id)}
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

      {/* 校友详情对话框 */}
      <Dialog open={!!selectedAlumni} onOpenChange={(open) => !open && setSelectedAlumni(null)}>
        <DialogContent className="max-w-2xl">
          {selectedAlumni && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAlumni.name} - 校友详情</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedAlumni.avatar} />
                    <AvatarFallback>{selectedAlumni.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg">{selectedAlumni.name}</h3>
                    <p className="text-gray-600">{selectedAlumni.studentId}</p>
                    <Badge className={`text-xs ${getStatusColor(selectedAlumni.status)}`}>
                      {getStatusText(selectedAlumni.status)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm text-gray-700 mb-2">学业信息</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">专业：</span>
                        {selectedAlumni.major}
                      </div>
                      <div>
                        <span className="text-gray-500">班级：</span>
                        {selectedAlumni.class}
                      </div>
                      <div>
                        <span className="text-gray-500">毕业年份：</span>
                        {selectedAlumni.graduationYear}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-700 mb-2">工作信息</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">公司：</span>
                        {selectedAlumni.company}
                      </div>
                      <div>
                        <span className="text-gray-500">职位：</span>
                        {selectedAlumni.position}
                      </div>
                      <div>
                        <span className="text-gray-500">工作地点：</span>
                        {selectedAlumni.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-700 mb-2">联系方式</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">邮箱：</span>
                      {selectedAlumni.email}
                    </div>
                    <div>
                      <span className="text-gray-500">手机：</span>
                      {selectedAlumni.phone}
                    </div>
                  </div>
                </div>

                {selectedAlumni.achievements.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-700 mb-2">荣誉成就</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAlumni.achievements.map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  最后联系时间：{selectedAlumni.lastContact}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedAlumni(null)}>
                    关闭
                  </Button>
                  <Button>
                    编辑信息
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
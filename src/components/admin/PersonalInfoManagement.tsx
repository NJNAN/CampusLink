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
  Search,
  Filter,
  Users,
  UserCheck,
  UserX,
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  Upload,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  studentId: string;
  email: string;
  phone: string;
  class: string;
  major: string;
  college: string;
  hometown: string;
  birthday: string;
  dormitory: string;
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
  lastLoginDate: string;
  profileCompleteness: number;
  verificationStatus: 'verified' | 'unverified' | 'pending';
}

export default function PersonalInfoManagement() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers: UserInfo[] = [
        {
          id: '1',
          name: '张三',
          avatar: '',
          studentId: '2021001001',
          email: 'zhangsan@student.fjnu.edu.cn',
          phone: '138****8888',
          class: '计算机科学与技术2021级1班',
          major: '计算机科学与技术',
          college: '计算机与网络空间安全学院',
          hometown: '福建省福州市',
          birthday: '2003-06-15',
          dormitory: '东区宿舍楼A座301',
          status: 'active',
          registrationDate: '2021-09-01',
          lastLoginDate: '2024-01-15',
          profileCompleteness: 95,
          verificationStatus: 'verified'
        },
        {
          id: '2',
          name: '李小明',
          avatar: '',
          studentId: '2021001002',
          email: 'lixiaoming@student.fjnu.edu.cn',
          phone: '139****6666',
          class: '软件工程2021级1班',
          major: '软件工程',
          college: '计算机与网络空间安全学院',
          hometown: '福建省厦门市',
          birthday: '2003-08-20',
          dormitory: '东区宿舍楼B座205',
          status: 'active',
          registrationDate: '2021-09-01',
          lastLoginDate: '2024-01-14',
          profileCompleteness: 80,
          verificationStatus: 'verified'
        },
        {
          id: '3',
          name: '王小红',
          avatar: '',
          studentId: '2021002001',
          email: 'wangxiaohong@student.fjnu.edu.cn',
          phone: '137****9999',
          class: '数学与应用数学2021级1班',
          major: '数学与应用数学',
          college: '数学与信息学院',
          hometown: '福建省泉州市',
          birthday: '2003-12-10',
          dormitory: '西区宿舍楼C座108',
          status: 'inactive',
          registrationDate: '2021-09-01',
          lastLoginDate: '2024-01-05',
          profileCompleteness: 60,
          verificationStatus: 'pending'
        },
        {
          id: '4',
          name: '刘小花',
          avatar: '',
          studentId: '2021003001',
          email: 'liuxiaohua@student.fjnu.edu.cn',
          phone: '135****7777',
          class: '英语2021级1班',
          major: '英语',
          college: '外国语学院',
          hometown: '福建省漳州市',
          birthday: '2003-04-25',
          dormitory: '南区宿舍楼D座315',
          status: 'pending',
          registrationDate: '2021-09-15',
          lastLoginDate: '2024-01-12',
          profileCompleteness: 45,
          verificationStatus: 'unverified'
        }
      ];

      setUsers(mockUsers);
    } catch (error) {
      console.error('加载用户数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (userId: string, newStatus: UserInfo['status']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast.success('用户状态已更新');
  };

  const handleVerificationChange = (userId: string, newVerification: UserInfo['verificationStatus']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verificationStatus: newVerification } : user
    ));
    toast.success('认证状态已更新');
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
      case 'active': return '活跃';
      case 'inactive': return '非活跃';
      case 'pending': return '待审核';
      default: return '未知';
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-700';
      case 'unverified': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVerificationText = (status: string) => {
    switch (status) {
      case 'verified': return '已认证';
      case 'unverified': return '未认证';
      case 'pending': return '待认证';
      default: return '未知';
    }
  };

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 80) return 'text-green-600';
    if (completeness >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesCollege = collegeFilter === 'all' || user.college === collegeFilter;
    
    return matchesSearch && matchesStatus && matchesCollege;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    verified: users.filter(u => u.verificationStatus === 'verified').length,
    highCompleteness: users.filter(u => u.profileCompleteness >= 80).length
  };

  const colleges = [...new Set(users.map(u => u.college))];

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
          <h1 className="text-2xl text-gray-900">个人信息管理</h1>
          <p className="text-gray-600 mt-1">管理用户个人资料和账户状态</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            批量导入
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出数据
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总用户数</p>
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
                <p className="text-sm text-gray-600">活跃用户</p>
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
                <p className="text-sm text-gray-600">已认证</p>
                <p className="text-2xl text-blue-600">{stats.verified}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">资料完整</p>
                <p className="text-2xl text-purple-600">{stats.highCompleteness}</p>
              </div>
              <UserCheck className="w-8 h-8 text-purple-600" />
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
                placeholder="搜索姓名、学号或邮箱..."
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
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                  待审核
                </DropdownMenuItem>
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
                <DropdownMenuItem onClick={() => setCollegeFilter('all')}>
                  全部学院
                </DropdownMenuItem>
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

      {/* 用户列表 */}
      <Card>
        <CardHeader>
          <CardTitle>用户列表 ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户信息</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>学籍信息</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>完善度</TableHead>
                <TableHead>最后登录</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.studentId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{user.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.major}</div>
                      <div className="text-xs text-gray-500">{user.class}</div>
                      <div className="text-xs text-gray-500">{user.college}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </Badge>
                      <Badge className={`text-xs ${getVerificationColor(user.verificationStatus)}`}>
                        {getVerificationText(user.verificationStatus)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className={`text-sm ${getCompletenessColor(user.profileCompleteness)}`}>
                        {user.profileCompleteness}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${user.profileCompleteness}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.lastLoginDate}</div>
                      <div className="text-xs text-gray-500">
                        注册于 {user.registrationDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                          <Eye className="w-4 h-4 mr-2" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          编辑资料
                        </DropdownMenuItem>
                        {user.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'inactive')}>
                            <UserX className="w-4 h-4 mr-2" />
                            设为非活跃
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'active')}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            设为活跃
                          </DropdownMenuItem>
                        )}
                        {user.verificationStatus === 'pending' && (
                          <>
                            <DropdownMenuItem onClick={() => handleVerificationChange(user.id, 'verified')}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              通过认证
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleVerificationChange(user.id, 'unverified')}>
                              <XCircle className="w-4 h-4 mr-2" />
                              拒绝认证
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 用户详情对话框 */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedUser.name} - 详细信息</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">基本信息</TabsTrigger>
                  <TabsTrigger value="academic">学籍信息</TabsTrigger>
                  <TabsTrigger value="status">状态记录</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedUser.avatar} />
                      <AvatarFallback>{selectedUser.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg">{selectedUser.name}</h3>
                      <p className="text-gray-600">{selectedUser.studentId}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge className={`text-xs ${getStatusColor(selectedUser.status)}`}>
                          {getStatusText(selectedUser.status)}
                        </Badge>
                        <Badge className={`text-xs ${getVerificationColor(selectedUser.verificationStatus)}`}>
                          {getVerificationText(selectedUser.verificationStatus)}
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
                          <span>{selectedUser.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{selectedUser.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{selectedUser.hometown}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2">个人信息</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">生日：</span>
                          {selectedUser.birthday}
                        </div>
                        <div>
                          <span className="text-gray-500">宿舍：</span>
                          {selectedUser.dormitory}
                        </div>
                        <div>
                          <span className="text-gray-500">资料完整度：</span>
                          <span className={getCompletenessColor(selectedUser.profileCompleteness)}>
                            {selectedUser.profileCompleteness}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-700 mb-2">学籍信息</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">学院：</span>
                          {selectedUser.college}
                        </div>
                        <div>
                          <span className="text-gray-500">专业：</span>
                          {selectedUser.major}
                        </div>
                        <div>
                          <span className="text-gray-500">班级：</span>
                          {selectedUser.class}
                        </div>
                        <div>
                          <span className="text-gray-500">学号：</span>
                          {selectedUser.studentId}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="status" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-700 mb-2">账户状态</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>注册时间：{selectedUser.registrationDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>最后登录：{selectedUser.lastLoginDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  关闭
                </Button>
                <Button>
                  编辑资料
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
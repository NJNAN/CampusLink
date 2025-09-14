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
import { Progress } from '../ui/progress';
import { 
  Plus, Search, Filter, BarChart3, TrendingUp, Users, GraduationCap,
  MoreHorizontal, Eye, Edit, Trash2, Download, CheckCircle, AlertCircle,
  FileText, Star, Award, Target
} from 'lucide-react';
import { toast } from 'sonner';

interface StudentGrade {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  className: string;
  major: string;
  gpa: number;
  totalCredits: number;
  earnedCredits: number;
  ranking: number;
  totalStudents: number;
  graduationStatus: 'qualified' | 'pending' | 'unqualified';
  uploadDate: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  transcriptFile: string;
  courses: {
    total: number;
    passed: number;
    excellent: number;
  };
  categoryGPA: {
    major: number;
    general: number;
    elective: number;
    practice: number;
  };
}

export default function GradesManagement() {
  const [students, setStudents] = useState<StudentGrade[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentGrade | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStudentGrades();
  }, []);

  const loadStudentGrades = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockStudents: StudentGrade[] = [
        {
          id: '1',
          studentId: '2021001001',
          studentName: '张三',
          studentAvatar: '',
          className: '计算机科学与技术2021级1班',
          major: '计算机科学与技术',
          gpa: 3.85,
          totalCredits: 160,
          earnedCredits: 160,
          ranking: 3,
          totalStudents: 45,
          graduationStatus: 'qualified',
          uploadDate: '2024-01-15',
          verificationStatus: 'verified',
          transcriptFile: 'transcript_001.pdf',
          courses: {
            total: 45,
            passed: 45,
            excellent: 32
          },
          categoryGPA: {
            major: 3.92,
            general: 3.68,
            elective: 3.75,
            practice: 4.0
          }
        },
        {
          id: '2',
          studentId: '2021001002',
          studentName: '李小明',
          studentAvatar: '',
          className: '计算机科学与技术2021级1班',
          major: '计算机科学与技术',
          gpa: 3.72,
          totalCredits: 160,
          earnedCredits: 158,
          ranking: 8,
          totalStudents: 45,
          graduationStatus: 'pending',
          uploadDate: '2024-01-12',
          verificationStatus: 'pending',
          transcriptFile: 'transcript_002.pdf',
          courses: {
            total: 44,
            passed: 42,
            excellent: 28
          },
          categoryGPA: {
            major: 3.85,
            general: 3.58,
            elective: 3.65,
            practice: 3.8
          }
        },
        {
          id: '3',
          studentId: '2021001003',
          studentName: '王小红',
          studentAvatar: '',
          className: '计算机科学与技术2021级2班',
          major: '计算机科学与技术',
          gpa: 3.95,
          totalCredits: 160,
          earnedCredits: 160,
          ranking: 1,
          totalStudents: 42,
          graduationStatus: 'qualified',
          uploadDate: '2024-01-18',
          verificationStatus: 'verified',
          transcriptFile: 'transcript_003.pdf',
          courses: {
            total: 45,
            passed: 45,
            excellent: 38
          },
          categoryGPA: {
            major: 4.0,
            general: 3.85,
            elective: 3.92,
            practice: 4.0
          }
        },
        {
          id: '4',
          studentId: '2021001004',
          studentName: '刘小花',
          studentAvatar: '',
          className: '软件工程2021级1班',
          major: '软件工程',
          gpa: 2.85,
          totalCredits: 160,
          earnedCredits: 152,
          ranking: 35,
          totalStudents: 40,
          graduationStatus: 'unqualified',
          uploadDate: '2024-01-10',
          verificationStatus: 'rejected',
          transcriptFile: 'transcript_004.pdf',
          courses: {
            total: 43,
            passed: 38,
            excellent: 15
          },
          categoryGPA: {
            major: 2.95,
            general: 2.68,
            elective: 2.85,
            practice: 3.2
          }
        }
      ];

      setStudents(mockStudents);
    } catch (error) {
      console.error('加载成绩数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationChange = (studentId: string, status: StudentGrade['verificationStatus']) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, verificationStatus: status } : student
    ));
    toast.success('验证状态已更新');
  };

  const handleDelete = (studentId: string) => {
    if (window.confirm('确定要删除这条成绩记录吗？')) {
      setStudents(students.filter(student => student.id !== studentId));
      toast.success('成绩记录已删除');
    }
  };

  const getGraduationStatusColor = (status: string) => {
    switch (status) {
      case 'qualified': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'unqualified': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getGraduationStatusText = (status: string) => {
    switch (status) {
      case 'qualified': return '达标';
      case 'pending': return '待审核';
      case 'unqualified': return '不达标';
      default: return '未知';
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVerificationStatusText = (status: string) => {
    switch (status) {
      case 'verified': return '已验证';
      case 'pending': return '待验证';
      case 'rejected': return '已拒绝';
      default: return '未知';
    }
  };

  const getGpaLevel = (gpa: number) => {
    if (gpa >= 3.7) return { text: '优秀', color: 'text-green-600' };
    if (gpa >= 3.0) return { text: '良好', color: 'text-blue-600' };
    if (gpa >= 2.0) return { text: '及格', color: 'text-yellow-600' };
    return { text: '不及格', color: 'text-red-600' };
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.className.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.graduationStatus === statusFilter;
    const matchesClass = classFilter === 'all' || student.className === classFilter;
    
    return matchesSearch && matchesStatus && matchesClass;
  });

  const stats = {
    total: students.length,
    qualified: students.filter(s => s.graduationStatus === 'qualified').length,
    pending: students.filter(s => s.verificationStatus === 'pending').length,
    avgGpa: students.reduce((sum, s) => sum + s.gpa, 0) / students.length
  };

  const classes = [...new Set(students.map(s => s.className))];

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
          <h1 className="text-2xl text-gray-900">成绩单管理</h1>
          <p className="text-gray-600 mt-1">管理学生成绩单和毕业资格审核</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出报告
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                批量导入
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>批量导入成绩</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">拖拽Excel文件到此处或点击上传</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">取消</Button>
                  <Button className="flex-1">确认导入</Button>
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
                <p className="text-sm text-gray-600">总学生数</p>
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
                <p className="text-sm text-gray-600">毕业达标</p>
                <p className="text-2xl text-green-600">{stats.qualified}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">待审核</p>
                <p className="text-2xl text-yellow-600">{stats.pending}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">平均GPA</p>
                <p className="text-2xl text-purple-600">{stats.avgGpa.toFixed(2)}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
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
                placeholder="搜索学生姓名、学号或班级..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  毕业状态
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>全部状态</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('qualified')}>达标</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>待审核</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('unqualified')}>不达标</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  班级筛选
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setClassFilter('all')}>全部班级</DropdownMenuItem>
                {classes.map((className) => (
                  <DropdownMenuItem key={className} onClick={() => setClassFilter(className)}>
                    {className}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* 学生成绩列表 */}
      <Card>
        <CardHeader>
          <CardTitle>学生成绩列表 ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>学生信息</TableHead>
                <TableHead>学业成绩</TableHead>
                <TableHead>毕业资格</TableHead>
                <TableHead>审核状态</TableHead>
                <TableHead>上传时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={student.studentAvatar} />
                        <AvatarFallback>{student.studentName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm">{student.studentName}</div>
                        <div className="text-xs text-gray-500">{student.studentId}</div>
                        <div className="text-xs text-gray-500">{student.className}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${getGpaLevel(student.gpa).color}`}>
                          GPA: {student.gpa}
                        </span>
                        <Badge className="text-xs bg-blue-100 text-blue-700">
                          #{student.ranking}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        学分: {student.earnedCredits}/{student.totalCredits}
                      </div>
                      <div className="text-xs text-gray-500">
                        优秀: {student.courses.excellent}/{student.courses.total}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getGraduationStatusColor(student.graduationStatus)}`}>
                      {getGraduationStatusText(student.graduationStatus)}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      完成度: {((student.earnedCredits / student.totalCredits) * 100).toFixed(1)}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getVerificationStatusColor(student.verificationStatus)}`}>
                      {getVerificationStatusText(student.verificationStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{student.uploadDate}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedStudent(student)}>
                          <Eye className="w-4 h-4 mr-2" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          下载成绩单
                        </DropdownMenuItem>
                        {student.verificationStatus === 'pending' && (
                          <>
                            <DropdownMenuItem onClick={() => handleVerificationChange(student.id, 'verified')}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              通过验证
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleVerificationChange(student.id, 'rejected')}>
                              <AlertCircle className="w-4 h-4 mr-2" />
                              拒绝验证
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          删除记录
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

      {/* 学生详情对话框 */}
      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <DialogContent className="max-w-4xl">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedStudent.studentName} - 成绩详情</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">成绩概览</TabsTrigger>
                  <TabsTrigger value="analysis">成绩分析</TabsTrigger>
                  <TabsTrigger value="verification">审核记录</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm text-gray-700 mb-3">基本信息</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">学号:</span>
                          <span>{selectedStudent.studentId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">专业:</span>
                          <span>{selectedStudent.major}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">班级:</span>
                          <span>{selectedStudent.className}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">专业排名:</span>
                          <span>#{selectedStudent.ranking} / {selectedStudent.totalStudents}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-3">学业统计</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">总GPA:</span>
                          <span className={getGpaLevel(selectedStudent.gpa).color}>
                            {selectedStudent.gpa}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">获得学分:</span>
                          <span>{selectedStudent.earnedCredits} / {selectedStudent.totalCredits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">通过课程:</span>
                          <span>{selectedStudent.courses.passed} / {selectedStudent.courses.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">优秀课程:</span>
                          <span>{selectedStudent.courses.excellent}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-700 mb-3">分类成绩</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedStudent.categoryGPA).map(([category, gpa]) => (
                        <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm">
                            {category === 'major' ? '专业课' : 
                             category === 'general' ? '通识课' :
                             category === 'elective' ? '选修课' : '实践课'}:
                          </span>
                          <span className={`text-sm ${getGpaLevel(gpa).color}`}>
                            {gpa}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl text-blue-600">{selectedStudent.gpa}</div>
                      <div className="text-sm text-gray-600">总体GPA</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl text-green-600">
                        {((selectedStudent.courses.excellent / selectedStudent.courses.total) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">优秀率</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl text-purple-600">#{selectedStudent.ranking}</div>
                      <div className="text-sm text-gray-600">专业排名</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-700 mb-3">学分完成进度</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>总学分进度</span>
                        <span>{selectedStudent.earnedCredits} / {selectedStudent.totalCredits}</span>
                      </div>
                      <Progress 
                        value={(selectedStudent.earnedCredits / selectedStudent.totalCredits) * 100} 
                        className="h-2"
                      />
                      <div className="text-xs text-gray-500 text-center">
                        完成度: {((selectedStudent.earnedCredits / selectedStudent.totalCredits) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="verification" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm">审核状态</div>
                        <div className="text-xs text-gray-500">当前验证状态</div>
                      </div>
                      <Badge className={`text-xs ${getVerificationStatusColor(selectedStudent.verificationStatus)}`}>
                        {getVerificationStatusText(selectedStudent.verificationStatus)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm">毕业资格</div>
                        <div className="text-xs text-gray-500">是否达到毕业要求</div>
                      </div>
                      <Badge className={`text-xs ${getGraduationStatusColor(selectedStudent.graduationStatus)}`}>
                        {getGraduationStatusText(selectedStudent.graduationStatus)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm">成绩单文件</div>
                        <div className="text-xs text-gray-500">上传时间: {selectedStudent.uploadDate}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        下载
                      </Button>
                    </div>
                  </div>

                  {selectedStudent.verificationStatus === 'pending' && (
                    <div className="flex gap-2 pt-4 border-t">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          handleVerificationChange(selectedStudent.id, 'rejected');
                          setSelectedStudent(null);
                        }}
                      >
                        拒绝验证
                      </Button>
                      <Button 
                        onClick={() => {
                          handleVerificationChange(selectedStudent.id, 'verified');
                          setSelectedStudent(null);
                        }}
                      >
                        通过验证
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                  关闭
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  导出PDF
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
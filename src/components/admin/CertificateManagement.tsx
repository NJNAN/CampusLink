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
  Plus, Search, Filter, Award, FileText, Download, Eye, Edit, Trash2,
  MoreHorizontal, CheckCircle, XCircle, Clock, Trophy, Star, Medal
} from 'lucide-react';
import { toast } from 'sonner';

interface Certificate {
  id: string;
  title: string;
  type: 'academic' | 'honor' | 'skill' | 'competition' | 'volunteer';
  recipient: {
    name: string;
    studentId: string;
    avatar: string;
    class: string;
  };
  issuer: string;
  issueDate: string;
  description: string;
  status: 'active' | 'revoked' | 'expired';
  template: string;
  certificateNumber: string;
  validUntil?: string;
  downloadUrl: string;
}

export default function CertificateManagement() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCertificates: Certificate[] = [
        {
          id: '1',
          title: '优秀学生干部',
          type: 'honor',
          recipient: {
            name: '张三',
            studentId: '2021001001',
            avatar: '',
            class: '计算机科学与技术2021级1班'
          },
          issuer: '福建师范大学学生工作部',
          issueDate: '2023-12-15',
          description: '在担任班长期间表现优秀，获得优秀学生干部荣誉称号',
          status: 'active',
          template: 'honor_template.pdf',
          certificateNumber: 'FJNU2023H001',
          downloadUrl: 'cert_001.pdf'
        },
        {
          id: '2',
          title: '程序设计竞赛三等奖',
          type: 'competition',
          recipient: {
            name: '李小明',
            studentId: '2021001002',
            avatar: '',
            class: '计算机科学与技术2021级1班'
          },
          issuer: 'ACM程序设计竞赛组委会',
          issueDate: '2023-11-20',
          description: '在全国大学生程序设计竞赛中获得三等奖',
          status: 'active',
          template: 'competition_template.pdf',
          certificateNumber: 'ACM2023C001',
          downloadUrl: 'cert_002.pdf'
        },
        {
          id: '3',
          title: '英语四级证书',
          type: 'skill',
          recipient: {
            name: '王小红',
            studentId: '2021001003',
            avatar: '',
            class: '英语专业2021级1班'
          },
          issuer: '全国大学英语四、六级考试委员会',
          issueDate: '2023-09-15',
          description: '大学英语四级考试成绩优秀',
          status: 'active',
          template: 'skill_template.pdf',
          certificateNumber: 'CET42023001',
          downloadUrl: 'cert_003.pdf'
        },
        {
          id: '4',
          title: '志愿服务证书',
          type: 'volunteer',
          recipient: {
            name: '刘小花',
            studentId: '2021001004',
            avatar: '',
            class: '社会工作2021级1班'
          },
          issuer: '福建师范大学团委',
          issueDate: '2023-08-30',
          description: '积极参与志愿服务活动，服务时长达100小时',
          status: 'active',
          template: 'volunteer_template.pdf',
          certificateNumber: 'FJNUV2023001',
          validUntil: '2025-08-30',
          downloadUrl: 'cert_004.pdf'
        },
        {
          id: '5',
          title: '学业优秀奖',
          type: 'academic',
          recipient: {
            name: '陈小强',
            studentId: '2021001005',
            avatar: '',
            class: '数学与应用数学2021级1班'
          },
          issuer: '福建师范大学教务处',
          issueDate: '2023-07-10',
          description: '学年GPA达到3.8以上，获得学业优秀奖',
          status: 'active',
          template: 'academic_template.pdf',
          certificateNumber: 'FJNUA2023001',
          downloadUrl: 'cert_005.pdf'
        }
      ];

      setCertificates(mockCertificates);
    } catch (error) {
      console.error('加载证书数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (certId: string, newStatus: Certificate['status']) => {
    setCertificates(certificates.map(cert => 
      cert.id === certId ? { ...cert, status: newStatus } : cert
    ));
    toast.success('证书状态已更新');
  };

  const handleDelete = (certId: string) => {
    if (window.confirm('确定要删除这张证书吗？')) {
      setCertificates(certificates.filter(cert => cert.id !== certId));
      toast.success('证书已删除');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return <Trophy className="w-4 h-4 text-blue-500" />;
      case 'honor': return <Award className="w-4 h-4 text-yellow-500" />;
      case 'skill': return <Star className="w-4 h-4 text-green-500" />;
      case 'competition': return <Medal className="w-4 h-4 text-purple-500" />;
      case 'volunteer': return <CheckCircle className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-700';
      case 'honor': return 'bg-yellow-100 text-yellow-700';
      case 'skill': return 'bg-green-100 text-green-700';
      case 'competition': return 'bg-purple-100 text-purple-700';
      case 'volunteer': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'academic': return '学术';
      case 'honor': return '荣誉';
      case 'skill': return '技能';
      case 'competition': return '竞赛';
      case 'volunteer': return '志愿';
      default: return '其他';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'revoked': return 'bg-red-100 text-red-700';
      case 'expired': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '有效';
      case 'revoked': return '已撤销';
      case 'expired': return '已过期';
      default: return '未知';
    }
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || cert.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: certificates.length,
    active: certificates.filter(c => c.status === 'active').length,
    honor: certificates.filter(c => c.type === 'honor').length,
    competition: certificates.filter(c => c.type === 'competition').length
  };

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
          <h1 className="text-2xl text-gray-900">证书管理</h1>
          <p className="text-gray-600 mt-1">管理学生荣誉证书和技能证书</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            批量导出
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                颁发证书
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>颁发新证书</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="证书标题" />
                <Input placeholder="获得者姓名" />
                <Input placeholder="获得者学号" />
                <select className="w-full border rounded px-3 py-2">
                  <option>选择证书类型</option>
                  <option value="academic">学术证书</option>
                  <option value="honor">荣誉证书</option>
                  <option value="skill">技能证书</option>
                  <option value="competition">竞赛证书</option>
                  <option value="volunteer">志愿证书</option>
                </select>
                <Input placeholder="颁发机构" />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">取消</Button>
                  <Button className="flex-1">颁发</Button>
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
                <p className="text-sm text-gray-600">总证书数</p>
                <p className="text-2xl text-gray-900">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">有效证书</p>
                <p className="text-2xl text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">荣誉证书</p>
                <p className="text-2xl text-yellow-600">{stats.honor}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">竞赛证书</p>
                <p className="text-2xl text-purple-600">{stats.competition}</p>
              </div>
              <Trophy className="w-8 h-8 text-purple-600" />
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
                placeholder="搜索证书标题、获得者或证书号..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  类型筛选
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTypeFilter('all')}>全部类型</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('academic')}>学术证书</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('honor')}>荣誉证书</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('skill')}>技能证书</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('competition')}>竞赛证书</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('volunteer')}>志愿证书</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  状态筛选
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>全部状态</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>有效</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('revoked')}>已撤销</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('expired')}>已过期</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* 证书列表 */}
      <Card>
        <CardHeader>
          <CardTitle>证书列表 ({filteredCertificates.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>证书信息</TableHead>
                <TableHead>获得者</TableHead>
                <TableHead>颁发信息</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>证书号</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getTypeColor(certificate.type)}`}>
                        {getTypeIcon(certificate.type)}
                      </div>
                      <div>
                        <div className="text-sm">{certificate.title}</div>
                        <Badge className={`text-xs ${getTypeColor(certificate.type)}`}>
                          {getTypeText(certificate.type)}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={certificate.recipient.avatar} />
                        <AvatarFallback>{certificate.recipient.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm">{certificate.recipient.name}</div>
                        <div className="text-xs text-gray-500">{certificate.recipient.studentId}</div>
                        <div className="text-xs text-gray-500">{certificate.recipient.class}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{certificate.issuer}</div>
                      <div className="text-xs text-gray-500">{certificate.issueDate}</div>
                      {certificate.validUntil && (
                        <div className="text-xs text-gray-500">有效至: {certificate.validUntil}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getStatusColor(certificate.status)}`}>
                      {getStatusText(certificate.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{certificate.certificateNumber}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSelectedCertificate(certificate)}>
                          <Eye className="w-4 h-4 mr-2" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          下载证书
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          编辑信息
                        </DropdownMenuItem>
                        {certificate.status === 'active' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(certificate.id, 'revoked')}>
                            <XCircle className="w-4 h-4 mr-2" />
                            撤销证书
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(certificate.id)}
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

      {/* 证书详情对话框 */}
      <Dialog open={!!selectedCertificate} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
        <DialogContent className="max-w-2xl">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCertificate.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${getTypeColor(selectedCertificate.type)}`}>
                    {getTypeIcon(selectedCertificate.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg">{selectedCertificate.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge className={`text-xs ${getTypeColor(selectedCertificate.type)}`}>
                        {getTypeText(selectedCertificate.type)}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(selectedCertificate.status)}`}>
                        {getStatusText(selectedCertificate.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm text-gray-700 mb-3">获得者信息</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">姓名:</span>
                        <span>{selectedCertificate.recipient.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">学号:</span>
                        <span>{selectedCertificate.recipient.studentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">班级:</span>
                        <span>{selectedCertificate.recipient.class}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-700 mb-3">证书信息</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">证书号:</span>
                        <span>{selectedCertificate.certificateNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">颁发日期:</span>
                        <span>{selectedCertificate.issueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">颁发机构:</span>
                        <span>{selectedCertificate.issuer}</span>
                      </div>
                      {selectedCertificate.validUntil && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">有效期至:</span>
                          <span>{selectedCertificate.validUntil}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-700 mb-2">证书描述</h4>
                  <p className="text-sm text-gray-600">{selectedCertificate.description}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedCertificate(null)}>
                    关闭
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    下载证书
                  </Button>
                  {selectedCertificate.status === 'active' && (
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        handleStatusChange(selectedCertificate.id, 'revoked');
                        setSelectedCertificate(null);
                      }}
                    >
                      撤销证书
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
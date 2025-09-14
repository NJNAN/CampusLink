import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, MessageSquare, Bug, Lightbulb, AlertTriangle, ThumbsUp, FileText, Eye, MessageCircle, CheckCircle, Clock, X } from 'lucide-react';
import { toast } from 'sonner';

interface Feedback {
  id: string;
  type: 'bug' | 'suggestion' | 'content' | 'praise' | 'other';
  title: string;
  content: string;
  userInfo: {
    name: string;
    avatar: string;
    contact?: string;
  };
  status: 'pending' | 'processing' | 'resolved' | 'rejected';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  images?: string[];
  createdAt: string;
  assignee?: string;
  reply?: string;
  repliedAt?: string;
}

export default function FeedbackManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const feedbackTypeConfig = {
    bug: { label: '问题反馈', icon: Bug, color: 'destructive' },
    suggestion: { label: '功能建议', icon: Lightbulb, color: 'default' },
    content: { label: '内容举报', icon: AlertTriangle, color: 'destructive' },
    praise: { label: '表扬建议', icon: ThumbsUp, color: 'secondary' },
    other: { label: '其他反馈', icon: FileText, color: 'outline' }
  };

  const statusConfig = {
    pending: { label: '待处理', color: 'destructive' },
    processing: { label: '处理中', color: 'default' },
    resolved: { label: '已解决', color: 'secondary' },
    rejected: { label: '已拒绝', color: 'outline' }
  };

  const priorityConfig = {
    low: { label: '低', color: 'outline' },
    normal: { label: '普通', color: 'secondary' },
    high: { label: '高', color: 'default' },
    urgent: { label: '紧急', color: 'destructive' }
  };

  const mockFeedbacks: Feedback[] = [
    {
      id: '1',
      type: 'bug',
      title: '登录页面加载缓慢',
      content: '每次打开登录页面都需要等待很长时间，希望能优化一下加载速度。特别是在网络不好的情况下，体验很差。',
      userInfo: {
        name: '张同学',
        avatar: '',
        contact: '138****5678'
      },
      status: 'processing',
      priority: 'high',
      images: [],
      createdAt: '2024-01-15 14:30:25',
      assignee: '技术部-李工程师'
    },
    {
      id: '2',
      type: 'suggestion',
      title: '建议增加夜间模式',
      content: '希望能增加夜间模式功能，晚上使用的时候眼睛比较舒服。现在的界面在暗光环境下使用体验不是很好。',
      userInfo: {
        name: '王同学',
        avatar: '',
        contact: 'wang@example.com'
      },
      status: 'pending',
      priority: 'normal',
      images: [],
      createdAt: '2024-01-14 09:15:10'
    },
    {
      id: '3',
      type: 'content',
      title: '发现不当内容',
      content: '在班级动态中发现有用户发布不当言论，希望管理员能及时处理。',
      userInfo: {
        name: '李同学',
        avatar: '',
        contact: '159****9876'
      },
      status: 'resolved',
      priority: 'urgent',
      images: [],
      createdAt: '2024-01-13 16:45:33',
      assignee: '内容审核-张主管',
      reply: '感谢您的举报，我们已经对相关内容进行了处理，并对违规用户进行了警告。',
      repliedAt: '2024-01-13 18:20:15'
    },
    {
      id: '4',
      type: 'praise',
      title: '新版本功能很好用',
      content: '最新版本的班级相册功能做得很棒，上传照片很方便，界面也很美观。希望继续保持！',
      userInfo: {
        name: '赵同学',
        avatar: ''
      },
      status: 'resolved',
      priority: 'low',
      images: [],
      createdAt: '2024-01-12 11:20:45',
      reply: '感谢您的认可！我们会继续努力为大家提供更好的服务。'
    }
  ];

  const filteredFeedbacks = mockFeedbacks.filter(feedback => {
    const matchesSearch = feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.userInfo.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (feedbackId: string, newStatus: string) => {
    toast.success(`反馈状态已更新为：${statusConfig[newStatus as keyof typeof statusConfig].label}`);
  };

  const handlePriorityChange = (feedbackId: string, newPriority: string) => {
    toast.success(`优先级已更新为：${priorityConfig[newPriority as keyof typeof priorityConfig].label}`);
  };

  const handleReply = () => {
    if (!replyContent.trim()) {
      toast.error('请输入回复内容');
      return;
    }
    toast.success('回复已发送');
    setReplyContent('');
    setSelectedFeedback(null);
  };

  const getStatusStats = () => {
    const stats = {
      total: mockFeedbacks.length,
      pending: mockFeedbacks.filter(f => f.status === 'pending').length,
      processing: mockFeedbacks.filter(f => f.status === 'processing').length,
      resolved: mockFeedbacks.filter(f => f.status === 'resolved').length,
      rejected: mockFeedbacks.filter(f => f.status === 'rejected').length
    };
    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">用户反馈管理</h1>
          <p className="text-muted-foreground mt-1">管理用户提交的反馈和建议</p>
        </div>
        <Button>导出反馈</Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">总反馈</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">待处理</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">处理中</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{stats.processing}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">已解决</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{stats.resolved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <X className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">已拒绝</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{stats.rejected}</p>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索反馈标题、内容或用户名..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="筛选状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending">待处理</SelectItem>
                <SelectItem value="processing">处理中</SelectItem>
                <SelectItem value="resolved">已解决</SelectItem>
                <SelectItem value="rejected">已拒绝</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 反馈列表 */}
      <Card>
        <CardHeader>
          <CardTitle>反馈列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFeedbacks.map((feedback) => {
              const TypeIcon = feedbackTypeConfig[feedback.type].icon;
              return (
                <div key={feedback.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <TypeIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{feedback.title}</h3>
                          <Badge variant={feedbackTypeConfig[feedback.type].color as any}>
                            {feedbackTypeConfig[feedback.type].label}
                          </Badge>
                          <Badge variant={statusConfig[feedback.status].color as any}>
                            {statusConfig[feedback.status].label}
                          </Badge>
                          <Badge variant={priorityConfig[feedback.priority].color as any}>
                            {priorityConfig[feedback.priority].label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {feedback.content}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>提交者：{feedback.userInfo.name}</span>
                          <span>时间：{feedback.createdAt}</span>
                          {feedback.assignee && <span>负责人：{feedback.assignee}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedFeedback(feedback)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            查看
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>反馈详情</DialogTitle>
                          </DialogHeader>
                          {selectedFeedback && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">反馈类型</label>
                                  <p className="text-sm text-muted-foreground">
                                    {feedbackTypeConfig[selectedFeedback.type].label}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">状态</label>
                                  <div className="mt-1">
                                    <Select 
                                      value={selectedFeedback.status}
                                      onValueChange={(value) => handleStatusChange(selectedFeedback.id, value)}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">待处理</SelectItem>
                                        <SelectItem value="processing">处理中</SelectItem>
                                        <SelectItem value="resolved">已解决</SelectItem>
                                        <SelectItem value="rejected">已拒绝</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">优先级</label>
                                  <div className="mt-1">
                                    <Select 
                                      value={selectedFeedback.priority}
                                      onValueChange={(value) => handlePriorityChange(selectedFeedback.id, value)}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="low">低</SelectItem>
                                        <SelectItem value="normal">普通</SelectItem>
                                        <SelectItem value="high">高</SelectItem>
                                        <SelectItem value="urgent">紧急</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">提交时间</label>
                                  <p className="text-sm text-muted-foreground">{selectedFeedback.createdAt}</p>
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium">反馈内容</label>
                                <p className="text-sm text-muted-foreground mt-1 p-3 bg-muted rounded">
                                  {selectedFeedback.content}
                                </p>
                              </div>

                              {selectedFeedback.reply && (
                                <div>
                                  <label className="text-sm font-medium">已回复</label>
                                  <p className="text-sm text-muted-foreground mt-1 p-3 bg-blue-50 rounded">
                                    {selectedFeedback.reply}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    回复时间：{selectedFeedback.repliedAt}
                                  </p>
                                </div>
                              )}

                              <div>
                                <label className="text-sm font-medium">回复反馈</label>
                                <Textarea
                                  placeholder="输入回复内容..."
                                  value={replyContent}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  className="mt-1"
                                  rows={4}
                                />
                                <div className="flex justify-end mt-2">
                                  <Button onClick={handleReply}>
                                    <MessageCircle className="h-4 w-4 mr-1" />
                                    发送回复
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { 
  Plus, Search, Filter, Calendar, Users, Eye, Edit, Trash2, 
  MoreHorizontal, FileText, Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  featuredImage: string;
  tags: string[];
}

export default function NewsManagement() {
  const [news, setNews] = useState<News[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockNews: News[] = [
        {
          id: '1',
          title: '福建师范大学举办2024年春季运动会',
          summary: '为期三天的春季运动会圆满落幕，各学院师生积极参与，展现了良好的精神风貌。',
          content: '详细新闻内容...',
          category: '体育活动',
          author: '体育部',
          publishDate: '2024-01-15',
          status: 'published',
          views: 1250,
          featuredImage: 'https://picsum.photos/400/200?random=1',
          tags: ['运动会', '体育', '校园活动']
        },
        {
          id: '2',
          title: '计算机学院与企业合作签约仪式成功举办',
          summary: '学院与多家知名IT企业签署合作协议，为学生提供更多实习和就业机会。',
          content: '详细新闻内容...',
          category: '学术合作',
          author: '计算机学院',
          publishDate: '2024-01-12',
          status: 'published',
          views: 890,
          featuredImage: 'https://picsum.photos/400/200?random=2',
          tags: ['合作', '就业', '企业']
        },
        {
          id: '3',
          title: '学校获得国家级教学成果奖',
          summary: '我校教育创新项目荣获国家级教学成果一等奖，彰显了学校的教学实力。',
          content: '详细新闻内容...',
          category: '教学成果',
          author: '教务处',
          publishDate: '2024-01-10',
          status: 'draft',
          views: 0,
          featuredImage: 'https://picsum.photos/400/200?random=3',
          tags: ['教学', '获奖', '成果']
        }
      ];

      setNews(mockNews);
    } catch (error) {
      console.error('加载新闻数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (newsId: string, newStatus: News['status']) => {
    setNews(news.map(item => 
      item.id === newsId ? { ...item, status: newStatus } : item
    ));
    toast.success('新闻状态已更新');
  };

  const handleDelete = (newsId: string) => {
    if (window.confirm('确定要删除这条新闻吗？')) {
      setNews(news.filter(item => item.id !== newsId));
      toast.success('新闻已删除');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return '已发布';
      case 'draft': return '草稿';
      case 'archived': return '已归档';
      default: return '未知';
    }
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: news.length,
    published: news.filter(n => n.status === 'published').length,
    draft: news.filter(n => n.status === 'draft').length,
    totalViews: news.reduce((sum, n) => sum + n.views, 0)
  };

  const categories = [...new Set(news.map(n => n.category))];

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
          <h1 className="text-2xl text-gray-900">新闻管理</h1>
          <p className="text-gray-600 mt-1">发布和管理校园新闻</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新建新闻
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新建新闻</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="新闻标题" />
              <Input placeholder="新闻摘要" />
              <select className="w-full border rounded px-3 py-2">
                <option>选择分类</option>
                <option>校园新闻</option>
                <option>学术动态</option>
                <option>通知公告</option>
              </select>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">保存草稿</Button>
                <Button className="flex-1">发布</Button>
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
                <p className="text-sm text-gray-600">总新闻数</p>
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
                <p className="text-sm text-gray-600">已发布</p>
                <p className="text-2xl text-green-600">{stats.published}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">草稿</p>
                <p className="text-2xl text-yellow-600">{stats.draft}</p>
              </div>
              <Edit className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总浏览量</p>
                <p className="text-2xl text-purple-600">{stats.totalViews.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
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
                placeholder="搜索新闻标题或作者..."
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
                <DropdownMenuItem onClick={() => setStatusFilter('published')}>已发布</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('draft')}>草稿</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('archived')}>已归档</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  分类筛选
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategoryFilter('all')}>全部分类</DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* 新闻列表 */}
      <Card>
        <CardHeader>
          <CardTitle>新闻列表 ({filteredNews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>新闻信息</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>作者</TableHead>
                <TableHead>发布时间</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>浏览量</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex gap-3">
                      <img src={item.featuredImage} alt={item.title} className="w-16 h-12 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm line-clamp-1">{item.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-2 mt-1">{item.summary}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{item.author}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{item.publishDate}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{item.views.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          预览
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        {item.status === 'draft' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'published')}>
                            发布新闻
                          </DropdownMenuItem>
                        )}
                        {item.status === 'published' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'archived')}>
                            归档新闻
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(item.id)}
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
    </div>
  );
}
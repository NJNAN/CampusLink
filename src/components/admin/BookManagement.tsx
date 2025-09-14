import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  BookOpen,
  Star,
  Calendar,
  User,
  Filter,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishDate: string;
  category: string;
  description: string;
  cover: string;
  rating: number;
  status: 'published' | 'pending' | 'rejected';
  submittedBy: {
    name: string;
    avatar: string;
    class: string;
  };
  submittedAt: string;
  likes: number;
  reviews: number;
}

export default function BookManagement() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      // 模拟加载书籍数据
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockBooks: Book[] = [
        {
          id: '1',
          title: '算法导论',
          author: 'Thomas H. Cormen',
          isbn: '9787111407911',
          publisher: '机械工业出版社',
          publishDate: '2013-01-01',
          category: '计算机科学',
          description: '算法领域的经典教材，涵盖了算法设计与分析的基础理论。',
          cover: '',
          rating: 4.8,
          status: 'published',
          submittedBy: {
            name: '李小明',
            avatar: '',
            class: '计算机科学与技术2021级1班'
          },
          submittedAt: '2024-01-10',
          likes: 156,
          reviews: 23
        },
        {
          id: '2',
          title: 'JavaScript高级程序设计',
          author: 'Nicholas C. Zakas',
          isbn: '9787115275790',
          publisher: '人民邮电出版社',
          publishDate: '2012-03-01',
          category: 'Web开发',
          description: 'JavaScript开发的权威指南，深入讲解JavaScript核心概念。',
          cover: '',
          rating: 4.6,
          status: 'published',
          submittedBy: {
            name: '王小红',
            avatar: '',
            class: '软件工程2021级2班'
          },
          submittedAt: '2024-01-12',
          likes: 89,
          reviews: 15
        },
        {
          id: '3',
          title: '深入理解计算机系统',
          author: 'Randal E. Bryant',
          isbn: '9787111321312',
          publisher: '机械工业出版社',
          publishDate: '2011-01-01',
          category: '计算机科学',
          description: '计算机系统的经典教材，从程序员角度介绍计算机系统实现。',
          cover: '',
          rating: 4.9,
          status: 'pending',
          submittedBy: {
            name: '张三',
            avatar: '',
            class: '计算机科学与技术2021级3班'
          },
          submittedAt: '2024-01-15',
          likes: 45,
          reviews: 8
        }
      ];

      setBooks(mockBooks);
    } catch (error) {
      console.error('加载书籍数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (bookId: string, newStatus: 'published' | 'pending' | 'rejected') => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, status: newStatus } : book
    ));
    toast.success(`书籍状态已更新为${newStatus === 'published' ? '已发布' : newStatus === 'pending' ? '审核中' : '已拒绝'}`);
  };

  const handleDelete = (bookId: string) => {
    setBooks(books.filter(book => book.id !== bookId));
    toast.success('书籍已删除');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return '已发布';
      case 'pending': return '审核中';
      case 'rejected': return '已拒绝';
      default: return '未知';
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: books.length,
    published: books.filter(b => b.status === 'published').length,
    pending: books.filter(b => b.status === 'pending').length,
    rejected: books.filter(b => b.status === 'rejected').length
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
          <h1 className="text-2xl text-gray-900">书籍管理</h1>
          <p className="text-gray-600 mt-1">管理书籍列表，审核用户推荐的书籍</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出数据
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                添加书籍
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加新书籍</DialogTitle>
                <DialogDescription>
                  填写书籍基本信息
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="书籍标题" />
                <Input placeholder="作者" />
                <Input placeholder="ISBN" />
                <Input placeholder="出版社" />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">取消</Button>
                  <Button className="flex-1">保存</Button>
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
                <p className="text-sm text-gray-600">总书籍数</p>
                <p className="text-2xl text-gray-900">{stats.total}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
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
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-green-600" />
              </div>
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
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">已拒绝</p>
                <p className="text-2xl text-red-600">{stats.rejected}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-red-600" />
              </div>
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
                placeholder="搜索书籍、作者或推荐人..."
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
                <DropdownMenuItem onClick={() => setStatusFilter('published')}>
                  已发布
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                  待审核
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('rejected')}>
                  已拒绝
                </DropdownMenuItem>
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
                <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
                  全部分类
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter('计算机科学')}>
                  计算机科学
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter('Web开发')}>
                  Web开发
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter('算法')}>
                  算法
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* 书籍列表 */}
      <Card>
        <CardHeader>
          <CardTitle>书籍列表 ({filteredBooks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <div key={book.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex gap-4">
                  <div className="w-16 h-20 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gray-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg">{book.title}</h3>
                          <Badge className={`text-xs ${getStatusColor(book.status)}`}>
                            {getStatusText(book.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{book.author} • {book.publisher}</p>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{book.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{book.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{book.likes} 喜欢</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{book.reviews} 评论</span>
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelectedBook(book)}>
                            <Eye className="w-4 h-4 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            编辑
                          </DropdownMenuItem>
                          {book.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusChange(book.id, 'published')}>
                                通过审核
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(book.id, 'rejected')}>
                                拒绝审核
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(book.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={book.submittedBy.avatar} />
                          <AvatarFallback>{book.submittedBy.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">
                          {book.submittedBy.name} • {book.submittedBy.class}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{book.submittedAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 书籍详情对话框 */}
      <Dialog open={!!selectedBook} onOpenChange={(open) => !open && setSelectedBook(null)}>
        <DialogContent className="max-w-2xl">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBook.title}</DialogTitle>
                <DialogDescription>
                  {selectedBook.author} • {selectedBook.publisher}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-24 h-32 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-gray-500">ISBN</label>
                        <p>{selectedBook.isbn}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">出版日期</label>
                        <p>{selectedBook.publishDate}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">分类</label>
                        <p>{selectedBook.category}</p>
                      </div>
                      <div>
                        <label className="text-gray-500">评分</label>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{selectedBook.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">描述</label>
                  <p className="text-sm mt-1">{selectedBook.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedBook(null)}>
                    关闭
                  </Button>
                  {selectedBook.status === 'pending' && (
                    <>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          handleStatusChange(selectedBook.id, 'rejected');
                          setSelectedBook(null);
                        }}
                      >
                        拒绝
                      </Button>
                      <Button 
                        onClick={() => {
                          handleStatusChange(selectedBook.id, 'published');
                          setSelectedBook(null);
                        }}
                      >
                        通过审核
                      </Button>
                    </>
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
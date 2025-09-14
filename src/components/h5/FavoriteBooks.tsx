import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Search,
  Plus,
  BookOpen,
  Star,
  Heart,
  MessageCircle,
  Share,
  Filter,
  Bookmark,
  Eye,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  rating: number;
  description: string;
  isbn: string;
  publishYear: string;
  recommendedBy: {
    name: string;
    avatar: string;
    class: string;
  };
  recommendDate: string;
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
}

export default function FavoriteBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    rating: 5,
    tags: ''
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const mockBooks: Book[] = [
      {
        id: '1',
        title: '算法导论',
        author: 'Thomas H. Cormen',
        cover: 'https://picsum.photos/120/180?random=1',
        category: '计算机科学',
        rating: 4.8,
        description: '算法领域的经典教材，全面介绍了算法设计与分析的理论基础。对于计算机专业的学生来说是必读书籍，内容深入浅出，例子丰富。',
        isbn: '9787111407911',
        publishYear: '2013',
        recommendedBy: {
          name: '李小明',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        recommendDate: '2024-01-15',
        likes: 89,
        comments: 23,
        views: 345,
        isLiked: false,
        isBookmarked: true,
        tags: ['算法', '计算机', '教材']
      },
      {
        id: '2',
        title: 'JavaScript高级程序设计',
        author: 'Nicholas C. Zakas',
        cover: 'https://picsum.photos/120/180?random=2',
        category: '前端开发',
        rating: 4.6,
        description: 'JavaScript开发的权威指南，深入讲解JavaScript的核心概念和高级特性，是前端开发者的必备参考书。',
        isbn: '9787115275790',
        publishYear: '2012',
        recommendedBy: {
          name: '王小红',
          avatar: '',
          class: '软件工程2021级2班'
        },
        recommendDate: '2024-01-12',
        likes: 67,
        comments: 18,
        views: 234,
        isLiked: true,
        isBookmarked: false,
        tags: ['JavaScript', '前端', '编程']
      },
      {
        id: '3',
        title: '人类简史',
        author: '尤瓦尔·赫拉利',
        cover: 'https://picsum.photos/120/180?random=3',
        category: '历史人文',
        rating: 4.9,
        description: '从认知革命、农业革命到科学革命，作者用独特的视角重新解读人类历史，启发我们思考人类的未来。',
        isbn: '9787508647357',
        publishYear: '2014',
        recommendedBy: {
          name: '张三',
          avatar: '',
          class: '历史学2021级1班'
        },
        recommendDate: '2024-01-10',
        likes: 134,
        comments: 45,
        views: 567,
        isLiked: false,
        isBookmarked: true,
        tags: ['历史', '人文', '思考']
      },
      {
        id: '4',
        title: '设计心理学',
        author: '唐纳德·诺曼',
        cover: 'https://picsum.photos/120/180?random=4',
        category: '设计艺术',
        rating: 4.5,
        description: '探讨人与设计的关系，解释了为什么有些设计让人愉悦，有些却让人困惑。对于设计师和产品经理都很有价值。',
        isbn: '9787508649016',
        publishYear: '2010',
        recommendedBy: {
          name: '刘小花',
          avatar: '',
          class: '设计学2021级1班'
        },
        recommendDate: '2024-01-08',
        likes: 56,
        comments: 12,
        views: 189,
        isLiked: true,
        isBookmarked: false,
        tags: ['设计', '心理学', '用户体验']
      }
    ];
    setBooks(mockBooks);
  };

  const handleLike = (bookId: string) => {
    setBooks(books.map(book => 
      book.id === bookId 
        ? { 
            ...book, 
            isLiked: !book.isLiked,
            likes: book.isLiked ? book.likes - 1 : book.likes + 1
          }
        : book
    ));
  };

  const handleBookmark = (bookId: string) => {
    setBooks(books.map(book => 
      book.id === bookId 
        ? { ...book, isBookmarked: !book.isBookmarked }
        : book
    ));
    
    const book = books.find(b => b.id === bookId);
    if (book) {
      toast.success(book.isBookmarked ? '已取消收藏' : '已收藏');
    }
  };

  const handleAddBook = () => {
    if (!newBook.title.trim() || !newBook.author.trim()) {
      toast.error('请填写书名和作者');
      return;
    }

    const book: Book = {
      id: String(Date.now()),
      title: newBook.title,
      author: newBook.author,
      cover: `https://picsum.photos/120/180?random=${Date.now()}`,
      category: newBook.category || '其他',
      rating: newBook.rating,
      description: newBook.description,
      isbn: '',
      publishYear: new Date().getFullYear().toString(),
      recommendedBy: {
        name: '张三',
        avatar: '',
        class: '计算机科学与技术2021级1班'
      },
      recommendDate: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0,
      views: 0,
      isLiked: false,
      isBookmarked: false,
      tags: newBook.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setBooks([book, ...books]);
    setNewBook({ title: '', author: '', category: '', description: '', rating: 5, tags: '' });
    setIsAddDialogOpen(false);
    toast.success('推荐书籍成功！');
  };

  const categories = ['all', '计算机科学', '前端开发', '历史人文', '设计艺术', '文学小说', '其他'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.recommendedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">喜欢的书</h1>
              <p className="text-sm text-gray-600">分享好书推荐</p>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                推荐书籍
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>推荐一本好书</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="书名"
                  value={newBook.title}
                  onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                />
                <Input
                  placeholder="作者"
                  value={newBook.author}
                  onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                />
                <Input
                  placeholder="分类"
                  value={newBook.category}
                  onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                />
                <Textarea
                  placeholder="推荐理由"
                  value={newBook.description}
                  onChange={(e) => setNewBook({...newBook, description: e.target.value})}
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm">评分:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 cursor-pointer ${
                          i < newBook.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                        onClick={() => setNewBook({...newBook, rating: i + 1})}
                      />
                    ))}
                  </div>
                </div>
                <Input
                  placeholder="标签（用逗号分隔）"
                  value={newBook.tags}
                  onChange={(e) => setNewBook({...newBook, tags: e.target.value})}
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                    取消
                  </Button>
                  <Button onClick={handleAddBook} className="flex-1">
                    推荐
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 搜索栏 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索书名、作者或推荐人..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 分类筛选 */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? '全部' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg text-blue-600">{books.length}</div>
              <div className="text-sm text-gray-500">推荐书籍</div>
            </div>
            <div>
              <div className="text-lg text-red-500">
                {books.reduce((sum, book) => sum + book.likes, 0)}
              </div>
              <div className="text-sm text-gray-500">总点赞</div>
            </div>
            <div>
              <div className="text-lg text-green-500">
                {books.filter(book => book.isBookmarked).length}
              </div>
              <div className="text-sm text-gray-500">已收藏</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 书籍列表 */}
      <div className="px-4">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">列表模式</TabsTrigger>
            <TabsTrigger value="grid">卡片模式</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <img 
                        src={book.cover} 
                        alt={book.title}
                        className="w-16 h-24 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-sm line-clamp-1 mb-1">{book.title}</h3>
                            <p className="text-xs text-gray-600 mb-1">{book.author}</p>
                            <div className="flex items-center gap-1 mb-2">
                              {renderStars(book.rating)}
                              <span className="text-xs text-gray-500 ml-1">{book.rating}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmark(book.id)}
                            className={`w-6 h-6 p-0 ${book.isBookmarked ? 'text-yellow-500' : 'text-gray-400'}`}
                          >
                            <Bookmark className={`w-3 h-3 ${book.isBookmarked ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                        
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{book.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src={book.recommendedBy.avatar} />
                              <AvatarFallback>{book.recommendedBy.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-500">{book.recommendedBy.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(book.id)}
                              className={`h-auto p-1 ${book.isLiked ? 'text-red-500' : 'text-gray-400'}`}
                            >
                              <Heart className={`w-3 h-3 ${book.isLiked ? 'fill-current' : ''}`} />
                              <span className="text-xs ml-1">{book.likes}</span>
                            </Button>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Eye className="w-3 h-3" />
                              <span>{book.views}</span>
                            </div>
                          </div>
                        </div>
                        
                        {book.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {book.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grid" className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="border-0 shadow-sm">
                  <div className="relative">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBookmark(book.id)}
                      className={`absolute top-2 right-2 w-6 h-6 p-0 bg-white/80 hover:bg-white ${
                        book.isBookmarked ? 'text-yellow-500' : 'text-gray-600'
                      }`}
                    >
                      <Bookmark className={`w-3 h-3 ${book.isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm line-clamp-2 mb-1">{book.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(book.rating)}
                      <span className="text-xs text-gray-500 ml-1">{book.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{book.recommendedBy.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(book.id)}
                        className={`h-auto p-1 ${book.isLiked ? 'text-red-500' : 'text-gray-400'}`}
                      >
                        <Heart className={`w-3 h-3 ${book.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs ml-1">{book.likes}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部间距 */}
      <div className="h-20"></div>
    </div>
  );
}
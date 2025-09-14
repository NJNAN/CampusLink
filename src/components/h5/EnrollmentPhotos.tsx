import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  ArrowLeft,
  Upload,
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  Camera,
  Filter,
  Grid3X3,
  List,
  Search,
  Download,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Photo {
  id: string;
  url: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    class: string;
  };
  uploadedAt: string;
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  tags: string[];
}

export default function EnrollmentPhotos() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    tags: ''
  });

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    // 模拟加载入学照片数据
    const mockPhotos: Photo[] = [
      {
        id: '1',
        url: 'https://picsum.photos/400/300?random=1',
        title: '入学第一天',
        description: '激动地踏进校园的那一刻，一切都是那么新鲜美好！',
        author: {
          name: '李小明',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        uploadedAt: '2024-01-15',
        likes: 45,
        comments: 12,
        views: 156,
        isLiked: false,
        tags: ['入学', '校园', '第一天']
      },
      {
        id: '2',
        url: 'https://picsum.photos/400/300?random=2',
        title: '宿舍合影',
        description: '和室友们的第一张合影，希望我们能成为最好的朋友！',
        author: {
          name: '王小红',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        uploadedAt: '2024-01-14',
        likes: 38,
        comments: 8,
        views: 89,
        isLiked: true,
        tags: ['宿舍', '室友', '友谊']
      },
      {
        id: '3',
        url: 'https://picsum.photos/400/300?random=3',
        title: '迎新晚会',
        description: '精彩的迎新晚会，感受到了学校的热情和活力！',
        author: {
          name: '张三',
          avatar: '',
          class: '计算机科学与技术2021级2班'
        },
        uploadedAt: '2024-01-13',
        likes: 67,
        comments: 23,
        views: 234,
        isLiked: false,
        tags: ['迎新', '晚会', '活动']
      },
      {
        id: '4',
        url: 'https://picsum.photos/400/300?random=4',
        title: '图书馆初体验',
        description: '第一次走进学校图书馆，被这里的学习氛围深深震撼！',
        author: {
          name: '刘小花',
          avatar: '',
          class: '软件工程2021级1班'
        },
        uploadedAt: '2024-01-12',
        likes: 29,
        comments: 5,
        views: 78,
        isLiked: true,
        tags: ['图书馆', '学习', '氛围']
      }
    ];
    setPhotos(mockPhotos);
  };

  const handleLike = (photoId: string) => {
    setPhotos(photos.map(photo => 
      photo.id === photoId 
        ? { 
            ...photo, 
            isLiked: !photo.isLiked,
            likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1
          }
        : photo
    ));
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploadDialogOpen(true);
    }
  };

  const handleSubmitUpload = () => {
    if (!uploadForm.title.trim()) {
      toast.error('请输入照片标题');
      return;
    }

    const newPhoto: Photo = {
      id: String(Date.now()),
      url: `https://picsum.photos/400/300?random=${Date.now()}`,
      title: uploadForm.title,
      description: uploadForm.description,
      author: {
        name: '张三',
        avatar: '',
        class: '计算机科学与技术2021级1班'
      },
      uploadedAt: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0,
      views: 0,
      isLiked: false,
      tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setPhotos([newPhoto, ...photos]);
    setUploadForm({ title: '', description: '', tags: '' });
    setIsUploadDialogOpen(false);
    toast.success('照片上传成功！');
  };

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              <h1 className="text-lg">入学照片</h1>
              <p className="text-sm text-gray-600">记录美好的入学时光</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </Button>
            
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" onClick={handleUpload}>
                  <Upload className="w-4 h-4 mr-1" />
                  上传
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>上传入学照片</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="照片标题"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="照片描述"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                  />
                  <Input
                    placeholder="标签（用逗号分隔）"
                    value={uploadForm.tags}
                    onChange={(e) => setUploadForm({...uploadForm, tags: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)} className="flex-1">
                      取消
                    </Button>
                    <Button onClick={handleSubmitUpload} className="flex-1">
                      上传
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索照片、标签或作者..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 统计信息 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg text-blue-600">{photos.length}</div>
              <div className="text-sm text-gray-500">总照片</div>
            </div>
            <div>
              <div className="text-lg text-red-500">
                {photos.reduce((sum, photo) => sum + photo.likes, 0)}
              </div>
              <div className="text-sm text-gray-500">总点赞</div>
            </div>
            <div>
              <div className="text-lg text-green-500">
                {photos.reduce((sum, photo) => sum + photo.views, 0)}
              </div>
              <div className="text-sm text-gray-500">总浏览</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 照片列表 */}
      <div className="px-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredPhotos.map((photo) => (
              <Card 
                key={photo.id} 
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square relative">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-8 h-8 p-0 bg-white/80 hover:bg-white ${
                        photo.isLiked ? 'text-red-500' : 'text-gray-600'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(photo.id);
                      }}
                    >
                      <Heart className={`w-4 h-4 ${photo.isLiked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm line-clamp-1 mb-1">{photo.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{photo.author.name}</span>
                    <div className="flex items-center gap-2">
                      <span>{photo.likes}</span>
                      <Eye className="w-3 h-3" />
                      <span>{photo.views}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPhotos.map((photo) => (
              <Card 
                key={photo.id} 
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedPhoto(photo)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img 
                      src={photo.url} 
                      alt={photo.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm line-clamp-1">{photo.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-6 h-6 p-0 ${
                            photo.isLiked ? 'text-red-500' : 'text-gray-400'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(photo.id);
                          }}
                        >
                          <Heart className={`w-3 h-3 ${photo.isLiked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">{photo.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={photo.author.avatar} />
                            <AvatarFallback>{photo.author.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-500">{photo.author.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{photo.likes} 赞</span>
                          <span>{photo.views} 看</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 照片详情对话框 */}
      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-md p-0">
          {selectedPhoto && (
            <>
              <div className="relative">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title}
                  className="w-full h-64 object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute top-4 right-4 w-8 h-8 p-0 bg-white/80 hover:bg-white ${
                    selectedPhoto.isLiked ? 'text-red-500' : 'text-gray-600'
                  }`}
                  onClick={() => handleLike(selectedPhoto.id)}
                >
                  <Heart className={`w-4 h-4 ${selectedPhoto.isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="text-lg mb-2">{selectedPhoto.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{selectedPhoto.description}</p>
                
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedPhoto.author.avatar} />
                    <AvatarFallback>{selectedPhoto.author.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm">{selectedPhoto.author.name}</div>
                    <div className="text-xs text-gray-500">{selectedPhoto.author.class}</div>
                  </div>
                </div>

                {selectedPhoto.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {selectedPhoto.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{selectedPhoto.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{selectedPhoto.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedPhoto.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 底部间距 */}
      <div className="h-20"></div>
    </div>
  );
}
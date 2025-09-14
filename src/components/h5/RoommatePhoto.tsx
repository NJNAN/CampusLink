import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  ArrowLeft,
  Heart,
  MessageCircle,
  Share,
  Plus,
  Users,
  Home,
  Calendar,
  Camera,
  MapPin,
  Utensils,
  Gamepad2,
  Book
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RoommatePhoto {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  dormitory: string;
  participants: string[];
  uploadTime: string;
  occasion: string;
  category: 'daily' | 'party' | 'study' | 'cooking' | 'game' | 'festival';
  likes: number;
  comments: number;
  isLiked: boolean;
  uploader: {
    name: string;
    avatar: string;
    bed: string;
  };
}

export default function RoommatePhoto() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const [photos, setPhotos] = useState<RoommatePhoto[]>([
    {
      id: '1',
      imageUrl: 'https://picsum.photos/400/300?random=30',
      title: '宿舍聚餐',
      description: '今天大家一起下厨做了火锅，虽然厨艺一般但气氛超棒！',
      dormitory: '6号楼302',
      participants: ['张小明', '李小红', '王小强', '刘小花'],
      uploadTime: '2小时前',
      occasion: '周末聚餐',
      category: 'cooking',
      likes: 45,
      comments: 12,
      isLiked: true,
      uploader: {
        name: '张小明',
        avatar: '',
        bed: '上铺1号'
      }
    },
    {
      id: '2',
      imageUrl: 'https://picsum.photos/400/300?random=31',
      title: '深夜学习',
      description: '期末复习周，室友们一起在宿舍熬夜复习，互相鼓励加油！',
      dormitory: '6号楼302',
      participants: ['张小明', '李小红', '王小强'],
      uploadTime: '1天前',
      occasion: '期末复习',
      category: 'study',
      likes: 78,
      comments: 23,
      isLiked: false,
      uploader: {
        name: '李小红',
        avatar: '',
        bed: '下铺2号'
      }
    },
    {
      id: '3',
      imageUrl: 'https://picsum.photos/400/300?random=32',
      title: '生日惊喜',
      description: '给小强准备的生日惊喜，看他感动的眼泪都快掉下来了哈哈',
      dormitory: '6号楼302',
      participants: ['张小明', '李小红', '王小强', '刘小花'],
      uploadTime: '3天前',
      occasion: '王小强生日',
      category: 'party',
      likes: 156,
      comments: 45,
      isLiked: true,
      uploader: {
        name: '刘小花',
        avatar: '',
        bed: '上铺2号'
      }
    },
    {
      id: '4',
      imageUrl: 'https://picsum.photos/400/300?random=33',
      title: '游戏大战',
      description: '周末一起玩游戏，激烈的团战现场！输的人请吃夜宵😂',
      dormitory: '6号楼302',
      participants: ['张小明', '王小强'],
      uploadTime: '1周前',
      occasion: '周末娱乐',
      category: 'game',
      likes: 89,
      comments: 18,
      isLiked: false,
      uploader: {
        name: '王小强',
        avatar: '',
        bed: '下铺1号'
      }
    },
    {
      id: '5',
      imageUrl: 'https://picsum.photos/400/300?random=34',
      title: '宿舍装饰',
      description: '一起装饰宿舍，贴了新的海报和挂了小彩灯，感觉像家一样温馨',
      dormitory: '6号楼302',
      participants: ['张小明', '李小红', '王小强', '刘小花'],
      uploadTime: '2周前',
      occasion: '宿舍美化',
      category: 'daily',
      likes: 234,
      comments: 56,
      isLiked: true,
      uploader: {
        name: '李小红',
        avatar: '',
        bed: '下铺2号'
      }
    },
    {
      id: '6',
      imageUrl: 'https://picsum.photos/400/300?random=35',
      title: '中秋节团圆',
      description: '中秋节一起吃月饼赏月，虽然不在家但有室友陪伴也很温暖',
      dormitory: '6号楼302',
      participants: ['张小明', '李小红', '王小强', '刘小花'],
      uploadTime: '1个月前',
      occasion: '中秋节',
      category: 'festival',
      likes: 312,
      comments: 78,
      isLiked: false,
      uploader: {
        name: '张小明',
        avatar: '',
        bed: '上铺1号'
      }
    }
  ]);

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'daily': return 'bg-blue-100 text-blue-700';
      case 'party': return 'bg-pink-100 text-pink-700';
      case 'study': return 'bg-green-100 text-green-700';
      case 'cooking': return 'bg-orange-100 text-orange-700';
      case 'game': return 'bg-purple-100 text-purple-700';
      case 'festival': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'daily': return '日常';
      case 'party': return '聚会';
      case 'study': return '学习';
      case 'cooking': return '下厨';
      case 'game': return '游戏';
      case 'festival': return '节日';
      default: return '其他';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'daily': return <Home className="w-3 h-3" />;
      case 'party': return <Users className="w-3 h-3" />;
      case 'study': return <Book className="w-3 h-3" />;
      case 'cooking': return <Utensils className="w-3 h-3" />;
      case 'game': return <Gamepad2 className="w-3 h-3" />;
      case 'festival': return <Calendar className="w-3 h-3" />;
      default: return <Camera className="w-3 h-3" />;
    }
  };

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory);

  const stats = {
    totalPhotos: photos.length,
    totalLikes: photos.reduce((sum, p) => sum + p.likes, 0),
    totalComments: photos.reduce((sum, p) => sum + p.comments, 0),
    roommates: 4
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">舍友合影</h1>
              <p className="text-sm text-gray-600">温馨宿舍时光</p>
            </div>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            上传
          </Button>
        </div>
      </div>

      {/* 宿舍信息卡片 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm">6号楼302宿舍</h3>
              <p className="text-xs text-gray-500">温馨四人间</p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-lg text-blue-600">{stats.totalPhotos}</div>
              <div className="text-xs text-gray-500">张照片</div>
            </div>
            <div>
              <div className="text-lg text-red-600">{stats.totalLikes}</div>
              <div className="text-xs text-gray-500">总点赞</div>
            </div>
            <div>
              <div className="text-lg text-green-600">{stats.totalComments}</div>
              <div className="text-xs text-gray-500">评论数</div>
            </div>
            <div>
              <div className="text-lg text-purple-600">{stats.roommates}</div>
              <div className="text-xs text-gray-500">室友</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 室友头像 */}
      <Card className="mx-4 mb-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <h4 className="text-sm mb-3 text-gray-700">室友们</h4>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <Avatar className="w-12 h-12 mx-auto mb-1">
                <AvatarImage src="" />
                <AvatarFallback>张</AvatarFallback>
              </Avatar>
              <div className="text-xs text-gray-600">张小明</div>
              <div className="text-xs text-gray-400">上铺1</div>
            </div>
            <div className="text-center">
              <Avatar className="w-12 h-12 mx-auto mb-1">
                <AvatarImage src="" />
                <AvatarFallback>李</AvatarFallback>
              </Avatar>
              <div className="text-xs text-gray-600">李小红</div>
              <div className="text-xs text-gray-400">下铺2</div>
            </div>
            <div className="text-center">
              <Avatar className="w-12 h-12 mx-auto mb-1">
                <AvatarImage src="" />
                <AvatarFallback>王</AvatarFallback>
              </Avatar>
              <div className="text-xs text-gray-600">王小强</div>
              <div className="text-xs text-gray-400">下铺1</div>
            </div>
            <div className="text-center">
              <Avatar className="w-12 h-12 mx-auto mb-1">
                <AvatarImage src="" />
                <AvatarFallback>刘</AvatarFallback>
              </Avatar>
              <div className="text-xs text-gray-600">刘小花</div>
              <div className="text-xs text-gray-400">上铺2</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分类筛选 */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button 
            variant={activeCategory === 'all' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveCategory('all')}
            className="text-xs whitespace-nowrap"
          >
            全部
          </Button>
          <Button 
            variant={activeCategory === 'daily' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveCategory('daily')}
            className="text-xs whitespace-nowrap"
          >
            日常
          </Button>
          <Button 
            variant={activeCategory === 'cooking' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveCategory('cooking')}
            className="text-xs whitespace-nowrap"
          >
            下厨
          </Button>
          <Button 
            variant={activeCategory === 'study' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveCategory('study')}
            className="text-xs whitespace-nowrap"
          >
            学习
          </Button>
          <Button 
            variant={activeCategory === 'party' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveCategory('party')}
            className="text-xs whitespace-nowrap"
          >
            聚会
          </Button>
          <Button 
            variant={activeCategory === 'game' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setActiveCategory('game')}
            className="text-xs whitespace-nowrap"
          >
            游戏
          </Button>
        </div>
      </div>

      {/* 照片列表 */}
      <div className="px-4 space-y-4">
        {filteredPhotos.map((photo) => (
          <Card key={photo.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              {/* 上传者信息 */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={photo.uploader.avatar} />
                  <AvatarFallback>{photo.uploader.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{photo.uploader.name}</span>
                    <Badge className={`text-xs ${getCategoryColor(photo.category)}`}>
                      {getCategoryIcon(photo.category)}
                      <span className="ml-1">{getCategoryText(photo.category)}</span>
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">{photo.uploader.bed} · {photo.uploadTime}</div>
                </div>
              </div>

              {/* 照片 */}
              <div className="mb-3">
                <img 
                  src={photo.imageUrl} 
                  alt={photo.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* 照片信息 */}
              <div className="mb-3">
                <h3 className="text-sm mb-1">{photo.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
                
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{photo.dormitory}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{photo.occasion}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{photo.participants.length}人</span>
                  </div>
                </div>
              </div>

              {/* 参与者列表 */}
              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">参与者:</div>
                <div className="flex flex-wrap gap-1">
                  {photo.participants.map((participant, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {participant}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 互动按钮 */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(photo.id)}
                    className={`flex items-center gap-1 text-xs p-1 h-auto ${
                      photo.isLiked ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${photo.isLiked ? 'fill-current' : ''}`} />
                    <span>{photo.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-gray-500 p-1 h-auto">
                    <MessageCircle className="w-4 h-4" />
                    <span>{photo.comments}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500 p-1 h-auto">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPhotos.length === 0 && (
          <div className="text-center py-8">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">暂无照片</h3>
            <p className="text-sm text-gray-500">该分类下还没有舍友合影</p>
          </div>
        )}
      </div>

      {/* 温馨提示 */}
      <Card className="m-4 border-0 shadow-sm bg-gradient-to-r from-orange-50 to-pink-50">
        <CardContent className="p-4 text-center">
          <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <h3 className="text-sm mb-1 text-gray-800">宿舍是第二个家</h3>
          <p className="text-xs text-gray-600">记录与室友的美好时光</p>
        </CardContent>
      </Card>

      <div className="h-20"></div>
    </div>
  );
}
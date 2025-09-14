import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Camera,
  Heart,
  MessageCircle,
  Share,
  Plus,
  Calendar,
  Users,
  Download,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClassPhoto {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  occasion: string;
  date: string;
  photographer: string;
  participants: number;
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  category: 'graduation' | 'activity' | 'daily' | 'ceremony' | 'outing';
}

export default function ClassPhoto() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  const [photos, setPhotos] = useState<ClassPhoto[]>([
    {
      id: '1',
      imageUrl: 'https://picsum.photos/400/300?random=10',
      title: '毕业合影',
      description: '四年大学时光即将结束，全班同学在校门口留下最后的合影',
      occasion: '毕业典礼',
      date: '2024-06-20',
      photographer: '张小明',
      participants: 42,
      likes: 156,
      comments: 23,
      views: 892,
      isLiked: true,
      category: 'graduation'
    },
    {
      id: '2',
      imageUrl: 'https://picsum.photos/400/300?random=11',
      title: '开学第一天',
      description: '大一新生入学第一天，大家都很青涩，但满怀期待',
      occasion: '新生入学',
      date: '2021-09-01',
      photographer: '辅导员王老师',
      participants: 45,
      likes: 89,
      comments: 12,
      views: 456,
      isLiked: false,
      category: 'ceremony'
    },
    {
      id: '3',
      imageUrl: 'https://picsum.photos/400/300?random=12',
      title: '秋游合影',
      description: '班级秋游活动，大家在公园里度过了愉快的一天',
      occasion: '班级秋游',
      date: '2022-11-15',
      photographer: '李小红',
      participants: 38,
      likes: 234,
      comments: 45,
      views: 1234,
      isLiked: true,
      category: 'outing'
    },
    {
      id: '4',
      imageUrl: 'https://picsum.photos/400/300?random=13',
      title: '元旦晚会',
      description: '班级元旦晚会后的大合影，每个人脸上都洋溢着笑容',
      occasion: '元旦晚会',
      date: '2023-12-31',
      photographer: '陈小强',
      participants: 40,
      likes: 178,
      comments: 67,
      views: 789,
      isLiked: false,
      category: 'activity'
    },
    {
      id: '5',
      imageUrl: 'https://picsum.photos/400/300?random=14',
      title: '期末复习',
      description: '期末考试前，大家在图书馆一起复习的珍贵时刻',
      occasion: '期末复习',
      date: '2023-01-10',
      photographer: '刘小花',
      participants: 35,
      likes: 145,
      comments: 34,
      views: 567,
      isLiked: true,
      category: 'daily'
    },
    {
      id: '6',
      imageUrl: 'https://picsum.photos/400/300?random=15',
      title: '班级聚餐',
      description: '学期末的班级聚餐，大家围坐一桌其乐融融',
      occasion: '班级聚餐',
      date: '2023-07-05',
      photographer: '周小美',
      participants: 43,
      likes: 312,
      comments: 89,
      views: 1567,
      isLiked: false,
      category: 'activity'
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
      case 'graduation': return 'bg-red-100 text-red-700';
      case 'activity': return 'bg-purple-100 text-purple-700';
      case 'daily': return 'bg-blue-100 text-blue-700';
      case 'ceremony': return 'bg-yellow-100 text-yellow-700';
      case 'outing': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'graduation': return '毕业';
      case 'activity': return '活动';
      case 'daily': return '日常';
      case 'ceremony': return '典礼';
      case 'outing': return '出游';
      default: return '其他';
    }
  };

  const filteredPhotos = activeTab === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeTab);

  const stats = {
    total: photos.length,
    totalLikes: photos.reduce((sum, p) => sum + p.likes, 0),
    totalViews: photos.reduce((sum, p) => sum + p.views, 0),
    avgParticipants: Math.round(photos.reduce((sum, p) => sum + p.participants, 0) / photos.length)
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
              <h1 className="text-lg">班级合影</h1>
              <p className="text-sm text-gray-600">珍贵的集体回忆</p>
            </div>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            上传
          </Button>
        </div>
      </div>

      {/* 统计信息 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-lg text-blue-600">{stats.total}</div>
              <div className="text-xs text-gray-500">张照片</div>
            </div>
            <div>
              <div className="text-lg text-red-600">{stats.totalLikes}</div>
              <div className="text-xs text-gray-500">总点赞</div>
            </div>
            <div>
              <div className="text-lg text-green-600">{stats.totalViews}</div>
              <div className="text-xs text-gray-500">总浏览</div>
            </div>
            <div>
              <div className="text-lg text-purple-600">{stats.avgParticipants}</div>
              <div className="text-xs text-gray-500">平均参与</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分类筛选 */}
      <div className="px-4 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
              variant={activeTab === 'all' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('all')}
              className="text-xs whitespace-nowrap"
            >
              全部
            </Button>
            <Button 
              variant={activeTab === 'graduation' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('graduation')}
              className="text-xs whitespace-nowrap"
            >
              毕业
            </Button>
            <Button 
              variant={activeTab === 'activity' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('activity')}
              className="text-xs whitespace-nowrap"
            >
              活动
            </Button>
            <Button 
              variant={activeTab === 'daily' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('daily')}
              className="text-xs whitespace-nowrap"
            >
              日常
            </Button>
            <Button 
              variant={activeTab === 'ceremony' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('ceremony')}
              className="text-xs whitespace-nowrap"
            >
              典礼
            </Button>
            <Button 
              variant={activeTab === 'outing' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('outing')}
              className="text-xs whitespace-nowrap"
            >
              出游
            </Button>
          </div>
        </Tabs>
      </div>

      {/* 照片展示 */}
      <div className="px-4 space-y-4">
        {filteredPhotos.map((photo) => (
          <Card key={photo.id} className="border-0 shadow-sm overflow-hidden">
            <div className="relative">
              <img 
                src={photo.imageUrl} 
                alt={photo.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge className={`text-xs ${getCategoryColor(photo.category)}`}>
                  {getCategoryText(photo.category)}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(photo.id)}
                  className={`p-2 h-auto bg-black/20 backdrop-blur-sm ${
                    photo.isLiked ? 'text-red-500' : 'text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${photo.isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-sm text-white mb-1">{photo.title}</div>
                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{photo.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{photo.participants}人</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
                <div className="text-xs text-gray-500">
                  <span>{photo.occasion} · </span>
                  <span>摄影：{photo.photographer}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{photo.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>{photo.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{photo.comments}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-500 p-1 h-auto">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 p-1 h-auto">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPhotos.length === 0 && (
          <div className="text-center py-8">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">暂无照片</h3>
            <p className="text-sm text-gray-500">该分类下暂无班级合影</p>
          </div>
        )}
      </div>

      {/* 班级信息卡片 */}
      <Card className="m-4 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4 text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-sm mb-1 text-gray-800">计算机科学与技术2021级1班</h3>
          <p className="text-xs text-gray-600">45名同学的美好回忆都在这里</p>
        </CardContent>
      </Card>

      <div className="h-20"></div>
    </div>
  );
}
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
  MapPin,
  Calendar,
  Eye,
  Download,
  Grid3X3,
  List
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CampusPhoto {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  location: string;
  category: 'building' | 'nature' | 'activity' | 'people' | 'season' | 'night';
  photographer: {
    name: string;
    avatar: string;
    class: string;
  };
  uploadTime: string;
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  tags: string[];
}

export default function CampusPhoto() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [photos, setPhotos] = useState<CampusPhoto[]>([
    {
      id: '1',
      imageUrl: 'https://picsum.photos/400/300?random=1',
      title: '春日樱花盛开',
      description: '春天的校园里，樱花树下粉色花瓣飞舞，美不胜收',
      location: '樱花大道',
      category: 'nature',
      photographer: {
        name: '张小美',
        avatar: '',
        class: '文学院2021级'
      },
      uploadTime: '2小时前',
      likes: 156,
      comments: 23,
      views: 892,
      isLiked: false,
      tags: ['樱花', '春天', '美景']
    },
    {
      id: '2',
      imageUrl: 'https://picsum.photos/400/300?random=2',
      title: '图书馆夜景',
      description: '华灯初上时分，图书馆在夜色中格外庄严美丽',
      location: '图书馆',
      category: 'night',
      photographer: {
        name: '李小强',
        avatar: '',
        class: '计算机学院2022级'
      },
      uploadTime: '5小时前',
      likes: 89,
      comments: 12,
      views: 456,
      isLiked: true,
      tags: ['夜景', '图书馆', '灯光']
    },
    {
      id: '3',
      imageUrl: 'https://picsum.photos/400/300?random=3',
      title: '教学楼的金秋',
      description: '秋天的梧桐叶子黄了，为古朴的教学楼增添了诗意',
      location: '文科楼',
      category: 'season',
      photographer: {
        name: '王小丽',
        avatar: '',
        class: '历史学院2020级'
      },
      uploadTime: '1天前',
      likes: 234,
      comments: 45,
      views: 1234,
      isLiked: false,
      tags: ['秋天', '梧桐', '教学楼']
    },
    {
      id: '4',
      imageUrl: 'https://picsum.photos/400/300?random=4',
      title: '社团活动精彩瞬间',
      description: '文艺晚会上同学们精彩的表演，青春的活力四射',
      location: '学生活动中心',
      category: 'activity',
      photographer: {
        name: '陈小帅',
        avatar: '',
        class: '音乐学院2021级'
      },
      uploadTime: '2天前',
      likes: 178,
      comments: 67,
      views: 789,
      isLiked: true,
      tags: ['活动', '表演', '青春']
    },
    {
      id: '5',
      imageUrl: 'https://picsum.photos/400/300?random=5',
      title: '食堂里的温馨时光',
      description: '午餐时间，同学们围坐一桌，分享美食和快乐',
      location: '学生食堂',
      category: 'people',
      photographer: {
        name: '刘小花',
        avatar: '',
        class: '生科院2022级'
      },
      uploadTime: '3天前',
      likes: 145,
      comments: 34,
      views: 567,
      isLiked: false,
      tags: ['食堂', '同学', '温馨']
    },
    {
      id: '6',
      imageUrl: 'https://picsum.photos/400/300?random=6',
      title: '钟楼的历史韵味',
      description: '百年钟楼见证了无数学子的青春岁月',
      location: '钟楼',
      category: 'building',
      photographer: {
        name: '周小明',
        avatar: '',
        class: '建筑学院2020级'
      },
      uploadTime: '1周前',
      likes: 312,
      comments: 89,
      views: 1567,
      isLiked: true,
      tags: ['钟楼', '历史', '建筑']
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
      case 'building': return 'bg-blue-100 text-blue-700';
      case 'nature': return 'bg-green-100 text-green-700';
      case 'activity': return 'bg-purple-100 text-purple-700';
      case 'people': return 'bg-orange-100 text-orange-700';
      case 'season': return 'bg-yellow-100 text-yellow-700';
      case 'night': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'building': return '建筑';
      case 'nature': return '自然';
      case 'activity': return '活动';
      case 'people': return '人文';
      case 'season': return '四季';
      case 'night': return '夜景';
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
    myLikes: photos.filter(p => p.isLiked).length
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
              <h1 className="text-lg">校园留影</h1>
              <p className="text-sm text-gray-600">记录美好校园时光</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" />
              上传
            </Button>
          </div>
        </div>
      </div>

      {/* 统计信息 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-lg text-blue-600">{stats.total}</div>
              <div className="text-xs text-gray-500">照片</div>
            </div>
            <div>
              <div className="text-lg text-red-600">{stats.totalLikes}</div>
              <div className="text-xs text-gray-500">点赞</div>
            </div>
            <div>
              <div className="text-lg text-green-600">{stats.totalViews}</div>
              <div className="text-xs text-gray-500">浏览</div>
            </div>
            <div>
              <div className="text-lg text-purple-600">{stats.myLikes}</div>
              <div className="text-xs text-gray-500">我赞过</div>
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
              variant={activeTab === 'nature' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('nature')}
              className="text-xs whitespace-nowrap"
            >
              自然
            </Button>
            <Button 
              variant={activeTab === 'building' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('building')}
              className="text-xs whitespace-nowrap"
            >
              建筑
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
              variant={activeTab === 'season' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('season')}
              className="text-xs whitespace-nowrap"
            >
              四季
            </Button>
            <Button 
              variant={activeTab === 'night' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('night')}
              className="text-xs whitespace-nowrap"
            >
              夜景
            </Button>
          </div>
        </Tabs>
      </div>

      {/* 照片展示 */}
      <div className="px-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredPhotos.map((photo) => (
              <Card key={photo.id} className="border-0 shadow-sm overflow-hidden">
                <div className="relative">
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className={`text-xs ${getCategoryColor(photo.category)}`}>
                      {getCategoryText(photo.category)}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(photo.id)}
                      className={`p-1 h-auto ${photo.isLiked ? 'text-red-500' : 'text-white'}`}
                    >
                      <Heart className={`w-4 h-4 ${photo.isLiked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/50 rounded px-2 py-1">
                      <div className="text-xs text-white truncate">{photo.title}</div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
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
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPhotos.map((photo) => (
              <Card key={photo.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm">{photo.title}</h3>
                        <Badge className={`text-xs ${getCategoryColor(photo.category)}`}>
                          {getCategoryText(photo.category)}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{photo.description}</p>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{photo.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{photo.uploadTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          by {photo.photographer.name}
                        </div>
                        <div className="flex items-center gap-3">
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
                          <Button variant="ghost" size="sm" className="text-gray-500 p-1 h-auto">
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t">
                    {photo.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredPhotos.length === 0 && (
          <div className="text-center py-8">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">暂无照片</h3>
            <p className="text-sm text-gray-500">该分类下暂无照片</p>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  );
}
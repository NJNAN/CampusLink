import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  Eye, 
  MessageCircle, 
  Heart, 
  Share, 
  Clock,
  Flame,
  Star,
  Users,
  Calendar,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface HotspotItem {
  id: string;
  title: string;
  summary: string;
  category: 'news' | 'activity' | 'academic' | 'life' | 'announcement';
  author: string;
  avatar: string;
  publishTime: string;
  views: number;
  likes: number;
  comments: number;
  isHot: boolean;
  isLiked: boolean;
  images: string[];
  location?: string;
  tags: string[];
}

export default function CampusHotspot() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [hotspots, setHotspots] = useState<HotspotItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHotspots();
  }, []);

  const loadHotspots = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockHotspots: HotspotItem[] = [
        {
          id: '1',
          title: '期末考试安排公布！各学院考试时间表出炉',
          summary: '2024年春季学期期末考试安排已经公布，请同学们及时查看自己的考试时间，做好复习准备。',
          category: 'announcement',
          author: '教务处',
          avatar: '',
          publishTime: '2小时前',
          views: 2580,
          likes: 156,
          comments: 89,
          isHot: true,
          isLiked: false,
          images: ['https://picsum.photos/400/200?random=1'],
          tags: ['期末考试', '教务', '重要']
        },
        {
          id: '2',
          title: '福师大春季运动会精彩瞬间回顾',
          summary: '为期三天的春季运动会圆满结束，让我们一起回顾那些精彩的比赛瞬间和感人时刻！',
          category: 'activity',
          author: '学生会',
          avatar: '',
          publishTime: '4小时前',
          views: 1890,
          likes: 234,
          comments: 67,
          isHot: true,
          isLiked: true,
          images: ['https://picsum.photos/400/200?random=2'],
          location: '体育场',
          tags: ['运动会', '体育', '精彩']
        },
        {
          id: '3',
          title: '计算机学院与华为签署校企合作协议',
          summary: '昨日，我校计算机学院与华为技术有限公司正式签署校企合作协议，将在人才培养、科研合作等方面深度合作。',
          category: 'academic',
          author: '计算机学院',
          avatar: '',
          publishTime: '6小时前',
          views: 1456,
          likes: 198,
          comments: 45,
          isHot: false,
          isLiked: false,
          images: ['https://picsum.photos/400/200?random=3'],
          tags: ['合作', '华为', '就业']
        },
        {
          id: '4',
          title: '图书馆新书到馆通知 | 本月新增500余册图书',
          summary: '图书馆本月新增各类图书500余册，涵盖文学、科技、教育等多个领域，欢迎广大师生前来借阅。',
          category: 'news',
          author: '图书馆',
          avatar: '',
          publishTime: '1天前',
          views: 892,
          likes: 67,
          comments: 23,
          isHot: false,
          isLiked: false,
          images: ['https://picsum.photos/400/200?random=4'],
          location: '图书馆',
          tags: ['新书', '阅读', '学习']
        },
        {
          id: '5',
          title: '食堂推出夏季新菜品，清爽美味等你来尝',
          summary: '随着夏季来临，各食堂推出多款夏季特色菜品，清淡爽口，营养丰富，快来品尝吧！',
          category: 'life',
          author: '后勤服务中心',
          avatar: '',
          publishTime: '1天前',
          views: 1234,
          likes: 145,
          comments: 78,
          isHot: false,
          isLiked: false,
          images: ['https://picsum.photos/400/200?random=5'],
          tags: ['美食', '食堂', '夏季']
        }
      ];

      setHotspots(mockHotspots);
    } catch (error) {
      console.error('加载热点数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (id: string) => {
    setHotspots(hotspots.map(item => 
      item.id === id 
        ? { 
            ...item, 
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1
          }
        : item
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement': return 'bg-red-100 text-red-700';
      case 'activity': return 'bg-blue-100 text-blue-700';
      case 'academic': return 'bg-green-100 text-green-700';
      case 'news': return 'bg-purple-100 text-purple-700';
      case 'life': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'announcement': return '公告';
      case 'activity': return '活动';
      case 'academic': return '学术';
      case 'news': return '新闻';
      case 'life': return '生活';
      default: return '其他';
    }
  };

  const getTimeAgo = (time: string) => {
    return time;
  };

  const filteredHotspots = activeTab === 'all' 
    ? hotspots 
    : hotspots.filter(item => item.category === activeTab);

  const hotspotStats = {
    total: hotspots.length,
    hot: hotspots.filter(h => h.isHot).length,
    totalViews: hotspots.reduce((sum, h) => sum + h.views, 0),
    totalLikes: hotspots.reduce((sum, h) => sum + h.likes, 0)
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg">校园热点</h1>
            <p className="text-sm text-gray-600">最新校园资讯</p>
          </div>
        </div>
      </div>

      {/* 热点统计 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg text-red-500 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4" />
                {hotspotStats.hot}
              </div>
              <div className="text-xs text-gray-500">热门</div>
            </div>
            <div>
              <div className="text-lg text-blue-600">{hotspotStats.total}</div>
              <div className="text-xs text-gray-500">总数</div>
            </div>
            <div>
              <div className="text-lg text-green-600">{hotspotStats.totalViews.toLocaleString()}</div>
              <div className="text-xs text-gray-500">浏览</div>
            </div>
            <div>
              <div className="text-lg text-purple-600">{hotspotStats.totalLikes}</div>
              <div className="text-xs text-gray-500">点赞</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分类标签 */}
      <div className="px-4 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="text-xs">全部</TabsTrigger>
            <TabsTrigger value="announcement" className="text-xs">公告</TabsTrigger>
            <TabsTrigger value="activity" className="text-xs">活动</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            <Button 
              variant={activeTab === 'all' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('all')}
              className="text-xs whitespace-nowrap"
            >
              全部
            </Button>
            <Button 
              variant={activeTab === 'announcement' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('announcement')}
              className="text-xs whitespace-nowrap"
            >
              公告
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
              variant={activeTab === 'academic' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('academic')}
              className="text-xs whitespace-nowrap"
            >
              学术
            </Button>
            <Button 
              variant={activeTab === 'news' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('news')}
              className="text-xs whitespace-nowrap"
            >
              新闻
            </Button>
            <Button 
              variant={activeTab === 'life' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('life')}
              className="text-xs whitespace-nowrap"
            >
              生活
            </Button>
          </div>
        </Tabs>
      </div>

      {/* 热点列表 */}
      <div className="px-4 space-y-3">
        {filteredHotspots.map((hotspot, index) => (
          <Card key={hotspot.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              {/* 头部信息 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getCategoryColor(hotspot.category)}`}>
                    {getCategoryText(hotspot.category)}
                  </Badge>
                  {hotspot.isHot && (
                    <Badge className="text-xs bg-red-100 text-red-600">
                      <Flame className="w-3 h-3 mr-1" />
                      热门
                    </Badge>
                  )}
                  {index === 0 && (
                    <Badge className="text-xs bg-yellow-100 text-yellow-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      置顶
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{getTimeAgo(hotspot.publishTime)}</span>
                </div>
              </div>

              {/* 标题和摘要 */}
              <h3 className="text-sm mb-2 line-clamp-2">{hotspot.title}</h3>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{hotspot.summary}</p>

              {/* 图片 */}
              {hotspot.images.length > 0 && (
                <img 
                  src={hotspot.images[0]} 
                  alt={hotspot.title}
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}

              {/* 标签 */}
              <div className="flex flex-wrap gap-1 mb-3">
                {hotspot.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* 作者和位置 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Users className="w-3 h-3" />
                  <span>{hotspot.author}</span>
                  {hotspot.location && (
                    <>
                      <MapPin className="w-3 h-3 ml-2" />
                      <span>{hotspot.location}</span>
                    </>
                  )}
                </div>
              </div>

              {/* 互动数据 */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(hotspot.id)}
                    className={`flex items-center gap-1 text-xs ${
                      hotspot.isLiked ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${hotspot.isLiked ? 'fill-current' : ''}`} />
                    <span>{hotspot.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-gray-500">
                    <MessageCircle className="w-4 h-4" />
                    <span>{hotspot.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>{hotspot.views}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredHotspots.length === 0 && (
          <div className="text-center py-8">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">暂无热点</h3>
            <p className="text-sm text-gray-500">该分类下暂无热点内容</p>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  );
}
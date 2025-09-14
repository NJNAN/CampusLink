import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent } from '../ui/dialog';
import { 
  ArrowLeft,
  Heart,
  MessageCircle,
  Share,
  Download,
  Camera,
  Calendar,
  MapPin,
  Users,
  Eye,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Snapshot {
  id: string;
  title: string;
  images: string[];
  activity: {
    name: string;
    type: string;
    date: string;
    location: string;
  };
  photographer: {
    name: string;
    avatar: string;
    class: string;
  };
  uploadedAt: string;
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  description: string;
}

export default function ActivitySnapshot() {
  const navigate = useNavigate();
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadSnapshots();
  }, []);

  const loadSnapshots = () => {
    const mockSnapshots: Snapshot[] = [
      {
        id: '1',
        title: '迎新晚会精彩演出',
        images: [
          'https://picsum.photos/400/300?random=1',
          'https://picsum.photos/400/300?random=2',
          'https://picsum.photos/400/300?random=3'
        ],
        activity: {
          name: '2024年迎新晚会',
          type: '文艺活动',
          date: '2024-01-15',
          location: '学校大礼堂'
        },
        photographer: {
          name: '李小明',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        uploadedAt: '2024-01-16',
        likes: 89,
        comments: 23,
        views: 456,
        isLiked: false,
        description: '迎新晚会上同学们的精彩演出，展现了青春活力和才华。'
      },
      {
        id: '2',
        title: '篮球赛激烈对抗',
        images: [
          'https://picsum.photos/400/300?random=4',
          'https://picsum.photos/400/300?random=5'
        ],
        activity: {
          name: '院际篮球联赛',
          type: '体育竞技',
          date: '2024-01-12',
          location: '体育馆'
        },
        photographer: {
          name: '王小红',
          avatar: '',
          class: '软件工程2021级2班'
        },
        uploadedAt: '2024-01-13',
        likes: 67,
        comments: 15,
        views: 234,
        isLiked: true,
        description: '篮球场上同学们挥洒汗水，团结协作的精彩瞬间。'
      },
      {
        id: '3',
        title: '社团招新现场',
        images: [
          'https://picsum.photos/400/300?random=6',
          'https://picsum.photos/400/300?random=7',
          'https://picsum.photos/400/300?random=8',
          'https://picsum.photos/400/300?random=9'
        ],
        activity: {
          name: '社团招新活动',
          type: '社团活动',
          date: '2024-01-10',
          location: '学生活动中心'
        },
        photographer: {
          name: '张三',
          avatar: '',
          class: '信息安全2021级1班'
        },
        uploadedAt: '2024-01-11',
        likes: 45,
        comments: 12,
        views: 189,
        isLiked: false,
        description: '各个社团展示特色，吸引新成员加入的热闹场面。'
      }
    ];
    setSnapshots(mockSnapshots);
  };

  const handleLike = (snapshotId: string) => {
    setSnapshots(snapshots.map(snapshot => 
      snapshot.id === snapshotId 
        ? { 
            ...snapshot, 
            isLiked: !snapshot.isLiked,
            likes: snapshot.isLiked ? snapshot.likes - 1 : snapshot.likes + 1
          }
        : snapshot
    ));
  };

  const openLightbox = (snapshot: Snapshot, imageIndex: number = 0) => {
    setSelectedSnapshot(snapshot);
    setSelectedImageIndex(imageIndex);
  };

  const nextImage = () => {
    if (selectedSnapshot && selectedImageIndex < selectedSnapshot.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case '文艺活动': return 'bg-purple-100 text-purple-700';
      case '体育竞技': return 'bg-green-100 text-green-700';
      case '社团活动': return 'bg-blue-100 text-blue-700';
      case '学术活动': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredSnapshots = filter === 'all' 
    ? snapshots 
    : snapshots.filter(snapshot => snapshot.activity.type === filter);

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
              <h1 className="text-lg">活动快照</h1>
              <p className="text-sm text-gray-600">记录精彩瞬间</p>
            </div>
          </div>
          <Button size="sm">
            <Camera className="w-4 h-4 mr-1" />
            上传
          </Button>
        </div>

        {/* 分类筛选 */}
        <div className="flex gap-2 overflow-x-auto">
          {[
            { key: 'all', label: '全部' },
            { key: '文艺活动', label: '文艺' },
            { key: '体育竞技', label: '体育' },
            { key: '社团活动', label: '社团' },
            { key: '学术活动', label: '学术' }
          ].map((category) => (
            <Button
              key={category.key}
              variant={filter === category.key ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setFilter(category.key)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg text-blue-600">{snapshots.length}</div>
              <div className="text-sm text-gray-500">活动快照</div>
            </div>
            <div>
              <div className="text-lg text-red-500">
                {snapshots.reduce((sum, snapshot) => sum + snapshot.likes, 0)}
              </div>
              <div className="text-sm text-gray-500">总点赞</div>
            </div>
            <div>
              <div className="text-lg text-green-500">
                {snapshots.reduce((sum, snapshot) => sum + snapshot.views, 0)}
              </div>
              <div className="text-sm text-gray-500">总浏览</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 快照列表 */}
      <div className="px-4 space-y-4">
        {filteredSnapshots.map((snapshot) => (
          <Card key={snapshot.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              {/* 活动信息 */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm mb-1">{snapshot.activity.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Badge className={`text-xs ${getActivityTypeColor(snapshot.activity.type)}`}>
                      {snapshot.activity.type}
                    </Badge>
                    <Calendar className="w-3 h-3" />
                    <span>{snapshot.activity.date}</span>
                    <MapPin className="w-3 h-3" />
                    <span>{snapshot.activity.location}</span>
                  </div>
                </div>
              </div>

              {/* 图片网格 */}
              <div className={`grid gap-1 mb-3 ${
                snapshot.images.length === 1 ? 'grid-cols-1' :
                snapshot.images.length === 2 ? 'grid-cols-2' :
                snapshot.images.length === 3 ? 'grid-cols-3' :
                'grid-cols-2'
              }`}>
                {snapshot.images.slice(0, 4).map((image, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-square cursor-pointer"
                    onClick={() => openLightbox(snapshot, index)}
                  >
                    <img 
                      src={image} 
                      alt={`${snapshot.title} - 图片 ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                    {index === 3 && snapshot.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                        <span className="text-white text-sm">+{snapshot.images.length - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-700 mb-3">{snapshot.description}</p>

              {/* 摄影师信息 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={snapshot.photographer.avatar} />
                    <AvatarFallback>{snapshot.photographer.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-xs">摄影：{snapshot.photographer.name}</span>
                    <div className="text-xs text-gray-500">{snapshot.photographer.class}</div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{snapshot.uploadedAt}</span>
              </div>

              {/* 互动按钮 */}
              <div className="flex items-center justify-between pt-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 ${
                    snapshot.isLiked ? 'text-red-500' : 'text-gray-500'
                  }`}
                  onClick={() => handleLike(snapshot.id)}
                >
                  <Heart className={`w-4 h-4 ${snapshot.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs">{snapshot.likes}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-500"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">{snapshot.comments}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-500"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-xs">{snapshot.views}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-500"
                >
                  <Share className="w-4 h-4" />
                  <span className="text-xs">分享</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 图片查看器 */}
      <Dialog open={!!selectedSnapshot} onOpenChange={() => setSelectedSnapshot(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedSnapshot && (
            <div className="relative">
              <img 
                src={selectedSnapshot.images[selectedImageIndex]} 
                alt={`${selectedSnapshot.title} - 图片 ${selectedImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* 导航按钮 */}
              {selectedSnapshot.images.length > 1 && (
                <>
                  {selectedImageIndex > 0 && (
                    <Button
                      variant="ghost"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={prevImage}
                    >
                      ←
                    </Button>
                  )}
                  {selectedImageIndex < selectedSnapshot.images.length - 1 && (
                    <Button
                      variant="ghost"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                      onClick={nextImage}
                    >
                      →
                    </Button>
                  )}
                </>
              )}

              {/* 底部信息 */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm">{selectedSnapshot.title}</h3>
                    <p className="text-xs opacity-80">{selectedSnapshot.activity.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">
                      {selectedImageIndex + 1} / {selectedSnapshot.images.length}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 底部间距 */}
      <div className="h-20"></div>
    </div>
  );
}
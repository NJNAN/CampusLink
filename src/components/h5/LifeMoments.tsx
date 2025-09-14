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
  MapPin,
  Clock,
  Camera,
  Coffee,
  Book,
  Music,
  Utensils,
  Gamepad2,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LifeMoment {
  id: string;
  content: string;
  images: string[];
  author: {
    name: string;
    avatar: string;
    class: string;
  };
  location?: string;
  timestamp: string;
  mood: 'happy' | 'excited' | 'peaceful' | 'grateful' | 'thoughtful';
  category: 'study' | 'food' | 'entertainment' | 'friendship' | 'exercise' | 'daily';
  likes: number;
  comments: number;
  isLiked: boolean;
}

export default function LifeMoments() {
  const navigate = useNavigate();
  
  const [moments, setMoments] = useState<LifeMoment[]>([
    {
      id: '1',
      content: '今天在图书馆学习了一整天，虽然累但很充实。看着满满的笔记，感觉离目标又近了一步！💪',
      images: ['https://picsum.photos/400/300?random=20'],
      author: {
        name: '张小明',
        avatar: '',
        class: '计算机2021级1班'
      },
      location: '图书馆三楼',
      timestamp: '2小时前',
      mood: 'grateful',
      category: 'study',
      likes: 23,
      comments: 5,
      isLiked: false
    },
    {
      id: '2',
      content: '室友们一起吃火锅🍲，大学生活最美好的就是有这些朋友陪伴。友谊万岁！',
      images: ['https://picsum.photos/400/300?random=21', 'https://picsum.photos/400/300?random=22'],
      author: {
        name: '李小红',
        avatar: '',
        class: '计算机2021级1班'
      },
      location: '海底捞',
      timestamp: '5小时前',
      mood: 'happy',
      category: 'friendship',
      likes: 45,
      comments: 12,
      isLiked: true
    },
    {
      id: '3',
      content: '今天的夕阳特别美，在操场跑步的时候看到的。运动完心情特别好，生活真美好！🌅',
      images: ['https://picsum.photos/400/300?random=23'],
      author: {
        name: '王小强',
        avatar: '',
        class: '计算机2021级2班'
      },
      location: '学校操场',
      timestamp: '1天前',
      mood: 'peaceful',
      category: 'exercise',
      likes: 67,
      comments: 8,
      isLiked: true
    },
    {
      id: '4',
      content: '第一次尝试做蛋糕🎂，虽然卖相不太好，但味道还不错。室友们都说很棒！',
      images: ['https://picsum.photos/400/300?random=24'],
      author: {
        name: '刘小花',
        avatar: '',
        class: '计算机2021级1班'
      },
      location: '宿舍',
      timestamp: '2天前',
      mood: 'excited',
      category: 'food',
      likes: 89,
      comments: 15,
      isLiked: false
    },
    {
      id: '5',
      content: '和室友一起看电影，选了一部搞笑片。笑得肚子疼，压力瞬间消失了！😂',
      images: [],
      author: {
        name: '陈小美',
        avatar: '',
        class: '软件工程2021级1班'
      },
      location: '宿舍',
      timestamp: '3天前',
      mood: 'happy',
      category: 'entertainment',
      likes: 34,
      comments: 7,
      isLiked: true
    },
    {
      id: '6',
      content: '今天路过小花园，春天真的来了！🌸 花都开了，心情也跟着明朗起来。',
      images: ['https://picsum.photos/400/300?random=25', 'https://picsum.photos/400/300?random=26'],
      author: {
        name: '周小帅',
        avatar: '',
        class: '计算机2021级1班'
      },
      location: '校园花园',
      timestamp: '1周前',
      mood: 'peaceful',
      category: 'daily',
      likes: 156,
      comments: 23,
      isLiked: false
    }
  ]);

  const handleLike = (momentId: string) => {
    setMoments(moments.map(moment => 
      moment.id === momentId 
        ? { 
            ...moment, 
            isLiked: !moment.isLiked,
            likes: moment.isLiked ? moment.likes - 1 : moment.likes + 1
          }
        : moment
    ));
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'bg-yellow-100 text-yellow-700';
      case 'excited': return 'bg-red-100 text-red-700';
      case 'peaceful': return 'bg-blue-100 text-blue-700';
      case 'grateful': return 'bg-green-100 text-green-700';
      case 'thoughtful': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMoodText = (mood: string) => {
    switch (mood) {
      case 'happy': return '开心';
      case 'excited': return '兴奋';  
      case 'peaceful': return '平静';
      case 'grateful': return '感恩';
      case 'thoughtful': return '深思';
      default: return '普通';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return <Book className="w-4 h-4" />;
      case 'food': return <Utensils className="w-4 h-4" />;
      case 'entertainment': return <Gamepad2 className="w-4 h-4" />;
      case 'friendship': return <Heart className="w-4 h-4" />;
      case 'exercise': return <Zap className="w-4 h-4" />;
      case 'daily': return <Coffee className="w-4 h-4" />;
      default: return <Camera className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'study': return 'text-blue-500';
      case 'food': return 'text-orange-500';
      case 'entertainment': return 'text-purple-500';
      case 'friendship': return 'text-pink-500';
      case 'exercise': return 'text-green-500';
      case 'daily': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return timestamp;
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
              <h1 className="text-lg">生活点滴</h1>
              <p className="text-sm text-gray-600">记录美好时光</p>
            </div>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            分享
          </Button>
        </div>
      </div>

      {/* 生活动态列表 */}
      <div className="space-y-4 p-4">
        {moments.map((moment) => (
          <Card key={moment.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              {/* 用户信息头部 */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={moment.author.avatar} />
                  <AvatarFallback>{moment.author.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{moment.author.name}</span>
                    <Badge className={`text-xs ${getMoodColor(moment.mood)}`}>
                      {getMoodText(moment.mood)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{moment.author.class}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimestamp(moment.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div className={`p-1 rounded ${getCategoryColor(moment.category)}`}>
                  {getCategoryIcon(moment.category)}
                </div>
              </div>

              {/* 内容文本 */}
              <div className="mb-3">
                <p className="text-sm leading-relaxed">{moment.content}</p>
              </div>

              {/* 位置信息 */}
              {moment.location && (
                <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{moment.location}</span>
                </div>
              )}

              {/* 图片展示 */}
              {moment.images.length > 0 && (
                <div className="mb-3">
                  {moment.images.length === 1 ? (
                    <img 
                      src={moment.images[0]} 
                      alt="生活照片"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {moment.images.slice(0, 4).map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={`生活照片${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                      {moment.images.length > 4 && (
                        <div className="relative">
                          <img 
                            src={moment.images[3]} 
                            alt="更多照片"
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">+{moment.images.length - 3}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 互动按钮 */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(moment.id)}
                    className={`flex items-center gap-1 text-xs p-1 h-auto ${
                      moment.isLiked ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${moment.isLiked ? 'fill-current' : ''}`} />
                    <span>{moment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-gray-500 p-1 h-auto">
                    <MessageCircle className="w-4 h-4" />
                    <span>{moment.comments}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500 p-1 h-auto">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 发布提示卡片 */}
      <Card className="m-4 border-0 shadow-sm bg-gradient-to-r from-pink-50 to-purple-50">
        <CardContent className="p-4 text-center">
          <Camera className="w-8 h-8 text-pink-600 mx-auto mb-2" />
          <h3 className="text-sm mb-1 text-gray-800">分享你的生活点滴</h3>
          <p className="text-xs text-gray-600">记录每一个美好瞬间</p>
        </CardContent>
      </Card>

      <div className="h-20"></div>
    </div>
  );
}
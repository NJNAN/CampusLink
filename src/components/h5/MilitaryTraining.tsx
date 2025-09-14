import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Camera,
  Heart,
  MessageCircle,
  Share,
  Trophy,
  Target,
  Users,
  Clock,
  MapPin,
  Calendar,
  Star,
  Plus,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TrainingRecord {
  id: string;
  title: string;
  content: string;
  images: string[];
  author: {
    name: string;
    avatar: string;
    company: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  type: 'diary' | 'achievement' | 'photo';
}

interface TrainingStats {
  totalDays: number;
  completedDays: number;
  achievements: number;
  teamRank: number;
  personalScore: number;
}

export default function MilitaryTraining() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [stats, setStats] = useState<TrainingStats>({
    totalDays: 14,
    completedDays: 8,
    achievements: 5,
    teamRank: 3,
    personalScore: 85
  });

  useEffect(() => {
    loadTrainingRecords();
  }, []);

  const loadTrainingRecords = () => {
    const mockRecords: TrainingRecord[] = [
      {
        id: '1',
        title: '第8天：射击训练',
        content: '今天进行了射击训练，虽然刚开始有些紧张，但在教官的指导下逐渐找到了感觉。最终打出了不错的成绩，获得了教官的表扬！',
        images: ['https://picsum.photos/300/200?random=1'],
        author: {
          name: '张三',
          avatar: '',
          company: '一连二排'
        },
        createdAt: '2024-01-15 18:30',
        likes: 23,
        comments: 8,
        isLiked: false,
        type: 'diary'
      },
      {
        id: '2',
        title: '获得内务标兵称号',
        content: '经过几天的努力，终于把内务整理得井井有条，今天被评为内务标兵！感谢室友们的帮助和支持。',
        images: ['https://picsum.photos/300/200?random=2'],
        author: {
          name: '李小明',
          avatar: '',
          company: '一连二排'
        },
        createdAt: '2024-01-14 20:15',
        likes: 45,
        comments: 15,
        isLiked: true,
        type: 'achievement'
      },
      {
        id: '3',
        title: '队列训练合影',
        content: '今天的队列训练特别整齐，教官夸我们是他见过最棒的一个班！大家一起合个影纪念一下。',
        images: ['https://picsum.photos/300/200?random=3'],
        author: {
          name: '王小红',
          avatar: '',
          company: '一连二排'
        },
        createdAt: '2024-01-13 16:45',
        likes: 67,
        comments: 23,
        isLiked: false,
        type: 'photo'
      }
    ];
    setRecords(mockRecords);
  };

  const handleLike = (recordId: string) => {
    setRecords(records.map(record => 
      record.id === recordId 
        ? { 
            ...record, 
            isLiked: !record.isLiked,
            likes: record.isLiked ? record.likes - 1 : record.likes + 1
          }
        : record
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'diary': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'achievement': return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'photo': return <Camera className="w-4 h-4 text-green-500" />;
      default: return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'diary': return '训练日记';
      case 'achievement': return '成就获得';
      case 'photo': return '精彩瞬间';
      default: return '记录';
    }
  };

  const progressPercentage = (stats.completedDays / stats.totalDays) * 100;

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">军训生活</h1>
              <p className="text-sm text-gray-600">记录军训点滴</p>
            </div>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            添加记录
          </Button>
        </div>
      </div>

      {/* 训练进度 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">训练进度</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>第 {stats.completedDays} / {stats.totalDays} 天</span>
            <span>{Math.round(progressPercentage)}% 完成</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="grid grid-cols-4 gap-4 pt-2">
            <div className="text-center">
              <div className="text-lg text-blue-600">{stats.completedDays}</div>
              <div className="text-xs text-gray-500">已训练</div>
            </div>
            <div className="text-center">
              <div className="text-lg text-yellow-600">{stats.achievements}</div>
              <div className="text-xs text-gray-500">成就</div>
            </div>
            <div className="text-center">
              <div className="text-lg text-green-600">{stats.teamRank}</div>
              <div className="text-xs text-gray-500">团队排名</div>
            </div>
            <div className="text-center">
              <div className="text-lg text-purple-600">{stats.personalScore}</div>
              <div className="text-xs text-gray-500">个人评分</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 本周亮点 */}
      <Card className="mx-4 mb-4 border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">本周亮点</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <Award className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-sm">获得内务标兵称号</div>
                <div className="text-xs text-gray-500">连续3天内务评分满分</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Target className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-sm">射击训练优秀</div>
                <div className="text-xs text-gray-500">射击成绩班级第二名</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-sm">团队协作表彰</div>
                <div className="text-xs text-gray-500">帮助同伴共同进步</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 记录列表 */}
      <div className="px-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">全部</TabsTrigger>
            <TabsTrigger value="diary" className="text-xs">日记</TabsTrigger>
            <TabsTrigger value="achievement" className="text-xs">成就</TabsTrigger>
            <TabsTrigger value="photo" className="text-xs">照片</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {records.map((record) => (
                <Card key={record.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={record.author.avatar} />
                          <AvatarFallback>{record.author.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{record.author.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {record.author.company}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {getTypeIcon(record.type)}
                            <span>{getTypeName(record.type)}</span>
                            <span>•</span>
                            <span>{record.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-sm mb-2">{record.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{record.content}</p>

                    {record.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {record.images.map((image, index) => (
                          <img 
                            key={index}
                            src={image} 
                            alt={`图片 ${index + 1}`}
                            className="aspect-square object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-2 ${
                          record.isLiked ? 'text-red-500' : 'text-gray-500'
                        }`}
                        onClick={() => handleLike(record.id)}
                      >
                        <Heart className={`w-4 h-4 ${record.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs">{record.likes}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-gray-500"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{record.comments}</span>
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
          </TabsContent>

          {['diary', 'achievement', 'photo'].map((type) => (
            <TabsContent key={type} value={type} className="mt-4">
              <div className="space-y-4">
                {records.filter(record => record.type === type).map((record) => (
                  <Card key={record.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={record.author.avatar} />
                          <AvatarFallback>{record.author.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{record.author.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {record.author.company}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500">{record.createdAt}</div>
                        </div>
                      </div>

                      <h3 className="text-sm mb-2">{record.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{record.content}</p>

                      {record.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          {record.images.map((image, index) => (
                            <img 
                              key={index}
                              src={image} 
                              alt={`图片 ${index + 1}`}
                              className="aspect-square object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex items-center gap-2 ${
                            record.isLiked ? 'text-red-500' : 'text-gray-500'
                          }`}
                          onClick={() => handleLike(record.id)}
                        >
                          <Heart className={`w-4 h-4 ${record.isLiked ? 'fill-current' : ''}`} />
                          <span className="text-xs">{record.likes}</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 text-gray-500"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs">{record.comments}</span>
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
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* 底部间距 */}
      <div className="h-20"></div>
    </div>
  );
}
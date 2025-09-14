import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  ArrowLeft,
  MapPin,
  MessageCircle,
  UserPlus,
  Navigation,
  RefreshCw,
  Eye,
  Clock,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface NearbyClassmate {
  id: string;
  name: string;
  avatar: string;
  class: string;
  major: string;
  distance: number;
  lastSeen: string;
  location: string;
  status: 'online' | 'offline' | 'away';
  isFollowing: boolean;
  activity: string;
}

export default function NearbyClassmates() {
  const navigate = useNavigate();
  const [classmates, setClassmates] = useState<NearbyClassmate[]>([]);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedClassmate, setSelectedClassmate] = useState<NearbyClassmate | null>(null);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = async () => {
    try {
      setIsRefreshing(true);
      // 模拟获取位置
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLocationEnabled(true);
      setCurrentLocation('福建师范大学图书馆');
      
      const mockClassmates: NearbyClassmate[] = [
        {
          id: '1',
          name: '李小明',
          avatar: '',
          class: '计算机科学与技术2021级1班',
          major: '计算机科学与技术',
          distance: 50,
          lastSeen: '2分钟前',
          location: '图书馆一楼',
          status: 'online',
          isFollowing: false,
          activity: '正在学习数据结构'
        },
        {
          id: '2',
          name: '王小红',
          avatar: '',
          class: '软件工程2021级2班',
          major: '软件工程',
          distance: 120,
          lastSeen: '5分钟前',
          location: '计算机学院实验楼',
          status: 'online',
          isFollowing: true,
          activity: '在机房做项目'
        },
        {
          id: '3',
          name: '张三',
          avatar: '',
          class: '信息安全2021级1班',
          major: '信息安全',
          distance: 200,
          lastSeen: '10分钟前',
          location: '学生活动中心',
          status: 'away',
          isFollowing: false,
          activity: '参加社团活动'
        },
        {
          id: '4',
          name: '刘小花',
          avatar: '',
          class: '数据科学2021级1班',
          major: '数据科学',
          distance: 300,
          lastSeen: '15分钟前',
          location: '咖啡厅',
          status: 'online',
          isFollowing: true,
          activity: '和朋友聊天'
        },
        {
          id: '5',
          name: '陈小强',
          avatar: '',
          class: '计算机科学与技术2020级1班',
          major: '计算机科学与技术',
          distance: 450,
          lastSeen: '30分钟前',
          location: '体育馆',
          status: 'offline',
          isFollowing: false,
          activity: '运动健身'
        }
      ];

      setClassmates(mockClassmates);
      toast.success('已找到附近的同学');
    } catch (error) {
      toast.error('定位失败，请检查权限设置');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleFollow = (classmateId: string) => {
    setClassmates(classmates.map(classmate => 
      classmate.id === classmateId 
        ? { ...classmate, isFollowing: !classmate.isFollowing }
        : classmate
    ));
    
    const classmate = classmates.find(c => c.id === classmateId);
    if (classmate) {
      toast.success(classmate.isFollowing ? '已取消关注' : '已关注');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return '在线';
      case 'away': return '离开';
      case 'offline': return '离线';
      default: return '未知';
    }
  };

  const getDistanceText = (distance: number) => {
    if (distance < 100) return `${distance}m`;
    if (distance < 1000) return `${distance}m`;
    return `${(distance / 1000).toFixed(1)}km`;
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
              <h1 className="text-lg">附近的同学</h1>
              <p className="text-sm text-gray-600">发现身边的伙伴</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={requestLocation}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 mr-1" />
            )}
            刷新
          </Button>
        </div>
      </div>

      {!isLocationEnabled ? (
        /* 位置权限请求 */
        <div className="flex flex-col items-center justify-center h-64 p-4">
          <MapPin className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-lg mb-2">需要位置权限</h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            为了找到附近的同学，需要获取您的位置信息
          </p>
          <Button onClick={requestLocation} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                定位中...
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 mr-2" />
                开启定位
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {/* 当前位置 */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm">当前位置</div>
                  <div className="text-xs text-gray-600">{currentLocation}</div>
                </div>
                <div className="ml-auto">
                  <Badge variant="secondary" className="text-xs">
                    已定位
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 附近统计 */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-lg text-blue-600">{classmates.length}</div>
                  <div className="text-xs text-gray-500">附近同学</div>
                </div>
                <div>
                  <div className="text-lg text-green-600">
                    {classmates.filter(c => c.status === 'online').length}
                  </div>
                  <div className="text-xs text-gray-500">在线</div>
                </div>
                <div>
                  <div className="text-lg text-purple-600">
                    {classmates.filter(c => c.isFollowing).length}
                  </div>
                  <div className="text-xs text-gray-500">已关注</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 同学列表 */}
          <div className="space-y-3">
            {classmates.map((classmate) => (
              <Card key={classmate.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={classmate.avatar} />
                        <AvatarFallback>{classmate.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(classmate.status)}`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{classmate.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {classmate.major}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {classmate.class}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{classmate.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="w-3 h-3" />
                          <span>{getDistanceText(classmate.distance)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Zap className="w-3 h-3" />
                        <span>{classmate.activity}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFollow(classmate.id)}
                        className={classmate.isFollowing ? 'text-blue-600 border-blue-200' : ''}
                      >
                        <UserPlus className="w-4 h-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedClassmate(classmate)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>最后活跃：{classmate.lastSeen}</span>
                    </div>
                    <Badge className={`text-xs ${
                      classmate.status === 'online' ? 'bg-green-100 text-green-700' :
                      classmate.status === 'away' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {getStatusText(classmate.status)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {classmates.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg text-gray-600 mb-2">暂无附近同学</h3>
              <p className="text-sm text-gray-500">刷新试试或稍后再来看看</p>
            </div>
          )}
        </div>
      )}

      {/* 同学详情对话框 */}
      <Dialog open={!!selectedClassmate} onOpenChange={(open) => !open && setSelectedClassmate(null)}>
        <DialogContent>
          {selectedClassmate && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedClassmate.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedClassmate.avatar} />
                      <AvatarFallback>{selectedClassmate.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor(selectedClassmate.status)}`}></div>
                  </div>
                  <div>
                    <h3 className="text-lg">{selectedClassmate.name}</h3>
                    <p className="text-sm text-gray-600">{selectedClassmate.class}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {selectedClassmate.major}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm">{selectedClassmate.location}</div>
                      <div className="text-xs text-gray-500">距离 {getDistanceText(selectedClassmate.distance)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm">{selectedClassmate.activity}</div>
                      <div className="text-xs text-gray-500">当前状态</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm">{selectedClassmate.lastSeen}</div>
                      <div className="text-xs text-gray-500">最后活跃时间</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleFollow(selectedClassmate.id)}
                    className="flex-1"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {selectedClassmate.isFollowing ? '取消关注' : '关注'}
                  </Button>
                  <Button className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    发消息
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="h-20"></div>
    </div>
  );
}
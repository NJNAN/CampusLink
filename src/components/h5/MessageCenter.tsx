import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Heart, 
  MessageCircle, 
  UserPlus,
  Trophy,
  Bell,
  CheckCheck,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'system';
  user: {
    name: string;
    avatar: string;
    class: string;
  };
  content: string;
  postContent?: string;
  createdAt: string;
  isRead: boolean;
}

export default function MessageCenter() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      // 模拟加载消息数据
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockMessages: Message[] = [
        {
          id: '1',
          type: 'like',
          user: {
            name: '王小红',
            avatar: '',
            class: '计算机科学与技术2021级1班'
          },
          content: '赞了你的动态',
          postContent: '今天的数据结构课真的很有趣！',
          createdAt: '5分钟前',
          isRead: false
        },
        {
          id: '2',
          type: 'comment',
          user: {
            name: '张三',
            avatar: '',
            class: '计算机科学与技术2021级2班'
          },
          content: '评论了你的动态：\"同感！这个老师讲课确实很棒\"',
          postContent: '今天的数据结构课真的很有趣！',
          createdAt: '10分钟前',
          isRead: false
        },
        {
          id: '3',
          type: 'follow',
          user: {
            name: '刘小花',
            avatar: '',
            class: '计算机科学与技术2021级1班'
          },
          content: '关注了你',
          createdAt: '1小时前',
          isRead: false
        },
        {
          id: '4',
          type: 'like',
          user: {
            name: '李小明',
            avatar: '',
            class: '计算机科学与技术2021级1班'
          },
          content: '赞了你的评论',
          postContent: '可以一起组队学习吗？',
          createdAt: '2小时前',
          isRead: true
        },
        {
          id: '5',
          type: 'system',
          user: {
            name: '系统通知',
            avatar: '',
            class: ''
          },
          content: '你发布的动态\"今天参加了学校的社团活动\"获得了10个赞！',
          createdAt: '昨天',
          isRead: true
        },
        {
          id: '6',
          type: 'comment',
          user: {
            name: '陈小明',
            avatar: '',
            class: '计算机科学与技术2021级3班'
          },
          content: '回复了你的评论：\"我也想参加这个活动\"',
          postContent: '今天参加了学校的社团活动',
          createdAt: '昨天',
          isRead: true
        }
      ];

      setMessages(mockMessages);
    } catch (error) {
      console.error('加载消息失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'system':
        return <Trophy className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const markAllAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, isRead: true })));
  };

  const deleteMessage = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !msg.isRead;
    if (activeTab === 'interaction') return ['like', 'comment', 'follow'].includes(msg.type);
    if (activeTab === 'system') return msg.type === 'system';
    return true;
  });

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b sticky top-0 z-10">
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
              <h1 className="text-lg">消息中心</h1>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500">{unreadCount} 条未读</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
            >
              <CheckCheck className="w-4 h-4 mr-1" />
              全部已读
            </Button>
          )}
        </div>
      </div>

      {/* 消息列表 */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">
              全部
              {messages.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {messages.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              未读
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="interaction" className="text-xs">互动</TabsTrigger>
            <TabsTrigger value="system" className="text-xs">系统</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-3">
              {filteredMessages.length === 0 ? (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-8 text-center">
                    <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">暂无消息</p>
                  </CardContent>
                </Card>
              ) : (
                filteredMessages.map((message) => (
                  <Card 
                    key={message.id} 
                    className={`border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                      !message.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'bg-white'
                    }`}
                    onClick={() => {
                      markAsRead(message.id);
                      if (message.postContent) {
                        navigate(`/h5/post-detail/${message.id}`);
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {message.type === 'system' ? (
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                              {getIcon(message.type)}
                            </div>
                          ) : (
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={message.user.avatar} />
                              <AvatarFallback>{message.user.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {getIcon(message.type)}
                                <span className="text-sm">{message.user.name}</span>
                                {message.user.class && (
                                  <Badge variant="outline" className="text-xs">
                                    {message.user.class}
                                  </Badge>
                                )}
                                {!message.isRead && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              
                              <p className="text-sm text-gray-700 mb-1">{message.content}</p>
                              
                              {message.postContent && (
                                <div className="bg-gray-100 rounded p-2 mb-2">
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    {message.postContent}
                                  </p>
                                </div>
                              )}
                              
                              <span className="text-xs text-gray-500">{message.createdAt}</span>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMessage(message.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-gray-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部间距 */}
      <div className="h-20"></div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  MessageCircle, 
  Heart, 
  Share, 
  Camera, 
  MapPin, 
  Plus,
  Bell,
  Search,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    class: string;
  };
  content: string;
  images: string[];
  location?: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  hasUnread?: boolean;
}

export default function ClassCircle() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [unreadCount, setUnreadCount] = useState(3);

  useEffect(() => {
    // 模拟加载同学圈数据
    const mockPosts: Post[] = [
      {
        id: '1',
        author: {
          name: '李小明',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        content: '今天的数据结构课真的很有趣！老师讲解得很清楚，终于理解了二叉树的遍历算法。准备今晚好好复习一下，巩固今天学到的知识。',
        images: [],
        location: '教学楼A101',
        createdAt: '2024-01-15 14:30',
        likes: 15,
        comments: 8,
        isLiked: false,
        hasUnread: true
      },
      {
        id: '2',
        author: {
          name: '王小红',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        content: '图书馆的学习氛围真的很好，今天在这里待了一整天。准备期末考试中，大家一起加油！',
        images: [],
        createdAt: '2024-01-15 12:15',
        likes: 23,
        comments: 12,
        isLiked: true
      },
      {
        id: '3',
        author: {
          name: '张三',
          avatar: '',
          class: '计算机科学与技术2021级2班'
        },
        content: '参加了学校的编程竞赛，虽然没有拿到名次，但是学到了很多东西。感谢队友们的配合！',
        images: [],
        location: '计算机学院',
        createdAt: '2024-01-14 20:45',
        likes: 31,
        comments: 15,
        isLiked: false,
        hasUnread: true
      }
    ];
    setPosts(mockPosts);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    navigate(`/h5/post-detail/${postId}`);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">同学圈</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="relative"
              onClick={() => navigate('/h5/message-center')}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/h5/view-profile/search')}
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 快捷功能卡片 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback>我</AvatarFallback>
              </Avatar>
              <div 
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500 cursor-pointer"
                onClick={() => navigate('/h5/create-post')}
              >
                分享你的校园生活...
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigate('/h5/create-post')}
            >
              <Camera className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 动态列表 */}
      <div className="px-4 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="border-0 shadow-sm relative">
            {post.hasUnread && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar 
                    className="w-10 h-10 cursor-pointer"
                    onClick={() => navigate(`/h5/view-profile/${post.author.name}`)}
                  >
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-sm cursor-pointer hover:text-blue-600"
                        onClick={() => navigate(`/h5/view-profile/${post.author.name}`)}
                      >
                        {post.author.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {post.author.class}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{post.createdAt}</span>
                      {post.location && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{post.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <p 
                className="text-sm mb-3 leading-relaxed cursor-pointer"
                onClick={() => handleComment(post.id)}
              >
                {post.content}
              </p>

              {post.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {post.images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg"></div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 ${
                    post.isLiked ? 'text-red-500' : 'text-gray-500'
                  }`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs">{post.likes}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-500"
                  onClick={() => handleComment(post.id)}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">{post.comments}</span>
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

      {/* 发布按钮 */}
      <Button
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full shadow-lg z-10"
        onClick={() => navigate('/h5/create-post')}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* 底部间距 */}
      <div className="h-20"></div>
    </div>
  );
}
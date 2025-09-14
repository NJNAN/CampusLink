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
  Calendar,
  Plus,
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
}

export default function PersonalHome() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [userInfo] = useState({
    name: '张三',
    avatar: '',
    class: '计算机科学与技术2021级1班',
    bio: '热爱编程，喜欢摄影',
    postsCount: 12,
    followersCount: 88,
    followingCount: 66
  });

  useEffect(() => {
    // 模拟加载个人动态数据
    const mockPosts: Post[] = [
      {
        id: '1',
        author: {
          name: '张三',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        content: '今天参加了学校的社团活动，收获很多！认识了很多志同道合的朋友，期待接下来的活动。',
        images: [],
        location: '福建师范大学',
        createdAt: '2024-01-15 14:30',
        likes: 15,
        comments: 3,
        isLiked: false
      },
      {
        id: '2',
        author: {
          name: '张三',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        content: '图书馆学习的一天，准备期末考试中...',
        images: [],
        createdAt: '2024-01-14 20:15',
        likes: 8,
        comments: 1,
        isLiked: true
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
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 个人信息卡片 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={userInfo.avatar} />
              <AvatarFallback>{userInfo.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg">{userInfo.name}</h2>
              <p className="text-sm text-gray-600">{userInfo.class}</p>
              <p className="text-sm text-gray-500 mt-1">{userInfo.bio}</p>
            </div>
          </div>

          <div className="flex justify-around py-4 border-t">
            <div className="text-center">
              <div className="text-lg">{userInfo.postsCount}</div>
              <div className="text-sm text-gray-500">动态</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{userInfo.followersCount}</div>
              <div className="text-sm text-gray-500">关注者</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{userInfo.followingCount}</div>
              <div className="text-sm text-gray-500">关注中</div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => navigate('/h5/my-profile')}
            >
              编辑资料
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => navigate('/h5/create-post')}
            >
              <Plus className="w-4 h-4 mr-1" />
              发布动态
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 快捷功能 */}
      <div className="grid grid-cols-4 gap-4 px-4 mb-6">
        {[
          { label: '入学感言', icon: MessageCircle, path: '/h5/enrollment-feeling' },
          { label: '班级合影', icon: Camera, path: '/h5/class-photo' },
          { label: '活动快照', icon: Camera, path: '/h5/activity-snapshot' },
          { label: '荣誉证书', icon: Calendar, path: '/h5/honor-certificate' },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant="ghost"
              className="h-auto flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
              onClick={() => navigate(item.path)}
            >
              <Icon className="w-6 h-6 mb-2 text-blue-600" />
              <span className="text-xs text-gray-700">{item.label}</span>
            </Button>
          );
        })}
      </div>

      {/* 我的动态 */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg">我的动态</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/h5/create-post')}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{post.author.name}</span>
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

                <p className="text-sm mb-3 leading-relaxed">{post.content}</p>

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
      </div>

      {/* 底部间距 */}
      <div className="h-20"></div>
    </div>
  );
}
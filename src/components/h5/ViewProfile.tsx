import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Search,
  MapPin,
  Calendar,
  Mail,
  Phone,
  MessageCircle,
  UserPlus,
  UserCheck,
  Heart,
  Share,
  MoreHorizontal,
  Users
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  class: string;
  major: string;
  studentId: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  joinDate: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  posts: Post[];
}

interface Post {
  id: string;
  content: string;
  images: string[];
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export default function ViewProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(!id || id === 'search');

  useEffect(() => {
    if (!isSearchMode && id) {
      loadUserProfile(id);
    } else {
      setIsLoading(false);
    }
  }, [id, isSearchMode]);

  const loadUserProfile = async (userId: string) => {
    try {
      // 模拟加载用户资料
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockProfile: UserProfile = {
        id: userId,
        name: '李小明',
        avatar: '',
        class: '计算机科学与技术2021级1班',
        major: '计算机科学与技术',
        studentId: '202101001',
        email: 'lixiaoming@example.com',
        phone: '138****8888',
        bio: '热爱编程，喜欢算法和数据结构。希望能在计算机领域有所发展，目标是成为一名优秀的软件工程师。',
        location: '福建福州',
        joinDate: '2021年9月',
        postsCount: 24,
        followersCount: 128,
        followingCount: 96,
        isFollowing: false,
        posts: [
          {
            id: '1',
            content: '今天的数据结构课真的很有趣！老师讲解得很清楚，终于理解了二叉树的遍历算法。',
            images: [],
            createdAt: '2024-01-15',
            likes: 15,
            comments: 8,
            isLiked: false
          },
          {
            id: '2',
            content: '参加了学校的编程竞赛，虽然没有拿到名次，但是学到了很多东西。',
            images: [],
            createdAt: '2024-01-10',
            likes: 23,
            comments: 12,
            isLiked: true
          }
        ]
      };

      setProfile(mockProfile);
    } catch (error) {
      console.error('加载用户资料失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      // 模拟搜索用户
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockResults: UserProfile[] = [
        {
          id: '1',
          name: '李小明',
          avatar: '',
          class: '计算机科学与技术2021级1班',
          major: '计算机科学与技术',
          studentId: '202101001',
          email: '',
          phone: '',
          bio: '热爱编程，喜欢算法和数据结构',
          location: '福建福州',
          joinDate: '2021年9月',
          postsCount: 24,
          followersCount: 128,
          followingCount: 96,
          isFollowing: false,
          posts: []
        },
        {
          id: '2',
          name: '王小红',
          avatar: '',
          class: '计算机科学与技术2021级1班',
          major: '计算机科学与技术',
          studentId: '202101002',
          email: '',
          phone: '',
          bio: '喜欢前端开发，正在学习React',
          location: '福建厦门',
          joinDate: '2021年9月',
          postsCount: 18,
          followersCount: 89,
          followingCount: 105,
          isFollowing: true,
          posts: []
        }
      ].filter(user => 
        user.name.includes(query) || 
        user.class.includes(query) ||
        user.studentId.includes(query)
      );

      setSearchResults(mockResults);
    } catch (error) {
      console.error('搜索失败:', error);
    }
  };

  const handleFollow = (userId: string) => {
    if (profile && profile.id === userId) {
      setProfile({
        ...profile,
        isFollowing: !profile.isFollowing,
        followersCount: profile.isFollowing 
          ? profile.followersCount - 1 
          : profile.followersCount + 1
      });
    } else {
      setSearchResults(searchResults.map(user => 
        user.id === userId 
          ? { 
              ...user, 
              isFollowing: !user.isFollowing,
              followersCount: user.isFollowing 
                ? user.followersCount - 1 
                : user.followersCount + 1
            }
          : user
      ));
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isSearchMode) {
    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        {/* 搜索页面头部 */}
        <div className="bg-white p-4 border-b sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索同学姓名、班级或学号"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* 搜索结果 */}
        <div className="p-4">
          {searchQuery && searchResults.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">未找到相关用户</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {searchResults.map((user) => (
                <Card 
                  key={user.id} 
                  className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/h5/view-profile/${user.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm">{user.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {user.class}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1">{user.bio}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>动态 {user.postsCount}</span>
                          <span>关注者 {user.followersCount}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={user.isFollowing ? "secondary" : "default"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFollow(user.id);
                        }}
                      >
                        {user.isFollowing ? (
                          <>
                            <UserCheck className="w-4 h-4 mr-1" />
                            已关注
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-1" />
                            关注
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">用户不存在</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate(-1)}
          >
            返回
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg">{profile.name}</h1>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* 用户信息卡片 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg mb-1">{profile.name}</h2>
              <Badge variant="secondary" className="mb-2">
                {profile.class}
              </Badge>
              <p className="text-sm text-gray-600 mb-3">{profile.bio}</p>
              
              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{profile.joinDate} 入学</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-around py-4 border-t border-b mb-4">
            <div className="text-center">
              <div className="text-lg">{profile.postsCount}</div>
              <div className="text-sm text-gray-500">动态</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{profile.followersCount}</div>
              <div className="text-sm text-gray-500">关注者</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{profile.followingCount}</div>
              <div className="text-sm text-gray-500">关注中</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant={profile.isFollowing ? "secondary" : "default"}
              size="sm"
              className="flex-1"
              onClick={() => handleFollow(profile.id)}
            >
              {profile.isFollowing ? (
                <>
                  <UserCheck className="w-4 h-4 mr-1" />
                  已关注
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-1" />
                  关注
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-1" />
              私信
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 动态列表 */}
      <div className="px-4">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">动态</TabsTrigger>
            <TabsTrigger value="info">资料</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-4">
            <div className="space-y-4">
              {profile.posts.length === 0 ? (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-8 text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">还没有发布动态</p>
                  </CardContent>
                </Card>
              ) : (
                profile.posts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/h5/post-detail/${post.id}`)}
                  >
                    <CardContent className="p-4">
                      <p className="text-sm mb-3 leading-relaxed">{post.content}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.createdAt}</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="info" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500">学号</label>
                    <p className="text-sm">{profile.studentId}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">专业</label>
                    <p className="text-sm">{profile.major}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">班级</label>
                    <p className="text-sm">{profile.class}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">邮箱</label>
                    <p className="text-sm">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">手机号</label>
                    <p className="text-sm">{profile.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">所在地</label>
                    <p className="text-sm">{profile.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部间距 */}
      <div className="h-20"></div>
    </div>
  );
}
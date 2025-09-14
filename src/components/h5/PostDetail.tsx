import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { 
  ArrowLeft,
  Heart, 
  MessageCircle, 
  Share, 
  Send,
  MapPin,
  MoreHorizontal,
  Camera
} from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    class: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

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

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPostDetail();
  }, [id]);

  const loadPostDetail = async () => {
    try {
      // 模拟加载动态详情数据
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockPost: Post = {
        id: id || '1',
        author: {
          name: '李小明',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        content: '今天的数据结构课真的很有趣！老师讲解得很清楚，终于理解了二叉树的遍历算法。准备今晚好好复习一下，巩固今天学到的知识。\n\n感觉编程的乐趣就在于不断学习新的知识，每一次理解一个新概念都会有成就感。希望能在这条路上走得更远！',
        images: [],
        location: '教学楼A101',
        createdAt: '2024-01-15 14:30',
        likes: 15,
        comments: 8,
        isLiked: false
      };

      const mockComments: Comment[] = [
        {
          id: '1',
          author: {
            name: '王小红',
            avatar: '',
            class: '计算机科学与技术2021级1班'
          },
          content: '同感！这个老师讲课确实很棒，我也在这节课学到了很多。',
          createdAt: '2024-01-15 15:10',
          likes: 3,
          isLiked: false,
          replies: [
            {
              id: '1-1',
              author: {
                name: '李小明',
                avatar: '',
                class: '计算机科学与技术2021级1班'
              },
              content: '是的！老师的教学方法很棒',
              createdAt: '2024-01-15 15:15',
              likes: 1,
              isLiked: true
            }
          ]
        },
        {
          id: '2',
          author: {
            name: '张三',
            avatar: '',
            class: '计算机科学与技术2021级2班'
          },
          content: '请问有没有相关的练习题推荐？我也想多练习一下二叉树的算法。',
          createdAt: '2024-01-15 16:20',
          likes: 2,
          isLiked: false
        },
        {
          id: '3',
          author: {
            name: '刘小花',
            avatar: '',
            class: '计算机科学与技术2021级1班'
          },
          content: '可以一起组队学习吗？我觉得讨论学习效果会更好！',
          createdAt: '2024-01-15 17:05',
          likes: 5,
          isLiked: true
        }
      ];

      setPost(mockPost);
      setComments(mockComments);
    } catch (error) {
      console.error('加载动态详情失败:', error);
      toast.error('加载失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = () => {
    if (!post) return;
    setPost({
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1
    });
  };

  const handleCommentLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const handleSendComment = async () => {
    if (!newComment.trim()) {
      toast.error('请输入评论内容');
      return;
    }

    try {
      const newCommentObj: Comment = {
        id: String(Date.now()),
        author: {
          name: '我',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        content: newComment,
        createdAt: new Date().toLocaleString('zh-CN', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        likes: 0,
        isLiked: false
      };

      setComments([...comments, newCommentObj]);
      setNewComment('');
      
      if (post) {
        setPost({
          ...post,
          comments: post.comments + 1
        });
      }
      
      toast.success('评论发送成功');
    } catch (error) {
      toast.error('发送失败，请重试');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">动态不存在</p>
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
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 页面头部 */}
      <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg">动态详情</h1>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* 动态内容 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar 
                className="w-12 h-12 cursor-pointer"
                onClick={() => navigate(`/h5/view-profile/${post.author.name}`)}
              >
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
          </div>

          <p className="text-sm mb-4 leading-relaxed whitespace-pre-line">{post.content}</p>

          {post.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {post.images.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg"></div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${
                post.isLiked ? 'text-red-500' : 'text-gray-500'
              }`}
              onClick={handleLike}
            >
              <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{post.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-500"
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

      {/* 评论区域 */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm">评论 ({comments.length})</h3>
        </div>

        {/* 评论输入框 */}
        <Card className="mb-4 border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="" />
                <AvatarFallback>我</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center gap-2">
                <Textarea
                  placeholder="写评论..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={1}
                  className="flex-1 resize-none border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-9"
                />
                <Button
                  size="sm"
                  onClick={handleSendComment}
                  disabled={!newComment.trim()}
                  className="flex-shrink-0 h-9 w-9 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 评论列表 */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500 text-sm">还没有评论，来说点什么吧~</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs">{comment.author.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {comment.author.class}
                      </Badge>
                      <span className="text-xs text-gray-500">{comment.createdAt}</span>
                    </div>
                    <p className="text-xs text-gray-700 mb-2">{comment.content}</p>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-auto p-1 ${
                          comment.isLiked ? 'text-red-500' : 'text-gray-500'
                        }`}
                        onClick={() => handleCommentLike(comment.id)}
                      >
                        <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-xs ml-1">{comment.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-gray-500"
                      >
                        <span className="text-xs">回复</span>
                      </Button>
                    </div>

                    {/* 回复 */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="bg-white rounded p-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs">{reply.author.name}</span>
                              <span className="text-xs text-gray-500">{reply.createdAt}</span>
                            </div>
                            <p className="text-xs text-gray-700">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
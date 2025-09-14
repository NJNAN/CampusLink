import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { 
  MessageCircle, 
  Heart, 
  Trash2, 
  Plus, 
  Send,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner';

interface Feeling {
  id: string;
  author: {
    name: string;
    avatar: string;
    class: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  canDelete: boolean;
}

export default function EnrollmentFeeling() {
  const [feelings, setFeelings] = useState<Feeling[]>([]);
  const [newFeeling, setNewFeeling] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser] = useState({
    name: '张三',
    avatar: '',
    class: '计算机科学与技术2021级1班',
    isClassAdmin: false // 是否是班级管理员
  });

  useEffect(() => {
    // 模拟加载入学感言数据
    const mockFeelings: Feeling[] = [
      {
        id: '1',
        author: {
          name: '李四',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        content: '很激动能够进入福建师范大学学习！这里的环境真的很棒，老师和同学们都很友善。希望在接下来的四年里能够充实地度过每一天，学到更多知识，结交更多朋友。大学生活，我来了！',
        createdAt: '2024-01-15 10:30',
        likes: 25,
        comments: 8,
        isLiked: false,
        canDelete: false
      },
      {
        id: '2',
        author: {
          name: '王五',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        content: '从小就梦想着能够学习计算机专业，现在终于如愿以偿了！感谢父母的支持，感谢老师的栽培。希望能在这个专业领域有所建树，为社会贡献自己的力量。',
        createdAt: '2024-01-14 16:45',
        likes: 18,
        comments: 5,
        isLiked: true,
        canDelete: false
      },
      {
        id: '3',
        author: {
          name: '张三',
          avatar: '',
          class: '计算机科学与技术2021级1班'
        },
        content: '新的开始，新的挑战！大学生活让我感到既兴奋又紧张。希望能够在学习上有所收获，在生活上得到成长。',
        createdAt: '2024-01-13 14:20',
        likes: 12,
        comments: 3,
        isLiked: false,
        canDelete: true
      }
    ];
    setFeelings(mockFeelings);
  }, []);

  const handleLike = (feelingId: string) => {
    setFeelings(feelings.map(feeling => 
      feeling.id === feelingId 
        ? { 
            ...feeling, 
            isLiked: !feeling.isLiked,
            likes: feeling.isLiked ? feeling.likes - 1 : feeling.likes + 1
          }
        : feeling
    ));
  };

  const handleDelete = (feelingId: string) => {
    if (window.confirm('确定要删除这条感言吗？')) {
      setFeelings(feelings.filter(feeling => feeling.id !== feelingId));
      toast.success('删除成功');
    }
  };

  const handleSubmit = () => {
    if (!newFeeling.trim()) {
      toast.error('请输入感言内容');
      return;
    }

    const newFeelingItem: Feeling = {
      id: Date.now().toString(),
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        class: currentUser.class
      },
      content: newFeeling.trim(),
      createdAt: new Date().toLocaleString('zh-CN'),
      likes: 0,
      comments: 0,
      isLiked: false,
      canDelete: true
    };

    setFeelings([newFeelingItem, ...feelings]);
    setNewFeeling('');
    setIsDialogOpen(false);
    toast.success('发布成功');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl">入学感言</h1>
            <p className="text-sm text-gray-600 mt-1">分享你的入学心情</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                发布感言
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>发布入学感言</DialogTitle>
                <DialogDescription>
                  分享你对大学生活的第一印象和期待
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm">{currentUser.name}</div>
                    <div className="text-xs text-gray-500">{currentUser.class}</div>
                  </div>
                </div>
                
                <Textarea
                  placeholder="分享你的入学感受和期待..."
                  value={newFeeling}
                  onChange={(e) => setNewFeeling(e.target.value)}
                  rows={6}
                  maxLength={500}
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {newFeeling.length}/500
                  </span>
                  <Button onClick={handleSubmit}>
                    <Send className="w-4 h-4 mr-1" />
                    发布
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计信息 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg text-blue-600">{feelings.length}</div>
              <div className="text-sm text-gray-500">总感言</div>
            </div>
            <div>
              <div className="text-lg text-red-500">
                {feelings.reduce((sum, feeling) => sum + feeling.likes, 0)}
              </div>
              <div className="text-sm text-gray-500">总点赞</div>
            </div>
            <div>
              <div className="text-lg text-green-500">
                {feelings.reduce((sum, feeling) => sum + feeling.comments, 0)}
              </div>
              <div className="text-sm text-gray-500">总评论</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 感言列表 */}
      <div className="px-4 space-y-4">
        {feelings.map((feeling) => (
          <Card key={feeling.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={feeling.author.avatar} />
                    <AvatarFallback>{feeling.author.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{feeling.author.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {feeling.author.class}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">{feeling.createdAt}</div>
                  </div>
                </div>
                
                {(feeling.canDelete || currentUser.isClassAdmin) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(feeling.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <p className="text-sm mb-4 leading-relaxed">{feeling.content}</p>

              <div className="flex items-center justify-between pt-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 ${
                    feeling.isLiked ? 'text-red-500' : 'text-gray-500'
                  }`}
                  onClick={() => handleLike(feeling.id)}
                >
                  <Heart className={`w-4 h-4 ${feeling.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs">{feeling.likes}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-500"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">{feeling.comments}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 底部间距 */}
      <div className="h-20"></div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Plus,
  Target,
  BookOpen,
  Trophy,
  Calendar,
  CheckCircle,
  Circle,
  Edit,
  Trash2,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'skill' | 'career' | 'personal';
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  progress: number;
  isCompleted: boolean;
  createdAt: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  dueDate?: string;
}

export default function CollegePlanning() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'academic' as const,
    priority: 'medium' as const,
    deadline: '',
    tasks: ''
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    const mockGoals: Goal[] = [
      {
        id: '1',
        title: '精通Java编程',
        description: '深入学习Java语言，掌握面向对象编程思想，能够独立开发项目',
        category: 'academic',
        priority: 'high',
        deadline: '2024-06-01',
        progress: 65,
        isCompleted: false,
        createdAt: '2024-01-01',
        tasks: [
          { id: '1-1', title: '完成Java基础语法学习', isCompleted: true },
          { id: '1-2', title: '学习面向对象编程', isCompleted: true },
          { id: '1-3', title: '掌握常用设计模式', isCompleted: false, dueDate: '2024-03-01' },
          { id: '1-4', title: '完成一个完整项目', isCompleted: false, dueDate: '2024-05-01' }
        ]
      },
      {
        id: '2',
        title: '英语六级通过',
        description: '提高英语水平，顺利通过英语六级考试，为将来深造和工作打好基础',
        category: 'academic',
        priority: 'high',
        deadline: '2024-12-01',
        progress: 40,
        isCompleted: false,
        createdAt: '2024-01-15',
        tasks: [
          { id: '2-1', title: '背诵六级词汇', isCompleted: false, dueDate: '2024-06-01' },
          { id: '2-2', title: '练习听力题型', isCompleted: false, dueDate: '2024-08-01' },
          { id: '2-3', title: '提高阅读速度', isCompleted: false, dueDate: '2024-09-01' },
          { id: '2-4', title: '参加模拟考试', isCompleted: false, dueDate: '2024-11-01' }
        ]
      },
      {
        id: '3',
        title: '获得前端开发技能认证',
        description: '学习前端开发技术栈，包括HTML、CSS、JavaScript、React等',
        category: 'skill',
        priority: 'medium',
        deadline: '2024-08-01',
        progress: 80,
        isCompleted: false,
        createdAt: '2024-01-10',
        tasks: [
          { id: '3-1', title: 'HTML/CSS基础', isCompleted: true },
          { id: '3-2', title: 'JavaScript进阶', isCompleted: true },
          { id: '3-3', title: 'React框架学习', isCompleted: true },
          { id: '3-4', title: '项目实战练习', isCompleted: false, dueDate: '2024-07-01' }
        ]
      },
      {
        id: '4',
        title: '实习机会获取',
        description: '在大三下学期找到一份满意的互联网公司实习工作',
        category: 'career',
        priority: 'high',
        deadline: '2024-07-01',
        progress: 25,
        isCompleted: false,
        createdAt: '2024-01-05',
        tasks: [
          { id: '4-1', title: '完善简历', isCompleted: true },
          { id: '4-2', title: '准备作品集', isCompleted: false, dueDate: '2024-04-01' },
          { id: '4-3', title: '投递简历', isCompleted: false, dueDate: '2024-05-01' },
          { id: '4-4', title: '面试准备', isCompleted: false, dueDate: '2024-06-01' }
        ]
      }
    ];
    setGoals(mockGoals);
  };

  const handleAddGoal = () => {
    if (!newGoal.title.trim()) {
      toast.error('请输入目标标题');
      return;
    }

    const tasks = newGoal.tasks
      .split('\n')
      .filter(task => task.trim())
      .map((task, index) => ({
        id: `${Date.now()}-${index}`,
        title: task.trim(),
        isCompleted: false
      }));

    const goal: Goal = {
      id: String(Date.now()),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      priority: newGoal.priority,
      deadline: newGoal.deadline,
      progress: 0,
      isCompleted: false,
      createdAt: new Date().toISOString().split('T')[0],
      tasks
    };

    setGoals([goal, ...goals]);
    setNewGoal({
      title: '',
      description: '',
      category: 'academic',
      priority: 'medium',
      deadline: '',
      tasks: ''
    });
    setIsAddDialogOpen(false);
    toast.success('目标添加成功！');
  };

  const toggleTask = (goalId: string, taskId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedTasks = goal.tasks.map(task =>
          task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        );
        const completedTasks = updatedTasks.filter(task => task.isCompleted).length;
        const progress = updatedTasks.length > 0 ? (completedTasks / updatedTasks.length) * 100 : 0;
        
        return {
          ...goal,
          tasks: updatedTasks,
          progress: Math.round(progress),
          isCompleted: progress === 100
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    if (window.confirm('确定要删除这个目标吗？')) {
      setGoals(goals.filter(goal => goal.id !== goalId));
      toast.success('目标已删除');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'skill': return <Target className="w-4 h-4 text-green-500" />;
      case 'career': return <Trophy className="w-4 h-4 text-orange-500" />;
      case 'personal': return <Star className="w-4 h-4 text-purple-500" />;
      default: return <Circle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'academic': return '学术学习';
      case 'skill': return '技能提升';
      case 'career': return '职业发展';
      case 'personal': return '个人成长';
      default: return '其他';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityName = (priority: string) => {
    switch (priority) {
      case 'high': return '高优先级';
      case 'medium': return '中优先级';
      case 'low': return '低优先级';
      default: return '未知';
    }
  };

  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.isCompleted).length;
  const averageProgress = goals.length > 0 ? goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length : 0;
  const upcomingDeadlines = goals
    .filter(goal => !goal.isCompleted && goal.deadline)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

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
              <h1 className="text-lg">大学规划</h1>
              <p className="text-sm text-gray-600">制定和追踪目标</p>
            </div>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                新目标
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加新目标</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="目标标题"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
                <Textarea
                  placeholder="目标描述"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value as any})}
                    className="border rounded px-3 py-2 text-sm"
                  >
                    <option value="academic">学术学习</option>
                    <option value="skill">技能提升</option>
                    <option value="career">职业发展</option>
                    <option value="personal">个人成长</option>
                  </select>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as any})}
                    className="border rounded px-3 py-2 text-sm"
                  >
                    <option value="high">高优先级</option>
                    <option value="medium">中优先级</option>
                    <option value="low">低优先级</option>
                  </select>
                </div>
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                />
                <Textarea
                  placeholder="具体任务（每行一个任务）"
                  value={newGoal.tasks}
                  onChange={(e) => setNewGoal({...newGoal, tasks: e.target.value})}
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                    取消
                  </Button>
                  <Button onClick={handleAddGoal} className="flex-1">
                    添加
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 统计概览 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">目标概览</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg text-blue-600">{totalGoals}</div>
              <div className="text-xs text-gray-500">总目标</div>
            </div>
            <div className="text-center">
              <div className="text-lg text-green-600">{completedGoals}</div>
              <div className="text-xs text-gray-500">已完成</div>
            </div>
            <div className="text-center">
              <div className="text-lg text-orange-600">{Math.round(averageProgress)}%</div>
              <div className="text-xs text-gray-500">平均进度</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>总体进度</span>
              <span>{Math.round(averageProgress)}%</span>
            </div>
            <Progress value={averageProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* 即将到期的目标 */}
      {upcomingDeadlines.length > 0 && (
        <Card className="mx-4 mb-4 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              即将到期
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingDeadlines.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                  <div>
                    <div className="text-sm">{goal.title}</div>
                    <div className="text-xs text-gray-500">{goal.deadline}</div>
                  </div>
                  <Progress value={goal.progress} className="w-16 h-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 目标列表 */}
      <div className="px-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="text-xs">全部</TabsTrigger>
            <TabsTrigger value="academic" className="text-xs">学习</TabsTrigger>
            <TabsTrigger value="skill" className="text-xs">技能</TabsTrigger>
            <TabsTrigger value="career" className="text-xs">职业</TabsTrigger>
            <TabsTrigger value="personal" className="text-xs">个人</TabsTrigger>
          </TabsList>

          {['all', 'academic', 'skill', 'career', 'personal'].map((category) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="space-y-4">
                {goals
                  .filter(goal => category === 'all' || goal.category === category)
                  .map((goal) => (
                    <Card key={goal.id} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getCategoryIcon(goal.category)}
                              <h3 className="text-sm">{goal.title}</h3>
                              {goal.isCompleted && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {getCategoryName(goal.category)}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityColor(goal.priority)}`}>
                                {getPriorityName(goal.priority)}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteGoal(goal.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{goal.description}</p>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>进度</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>

                        {goal.deadline && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>截止日期: {goal.deadline}</span>
                          </div>
                        )}

                        {goal.tasks.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-sm">任务清单:</div>
                            {goal.tasks.map((task) => (
                              <div key={task.id} className="flex items-center gap-2 text-sm">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleTask(goal.id, task.id)}
                                  className="w-4 h-4 p-0"
                                >
                                  {task.isCompleted ? (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-gray-400" />
                                  )}
                                </Button>
                                <span className={task.isCompleted ? 'line-through text-gray-500' : ''}>
                                  {task.title}
                                </span>
                                {task.dueDate && (
                                  <span className="text-xs text-gray-400">({task.dueDate})</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
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
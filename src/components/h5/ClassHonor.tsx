import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Trophy,
  Award,
  Medal,
  Star,
  Calendar,
  Users,
  Crown,
  Target,
  TrendingUp,
  BookOpen,
  Heart,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Honor {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'sports' | 'cultural' | 'social' | 'volunteer' | 'competition';
  level: 'school' | 'college' | 'city' | 'province' | 'national';
  date: string;
  organizer: string;
  participants: string[];
  photos: string[];
  certificate: string;
  impact: string;
  rank?: string;
}

export default function ClassHonor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  const [honors] = useState<Honor[]>([
    {
      id: '1',
      title: '2023年度优秀班集体',
      description: '在学习成绩、班级管理、文体活动等方面表现突出，获得学校优秀班集体荣誉称号',
      category: 'academic',
      level: 'school',
      date: '2023-12-15',
      organizer: '福建师范大学学生工作部',
      participants: ['全体同学', '班主任王老师'],
      photos: ['https://picsum.photos/400/300?random=1'],
      certificate: 'cert_001.pdf',
      impact: '提升了班级凝聚力，为同学们树立了良好的榜样',
      rank: '第一名'
    },
    {
      id: '2',
      title: '学院篮球比赛冠军',
      description: '在计算机学院举办的篮球联赛中，我班男子篮球队表现优异，最终夺得冠军',
      category: 'sports',
      level: 'college',
      date: '2023-11-20',
      organizer: '计算机与网络空间安全学院',
      participants: ['张三', '李四', '王五', '赵六', '钱七'],
      photos: ['https://picsum.photos/400/300?random=2'],
      certificate: 'cert_002.pdf',
      impact: '增强了班级体育精神，促进了同学间的团结协作'
    },
    {
      id: '3',
      title: '优秀团支部',
      description: '在团组织建设、志愿服务、思想政治教育等方面成绩显著，获得优秀团支部称号',
      category: 'social',
      level: 'school',
      date: '2023-05-04',
      organizer: '共青团福建师范大学委员会',
      participants: ['团支部全体成员'],
      photos: ['https://picsum.photos/400/300?random=3'],
      certificate: 'cert_003.pdf',
      impact: '提升了班级的思想政治素质和社会责任感'
    },
    {
      id: '4',
      title: '文艺晚会最佳创意奖',
      description: '在学校迎新晚会中，我班原创节目《青春代码》获得最佳创意奖',
      category: 'cultural',
      level: 'school',
      date: '2023-10-15',
      organizer: '福建师范大学学生会',
      participants: ['刘小花', '陈小强', '周小美', '吴小帅'],
      photos: ['https://picsum.photos/400/300?random=4'],
      certificate: 'cert_004.pdf',
      impact: '展现了班级的创新能力和艺术才华'
    },
    {
      id: '5',
      title: '社会实践先进集体',
      description: '暑期三下乡社会实践活动中表现突出，获得社会实践先进集体荣誉',
      category: 'volunteer',
      level: 'province',
      date: '2023-09-10',
      organizer: '福建省教育厅',
      participants: ['实践小分队全体成员'],
      photos: ['https://picsum.photos/400/300?random=5'],
      certificate: 'cert_005.pdf',
      impact: '提升了班级的社会责任感和实践能力',
      rank: '省级先进'
    },
    {
      id: '6',
      title: 'ACM程序设计竞赛团体三等奖',
      description: '在全国大学生ACM程序设计竞赛中获得团体三等奖',
      category: 'competition',
      level: 'national',
      date: '2023-08-25',
      organizer: 'ACM中国委员会',
      participants: ['编程三人组'],
      photos: ['https://picsum.photos/400/300?random=6'],
      certificate: 'cert_006.pdf',
      impact: '提升了班级在计算机专业领域的声誉',
      rank: '全国三等奖'
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="w-5 h-5" />;
      case 'sports': return <Medal className="w-5 h-5" />;
      case 'cultural': return <Star className="w-5 h-5" />;
      case 'social': return <Heart className="w-5 h-5" />;
      case 'volunteer': return <Users className="w-5 h-5" />;
      case 'competition': return <Zap className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-700';
      case 'sports': return 'bg-green-100 text-green-700';
      case 'cultural': return 'bg-purple-100 text-purple-700';
      case 'social': return 'bg-red-100 text-red-700';
      case 'volunteer': return 'bg-orange-100 text-orange-700';
      case 'competition': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'academic': return '学术';
      case 'sports': return '体育';
      case 'cultural': return '文艺';
      case 'social': return '社会';
      case 'volunteer': return '志愿';
      case 'competition': return '竞赛';
      default: return '其他';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'national': return <Crown className="w-4 h-4 text-red-500" />;
      case 'province': return <Trophy className="w-4 h-4 text-orange-500" />;
      case 'city': return <Award className="w-4 h-4 text-blue-500" />;
      case 'school': return <Medal className="w-4 h-4 text-green-500" />;
      case 'college': return <Target className="w-4 h-4 text-purple-500" />;
      default: return <Star className="w-4 h-4 text-gray-500" />;
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'national': return '国家级';
      case 'province': return '省级';
      case 'city': return '市级';
      case 'school': return '校级';
      case 'college': return '院级';
      default: return '其他';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'national': return 'bg-red-100 text-red-700';
      case 'province': return 'bg-orange-100 text-orange-700';
      case 'city': return 'bg-blue-100 text-blue-700';
      case 'school': return 'bg-green-100 text-green-700';
      case 'college': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredHonors = activeTab === 'all' 
    ? honors 
    : honors.filter(honor => honor.category === activeTab || honor.level === activeTab);

  const stats = {
    total: honors.length,
    national: honors.filter(h => h.level === 'national').length,
    province: honors.filter(h => h.level === 'province').length,
    school: honors.filter(h => h.level === 'school').length
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg">班级荣誉</h1>
            <p className="text-sm text-gray-600">我们的荣誉时刻</p>
          </div>
        </div>
      </div>

      {/* 荣誉统计 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-lg text-blue-600">{stats.total}</div>
              <div className="text-xs text-gray-500">总荣誉</div>
            </div>
            <div>
              <div className="text-lg text-red-600">{stats.national}</div>
              <div className="text-xs text-gray-500">国家级</div>
            </div>
            <div>
              <div className="text-lg text-orange-600">{stats.province}</div>
              <div className="text-xs text-gray-500">省级</div>
            </div>
            <div>
              <div className="text-lg text-green-600">{stats.school}</div>
              <div className="text-xs text-gray-500">校级</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分类筛选 */}
      <div className="px-4 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
              variant={activeTab === 'all' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('all')}
              className="text-xs whitespace-nowrap"
            >
              全部
            </Button>
            <Button 
              variant={activeTab === 'national' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('national')}
              className="text-xs whitespace-nowrap"
            >
              国家级
            </Button>
            <Button 
              variant={activeTab === 'academic' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('academic')}
              className="text-xs whitespace-nowrap"
            >
              学术
            </Button>
            <Button 
              variant={activeTab === 'sports' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('sports')}
              className="text-xs whitespace-nowrap"
            >
              体育
            </Button>
            <Button 
              variant={activeTab === 'cultural' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('cultural')}
              className="text-xs whitespace-nowrap"
            >
              文艺
            </Button>
            <Button 
              variant={activeTab === 'volunteer' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setActiveTab('volunteer')}
              className="text-xs whitespace-nowrap"
            >
              志愿
            </Button>
          </div>
        </Tabs>
      </div>

      {/* 荣誉列表 */}
      <div className="px-4 space-y-4">
        {filteredHonors.map((honor, index) => (
          <Card key={honor.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              {/* 荣誉头部 */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 rounded-full ${getCategoryColor(honor.category)}`}>
                  {getCategoryIcon(honor.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-xs ${getCategoryColor(honor.category)}`}>
                      {getCategoryText(honor.category)}
                    </Badge>
                    <Badge className={`text-xs ${getLevelColor(honor.level)}`}>
                      {getLevelIcon(honor.level)}
                      <span className="ml-1">{getLevelText(honor.level)}</span>
                    </Badge>
                    {honor.rank && (
                      <Badge className="text-xs bg-yellow-100 text-yellow-700">
                        {honor.rank}
                      </Badge>
                    )}
                    {index === 0 && (
                      <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        最新
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-sm mb-2">{honor.title}</h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{honor.description}</p>
                </div>
              </div>

              {/* 荣誉图片 */}
              {honor.photos.length > 0 && (
                <img 
                  src={honor.photos[0]} 
                  alt={honor.title}
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}

              {/* 荣誉详情 */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(honor.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    <span>{honor.organizer}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>参与者: {honor.participants.slice(0, 3).join(', ')}{honor.participants.length > 3 ? '等' : ''}</span>
                </div>
              </div>

              {/* 影响描述 */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-blue-500" />
                  <span className="text-xs text-blue-600">影响与意义</span>
                </div>
                <p className="text-xs text-gray-600">{honor.impact}</p>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  查看证书
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  分享荣誉
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredHonors.length === 0 && (
          <div className="text-center py-8">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">暂无荣誉</h3>
            <p className="text-sm text-gray-500">该分类下暂无荣誉记录</p>
          </div>
        )}
      </div>

      {/* 激励文案 */}
      <Card className="m-4 border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4 text-center">
          <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-sm mb-1 text-gray-800">团结拼搏，再创辉煌</h3>
          <p className="text-xs text-gray-600">每一份荣誉都是我们共同努力的结果</p>
        </CardContent>
      </Card>

      <div className="h-20"></div>
    </div>
  );
}
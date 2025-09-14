import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Star,
  TrendingUp,
  Award,
  BarChart3,
  Calendar,
  GraduationCap,
  Target,
  BookOpen,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  code: string;
  name: string;
  category: 'major' | 'general' | 'elective' | 'practice';
  credits: number;
  score: number;
  grade: string;
  gpa: number;
  semester: string;
  teacher: string;
  status: 'passed' | 'failed' | 'retake';
}

interface GradeStats {
  totalCredits: number;
  earnedCredits: number;
  gpa: number;
  ranking: number;
  totalStudents: number;
  majorGpa: number;
  generalGpa: number;
  excellentCourses: number;
  passedCourses: number;
  totalCourses: number;
}

export default function GraduationGrades() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const [gradeStats] = useState<GradeStats>({
    totalCredits: 160,
    earnedCredits: 158,
    gpa: 3.72,
    ranking: 8,
    totalStudents: 45,
    majorGpa: 3.85,
    generalGpa: 3.58,
    excellentCourses: 28,
    passedCourses: 42,
    totalCourses: 44
  });

  const [courses] = useState<Course[]>([
    {
      id: '1',
      code: 'CS101',
      name: '程序设计基础',
      category: 'major',
      credits: 4,
      score: 92,
      grade: 'A',
      gpa: 4.0,
      semester: '2021-2022-1',
      teacher: '张教授',
      status: 'passed'
    },
    {
      id: '2',
      code: 'CS201',
      name: '数据结构与算法',
      category: 'major',
      credits: 4,
      score: 88,
      grade: 'A-',
      gpa: 3.7,
      semester: '2021-2022-2',
      teacher: '李教授',
      status: 'passed'
    },
    {
      id: '3',
      code: 'CS301',
      name: '计算机网络',
      category: 'major',
      credits: 3,
      score: 85,
      grade: 'B+',
      gpa: 3.3,
      semester: '2022-2023-1',
      teacher: '王副教授',
      status: 'passed'
    },
    {
      id: '4',
      code: 'CS401',
      name: '软件工程',
      category: 'major',
      credits: 3,
      score: 90,
      grade: 'A-',
      gpa: 3.7,
      semester: '2022-2023-2',
      teacher: '刘教授',
      status: 'passed'
    },
    {
      id: '5',
      code: 'MATH101',
      name: '高等数学A',
      category: 'general',
      credits: 5,
      score: 82,
      grade: 'B',
      gpa: 3.0,
      semester: '2021-2022-1',
      teacher: '陈教授',
      status: 'passed'
    },
    {
      id: '6',
      code: 'ENG101',
      name: '大学英语',
      category: 'general',
      credits: 3,
      score: 78,
      grade: 'B-',
      gpa: 2.7,
      semester: '2021-2022-1',
      teacher: '林老师',
      status: 'passed'
    },
    {
      id: '7',
      code: 'PE101',
      name: '体育',
      category: 'general',
      credits: 1,
      score: 85,
      grade: 'B+',
      gpa: 3.3,
      semester: '2021-2022-1',
      teacher: '体育组',
      status: 'passed'
    },
    {
      id: '8',
      code: 'CS501',
      name: '毕业设计',
      category: 'practice',
      credits: 8,
      score: 94,
      grade: 'A',
      gpa: 4.0,
      semester: '2024-2025-2',
      teacher: '导师组',
      status: 'passed'
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'major': return 'bg-blue-100 text-blue-700';
      case 'general': return 'bg-green-100 text-green-700';
      case 'elective': return 'bg-purple-100 text-purple-700';
      case 'practice': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'major': return '专业课';
      case 'general': return '通识课';
      case 'elective': return '选修课';
      case 'practice': return '实践课';
      default: return '其他';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600';
      case 'A-': return 'text-green-500'; 
      case 'B+': return 'text-blue-600';
      case 'B': return 'text-blue-500';
      case 'B-': return 'text-yellow-600';
      case 'C+': return 'text-orange-600';
      case 'C': return 'text-orange-500';
      default: return 'text-red-500';
    }
  };

  const getGpaLevel = (gpa: number) => {
    if (gpa >= 3.7) return { text: '优秀', color: 'text-green-600' };
    if (gpa >= 3.0) return { text: '良好', color: 'text-blue-600' };
    if (gpa >= 2.0) return { text: '及格', color: 'text-yellow-600' };
    return { text: '不及格', color: 'text-red-600' };
  };

  const groupBySemester = (courses: Course[]) => {
    return courses.reduce((acc, course) => {
      if (!acc[course.semester]) {
        acc[course.semester] = [];
      }
      acc[course.semester].push(course);
      return acc;
    }, {} as Record<string, Course[]>);
  };

  const groupedCourses = groupBySemester(courses);
  const gpaLevel = getGpaLevel(gradeStats.gpa);

  const categoryStats = {
    major: courses.filter(c => c.category === 'major'),
    general: courses.filter(c => c.category === 'general'),
    elective: courses.filter(c => c.category === 'elective'),
    practice: courses.filter(c => c.category === 'practice')
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
              <h1 className="text-lg">毕业成绩单</h1>
              <p className="text-sm text-gray-600">我的学业成果</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            下载
          </Button>
        </div>
      </div>

      {/* GPA概览卡片 */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl text-white mb-1">{gradeStats.gpa}</div>
              <div className={`text-sm text-white/90 ${gpaLevel.color.replace('text-', 'text-white/')}`}>
                总GPA · {gpaLevel.text}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg text-white">#{gradeStats.ranking}</div>
              <div className="text-sm text-white/90">专业排名</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="text-xs">成绩概览</TabsTrigger>
            <TabsTrigger value="courses" className="text-xs">课程详情</TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs">成绩分析</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              {/* 基本统计 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    学业统计
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg text-blue-600">{gradeStats.earnedCredits}</div>
                      <div className="text-xs text-gray-500">已获学分</div>
                      <div className="text-xs text-gray-400">/ {gradeStats.totalCredits}</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg text-green-600">{gradeStats.passedCourses}</div>
                      <div className="text-xs text-gray-500">通过课程</div>
                      <div className="text-xs text-gray-400">/ {gradeStats.totalCourses}</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg text-purple-600">{gradeStats.excellentCourses}</div>
                      <div className="text-xs text-gray-500">优秀课程</div>
                      <div className="text-xs text-gray-400">(85分以上)</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg text-orange-600">#{gradeStats.ranking}</div>
                      <div className="text-xs text-gray-500">专业排名</div>
                      <div className="text-xs text-gray-400">/ {gradeStats.totalStudents}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>学分完成进度</span>
                      <span>{((gradeStats.earnedCredits / gradeStats.totalCredits) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(gradeStats.earnedCredits / gradeStats.totalCredits) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* 分类GPA */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    分类成绩
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">专业课GPA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${getGpaLevel(gradeStats.majorGpa).color}`}>
                          {gradeStats.majorGpa}
                        </span>
                        <Badge className="text-xs bg-blue-100 text-blue-700">
                          {categoryStats.major.length}门
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-green-500" />
                        <span className="text-sm">通识课GPA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${getGpaLevel(gradeStats.generalGpa).color}`}>
                          {gradeStats.generalGpa}
                        </span>
                        <Badge className="text-xs bg-green-100 text-green-700">
                          {categoryStats.general.length}门
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 成绩亮点 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    成绩亮点
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-600" />
                      <div>
                        <div className="text-sm">最高分课程</div>
                        <div className="text-xs text-gray-500">毕业设计 - 94分</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-sm">专业排名前20%</div>
                        <div className="text-xs text-gray-500">第8名 / 45人</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-sm">学分完成度</div>
                        <div className="text-xs text-gray-500">98.7% (158/160学分)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-4">
            <div className="space-y-4">
              {Object.entries(groupedCourses)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([semester, semesterCourses]) => (
                <Card key={semester} className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {semester}学期
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {semesterCourses.map((course) => (
                        <div key={course.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm">{course.name}</span>
                                <Badge className={`text-xs ${getCategoryColor(course.category)}`}>
                                  {getCategoryText(course.category)}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-500">
                                {course.code} · {course.teacher} · {course.credits}学分
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-lg ${getGradeColor(course.grade)}`}>
                                {course.grade}
                              </div>
                              <div className="text-xs text-gray-500">{course.score}分</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>GPA: {course.gpa}</span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              已通过
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-4">
            <div className="space-y-4">
              {/* GPA趋势 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    成绩趋势分析
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl text-blue-600 mb-1">{gradeStats.gpa}</div>
                      <div className="text-sm text-gray-600">总体GPA</div>
                      <div className={`text-xs ${gpaLevel.color} mt-1`}>
                        学业水平: {gpaLevel.text}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg text-green-600">85+</div>
                        <div className="text-xs text-gray-500">优秀率</div>
                        <div className="text-xs text-gray-400">
                          {((gradeStats.excellentCourses / gradeStats.totalCourses) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg text-purple-600">100%</div>
                        <div className="text-xs text-gray-500">通过率</div>
                        <div className="text-xs text-gray-400">全部通过</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 课程分布 */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">课程分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(categoryStats).map(([category, courses]) => (
                      <div key={category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{getCategoryText(category)}</span>
                          <span>{courses.length}门课程</span>
                        </div>
                        <Progress 
                          value={(courses.length / gradeStats.totalCourses) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 建议和总结 */}
              <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="text-sm mb-2 text-gray-800">学业成果总结</h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>• 总体学业表现优秀，GPA达到{gradeStats.gpa}分</p>
                        <p>• 专业课程掌握扎实，专业排名第{gradeStats.ranking}名</p>
                        <p>• 完成了{gradeStats.earnedCredits}个学分，达到毕业要求</p>
                        <p>• 优秀课程比例达到{((gradeStats.excellentCourses / gradeStats.totalCourses) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
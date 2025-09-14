import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft,
  Edit,
  Download,
  Share,
  User,
  GraduationCap,
  Award,
  Briefcase,
  Code,
  Star,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyResume() {
  const navigate = useNavigate();
  const [resumeData] = useState({
    personalInfo: {
      name: '张三',
      avatar: '',
      studentId: '2021001001',
      major: '计算机科学与技术',
      class: '计算机科学与技术2021级1班',
      college: '计算机与网络空间安全学院',
      email: 'zhangsan@example.com',
      phone: '138****8888',
      location: '福建省福州市',
      birthday: '2003-06-15',
      website: 'https://github.com/zhangsan'
    },
    education: {
      university: '福建师范大学',
      degree: '本科',
      major: '计算机科学与技术',
      startDate: '2021-09',
      expectedGraduation: '2025-06',
      gpa: '3.8/4.0',
      ranking: '专业前10%'
    },
    skills: [
      { name: 'Java', level: 90, category: '编程语言' },
      { name: 'Python', level: 85, category: '编程语言' },
      { name: 'JavaScript', level: 80, category: '编程语言' },
      { name: 'React', level: 75, category: '前端框架' },
      { name: 'Vue.js', level: 70, category: '前端框架' },
      { name: 'MySQL', level: 85, category: '数据库' },
      { name: 'MongoDB', level: 70, category: '数据库' },
      { name: 'Git', level: 90, category: '工具' }
    ],
    projects: [
      {
        name: '校园论坛系统',
        description: '基于Spring Boot和Vue.js开发的校园论坛平台',
        technologies: ['Spring Boot', 'Vue.js', 'MySQL', 'Redis'],
        duration: '2023.09 - 2023.12',
        highlights: [
          '负责后端API设计和开发',
          '实现用户认证和权限管理',
          '优化数据库查询性能，提升响应速度30%'
        ]
      },
      {
        name: '在线图书管理系统',
        description: '支持图书借阅、归还和推荐的Web应用',
        technologies: ['Java', 'Spring MVC', 'MyBatis'],
        duration: '2023.03 - 2023.06',
        highlights: [
          '设计并实现完整的图书管理功能',
          '使用MyBatis进行数据库操作',
          '集成推荐算法提升用户体验'
        ]
      }
    ],
    awards: [
      {
        title: '国家励志奖学金',
        issuer: '教育部',
        date: '2023-12',
        level: '国家级'
      },
      {
        title: 'ACM程序设计竞赛省赛二等奖',
        issuer: '中国计算机学会',
        date: '2023-11',
        level: '省级'
      },
      {
        title: '优秀学生干部',
        issuer: '福建师范大学',
        date: '2023-06',
        level: '校级'
      }
    ],
    internships: [
      {
        company: '某科技有限公司',
        position: 'Java开发实习生',
        duration: '2024.01 - 2024.03',
        description: '参与公司后端服务开发，负责用户模块的设计和实现',
        achievements: [
          '完成用户注册登录功能开发',
          '编写单元测试，代码覆盖率达到85%',
          '参与代码评审，提升代码质量'
        ]
      }
    ],
    languages: [
      { name: '中文', level: '母语' },
      { name: '英语', level: 'CET-6(520分)' },
      { name: '日语', level: 'N3' }
    ],
    interests: ['编程', '摄影', '阅读', '篮球', '音乐']
  });

  const getSkillColor = (level: number) => {
    if (level >= 80) return 'text-green-600 bg-green-100';
    if (level >= 60) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getLevelColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-blue-500';
    return 'bg-orange-500';
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
              <h1 className="text-lg">我的简历</h1>
              <p className="text-sm text-gray-600">个人详细信息</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              导出
            </Button>
            <Button size="sm">
              <Edit className="w-4 h-4 mr-1" />
              编辑
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 基本信息 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={resumeData.personalInfo.avatar} />
                <AvatarFallback className="text-lg">{resumeData.personalInfo.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl mb-1">{resumeData.personalInfo.name}</h2>
                <p className="text-sm text-gray-600 mb-1">{resumeData.personalInfo.studentId}</p>
                <Badge variant="secondary" className="text-xs mb-2">
                  {resumeData.personalInfo.major}
                </Badge>
                <p className="text-xs text-gray-500">{resumeData.personalInfo.college}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-xs">{resumeData.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-xs">{resumeData.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-xs">{resumeData.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-xs">GitHub</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 教育背景 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              教育背景
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm">{resumeData.education.university}</h3>
                  <p className="text-xs text-gray-600">{resumeData.education.degree} · {resumeData.education.major}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {resumeData.education.startDate} - {resumeData.education.expectedGraduation}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="text-center">
                  <div className="text-sm text-blue-600">{resumeData.education.gpa}</div>
                  <div className="text-xs text-gray-500">GPA</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-green-600">{resumeData.education.ranking}</div>
                  <div className="text-xs text-gray-500">专业排名</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 技能水平 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Code className="w-4 h-4 text-green-500" />
              技能水平
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['编程语言', '前端框架', '数据库', '工具'].map((category) => {
                const categorySkills = resumeData.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h4 className="text-sm text-gray-700 mb-2">{category}</h4>
                    <div className="space-y-2">
                      {categorySkills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{skill.name}</span>
                            <Badge className={`text-xs ${getSkillColor(skill.level)}`}>
                              {skill.level}%
                            </Badge>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getLevelColor(skill.level)}`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 项目经历 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-500" />
              项目经历
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <div key={index} className={index > 0 ? 'pt-4 border-t' : ''}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm">{project.name}</h3>
                    <span className="text-xs text-gray-500">{project.duration}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 获奖情况 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" />
              获奖情况
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resumeData.awards.map((award, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <h3 className="text-sm">{award.title}</h3>
                    <p className="text-xs text-gray-600">{award.issuer}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs mb-1">
                      {award.level}
                    </Badge>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {award.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 实习经历 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-orange-500" />
              实习经历
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumeData.internships.map((internship, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm">{internship.company}</h3>
                      <p className="text-xs text-gray-600">{internship.position}</p>
                    </div>
                    <span className="text-xs text-gray-500">{internship.duration}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{internship.description}</p>
                  <ul className="space-y-1">
                    {internship.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 语言能力 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">语言能力</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {resumeData.languages.map((language, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{language.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {language.level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 兴趣爱好 */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">兴趣爱好</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {resumeData.interests.map((interest, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
import { useState } from 'react';
import { ArrowLeft, Heart, Users, Award, Mail, Phone, MapPin, ExternalLink, Github, Globe } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useNavigate } from 'react-router-dom';

export default function AboutUs() {
  const navigate = useNavigate();
  
  const [appInfo] = useState({
    name: '福州理工学院校友通讯',
    version: 'v1.2.0',
    buildNumber: '2024.01.15',
    description: '连接校友，分享青春，传承友谊',
    developer: '福州理工学院校友会',
    website: 'https://www.fzit.edu.cn',
    email: 'alumni@fzit.edu.cn',
    phone: '0591-12345678',
    address: '福建省福州市永泰葛岭学院路1号',
    features: [
      '校友动态分享',
      '班级圈互动',
      '活动发现',
      '岁月回忆',
      '校友街商圈',
      '毕业成绩管理'
    ]
  });

  const teamMembers = [
    {
      name: '张老师',
      role: '项目负责人',
      avatar: '',
      description: '负责项目整体规划和管理'
    },
    {
      name: '李同学',
      role: '前端开发',
      avatar: '',
      description: '负责移动端界面设计和开发'
    },
    {
      name: '王同学',
      role: '后端开发',
      avatar: '',
      description: '负责服务器端开发和数据库设计'
    },
    {
      name: '刘同学',
      role: 'UI/UX设计',
      avatar: '',
      description: '负责界面设计和用户体验优化'
    }
  ];

  const achievements = [
    {
      icon: Users,
      title: '活跃用户',
      value: '2,000+',
      description: '注册校友用户数量'
    },
    {
      icon: Heart,
      title: '动态发布',
      value: '10,000+',
      description: '累计发布动态数量'
    },
    {
      icon: Award,
      title: '班级数量',
      value: '150+',
      description: '已加入的班级数量'
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: '邮箱',
      value: appInfo.email,
      action: () => window.open(`mailto:${appInfo.email}`)
    },
    {
      icon: Phone,
      label: '电话',
      value: appInfo.phone,
      action: () => window.open(`tel:${appInfo.phone}`)
    },
    {
      icon: MapPin,
      label: '地址',
      value: appInfo.address,
      action: () => {}
    },
    {
      icon: Globe,
      label: '官网',
      value: appInfo.website,
      action: () => window.open(appInfo.website, '_blank')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-medium">关于我们</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 应用信息 */}
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
          <div className="w-16 h-16 bg-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-medium text-blue-900 mb-2">{appInfo.name}</h2>
          <p className="text-blue-700 mb-4">{appInfo.description}</p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="bg-blue-200 text-blue-800">
              {appInfo.version}
            </Badge>
            <Badge variant="outline" className="border-blue-300 text-blue-700">
              {appInfo.buildNumber}
            </Badge>
          </div>
        </Card>

        {/* 核心功能 */}
        <Card className="p-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-600" />
            核心功能
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {appInfo.features.map((feature, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 数据统计 */}
        <Card className="p-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-green-600" />
            平台数据
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-lg font-medium text-blue-600">{achievement.value}</div>
                  <div className="text-xs text-gray-600">{achievement.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{achievement.description}</div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* 开发团队 */}
        <Card className="p-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-600" />
            开发团队
          </h3>
          <div className="space-y-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {member.name.slice(0, 1)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{member.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {member.role}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 联系方式 */}
        <Card className="p-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-600" />
            联系我们
          </h3>
          <div className="space-y-3">
            {contactMethods.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={contact.action}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{contact.label}</div>
                    <div className="text-xs text-gray-600">{contact.value}</div>
                  </div>
                  {contact.label !== '地址' && (
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* 开源信息 */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="text-center space-y-3">
            <Github className="w-8 h-8 mx-auto text-gray-700" />
            <div>
              <h3 className="font-medium text-green-900 mb-1">开源项目</h3>
              <p className="text-sm text-green-700 mb-3">
                本项目部分代码已开源，欢迎参与贡献
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-green-300 text-green-700">
              <Github className="w-4 h-4 mr-2" />
              查看源码
            </Button>
          </div>
        </Card>

        {/* 版权信息 */}
        <Card className="p-4 bg-gray-100">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              © 2024 福州理工学院校友通讯
            </p>
            <p className="text-xs text-gray-500">
              版权所有 · 福州理工学院校友会
            </p>
            <div className="flex justify-center space-x-4 text-xs">
              <Button variant="link" size="sm" className="text-gray-500 p-0 h-auto">
                用户协议
              </Button>
              <Button variant="link" size="sm" className="text-gray-500 p-0 h-auto">
                隐私政策
              </Button>
              <Button variant="link" size="sm" className="text-gray-500 p-0 h-auto">
                意见反馈
              </Button>
            </div>
          </div>
        </Card>

        {/* 底部安全区域 */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}
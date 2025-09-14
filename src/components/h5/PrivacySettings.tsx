import { useState } from 'react';
import { ArrowLeft, Shield, Eye, EyeOff, Lock, Users, Phone, Mail, MapPin } from 'lucide-react';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function PrivacySettings() {
  const navigate = useNavigate();
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    phoneVisible: false,
    emailVisible: true,
    locationVisible: false,
    postsPublic: true,
    allowMessages: true,
    allowComments: true,
    allowFriendRequests: true,
    showOnlineStatus: true,
    allowSearch: true,
    dataAnalytics: false,
    marketingEmails: false
  });

  const toggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    // 模拟保存设置
    setTimeout(() => {
      toast.success('隐私设置已更新');
    }, 500);
  };

  const privacyGroups = [
    {
      title: '个人资料可见性',
      description: '控制其他用户能看到的个人信息',
      icon: Eye,
      settings: [
        {
          key: 'profileVisible' as keyof typeof privacySettings,
          label: '个人资料可见',
          description: '允许其他用户查看您的个人资料',
          level: 'medium'
        },
        {
          key: 'phoneVisible' as keyof typeof privacySettings,
          label: '手机号可见',
          description: '在个人资料中显示手机号',
          level: 'high'
        },
        {
          key: 'emailVisible' as keyof typeof privacySettings,
          label: '邮箱可见',
          description: '在个人资料中显示邮箱地址',
          level: 'medium'
        },
        {
          key: 'locationVisible' as keyof typeof privacySettings,
          label: '位置信息可见',
          description: '在动态中显示位置信息',
          level: 'high'
        }
      ]
    },
    {
      title: '动态与互动',
      description: '控制动态发布和互动权限',
      icon: Users,
      settings: [
        {
          key: 'postsPublic' as keyof typeof privacySettings,
          label: '动态公开',
          description: '允许所有用户查看您的动态',
          level: 'low'
        },
        {
          key: 'allowComments' as keyof typeof privacySettings,
          label: '允许评论',
          description: '其他用户可以评论您的动态',
          level: 'low'
        },
        {
          key: 'allowMessages' as keyof typeof privacySettings,
          label: '允许私信',
          description: '接收来自其他用户的私信',
          level: 'medium'
        },
        {
          key: 'allowFriendRequests' as keyof typeof privacySettings,
          label: '允许关注请求',
          description: '其他用户可以向您发送关注请求',
          level: 'low'
        }
      ]
    },
    {
      title: '搜索与发现',
      description: '控制您在搜索结果中的可见性',
      icon: MapPin,
      settings: [
        {
          key: 'allowSearch' as keyof typeof privacySettings,
          label: '允许被搜索',
          description: '您的个人资料可以在搜索中被找到',
          level: 'low'
        },
        {
          key: 'showOnlineStatus' as keyof typeof privacySettings,
          label: '显示在线状态',
          description: '其他用户可以看到您的在线状态',
          level: 'medium'
        }
      ]
    },
    {
      title: '数据使用',
      description: '控制数据收集和使用权限',
      icon: Shield,
      settings: [
        {
          key: 'dataAnalytics' as keyof typeof privacySettings,
          label: '数据分析',
          description: '允许使用您的数据进行产品改进',
          level: 'medium'
        },
        {
          key: 'marketingEmails' as keyof typeof privacySettings,
          label: '营销邮件',
          description: '接收产品更新和推广邮件',
          level: 'low'
        }
      ]
    }
  ];

  const getPrivacyLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPrivacyLevelText = (level: string) => {
    switch (level) {
      case 'high':
        return '高敏感';
      case 'medium':
        return '中敏感';
      case 'low':
        return '低敏感';
      default:
        return '未知';
    }
  };

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
            <h1 className="text-lg font-medium">隐私设置</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 隐私概览 */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 mb-1">隐私保护</h3>
              <p className="text-sm text-blue-700">
                我们重视您的隐私安全。您可以根据需要调整以下设置，控制个人信息的可见性和使用权限。
              </p>
            </div>
          </div>
        </Card>

        {/* 隐私设置分组 */}
        {privacyGroups.map((group, groupIndex) => {
          const Icon = group.icon;
          return (
            <Card key={groupIndex} className="p-0 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-900">{group.title}</h2>
                    <p className="text-xs text-gray-600">{group.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {group.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">
                            {setting.label}
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPrivacyLevelColor(setting.level)}`}
                          >
                            {getPrivacyLevelText(setting.level)}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {setting.description}
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings[setting.key]}
                        onCheckedChange={() => toggleSetting(setting.key)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}

        {/* 账号安全 */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-900">账号安全</h2>
              <p className="text-xs text-gray-600">管理密码和登录安全</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/h5/change-password')}
            >
              <Lock className="w-4 h-4 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium">修改密码</div>
                <div className="text-xs text-gray-500">定期更换密码保护账号安全</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/h5/login-devices')}
            >
              <Phone className="w-4 h-4 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium">登录设备管理</div>
                <div className="text-xs text-gray-500">查看和管理已登录设备</div>
              </div>
            </Button>
          </div>
        </Card>

        {/* 隐私政策 */}
        <Card className="p-4 bg-gray-50">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              了解我们如何保护您的隐私
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="link" size="sm" className="text-blue-600">
                隐私政策
              </Button>
              <Button variant="link" size="sm" className="text-blue-600">
                用户协议
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
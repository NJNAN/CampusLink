import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, User, Bell, Shield, HelpCircle, MessageSquare, Info, Moon, Globe, Volume2, Eye, ZoomIn, RotateCcw, Accessibility } from 'lucide-react';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export default function Settings() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // 可访问性设置
  const [accessibilitySettings, setAccessibilitySettings] = useState(() => {
    // 从localStorage加载设置
    try {
      const saved = localStorage.getItem('accessibility-settings');
      return saved ? JSON.parse(saved) : {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        screenReader: false,
      };
    } catch {
      return {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        screenReader: false,
      };
    }
  });

  // 应用可访问性设置
  useEffect(() => {
    const html = document.documentElement;
    
    // 保存设置到localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(accessibilitySettings));
    
    if (accessibilitySettings.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    if (accessibilitySettings.largeText) {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }

    if (accessibilitySettings.reducedMotion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }
  }, [accessibilitySettings]);

  const toggleAccessibilitySetting = (key: keyof typeof accessibilitySettings) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetAccessibilitySettings = () => {
    const defaultSettings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
    };
    setAccessibilitySettings(defaultSettings);
    localStorage.setItem('accessibility-settings', JSON.stringify(defaultSettings));
  };

  const settingsGroups: Array<{
    title: string;
    items: Array<{
      icon: any;
      label: string;
      route?: string;
      toggle?: boolean;
      value?: any;
      onChange?: any;
      description?: string;
    }>;
  }> = [
    {
      title: '账户设置',
      items: [
        { icon: User, label: '个人信息', route: '/h5/my-profile' },
        { icon: Shield, label: '隐私设置', route: '/h5/privacy-settings' },
        { icon: Bell, label: '通知设置', route: '/h5/notification-settings' },
      ]
    },
    {
      title: '应用设置',
      items: [
        { 
          icon: Moon, 
          label: '深色模式', 
          toggle: true,
          value: darkMode,
          onChange: setDarkMode
        },
        { 
          icon: Volume2, 
          label: '声音提醒', 
          toggle: true,
          value: soundEnabled,
          onChange: setSoundEnabled
        },
        { icon: Globe, label: '语言设置', value: '简体中文', route: '/h5/language-settings' },
      ]
    },
    {
      title: '无障碍访问',
      items: [
        { 
          icon: Eye, 
          label: '高对比度', 
          toggle: true,
          value: accessibilitySettings.highContrast,
          onChange: () => toggleAccessibilitySetting('highContrast'),
          description: '提高文本和背景的对比度'
        },
        { 
          icon: ZoomIn, 
          label: '大字体模式', 
          toggle: true,
          value: accessibilitySettings.largeText,
          onChange: () => toggleAccessibilitySetting('largeText'),
          description: '放大文字显示'
        },
        { 
          icon: RotateCcw, 
          label: '减少动画', 
          toggle: true,
          value: accessibilitySettings.reducedMotion,
          onChange: () => toggleAccessibilitySetting('reducedMotion'),
          description: '减少页面动画效果'
        },
      ]
    },
    {
      title: '帮助与支持',
      items: [
        { icon: HelpCircle, label: '帮助中心', route: '/h5/help-center' },
        { icon: MessageSquare, label: '意见反馈', route: '/h5/feedback' },
        { icon: Info, label: '关于我们', route: '/h5/about-us' },
      ]
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
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-medium">设置</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <Card key={groupIndex} className="p-0 overflow-hidden">
            <div className="p-4 pb-2">
              <h2 className="text-sm font-medium text-gray-600">{group.title}</h2>
            </div>
            <div className="space-y-0">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div 
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => item.route && (window.location.href = item.route)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.label}</div>
                          {item.description && (
                            <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {item.toggle ? (
                          <Switch
                            checked={item.value}
                            onCheckedChange={item.onChange}
                          />
                        ) : item.value ? (
                          <span className="text-sm text-gray-500">{item.value}</span>
                        ) : null}
                        {item.route && <ChevronRight className="h-4 w-4 text-gray-400" />}
                      </div>
                    </div>
                  </div>
                  {itemIndex < group.items.length - 1 && (
                    <Separator className="ml-14" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* 快捷设置 */}
        <Card className="p-4">
          <h2 className="text-sm font-medium text-gray-600 mb-3">快捷设置</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">推送通知</span>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-medium">邮件通知</span>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </div>
        </Card>

        {/* 无障碍快速重置 */}
        {(accessibilitySettings.highContrast || accessibilitySettings.largeText || accessibilitySettings.reducedMotion) && (
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Accessibility className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium">重置无障碍设置</div>
                  <div className="text-xs text-gray-500">恢复到默认设置</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetAccessibilitySettings}
              >
                重置
              </Button>
            </div>
          </Card>
        )}

        {/* 版本信息 */}
        <Card className="p-4 text-center">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">福州理工学院校友通讯</p>
            <p className="text-xs text-gray-400">版本 v1.2.0</p>
          </div>
        </Card>

        {/* 底部安全区域 */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { ArrowLeft, Bell, MessageCircle, Heart, Calendar, Users, Book, Trophy } from 'lucide-react';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    // 推送通知
    pushEnabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
    // 消息通知
    newMessage: true,
    messageReply: true,
    mentionNotification: true,
    // 社交通知
    newLike: false,
    newComment: true,
    newFollower: true,
    // 活动通知
    activityReminder: true,
    activityUpdate: true,
    activityCancel: true,
    // 班级通知
    classAnnouncement: true,
    classActivity: true,
    classPhoto: false,
    // 学习通知
    courseReminder: true,
    gradeUpdate: true,
    bookRecommendation: false,
    // 成就通知
    newAchievement: true,
    certificateUpdate: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const notificationGroups = [
    {
      title: '基础设置',
      description: '控制通知的基本行为',
      items: [
        {
          key: 'pushEnabled',
          label: '推送通知',
          description: '允许接收推送通知',
          icon: Bell,
          important: true
        },
        {
          key: 'soundEnabled',
          label: '声音提醒',
          description: '通知时播放提示音',
          icon: Bell
        },
        {
          key: 'vibrationEnabled',
          label: '震动提醒',
          description: '通知时设备震动',
          icon: Bell
        }
      ]
    },
    {
      title: '消息通知',
      description: '私信和消息相关通知',
      items: [
        {
          key: 'newMessage',
          label: '新消息',
          description: '收到新的私信时通知',
          icon: MessageCircle
        },
        {
          key: 'messageReply',
          label: '消息回复',
          description: '有人回复你的消息时通知',
          icon: MessageCircle
        },
        {
          key: 'mentionNotification',
          label: '提及通知',
          description: '有人@你时通知',
          icon: MessageCircle
        }
      ]
    },
    {
      title: '社交通知',
      description: '点赞、评论、关注等社交互动',
      items: [
        {
          key: 'newLike',
          label: '新点赞',
          description: '有人点赞你的动态时通知',
          icon: Heart
        },
        {
          key: 'newComment',
          label: '新评论',
          description: '有人评论你的动态时通知',
          icon: MessageCircle
        },
        {
          key: 'newFollower',
          label: '新关注',
          description: '有人关注你时通知',
          icon: Users
        }
      ]
    },
    {
      title: '活动通知',
      description: '校园活动和事件提醒',
      items: [
        {
          key: 'activityReminder',
          label: '活动提醒',
          description: '参与的活动开始前提醒',
          icon: Calendar
        },
        {
          key: 'activityUpdate',
          label: '活动更新',
          description: '活动信息变更时通知',
          icon: Calendar
        },
        {
          key: 'activityCancel',
          label: '活动取消',
          description: '活动被取消时通知',
          icon: Calendar
        }
      ]
    },
    {
      title: '班级通知',
      description: '班级相关的通知和公告',
      items: [
        {
          key: 'classAnnouncement',
          label: '班级公告',
          description: '班级发布新公告时通知',
          icon: Users
        },
        {
          key: 'classActivity',
          label: '班级活动',
          description: '班级组织活动时通知',
          icon: Users
        },
        {
          key: 'classPhoto',
          label: '班级相册',
          description: '班级上传新照片时通知',
          icon: Users
        }
      ]
    },
    {
      title: '学习通知',
      description: '课程、成绩等学习相关通知',
      items: [
        {
          key: 'courseReminder',
          label: '课程提醒',
          description: '课程开始前提醒',
          icon: Book
        },
        {
          key: 'gradeUpdate',
          label: '成绩更新',
          description: '新成绩发布时通知',
          icon: Book
        },
        {
          key: 'bookRecommendation',
          label: '图书推荐',
          description: '收到新的图书推荐时通知',
          icon: Book
        }
      ]
    },
    {
      title: '成就通知',
      description: '荣誉证书和成就相关通知',
      items: [
        {
          key: 'newAchievement',
          label: '新成就',
          description: '获得新成就时通知',
          icon: Trophy
        },
        {
          key: 'certificateUpdate',
          label: '证书更新',
          description: '证书状态变更时通知',
          icon: Trophy
        }
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
            <h1 className="text-lg font-medium">通知设置</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // 保存设置
              console.log('保存通知设置', settings);
            }}
          >
            保存
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 通知统计 */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium">通知概览</h2>
            <Badge variant="secondary">
              {Object.values(settings).filter(Boolean).length} 项已启用
            </Badge>
          </div>
          <p className="text-sm text-gray-600">
            你可以根据需要自定义各类通知的接收设置，确保不错过重要信息的同时，避免不必要的打扰。
          </p>
        </Card>

        {/* 通知设置分组 */}
        {notificationGroups.map((group, groupIndex) => (
          <Card key={groupIndex} className="p-0 overflow-hidden">
            <div className="p-4 pb-2 border-b border-gray-100">
              <h2 className="font-medium">{group.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{group.description}</p>
            </div>
            <div className="space-y-0">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.label}</span>
                          {item.important && (
                            <Badge variant="destructive" className="text-xs px-1 py-0">
                              重要
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings[item.key as keyof typeof settings]}
                      onCheckedChange={(value) => updateSetting(item.key, value)}
                    />
                  </div>
                  {itemIndex < group.items.length - 1 && (
                    <Separator className="ml-14" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* 快捷操作 */}
        <Card className="p-4">
          <h2 className="font-medium mb-3">快捷操作</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => {
                const allKeys = Object.keys(settings);
                allKeys.forEach(key => updateSetting(key, true));
              }}
            >
              全部开启
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const allKeys = Object.keys(settings);
                allKeys.forEach(key => updateSetting(key, false));
              }}
            >
              全部关闭
            </Button>
          </div>
        </Card>

        {/* 底部安全区域 */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
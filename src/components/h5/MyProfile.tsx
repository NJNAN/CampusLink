import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  Edit, 
  Settings, 
  Camera, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  User,
  Award,
  BookOpen,
  Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyProfile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    studentId: '2021001001',
    avatar: '',
    class: '计算机科学与技术2021级1班',
    college: '计算机与网络空间安全学院',
    phone: '138****8888',
    email: 'zhangsan@example.com',
    hometown: '福建省福州市',
    birthday: '2003-06-15',
    dormitory: '东区宿舍楼A座301',
    bio: '热爱编程，喜欢摄影，立志成为一名优秀的软件工程师',
    joinDate: '2021-09-01',
    postsCount: 42,
    followersCount: 156,
    followingCount: 89,
    likesCount: 328
  });

  // 从localStorage加载用户信息
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setUserInfo(prev => ({
          ...prev,
          ...parsedProfile,
          // 保留统计数据
          postsCount: prev.postsCount,
          followersCount: prev.followersCount,
          followingCount: prev.followingCount,
          likesCount: prev.likesCount
        }));
      } catch (error) {
        console.error('解析用户资料失败:', error);
      }
    }
  }, []);

  const menuItems = [
    {
      category: '个人信息',
      items: [
        { icon: User, label: '基本信息', path: '/h5/my-resume', description: '查看和编辑个人资料' },
        { icon: Award, label: '荣誉证书', path: '/h5/honor-certificate', description: '管理获奖证书' },
        { icon: BookOpen, label: '我的简历', path: '/h5/my-resume', description: '完善个人简历' },
        { icon: Camera, label: '录取通知书', path: '/h5/admission-notice', description: '上传录取通知书' },
      ]
    },
    {
      category: '学习生活',
      items: [
        { icon: BookOpen, label: '大学规划', path: '/h5/college-planning', description: '制定学习计划' },
        { icon: Calendar, label: '课程表', path: '/h5/course-schedule', description: '查看课程安排' },
        { icon: Award, label: '毕业成绩单', path: '/h5/graduation-grades', description: '上传成绩单' },
        { icon: Heart, label: '喜欢的书', path: '/h5/favorite-books', description: '分享读书心得' },
      ]
    },
    {
      category: '设置',
      items: [
        { icon: Settings, label: '账号设置', path: '/h5/settings', description: '修改密码和隐私设置' },
        { icon: Phone, label: '联系方式', path: '/h5/contact', description: '更新联系信息' },
      ]
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 个人信息卡片 */}
      <Card className="m-4 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userInfo.avatar} />
                <AvatarFallback className="text-lg">{userInfo.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                variant="secondary"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl mb-1">{userInfo.name}</h2>
              <p className="text-sm text-gray-600 mb-1">{userInfo.studentId}</p>
              <Badge variant="secondary" className="text-xs">
                {userInfo.class}
              </Badge>
              <p className="text-xs text-gray-500 mt-2">{userInfo.college}</p>
            </div>
          </div>

          {userInfo.bio && (
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              {userInfo.bio}
            </p>
          )}

          <div className="flex justify-around py-4 border-t border-b">
            <div className="text-center">
              <div className="text-lg">{userInfo.postsCount}</div>
              <div className="text-xs text-gray-500">动态</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{userInfo.followersCount}</div>
              <div className="text-xs text-gray-500">关注者</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{userInfo.followingCount}</div>
              <div className="text-xs text-gray-500">关注中</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{userInfo.likesCount}</div>
              <div className="text-xs text-gray-500">获赞</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="text-center">
              <div className="text-xs text-gray-500">入学时间</div>
              <div className="text-sm">{userInfo.joinDate}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">宿舍</div>
              <div className="text-sm">{userInfo.dormitory}</div>
            </div>
          </div>

          <Button 
            className="w-full mt-4"
            onClick={() => navigate('/h5/edit-profile')}
          >
            <Edit className="w-4 h-4 mr-2" />
            编辑资料
          </Button>
        </CardContent>
      </Card>

      {/* 功能菜单 */}
      <div className="px-4 space-y-4">
        {menuItems.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={itemIndex}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => navigate(item.path)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
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
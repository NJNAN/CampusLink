import { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '../ui/sheet';
import { useConfirmDialog, enhancedToast } from '../common/UserFeedback';
import { 
  Menu, 
  Home, 
  MessageCircle, 
  Calendar, 
  Users, 
  Book, 
  Camera, 
  Award, 
  MapPin,
  Settings,
  LogOut,
  User,
  Activity
} from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

export default function MobileLayout({ children, onLogout }: MobileLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const menuItems = [
    {
      category: '个人中心',
      items: [
        { path: '/h5/personal-home', label: '个人主页', icon: Home },
        { path: '/h5/my-profile', label: '我的信息', icon: User },
        { path: '/h5/my-resume', label: '我的简历', icon: Book },
        { path: '/h5/honor-certificate', label: '荣誉证书', icon: Award },
      ]
    },
    {
      category: '校园生活',
      items: [
        { path: '/h5/enrollment-feeling', label: '入学感言', icon: MessageCircle },
        { path: '/h5/military-training', label: '军训生活', icon: Activity },
        { path: '/h5/years-memory', label: '岁月回忆', icon: Camera },
        { path: '/h5/dormitory-station', label: '宿舍驿站', icon: Home },
      ]
    },
    {
      category: '班级社交',
      items: [
        { path: '/h5/class-circle', label: '同学圈', icon: Users },
        { path: '/h5/class-info', label: '班级信息', icon: Users },
        { path: '/h5/class-activity', label: '班级活动', icon: Activity },
        { path: '/h5/class-honor', label: '班级荣誉', icon: Award },
      ]
    },
    {
      category: '学习规划',
      items: [
        { path: '/h5/college-planning', label: '大学规划', icon: Book },
        { path: '/h5/favorite-books', label: '喜欢的书', icon: Book },
        { path: '/h5/practice-activity', label: '实践活动', icon: Activity },
        { path: '/h5/course-schedule', label: '课程表', icon: Calendar },
        { path: '/h5/graduation-grades', label: '毕业成绩单', icon: Award },
      ]
    },
    {
      category: '校园服务',
      items: [
        { path: '/h5/school-calendar', label: '校历', icon: Calendar },
        { path: '/h5/favorite-cafeteria', label: '心仪食堂', icon: MapPin },
        { path: '/h5/activity-discover', label: '发现活动', icon: Activity },
        { path: '/h5/alumni-street', label: '校友街', icon: Users },
        { path: '/h5/campus-hotspot', label: '校园热点', icon: MapPin },
        { path: '/h5/school-intro', label: '学校介绍', icon: Home },
      ]
    },
    {
      category: '互动交流',
      items: [
        { path: '/h5/message-center', label: '消息中心', icon: MessageCircle },
        { path: '/h5/life-moments', label: '生活点滴', icon: Camera },
        { path: '/h5/nearby-classmates', label: '附近的同学', icon: MapPin },
        { path: '/h5/settings', label: '设置', icon: Settings },
      ]
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    confirm({
      title: '确认退出',
      description: '您确定要退出登录吗？退出后需要重新登录才能使用。',
      confirmText: '退出登录',
      cancelText: '取消',
      variant: 'destructive',
      onConfirm: () => {
        onLogout();
        enhancedToast.success('已成功退出登录');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>导航菜单</SheetTitle>
                <SheetDescription>校友通讯网学生端导航菜单</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <h2 className="text-xl">校友通讯网</h2>
                  <p className="text-blue-100 text-sm mt-1">学生端</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  {menuItems.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-6">
                      <h3 className="text-sm text-gray-500 mb-3 px-2">{category.category}</h3>
                      <div className="space-y-1">
                        {category.items.map((item, itemIndex) => {
                          const Icon = item.icon;
                          const isActive = location.pathname === item.path;
                          
                          return (
                            <Button
                              key={itemIndex}
                              variant={isActive ? "secondary" : "ghost"}
                              className="w-full justify-start"
                              onClick={() => handleNavigation(item.path)}
                            >
                              <Icon className="h-4 w-4 mr-3" />
                              {item.label}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    退出登录
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <h1 className="text-lg text-gray-800">校友通讯网</h1>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/h5/my-profile')}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="pb-4">
        {children}
      </main>

      {/* 底部快捷导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex items-center justify-around py-2">
          {[
            { path: '/h5/personal-home', label: '首页', icon: Home },
            { path: '/h5/class-circle', label: '同学圈', icon: Users },
            { path: '/h5/create-post', label: '发布', icon: MessageCircle },
            { path: '/h5/activity-discover', label: '发现', icon: Activity },
            { path: '/h5/my-profile', label: '我的', icon: User },
          ].map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center p-2 h-auto ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
      
      {/* 确认对话框 */}
      <ConfirmDialog />
    </div>
  );
}
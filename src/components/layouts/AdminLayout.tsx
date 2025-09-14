import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { 
  Users, 
  BookOpen, 
  MessageCircle, 
  Calendar, 
  Building, 
  Award, 
  FileText, 
  Settings, 
  LogOut,
  Home,
  Image,
  GraduationCap,
  School,
  Camera,
  Trophy,
  UserCheck,
  Newspaper,
  Activity
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  onLogout: () => void;
  userRole: 'admin' | 'teacher';
}

export default function AdminLayout({ children, onLogout, userRole }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      category: '用户管理',
      items: [
        { path: '/admin/personal-info', label: '个人信息管理', icon: Users },
        { path: '/admin/alumni', label: '校友管理', icon: GraduationCap },
        { path: '/admin/resumes', label: '简历管理', icon: FileText },
        { path: '/admin/authentication', label: '认证管理', icon: UserCheck },
        { path: '/admin/login-maintenance', label: '登录维护', icon: Settings },
      ]
    },
    {
      category: '内容管理',
      items: [
        { path: '/admin/enrollment-feeling', label: '入学感言管理', icon: MessageCircle },
        { path: '/admin/class-circle', label: '同学圈管理', icon: Users },
        { path: '/admin/books', label: '书籍管理', icon: BookOpen },
        { path: '/admin/college-planning', label: '大学规划管理', icon: FileText },
        { path: '/admin/years', label: '岁月管理', icon: Camera },
        { path: '/admin/roommate-photos', label: '舍友合影管理', icon: Image },
        { path: '/admin/certificates', label: '荣誉证书管理', icon: Award },
      ]
    },
    {
      category: '班级管理',
      items: [
        { path: '/admin/dormitory', label: '宿舍管理', icon: Building },
        { path: '/admin/class-committee', label: '班委管理', icon: Users },
        { path: '/admin/leadership', label: '领导管理', icon: UserCheck },
        { path: '/admin/class-motto', label: '班级口号管理', icon: MessageCircle },
        { path: '/admin/teachers', label: '教师管理', icon: Users },
      ]
    },
    {
      category: '活动管理',
      items: [
        { path: '/admin/activities', label: '活动管理', icon: Activity },
        { path: '/admin/news', label: '新闻管理', icon: Newspaper },
        { path: '/admin/banners', label: '轮播图管理', icon: Image },
        { path: '/admin/calendar', label: '校历管理', icon: Calendar },
      ]
    },
    {
      category: '服务管理',
      items: [
        { path: '/admin/companies', label: '校友企业管理', icon: Building },
        { path: '/admin/alumni-cards', label: '校友卡管理', icon: Award },
        { path: '/admin/cafeterias', label: '食堂管理', icon: Building },
        { path: '/admin/admission-notice', label: '录取通知书管理', icon: FileText },
        { path: '/admin/grades', label: '成绩单管理', icon: Trophy },
      ]
    }
  ];

  if (userRole === 'admin') {
    menuItems.push({
      category: '系统管理',
      items: [
        { path: '/admin/system', label: '系统管理', icon: Settings },
      ]
    });
  }

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white shadow-sm border-r flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <School className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg text-gray-800">校友通讯网</h2>
              <p className="text-sm text-gray-500">
                {userRole === 'admin' ? '管理后台' : '教师后台'}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <Button
              variant={location.pathname === '/admin/dashboard' ? "secondary" : "ghost"}
              className="w-full justify-start mb-2"
              onClick={() => handleNavigation('/admin/dashboard')}
            >
              <Home className="h-4 w-4 mr-3" />
              仪表盘
            </Button>
          </div>

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
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            退出登录
          </Button>
        </div>
      </aside>

      {/* 主要内容区域 */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
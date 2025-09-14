import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

// 用户体验增强组件
import ErrorBoundary from './components/common/ErrorBoundary';
import { FullScreenLoader, NetworkStatus } from './components/common/LoadingStates';
import { OfflineIndicator, registerServiceWorker, preloadCriticalResources } from './components/common/OfflineSupport';
import { useKeyboardNavigation, SkipToContent, FocusIndicator } from './components/common/AccessibilityEnhancer';
import PageTransition from './components/common/PageTransition';

// 导入页面组件
import LoginPage from './components/auth/LoginPage';
import MobileLayout from './components/layouts/MobileLayout';
import AdminLayout from './components/layouts/AdminLayout';
import NotFound from './components/NotFound';

// H5 页面组件  
import PersonalHome from './components/h5/PersonalHome';
import EnrollmentFeeling from './components/h5/EnrollmentFeeling';
import MilitaryTraining from './components/h5/MilitaryTraining';
import PostDetail from './components/h5/PostDetail';
import CreatePost from './components/h5/CreatePost';
import PublishPost from './components/h5/PublishPost';
import ActivityDiscover from './components/h5/ActivityDiscover';
import ClassCircle from './components/h5/ClassCircle';
import FavoriteBooks from './components/h5/FavoriteBooks';
import CollegePlanning from './components/h5/CollegePlanning';
import PracticeActivity from './components/h5/PracticeActivity';
import DormitoryStation from './components/h5/DormitoryStation';
import YearsMemory from './components/h5/YearsMemory';
import FavoriteCafeteria from './components/h5/FavoriteCafeteria';
import MyProfile from './components/h5/MyProfile';
import MyResume from './components/h5/MyResume';
import SchoolCalendar from './components/h5/SchoolCalendar';
import AlumniStreet from './components/h5/AlumniStreet';
import CampusHotspot from './components/h5/CampusHotspot';
import GraduationGrades from './components/h5/GraduationGrades';
import MessageCenter from './components/h5/MessageCenter';
import ClassInfo from './components/h5/ClassInfo';
import ClassActivity from './components/h5/ClassActivity';
import ClassHonor from './components/h5/ClassHonor';
import LifeMoments from './components/h5/LifeMoments';
import LoginMaintenance from './components/h5/LoginMaintenance';
import ViewProfile from './components/h5/ViewProfile';
import HonorCertificate from './components/h5/HonorCertificate';
import CourseSchedule from './components/h5/CourseSchedule';
import SchoolIntro from './components/h5/SchoolIntro';
import NearbyClassmates from './components/h5/NearbyClassmates';
import Settings from './components/h5/Settings';
import NotificationSettings from './components/h5/NotificationSettings';
import HelpCenter from './components/h5/HelpCenter';
import Feedback from './components/h5/Feedback';
import EditProfile from './components/h5/EditProfile';
import PrivacySettings from './components/h5/PrivacySettings';
import LanguageSettings from './components/h5/LanguageSettings';
import AboutUs from './components/h5/AboutUs';

// Admin 页面组件
import AdminDashboard from './components/admin/AdminDashboard';
import PersonalInfoManagement from './components/admin/PersonalInfoManagement';
import BookManagement from './components/admin/BookManagement';
import EnrollmentFeelingManagement from './components/admin/EnrollmentFeelingManagement';
import ClassCircleManagement from './components/admin/ClassCircleManagement';
import CollegePlanningManagement from './components/admin/CollegePlanningManagement';
import AlumniManagement from './components/admin/AlumniManagement';
import DormitoryManagement from './components/admin/DormitoryManagement';
import YearsManagement from './components/admin/YearsManagement';
import CalendarManagement from './components/admin/CalendarManagement';
import AdmissionNoticeManagement from './components/admin/AdmissionNoticeManagement';
import TeacherManagement from './components/admin/TeacherManagement';
import NewsManagement from './components/admin/NewsManagement';
import CompanyManagement from './components/admin/CompanyManagement';
import ActivityManagement from './components/admin/ActivityManagement';
import AlumniCardManagement from './components/admin/AlumniCardManagement';
import GradesManagement from './components/admin/GradesManagement';
import ClassCommitteeManagement from './components/admin/ClassCommitteeManagement';
import LeadershipManagement from './components/admin/LeadershipManagement';
import ClassMottoManagement from './components/admin/ClassMottoManagement';
import LoginMaintenanceManagement from './components/admin/LoginMaintenanceManagement';
import ResumeManagement from './components/admin/ResumeManagement';
import SystemManagement from './components/admin/SystemManagement';
import RoommatePhotoManagement from './components/admin/RoommatePhotoManagement';
import CertificateManagement from './components/admin/CertificateManagement';
import AuthenticationManagement from './components/admin/AuthenticationManagement';
import BannerManagement from './components/admin/BannerManagement';
import CafeteriaManagement from './components/admin/CafeteriaManagement';
import FeedbackManagement from './components/admin/FeedbackManagement';
import SystemSettingsManagement from './components/admin/SystemSettingsManagement';
import NotificationManagement from './components/admin/NotificationManagement';
import StatisticsManagement from './components/admin/StatisticsManagement';
import PermissionManagement from './components/admin/PermissionManagement';
import LogManagement from './components/admin/LogManagement';
import BackupManagement from './components/admin/BackupManagement';
import FileManagement from './components/admin/FileManagement';
import SystemMonitoring from './components/admin/SystemMonitoring';
import ConfigManagement from './components/admin/ConfigManagement';
import ThemeManagement from './components/admin/ThemeManagement';
import EmailTemplateManagement from './components/admin/EmailTemplateManagement';
import SmsTemplateManagement from './components/admin/SmsTemplateManagement';
import ApiManagement from './components/admin/ApiManagement';
import DataImportExport from './components/admin/DataImportExport';
import SecuritySettings from './components/admin/SecuritySettings';
import VersionManagement from './components/admin/VersionManagement';

export default function App() {
  // 为了Figma预览，设置默认认证状态
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState<'student' | 'admin' | 'teacher'>('student');
  const [isLoading, setIsLoading] = useState(false);

  // 启用键盘导航
  useKeyboardNavigation();

  useEffect(() => {
    // 注册Service Worker
    registerServiceWorker();
    
    // 预加载关键资源
    preloadCriticalResources();
    
    // 应用保存的可访问性设置
    const applyAccessibilitySettings = () => {
      try {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
          const settings = JSON.parse(saved);
          const html = document.documentElement;
          
          if (settings.highContrast) html.classList.add('high-contrast');
          if (settings.largeText) html.classList.add('large-text');
          if (settings.reducedMotion) html.classList.add('reduce-motion');
        }
      } catch (error) {
        console.warn('Failed to apply accessibility settings:', error);
      }
    };
    
    applyAccessibilitySettings();

    // 检查URL参数来确定显示哪个界面
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    const demo = urlParams.get('demo');
    
    if (role === 'admin' || role === 'teacher') {
      setUserRole(role);
    } else if (demo === 'admin') {
      setUserRole('admin');
    }
  }, []);

  const handleLogin = (role: 'student' | 'admin' | 'teacher') => {
    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole('student');
  };

  if (isLoading) {
    return <FullScreenLoader message="正在加载校友通讯网..." />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="size-full">
          {/* 无障碍访问增强 */}
          <SkipToContent />
          <FocusIndicator />
          
          {/* 网络状态指示器 */}
          <NetworkStatus />
          <OfflineIndicator />
          
          {/* 页面内容 */}
          <div id="main-content">
        <Routes>
          {/* 登录页面 */}
          <Route 
            path="/login" 
            element={<LoginPage onLogin={handleLogin} />}
          />

          {/* H5 移动端路由 */}
          <Route 
            path="/h5/*" 
            element={
              <MobileLayout onLogout={handleLogout}>
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<PersonalHome />} />
                    <Route path="/personal-home" element={<PersonalHome />} />
                    <Route path="/enrollment-feeling" element={<EnrollmentFeeling />} />
                    <Route path="/military-training" element={<MilitaryTraining />} />
                    <Route path="/post-detail/:id" element={<PostDetail />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/publish-post" element={<PublishPost />} />
                    <Route path="/activity-discover" element={<ActivityDiscover />} />
                    <Route path="/class-circle" element={<ClassCircle />} />
                    <Route path="/favorite-books" element={<FavoriteBooks />} />
                    <Route path="/college-planning" element={<CollegePlanning />} />
                    <Route path="/practice-activity" element={<PracticeActivity />} />
                    <Route path="/dormitory-station" element={<DormitoryStation />} />
                    <Route path="/years-memory" element={<YearsMemory />} />
                    <Route path="/favorite-cafeteria" element={<FavoriteCafeteria />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/my-resume" element={<MyResume />} />
                    <Route path="/school-calendar" element={<SchoolCalendar />} />
                    <Route path="/alumni-street" element={<AlumniStreet />} />
                    <Route path="/campus-hotspot" element={<CampusHotspot />} />
                    <Route path="/graduation-grades" element={<GraduationGrades />} />
                    <Route path="/message-center" element={<MessageCenter />} />
                    <Route path="/class-info" element={<ClassInfo />} />
                    <Route path="/class-activity" element={<ClassActivity />} />
                    <Route path="/class-honor" element={<ClassHonor />} />
                    <Route path="/life-moments" element={<LifeMoments />} />
                    <Route path="/login-maintenance" element={<LoginMaintenance />} />
                    <Route path="/view-profile/:id" element={<ViewProfile />} />
                    <Route path="/honor-certificate" element={<HonorCertificate />} />
                    <Route path="/course-schedule" element={<CourseSchedule />} />
                    <Route path="/school-intro" element={<SchoolIntro />} />
                    <Route path="/nearby-classmates" element={<NearbyClassmates />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/notification-settings" element={<NotificationSettings />} />
                    <Route path="/help-center" element={<HelpCenter />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/privacy-settings" element={<PrivacySettings />} />
                    <Route path="/language-settings" element={<LanguageSettings />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    
                    {/* 照片类页面重定向到岁月回忆 */}
                    <Route path="/enrollment-photos" element={<Navigate to="/h5/years-memory" replace />} />
                    <Route path="/classroom-corner" element={<Navigate to="/h5/years-memory" replace />} />
                    <Route path="/campus-photo" element={<Navigate to="/h5/years-memory" replace />} />
                    <Route path="/class-photo" element={<Navigate to="/h5/years-memory" replace />} />
                    <Route path="/roommate-photo" element={<Navigate to="/h5/years-memory" replace />} />
                    <Route path="/activity-snapshot" element={<Navigate to="/h5/years-memory" replace />} />
                    {/* H5端的catch-all路由 */}
                    <Route path="*" element={<Navigate to="/h5/personal-home" replace />} />
                    </Routes>
                  </PageTransition>
                </MobileLayout>
            } 
          />

          {/* 管理后台路由 */}
          <Route 
            path="/admin/*" 
            element={
              <AdminLayout onLogout={handleLogout} userRole={userRole}>
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/personal-info" element={<PersonalInfoManagement />} />
                    <Route path="/books" element={<BookManagement />} />
                    <Route path="/enrollment-feeling" element={<EnrollmentFeelingManagement />} />
                    <Route path="/class-circle" element={<ClassCircleManagement />} />
                    <Route path="/college-planning" element={<CollegePlanningManagement />} />
                    <Route path="/alumni" element={<AlumniManagement />} />
                    <Route path="/dormitory" element={<DormitoryManagement />} />
                    <Route path="/years" element={<YearsManagement />} />
                    <Route path="/calendar" element={<CalendarManagement />} />
                    <Route path="/admission-notice" element={<AdmissionNoticeManagement />} />
                    <Route path="/teachers" element={<TeacherManagement />} />
                    <Route path="/news" element={<NewsManagement />} />
                    <Route path="/companies" element={<CompanyManagement />} />
                    <Route path="/activities" element={<ActivityManagement />} />
                    <Route path="/alumni-cards" element={<AlumniCardManagement />} />
                    <Route path="/grades" element={<GradesManagement />} />
                    <Route path="/class-committee" element={<ClassCommitteeManagement />} />
                    <Route path="/leadership" element={<LeadershipManagement />} />
                    <Route path="/class-motto" element={<ClassMottoManagement />} />
                    <Route path="/login-maintenance" element={<LoginMaintenanceManagement />} />
                    <Route path="/resumes" element={<ResumeManagement />} />
                    <Route path="/system" element={<SystemManagement />} />
                    <Route path="/roommate-photos" element={<RoommatePhotoManagement />} />
                    <Route path="/certificates" element={<CertificateManagement />} />
                    <Route path="/authentication" element={<AuthenticationManagement />} />
                    <Route path="/banners" element={<BannerManagement />} />
                    <Route path="/cafeterias" element={<CafeteriaManagement />} />
                    <Route path="/feedback" element={<FeedbackManagement />} />
                    <Route path="/system-settings" element={<SystemSettingsManagement />} />
                    <Route path="/notifications" element={<NotificationManagement />} />
                    <Route path="/statistics" element={<StatisticsManagement />} />
                    <Route path="/permissions" element={<PermissionManagement />} />
                    <Route path="/logs" element={<LogManagement />} />
                    <Route path="/backup" element={<BackupManagement />} />
                    <Route path="/files" element={<FileManagement />} />
                    <Route path="/monitoring" element={<SystemMonitoring />} />
                    <Route path="/config" element={<ConfigManagement />} />
                    <Route path="/themes" element={<ThemeManagement />} />
                    <Route path="/email-templates" element={<EmailTemplateManagement />} />
                    <Route path="/sms-templates" element={<SmsTemplateManagement />} />
                    <Route path="/api" element={<ApiManagement />} />
                    <Route path="/data-import-export" element={<DataImportExport />} />
                    <Route path="/security" element={<SecuritySettings />} />
                    <Route path="/versions" element={<VersionManagement />} />
                    {/* Admin端的catch-all路由 */}
                    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                    </Routes>
                  </PageTransition>
                </AdminLayout>
            } 
          />

          {/* 默认重定向 */}
          <Route 
            path="/" 
            element={
              <Navigate 
                to={userRole === 'admin' || userRole === 'teacher' ? "/admin" : "/h5"} 
                replace 
              />
            } 
          />

          {/* 处理特殊路径 */}
          <Route 
            path="/preview_page.html" 
            element={
              <Navigate 
                to={userRole === 'admin' || userRole === 'teacher' ? "/admin" : "/h5"} 
                replace 
              />
            } 
          />

          {/* 捕获所有未匹配的路由 */}
          <Route 
            path="*" 
            element={<NotFound />}
          />
          </Routes>
          </div>

          {/* 用户体验增强组件 */}
          
          {/* Toast通知 */}
          <Toaster 
            position="top-center"
            expand={true}
            richColors={true}
            closeButton={true}
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
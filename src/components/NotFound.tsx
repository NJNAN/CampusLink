import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 记录404错误，帮助调试
    console.warn('404 - Route not found:', location.pathname);
    
    // 如果是静态文件请求（如.html, .js, .css等），直接重定向到主页
    if (location.pathname.includes('.')) {
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, navigate]);

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl mb-2 text-gray-800">页面未找到</h1>
            <p className="text-gray-600 mb-1">
              抱歉，您访问的页面不存在
            </p>
            <p className="text-sm text-gray-500">
              路径: {location.pathname}
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleGoHome}
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
            <Button 
              variant="outline"
              onClick={handleGoBack}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回上页
            </Button>
          </div>

          {location.pathname.includes('.') && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                检测到静态文件请求，2秒后自动跳转...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
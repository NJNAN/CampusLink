import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminPlaceholderPageProps {
  title: string;
  description?: string;
}

export default function AdminPlaceholderPage({ title, description }: AdminPlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">管理和维护{title}相关信息</p>
        </div>
      </div>

      {/* 内容区域 */}
      <Card className="border shadow-sm">
        <CardContent className="p-12 text-center">
          <Construction className="w-20 h-20 mx-auto mb-6 text-gray-400" />
          <h2 className="text-xl mb-3 text-gray-600">功能开发中</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {description || `${title}管理功能正在开发中，将包含完整的增删改查功能，敬请期待...`}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/admin')}>
              返回仪表盘
            </Button>
            <Button onClick={() => navigate('/admin')}>
              查看其他模块
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg">{title}</h1>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-center">
            <Construction className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-lg mb-2 text-gray-600">页面开发中</h2>
            <p className="text-sm text-gray-500 mb-6">
              {description || `${title}功能正在开发中，敬请期待...`}
            </p>
            <Button onClick={() => navigate(-1)}>
              返回上页
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
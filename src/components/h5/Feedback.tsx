import { useState } from 'react';
import { ArrowLeft, Camera, FileText, Bug, Lightbulb, AlertTriangle, ThumbsUp, Send, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

export default function Feedback() {
  const [feedbackType, setFeedbackType] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackTypes = [
    {
      id: 'bug',
      label: '问题反馈',
      description: '功能异常、错误提示等',
      icon: Bug,
      color: 'bg-red-50 text-red-600 border-red-200',
      badge: 'red'
    },
    {
      id: 'suggestion',
      label: '功能建议',
      description: '新功能建议、改进意见',
      icon: Lightbulb,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      badge: 'yellow'
    },
    {
      id: 'content',
      label: '内容举报',
      description: '不当内容、违规行为',
      icon: AlertTriangle,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      badge: 'orange'
    },
    {
      id: 'praise',
      label: '表扬建议',
      description: '好的体验、优秀功能',
      icon: ThumbsUp,
      color: 'bg-green-50 text-green-600 border-green-200',
      badge: 'green'
    },
    {
      id: 'other',
      label: '其他反馈',
      description: '其他意见和建议',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      badge: 'blue'
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!feedbackType) {
      toast.error('请选择反馈类型');
      return;
    }
    if (!title.trim()) {
      toast.error('请输入反馈标题');
      return;
    }
    if (!content.trim()) {
      toast.error('请输入反馈内容');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 模拟提交反馈
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('反馈提交成功，我们会尽快处理！');
      
      // 重置表单
      setFeedbackType('');
      setTitle('');
      setContent('');
      setContact('');
      setImages([]);
      
    } catch (error) {
      toast.error('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedType = feedbackTypes.find(type => type.id === feedbackType);

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
            <h1 className="text-lg font-medium">意见反馈</h1>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            size="sm"
          >
            {isSubmitting ? '提交中...' : '提交'}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 引导文案 */}
        <Card className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Send className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h2 className="font-medium mb-1">感谢您的反馈</h2>
              <p className="text-sm text-gray-600">
                您的意见对我们非常重要，我们会认真对待每一条反馈，并持续改进产品体验。
              </p>
            </div>
          </div>
        </Card>

        {/* 反馈类型选择 */}
        <Card className="p-4">
          <h2 className="font-medium mb-3">反馈类型</h2>
          <div className="space-y-3">
            {feedbackTypes.map((type) => (
              <div
                key={type.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  feedbackType === type.id
                    ? type.color
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFeedbackType(type.id)}
              >
                <div className="flex items-center space-x-3">
                  <type.icon className="h-5 w-5" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{type.label}</span>
                      {feedbackType === type.id && (
                        <Badge variant="secondary" className="text-xs">
                          已选择
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 反馈内容 */}
        <Card className="p-4 space-y-4">
          <h2 className="font-medium">反馈内容</h2>
          
          {/* 标题 */}
          <div>
            <label className="block text-sm font-medium mb-2">标题</label>
            <Input
              placeholder="简要描述你的问题或建议"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/50</p>
          </div>

          {/* 详细描述 */}
          <div>
            <label className="block text-sm font-medium mb-2">详细描述</label>
            <Textarea
              placeholder="请详细描述你遇到的问题或具体的建议..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={500}
              rows={6}
            />
            <p className="text-xs text-gray-500 mt-1">{content.length}/500</p>
          </div>

          {/* 图片上传 */}
          <div>
            <label className="block text-sm font-medium mb-2">上传图片（可选）</label>
            <div className="grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image}
                    alt={`上传图片 ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              {images.length < 4 && (
                <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                  <Camera className="h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">添加图片</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              最多上传4张图片，支持 jpg、png 格式，单张不超过5MB
            </p>
          </div>
        </Card>

        {/* 联系方式 */}
        <Card className="p-4">
          <h2 className="font-medium mb-3">联系方式（可选）</h2>
          <Input
            placeholder="手机号或邮箱，便于我们及时回复"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-2">
            提供联系方式有助于我们更好地为您解决问题
          </p>
        </Card>

        {/* 提交按钮 */}
        <Card className="p-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !feedbackType || !title.trim() || !content.trim()}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                提交中...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                提交反馈
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            提交即表示您同意我们的服务条款和隐私政策
          </p>
        </Card>

        {/* 历史反馈 */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium">历史反馈</h2>
            <Button variant="ghost" size="sm">
              查看全部
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">登录页面加载慢</span>
                <Badge variant="secondary">已处理</Badge>
              </div>
              <p className="text-xs text-gray-600">2024-01-15 14:30</p>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">建议增加夜间模式</span>
                <Badge variant="outline">处理中</Badge>
              </div>
              <p className="text-xs text-gray-600">2024-01-10 09:15</p>
            </div>
          </div>
        </Card>

        {/* 底部安全区域 */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { 
  Camera, 
  MapPin, 
  X, 
  Image as ImageIcon,
  Send,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CreatePost() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('请输入动态内容');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 模拟发布动态
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('发布成功');
      navigate('/h5/class-circle');
    } catch (error) {
      toast.error('发布失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = () => {
    // 模拟图片上传
    const newImage = `https://picsum.photos/300/300?random=${Date.now()}`;
    setImages([...images, newImage]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 页面头部 */}
      <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg">发布动态</h1>
        <Button 
          size="sm"
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? '发布中...' : '发布'}
        </Button>
      </div>

      <div className="p-4">
        {/* 用户信息 */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="" />
            <AvatarFallback>我</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm">张三</div>
            <div className="text-xs text-gray-500">计算机科学与技术2021级1班</div>
          </div>
        </div>

        {/* 内容输入 */}
        <div className="space-y-4">
          <Textarea
            placeholder="分享你的校园生活..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            maxLength={500}
            className="border-0 resize-none text-base p-0 focus-visible:ring-0"
          />

          {/* 字数统计 */}
          <div className="text-right text-xs text-gray-500">
            {content.length}/500
          </div>

          {/* 图片预览 */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img 
                    src={image} 
                    alt={`预览图片 ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 right-1 w-6 h-6 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* 位置信息 */}
          {location && (
            <Card className="border border-gray-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{location}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setLocation('')}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 底部工具栏 */}
      <div className="sticky bottom-0 bg-white border-t p-4 mt-6 safe-area-bottom">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleImageUpload}
              disabled={images.length >= 9}
            >
              <Camera className="w-5 h-5 text-gray-600" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setLocation('福建师范大学')}
            >
              <MapPin className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            {images.length > 0 && `${images.length}/9 张图片`}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  ArrowLeft,
  Camera, 
  MapPin, 
  X, 
  Image as ImageIcon,
  Smile,
  Hash,
  AtSign,
  Send,
  Globe,
  Users,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';

export default function PublishPost() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [tags, setTags] = useState<string[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUser = {
    name: '张三',
    avatar: '',
    class: '计算机科学与技术2021级1班'
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
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
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddLocation = () => {
    // 模拟获取位置
    const locations = [
      '福建师范大学',
      '图书馆',
      '教学楼A座',
      '食堂',
      '宿舍楼',
      '体育馆'
    ];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    setLocation(randomLocation);
  };

  const handleAddTag = () => {
    const commonTags = ['#校园生活', '#学习', '#社团活动', '#课程', '#友谊', '#成长'];
    const availableTags = commonTags.filter(tag => !tags.includes(tag));
    if (availableTags.length > 0) {
      const randomTag = availableTags[Math.floor(Math.random() * availableTags.length)];
      setTags([...tags, randomTag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const getPrivacyIcon = () => {
    switch (privacy) {
      case 'public': return <Globe className="w-4 h-4" />;
      case 'friends': return <Users className="w-4 h-4" />;
      case 'private': return <Lock className="w-4 h-4" />;
    }
  };

  const getPrivacyText = () => {
    switch (privacy) {
      case 'public': return '公开';
      case 'friends': return '好友可见';
      case 'private': return '仅自己可见';
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && images.length === 0) {
      toast.error('请输入内容或上传图片');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 模拟发布动态
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('发布成功！');
      navigate('/h5/class-circle');
    } catch (error) {
      toast.error('发布失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDraft = () => {
    // 保存草稿到本地存储
    const draft = {
      content,
      images,
      location,
      privacy,
      tags,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('post_draft', JSON.stringify(draft));
    toast.success('草稿已保存');
    navigate(-1);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 页面头部 */}
      <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg">发布动态</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDraft}
          >
            保存草稿
          </Button>
          <Button 
            size="sm"
            onClick={handleSubmit}
            disabled={(!content.trim() && images.length === 0) || isSubmitting}
          >
            {isSubmitting ? '发布中...' : '发布'}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* 用户信息 */}
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm">{currentUser.name}</div>
            <div className="text-xs text-gray-500">{currentUser.class}</div>
          </div>
          
          {/* 隐私设置 */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const privacyOptions: ('public' | 'friends' | 'private')[] = ['public', 'friends', 'private'];
              const currentIndex = privacyOptions.indexOf(privacy);
              const nextIndex = (currentIndex + 1) % privacyOptions.length;
              setPrivacy(privacyOptions[nextIndex]);
            }}
            className="flex items-center gap-1"
          >
            {getPrivacyIcon()}
            <span className="text-xs">{getPrivacyText()}</span>
          </Button>
        </div>

        {/* 内容输入 */}
        <div className="space-y-3">
          <Textarea
            placeholder="分享你的想法..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            maxLength={1000}
            className="border-0 resize-none text-base p-0 focus-visible:ring-0"
          />

          {/* 字数统计 */}
          <div className="text-right text-xs text-gray-500">
            {content.length}/1000
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

          {/* 标签 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-3 h-3 p-0 hover:bg-transparent"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* 快捷模板 */}
        <Card>
          <CardContent className="p-3">
            <div className="text-sm text-gray-600 mb-2">快捷模板</div>
            <div className="flex flex-wrap gap-2">
              {[
                '今天学到了...',
                '分享一个有趣的事情',
                '感谢大家的支持',
                '推荐一本好书',
                '今日心情'
              ].map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setContent(content + template)}
                  className="text-xs"
                >
                  {template}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部工具栏 */}
      <div className="sticky bottom-0 bg-white border-t p-4 mt-6 safe-area-bottom">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
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
                onClick={handleAddLocation}
              >
                <MapPin className="w-5 h-5 text-gray-600" />
              </Button>

              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleAddTag}
              >
                <Hash className="w-5 h-5 text-gray-600" />
              </Button>

              <Button 
                variant="ghost" 
                size="sm"
              >
                <AtSign className="w-5 h-5 text-gray-600" />
              </Button>

              <Button 
                variant="ghost" 
                size="sm"
              >
                <Smile className="w-5 h-5 text-gray-600" />
              </Button>
            </div>

            <div className="text-xs text-gray-500">
              {images.length > 0 && `${images.length}/9`}
            </div>
          </div>
        </div>
      </div>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
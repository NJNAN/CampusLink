import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';
import { 
  ArrowLeft,
  Camera, 
  Save,
  User,
  School,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Edit,
  Upload,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { userService } from '../../utils/api/services';
import { useCurrentUser } from '../../utils/api/hooks';
import type { User } from '../../utils/api/types';

export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 获取当前用户信息
  const { data: currentUser, loading: userLoading, error: userError } = useCurrentUser();
  
  // 表单数据状态
  const [formData, setFormData] = useState<Partial<User>>({});
  const [avatarPreview, setAvatarPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // 初始化表单数据
  useEffect(() => {
    if (currentUser) {
      setFormData({
        realName: currentUser.realName,
        phone: currentUser.phone,
        email: currentUser.email,
        className: currentUser.className,
        major: currentUser.major,
        birthday: currentUser.birthday,
        // 扩展字段
        hometown: (currentUser as any).hometown,
        dormitory: (currentUser as any).dormitory,
        bio: (currentUser as any).bio
      });
      setAvatarPreview(currentUser.avatar || '');
    }
  }, [currentUser]);

  if (userLoading) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">加载用户信息失败</p>
          <Button onClick={() => navigate(-1)}>返回</Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        toast.error('请选择图片文件');
        return;
      }

      // 验证文件大小（5MB）
      if (file.size > 5 * 1024 * 1024) {
        toast.error('图片文件不能大于5MB');
        return;
      }

      try {
        // 创建预览
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setAvatarPreview(result);
        };
        reader.readAsDataURL(file);

        // 上传头像
        setAvatarUploading(true);
        const response = await userService.uploadAvatar(file, (progress) => {
          setUploadProgress(progress);
        });
        
        setFormData(prev => ({
          ...prev,
          avatar: response.data.data.avatarUrl
        }));
        toast.success('头像上传成功');
      } catch (error: any) {
        toast.error(error.message || '头像上传失败');
        setAvatarPreview(currentUser?.avatar || '');
      } finally {
        setAvatarUploading(false);
        setUploadProgress(0);
      }
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview('');
    setFormData(prev => ({
      ...prev,
      avatar: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    // 基本验证
    if (!formData.realName?.trim()) {
      toast.error('请输入姓名');
      return;
    }

    if (!formData.phone?.trim()) {
      toast.error('请输入手机号');
      return;
    }

    if (!formData.email?.trim()) {
      toast.error('请输入邮箱');
      return;
    }

    // 手机号验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('请输入正确的手机号码');
      return;
    }

    // 邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('请输入正确的邮箱地址');
      return;
    }

    try {
      setSubmitting(true);
      const response = await userService.updateCurrentUser(formData);
      toast.success('个人资料更新成功');
      // 更新本地存储
      localStorage.setItem('userProfile', JSON.stringify(response.data.data));
      navigate('/h5/my-profile');
    } catch (error: any) {
      toast.error(error.message || '更新失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  const formSections = [
    {
      title: '基本信息',
      icon: User,
      fields: [
        {
          key: 'realName',
          label: '姓名',
          type: 'text',
          placeholder: '请输入真实姓名',
          required: true
        },
        {
          key: 'studentId',
          label: '学号',
          type: 'text',
          placeholder: '学号不可修改',
          disabled: true
        },
        {
          key: 'phone',
          label: '手机号',
          type: 'tel',
          placeholder: '请输入手机号',
          required: true
        },
        {
          key: 'email',
          label: '邮箱',
          type: 'email',
          placeholder: '请输入邮箱地址',
          required: true
        }
      ]
    },
    {
      title: '学业信息',
      icon: School,
      fields: [
        {
          key: 'major',
          label: '专业',
          type: 'text',
          placeholder: '请输入专业名称'
        },
        {
          key: 'className',
          label: '班级',
          type: 'text',
          placeholder: '请输入班级信息'
        },
        {
          key: 'dormitory',
          label: '宿舍',
          type: 'text',
          placeholder: '请输入宿舍号'
        }
      ]
    },
    {
      title: '个人信息',
      icon: MapPin,
      fields: [
        {
          key: 'hometown',
          label: '家乡',
          type: 'text',
          placeholder: '请输入家乡地址'
        },
        {
          key: 'birthday',
          label: '生日',
          type: 'date',
          placeholder: '请选择生日'
        }
      ]
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-medium">编辑资料</h1>
          </div>
          <Button 
            size="sm"
            onClick={handleSave}
            disabled={submitting || avatarUploading}
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="ml-1">{submitting ? '保存中' : '保存'}</span>
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 头像编辑 */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Camera className="w-4 h-4" />
              头像设置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={avatarPreview} />
                  <AvatarFallback className="text-lg">
                    {currentUser?.realName?.slice(0, 2) || '头像'}
                  </AvatarFallback>
                </Avatar>
                {avatarUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs">
                      {Math.round(uploadProgress)}%
                    </div>
                  </div>
                )}
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0"
                  onClick={handleAvatarClick}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">
                  支持 JPG、PNG 格式，文件不超过 5MB
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleAvatarClick}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    上传头像
                  </Button>
                  {avatarPreview && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleRemoveAvatar}
                    >
                      <X className="w-4 h-4 mr-1" />
                      移除
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* 表单字段 */}
        {formSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <Card key={sectionIndex} className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-2">
                    <Label htmlFor={field.key} className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <Input
                      id={field.key}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(formData as any)[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      disabled={field.disabled}
                      required={field.required}
                      className={field.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}

        {/* 个人简介 */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Edit className="w-4 h-4" />
              个人简介
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-medium">
                简介
              </Label>
              <Textarea
                id="bio"
                placeholder="介绍一下自己吧..."
                value={(formData as any).bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                maxLength={200}
                className="resize-none"
              />
              <div className="text-xs text-gray-500 text-right">
                {((formData as any).bio || '').length}/200
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 保存提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-blue-800 font-medium">温馨提示</p>
              <p className="text-xs text-blue-600 mt-1">
                请确保信息真实有效，学号等关键信息一旦设置不可修改
              </p>
            </div>
          </div>
        </div>

        {/* 底部间距 */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}
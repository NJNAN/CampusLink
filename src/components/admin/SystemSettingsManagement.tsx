import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Settings, Mail, Shield, Database, Bell, Globe, Palette, Upload, Save, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function SystemSettingsManagement() {
  const [settings, setSettings] = useState({
    // 基础设置
    siteName: '福州理工学院校友通讯',
    siteDescription: '连接校友，传承友谊',
    siteKeywords: '福州理工学院,校友,通讯,社交',
    adminEmail: 'admin@fzit.edu.cn',
    contactPhone: '400-123-4567',
    
    // 功能设置
    userRegistration: true,
    emailVerification: true,
    phoneVerification: false,
    autoApproval: false,
    guestAccess: false,
    
    // 邮件设置
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUser: 'noreply@fzit.edu.cn',
    smtpPassword: '********',
    smtpEncryption: 'tls',
    
    // 安全设置
    sessionTimeout: '24',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
    passwordRequireSpecial: true,
    enableTwoFactor: false,
    ipWhitelist: '',
    
    // 文件设置
    maxFileSize: '10',
    allowedImageTypes: 'jpg,jpeg,png,gif,webp',
    allowedDocTypes: 'pdf,doc,docx,txt',
    storageProvider: 'local',
    
    // 通知设置
    enablePushNotifications: true,
    enableEmailNotifications: true,
    enableSmsNotifications: false,
    notificationRetentionDays: '30',
    
    // 界面设置
    defaultTheme: 'light',
    brandColor: '#0066cc',
    logoUrl: '/logo.png',
    favicon: '/favicon.ico',
    customCSS: '',
    
    // 缓存设置
    enableCache: true,
    cacheExpiration: '3600',
    redisCacheEnabled: false,
    redisHost: 'localhost',
    redisPort: '6379',
    
    // 备份设置
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetentionDays: '7',
    backupLocation: '/backups',
    
    // API设置
    apiRateLimit: '1000',
    apiKeyRequired: false,
    corsEnabled: true,
    allowedOrigins: '*'
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // 模拟保存设置
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('系统设置已保存');
    } catch (error) {
      toast.error('保存失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    // 重置为默认设置
    toast.success('已重置为默认设置');
  };

  const handleTestEmail = async () => {
    try {
      // 模拟测试邮件发送
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('测试邮件发送成功');
    } catch (error) {
      toast.error('邮件发送失败，请检查配置');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">系统设置</h1>
          <p className="text-muted-foreground mt-1">配置系统的基础参数和功能选项</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            重置
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                保存中...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                保存设置
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="basic">基础设置</TabsTrigger>
          <TabsTrigger value="features">功能设置</TabsTrigger>
          <TabsTrigger value="email">邮件设置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="files">文件设置</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
          <TabsTrigger value="appearance">外观设置</TabsTrigger>
          <TabsTrigger value="advanced">高级设置</TabsTrigger>
        </TabsList>

        {/* 基础设置 */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>基础设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="siteName">网站名称</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => updateSetting('siteName', e.target.value)}
                    placeholder="输入网站名称"
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail">管理员邮箱</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => updateSetting('adminEmail', e.target.value)}
                    placeholder="输入管理员邮箱"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="siteDescription">网站描述</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => updateSetting('siteDescription', e.target.value)}
                  placeholder="输入网站描述"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="siteKeywords">关键词</Label>
                <Input
                  id="siteKeywords"
                  value={settings.siteKeywords}
                  onChange={(e) => updateSetting('siteKeywords', e.target.value)}
                  placeholder="输入关键词，用逗号分隔"
                />
              </div>
              
              <div>
                <Label htmlFor="contactPhone">联系电话</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => updateSetting('contactPhone', e.target.value)}
                  placeholder="输入联系电话"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 功能设置 */}
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>功能设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="userRegistration">用户注册</Label>
                    <p className="text-sm text-muted-foreground">允许新用户注册账户</p>
                  </div>
                  <Switch
                    id="userRegistration"
                    checked={settings.userRegistration}
                    onCheckedChange={(checked) => updateSetting('userRegistration', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailVerification">邮箱验证</Label>
                    <p className="text-sm text-muted-foreground">注册时需要验证邮箱</p>
                  </div>
                  <Switch
                    id="emailVerification"
                    checked={settings.emailVerification}
                    onCheckedChange={(checked) => updateSetting('emailVerification', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="phoneVerification">手机验证</Label>
                    <p className="text-sm text-muted-foreground">注册时需要验证手机号</p>
                  </div>
                  <Switch
                    id="phoneVerification"
                    checked={settings.phoneVerification}
                    onCheckedChange={(checked) => updateSetting('phoneVerification', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoApproval">自动审核</Label>
                    <p className="text-sm text-muted-foreground">新注册用户自动通过审核</p>
                  </div>
                  <Switch
                    id="autoApproval"
                    checked={settings.autoApproval}
                    onCheckedChange={(checked) => updateSetting('autoApproval', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="guestAccess">游客访问</Label>
                    <p className="text-sm text-muted-foreground">允许未登录用户访问部分内容</p>
                  </div>
                  <Switch
                    id="guestAccess"
                    checked={settings.guestAccess}
                    onCheckedChange={(checked) => updateSetting('guestAccess', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 邮件设置 */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>邮件设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="smtpHost">SMTP服务器</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => updateSetting('smtpHost', e.target.value)}
                    placeholder="smtp.example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">端口</Label>
                  <Input
                    id="smtpPort"
                    value={settings.smtpPort}
                    onChange={(e) => updateSetting('smtpPort', e.target.value)}
                    placeholder="587"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="smtpUser">用户名</Label>
                  <Input
                    id="smtpUser"
                    value={settings.smtpUser}
                    onChange={(e) => updateSetting('smtpUser', e.target.value)}
                    placeholder="noreply@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">密码</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => updateSetting('smtpPassword', e.target.value)}
                    placeholder="输入SMTP密码"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="smtpEncryption">加密方式</Label>
                <Select value={settings.smtpEncryption} onValueChange={(value) => updateSetting('smtpEncryption', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">无</SelectItem>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-4">
                <Button onClick={handleTestEmail}>测试邮件发送</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 安全设置 */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>安全设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="sessionTimeout">会话超时(小时)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="maxLoginAttempts">最大登录尝试次数</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) => updateSetting('maxLoginAttempts', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="passwordMinLength">密码最小长度</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => updateSetting('passwordMinLength', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="passwordRequireSpecial">密码包含特殊字符</Label>
                    <p className="text-sm text-muted-foreground">要求密码包含特殊字符</p>
                  </div>
                  <Switch
                    id="passwordRequireSpecial"
                    checked={settings.passwordRequireSpecial}
                    onCheckedChange={(checked) => updateSetting('passwordRequireSpecial', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableTwoFactor">启用双因子认证</Label>
                    <p className="text-sm text-muted-foreground">为管理员账户启用2FA</p>
                  </div>
                  <Switch
                    id="enableTwoFactor"
                    checked={settings.enableTwoFactor}
                    onCheckedChange={(checked) => updateSetting('enableTwoFactor', checked)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="ipWhitelist">IP白名单</Label>
                <Textarea
                  id="ipWhitelist"
                  value={settings.ipWhitelist}
                  onChange={(e) => updateSetting('ipWhitelist', e.target.value)}
                  placeholder="每行一个IP地址或IP段，例如：192.168.1.0/24"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 文件设置 */}
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>文件设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="maxFileSize">最大文件大小(MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => updateSetting('maxFileSize', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storageProvider">存储方式</Label>
                  <Select value={settings.storageProvider} onValueChange={(value) => updateSetting('storageProvider', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">本地存储</SelectItem>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                      <SelectItem value="oss">阿里云OSS</SelectItem>
                      <SelectItem value="cos">腾讯云COS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="allowedImageTypes">允许的图片格式</Label>
                <Input
                  id="allowedImageTypes"
                  value={settings.allowedImageTypes}
                  onChange={(e) => updateSetting('allowedImageTypes', e.target.value)}
                  placeholder="用逗号分隔，例如：jpg,jpeg,png,gif"
                />
              </div>
              
              <div>
                <Label htmlFor="allowedDocTypes">允许的文档格式</Label>
                <Input
                  id="allowedDocTypes"
                  value={settings.allowedDocTypes}
                  onChange={(e) => updateSetting('allowedDocTypes', e.target.value)}
                  placeholder="用逗号分隔，例如：pdf,doc,docx,txt"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 通知设置 */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>通知设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enablePushNotifications">推送通知</Label>
                    <p className="text-sm text-muted-foreground">启用浏览器推送通知</p>
                  </div>
                  <Switch
                    id="enablePushNotifications"
                    checked={settings.enablePushNotifications}
                    onCheckedChange={(checked) => updateSetting('enablePushNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableEmailNotifications">邮件通知</Label>
                    <p className="text-sm text-muted-foreground">启用邮件通知功能</p>
                  </div>
                  <Switch
                    id="enableEmailNotifications"
                    checked={settings.enableEmailNotifications}
                    onCheckedChange={(checked) => updateSetting('enableEmailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableSmsNotifications">短信通知</Label>
                    <p className="text-sm text-muted-foreground">启用短信通知功能</p>
                  </div>
                  <Switch
                    id="enableSmsNotifications"
                    checked={settings.enableSmsNotifications}
                    onCheckedChange={(checked) => updateSetting('enableSmsNotifications', checked)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="notificationRetentionDays">通知保留天数</Label>
                <Input
                  id="notificationRetentionDays"
                  type="number"
                  value={settings.notificationRetentionDays}
                  onChange={(e) => updateSetting('notificationRetentionDays', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 外观设置 */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>外观设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="defaultTheme">默认主题</Label>
                  <Select value={settings.defaultTheme} onValueChange={(value) => updateSetting('defaultTheme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">浅色主题</SelectItem>
                      <SelectItem value="dark">深色主题</SelectItem>
                      <SelectItem value="auto">跟随系统</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="brandColor">品牌色</Label>
                  <Input
                    id="brandColor"
                    type="color"
                    value={settings.brandColor}
                    onChange={(e) => updateSetting('brandColor', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={settings.logoUrl}
                    onChange={(e) => updateSetting('logoUrl', e.target.value)}
                    placeholder="/logo.png"
                  />
                </div>
                <div>
                  <Label htmlFor="favicon">Favicon URL</Label>
                  <Input
                    id="favicon"
                    value={settings.favicon}
                    onChange={(e) => updateSetting('favicon', e.target.value)}
                    placeholder="/favicon.ico"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="customCSS">自定义CSS</Label>
                <Textarea
                  id="customCSS"
                  value={settings.customCSS}
                  onChange={(e) => updateSetting('customCSS', e.target.value)}
                  placeholder="输入自定义CSS样式..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 高级设置 */}
        <TabsContent value="advanced">
          <div className="space-y-6">
            {/* 缓存设置 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>缓存设置</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableCache">启用缓存</Label>
                    <p className="text-sm text-muted-foreground">启用系统缓存提高性能</p>
                  </div>
                  <Switch
                    id="enableCache"
                    checked={settings.enableCache}
                    onCheckedChange={(checked) => updateSetting('enableCache', checked)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="cacheExpiration">缓存过期时间(秒)</Label>
                    <Input
                      id="cacheExpiration"
                      type="number"
                      value={settings.cacheExpiration}
                      onChange={(e) => updateSetting('cacheExpiration', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="redisCacheEnabled">Redis缓存</Label>
                      <p className="text-sm text-muted-foreground">使用Redis作为缓存服务</p>
                    </div>
                    <Switch
                      id="redisCacheEnabled"
                      checked={settings.redisCacheEnabled}
                      onCheckedChange={(checked) => updateSetting('redisCacheEnabled', checked)}
                    />
                  </div>
                </div>
                
                {settings.redisCacheEnabled && (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="redisHost">Redis主机</Label>
                      <Input
                        id="redisHost"
                        value={settings.redisHost}
                        onChange={(e) => updateSetting('redisHost', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="redisPort">Redis端口</Label>
                      <Input
                        id="redisPort"
                        type="number"
                        value={settings.redisPort}
                        onChange={(e) => updateSetting('redisPort', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* API设置 */}
            <Card>
              <CardHeader>
                <CardTitle>API设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="apiRateLimit">API速率限制(请求/小时)</Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      value={settings.apiRateLimit}
                      onChange={(e) => updateSetting('apiRateLimit', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="corsEnabled">启用CORS</Label>
                      <p className="text-sm text-muted-foreground">允许跨域请求</p>
                    </div>
                    <Switch
                      id="corsEnabled"
                      checked={settings.corsEnabled}
                      onCheckedChange={(checked) => updateSetting('corsEnabled', checked)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="allowedOrigins">允许的来源</Label>
                  <Input
                    id="allowedOrigins"
                    value={settings.allowedOrigins}
                    onChange={(e) => updateSetting('allowedOrigins', e.target.value)}
                    placeholder="*或具体域名，用逗号分隔"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
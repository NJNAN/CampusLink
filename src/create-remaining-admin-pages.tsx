// 快速创建剩余的管理后台页面

const remainingPages = [
  {
    name: 'ConfigManagement',
    title: '配置管理',
    description: '管理系统配置参数',
    content: `
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Settings, Database, Mail, Shield } from 'lucide-react';

export default function ConfigManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">配置管理</h1>
        <p className="text-muted-foreground mt-1">管理系统配置参数</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Settings className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium">系统配置</span></div><p className="text-2xl font-semibold mt-2">45</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Database className="h-4 w-4 text-green-600" /><span className="text-sm font-medium">数据库配置</span></div><p className="text-2xl font-semibold mt-2">12</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Mail className="h-4 w-4 text-purple-600" /><span className="text-sm font-medium">邮件配置</span></div><p className="text-2xl font-semibold mt-2">8</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Shield className="h-4 w-4 text-orange-600" /><span className="text-sm font-medium">安全配置</span></div><p className="text-2xl font-semibold mt-2">6</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>配置项管理</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">配置管理功能正在开发中...</p></CardContent></Card>
    </div>
  );
}`
  },
  {
    name: 'ThemeManagement',
    title: '主题管理',
    description: '管理系统主题和样式',
    content: `
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Palette, Eye, Download, Upload } from 'lucide-react';

export default function ThemeManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">主题管理</h1>
        <p className="text-muted-foreground mt-1">管理系统主题和样式</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Palette className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium">主题数量</span></div><p className="text-2xl font-semibold mt-2">5</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Eye className="h-4 w-4 text-green-600" /><span className="text-sm font-medium">当前主题</span></div><p className="text-sm font-medium mt-2">默认主题</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Download className="h-4 w-4 text-purple-600" /><span className="text-sm font-medium">下载主题</span></div><p className="text-2xl font-semibold mt-2">125</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Upload className="h-4 w-4 text-orange-600" /><span className="text-sm font-medium">自定义主题</span></div><p className="text-2xl font-semibold mt-2">3</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>主题管理</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">主题管理功能正在开发中...</p></CardContent></Card>
    </div>
  );
}`
  },
  {
    name: 'EmailTemplateManagement',
    title: '邮件模板管理',
    description: '管理邮件模板和内容',
    content: `
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Mail, Send, Edit, Trash2 } from 'lucide-react';

export default function EmailTemplateManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">邮件模板管理</h1>
        <p className="text-muted-foreground mt-1">管理邮件模板和内容</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Mail className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium">模板数量</span></div><p className="text-2xl font-semibold mt-2">15</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Send className="h-4 w-4 text-green-600" /><span className="text-sm font-medium">已发送</span></div><p className="text-2xl font-semibold mt-2">1,234</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Edit className="h-4 w-4 text-purple-600" /><span className="text-sm font-medium">草稿</span></div><p className="text-2xl font-semibold mt-2">3</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Trash2 className="h-4 w-4 text-orange-600" /><span className="text-sm font-medium">回收站</span></div><p className="text-2xl font-semibold mt-2">2</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>邮件模板</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">邮件模板管理功能正在开发中...</p></CardContent></Card>
    </div>
  );
}`
  },
  {
    name: 'ApiManagement',
    title: 'API管理',
    description: '管理API接口和密钥',
    content: `
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Code, Key, Activity, Shield } from 'lucide-react';

export default function ApiManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">API管理</h1>
        <p className="text-muted-foreground mt-1">管理API接口和密钥</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Code className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium">API接口</span></div><p className="text-2xl font-semibold mt-2">25</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Key className="h-4 w-4 text-green-600" /><span className="text-sm font-medium">API密钥</span></div><p className="text-2xl font-semibold mt-2">8</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Activity className="h-4 w-4 text-purple-600" /><span className="text-sm font-medium">调用次数</span></div><p className="text-2xl font-semibold mt-2">12.5k</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Shield className="h-4 w-4 text-orange-600" /><span className="text-sm font-medium">安全事件</span></div><p className="text-2xl font-semibold mt-2">0</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>API管理</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">API管理功能正在开发中...</p></CardContent></Card>
    </div>
  );
}`
  },
  {
    name: 'DataImportExport',
    title: '数据导入导出',
    description: '数据的导入导出功能',
    content: `
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Download, Upload, FileText, Database } from 'lucide-react';

export default function DataImportExport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">数据导入导出</h1>
        <p className="text-muted-foreground mt-1">数据的导入导出功能</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Download className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium">导出任务</span></div><p className="text-2xl font-semibold mt-2">45</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Upload className="h-4 w-4 text-green-600" /><span className="text-sm font-medium">导入任务</span></div><p className="text-2xl font-semibold mt-2">23</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><FileText className="h-4 w-4 text-purple-600" /><span className="text-sm font-medium">处理文件</span></div><p className="text-2xl font-semibold mt-2">156</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Database className="h-4 w-4 text-orange-600" /><span className="text-sm font-medium">数据量</span></div><p className="text-2xl font-semibold mt-2">2.3M</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>数据操作</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">数据导入导出功能正在开发中...</p></CardContent></Card>
    </div>
  );
}`
  },
  {
    name: 'SecuritySettings',
    title: '安全设置',
    description: '管理系统安全配置',
    content: `
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ShieldCheck, Lock, AlertTriangle, Eye } from 'lucide-react';

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">安全设置</h1>
        <p className="text-muted-foreground mt-1">管理系统安全配置</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><ShieldCheck className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium">安全策略</span></div><p className="text-2xl font-semibold mt-2">8</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Lock className="h-4 w-4 text-green-600" /><span className="text-sm font-medium">访问控制</span></div><p className="text-2xl font-semibold mt-2">15</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><AlertTriangle className="h-4 w-4 text-red-600" /><span className="text-sm font-medium">安全事件</span></div><p className="text-2xl font-semibold mt-2">3</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Eye className="h-4 w-4 text-purple-600" /><span className="text-sm font-medium">审计日志</span></div><p className="text-2xl font-semibold mt-2">1,234</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>安全管理</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">安全设置功能正在开发中...</p></CardContent></Card>
    </div>
  );
}`
  },
  {
    name: 'VersionManagement',
    title: '版本管理',
    description: '管理系统版本和更新',
    content: `
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { GitBranch, Tag, Download, Upload } from 'lucide-react';

export default function VersionManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">版本管理</h1>
        <p className="text-muted-foreground mt-1">管理系统版本和更新</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><GitBranch className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium">当前版本</span></div><p className="text-lg font-semibold mt-2">v1.2.0</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Tag className="h-4 w-4 text-green-600" /><span className="text-sm font-medium">历史版本</span></div><p className="text-2xl font-semibold mt-2">25</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Download className="h-4 w-4 text-purple-600" /><span className="text-sm font-medium">更新包</span></div><p className="text-2xl font-semibold mt-2">3</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Upload className="h-4 w-4 text-orange-600" /><span className="text-sm font-medium">部署次数</span></div><p className="text-2xl font-semibold mt-2">156</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>版本信息</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">版本管理功能正在开发中...</p></CardContent></Card>
    </div>
  );
}`
  }
];

export default remainingPages;
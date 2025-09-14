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
}
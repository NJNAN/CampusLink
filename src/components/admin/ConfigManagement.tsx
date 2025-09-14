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
}
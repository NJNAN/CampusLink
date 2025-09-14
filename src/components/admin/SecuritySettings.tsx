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
}
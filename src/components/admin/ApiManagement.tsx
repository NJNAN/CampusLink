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
}
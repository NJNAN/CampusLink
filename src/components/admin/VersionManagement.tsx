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
}
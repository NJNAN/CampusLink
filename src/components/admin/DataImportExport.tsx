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
}
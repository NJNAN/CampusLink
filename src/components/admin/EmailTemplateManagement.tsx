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
}
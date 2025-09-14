import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MessageSquare, Send, CreditCard, BarChart3 } from 'lucide-react';

export default function SmsTemplateManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">短信模板管理</h1>
        <p className="text-muted-foreground mt-1">管理短信模板和发送</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><MessageSquare className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium">模板数量</span></div><p className="text-2xl font-semibold mt-2">8</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><Send className="h-4 w-4 text-green-600" /><span className="text-sm font-medium">已发送</span></div><p className="text-2xl font-semibold mt-2">2,345</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><CreditCard className="h-4 w-4 text-purple-600" /><span className="text-sm font-medium">剩余条数</span></div><p className="text-2xl font-semibold mt-2">8,765</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center space-x-2"><BarChart3 className="h-4 w-4 text-orange-600" /><span className="text-sm font-medium">成功率</span></div><p className="text-2xl font-semibold mt-2">98.5%</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>短信模板</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">短信模板管理功能正在开发中...</p></CardContent></Card>
    </div>
  );
}
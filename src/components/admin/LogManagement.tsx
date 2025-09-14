import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FileText, AlertCircle, User, Eye, Download, Search, Filter } from 'lucide-react';

export default function LogManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  const mockLogs = [
    { id: '1', level: 'info', message: '用户登录成功', user: '张同学', ip: '192.168.1.100', time: '2024-01-15 14:30:25', module: '认证系统' },
    { id: '2', level: 'warning', message: '密码尝试次数过多', user: '李同学', ip: '192.168.1.101', time: '2024-01-15 14:25:10', module: '认证系统' },
    { id: '3', level: 'error', message: '数据库连接失败', user: '系统', ip: '127.0.0.1', time: '2024-01-15 14:20:15', module: '数据库' },
    { id: '4', level: 'info', message: '新用户注册', user: '王同学', ip: '192.168.1.102', time: '2024-01-15 14:15:30', module: '用户管理' }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'destructive';
      case 'warning': return 'default';
      case 'info': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">日志管理</h1>
          <p className="text-muted-foreground mt-1">查看和管理系统操作日志</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          导出日志
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">总日志</span>
            </div>
            <p className="text-2xl font-semibold mt-2">12,456</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">错误日志</span>
            </div>
            <p className="text-2xl font-semibold mt-2">23</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">用户操作</span>
            </div>
            <p className="text-2xl font-semibold mt-2">8,934</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">今日访问</span>
            </div>
            <p className="text-2xl font-semibold mt-2">1,234</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>日志列表</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索日志..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有级别</SelectItem>
                  <SelectItem value="error">错误</SelectItem>
                  <SelectItem value="warning">警告</SelectItem>
                  <SelectItem value="info">信息</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant={getLevelColor(log.level) as any}>
                        {log.level.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{log.module}</span>
                      <span className="text-sm text-muted-foreground">{log.time}</span>
                    </div>
                    <p className="font-medium mb-1">{log.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>用户: {log.user}</span>
                      <span>IP: {log.ip}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    详情
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
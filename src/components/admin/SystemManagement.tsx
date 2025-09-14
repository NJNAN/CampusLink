import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Server,
  Database,
  Cpu,
  HardDrive,
  Activity,
  Users,
  Bell,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface SystemStatus {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkStatus: 'online' | 'offline' | 'warning';
  uptime: string;
  activeUsers: number;
  totalRequests: number;
  errorRate: number;
}

interface SystemConfig {
  siteName: string;
  siteDescription: string;
  maxFileSize: number;
  enableRegistration: boolean;
  enableComments: boolean;
  enableNotifications: boolean;
  maintenanceMode: boolean;
  backupEnabled: boolean;
  logLevel: 'error' | 'warning' | 'info' | 'debug';
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info';
  message: string;
  source: string;
}

export default function SystemManagement() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpuUsage: 45,
    memoryUsage: 68,
    diskUsage: 72,
    networkStatus: 'online',
    uptime: '15天 8小时 32分钟',
    activeUsers: 156,
    totalRequests: 45632,
    errorRate: 0.02
  });

  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    siteName: '福建师范大学校友通讯网',
    siteDescription: '连接校友，分享成长',
    maxFileSize: 10,
    enableRegistration: true,
    enableComments: true,
    enableNotifications: true,
    maintenanceMode: false,
    backupEnabled: true,
    logLevel: 'info'
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSystemData();
    const interval = setInterval(loadSystemData, 30000); // 每30秒刷新
    return () => clearInterval(interval);
  }, []);

  const loadSystemData = async () => {
    try {
      if (!refreshing) setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟系统状态数据
      setSystemStatus(prev => ({
        ...prev,
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        diskUsage: Math.max(40, Math.min(98, prev.diskUsage + (Math.random() - 0.5) * 2)),
        activeUsers: Math.max(50, Math.min(300, prev.activeUsers + Math.floor((Math.random() - 0.5) * 20))),
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 100),
        errorRate: Math.max(0, Math.min(0.1, prev.errorRate + (Math.random() - 0.5) * 0.01))
      }));

      // 模拟日志数据
      const mockLogs: LogEntry[] = [
        {
          id: '1',
          timestamp: '2024-01-15 14:32:15',
          level: 'info',
          message: '用户登录成功',
          source: 'auth.service'
        },
        {
          id: '2',
          timestamp: '2024-01-15 14:30:42',
          level: 'warning',
          message: 'CPU使用率超过80%',
          source: 'system.monitor'
        },
        {
          id: '3',
          timestamp: '2024-01-15 14:28:33',
          level: 'error',
          message: '数据库连接失败，已自动重连',
          source: 'database.service'
        },
        {
          id: '4',
          timestamp: '2024-01-15 14:25:18',
          level: 'info',
          message: '系统备份完成',
          source: 'backup.service'
        }
      ];

      setLogs(mockLogs);
    } catch (error) {
      console.error('加载系统数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadSystemData();
  };

  const handleConfigChange = (key: keyof SystemConfig, value: any) => {
    setSystemConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveConfig = () => {
    toast.success('系统配置已保存');
  };

  const handleBackup = () => {
    toast.success('系统备份已启动');
  };

  const handleClearLogs = () => {
    setLogs([]);
    toast.success('日志已清空');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'offline': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'offline': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'info': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return 'text-red-600';
    if (usage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">系统管理</h1>
          <p className="text-gray-600 mt-1">监控系统状态和管理配置</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            刷新
          </Button>
          <Button variant="outline" onClick={handleBackup}>
            <Download className="w-4 h-4 mr-2" />
            备份系统
          </Button>
        </div>
      </div>

      {/* 系统状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CPU使用率</p>
                <p className={`text-2xl ${getUsageColor(systemStatus.cpuUsage)}`}>
                  {systemStatus.cpuUsage}%
                </p>
              </div>
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
            <Progress value={systemStatus.cpuUsage} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">内存使用率</p>
                <p className={`text-2xl ${getUsageColor(systemStatus.memoryUsage)}`}>
                  {systemStatus.memoryUsage}%
                </p>
              </div>
              <Server className="w-8 h-8 text-green-600" />
            </div>
            <Progress value={systemStatus.memoryUsage} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">磁盘使用率</p>
                <p className={`text-2xl ${getUsageColor(systemStatus.diskUsage)}`}>
                  {systemStatus.diskUsage}%
                </p>
              </div>
              <HardDrive className="w-8 h-8 text-purple-600" />
            </div>
            <Progress value={systemStatus.diskUsage} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">在线用户</p>
                <p className="text-2xl text-indigo-600">{systemStatus.activeUsers}</p>
              </div>
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="mt-3 text-sm text-gray-500">
              网络状态: <span className={getStatusColor(systemStatus.networkStatus)}>
                {systemStatus.networkStatus === 'online' ? '正常' : '异常'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 系统详细信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4" />
              运行状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">系统运行时间</span>
                <span className="text-sm">{systemStatus.uptime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">总请求数</span>
                <span className="text-sm">{systemStatus.totalRequests.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">错误率</span>
                <span className="text-sm">{(systemStatus.errorRate * 100).toFixed(2)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">网络状态</span>
                <div className={`flex items-center gap-1 ${getStatusColor(systemStatus.networkStatus)}`}>
                  {getStatusIcon(systemStatus.networkStatus)}
                  <span className="text-sm">
                    {systemStatus.networkStatus === 'online' ? '正常' : '异常'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="w-4 h-4" />
              数据库状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">连接状态</span>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">正常</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">活跃连接</span>
                <span className="text-sm">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">查询/秒</span>
                <span className="text-sm">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">最后备份</span>
                <span className="text-sm">2小时前</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4" />
              安全状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">防火墙</span>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">启用</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SSL证书</span>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">有效</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">安全更新</span>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">最新</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">威胁检测</span>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">正常</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详细管理界面 */}
      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config">系统配置</TabsTrigger>
          <TabsTrigger value="logs">系统日志</TabsTrigger>
          <TabsTrigger value="maintenance">维护工具</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="w-4 h-4" />
                系统配置
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">网站名称</label>
                    <Input
                      value={systemConfig.siteName}
                      onChange={(e) => handleConfigChange('siteName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">最大文件大小 (MB)</label>
                    <Input
                      type="number"
                      value={systemConfig.maxFileSize}
                      onChange={(e) => handleConfigChange('maxFileSize', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700 mb-2 block">网站描述</label>
                  <Input
                    value={systemConfig.siteDescription}
                    onChange={(e) => handleConfigChange('siteDescription', e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm">允许用户注册</label>
                      <p className="text-xs text-gray-500">是否允许新用户注册账号</p>
                    </div>
                    <Switch
                      checked={systemConfig.enableRegistration}
                      onCheckedChange={(checked) => handleConfigChange('enableRegistration', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm">启用评论功能</label>
                      <p className="text-xs text-gray-500">是否允许用户发表评论</p>
                    </div>
                    <Switch
                      checked={systemConfig.enableComments}
                      onCheckedChange={(checked) => handleConfigChange('enableComments', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm">启用通知</label>
                      <p className="text-xs text-gray-500">是否发送系统通知</p>
                    </div>
                    <Switch
                      checked={systemConfig.enableNotifications}
                      onCheckedChange={(checked) => handleConfigChange('enableNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm">维护模式</label>
                      <p className="text-xs text-gray-500">启用后网站将显示维护页面</p>
                    </div>
                    <Switch
                      checked={systemConfig.maintenanceMode}
                      onCheckedChange={(checked) => handleConfigChange('maintenanceMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm">自动备份</label>
                      <p className="text-xs text-gray-500">是否启用自动备份功能</p>
                    </div>
                    <Switch
                      checked={systemConfig.backupEnabled}
                      onCheckedChange={(checked) => handleConfigChange('backupEnabled', checked)}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveConfig}>保存配置</Button>
                  <Button variant="outline">重置</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">系统日志</CardTitle>
                <Button variant="outline" size="sm" onClick={handleClearLogs}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  清空日志
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getLogLevelColor(log.level)}`}>
                          {log.level.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-600">{log.source}</span>
                      </div>
                      <span className="text-xs text-gray-500">{log.timestamp}</span>
                    </div>
                    <p className="text-sm">{log.message}</p>
                  </div>
                ))}

                {logs.length === 0 && (
                  <div className="text-center py-8">
                    <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg text-gray-600 mb-2">暂无日志记录</h3>
                    <p className="text-sm text-gray-500">系统日志将在这里显示</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">数据库维护</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    优化数据库
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    备份数据库
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    清理临时文件
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">系统维护</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重启系统服务
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    清理缓存
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    安全扫描
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base text-yellow-600 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                危险操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  以下操作可能影响系统正常运行，请谨慎操作。
                </AlertDescription>
              </Alert>
              <div className="mt-4 space-y-2">
                <Button variant="destructive" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  重置系统配置
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="w-4 h-4 mr-2" />
                  清空所有数据
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
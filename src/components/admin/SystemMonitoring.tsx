import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Monitor, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export default function SystemMonitoring() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [systemStats, setSystemStats] = useState({
    cpu: 45,
    memory: 68,
    disk: 72,
    network: 23
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSystemStats({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100)
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (value: number) => {
    if (value < 50) return 'text-green-600';
    if (value < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (value: number) => {
    if (value < 50) return 'bg-green-500';
    if (value < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const systemServices = [
    { name: '数据库服务', status: 'running', uptime: '15天 8小时' },
    { name: 'Web服务器', status: 'running', uptime: '15天 8小时' },
    { name: '缓存服务', status: 'running', uptime: '15天 8小时' },
    { name: '消息队列', status: 'running', uptime: '15天 8小时' },
    { name: '文件服务', status: 'error', uptime: '0天 0小时' },
    { name: '邮件服务', status: 'warning', uptime: '2天 5小时' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">系统监控</h1>
          <p className="text-muted-foreground mt-1">监控系统运行状态和性能指标</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          刷新数据
        </Button>
      </div>

      {/* 系统资源监控 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-blue-600" />
                <span className="font-medium">CPU使用率</span>
              </div>
              <span className={`text-lg font-semibold ${getStatusColor(systemStats.cpu)}`}>
                {systemStats.cpu}%
              </span>
            </div>
            <Progress value={systemStats.cpu} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-green-600" />
                <span className="font-medium">内存使用率</span>
              </div>
              <span className={`text-lg font-semibold ${getStatusColor(systemStats.memory)}`}>
                {systemStats.memory}%
              </span>
            </div>
            <Progress value={systemStats.memory} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <HardDrive className="h-5 w-5 text-purple-600" />
                <span className="font-medium">磁盘使用率</span>
              </div>
              <span className={`text-lg font-semibold ${getStatusColor(systemStats.disk)}`}>
                {systemStats.disk}%
              </span>
            </div>
            <Progress value={systemStats.disk} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Wifi className="h-5 w-5 text-orange-600" />
                <span className="font-medium">网络使用率</span>
              </div>
              <span className={`text-lg font-semibold ${getStatusColor(systemStats.network)}`}>
                {systemStats.network}%
              </span>
            </div>
            <Progress value={systemStats.network} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* 系统服务状态 */}
      <Card>
        <CardHeader>
          <CardTitle>系统服务状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemServices.map((service, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{service.name}</h3>
                  <Badge 
                    variant={
                      service.status === 'running' ? 'default' :
                      service.status === 'warning' ? 'destructive' : 'destructive'
                    }
                  >
                    <div className="flex items-center space-x-1">
                      {service.status === 'running' ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      <span>
                        {service.status === 'running' ? '运行中' : 
                         service.status === 'warning' ? '警告' : '错误'}
                      </span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  运行时间: {service.uptime}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 系统信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>系统信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">操作系统:</span>
              <span className="font-medium">Ubuntu 20.04 LTS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">内核版本:</span>
              <span className="font-medium">5.4.0-74-generic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">系统启动时间:</span>
              <span className="font-medium">15天 8小时前</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CPU:</span>
              <span className="font-medium">Intel Xeon E5-2620 v4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">内存:</span>
              <span className="font-medium">16 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">磁盘:</span>
              <span className="font-medium">500 GB SSD</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>性能指标</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">平均负载:</span>
              <span className="font-medium">0.45, 0.52, 0.48</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">进程数量:</span>
              <span className="font-medium">145</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">网络连接:</span>
              <span className="font-medium">23 个活跃连接</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">磁盘I/O:</span>
              <span className="font-medium">读取: 15 MB/s, 写入: 8 MB/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">网络流量:</span>
              <span className="font-medium">入站: 2.3 MB/s, 出站: 1.8 MB/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">缓存命中率:</span>
              <span className="font-medium">94.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 告警信息 */}
      <Card>
        <CardHeader>
          <CardTitle>系统告警</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center p-3 border border-red-200 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
              <div className="flex-1">
                <p className="font-medium text-red-800">文件服务异常</p>
                <p className="text-sm text-red-600">文件上传服务连接失败，请检查服务状态</p>
              </div>
              <span className="text-sm text-red-600">2分钟前</span>
            </div>
            
            <div className="flex items-center p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
              <div className="flex-1">
                <p className="font-medium text-yellow-800">磁盘空间不足</p>
                <p className="text-sm text-yellow-600">系统磁盘使用率已达到72%，建议清理无用文件</p>
              </div>
              <span className="text-sm text-yellow-600">15分钟前</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
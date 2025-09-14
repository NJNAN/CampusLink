import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Download, Upload, RefreshCw, Calendar, Database, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function BackupManagement() {
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const mockBackups = [
    { id: '1', name: 'backup_2024_01_15_14_30.sql', size: '125.6 MB', type: 'auto', status: 'completed', createdAt: '2024-01-15 14:30:00' },
    { id: '2', name: 'backup_2024_01_14_02_00.sql', size: '124.8 MB', type: 'auto', status: 'completed', createdAt: '2024-01-14 02:00:00' },
    { id: '3', name: 'manual_backup_2024_01_13.sql', size: '123.2 MB', type: 'manual', status: 'completed', createdAt: '2024-01-13 16:45:00' },
    { id: '4', name: 'backup_2024_01_12_02_00.sql', size: '122.9 MB', type: 'auto', status: 'failed', createdAt: '2024-01-12 02:00:00' }
  ];

  const handleManualBackup = async () => {
    setIsBackingUp(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success('手动备份完成');
    } catch (error) {
      toast.error('备份失败');
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestore = (backupId: string) => {
    toast.success('恢复操作已启动');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'failed': return 'destructive';
      case 'running': return 'default';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      case 'running': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">备份管理</h1>
          <p className="text-muted-foreground mt-1">管理数据备份和恢复</p>
        </div>
        <Button onClick={handleManualBackup} disabled={isBackingUp}>
          {isBackingUp ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              备份中...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              手动备份
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">总备份</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{mockBackups.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">成功备份</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{mockBackups.filter(b => b.status === 'completed').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">失败备份</span>
            </div>
            <p className="text-2xl font-semibold mt-2">{mockBackups.filter(b => b.status === 'failed').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">最近备份</span>
            </div>
            <p className="text-sm font-semibold mt-2">今天 14:30</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>备份设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>自动备份</Label>
              <p className="text-sm text-muted-foreground">每天凌晨2点自动执行备份</p>
            </div>
            <Switch
              checked={autoBackupEnabled}
              onCheckedChange={setAutoBackupEnabled}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">备份频率:</span>
              <span className="ml-2 font-medium">每天</span>
            </div>
            <div>
              <span className="text-muted-foreground">保留天数:</span>
              <span className="ml-2 font-medium">30天</span>
            </div>
            <div>
              <span className="text-muted-foreground">备份位置:</span>
              <span className="ml-2 font-medium">/data/backups/</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>备份列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockBackups.map((backup) => (
              <div key={backup.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium">{backup.name}</span>
                      <Badge variant={backup.type === 'auto' ? 'secondary' : 'outline'}>
                        {backup.type === 'auto' ? '自动' : '手动'}
                      </Badge>
                      <Badge variant={getStatusColor(backup.status) as any}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(backup.status)}
                          <span>{backup.status === 'completed' ? '完成' : backup.status === 'failed' ? '失败' : '运行中'}</span>
                        </div>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>大小: {backup.size}</span>
                      <span>时间: {backup.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      下载
                    </Button>
                    {backup.status === 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRestore(backup.id)}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        恢复
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, Wifi, CloudOff, RefreshCw, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { enhancedToast } from './UserFeedback';

// 离线状态Hook
export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        enhancedToast.success('网络连接已恢复');
        setWasOffline(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      enhancedToast.warning('网络连接已断开，您可以继续浏览已缓存的内容');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  return { isOnline, wasOffline };
}

// 离线指示器组件
export function OfflineIndicator() {
  const { isOnline } = useOfflineStatus();

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className="fixed top-0 left-0 right-0 bg-orange-500 text-white p-2 z-50 shadow-lg"
    >
      <div className="flex items-center justify-center gap-2 text-sm">
        <WifiOff className="w-4 h-4" />
        <span>离线模式 - 部分功能可能不可用</span>
      </div>
    </motion.div>
  );
}

// 缓存管理
class CacheManager {
  private static readonly CACHE_NAME = 'fuzhou-tech-alumni-v1';
  private static readonly MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB

  static async cacheResource(url: string, data: any): Promise<void> {
    try {
      const cache = await caches.open(this.CACHE_NAME);
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put(url, response);
    } catch (error) {
      console.warn('Failed to cache resource:', error);
    }
  }

  static async getCachedResource(url: string): Promise<any> {
    try {
      const cache = await caches.open(this.CACHE_NAME);
      const response = await cache.match(url);
      if (response) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Failed to get cached resource:', error);
    }
    return null;
  }

  static async clearCache(): Promise<void> {
    try {
      await caches.delete(this.CACHE_NAME);
      enhancedToast.success('缓存已清理');
    } catch (error) {
      enhancedToast.error('清理缓存失败');
    }
  }

  static async getCacheSize(): Promise<number> {
    try {
      const cache = await caches.open(this.CACHE_NAME);
      const requests = await cache.keys();
      let totalSize = 0;
      
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
      
      return totalSize;
    } catch (error) {
      return 0;
    }
  }
}

// 离线数据Hook
export function useOfflineData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const { isOnline } = useOfflineStatus();

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isOnline) {
        // 在线时优先获取最新数据
        const freshData = await fetchFn();
        setData(freshData);
        setIsFromCache(false);
        // 缓存最新数据
        await CacheManager.cacheResource(key, freshData);
      } else {
        // 离线时使用缓存数据
        const cachedData = await CacheManager.getCachedResource(key);
        if (cachedData) {
          setData(cachedData);
          setIsFromCache(true);
        } else {
          throw new Error('无可用的离线数据');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('数据加载失败'));
      
      // 如果在线获取失败，尝试使用缓存
      if (isOnline) {
        const cachedData = await CacheManager.getCachedResource(key);
        if (cachedData) {
          setData(cachedData);
          setIsFromCache(true);
          enhancedToast.warning('使用离线数据，内容可能不是最新的');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isOnline, ...dependencies]);

  const refresh = () => {
    if (isOnline) {
      loadData();
    } else {
      enhancedToast.warning('请连接网络后重试');
    }
  };

  return { data, loading, error, isFromCache, refresh };
}

// 离线页面组件
export function OfflinePage() {
  const [cacheSize, setCacheSize] = useState(0);

  useEffect(() => {
    CacheManager.getCacheSize().then(setCacheSize);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <CloudOff className="w-8 h-8 text-orange-500" />
          </div>
          <CardTitle>您当前处于离线状态</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              网络连接不可用，但您仍可以浏览已缓存的内容
            </p>
            
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded">
              <span className="text-sm">缓存大小</span>
              <Badge variant="secondary">{formatBytes(cacheSize)}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              重新连接
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={CacheManager.clearCache}
            >
              清理缓存
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center mt-4">
            <p>离线模式下您可以：</p>
            <ul className="mt-2 space-y-1">
              <li>• 查看已缓存的页面内容</li>
              <li>• 浏览之前加载的图片和数据</li>
              <li>• 使用基本的应用功能</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 数据同步指示器
export function SyncIndicator({ isFromCache }: { isFromCache: boolean }) {
  if (!isFromCache) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 p-2 bg-orange-50 border border-orange-200 rounded text-sm text-orange-700"
    >
      <CloudOff className="w-4 h-4" />
      <span>显示的是离线数据，可能不是最新内容</span>
    </motion.div>
  );
}

// 预缓存重要资源
export function preloadCriticalResources() {
  const criticalUrls = [
    '/h5/personal-home',
    '/h5/class-circle',
    '/h5/message-center',
    '/h5/my-profile'
  ];

  criticalUrls.forEach(url => {
    // 预加载关键页面
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}

// Service Worker 注册
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('SW registered: ', registration);
      } catch (registrationError) {
        console.log('SW registration failed: ', registrationError);
      }
    });
  }
}
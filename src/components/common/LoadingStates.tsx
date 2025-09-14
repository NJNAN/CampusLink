import { motion } from 'motion/react';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Loader2, Wifi, WifiOff } from 'lucide-react';

// 全屏加载动画
export function FullScreenLoader({ message = '加载中...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-4 p-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-8 h-8 text-primary" />
        </motion.div>
        <p className="text-muted-foreground">{message}</p>
      </motion.div>
    </div>
  );
}

// 页面骨架屏
export function PageSkeleton() {
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen animate-pulse">
      {/* 头部骨架 */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded" />
            <div>
              <Skeleton className="w-24 h-5 mb-1" />
              <Skeleton className="w-32 h-3" />
            </div>
          </div>
          <Skeleton className="w-16 h-8 rounded" />
        </div>
      </div>

      {/* 内容骨架 */}
      <div className="p-4 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="w-20 h-4 mb-1" />
                  <Skeleton className="w-32 h-3" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-32 rounded mb-3" />
              <Skeleton className="w-3/4 h-4 mb-2" />
              <Skeleton className="w-1/2 h-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// 卡片骨架
export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <Skeleton className="w-24 h-4 mb-1" />
                <Skeleton className="w-16 h-3" />
              </div>
            </div>
            <Skeleton className="w-full h-24 rounded mb-3" />
            <div className="flex justify-between items-center">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-20 h-6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 列表骨架
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="w-32 h-4 mb-2" />
            <Skeleton className="w-48 h-3" />
          </div>
          <Skeleton className="w-6 h-6" />
        </div>
      ))}
    </div>
  );
}

// 网格骨架
export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="border-0 shadow-sm">
          <CardContent className="p-3">
            <Skeleton className="w-full aspect-square rounded mb-2" />
            <Skeleton className="w-3/4 h-4 mb-1" />
            <Skeleton className="w-1/2 h-3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 内联加载器
export function InlineLoader({ message, size = 'sm' }: { message?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`${sizeClasses[size]} text-primary`} />
      </motion.div>
      {message && <span className="text-muted-foreground text-sm">{message}</span>}
    </div>
  );
}

// 网络状态指示器
export function NetworkStatus() {
  const isOnline = navigator.onLine;

  if (isOnline) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-destructive text-destructive-foreground p-2 z-50"
    >
      <div className="flex items-center justify-center gap-2 text-sm">
        <WifiOff className="w-4 h-4" />
        网络连接已断开，请检查网络设置
      </div>
    </motion.div>
  );
}

// 拉取刷新指示器
export function PullRefreshIndicator({ isRefreshing }: { isRefreshing: boolean }) {
  if (!isRefreshing) return null;

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      exit={{ y: -50 }}
      className="absolute top-0 left-0 right-0 flex justify-center p-2 bg-primary text-primary-foreground z-40"
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-4 h-4" />
        </motion.div>
        <span className="text-sm">正在刷新...</span>
      </div>
    </motion.div>
  );
}
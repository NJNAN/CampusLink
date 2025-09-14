import { toast } from 'sonner@2.0.3';
import { CheckCircle, XCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { useState } from 'react';

// 增强的Toast功能
export const enhancedToast = {
  // 成功提示
  success: (message: string, options?: { description?: string; duration?: number }) => {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration || 3000,
      icon: <CheckCircle className="w-4 h-4" />,
    });
  },

  // 错误提示
  error: (message: string, options?: { description?: string; duration?: number; action?: { label: string; onClick: () => void } }) => {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      icon: <XCircle className="w-4 h-4" />,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  },

  // 警告提示
  warning: (message: string, options?: { description?: string; duration?: number }) => {
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      icon: <AlertCircle className="w-4 h-4" />,
    });
  },

  // 信息提示
  info: (message: string, options?: { description?: string; duration?: number }) => {
    toast.info(message, {
      description: options?.description,
      duration: options?.duration || 3000,
      icon: <Info className="w-4 h-4" />,
    });
  },

  // 加载提示
  loading: (message: string, options?: { description?: string }) => {
    return toast.loading(message, {
      description: options?.description,
      icon: <Loader2 className="w-4 h-4 animate-spin" />,
    });
  },

  // 更新已存在的toast
  update: (id: string | number, message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const icons = {
      success: <CheckCircle className="w-4 h-4" />,
      error: <XCircle className="w-4 h-4" />,
      warning: <AlertCircle className="w-4 h-4" />,
      info: <Info className="w-4 h-4" />,
    };

    toast.success(message, {
      id,
      icon: icons[type],
    });
  },

  // Promise toast
  promise: <T,>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, {
      loading: {
        description: loading,
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
      },
      success: {
        description: typeof success === 'string' ? success : success,
        icon: <CheckCircle className="w-4 h-4" />,
      },
      error: {
        description: typeof error === 'string' ? error : error,
        icon: <XCircle className="w-4 h-4" />,
      },
    });
  },
};

// 确认对话框Hook
export function useConfirmDialog() {
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    variant: 'default' | 'destructive';
    onConfirm: () => void;
    onCancel?: () => void;
  }>({
    open: false,
    title: '',
    description: '',
    confirmText: '确认',
    cancelText: '取消',
    variant: 'default',
    onConfirm: () => {},
  });

  const confirm = (options: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    onConfirm: () => void;
    onCancel?: () => void;
  }) => {
    setDialogState({
      open: true,
      title: options.title,
      description: options.description,
      confirmText: options.confirmText || '确认',
      cancelText: options.cancelText || '取消',
      variant: options.variant || 'default',
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
    });
  };

  const closeDialog = () => {
    setDialogState(prev => ({ ...prev, open: false }));
  };

  const ConfirmDialog = () => (
    <AlertDialog open={dialogState.open} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogState.title}</AlertDialogTitle>
          <AlertDialogDescription>{dialogState.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={dialogState.onCancel}>{dialogState.cancelText}</AlertDialogCancel>
          <AlertDialogAction 
            onClick={dialogState.onConfirm}
            className={dialogState.variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
          >
            {dialogState.confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return { confirm, ConfirmDialog };
}

// 快捷操作提示
export const quickActions = {
  // 复制到剪贴板
  copyToClipboard: async (text: string, successMessage = '已复制到剪贴板') => {
    try {
      await navigator.clipboard.writeText(text);
      enhancedToast.success(successMessage);
    } catch (error) {
      enhancedToast.error('复制失败，请手动复制');
    }
  },

  // 分享功能
  share: async (data: { title?: string; text?: string; url?: string }) => {
    if (navigator.share) {
      try {
        await navigator.share(data);
        enhancedToast.success('分享成功');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          enhancedToast.error('分享失败');
        }
      }
    } else {
      // 降级到复制链接
      await quickActions.copyToClipboard(data.url || window.location.href, '链接已复制，可以分享给朋友');
    }
  },

  // 下载功能
  download: (url: string, filename?: string) => {
    const link = document.createElement('a');
    link.href = url;
    if (filename) {
      link.download = filename;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    enhancedToast.success('下载已开始');
  },

  // 全屏功能
  toggleFullscreen: async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        enhancedToast.info('已进入全屏模式');
      } else {
        await document.exitFullscreen();
        enhancedToast.info('已退出全屏模式');
      }
    } catch (error) {
      enhancedToast.error('全屏操作失败');
    }
  },
};

// 操作确认快捷方式
export const confirmActions = {
  // 删除确认
  delete: (itemName: string, onConfirm: () => void) => ({
    title: '确认删除',
    description: `您确定要删除"${itemName}"吗？此操作无法撤销。`,
    confirmText: '删除',
    cancelText: '取消',
    variant: 'destructive' as const,
    onConfirm,
  }),

  // 退出确认
  logout: (onConfirm: () => void) => ({
    title: '确认退出',
    description: '您确定要退出登录吗？',
    confirmText: '退出',
    cancelText: '取消',
    variant: 'default' as const,
    onConfirm,
  }),

  // 保存确认
  save: (onConfirm: () => void) => ({
    title: '确认保存',
    description: '您确定要保存当前更改吗？',
    confirmText: '保存',
    cancelText: '取消',
    variant: 'default' as const,
    onConfirm,
  }),

  // 发布确认
  publish: (onConfirm: () => void) => ({
    title: '确认发布',
    description: '您确定要发布这条内容吗？发布后其他用户将可以看到。',
    confirmText: '发布',
    cancelText: '取消',
    variant: 'default' as const,
    onConfirm,
  }),
};

// 网络操作反馈
export const networkFeedback = {
  // 网络请求开始
  start: (message = '正在加载...') => {
    return enhancedToast.loading(message);
  },

  // 网络请求成功
  success: (id: string | number, message = '操作成功') => {
    enhancedToast.update(id, message, 'success');
  },

  // 网络请求失败
  error: (id: string | number, message = '操作失败', retry?: () => void) => {
    toast.dismiss(id);
    enhancedToast.error(message, {
      action: retry ? {
        label: '重试',
        onClick: retry,
      } : undefined,
    });
  },
};
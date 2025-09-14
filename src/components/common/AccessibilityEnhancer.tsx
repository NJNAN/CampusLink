import { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Kbd } from '../ui/kbd';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { 
  Keyboard, 
  Eye, 
  Volume2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Settings,
  X 
} from 'lucide-react';

// 键盘导航增强
export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 全局快捷键
      if (event.altKey) {
        switch (event.key) {
          case 'h': // Alt + H 返回首页
            event.preventDefault();
            window.location.href = '/';
            break;
          case 'm': // Alt + M 打开菜单
            event.preventDefault();
            const menuButton = document.querySelector('[aria-label="菜单"]') as HTMLElement;
            menuButton?.click();
            break;
          case 's': // Alt + S 跳转到搜索
            event.preventDefault();
            const searchInput = document.querySelector('input[type="search"]') as HTMLElement;
            searchInput?.focus();
            break;
        }
      }

      // ESC 键关闭模态框和菜单
      if (event.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"]') as HTMLElement;
        const closeButton = modal?.querySelector('[aria-label="关闭"]') as HTMLElement;
        closeButton?.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}

// 焦点管理Hook
export function useFocusManagement() {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  };

  return { focusedElement, setFocusedElement, trapFocus };
}

// 屏幕阅读器公告组件
export function ScreenReaderAnnouncement({ 
  message, 
  priority = 'polite' 
}: { 
  message: string; 
  priority?: 'polite' | 'assertive' 
}) {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

// 跳转到内容链接
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
    >
      跳转到主要内容
    </a>
  );
}

// 键盘快捷键帮助组件
export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Alt + H', description: '返回首页' },
    { key: 'Alt + M', description: '打开/关闭菜单' },
    { key: 'Alt + S', description: '跳转到搜索' },
    { key: 'Esc', description: '关闭模态框' },
    { key: 'Tab', description: '下一个元素' },
    { key: 'Shift + Tab', description: '上一个元素' },
    { key: 'Enter', description: '激活按钮或链接' },
    { key: 'Space', description: '激活按钮或复选框' },
  ];

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40"
        aria-label="查看键盘快捷键"
      >
        <Keyboard className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">键盘快捷键</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="关闭"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{shortcut.description}</span>
                    <Kbd className="text-xs">{shortcut.key}</Kbd>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

// 可访问性设置面板
export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
  });

  useEffect(() => {
    // 应用可访问性设置
    const html = document.documentElement;
    
    if (settings.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    if (settings.largeText) {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }

    if (settings.reducedMotion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }
  }, [settings]);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40"
        aria-label="可访问性设置"
      >
        <Settings className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">可访问性设置</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="关闭"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm">高对比度模式</span>
                  <input
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={() => toggleSetting('highContrast')}
                    className="sr-only"
                  />
                  <div className={`w-8 h-4 rounded-full ${settings.highContrast ? 'bg-primary' : 'bg-gray-300'} relative`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${settings.highContrast ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm">大字体模式</span>
                  <input
                    type="checkbox"
                    checked={settings.largeText}
                    onChange={() => toggleSetting('largeText')}
                    className="sr-only"
                  />
                  <div className={`w-8 h-4 rounded-full ${settings.largeText ? 'bg-primary' : 'bg-gray-300'} relative`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${settings.largeText ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm">减少动画</span>
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={() => toggleSetting('reducedMotion')}
                    className="sr-only"
                  />
                  <div className={`w-8 h-4 rounded-full ${settings.reducedMotion ? 'bg-primary' : 'bg-gray-300'} relative`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${settings.reducedMotion ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </label>
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSettings({ highContrast: false, largeText: false, reducedMotion: false, screenReader: false })}
                  className="w-full"
                >
                  重置所有设置
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

// ARIA标签增强HOC
export function withAriaLabels<T extends Record<string, any>>(
  Component: React.ComponentType<T>
) {
  return function AriaEnhancedComponent(props: T) {
    return (
      <Component
        {...props}
        role={props.role || 'region'}
        aria-label={props['aria-label'] || props.title}
        aria-describedby={props['aria-describedby']}
      />
    );
  };
}

// 焦点指示器组件
export function FocusIndicator() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .focus-visible:focus {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
        border-radius: 4px;
      }
      
      .high-contrast {
        filter: contrast(150%);
      }
      
      .large-text {
        font-size: 120% !important;
      }
      
      .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
import { lazy, Suspense, ComponentType, useState, useEffect } from 'react';
import { PageSkeleton, InlineLoader } from './LoadingStates';
import ErrorBoundary from './ErrorBoundary';

// 懒加载HOC
export function withLazyLoading<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  LoadingComponent?: ComponentType,
  ErrorComponent?: ComponentType
) {
  const LazyComponent = lazy(importFn);

  return function LazyLoadedComponent(props: any) {
    return (
      <ErrorBoundary fallback={ErrorComponent ? <ErrorComponent /> : undefined}>
        <Suspense fallback={LoadingComponent ? <LoadingComponent /> : <PageSkeleton />}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

// 图片懒加载组件
export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  ...props 
}: {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  [key: string]: any;
}) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        if (placeholder) {
          (e.target as HTMLImageElement).src = placeholder;
        }
      }}
      {...props}
    />
  );
}

// 内容懒加载组件
export function LazyContent({ 
  children, 
  threshold = 0.1,
  rootMargin = '100px',
  fallback = <InlineLoader message="加载中..." />
}: {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold, rootMargin]);

  return (
    <div ref={setRef}>
      {isVisible ? children : fallback}
    </div>
  );
}

// 预加载组件
export class ComponentPreloader {
  private static loadedComponents = new Set<string>();
  private static loadingComponents = new Map<string, Promise<any>>();

  static async preload(
    componentName: string,
    importFn: () => Promise<any>
  ): Promise<void> {
    if (this.loadedComponents.has(componentName)) {
      return;
    }

    if (this.loadingComponents.has(componentName)) {
      return this.loadingComponents.get(componentName);
    }

    const loadPromise = importFn().then((module) => {
      this.loadedComponents.add(componentName);
      this.loadingComponents.delete(componentName);
      return module;
    });

    this.loadingComponents.set(componentName, loadPromise);
    return loadPromise;
  }

  static isLoaded(componentName: string): boolean {
    return this.loadedComponents.has(componentName);
  }
}

// 预加载Hook
export function usePreloadComponent() {
  const preload = (componentName: string, importFn: () => Promise<any>) => {
    ComponentPreloader.preload(componentName, importFn);
  };

  const isLoaded = (componentName: string) => {
    return ComponentPreloader.isLoaded(componentName);
  };

  return { preload, isLoaded };
}
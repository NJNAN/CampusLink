// React Hook for API calls - 用于封装API调用的自定义Hook
import { useState, useEffect, useCallback } from 'react';
import { services } from './services';
import { PageRequest, PageResponse } from './config';

// 通用API状态管理Hook
export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// 通用API Hook
export function useApi<T>(
  apiCall: () => Promise<{ data: { data: T } }>,
  deps: any[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data.data);
    } catch (err: any) {
      setError(err.message || '请求失败');
      console.error('API请求错误:', err);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// 分页数据Hook
export interface UsePaginationState<T> {
  data: T[];
  pagination: {
    current: number;
    total: number;
    pageSize: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  setPage: (page: number) => void;
}

export function usePagination<T>(
  apiCall: (params: PageRequest) => Promise<{ data: { data: PageResponse<T> } }>,
  pageSize: number = 10,
  deps: any[] = []
): UsePaginationState<T> {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    current: 0,
    total: 0,
    pageSize,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (page: number = 0, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall({
        page,
        size: pageSize,
        sort: 'createTime',
        direction: 'DESC'
      });

      const pageData = response.data.data;
      
      if (append) {
        setData(prev => [...prev, ...pageData.content]);
      } else {
        setData(pageData.content);
      }
      
      setPagination({
        current: pageData.number,
        total: pageData.totalElements,
        pageSize: pageData.size,
        totalPages: pageData.totalPages,
      });
    } catch (err: any) {
      setError(err.message || '请求失败');
      console.error('API请求错误:', err);
    } finally {
      setLoading(false);
    }
  }, [apiCall, pageSize, ...deps]);

  useEffect(() => {
    fetchData(0, false);
  }, [fetchData]);

  const loadMore = useCallback(async () => {
    if (pagination.current < pagination.totalPages - 1) {
      await fetchData(pagination.current + 1, true);
    }
  }, [fetchData, pagination.current, pagination.totalPages]);

  const refresh = useCallback(async () => {
    await fetchData(0, false);
  }, [fetchData]);

  const setPage = useCallback(async (page: number) => {
    await fetchData(page, false);
  }, [fetchData]);

  return {
    data,
    pagination,
    loading,
    error,
    loadMore,
    refresh,
    setPage,
  };
}

// 用户相关Hook
export const useCurrentUser = () => {
  return useApi(() => services.user.getCurrentUser());
};

export const useUserById = (id: number) => {
  return useApi(() => services.user.getUserById(id), [id]);
};

// 动态相关Hook
export const usePosts = (params?: { type?: string; category?: string; authorId?: number }) => {
  return usePagination(
    (pageParams) => services.post.getPosts({ ...pageParams, ...params }),
    10,
    [params?.type, params?.category, params?.authorId]
  );
};

export const usePostById = (id: number) => {
  return useApi(() => services.post.getPostById(id), [id]);
};

export const usePostComments = (postId: number) => {
  return usePagination(
    (pageParams) => services.post.getComments(postId, pageParams),
    20,
    [postId]
  );
};

// 活动相关Hook
export const useActivities = (params?: { type?: string; status?: string; keyword?: string }) => {
  return usePagination(
    (pageParams) => services.activity.getActivities({ ...pageParams, ...params }),
    10,
    [params?.type, params?.status, params?.keyword]
  );
};

export const useActivityById = (id: number) => {
  return useApi(() => services.activity.getActivityById(id), [id]);
};

// 班级相关Hook
export const useMyClass = () => {
  return useApi(() => services.class.getMyClass());
};

export const useClassMembers = (classId: number) => {
  return usePagination(
    (pageParams) => services.class.getClassMembers(classId, pageParams),
    20,
    [classId]
  );
};

// 相册相关Hook
export const useAlbums = (params?: { type?: string; visibility?: string }) => {
  return usePagination(
    (pageParams) => services.album.getAlbums({ ...pageParams, ...params }),
    10,
    [params?.type, params?.visibility]
  );
};

export const useAlbumPhotos = (albumId: number) => {
  return usePagination(
    (pageParams) => services.album.getAlbumPhotos(albumId, pageParams),
    20,
    [albumId]
  );
};

// 消息相关Hook
export const useMessages = (params?: { senderId?: number; receiverId?: number }) => {
  return usePagination(
    (pageParams) => services.message.getMessages({ ...pageParams, ...params }),
    20,
    [params?.senderId, params?.receiverId]
  );
};

export const useNotifications = (params?: { type?: string; isRead?: boolean }) => {
  return usePagination(
    (pageParams) => services.message.getNotifications({ ...pageParams, ...params }),
    20,
    [params?.type, params?.isRead]
  );
};

export const useUnreadCounts = () => {
  const [counts, setCounts] = useState({ messages: 0, notifications: 0 });
  const [loading, setLoading] = useState(true);

  const fetchCounts = useCallback(async () => {
    try {
      setLoading(true);
      const [messageCount, notificationCount] = await Promise.all([
        services.message.getUnreadCount(),
        services.message.getUnreadNotificationCount(),
      ]);
      setCounts({
        messages: messageCount.data.data.count,
        notifications: notificationCount.data.data.count,
      });
    } catch (error) {
      console.error('获取未读数量失败:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
    // 可以添加定时刷新
    const interval = setInterval(fetchCounts, 30000); // 30秒刷新一次
    return () => clearInterval(interval);
  }, [fetchCounts]);

  return { counts, loading, refresh: fetchCounts };
};

// 搜索Hook
export const useSearch = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (keyword: string, type?: string) => {
    if (!keyword.trim()) {
      setResults(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await services.search.search({
        keyword,
        type: type as any,
        page: 0,
        size: 20,
      });
      setResults(response.data.data);
    } catch (err: any) {
      setError(err.message || '搜索失败');
      console.error('搜索错误:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
};

// 统计数据Hook
export const useSystemStatistics = () => {
  return useApi(() => services.statistics.getSystemStatistics());
};

export const useUserStatistics = (userId?: number) => {
  return useApi(() => services.statistics.getUserStatistics(userId), [userId]);
};
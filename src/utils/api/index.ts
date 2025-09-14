// API客户端核心文件
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG, ApiResponse, HTTP_STATUS } from './config';

// 创建axios实例
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加认证token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(API_CONFIG.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理通用错误和token刷新
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 如果后端返回的数据结构是 { code, message, data, success }
    if (response.data && typeof response.data === 'object' && 'success' in response.data) {
      if (!response.data.success) {
        return Promise.reject(new Error(response.data.message || '请求失败'));
      }
      return response;
    }
    // 如果后端直接返回数据，包装成标准格式
    return {
      ...response,
      data: {
        code: response.status,
        message: '请求成功',
        data: response.data,
        success: true,
        timestamp: new Date().toISOString()
      }
    };
  },
  async (error) => {
    const originalRequest = error.config;

    // 处理401未授权错误
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // 尝试刷新token
      const refreshToken = localStorage.getItem(API_CONFIG.REFRESH_TOKEN_KEY);
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
            refreshToken
          });
          
          const { token, refreshToken: newRefreshToken } = response.data.data;
          localStorage.setItem(API_CONFIG.TOKEN_KEY, token);
          localStorage.setItem(API_CONFIG.REFRESH_TOKEN_KEY, newRefreshToken);
          
          // 重新发送原请求
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // 刷新失败，清除token并跳转到登录页
          localStorage.removeItem(API_CONFIG.TOKEN_KEY);
          localStorage.removeItem(API_CONFIG.REFRESH_TOKEN_KEY);
          localStorage.removeItem(API_CONFIG.USER_KEY);
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // 没有刷新token，直接跳转到登录页
        localStorage.removeItem(API_CONFIG.TOKEN_KEY);
        localStorage.removeItem(API_CONFIG.USER_KEY);
        window.location.href = '/login';
      }
    }

    // 其他错误处理
    const errorMessage = error.response?.data?.message || error.message || '网络错误';
    console.error('API请求错误:', errorMessage, error);
    
    return Promise.reject(error);
  }
);

// API请求方法封装
export const api = {
  get: <T = any>(url: string, params?: any): Promise<AxiosResponse<ApiResponse<T>>> => {
    return apiClient.get(url, { params });
  },

  post: <T = any>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> => {
    return apiClient.post(url, data);
  },

  put: <T = any>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> => {
    return apiClient.put(url, data);
  },

  patch: <T = any>(url: string, data?: any): Promise<AxiosResponse<ApiResponse<T>>> => {
    return apiClient.patch(url, data);
  },

  delete: <T = any>(url: string, params?: any): Promise<AxiosResponse<ApiResponse<T>>> => {
    return apiClient.delete(url, { params });
  },
};

// 文件上传方法
export const uploadFile = async (
  url: string, 
  file: File, 
  onProgress?: (progress: number) => void
): Promise<AxiosResponse<ApiResponse>> => {
  const formData = new FormData();
  formData.append('file', file);

  return apiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
};

// 批量文件上传方法
export const uploadFiles = async (
  url: string, 
  files: File[], 
  onProgress?: (progress: number) => void
): Promise<AxiosResponse<ApiResponse>> => {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });

  return apiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
};

// 导出分页相关类型
export type { PageRequest, PageResponse } from './config';

// 导出默认实例
export default apiClient;
// API 配置文件

// 获取环境变量的辅助函数 - 浏览器环境兼容
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // 尝试从多个来源获取环境变量
  if (typeof window !== 'undefined') {
    // 浏览器环境 - 从全局对象获取
    const globalEnv = (window as any).__ENV__;
    if (globalEnv && globalEnv[key]) {
      return globalEnv[key];
    }
  }
  
  // 如果有import.meta.env（Vite环境）
  try {
    if (import.meta && import.meta.env) {
      const viteEnv = (import.meta.env as any)[key];
      if (viteEnv) {
        return viteEnv;
      }
    }
  } catch (e) {
    // import.meta 不可用，忽略错误
  }
  
  return defaultValue;
};

export const API_CONFIG = {
  // API基础URL - 从环境变量获取，开发环境默认使用localhost:8080
  BASE_URL: getEnvVar('REACT_APP_API_BASE_URL', 'http://localhost:8080/api'),
  
  // 文件访问URL
  FILE_BASE_URL: getEnvVar('REACT_APP_FILE_BASE_URL', 'http://localhost:8080/files'),
  
  // WebSocket URL (如果需要实时通信)
  WS_URL: getEnvVar('REACT_APP_WS_URL', 'ws://localhost:8080/ws'),
  
  // 请求超时时间（毫秒）
  TIMEOUT: 30000,
  
  // 是否使用模拟数据 - 开发环境可以设置为true来使用mock数据
  USE_MOCK: getEnvVar('REACT_APP_USE_MOCK') === 'true' || true, // 默认使用mock数据
  
  // JWT Token存储key
  TOKEN_KEY: 'alumni_token',
  REFRESH_TOKEN_KEY: 'alumni_refresh_token',
  
  // 用户信息存储key
  USER_KEY: 'alumni_user',
  USER_ROLE_KEY: 'alumni_user_role',
};

// HTTP状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// API响应格式
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
  timestamp: string;
}

// 分页请求参数
export interface PageRequest {
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'ASC' | 'DESC';
}

// 分页响应数据
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 文件上传响应
export interface UploadResponse {
  fileId: number;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
}
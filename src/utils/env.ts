// 环境变量配置

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
  if (typeof import !== 'undefined' && import.meta && import.meta.env) {
    const viteEnv = (import.meta.env as any)[key];
    if (viteEnv) {
      return viteEnv;
    }
  }
  
  return defaultValue;
};

export const ENV = {
  // 环境类型
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  
  // API配置
  API_BASE_URL: getEnvVar('REACT_APP_API_BASE_URL', 'http://localhost:8080/api'),
  USE_MOCK: getEnvVar('REACT_APP_USE_MOCK') === 'true' || true, // 默认使用mock数据
  
  // 功能开关
  ENABLE_ANALYTICS: getEnvVar('REACT_APP_ENABLE_ANALYTICS') === 'true',
  ENABLE_ERROR_REPORTING: getEnvVar('REACT_APP_ENABLE_ERROR_REPORTING') === 'true',
  
  // 调试配置
  DEBUG: getEnvVar('REACT_APP_DEBUG') === 'true' || true, // 默认开启调试
  LOG_LEVEL: getEnvVar('REACT_APP_LOG_LEVEL', 'info'),
  
  // 第三方服务
  SUPABASE_URL: getEnvVar('REACT_APP_SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvVar('REACT_APP_SUPABASE_ANON_KEY'),
  
  // 应用信息
  APP_NAME: '福州理工学院校友通讯系统',
  APP_VERSION: getEnvVar('REACT_APP_VERSION', '1.0.0'),
  
  // 开发工具
  isDevelopment: getEnvVar('NODE_ENV', 'development') === 'development',
  isProduction: getEnvVar('NODE_ENV', 'development') === 'production',
  isTest: getEnvVar('NODE_ENV', 'development') === 'test',
} as const;

// 验证必需的环境变量
export function validateEnv(): boolean {
  const required = [];
  
  // 生产环境必需的环境变量
  if (ENV.isProduction) {
    if (!ENV.API_BASE_URL) required.push('REACT_APP_API_BASE_URL');
  }
  
  if (required.length > 0) {
    console.error('Missing required environment variables:', required);
    return false;
  }
  
  return true;
}

// 日志工具
export const logger = {
  debug: (...args: any[]) => {
    if (ENV.DEBUG || ENV.isDevelopment) {
      console.log('[DEBUG]', ...args);
    }
  },
  info: (...args: any[]) => {
    console.log('[INFO]', ...args);
  },
  warn: (...args: any[]) => {
    console.warn('[WARN]', ...args);
  },
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args);
  }
};

export default ENV;
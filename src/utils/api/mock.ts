// 简化的Mock数据 - 仅在开发环境无后端时临时使用
import { API_CONFIG } from './config';
import { User, LoginResponse, Post } from './types';

// 检查是否应该使用Mock数据
export const shouldUseMock = (): boolean => {
  return API_CONFIG.USE_MOCK;
};

// 模拟延迟
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟用户数据
const mockUser: User = {
  id: 1,
  username: 'student001',
  email: 'student001@fzit.edu.cn',
  phone: '13800138000',
  realName: '张三',
  nickname: '小张',
  avatar: 'https://via.placeholder.com/100x100?text=Avatar',
  gender: 'MALE',
  birthday: '2000-01-01',
  studentId: '202101001',
  className: '计算机2021级1班',
  major: '计算机科学与技术',
  grade: '2021',
  enrollmentYear: 2021,
  graduationYear: 2025,
  status: 'ACTIVE',
  role: 'STUDENT',
  createTime: '2021-09-01T08:00:00Z',
  updateTime: '2024-01-15T10:30:00Z',
};

// 模拟动态数据
const mockPosts: Post[] = [
  {
    id: 1,
    authorId: 1,
    author: mockUser,
    title: '我的大学生活',
    content: '大学四年，收获满满，感谢所有老师和同学们的帮助！',
    images: [
      'https://via.placeholder.com/400x300?text=Image1',
      'https://via.placeholder.com/400x300?text=Image2'
    ],
    type: 'MOMENT',
    category: '生活感悟',
    tags: ['大学生活', '感悟', '成长'],
    likes: 25,
    comments: 8,
    shares: 3,
    views: 156,
    isLiked: false,
    isCollected: false,
    status: 'PUBLISHED',
    location: '福州理工学院',
    createTime: '2024-01-15T09:30:00Z',
    updateTime: '2024-01-15T09:30:00Z',
  }
];

// 简化的Mock API
export const mockApi = {
  // 登录
  login: async (username: string, password: string): Promise<{ data: { data: LoginResponse } }> => {
    await delay();
    
    if (username === 'admin' && password === 'admin') {
      const adminUser = { ...mockUser, role: 'ADMIN' as const, realName: '管理员' };
      return {
        data: {
          data: {
            token: 'mock-admin-token',
            refreshToken: 'mock-admin-refresh-token',
            user: adminUser,
            expiresIn: 86400,
          }
        }
      };
    }
    
    if (username === 'student' && password === 'student') {
      return {
        data: {
          data: {
            token: 'mock-student-token',
            refreshToken: 'mock-student-refresh-token',
            user: mockUser,
            expiresIn: 86400,
          }
        }
      };
    }
    
    throw new Error('用户名或密码错误');
  },

  // 注册
  register: async (data: any): Promise<{ data: { data: User } }> => {
    await delay();
    const newUser = {
      ...mockUser,
      id: Math.floor(Math.random() * 1000) + 100,
      username: data.username,
      email: data.email,
      realName: data.realName,
      studentId: data.studentId,
      className: data.className,
      major: data.major,
    };
    return { data: { data: newUser } };
  },

  // 获取当前用户
  getCurrentUser: async (): Promise<{ data: { data: User } }> => {
    await delay();
    return { data: { data: mockUser } };
  },

  // 更新用户信息
  updateCurrentUser: async (data: Partial<User>): Promise<{ data: { data: User } }> => {
    await delay();
    const updatedUser = { ...mockUser, ...data };
    return { data: { data: updatedUser } };
  },

  // 上传头像
  uploadAvatar: async (file: File): Promise<{ data: { data: { avatarUrl: string } } }> => {
    await delay(1000);
    return {
      data: {
        data: {
          avatarUrl: `https://via.placeholder.com/100x100?text=${file.name}`
        }
      }
    };
  },

  // 获取动态列表
  getPosts: async (): Promise<{ data: { data: { content: Post[]; totalElements: number; totalPages: number; size: number; number: number; first: boolean; last: boolean; empty: boolean } } }> => {
    await delay();
    return {
      data: {
        data: {
          content: mockPosts,
          totalElements: mockPosts.length,
          totalPages: 1,
          size: 10,
          number: 0,
          first: true,
          last: true,
          empty: false,
        }
      }
    };
  },
};

// 获取Mock数据的工具函数
export const getMockUser = () => mockUser;
export const getMockPosts = () => mockPosts;

// 在控制台显示Mock模式提示
if (shouldUseMock()) {
  console.warn('🚨 当前使用Mock数据模式，请确保在生产环境中关闭');
  console.info('💡 测试账号：');
  console.info('   学生账号: student / student');
  console.info('   管理员账号: admin / admin');
}
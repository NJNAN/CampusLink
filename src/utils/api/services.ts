// API服务层 - 简化版本，专门用于Spring Boot集成
import { api, uploadFile, uploadFiles, PageRequest, PageResponse } from './index';
import { API_CONFIG } from './config';
import {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  Post,
  CreatePostRequest,
  Comment,
  Activity,
  ActivityRegistration,
  Class,
  ClassMember,
  Album,
  Photo,
  Message,
  Notification,
  FileInfo,
  UploadResponse,
  UserSettings,
  SystemConfig,
  Statistics,
  UserStatistics,
  SearchRequest,
  SearchResult,
  Permission,
  Role,
  Review,
} from './types';

// ==================== 认证服务 ====================
export const authService = {
  // 登录
  login: (data: LoginRequest) => 
    api.post<LoginResponse>('/auth/login', data),

  // 注册
  register: (data: RegisterRequest) => 
    api.post<User>('/auth/register', data),

  // 登出
  logout: () => 
    api.post<void>('/auth/logout'),

  // 刷新token
  refreshToken: (refreshToken: string) => 
    api.post<LoginResponse>('/auth/refresh', { refreshToken }),

  // 获取验证码
  getCaptcha: () => 
    api.get<{ captchaId: string; captchaImage: string }>('/auth/captcha'),

  // 重置密码
  resetPassword: (email: string) => 
    api.post<void>('/auth/reset-password', { email }),

  // 验证邮箱
  verifyEmail: (token: string) => 
    api.post<void>('/auth/verify-email', { token }),
};

// ==================== 用户服务 ====================
export const userService = {
  // 获取当前用户信息
  getCurrentUser: () => 
    api.get<User>('/users/me'),

  // 更新当前用户信息
  updateCurrentUser: (data: Partial<User>) => 
    api.put<User>('/users/me', data),

  // 上传头像
  uploadAvatar: (file: File, onProgress?: (progress: number) => void) => 
    uploadFile('/users/me/avatar', file, onProgress),

  // 获取用户详情
  getUserById: (id: number) => 
    api.get<User>(`/users/${id}`),

  // 搜索用户
  searchUsers: (keyword: string, params?: PageRequest) => 
    api.get<PageResponse<User>>('/users/search', { keyword, ...params }),

  // 获取用户列表（管理员）
  getUsers: (params?: PageRequest & { role?: string; status?: string; keyword?: string }) => 
    api.get<PageResponse<User>>('/users', params),

  // 创建用户（管理员）
  createUser: (data: Partial<User>) => 
    api.post<User>('/users', data),

  // 更新用户（管理员）
  updateUser: (id: number, data: Partial<User>) => 
    api.put<User>(`/users/${id}`, data),

  // 删除用户（管理员）
  deleteUser: (id: number) => 
    api.delete<void>(`/users/${id}`),

  // 批量删除用户（管理员）
  batchDeleteUsers: (ids: number[]) => 
    api.delete<void>('/users/batch', { params: { ids: ids.join(',') } }),

  // 获取用户统计
  getUserStatistics: (id: number) => 
    api.get<UserStatistics>(`/users/${id}/statistics`),
};

// ==================== 动态/帖子服务 ====================
export const postService = {
  // 获取动态列表
  getPosts: (params?: PageRequest & { type?: string; category?: string; authorId?: number }) => 
    api.get<PageResponse<Post>>('/posts', params),

  // 获取动态详情
  getPostById: (id: number) => 
    api.get<Post>(`/posts/${id}`),

  // 创建动态
  createPost: (data: CreatePostRequest) => 
    api.post<Post>('/posts', data),

  // 更新动态
  updatePost: (id: number, data: Partial<CreatePostRequest>) => 
    api.put<Post>(`/posts/${id}`, data),

  // 删除动态
  deletePost: (id: number) => 
    api.delete<void>(`/posts/${id}`),

  // 点赞动态
  likePost: (id: number) => 
    api.post<void>(`/posts/${id}/like`),

  // 取消点赞
  unlikePost: (id: number) => 
    api.delete<void>(`/posts/${id}/like`),

  // 收藏动态
  collectPost: (id: number) => 
    api.post<void>(`/posts/${id}/collect`),

  // 取消收藏
  uncollectPost: (id: number) => 
    api.delete<void>(`/posts/${id}/collect`),

  // 分享动态
  sharePost: (id: number) => 
    api.post<void>(`/posts/${id}/share`),

  // 获取动态评论
  getComments: (postId: number, params?: PageRequest) => 
    api.get<PageResponse<Comment>>(`/posts/${postId}/comments`, params),

  // 添加评论
  addComment: (postId: number, content: string, parentId?: number, replyToId?: number) => 
    api.post<Comment>(`/posts/${postId}/comments`, { content, parentId, replyToId }),

  // 删除评论
  deleteComment: (postId: number, commentId: number) => 
    api.delete<void>(`/posts/${postId}/comments/${commentId}`),

  // 点赞评论
  likeComment: (postId: number, commentId: number) => 
    api.post<void>(`/posts/${postId}/comments/${commentId}/like`),

  // 取消点赞评论
  unlikeComment: (postId: number, commentId: number) => 
    api.delete<void>(`/posts/${postId}/comments/${commentId}/like`),

  // 获取我的动态
  getMyPosts: (params?: PageRequest) => 
    api.get<PageResponse<Post>>('/posts/me', params),

  // 获取我收藏的动态
  getMyCollectedPosts: (params?: PageRequest) => 
    api.get<PageResponse<Post>>('/posts/me/collected', params),
};

// ==================== 活动服务 ====================
export const activityService = {
  // 获取活动列表
  getActivities: (params?: PageRequest & { type?: string; status?: string; keyword?: string }) => 
    api.get<PageResponse<Activity>>('/activities', params),

  // 获取活动详情
  getActivityById: (id: number) => 
    api.get<Activity>(`/activities/${id}`),

  // 创建活动
  createActivity: (data: Partial<Activity>) => 
    api.post<Activity>('/activities', data),

  // 更新活动
  updateActivity: (id: number, data: Partial<Activity>) => 
    api.put<Activity>(`/activities/${id}`, data),

  // 删除活动
  deleteActivity: (id: number) => 
    api.delete<void>(`/activities/${id}`),

  // 报名活动
  registerActivity: (id: number, note?: string) => 
    api.post<ActivityRegistration>(`/activities/${id}/register`, { note }),

  // 取消报名
  unregisterActivity: (id: number) => 
    api.delete<void>(`/activities/${id}/register`),

  // 获取活动报名列表
  getActivityRegistrations: (id: number, params?: PageRequest) => 
    api.get<PageResponse<ActivityRegistration>>(`/activities/${id}/registrations`, params),

  // 获取我的活动报名
  getMyRegistrations: (params?: PageRequest) => 
    api.get<PageResponse<ActivityRegistration>>('/activities/me/registrations', params),

  // 获取我创建的活动
  getMyActivities: (params?: PageRequest) => 
    api.get<PageResponse<Activity>>('/activities/me', params),
};

// ==================== 班级服务 ====================
export const classService = {
  // 获取班级列表
  getClasses: (params?: PageRequest & { grade?: string; major?: string; keyword?: string }) => 
    api.get<PageResponse<Class>>('/classes', params),

  // 获取班级详情
  getClassById: (id: number) => 
    api.get<Class>(`/classes/${id}`),

  // 创建班级
  createClass: (data: Partial<Class>) => 
    api.post<Class>('/classes', data),

  // 更新班级
  updateClass: (id: number, data: Partial<Class>) => 
    api.put<Class>(`/classes/${id}`, data),

  // 删除班级
  deleteClass: (id: number) => 
    api.delete<void>(`/classes/${id}`),

  // 获取班级成员
  getClassMembers: (id: number, params?: PageRequest) => 
    api.get<PageResponse<ClassMember>>(`/classes/${id}/members`, params),

  // 添加班级成员
  addClassMember: (id: number, userId: number, role: string, position?: string) => 
    api.post<ClassMember>(`/classes/${id}/members`, { userId, role, position }),

  // 移除班级成员
  removeClassMember: (id: number, memberId: number) => 
    api.delete<void>(`/classes/${id}/members/${memberId}`),

  // 更新成员角色
  updateMemberRole: (id: number, memberId: number, role: string, position?: string) => 
    api.put<ClassMember>(`/classes/${id}/members/${memberId}`, { role, position }),

  // 获取我的班级
  getMyClass: () => 
    api.get<Class>('/classes/me'),
};

// ==================== 相册/照片服务 ====================
export const albumService = {
  // 获取相册列表
  getAlbums: (params?: PageRequest & { type?: string; visibility?: string }) => 
    api.get<PageResponse<Album>>('/albums', params),

  // 获取相册详情
  getAlbumById: (id: number) => 
    api.get<Album>(`/albums/${id}`),

  // 创建相册
  createAlbum: (data: Partial<Album>) => 
    api.post<Album>('/albums', data),

  // 更新相册
  updateAlbum: (id: number, data: Partial<Album>) => 
    api.put<Album>(`/albums/${id}`, data),

  // 删除相册
  deleteAlbum: (id: number) => 
    api.delete<void>(`/albums/${id}`),

  // 获取相册照片
  getAlbumPhotos: (id: number, params?: PageRequest) => 
    api.get<PageResponse<Photo>>(`/albums/${id}/photos`, params),

  // 获取照片列表
  getPhotos: (params?: PageRequest & { albumId?: number; tags?: string }) => 
    api.get<PageResponse<Photo>>('/photos', params),

  // 获取照片详情
  getPhotoById: (id: number) => 
    api.get<Photo>(`/photos/${id}`),

  // 上传照片
  uploadPhoto: (
    file: File, 
    albumId?: number, 
    title?: string, 
    description?: string,
    onProgress?: (progress: number) => void
  ) => {
    return uploadFile('/photos', file, onProgress);
  },

  // 批量上传照片
  uploadPhotos: (
    files: File[],
    albumId?: number,
    onProgress?: (progress: number) => void
  ) => 
    uploadFiles(`/photos/batch${albumId ? `?albumId=${albumId}` : ''}`, files, onProgress),

  // 更新照片信息
  updatePhoto: (id: number, data: Partial<Photo>) => 
    api.put<Photo>(`/photos/${id}`, data),

  // 删除照片
  deletePhoto: (id: number) => 
    api.delete<void>(`/photos/${id}`),

  // 点赞照片
  likePhoto: (id: number) => 
    api.post<void>(`/photos/${id}/like`),

  // 取消点赞照片
  unlikePhoto: (id: number) => 
    api.delete<void>(`/photos/${id}/like`),
};

// ==================== 消息服务 ====================
export const messageService = {
  // 获取消息列表
  getMessages: (params?: PageRequest & { senderId?: number; receiverId?: number }) => 
    api.get<PageResponse<Message>>('/messages', params),

  // 发送消息
  sendMessage: (receiverId: number, content: string, type: string = 'TEXT') => 
    api.post<Message>('/messages', { receiverId, content, type }),

  // 标记消息已读
  markAsRead: (id: number) => 
    api.put<void>(`/messages/${id}/read`),

  // 批量标记已读
  batchMarkAsRead: (ids: number[]) => 
    api.put<void>('/messages/batch/read', { ids }),

  // 删除消息
  deleteMessage: (id: number) => 
    api.delete<void>(`/messages/${id}`),

  // 获取未读消息数
  getUnreadCount: () => 
    api.get<{ count: number }>('/messages/unread/count'),

  // 获取通知列表
  getNotifications: (params?: PageRequest & { type?: string; isRead?: boolean }) => 
    api.get<PageResponse<Notification>>('/notifications', params),

  // 标记通知已读
  markNotificationAsRead: (id: number) => 
    api.put<void>(`/notifications/${id}/read`),

  // 批量标记通知已读
  batchMarkNotificationsAsRead: (ids: number[]) => 
    api.put<void>('/notifications/batch/read', { ids }),

  // 删除通知
  deleteNotification: (id: number) => 
    api.delete<void>(`/notifications/${id}`),

  // 获取未读通知数
  getUnreadNotificationCount: () => 
    api.get<{ count: number }>('/notifications/unread/count'),
};

// ==================== 文件服务 ====================
export const fileService = {
  // 上传文件
  uploadFile: (file: File, onProgress?: (progress: number) => void) => 
    uploadFile('/files/upload', file, onProgress),

  // 批量上传文件
  uploadFiles: (files: File[], onProgress?: (progress: number) => void) => 
    uploadFiles('/files/batch-upload', files, onProgress),

  // 获取文件信息
  getFileById: (id: number) => 
    api.get<FileInfo>(`/files/${id}`),

  // 删除文件
  deleteFile: (id: number) => 
    api.delete<void>(`/files/${id}`),

  // 获取文件列表
  getFiles: (params?: PageRequest & { fileType?: string; uploaderId?: number }) => 
    api.get<PageResponse<FileInfo>>('/files', params),
};

// ==================== 设置服务 ====================
export const settingsService = {
  // 获取用户设置
  getUserSettings: () => 
    api.get<UserSettings>('/settings/user'),

  // 更新用户设置
  updateUserSettings: (data: Partial<UserSettings>) => 
    api.put<UserSettings>('/settings/user', data),

  // 获取系统配置
  getSystemConfigs: (params?: { key?: string }) => 
    api.get<SystemConfig[]>('/settings/system', params),

  // 更新系统配置
  updateSystemConfig: (key: string, value: string) => 
    api.put<SystemConfig>(`/settings/system/${key}`, { value }),

  // 批量更新系统配置
  batchUpdateSystemConfigs: (configs: { key: string; value: string }[]) => 
    api.put<SystemConfig[]>('/settings/system/batch', { configs }),
};

// ==================== 统计服务 ====================
export const statisticsService = {
  // 获取系统统计
  getSystemStatistics: () => 
    api.get<Statistics>('/statistics/system'),

  // 获取用户统计
  getUserStatistics: (id?: number) => 
    api.get<UserStatistics>(`/statistics/user${id ? `/${id}` : '/me'}`),

  // 获取数据趋势
  getDataTrends: (type: string, period: string) => 
    api.get<any>('/statistics/trends', { type, period }),
};

// ==================== 搜索服务 ====================
export const searchService = {
  // 全局搜索
  search: (params: SearchRequest) => 
    api.get<SearchResult>('/search', params),

  // 搜索建议
  getSuggestions: (keyword: string, type?: string) => 
    api.get<string[]>('/search/suggestions', { keyword, type }),

  // 热门搜索
  getHotKeywords: () => 
    api.get<string[]>('/search/hot-keywords'),
};

// ==================== 权限服务 ====================
export const permissionService = {
  // 获取权限列表
  getPermissions: () => 
    api.get<Permission[]>('/permissions'),

  // 获取角色列表
  getRoles: (params?: PageRequest) => 
    api.get<PageResponse<Role>>('/roles', params),

  // 创建角色
  createRole: (data: Partial<Role>) => 
    api.post<Role>('/roles', data),

  // 更新角色
  updateRole: (id: number, data: Partial<Role>) => 
    api.put<Role>(`/roles/${id}`, data),

  // 删除角色
  deleteRole: (id: number) => 
    api.delete<void>(`/roles/${id}`),

  // 分配权限
  assignPermissions: (roleId: number, permissionIds: number[]) => 
    api.put<void>(`/roles/${roleId}/permissions`, { permissionIds }),

  // 分配角色给用户
  assignRole: (userId: number, roleId: number) => 
    api.put<void>(`/users/${userId}/role`, { roleId }),
};

// ==================== 审核服务 ====================
export const reviewService = {
  // 获取待审核列表
  getPendingReviews: (params?: PageRequest & { type?: string }) => 
    api.get<PageResponse<Review>>('/reviews/pending', params),

  // 审核通过
  approveReview: (id: number, reason?: string) => 
    api.put<Review>(`/reviews/${id}/approve`, { reason }),

  // 审核拒绝
  rejectReview: (id: number, reason: string) => 
    api.put<Review>(`/reviews/${id}/reject`, { reason }),

  // 批量审核
  batchReview: (ids: number[], action: 'approve' | 'reject', reason?: string) => 
    api.put<void>('/reviews/batch', { ids, action, reason }),
};

// 导出所有服务
export const services = {
  auth: authService,
  user: userService,
  post: postService,
  activity: activityService,
  class: classService,
  album: albumService,
  message: messageService,
  file: fileService,
  settings: settingsService,
  statistics: statisticsService,
  search: searchService,
  permission: permissionService,
  review: reviewService,
};

export default services;
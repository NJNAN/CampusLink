// ==================== 用户相关类型 ====================

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  realName: string;
  nickname?: string;
  avatar?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  birthday?: string;
  studentId?: string;
  className?: string;
  major?: string;
  grade?: string;
  enrollmentYear?: number;
  graduationYear?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  role: 'STUDENT' | 'ADMIN' | 'TEACHER';
  createTime?: string;
  updateTime?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  captcha?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  phone: string;
  realName: string;
  studentId: string;
  className: string;
  major: string;
  captcha: string;
}

// ==================== 动态/帖子相关类型 ====================

export interface Post {
  id: number;
  authorId: number;
  author: User;
  title?: string;
  content: string;
  images?: string[];
  type: 'MOMENT' | 'ARTICLE' | 'ACTIVITY' | 'NOTICE';
  category?: string;
  tags?: string[];
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isCollected: boolean;
  status: 'PUBLISHED' | 'DRAFT' | 'DELETED';
  location?: string;
  createTime: string;
  updateTime: string;
}

export interface CreatePostRequest {
  title?: string;
  content: string;
  images?: string[];
  type: 'MOMENT' | 'ARTICLE' | 'ACTIVITY' | 'NOTICE';
  category?: string;
  tags?: string[];
  location?: string;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  author: User;
  content: string;
  parentId?: number;
  replyToId?: number;
  replyTo?: User;
  likes: number;
  isLiked: boolean;
  createTime: string;
}

// ==================== 活动相关类型 ====================

export interface Activity {
  id: number;
  title: string;
  description: string;
  content?: string;
  cover?: string;
  images?: string[];
  type: 'ACADEMIC' | 'ENTERTAINMENT' | 'SPORTS' | 'VOLUNTEER' | 'OTHER';
  status: 'DRAFT' | 'PUBLISHED' | 'ONGOING' | 'ENDED' | 'CANCELLED';
  location: string;
  startTime: string;
  endTime: string;
  maxParticipants?: number;
  currentParticipants: number;
  registrationDeadline?: string;
  organizerId: number;
  organizer: User;
  tags?: string[];
  requirements?: string;
  createTime: string;
  updateTime: string;
  isRegistered?: boolean;
}

export interface ActivityRegistration {
  id: number;
  activityId: number;
  userId: number;
  user: User;
  status: 'REGISTERED' | 'CONFIRMED' | 'CANCELLED';
  registrationTime: string;
  note?: string;
}

// ==================== 班级相关类型 ====================

export interface Class {
  id: number;
  name: string;
  major: string;
  grade: string;
  enrollmentYear: number;
  graduationYear?: number;
  description?: string;
  cover?: string;
  motto?: string;
  studentCount: number;
  teacherId?: number;
  teacher?: User;
  status: 'ACTIVE' | 'GRADUATED' | 'INACTIVE';
  createTime: string;
}

export interface ClassMember {
  id: number;
  classId: number;
  userId: number;
  user: User;
  role: 'STUDENT' | 'MONITOR' | 'VICE_MONITOR' | 'COMMITTEE_MEMBER';
  position?: string;
  joinTime: string;
}

// ==================== 相册/照片相关类型 ====================

export interface Album {
  id: number;
  name: string;
  description?: string;
  cover?: string;
  type: 'ENROLLMENT' | 'MILITARY' | 'CLASSROOM' | 'CAMPUS' | 'CLASS' | 'DORMITORY' | 'ACTIVITY' | 'GRADUATION';
  visibility: 'PUBLIC' | 'CLASS_ONLY' | 'PRIVATE';
  creatorId: number;
  creator: User;
  photoCount: number;
  createTime: string;
  updateTime: string;
}

export interface Photo {
  id: number;
  albumId?: number;
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  location?: string;
  shootTime?: string;
  uploaderId: number;
  uploader: User;
  tags?: string[];
  likes: number;
  isLiked: boolean;
  createTime: string;
}

// ==================== 消息相关类型 ====================

export interface Message {
  id: number;
  senderId: number;
  sender: User;
  receiverId: number;
  receiver: User;
  type: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM';
  content: string;
  fileUrl?: string;
  fileName?: string;
  isRead: boolean;
  createTime: string;
}

export interface Notification {
  id: number;
  userId: number;
  type: 'LIKE' | 'COMMENT' | 'FOLLOW' | 'ACTIVITY' | 'SYSTEM' | 'ANNOUNCEMENT';
  title: string;
  content: string;
  relatedId?: number;
  relatedType?: string;
  isRead: boolean;
  createTime: string;
}

// ==================== 文件相关类型 ====================

export interface FileInfo {
  id: number;
  originalName: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  uploaderId: number;
  uploader: User;
  createTime: string;
}

export interface UploadResponse {
  fileId: number;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
}

// ==================== 设置相关类型 ====================

export interface UserSettings {
  id: number;
  userId: number;
  notificationEnabled: boolean;
  emailNotification: boolean;
  smsNotification: boolean;
  privacyLevel: 'PUBLIC' | 'FRIENDS' | 'PRIVATE';
  showBirthday: boolean;
  showPhone: boolean;
  showEmail: boolean;
  language: string;
  theme: 'LIGHT' | 'DARK' | 'AUTO';
  updateTime: string;
}

export interface SystemConfig {
  key: string;
  value: string;
  description: string;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  updateTime: string;
}

// ==================== 统计相关类型 ====================

export interface Statistics {
  totalUsers: number;
  totalPosts: number;
  totalActivities: number;
  totalPhotos: number;
  activeUsers: number;
  newUsersToday: number;
  newPostsToday: number;
  popularPosts: Post[];
  recentActivities: Activity[];
}

export interface UserStatistics {
  userId: number;
  postsCount: number;
  likesReceived: number;
  commentsReceived: number;
  activitiesJoined: number;
  photosUploaded: number;
  loginDays: number;
  lastLoginTime: string;
}

// ==================== 搜索相关类型 ====================

export interface SearchRequest {
  keyword: string;
  type?: 'ALL' | 'USER' | 'POST' | 'ACTIVITY' | 'PHOTO';
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  location?: string;
  page?: number;
  size?: number;
}

export interface SearchResult {
  users: User[];
  posts: Post[];
  activities: Activity[];
  photos: Photo[];
  total: number;
}

// ==================== 权限相关类型 ====================

export interface Permission {
  id: number;
  name: string;
  code: string;
  type: 'MENU' | 'BUTTON' | 'API';
  description: string;
  parentId?: number;
  path?: string;
  createTime: string;
}

export interface Role {
  id: number;
  name: string;
  code: string;
  description: string;
  permissions: Permission[];
  createTime: string;
}

// ==================== 审核相关类型 ====================

export interface Review {
  id: number;
  type: 'POST' | 'COMMENT' | 'PHOTO' | 'USER' | 'ACTIVITY';
  targetId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason?: string;
  reviewerId?: number;
  reviewer?: User;
  submitTime: string;
  reviewTime?: string;
}

// ==================== 错误相关类型 ====================

export interface ApiError {
  code: number;
  message: string;
  details?: string;
  timestamp: string;
  path: string;
}

// ==================== 导出所有类型 ====================
export * from './index';
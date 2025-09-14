# 福州理工学院校友通讯网 - API接口文档

## 📋 目录
- [1. 接口概述](#1-接口概述)
- [2. 认证授权](#2-认证授权)
- [3. 通用响应格式](#3-通用响应格式)
- [4. 错误码定义](#4-错误码定义)
- [5. 接口详情](#5-接口详情)
  - [5.1 认证相关接口](#51-认证相关接口)
  - [5.2 用户管理接口](#52-用户管理接口)
  - [5.3 动态/帖子接口](#53-动态帖子接口)
  - [5.4 活动管理接口](#54-活动管理接口)
  - [5.5 班级管理接口](#55-班级管理接口)
  - [5.6 相册/照片接口](#56-相册照片接口)
  - [5.7 消息通知接口](#57-消息通知接口)
  - [5.8 文件上传接口](#58-文件上传接口)
  - [5.9 设置配置接口](#59-设置配置接口)
  - [5.10 统计分析接口](#510-统计分析接口)
  - [5.11 搜索功能接口](#511-搜索功能接口)
  - [5.12 权限管理接口](#512-权限管理接口)
  - [5.13 审核管理接口](#513-审核管理接口)

---

## 1. 接口概述

### 基础信息
- **接口基础路径**: `http://your-domain.com/api`
- **接口版本**: `v1`
- **数据格式**: `JSON`
- **字符编码**: `UTF-8`
- **请求方法**: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`

### 环境配置
```properties
# 开发环境
server.port=8080
spring.profiles.active=dev
api.base-url=http://localhost:8080/api

# 生产环境
server.port=80
spring.profiles.active=prod
api.base-url=https://alumni.fzit.edu.cn/api
```

---

## 2. 认证授权

### JWT Token认证
- **Header名称**: `Authorization`
- **Token格式**: `Bearer {access_token}`
- **Token有效期**: 24小时
- **刷新Token有效期**: 30天

### 权限等级
- **STUDENT**: 学生用户，可访问H5移动端功能
- **TEACHER**: 教师用户，可访问部分管理功能
- **ADMIN**: 管理员用户，可访问所有管理功能

### 请求示例
```http
GET /api/users/me HTTP/1.1
Host: localhost:8080
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

---

## 3. 通用响应格式

### 成功响应
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    // 具体数据内容
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "success": true
}
```

### 分页响应
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "content": [
      // 数据列表
    ],
    "totalElements": 100,
    "totalPages": 10,
    "size": 10,
    "number": 0,
    "first": true,
    "last": false,
    "empty": false
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "success": true
}
```

### 错误响应
```json
{
  "code": 400,
  "message": "请求参数错误",
  "data": null,
  "timestamp": "2024-01-15T10:30:00Z",
  "success": false,
  "details": "用户名不能为空"
}
```

---

## 4. 错误码定义

| 错误码 | 描述 | 说明 |
|--------|------|------|
| 200 | 成功 | 请求处理成功 |
| 400 | 请求错误 | 请求参数错误或格式不正确 |
| 401 | 未授权 | 未登录或token无效 |
| 403 | 禁止访问 | 权限不足 |
| 404 | 资源不存在 | 请求的资源不存在 |
| 409 | 资源冲突 | 资源已存在或状态冲突 |
| 422 | 参数验证失败 | 请求参数验证失败 |
| 500 | 服务器错误 | 服务器内部错误 |
| 502 | 网关错误 | 上游服务错误 |
| 503 | 服务不可用 | 服务暂时不可用 |

---

## 5. 接口详情

## 5.1 认证相关接口

### 5.1.1 用户登录
**接口路径**: `POST /auth/login`  
**接口描述**: 用户登录获取访问令牌  
**需要认证**: 否

**请求参数**:
```json
{
  "username": "student001",     // 用户名，必填
  "password": "password123",    // 密码，必填
  "captcha": "1234"            // 验证码，选填
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400,
    "user": {
      "id": 1,
      "username": "student001",
      "email": "student001@fzit.edu.cn",
      "realName": "张三",
      "role": "STUDENT",
      "avatar": "https://example.com/avatar/1.jpg"
    }
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.1.2 用户注册
**接口路径**: `POST /auth/register`  
**接口描述**: 新用户注册  
**需要认证**: 否

**请求参数**:
```json
{
  "username": "student002",           // 用户名，必填
  "password": "password123",          // 密码，必填
  "email": "student002@fzit.edu.cn", // 邮箱，必填
  "phone": "13800138000",            // 手机号，必填
  "realName": "李四",                // 真实姓名，必填
  "studentId": "202101001",          // 学号，必填
  "className": "计算机2021级1班",      // 班级，必填
  "major": "计算机科学与技术",         // 专业，必填
  "captcha": "5678"                  // 验证码，必填
}
```

### 5.1.3 获取验证码
**接口路径**: `GET /auth/captcha`  
**接口描述**: 获取图形验证码  
**需要认证**: 否

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "captchaId": "uuid-12345",
    "captchaImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.1.4 刷新Token
**接口路径**: `POST /auth/refresh`  
**接口描述**: 使用刷新token获取新的访问token  
**需要认证**: 否

**请求参数**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 5.1.5 用户登出
**接口路径**: `POST /auth/logout`  
**接口描述**: 用户登出，清除服务端token  
**需要认证**: 是

**响应示例**:
```json
{
  "code": 200,
  "message": "登出成功",
  "data": null,
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 5.2 用户管理接口

### 5.2.1 获取当前用户信息
**接口路径**: `GET /users/me`  
**接口描述**: 获取当前登录用户的详细信息  
**需要认证**: 是

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "username": "student001",
    "email": "student001@fzit.edu.cn",
    "phone": "13800138000",
    "realName": "张三",
    "nickname": "小张",
    "avatar": "https://example.com/avatar/1.jpg",
    "gender": "MALE",
    "birthday": "2000-01-01",
    "studentId": "202101001",
    "className": "计算机2021级1班",
    "major": "计算机科学与技术",
    "grade": "2021",
    "enrollmentYear": 2021,
    "graduationYear": 2025,
    "status": "ACTIVE",
    "role": "STUDENT",
    "createTime": "2021-09-01T08:00:00Z",
    "updateTime": "2024-01-15T10:30:00Z"
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.2.2 更新当前用户信息
**接口路径**: `PUT /users/me`  
**接口描述**: 更新当前用户的个人信息  
**需要认证**: 是

**请求参数**:
```json
{
  "nickname": "新昵称",
  "phone": "13900139000",
  "birthday": "2000-01-15",
  "gender": "MALE"
}
```

### 5.2.3 上传用户头像
**接口路径**: `POST /users/me/avatar`  
**接口描述**: 上传用户头像  
**需要认证**: 是  
**Content-Type**: `multipart/form-data`

**请求参数**:
- `file`: 头像文件（支持jpg, png, gif格式，最大2MB）

**响应示例**:
```json
{
  "code": 200,
  "message": "头像上传成功",
  "data": {
    "avatarUrl": "https://example.com/avatar/1.jpg"
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.2.4 获取用户详情（通过ID）
**接口路径**: `GET /users/{id}`  
**接口描述**: 获取指定用户的详细信息  
**需要认证**: 是

**路径参数**:
- `id`: 用户ID

### 5.2.5 搜索用户
**接口路径**: `GET /users/search`  
**接口描述**: 根据关键词搜索用户  
**需要认证**: 是

**查询参数**:
- `keyword`: 搜索关键词（姓名、用户名、学号）
- `page`: 页码，默认0
- `size`: 每页大小，默认10
- `sort`: 排序字段，默认createTime
- `direction`: 排序方向，ASC或DESC，默认DESC

### 5.2.6 获取用户列表（管理员）
**接口路径**: `GET /users`  
**接口描述**: 获取用户列表，管理员功能  
**需要认证**: 是  
**权限要求**: ADMIN或TEACHER

**查询参数**:
- `page`: 页码，默认0
- `size`: 每页大小，默认10
- `role`: 用户角色筛选（STUDENT/TEACHER/ADMIN）
- `status`: 用户状态筛选（ACTIVE/INACTIVE/SUSPENDED）
- `keyword`: 搜索关键词
- `sort`: 排序字段
- `direction`: 排序方向

---

## 5.3 动态/帖子接口

### 5.3.1 获取动态列表
**接口路径**: `GET /posts`  
**接口描述**: 获取动态/帖子列表  
**需要认证**: 是

**查询参数**:
- `page`: 页码，默认0
- `size`: 每页大小，默认10
- `type`: 动态类型（MOMENT/ARTICLE/ACTIVITY/NOTICE）
- `category`: 分类
- `authorId`: 作者ID
- `sort`: 排序字段，默认createTime
- `direction`: 排序方向，默认DESC

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "content": [
      {
        "id": 1,
        "title": "我的大学生活感悟",
        "content": "大学四年，收获满满...",
        "images": [
          "https://example.com/images/post1_1.jpg",
          "https://example.com/images/post1_2.jpg"
        ],
        "type": "MOMENT",
        "category": "生活感悟",
        "tags": ["大学生活", "感悟", "成长"],
        "likes": 25,
        "comments": 8,
        "shares": 3,
        "views": 156,
        "isLiked": false,
        "isCollected": false,
        "status": "PUBLISHED",
        "location": "福州理工学院",
        "author": {
          "id": 1,
          "username": "student001",
          "realName": "张三",
          "avatar": "https://example.com/avatar/1.jpg",
          "className": "计算机2021级1班"
        },
        "createTime": "2024-01-15T09:30:00Z",
        "updateTime": "2024-01-15T09:30:00Z"
      }
    ],
    "totalElements": 50,
    "totalPages": 5,
    "size": 10,
    "number": 0,
    "first": true,
    "last": false,
    "empty": false
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.3.2 获取动态详情
**接口路径**: `GET /posts/{id}`  
**接口描述**: 获取指定动态的详细信息  
**需要认证**: 是

**路径参数**:
- `id`: 动态ID

### 5.3.3 创建动态
**接口路径**: `POST /posts`  
**接口描述**: 创建新动态  
**需要认证**: 是

**请求参数**:
```json
{
  "title": "动态标题",                    // 标题，选填
  "content": "动态内容，支持markdown格式", // 内容，必填
  "images": [                          // 图片列表，选填
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "type": "MOMENT",                    // 类型，必填
  "category": "生活感悟",               // 分类，选填
  "tags": ["标签1", "标签2"],          // 标签，选填
  "location": "福州理工学院"            // 位置，选填
}
```

### 5.3.4 更新动态
**接口路径**: `PUT /posts/{id}`  
**接口描述**: 更新动态内容  
**需要认证**: 是  
**权限要求**: 作者本人或管理员

### 5.3.5 删除动态
**接口路径**: `DELETE /posts/{id}`  
**接口描述**: 删除指定动态  
**需要认证**: 是  
**权限要求**: 作者本人或管理员

### 5.3.6 点赞动态
**接口路径**: `POST /posts/{id}/like`  
**接口描述**: 给动态点赞  
**需要认证**: 是

### 5.3.7 取消点赞
**接口路径**: `DELETE /posts/{id}/like`  
**接口描述**: 取消对动态的点赞  
**需要认证**: 是

### 5.3.8 收藏动态
**接口路径**: `POST /posts/{id}/collect`  
**接口描述**: 收藏动态  
**需要认证**: 是

### 5.3.9 分享动态
**接口路径**: `POST /posts/{id}/share`  
**接口描述**: 分享动态（增加分享数）  
**需要认证**: 是

### 5.3.10 获取动态评论
**接口路径**: `GET /posts/{postId}/comments`  
**接口描述**: 获取动态的评论列表  
**需要认证**: 是

**查询参数**:
- `page`: 页码，默认0
- `size`: 每页大小，默认20
- `sort`: 排序字段，默认createTime
- `direction`: 排序方向，默认ASC

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "content": [
      {
        "id": 1,
        "postId": 1,
        "content": "很有感触，感谢分享！",
        "parentId": null,
        "replyToId": null,
        "replyTo": null,
        "likes": 3,
        "isLiked": false,
        "author": {
          "id": 2,
          "username": "student002",
          "realName": "李四",
          "avatar": "https://example.com/avatar/2.jpg"
        },
        "createTime": "2024-01-15T10:00:00Z"
      }
    ],
    "totalElements": 8,
    "totalPages": 1,
    "size": 20,
    "number": 0,
    "first": true,
    "last": true,
    "empty": false
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.3.11 添加评论
**接口路径**: `POST /posts/{postId}/comments`  
**接口描述**: 给动态添加评论  
**需要认证**: 是

**请求参数**:
```json
{
  "content": "评论内容",     // 评论内容，必填
  "parentId": 1,          // 父评论ID，回复评论时填写
  "replyToId": 2          // 回复的用户ID，@某人时填写
}
```

### 5.3.12 删除评论
**接口路径**: `DELETE /posts/{postId}/comments/{commentId}`  
**接口描述**: 删除评论  
**需要认证**: 是  
**权限要求**: 评论作者或管理员

---

## 5.4 活动管理接口

### 5.4.1 获取活动列表
**接口路径**: `GET /activities`  
**接口描述**: 获取活动列表  
**需要认证**: 是

**查询参数**:
- `page`: 页码，默认0
- `size`: 每页大小，默认10
- `type`: 活动类型（ACADEMIC/ENTERTAINMENT/SPORTS/VOLUNTEER/OTHER）
- `status`: 活动状态（DRAFT/PUBLISHED/ONGOING/ENDED/CANCELLED）
- `keyword`: 搜索关键词
- `sort`: 排序字段，默认startTime
- `direction`: 排序方向，默认ASC

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "content": [
      {
        "id": 1,
        "title": "校园篮球比赛",
        "description": "一年一度的校园篮球比赛即将开始",
        "content": "详细的活动介绍...",
        "cover": "https://example.com/activity/cover1.jpg",
        "images": [
          "https://example.com/activity/1_1.jpg",
          "https://example.com/activity/1_2.jpg"
        ],
        "type": "SPORTS",
        "status": "PUBLISHED",
        "location": "体育馆",
        "startTime": "2024-01-20T14:00:00Z",
        "endTime": "2024-01-20T18:00:00Z",
        "maxParticipants": 100,
        "currentParticipants": 45,
        "registrationDeadline": "2024-01-18T23:59:59Z",
        "organizer": {
          "id": 10,
          "realName": "王老师",
          "avatar": "https://example.com/avatar/10.jpg"
        },
        "tags": ["篮球", "体育", "比赛"],
        "requirements": "身体健康，有篮球基础",
        "isRegistered": false,
        "createTime": "2024-01-10T09:00:00Z",
        "updateTime": "2024-01-15T10:00:00Z"
      }
    ],
    "totalElements": 20,
    "totalPages": 2,
    "size": 10,
    "number": 0,
    "first": true,
    "last": false,
    "empty": false
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.4.2 获取活动详情
**接口路径**: `GET /activities/{id}`  
**接口描述**: 获取指定活动的详细信息  
**需要认证**: 是

### 5.4.3 创建活动
**接口路径**: `POST /activities`  
**接口描述**: 创建新活动  
**需要认证**: 是  
**权限要求**: TEACHER或ADMIN

**请求参数**:
```json
{
  "title": "活动标题",                    // 必填
  "description": "活动简介",             // 必填
  "content": "活动详细介绍",             // 选填
  "cover": "https://example.com/cover.jpg", // 选填
  "images": ["https://example.com/1.jpg"], // 选填
  "type": "ACADEMIC",                   // 必填
  "location": "教学楼A101",             // 必填
  "startTime": "2024-01-20T14:00:00Z", // 必填
  "endTime": "2024-01-20T18:00:00Z",   // 必填
  "maxParticipants": 50,               // 选填
  "registrationDeadline": "2024-01-18T23:59:59Z", // 选填
  "tags": ["学术", "讲座"],             // 选填
  "requirements": "无特殊要求"           // 选填
}
```

### 5.4.4 报名活动
**接口路径**: `POST /activities/{id}/register`  
**接口描述**: 报名参加活动  
**需要认证**: 是

**请求参数**:
```json
{
  "note": "我对这个活动很感兴趣，希望能参加" // 报名备注，选填
}
```

### 5.4.5 取消报名
**接口路径**: `DELETE /activities/{id}/register`  
**接口描述**: 取消活动报名  
**需要认证**: 是

### 5.4.6 获取活动报名列表
**接口路径**: `GET /activities/{id}/registrations`  
**接口描述**: 获取活动的报名用户列表  
**需要认证**: 是  
**权限要求**: 活动组织者或管理员

---

## 5.5 班级管理接口

### 5.5.1 获取班级列表
**接口路径**: `GET /classes`  
**接口描述**: 获取班级列表  
**需要认证**: 是

**查询参数**:
- `page`: 页码，默认0
- `size`: 每页大小，默认10
- `grade`: 年级筛选
- `major`: 专业筛选
- `keyword`: 搜索关键词（班级名）

### 5.5.2 获取班级详情
**接口路径**: `GET /classes/{id}`  
**接口描述**: 获取指定班级的详细信息  
**需要认证**: 是

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "name": "计算机2021级1班",
    "major": "计算机科学与技术",
    "grade": "2021",
    "enrollmentYear": 2021,
    "graduationYear": 2025,
    "description": "这是一个充满活力的班级",
    "cover": "https://example.com/class/cover1.jpg",
    "motto": "团结、进取、创新、超越",
    "studentCount": 45,
    "teacher": {
      "id": 10,
      "realName": "张老师",
      "avatar": "https://example.com/avatar/10.jpg"
    },
    "status": "ACTIVE",
    "createTime": "2021-09-01T08:00:00Z"
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.5.3 获取班级成员
**接口路径**: `GET /classes/{id}/members`  
**接口描述**: 获取班级成员列表  
**需要认证**: 是

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "content": [
      {
        "id": 1,
        "classId": 1,
        "user": {
          "id": 1,
          "username": "student001",
          "realName": "张三",
          "avatar": "https://example.com/avatar/1.jpg",
          "studentId": "202101001"
        },
        "role": "MONITOR",
        "position": "班长",
        "joinTime": "2021-09-01T08:00:00Z"
      }
    ],
    "totalElements": 45,
    "totalPages": 5,
    "size": 10,
    "number": 0
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.5.4 获取我的班级
**接口路径**: `GET /classes/me`  
**接口描述**: 获取当前用户所在的班级信息  
**需要认证**: 是

---

## 5.6 相册/照片接口

### 5.6.1 获取相册列表
**接口路径**: `GET /albums`  
**接口描述**: 获取相册列表  
**需要认证**: 是

**查询参数**:
- `page`: 页码，默认0
- `size`: 每页大小，默认10
- `type`: 相册类型（ENROLLMENT/MILITARY/CLASSROOM/CAMPUS/CLASS/DORMITORY/ACTIVITY/GRADUATION）
- `visibility`: 可见性（PUBLIC/CLASS_ONLY/PRIVATE）

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "入学记忆",
        "description": "记录入学时的美好时光",
        "cover": "https://example.com/album/cover1.jpg",
        "type": "ENROLLMENT",
        "visibility": "PUBLIC",
        "creator": {
          "id": 1,
          "realName": "张三",
          "avatar": "https://example.com/avatar/1.jpg"
        },
        "photoCount": 25,
        "createTime": "2021-09-01T08:00:00Z",
        "updateTime": "2024-01-15T10:00:00Z"
      }
    ],
    "totalElements": 10,
    "totalPages": 1,
    "size": 10,
    "number": 0
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.6.2 获取相册照片
**接口路径**: `GET /albums/{id}/photos`  
**接口描述**: 获取指定相册的照片列表  
**需要认证**: 是

### 5.6.3 获取照片列表
**接口路径**: `GET /photos`  
**接口描述**: 获取照片列表  
**需要认证**: 是

**查询参数**:
- `page`: 页码，默认0
- `size`: 每页大小，默认20
- `albumId`: 相册ID筛选
- `tags`: 标签筛选

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "content": [
      {
        "id": 1,
        "albumId": 1,
        "url": "https://example.com/photos/1.jpg",
        "thumbnail": "https://example.com/photos/thumb/1.jpg",
        "title": "入学第一天",
        "description": "激动的心情难以言表",
        "location": "福州理工学院校门",
        "shootTime": "2021-09-01T08:00:00Z",
        "uploader": {
          "id": 1,
          "realName": "张三",
          "avatar": "https://example.com/avatar/1.jpg"
        },
        "tags": ["入学", "校门", "纪念"],
        "likes": 15,
        "isLiked": false,
        "createTime": "2021-09-01T20:00:00Z"
      }
    ]
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.6.4 上传照片
**接口路径**: `POST /photos`  
**接口描述**: 上传照片  
**需要认证**: 是  
**Content-Type**: `multipart/form-data`

**请求参数**:
- `file`: 照片文件（必填）
- `albumId`: 相册ID（选填）
- `title`: 照片标题（选填）
- `description`: 照片描述（选填）
- `location`: 拍摄地点（选填）
- `shootTime`: 拍摄时间（选填）
- `tags`: 标签，逗号分隔（选填）

### 5.6.5 批量上传照片
**接口路径**: `POST /photos/batch`  
**接口描述**: 批量上传照片  
**需要认证**: 是  
**Content-Type**: `multipart/form-data`

**请求参数**:
- `files`: 照片文件数组（必填）
- `albumId`: 相册ID（选填）

### 5.6.6 点赞照片
**接口路径**: `POST /photos/{id}/like`  
**接口描述**: 给照片点赞  
**需要认证**: 是

---

## 5.7 消息通知接口

### 5.7.1 获取消息列表
**接口路径**: `GET /messages`  
**接口描述**: 获取私信消息列表  
**需要认证**: 是

**查询参数**:
- `page`: 页码，默认0
- `size`: 每页大小，默认20
- `senderId`: 发送者ID筛选
- `receiverId`: 接收者ID筛选

### 5.7.2 发送消息
**接口路径**: `POST /messages`  
**接口描述**: 发送私信消息  
**需要认证**: 是

**请求参数**:
```json
{
  "receiverId": 2,           // 接收者ID，必填
  "content": "你好，很高兴认识你", // 消息内容，必填
  "type": "TEXT"            // 消息类型，默认TEXT
}
```

### 5.7.3 标记消息已读
**接口路径**: `PUT /messages/{id}/read`  
**接口描述**: 标记指定消息为已读  
**需要认证**: 是

### 5.7.4 获取未读消息数
**接口路径**: `GET /messages/unread/count`  
**接口描述**: 获取当前用户的未读消息数量  
**需要认证**: 是

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "count": 5
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.7.5 获取通知列表
**接口路径**: `GET /notifications`  
**接口描述**: 获取系统通知列表  
**需要认证**: 是

**查询参数**:
- `page`: 页码，默认0
- `size`: 每页大小，默认20
- `type`: 通知类型筛选（LIKE/COMMENT/FOLLOW/ACTIVITY/SYSTEM/ANNOUNCEMENT）
- `isRead`: 是否已读筛选

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "content": [
      {
        "id": 1,
        "type": "LIKE",
        "title": "有人点赞了你的动态",
        "content": "张三点赞了你的动态《我的大学生活感悟》",
        "relatedId": 1,
        "relatedType": "POST",
        "isRead": false,
        "createTime": "2024-01-15T09:30:00Z"
      }
    ]
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 5.8 文件上传接口

### 5.8.1 上传单个文件
**接口路径**: `POST /files/upload`  
**接口描述**: 上传单个文件  
**需要认证**: 是  
**Content-Type**: `multipart/form-data`

**请求参数**:
- `file`: 文件（必填）

**响应示例**:
```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "fileId": 1,
    "fileName": "document.pdf",
    "fileUrl": "https://example.com/files/document.pdf",
    "fileSize": 1024000,
    "fileType": "application/pdf"
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.8.2 批量上传文件
**接口路径**: `POST /files/batch-upload`  
**接口描述**: 批量上传文件  
**需要认证**: 是  
**Content-Type**: `multipart/form-data`

**请求参数**:
- `files`: 文件数组（必填）

### 5.8.3 获取文件信息
**接口路径**: `GET /files/{id}`  
**接口描述**: 获取文件详细信息  
**需要认证**: 是

### 5.8.4 删除文件
**接口路径**: `DELETE /files/{id}`  
**接口描述**: 删除文件  
**需要认证**: 是  
**权限要求**: 文件上传者或管理员

---

## 5.9 设置配置接口

### 5.9.1 获取用户设置
**接口路径**: `GET /settings/user`  
**接口描述**: 获取当前用户的个人设置  
**需要认证**: 是

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "userId": 1,
    "notificationEnabled": true,
    "emailNotification": true,
    "smsNotification": false,
    "privacyLevel": "PUBLIC",
    "showBirthday": true,
    "showPhone": false,
    "showEmail": false,
    "language": "zh-CN",
    "theme": "AUTO",
    "updateTime": "2024-01-15T10:00:00Z"
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.9.2 更新用户设置
**接口路径**: `PUT /settings/user`  
**接口描述**: 更新用户个人设置  
**需要认证**: 是

**请求参数**:
```json
{
  "notificationEnabled": true,
  "emailNotification": false,
  "privacyLevel": "FRIENDS",
  "theme": "DARK"
}
```

### 5.9.3 获取系统配置
**接口路径**: `GET /settings/system`  
**接口描述**: 获取系统配置列表  
**需要认证**: 是  
**权限要求**: ADMIN

**查询参数**:
- `key`: 配置键筛选

### 5.9.4 更新系统配置
**接口路径**: `PUT /settings/system/{key}`  
**接口描述**: 更新指定的系统配置  
**需要认证**: 是  
**权限要求**: ADMIN

---

## 5.10 统计分析接口

### 5.10.1 获取系统统计
**接口路径**: `GET /statistics/system`  
**接口描述**: 获取系统整体统计数据  
**需要认证**: 是  
**权限要求**: ADMIN或TEACHER

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "totalUsers": 1250,
    "totalPosts": 8650,
    "totalActivities": 156,
    "totalPhotos": 12400,
    "activeUsers": 890,
    "newUsersToday": 15,
    "newPostsToday": 45,
    "popularPosts": [
      {
        "id": 1,
        "title": "热门动态标题",
        "likes": 125,
        "comments": 34
      }
    ],
    "recentActivities": [
      {
        "id": 1,
        "title": "近期活动",
        "startTime": "2024-01-20T14:00:00Z",
        "currentParticipants": 45
      }
    ]
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.10.2 获取用户统计
**接口路径**: `GET /statistics/user/{id}`  
**接口描述**: 获取指定用户的统计数据  
**需要认证**: 是

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "userId": 1,
    "postsCount": 25,
    "likesReceived": 145,
    "commentsReceived": 67,
    "activitiesJoined": 8,
    "photosUploaded": 156,
    "loginDays": 89,
    "lastLoginTime": "2024-01-15T09:00:00Z"
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.10.3 获取数据趋势
**接口路径**: `GET /statistics/trends`  
**接口描述**: 获取数据趋势分析  
**需要认证**: 是  
**权限要求**: ADMIN或TEACHER

**查询参数**:
- `type`: 数据类型（users/posts/activities/photos）
- `period`: 时间周期（day/week/month/year）

---

## 5.11 搜索功能接口

### 5.11.1 全局搜索
**接口路径**: `GET /search`  
**接口描述**: 全局搜索功能  
**需要认证**: 是

**查询参数**:
- `keyword`: 搜索关键词（必填）
- `type`: 搜索类型（ALL/USER/POST/ACTIVITY/PHOTO）
- `category`: 分类筛选
- `page`: 页码，默认0
- `size`: 每页大小，默认10

**响应示例**:
```json
{
  "code": 200,
  "message": "搜索成功",
  "data": {
    "users": [
      {
        "id": 1,
        "realName": "张三",
        "avatar": "https://example.com/avatar/1.jpg"
      }
    ],
    "posts": [
      {
        "id": 1,
        "title": "匹配的动态",
        "content": "包含关键词的内容..."
      }
    ],
    "activities": [
      {
        "id": 1,
        "title": "相关活动",
        "startTime": "2024-01-20T14:00:00Z"
      }
    ],
    "photos": [
      {
        "id": 1,
        "title": "相关照片",
        "url": "https://example.com/photo/1.jpg"
      }
    ],
    "total": 25
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.11.2 搜索建议
**接口路径**: `GET /search/suggestions`  
**接口描述**: 获取搜索建议  
**需要认证**: 是

**查询参数**:
- `keyword`: 输入的关键词
- `type`: 建议类型

### 5.11.3 热门搜索
**接口路径**: `GET /search/hot-keywords`  
**接口描述**: 获取热门搜索关键词  
**需要认证**: 是

---

## 5.12 权限管理接口

### 5.12.1 获取权限列表
**接口路径**: `GET /permissions`  
**接口描述**: 获取所有权限列表  
**需要认证**: 是  
**权限要求**: ADMIN

### 5.12.2 获取角色列表
**接口路径**: `GET /roles`  
**接口描述**: 获取角色列表  
**需要认证**: 是  
**权限要求**: ADMIN

### 5.12.3 创建角色
**接口路径**: `POST /roles`  
**接口描述**: 创建新角色  
**需要认证**: 是  
**权限要求**: ADMIN

### 5.12.4 分配权限给角色
**接口路径**: `PUT /roles/{roleId}/permissions`  
**接口描述**: 给角色分配权限  
**需要认证**: 是  
**权限要求**: ADMIN

---

## 5.13 审核管理接口

### 5.13.1 获取待审核列表
**接口路径**: `GET /reviews/pending`  
**接口描述**: 获取待审核内容列表  
**需要认证**: 是  
**权限要求**: ADMIN或TEACHER

### 5.13.2 审核通过
**接口路径**: `PUT /reviews/{id}/approve`  
**接口描述**: 审核通过  
**需要认证**: 是  
**权限要求**: ADMIN或TEACHER

### 5.13.3 审核拒绝
**接口路径**: `PUT /reviews/{id}/reject`  
**接口描述**: 审核拒绝  
**需要认证**: 是  
**权限要求**: ADMIN或TEACHER

---

## 6. Spring Boot 实现示例

### 6.1 主要依赖配置

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Spring Boot Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Security + JWT -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    
    <!-- JPA + MySQL -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    
    <!-- Redis -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    
    <!-- 文件上传 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- JSON处理 -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
    </dependency>
</dependencies>
```

### 6.2 核心配置

```yaml
# application.yml
server:
  port: 8080
  servlet:
    context-path: /

spring:
  profiles:
    active: dev
    
  datasource:
    url: jdbc:mysql://localhost:3306/fuzhou_tech_alumni?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=GMT%2B8
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
    
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        
  redis:
    host: localhost
    port: 6379
    password: 
    database: 0
    timeout: 3000ms
    
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 50MB
      
jwt:
  secret: your-secret-key-here-make-it-long-enough-for-security
  expiration: 86400000 # 24小时
  refresh-expiration: 2592000000 # 30天

# 文件存储配置
file:
  upload:
    path: /app/uploads/
    url-prefix: https://your-domain.com/files/
```

### 6.3 核心实体类示例

```java
// User.java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String phone;
    private String realName;
    private String nickname;
    private String avatar;
    
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    @Column(name = "birthday")
    private LocalDate birthday;
    
    private String studentId;
    private String className;
    private String major;
    private String grade;
    private Integer enrollmentYear;
    private Integer graduationYear;
    
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.ACTIVE;
    
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.STUDENT;
    
    @CreationTimestamp
    private LocalDateTime createTime;
    
    @UpdateTimestamp
    private LocalDateTime updateTime;
}

// Post.java
@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;
    
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Column(columnDefinition = "JSON")
    private String images;
    
    @Enumerated(EnumType.STRING)
    private PostType type;
    
    private String category;
    
    @Column(columnDefinition = "JSON")
    private String tags;
    
    private Integer likes = 0;
    private Integer comments = 0;
    private Integer shares = 0;
    private Integer views = 0;
    
    @Enumerated(EnumType.STRING)
    private PostStatus status = PostStatus.PUBLISHED;
    
    private String location;
    
    @CreationTimestamp
    private LocalDateTime createTime;
    
    @UpdateTimestamp
    private LocalDateTime updateTime;
}
```

### 6.4 Controller示例

```java
// AuthController.java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Validated
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody @Valid LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ApiResponse.success("登录成功", response);
    }
    
    @PostMapping("/register")
    public ApiResponse<User> register(@RequestBody @Valid RegisterRequest request) {
        User user = authService.register(request);
        return ApiResponse.success("注册成功", user);
    }
    
    @PostMapping("/logout")
    @PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ApiResponse<Void> logout(HttpServletRequest request) {
        authService.logout(request);
        return ApiResponse.success("登出成功");
    }
}

// UserController.java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/me")
    public ApiResponse<User> getCurrentUser(Authentication authentication) {
        User user = userService.getCurrentUser(authentication);
        return ApiResponse.success("获取成功", user);
    }
    
    @PutMapping("/me")
    public ApiResponse<User> updateCurrentUser(
            @RequestBody @Valid UpdateUserRequest request,
            Authentication authentication) {
        User user = userService.updateCurrentUser(request, authentication);
        return ApiResponse.success("更新成功", user);
    }
    
    @PostMapping("/me/avatar")
    public ApiResponse<Map<String, String>> uploadAvatar(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        String avatarUrl = userService.uploadAvatar(file, authentication);
        return ApiResponse.success("头像上传成功", 
            Map.of("avatarUrl", avatarUrl));
    }
}
```

### 6.5 统一响应处理

```java
// ApiResponse.java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;
    private LocalDateTime timestamp;
    private boolean success;
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(200, message, data, LocalDateTime.now(), true);
    }
    
    public static <T> ApiResponse<T> success(String message) {
        return success(message, null);
    }
    
    public static <T> ApiResponse<T> error(int code, String message) {
        return new ApiResponse<>(code, message, null, LocalDateTime.now(), false);
    }
}

// GlobalExceptionHandler.java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse<Object> handleValidationException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getAllErrors().stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .collect(Collectors.joining(", "));
        return ApiResponse.error(400, message);
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    public ApiResponse<Object> handleAccessDeniedException(AccessDeniedException e) {
        return ApiResponse.error(403, "权限不足");
    }
    
    @ExceptionHandler(Exception.class)
    public ApiResponse<Object> handleException(Exception e) {
        log.error("系统异常", e);
        return ApiResponse.error(500, "系统异常，请稍后重试");
    }
}
```

---

## 7. 部署说明

### 7.1 数据库初始化
```sql
-- 创建数据库
CREATE DATABASE fuzhou_tech_alumni DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户
CREATE USER 'alumni_user'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON fuzhou_tech_alumni.* TO 'alumni_user'@'%';
FLUSH PRIVILEGES;
```

### 7.2 Docker部署
```dockerfile
# Dockerfile
FROM openjdk:11-jre-slim

VOLUME /tmp
COPY target/alumni-system-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - mysql
      - redis
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/fuzhou_tech_alumni
      - SPRING_REDIS_HOST=redis
      
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: fuzhou_tech_alumni
    volumes:
      - mysql_data:/var/lib/mysql
      
  redis:
    image: redis:6.2-alpine
    volumes:
      - redis_data:/data

volumes:
  mysql_data:
  redis_data:
```

---

## 8. 前端集成示例

现在前端可以通过之前创建的API服务轻松调用后端接口：

```typescript
// 使用示例
import { services } from '@/utils/api/services';

// 登录
const handleLogin = async (username: string, password: string) => {
  try {
    const response = await services.auth.login({ username, password });
    localStorage.setItem('token', response.data.token);
    // 处理登录成功
  } catch (error) {
    // 处理登录失败
  }
};

// 获取动态列表
const loadPosts = async () => {
  try {
    const response = await services.post.getPosts({ page: 0, size: 10 });
    setPosts(response.data.content);
  } catch (error) {
    // 处理错误
  }
};
```

---

## 9. 接口测试

推荐使用以下工具进行接口测试：
- **Postman**: 功能全面的API测试工具
- **Swagger UI**: 自动生成的API文档和测试界面
- **curl**: 命令行测试工具

### 测试示例
```bash
# 获取验证码
curl -X GET "http://localhost:8080/api/auth/captcha"

# 用户登录
curl -X POST "http://localhost:8080/api/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"123456"}'

# 获取当前用户信息
curl -X GET "http://localhost:8080/api/users/me" \
     -H "Authorization: Bearer YOUR_TOKEN"
```

---

这份接口文档提供了完整的API设计方案，包含了所有核心功能模块的接口定义。Spring Boot后端可以根据这个文档进行开发，前端已经有了完整的API调用服务，可以无缝对接。
# 福州理工学院校友通讯系统 - Spring Boot API 接口文档

## 目录
- [1. 系统概述](#1-系统概述)
- [2. 技术架构](#2-技术架构)
- [3. 认证授权](#3-认证授权)
- [4. 公共数据结构](#4-公共数据结构)
- [5. 接口规范](#5-接口规范)
- [6. 核心模块API](#6-核心模块api)
- [7. 部署配置](#7-部署配置)
- [8. 错误处理](#8-错误处理)

## 1. 系统概述

### 1.1 项目简介
福州理工学院校友通讯系统，包含H5移动端和管理后台，支持校友动态分享、班级圈互动、活动管理、照片分享等功能。

### 1.2 主要功能模块
- 👤 **用户管理** - 注册登录、个人资料、权限管理
- 📱 **动态社交** - 发布动态、评论点赞、分享收藏
- 🎯 **活动管理** - 活动发布、报名管理、活动统计
- 👥 **班级管理** - 班级信息、成员管理、班级圈
- 📸 **相册系统** - 照片上传、相册管理、分类展示
- 💬 **消息通知** - 私信系统、系统通知、消息推送
- 📊 **数据统计** - 用户行为、内容统计、趋势分析
- ⚙️ **系统管理** - 配置管理、权限控制、审核系统

## 2. 技术架构

### 2.1 后端技术栈
```
Spring Boot 3.2+
├── Spring Security 6.x (认证授权)
├── Spring Data JPA (数据访问)
├── Spring Web (REST API)
├── Spring Cache (缓存)
├── Spring Task (定时任务)
├── MySQL 8.0+ (主数据库)
├── Redis 7.x (缓存/会话)
├── MinIO (文件存储)
├── RabbitMQ (消息队列)
└── JWT (令牌认证)
```

### 2.2 项目结构
```
src/main/java/com/fzit/alumni/
├── config/          # 配置类
├── controller/      # 控制器
├── service/         # 业务逻辑
├── repository/      # 数据访问
├── entity/          # 实体类
├── dto/             # 数据传输对象
├── common/          # 公共组件
├── util/            # 工具类
└── security/        # 安全配置
```

## 3. 认证授权

### 3.1 JWT令牌认证
```http
Authorization: Bearer <token>
```

### 3.2 认证接口

#### 登录
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "student123",
  "password": "password123",
  "captcha": "abcd"
}
```

**响应：**
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "refresh_token_here",
    "user": {
      "id": 1,
      "username": "student123",
      "email": "student@fzit.edu.cn",
      "realName": "张三",
      "role": "STUDENT",
      "avatar": "http://example.com/avatar.jpg"
    },
    "expiresIn": 7200
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "success": true
}
```

#### 注册
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "student456",
  "password": "password123",
  "email": "student456@fzit.edu.cn",
  "phone": "13800138000",
  "realName": "李四",
  "studentId": "2021001002",
  "className": "计算机科学与技术2021级1班",
  "major": "计算机科学与技术",
  "captcha": "1234"
}
```

#### 刷新令牌
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

#### 登出
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

## 4. 公共数据结构

### 4.1 统一响应格式
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {},
  "timestamp": "2024-01-15T10:30:00Z",
  "success": true
}
```

### 4.2 分页响应格式
```json
{
  "code": 200,
  "message": "查询成功",
  "data": {
    "content": [],
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

### 4.3 错误响应格式
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

## 5. 接口规范

### 5.1 请求规范
- **Base URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`
- **字符编码**: `UTF-8`
- **时间格式**: `ISO 8601` (`yyyy-MM-dd'T'HH:mm:ss'Z'`)

### 5.2 HTTP状态码
| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未认证 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 409 | 资源冲突 |
| 500 | 服务器内部错误 |

### 5.3 业务响应码
| 响应码 | 说明 |
|--------|------|
| 200 | 操作成功 |
| 1001 | 参数验证失败 |
| 1002 | 用户不存在 |
| 1003 | 密码错误 |
| 1004 | 令牌无效 |
| 1005 | 权限不足 |
| 2001 | 资源不存在 |
| 2002 | 资源已存在 |
| 5000 | 系统内部错误 |

## 6. 核心模块API

### 6.1 用户管理

#### 获取当前用户信息
```http
GET /api/users/me
Authorization: Bearer <token>
```

#### 更新用户信息
```http
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "realName": "张三",
  "phone": "13800138000",
  "email": "zhangsan@fzit.edu.cn",
  "className": "计算机科学与技术2021级1班",
  "major": "计算机科学与技术"
}
```

#### 上传头像
```http
POST /api/users/me/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary>
```

#### 获取用户列表（管理员）
```http
GET /api/users
Authorization: Bearer <token>
?page=0&size=10&sort=createTime&direction=DESC&keyword=张三&role=STUDENT
```

### 6.2 动态管理

#### 获取动态列表
```http
GET /api/posts
?page=0&size=10&type=MOMENT&category=学习&authorId=1
```

#### 获取动态详情
```http
GET /api/posts/{id}
```

#### 发布动态
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "今天学习了Spring Boot！",
  "type": "MOMENT",
  "images": ["http://example.com/image1.jpg"],
  "location": "图书馆",
  "tags": ["学习", "技术"]
}
```

#### 更新动态
```http
PUT /api/posts/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "更新后的内容",
  "tags": ["学习", "技术", "分享"]
}
```

#### 删除动态
```http
DELETE /api/posts/{id}
Authorization: Bearer <token>
```

#### 点赞动态
```http
POST /api/posts/{id}/like
Authorization: Bearer <token>
```

#### 取消点赞
```http
DELETE /api/posts/{id}/like
Authorization: Bearer <token>
```

#### 获取评论列表
```http
GET /api/posts/{postId}/comments
?page=0&size=10
```

#### 添加评论
```http
POST /api/posts/{postId}/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "很棒的分享！",
  "parentId": null,
  "replyToId": null
}
```

### 6.3 活动管理

#### 获取活动列表
```http
GET /api/activities
?page=0&size=10&type=ACADEMIC&status=PUBLISHED&keyword=讲座
```

#### 获取活动详情
```http
GET /api/activities/{id}
```

#### 创建活动
```http
POST /api/activities
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Spring Boot技术分享会",
  "description": "深入学习Spring Boot框架",
  "content": "详细的活动内容...",
  "type": "ACADEMIC",
  "location": "学术报告厅",
  "startTime": "2024-02-01T14:00:00Z",
  "endTime": "2024-02-01T16:00:00Z",
  "maxParticipants": 100,
  "registrationDeadline": "2024-01-31T23:59:59Z"
}
```

#### 报名活动
```http
POST /api/activities/{id}/register
Authorization: Bearer <token>
Content-Type: application/json

{
  "note": "很期待这次活动"
}
```

#### 取消报名
```http
DELETE /api/activities/{id}/register
Authorization: Bearer <token>
```

### 6.4 班级管理

#### 获取班级列表
```http
GET /api/classes
?page=0&size=10&grade=2021&major=计算机科学与技术
```

#### 获取班级详情
```http
GET /api/classes/{id}
```

#### 获取班级成员
```http
GET /api/classes/{id}/members
?page=0&size=20
```

#### 获取我的班级
```http
GET /api/classes/me
Authorization: Bearer <token>
```

### 6.5 相册系统

#### 获取相册列表
```http
GET /api/albums
?page=0&size=10&type=ENROLLMENT&visibility=PUBLIC
```

#### 获取相册详情
```http
GET /api/albums/{id}
```

#### 创建相册
```http
POST /api/albums
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "入学留念",
  "description": "2021年入学时的美好回忆",
  "type": "ENROLLMENT",
  "visibility": "PUBLIC"
}
```

#### 上传照片
```http
POST /api/photos
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary>
albumId: 1
title: 入学第一天
description: 激动的心情
```

#### 批量上传照片
```http
POST /api/photos/batch
Authorization: Bearer <token>
Content-Type: multipart/form-data

files: <binary[]>
albumId: 1
```

### 6.6 消息通知

#### 获取消息列表
```http
GET /api/messages
Authorization: Bearer <token>
?page=0&size=10&senderId=1
```

#### 发送消息
```http
POST /api/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "receiverId": 2,
  "content": "你好！",
  "type": "TEXT"
}
```

#### 获取通知列表
```http
GET /api/notifications
Authorization: Bearer <token>
?page=0&size=10&type=LIKE&isRead=false
```

#### 标记通知已读
```http
PUT /api/notifications/{id}/read
Authorization: Bearer <token>
```

### 6.7 文件管理

#### 上传文件
```http
POST /api/files/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary>
```

#### 获取文件信息
```http
GET /api/files/{id}
Authorization: Bearer <token>
```

### 6.8 搜索功能

#### 全局搜索
```http
GET /api/search
?keyword=Spring&type=ALL&page=0&size=10
```

#### 搜索建议
```http
GET /api/search/suggestions
?keyword=Spr&type=USER
```

### 6.9 统计分析

#### 获取系统统计
```http
GET /api/statistics/system
Authorization: Bearer <token>
```

#### 获取用户统计
```http
GET /api/statistics/user/me
Authorization: Bearer <token>
```

## 7. 部署配置

### 7.1 application.yml 配置
```yaml
server:
  port: 8080
  servlet:
    context-path: /

spring:
  application:
    name: fzit-alumni-system
  
  datasource:
    url: jdbc:mysql://localhost:3306/alumni_system?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:password}
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true
  
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
    password: ${REDIS_PASSWORD:}
    database: 0
    timeout: 3000ms
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
  
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 50MB

jwt:
  secret: ${JWT_SECRET:fzit-alumni-secret-key-2024}
  expiration: 7200
  refresh-expiration: 604800

minio:
  url: ${MINIO_URL:http://localhost:9000}
  access-key: ${MINIO_ACCESS_KEY:minioadmin}
  secret-key: ${MINIO_SECRET_KEY:minioadmin}
  bucket-name: ${MINIO_BUCKET:alumni-files}

logging:
  level:
    com.fzit.alumni: INFO
    org.springframework.security: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

### 7.2 Docker配置
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/alumni-system-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 7.3 docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=mysql
      - DB_USERNAME=alumni
      - DB_PASSWORD=password123
      - REDIS_HOST=redis
      - MINIO_URL=http://minio:9000
    depends_on:
      - mysql
      - redis
      - minio

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: alumni_system
      MYSQL_USER: alumni
      MYSQL_PASSWORD: password123
      MYSQL_ROOT_PASSWORD: rootpassword
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  minio:
    image: minio/minio
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data

volumes:
  mysql_data:
  redis_data:
  minio_data:
```

## 8. 错误处理

### 8.1 全局异常处理器示例
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse> handleValidation(ValidationException e) {
        return ResponseEntity.badRequest()
            .body(ApiResponse.error(1001, "参数验证失败", e.getMessage()));
    }
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse> handleNotFound(EntityNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ApiResponse.error(2001, "资源不存在", e.getMessage()));
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse> handleAccessDenied(AccessDeniedException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body(ApiResponse.error(1005, "权限不足", e.getMessage()));
    }
}
```

### 8.2 常见错误码说明

| 错误码 | HTTP状态 | 说明 | 解决方案 |
|--------|----------|------|----------|
| 1001 | 400 | 参数验证失败 | 检查请求参数格式和必填项 |
| 1002 | 401 | 用户不存在 | 确认用户名是否正确 |
| 1003 | 401 | 密码错误 | 确认密码是否正确 |
| 1004 | 401 | 令牌无效 | 重新登录获取新令牌 |
| 1005 | 403 | 权限不足 | 联系管理员分配权限 |
| 2001 | 404 | 资源不存在 | 确认资源ID是否正确 |
| 2002 | 409 | 资源已存在 | 使用不同的标识符 |
| 5000 | 500 | 系统内部错误 | 联系技术支持 |

---

## 开发者指南

### 前端接���步骤
1. 配置API基础URL：`REACT_APP_API_BASE_URL=http://localhost:8080/api`
2. 实现认证拦截器，自动添加Bearer token
3. 实现响应拦截器，统一处理错误
4. 使用提供的类型定义和服务函数
5. 根据实际接口调整请求参数和响应处理

### 测试建议
1. 使用Postman或Insomnia测试API接口
2. 编写单元测试和集成测试
3. 进行性能测试和压力测试
4. 测试异常情况和边界条件

### 安全建议
1. 使用HTTPS传输
2. 实现请求频率限制
3. 验证和过滤用户输入
4. 定期更换JWT密钥
5. 启用CORS保护
6. 实现日志审计

---

*本文档持续更新中，如有疑问请联系开发团队。*
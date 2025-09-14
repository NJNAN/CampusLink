# 福州理工学院校友通讯系统 - AI Spring Boot 后端生成指南

## 📋 项目概述

### 系统简介
福州理工学院校友通讯网站，包含H5移动端（26个页面）和管理后台（47个页面），总计73个功能完整的页面。支持校友动态发布、班级圈互动、活动管理、文件上传、消息通知等复杂业务功能。

### 核心功能模块
- 👤 **用户认证管理** - 注册登录、JWT认证、权限控制
- 📱 **动态社交系统** - 发布动态、评论点赞、分享收藏
- 🎯 **活动管理系统** - 活动发布、报名管理、活动统计
- 👥 **班级管理系统** - 班级信息、成员管理、班级圈
- 📸 **相册照片系统** - 照片上传、相册管理、分类展示
- 💬 **消息通知系统** - 私信聊天、系统通知、消息推送
- 📊 **统计分析系统** - 用户行为、内容统计、数据分析
- ⚙️ **系统管理后台** - 配置管理、权限控制、内容审核

---

## 🚀 技术架构

### 后端技术栈
```
Spring Boot 3.2.0+
├── Spring Security 6.x      # 认证授权框架
├── Spring Data JPA          # ORM数据访问
├── Spring Web               # REST API框架
├── Spring Validation        # 参数验证
├── MySQL 8.0+              # 主数据库
├── Redis 7.x               # 缓存/会话存储
├── JWT                     # 无状态认证
├── Jackson                 # JSON序列化
├── HikariCP                # 数据库连接池
├── Lombok                  # 减少样板代码
└── SpringDoc OpenAPI       # API文档生成
```

### 项目结构
```
src/main/java/com/fzit/alumni/
├── AlumniApplication.java              # 启动类
├── config/                             # 配置类
│   ├── SecurityConfig.java            # 安全配置
│   ├── JwtConfig.java                 # JWT配置
│   ├── WebConfig.java                 # Web配置
│   └── DatabaseConfig.java           # 数据库配置
├── controller/                         # REST控制器
│   ├── AuthController.java           # 认证相关
│   ├── UserController.java           # 用户管理
│   ├── PostController.java           # 动态管理
│   ├── ActivityController.java       # 活动管理
│   ├── ClassController.java          # 班级管理
│   ├── AlbumController.java          # 相册管理
│   ├── PhotoController.java          # 照片管理
│   ├── MessageController.java        # 消息管理
│   ├── NotificationController.java   # 通知管理
│   ├── FileController.java           # 文件管理
│   ├── SearchController.java         # 搜索功能
│   └── StatisticsController.java     # 统计分析
├── service/                            # 业务逻辑层
│   ├── AuthService.java
│   ├── UserService.java
│   ├── PostService.java
│   ├── ActivityService.java
│   ├── ClassService.java
│   ├── AlbumService.java
│   ├── PhotoService.java
│   ├── MessageService.java
│   ├── NotificationService.java
│   ├── FileService.java
│   ├── SearchService.java
│   └── StatisticsService.java
├── repository/                         # 数据访问层
│   ├── UserRepository.java
│   ├── PostRepository.java
│   ├── ActivityRepository.java
│   ├── ClassRepository.java
│   ├── AlbumRepository.java
│   ├── PhotoRepository.java
│   ├── MessageRepository.java
│   ├── NotificationRepository.java
│   └── FileRepository.java
├── entity/                            # JPA实体类
│   ├── User.java
│   ├── Post.java
│   ├── Comment.java
│   ├── Activity.java
│   ├── ActivityRegistration.java
│   ├── Class.java
│   ├── ClassMember.java
│   ├── Album.java
│   ├── Photo.java
│   ├── Message.java
│   ├── Notification.java
│   ├── FileInfo.java
│   └── UserSettings.java
├── dto/                               # 数据传输对象
│   ├── request/                      # 请求DTO
│   └── response/                     # 响应DTO
├── common/                           # 公共组件
│   ├── ApiResponse.java             # 统一响应格式
│   ├── PageResponse.java            # 分页响应格式
│   ├── GlobalExceptionHandler.java  # 全局异常处理
│   ├── Constants.java               # 常量定义
│   └── enums/                       # 枚举类
├── security/                         # 安全相关
│   ├── JwtTokenProvider.java        # JWT工具类
│   ├── JwtAuthenticationFilter.java # JWT过滤器
│   ├── UserDetailsImpl.java         # 用户详情实现
│   └── UserDetailsServiceImpl.java  # 用户详情服务
└── util/                            # 工具类
    ├── DateUtil.java
    ├── FileUtil.java
    ├── ValidationUtil.java
    └── PasswordUtil.java
```

---

## 📊 数据模型设计

### 核心实体定义

#### 1. 用户实体 (User)
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;        // 用户名
    
    @Column(nullable = false)
    private String password;        // 加密密码
    
    @Column(unique = true, nullable = false)
    private String email;           // 邮箱
    
    private String phone;           // 手机号
    
    @Column(nullable = false)
    private String realName;        // 真实姓名
    
    private String nickname;        // 昵称
    private String avatar;          // 头像URL
    
    @Enumerated(EnumType.STRING)
    private Gender gender;          // 性别: MALE/FEMALE/OTHER
    
    private LocalDate birthday;     // 生日
    private String studentId;       // 学号
    private String className;       // 班级名称
    private String major;           // 专业
    private String grade;           // 年级
    private Integer enrollmentYear; // 入学年份
    private Integer graduationYear; // 毕业年份
    
    @Enumerated(EnumType.STRING)
    private UserStatus status;      // 用户状态: ACTIVE/INACTIVE/SUSPENDED
    
    @Enumerated(EnumType.STRING)
    private UserRole role;          // 用户角色: STUDENT/TEACHER/ADMIN
    
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
```

#### 2. 动态实体 (Post)
```java
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;            // 作者
    
    private String title;           // 标题
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;         // 内容
    
    @ElementCollection
    @CollectionTable(name = "post_images")
    private List<String> images;    // 图片列表
    
    @Enumerated(EnumType.STRING)
    private PostType type;          // 类型: MOMENT/ARTICLE/ACTIVITY/NOTICE
    
    private String category;        // 分类
    
    @ElementCollection
    @CollectionTable(name = "post_tags")
    private Set<String> tags;       // 标签
    
    private Integer likes = 0;      // 点赞数
    private Integer comments = 0;   // 评论数
    private Integer shares = 0;     // 分享数
    private Integer views = 0;      // 浏览数
    
    @Enumerated(EnumType.STRING)
    private PostStatus status;      // 状态: PUBLISHED/DRAFT/DELETED
    
    private String location;        // 位置
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
```

#### 3. 活动实体 (Activity)
```java
@Entity
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;           // 活动标题
    
    @Column(nullable = false)
    private String description;     // 活动简介
    
    @Column(columnDefinition = "TEXT")
    private String content;         // 活动详情
    
    private String cover;           // 封面图片
    
    @ElementCollection
    @CollectionTable(name = "activity_images")
    private List<String> images;    // 活动图片
    
    @Enumerated(EnumType.STRING)
    private ActivityType type;      // 类型: ACADEMIC/ENTERTAINMENT/SPORTS/VOLUNTEER/OTHER
    
    @Enumerated(EnumType.STRING)
    private ActivityStatus status;  // 状态: DRAFT/PUBLISHED/ONGOING/ENDED/CANCELLED
    
    @Column(nullable = false)
    private String location;        // 活动地点
    
    @Column(nullable = false)
    private LocalDateTime startTime; // 开始时间
    
    @Column(nullable = false)
    private LocalDateTime endTime;   // 结束时间
    
    private Integer maxParticipants; // 最大参与人数
    private Integer currentParticipants = 0; // 当前参与人数
    private LocalDateTime registrationDeadline; // 报名截止时间
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;         // 组织者
    
    @ElementCollection
    @CollectionTable(name = "activity_tags")
    private Set<String> tags;       // 标签
    
    private String requirements;    // 参与要求
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
```

#### 4. 班级实体 (Class)
```java
@Entity
@Table(name = "classes")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name;            // 班级名称
    
    @Column(nullable = false)
    private String major;           // 专业
    
    @Column(nullable = false)
    private String grade;           // 年级
    
    @Column(nullable = false)
    private Integer enrollmentYear; // 入学年份
    
    private Integer graduationYear; // 毕业年份
    private String description;     // 班级介绍
    private String cover;           // 班级封面
    private String motto;           // 班级口号
    private Integer studentCount = 0; // 学生数量
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private User teacher;           // 班主任
    
    @Enumerated(EnumType.STRING)
    private ClassStatus status;     // 状态: ACTIVE/GRADUATED/INACTIVE
    
    private LocalDateTime createTime;
}
```

#### 5. 相册实体 (Album)
```java
@Entity
@Table(name = "albums")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;            // 相册名称
    
    private String description;     // 相册描述
    private String cover;           // 封面图片
    
    @Enumerated(EnumType.STRING)
    private AlbumType type;         // 类型: ENROLLMENT/MILITARY/CLASSROOM/CAMPUS/CLASS/DORMITORY/ACTIVITY/GRADUATION
    
    @Enumerated(EnumType.STRING)
    private AlbumVisibility visibility; // 可见性: PUBLIC/CLASS_ONLY/PRIVATE
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;           // 创建者
    
    private Integer photoCount = 0; // 照片数量
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
```

#### 6. 照片实体 (Photo)
```java
@Entity
@Table(name = "photos")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private Album album;            // 所属相册
    
    @Column(nullable = false)
    private String url;             // 图片URL
    
    private String thumbnail;       // 缩略图URL
    private String title;           // 照片标题
    private String description;     // 照片描述
    private String location;        // 拍摄地点
    private LocalDateTime shootTime; // 拍摄时间
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploader_id", nullable = false)
    private User uploader;          // 上传者
    
    @ElementCollection
    @CollectionTable(name = "photo_tags")
    private Set<String> tags;       // 标签
    
    private Integer likes = 0;      // 点赞数
    private LocalDateTime createTime;
}
```

### 枚举类型定义
```java
// 用户角色
public enum UserRole {
    STUDENT, TEACHER, ADMIN
}

// 用户状态
public enum UserStatus {
    ACTIVE, INACTIVE, SUSPENDED
}

// 性别
public enum Gender {
    MALE, FEMALE, OTHER
}

// 动态类型
public enum PostType {
    MOMENT, ARTICLE, ACTIVITY, NOTICE
}

// 动态状态
public enum PostStatus {
    PUBLISHED, DRAFT, DELETED
}

// 活动类型
public enum ActivityType {
    ACADEMIC, ENTERTAINMENT, SPORTS, VOLUNTEER, OTHER
}

// 活动状态
public enum ActivityStatus {
    DRAFT, PUBLISHED, ONGOING, ENDED, CANCELLED
}

// 相册类型
public enum AlbumType {
    ENROLLMENT, MILITARY, CLASSROOM, CAMPUS, CLASS, DORMITORY, ACTIVITY, GRADUATION
}

// 相册可见性
public enum AlbumVisibility {
    PUBLIC, CLASS_ONLY, PRIVATE
}
```

---

## 🔗 核心API接口规范

### 1. 认证相关接口

#### 用户注册
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "student001",
  "password": "password123",
  "email": "student001@fzit.edu.cn",
  "phone": "13800138000",
  "realName": "张三",
  "studentId": "202101001",
  "className": "计算机科学与技术2021级1班",
  "major": "计算机科学与技术"
}
```

#### 用户登录
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "student001",
  "password": "password123"
}

Response:
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "refreshToken": "refresh_token_here",
    "user": {
      "id": 1,
      "username": "student001",
      "email": "student001@fzit.edu.cn",
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

#### 刷新令牌
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

#### 用户登出
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### 2. 用户管理接口

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
  "nickname": "小张",
  "birthday": "2000-01-01"
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
GET /api/users?page=0&size=10&sort=createTime&direction=DESC&keyword=张三&role=STUDENT
Authorization: Bearer <token>
```

### 3. 动态管理接口

#### 获取动态列表
```http
GET /api/posts?page=0&size=10&type=MOMENT&category=学习&authorId=1
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

#### 点赞动态
```http
POST /api/posts/{id}/like
Authorization: Bearer <token>
```

#### 获取评论列表
```http
GET /api/posts/{postId}/comments?page=0&size=10
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

### 4. 活动管理接口

#### 获取活动列表
```http
GET /api/activities?page=0&size=10&type=ACADEMIC&status=PUBLISHED
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

### 5. 班级管理接口

#### 获取班级列表
```http
GET /api/classes?page=0&size=10&grade=2021&major=计算机科学与技术
```

#### 获取班级成员
```http
GET /api/classes/{id}/members?page=0&size=20
```

#### 获取我的班级
```http
GET /api/classes/me
Authorization: Bearer <token>
```

### 6. 相册系统接口

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

### 7. 消息通知接口

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
GET /api/notifications?page=0&size=10&type=LIKE&isRead=false
Authorization: Bearer <token>
```

### 8. 文件管理接口

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

### 9. 搜索功能接口

#### 全局搜索
```http
GET /api/search?keyword=Spring&type=ALL&page=0&size=10
```

#### 搜索建议
```http
GET /api/search/suggestions?keyword=Spr&type=USER
```

### 10. 统计分析接口

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

---

## ⚙️ 核心配置文件

### 1. application.yml
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
  
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
    password: ${REDIS_PASSWORD:}
    database: 0
  
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 50MB

jwt:
  secret: ${JWT_SECRET:fzit-alumni-secret-key-2024}
  expiration: 7200
  refresh-expiration: 604800

logging:
  level:
    com.fzit.alumni: INFO
```

### 2. pom.xml 核心依赖
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.fzit</groupId>
    <artifactId>alumni-system</artifactId>
    <version>1.0.0</version>
    <name>Alumni Communication System</name>
    <description>福州理工学院校友通讯系统</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        
        <!-- Database -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
        <!-- API Documentation -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.0.2</version>
        </dependency>
        
        <!-- Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

---

## 🔧 核心实现指导

### 1. 统一响应格式
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private Integer code;
    private String message;
    private T data;
    private LocalDateTime timestamp;
    private Boolean success;
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "操作成功", data, LocalDateTime.now(), true);
    }
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(200, message, data, LocalDateTime.now(), true);
    }
    
    public static <T> ApiResponse<T> error(Integer code, String message) {
        return new ApiResponse<>(code, message, null, LocalDateTime.now(), false);
    }
}
```

### 2. 分页响应格式
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {
    private List<T> content;
    private Long totalElements;
    private Integer totalPages;
    private Integer size;
    private Integer number;
    private Boolean first;
    private Boolean last;
    private Boolean empty;
    
    public static <T> PageResponse<T> of(Page<T> page) {
        return new PageResponse<>(
            page.getContent(),
            page.getTotalElements(),
            page.getTotalPages(),
            page.getSize(),
            page.getNumber(),
            page.isFirst(),
            page.isLast(),
            page.isEmpty()
        );
    }
}
```

### 3. JWT配置
```java
@Component
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private int jwtExpirationMs;
    
    public String generateToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs * 1000))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }
    
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
    
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
```

### 4. 全局异常处理
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(ApiResponse.error(1001, "参数验证失败"));
    }
    
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleUserNotFound(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error(1002, "用户不存在"));
    }
    
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error(1003, "密码错误"));
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Object>> handleAccessDenied(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiResponse.error(1005, "权限不足"));
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGlobalException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error(5000, "系统内部错误"));
    }
}
```

---

## 🚀 部署配置

### 1. Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/alumni-system-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 2. docker-compose.yml
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
    depends_on:
      - mysql
      - redis

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

volumes:
  mysql_data:
  redis_data:
```

---

## 📝 生成指令

### 给其他AI的指令模板

```
请根据以下规范为福州理工学院校友通讯系统生成完整的Spring Boot后端代码：

### 项目要求：
1. 使用Spring Boot 3.2+ + Spring Security 6.x + MySQL 8.0+ + Redis 7.x
2. 实现JWT无状态认证授权
3. 严格按照提供的数据模型和API接口规范
4. 使用统一的响应格式和异常处理
5. 实现完整的CRUD操作和业务逻辑
6. 包含参数验证和权限控制
7. 支持分页查询和条件筛选
8. 提供完整的项目结构和配置文件

### 核心功能模块：
- 用户认证管理（注册/登录/JWT）
- 动态社交系统（发布/评论/点赞）
- 活动管理系统（创建/报名/管理）
- 班级管理系统（信息/成员管理）
- 相册照片系统（上传/管理/展示）
- 消息通知系统（私信/通知推送）
- 文件管理系统（上传/下载/管理）
- 搜索功能系统（全局搜索/建议）
- 统计分析系统（数据统计/分析）

### 请严格按照上述文档中的：
1. 数据模型设计（实体类定义）
2. API接口规范（路径/参数/响应）
3. 项目结构组织（包结构/文件组织）
4. 核心配置文件（application.yml/pom.xml）
5. 统一响应格式和异常处理

### 生成要求：
1. 代码规范整洁，注释完整
2. 实现所有核心业务逻辑
3. 包含完整的错误处理机制
4. 支持跨域访问配置
5. 提供Docker部署配置
6. 确保代码可直接运行

请开始生成完整的Spring Boot项目代码。
```

---

## 📊 项目完成检查清单

### 必需实现的功能：
- [ ] 用户注册/登录/JWT认证
- [ ] 用户信息管理和头像上传
- [ ] 动态发布/编辑/删除/点赞/评论
- [ ] 活动创建/管理/报名/取消
- [ ] 班级信息管理和成员管理
- [ ] 相册创建和照片上传（单个/批量）
- [ ] 私信消息和系统通知
- [ ] 文件上传和管理功能
- [ ] 全局搜索和搜索建议
- [ ] 系统统计和用户统计
- [ ] 权限控制和角色管理
- [ ] 统一异常处理和响应格式
- [ ] 分页查询和条件筛选
- [ ] 跨域配置和安全设置

### 技术实现检查：
- [ ] Spring Security JWT配置
- [ ] JPA实体关系映射
- [ ] Redis缓存集成
- [ ] 参数验证注解
- [ ] 全局异常处理器
- [ ] 统一响应格式
- [ ] 分页查询支持
- [ ] 文件上传处理
- [ ] 跨域CORS配置
- [ ] Docker容器化配置

### 代码质量检查：
- [ ] 代码注释完整清晰
- [ ] 异常处理机制完善
- [ ] 日志记录规范统一
- [ ] 配置文件环境分离
- [ ] 数据库连接池配置
- [ ] 安全配置完整
- [ ] 性能优化考虑
- [ ] 测试用例覆盖

---

**说明：** 本指南提供了完整的Spring Boot后端生成规范，包含详细的数据模型、API接口、配置文件和实现指导。按照此指南生成的后端代码将与现有的73个前端页面完美对接，支持所有业务功能。

**使用方法：** 将此文档提供给其他AI（如ChatGPT），并使用底部的"生成指令模板"来请求生成完整的Spring Boot项目代码。
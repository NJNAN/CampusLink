# 福州理工学院校友通讯系统 - Spring Boot 后端

## 项目概述

基于Spring Boot 3.2+的校友通讯系统后端API，提供完整的用户管理、动态社交、活动管理、班级管理等功能。

## 技术栈

- **框架**: Spring Boot 3.2+
- **安全**: Spring Security 6.x + JWT
- **数据库**: MySQL 8.0+ + Spring Data JPA
- **缓存**: Redis 7.x
- **文件存储**: MinIO
- **消息队列**: RabbitMQ
- **文档**: SpringDoc OpenAPI 3.x
- **构建工具**: Maven 3.9+
- **Java版本**: JDK 17+

## 项目结构

```
src/main/java/com/fzit/alumni/
├── AlumniApplication.java              # 启动类
├── config/                             # 配置类
│   ├── SecurityConfig.java            # 安全配置
│   ├── JwtConfig.java                 # JWT配置
│   ├── RedisConfig.java               # Redis配置
│   ├── MinioConfig.java               # MinIO配置
│   ├── WebConfig.java                 # Web配置
│   └── SwaggerConfig.java             # API文档配置
├── controller/                         # 控制器
│   ├── AuthController.java            # 认证控制器
│   ├── UserController.java            # 用户控制器
│   ├── PostController.java            # 动态控制器
│   ├── ActivityController.java        # 活动控制器
│   ├── ClassController.java           # 班级控制器
│   ├── AlbumController.java           # 相册控制器
│   ├── MessageController.java         # 消息控制器
│   ├── FileController.java            # 文件控制器
│   └── AdminController.java           # 管理控制器
├── service/                            # 业务服务
│   ├── AuthService.java               # 认证服务
│   ├── UserService.java               # 用户服务
│   ├── PostService.java               # 动态服务
│   ├── ActivityService.java           # 活动服务
│   ├── ClassService.java              # 班级服务
│   ├── AlbumService.java              # 相册服务
│   ├── MessageService.java            # 消息服务
│   ├── FileService.java               # 文件服务
│   └── NotificationService.java       # 通知服务
├── repository/                         # 数据访问
│   ├── UserRepository.java            # 用户数据访问
│   ├── PostRepository.java            # 动态数据访问
│   ├── ActivityRepository.java        # 活动数据访问
│   ├── ClassRepository.java           # 班级数据访问
│   └── ...
├── entity/                             # 实体类
│   ├── User.java                      # 用户实体
│   ├── Post.java                      # 动态实体
│   ├── Activity.java                  # 活动实体
│   ├── Class.java                     # 班级实体
│   └── ...
├── dto/                                # 数据传输对象
│   ├── request/                       # 请求DTO
│   │   ├── LoginRequest.java          # 登录请求
│   │   ├── RegisterRequest.java       # 注册请求
│   │   └── ...
│   └── response/                      # 响应DTO
│       ├── UserResponse.java          # 用户响应
│       ├── PostResponse.java          # 动态响应
│       └── ...
├── common/                             # 公共组件
│   ├── ApiResponse.java               # 统一响应格式
│   ├── PageResponse.java              # 分页响应
│   ├── ResultCode.java                # 响应码枚举
│   ├── GlobalExceptionHandler.java    # 全局异常处理
│   └── Constants.java                 # 常量定义
├── security/                           # 安全组件
│   ├── JwtAuthenticationFilter.java   # JWT认证过滤器
│   ├── JwtTokenProvider.java          # JWT令牌提供者
│   ├── UserDetailsServiceImpl.java    # 用户详情服务
│   └── SecurityUtils.java             # 安全工具类
└── util/                               # 工具类
    ├── DateUtils.java                 # 日期工具
    ├── FileUtils.java                 # 文件工具
    ├── ValidationUtils.java           # 验证工具
    └── ...
```

## 数据库设计

### 用户表 (users)
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    real_name VARCHAR(50) NOT NULL,
    nickname VARCHAR(50),
    avatar VARCHAR(500),
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    birthday DATE,
    student_id VARCHAR(20) UNIQUE,
    class_name VARCHAR(100),
    major VARCHAR(100),
    grade VARCHAR(10),
    enrollment_year INT,
    graduation_year INT,
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    role ENUM('STUDENT', 'ADMIN', 'TEACHER') DEFAULT 'STUDENT',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 动态表 (posts)
```sql
CREATE TABLE posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    author_id BIGINT NOT NULL,
    title VARCHAR(200),
    content TEXT NOT NULL,
    images JSON,
    type ENUM('MOMENT', 'ARTICLE', 'ACTIVITY', 'NOTICE') DEFAULT 'MOMENT',
    category VARCHAR(50),
    tags JSON,
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    shares INT DEFAULT 0,
    views INT DEFAULT 0,
    status ENUM('PUBLISHED', 'DRAFT', 'DELETED') DEFAULT 'PUBLISHED',
    location VARCHAR(200),
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);
```

### 活动表 (activities)
```sql
CREATE TABLE activities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    content TEXT,
    cover VARCHAR(500),
    images JSON,
    type ENUM('ACADEMIC', 'ENTERTAINMENT', 'SPORTS', 'VOLUNTEER', 'OTHER') DEFAULT 'ACADEMIC',
    status ENUM('DRAFT', 'PUBLISHED', 'ONGOING', 'ENDED', 'CANCELLED') DEFAULT 'DRAFT',
    location VARCHAR(200) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    max_participants INT,
    current_participants INT DEFAULT 0,
    registration_deadline TIMESTAMP,
    organizer_id BIGINT NOT NULL,
    tags JSON,
    requirements TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id)
);
```

## 快速开始

### 1. 环境要求
- JDK 17+
- Maven 3.9+
- MySQL 8.0+
- Redis 7.x
- MinIO (可选)

### 2. 克隆项目
```bash
git clone https://github.com/your-org/fzit-alumni-backend.git
cd fzit-alumni-backend
```

### 3. 配置数据库
```sql
CREATE DATABASE alumni_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'alumni'@'%' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON alumni_system.* TO 'alumni'@'%';
FLUSH PRIVILEGES;
```

### 4. 配置环境变量
```bash
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=alumni_system
export DB_USERNAME=alumni
export DB_PASSWORD=password123

export REDIS_HOST=localhost
export REDIS_PORT=6379
export REDIS_PASSWORD=

export JWT_SECRET=your-secret-key-here
export MINIO_URL=http://localhost:9000
export MINIO_ACCESS_KEY=minioadmin
export MINIO_SECRET_KEY=minioadmin
```

### 5. 启动项目
```bash
# 开发环境
mvn spring-boot:run

# 生产环境
mvn clean package
java -jar target/alumni-system-1.0.0.jar
```

### 6. 访问API文档
- Swagger UI: http://localhost:8080/swagger-ui.html
- API Docs: http://localhost:8080/v3/api-docs

## 接口测试

### 注册用户
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "student123",
    "password": "password123",
    "email": "student123@fzit.edu.cn",
    "phone": "13800138000",
    "realName": "张三",
    "studentId": "2021001001",
    "className": "计算机科学与技术2021级1班",
    "major": "计算机科学与技术"
  }'
```

### 用户登录
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "student123",
    "password": "password123"
  }'
```

### 获取用户信息
```bash
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer <your-token>"
```

## Docker部署

### 1. 构建镜像
```bash
docker build -t fzit-alumni-backend .
```

### 2. 使用Docker Compose
```bash
docker-compose up -d
```

## 开发指南

### 1. 代码规范
- 使用Google Java Style Guide
- 所有公共方法必须有Javadoc注释
- 使用SLF4J进行日志记录
- 遵循RESTful API设计原则

### 2. 测试规范
- 单元测试覆盖率 > 80%
- 使用TestContainers进行集成测试
- 使用WireMock模拟外部服务

### 3. 提交规范
- 使用Conventional Commits规范
- 每个提交只包含一个功能或修复
- 提交信息使用中文描述

## 监控运维

### 1. 健康检查
```bash
curl http://localhost:8080/actuator/health
```

### 2. 指标监控
- 应用指标: http://localhost:8080/actuator/metrics
- JVM指标: http://localhost:8080/actuator/metrics/jvm.memory.used

### 3. 日志配置
```yaml
logging:
  level:
    com.fzit.alumni: DEBUG
    org.springframework.security: INFO
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/alumni-system.log
```

## 常见问题

### Q: 如何重置JWT密钥？
A: 修改环境变量JWT_SECRET并重启应用。

### Q: 如何增加新的用户角色？
A: 修改User实体的role枚举，更新数据库，重新启动应用。

### Q: 如何配置文件上传大小限制？
A: 在application.yml中配置spring.servlet.multipart.max-file-size。

## 贡献指南

1. Fork项目
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'feat: 添加某个功能'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 创建Pull Request

## 许可证

本项目采用MIT许可证 - 查看[LICENSE](LICENSE)文件了解详情。

## 联系方式

- 项目维护者: 福州理工学院校友会
- 邮箱: alumni@fzit.edu.cn
- 项目地址: https://github.com/your-org/fzit-alumni-backend
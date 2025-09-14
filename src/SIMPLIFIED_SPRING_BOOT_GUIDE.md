# 福州理工学院校友通讯网 - 简化版Spring Boot实现指南

## 🎯 概述

本文档为AI生成Spring Boot后端提供简化的实现参考，包含核心配置、实体设计、控制器结构等。

## 📦 项目结构

```
src/main/java/cn/edu/fzit/alumni/
├── AlumniApplication.java              # 启动类
├── config/                             # 配置类
│   ├── SecurityConfig.java             # 安全配置
│   ├── WebConfig.java                  # Web配置
│   └── SwaggerConfig.java              # API文档配置
├── controller/                         # 控制器
│   ├── AuthController.java             # 认证控制器
│   ├── UserController.java             # 用户控制器
│   ├── PostController.java             # 动态控制器
│   ├── ActivityController.java         # 活动控制器
│   ├── ClassController.java            # 班级控制器
│   ├── AlbumController.java            # 相册控制器
│   ├── MessageController.java          # 消息控制器
│   ├── FileController.java             # 文件控制器
│   └── StatisticsController.java       # 统计控制器
├── entity/                             # 实体类
│   ├── User.java                       # 用户实体
│   ├── Post.java                       # 动态实体
│   ├── Activity.java                   # 活动实体
│   ├── Class.java                      # 班级实体
│   ├── Album.java                      # 相册实体
│   ├── Photo.java                      # 照片实体
│   └── Message.java                    # 消息实体
├── repository/                         # 数据访问层
├── service/                            # 业务逻辑层
├── dto/                               # 数据传输对象
├── security/                          # 安全相关
└── exception/                         # 异常处理
```

## 🔧 核心配置

### 1. 主要依赖 (pom.xml)

```xml
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
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
    </dependency>
    
    <!-- Database -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    
    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    
    <!-- Swagger/OpenAPI -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.2.0</version>
    </dependency>
</dependencies>
```

### 2. 应用配置 (application.yml)

```yaml
server:
  port: 8080

spring:
  profiles:
    active: dev
  
  datasource:
    url: jdbc:mysql://localhost:3306/fuzhou_tech_alumni?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=GMT%2B8
    username: alumni_user
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        format_sql: true

# JWT配置
jwt:
  secret: YourSecretKeyHereMustBeLongEnoughForHS256Algorithm
  expiration: 86400000  # 24小时

# 文件上传配置
file:
  upload-dir: ./uploads
  max-size: 10MB

# CORS配置
app:
  cors:
    allowed-origins:
      - http://localhost:3000
      - http://localhost:5173
      - https://your-frontend-domain.com

# API文档配置
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
```

## 📊 核心实体设计

### 1. 用户实体 (User.java)

```java
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

enum Gender { MALE, FEMALE, OTHER }
enum UserStatus { ACTIVE, INACTIVE, SUSPENDED }
enum UserRole { STUDENT, TEACHER, ADMIN }
```

### 2. 动态实体 (Post.java)

```java
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
    
    @ElementCollection
    @CollectionTable(name = "post_images")
    private List<String> images = new ArrayList<>();
    
    @Enumerated(EnumType.STRING)
    private PostType type;
    
    private String category;
    
    @ElementCollection
    @CollectionTable(name = "post_tags")
    private List<String> tags = new ArrayList<>();
    
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

enum PostType { MOMENT, ARTICLE, ACTIVITY, NOTICE }
enum PostStatus { PUBLISHED, DRAFT, DELETED }
```

## 🎮 核心控制器结构

### 1. 认证控制器 (AuthController.java)

```java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Validated
@Slf4j
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody @Valid LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ApiResponse.success("登录成功", response);
        } catch (Exception e) {
            log.error("登录失败", e);
            return ApiResponse.error(400, e.getMessage());
        }
    }
    
    @PostMapping("/register")
    public ApiResponse<User> register(@RequestBody @Valid RegisterRequest request) {
        try {
            User user = authService.register(request);
            return ApiResponse.success("注册成功", user);
        } catch (Exception e) {
            log.error("注册失败", e);
            return ApiResponse.error(400, e.getMessage());
        }
    }
    
    @PostMapping("/logout")
    public ApiResponse<Void> logout(HttpServletRequest request) {
        authService.logout(request);
        return ApiResponse.success("登出成功", null);
    }
    
    @GetMapping("/captcha")
    public ApiResponse<CaptchaResponse> getCaptcha() {
        CaptchaResponse captcha = authService.generateCaptcha();
        return ApiResponse.success("获取验证码成功", captcha);
    }
}
```

### 2. 用户控制器 (UserController.java)

```java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('STUDENT') or hasRole('TEACHER') or hasRole('ADMIN')")
@Validated
@Slf4j
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
        Map<String, String> result = Map.of("avatarUrl", avatarUrl);
        return ApiResponse.success("头像上传成功", result);
    }
    
    @GetMapping("/{id}")
    public ApiResponse<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ApiResponse.success("获取成功", user);
    }
    
    @GetMapping("/search")
    public ApiResponse<Page<User>> searchUsers(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userService.searchUsers(keyword, pageable);
        return ApiResponse.success("搜索成功", users);
    }
}
```

## 🔐 安全配置

### SecurityConfig.java

```java
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/swagger-ui/**", "/api-docs/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
            
        // 添加JWT过滤器
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

## 🌐 跨域配置

### WebConfig.java

```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

## 📄 统一响应格式

### ApiResponse.java

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;
    private boolean success;
    private String timestamp;
    
    public static <T> ApiResponse<T> success(String message, T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(200);
        response.setMessage(message);
        response.setData(data);
        response.setSuccess(true);
        response.setTimestamp(LocalDateTime.now().toString());
        return response;
    }
    
    public static <T> ApiResponse<T> error(int code, String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setCode(code);
        response.setMessage(message);
        response.setData(null);
        response.setSuccess(false);
        response.setTimestamp(LocalDateTime.now().toString());
        return response;
    }
}
```

## 🛠️ 开发建议

### 1. 数据库设计原则
- 使用标准的命名约定（下划线分隔）
- 为所有表添加创建时间和更新时间字段
- 合理使用索引，特别是查询频繁的字段
- 外键关系要清晰，避免循环依赖

### 2. API设计原则
- 遵循RESTful设计规范
- 统一的错误处理和响应格式
- 合理的HTTP状态码使用
- 详细的API文档注释

### 3. 安全考虑
- JWT Token的合理过期时间设置
- 敏感信息加密存储
- 输入参数验证和SQL注入防护
- 文件上传类型和大小限制

### 4. 性能优化
- 数据库查询优化，避免N+1问题
- 合理使用缓存（Redis）
- 分页查询避免全表扫描
- 图片文件压缩和CDN加速

## 🚀 部署配置

### Docker配置 (Dockerfile)

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/alumni-backend-1.0.0.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-Xmx512m -Xms256m"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

### Docker Compose配置

```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/fuzhou_tech_alumni
      - SPRING_DATASOURCE_USERNAME=alumni_user
      - SPRING_DATASOURCE_PASSWORD=your_password
    depends_on:
      - mysql
      
  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root_password
      - MYSQL_DATABASE=fuzhou_tech_alumni
      - MYSQL_USER=alumni_user
      - MYSQL_PASSWORD=your_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

## 📚 参考资源

- [Spring Boot官方文档](https://spring.io/projects/spring-boot)
- [Spring Security参考](https://docs.spring.io/spring-security/reference/)
- [JPA/Hibernate文档](https://hibernate.org/orm/documentation/)
- [MySQL官方文档](https://dev.mysql.com/doc/)

---

这个简化指南提供了Spring Boot后端实现的核心结构和配置，AI可以基于这个框架快速生成完整的后端代码。重点关注API接口的实现、数据库设计和安全配置。
# 🚀 Spring Boot 集成指南

## 📋 概述

本指南详细介绍如何将前端React应用与Spring Boot后端集成，实现完整的福州理工学院校友通讯网系统。

## 🎯 集成架构

```
前端 (React + TypeScript)
    ↓ HTTP/HTTPS
Spring Boot 应用
    ↓ JPA/Hibernate  
MySQL 数据库
    ↓ 缓存
Redis 缓存
    ↓ 文件存储
文件系统/对象存储
```

## 📦 项目结构

### 后端项目结构
```
src/
├── main/
│   ├── java/
│   │   └── cn/edu/fzit/alumni/
│   │       ├── AlumniApplication.java          # 启动类
│   │       ├── config/                         # 配置类
│   │       │   ├── SecurityConfig.java         # 安全配置
│   │       │   ├── WebConfig.java             # Web配置
│   │       │   ├── RedisConfig.java           # Redis配置
│   │       │   └── SwaggerConfig.java         # API文档配置
│   │       ├── controller/                     # 控制器
│   │       │   ├── AuthController.java        # 认证控制器
│   │       │   ├── UserController.java        # 用户控制器
│   │       │   ├── PostController.java        # 动态控制器
│   │       │   └── ...
│   │       ├── entity/                         # 实体类
│   │       │   ├── User.java                  # 用户实体
│   │       │   ├── Post.java                  # 动态实体
│   │       │   └── ...
│   │       ├── repository/                     # 数据访问层
│   │       │   ├── UserRepository.java        # 用户Repository
│   │       │   ├── PostRepository.java        # 动态Repository
│   │       │   └── ...
│   │       ├── service/                        # 业务逻辑层
│   │       │   ├── AuthService.java           # 认证服务
│   │       │   ├── UserService.java           # 用户服务
│   │       │   └── ...
│   │       ├── dto/                           # 数据传输对象
│   │       │   ├── request/                   # 请求DTO
│   │       │   └── response/                  # 响应DTO
│   │       ├── security/                      # 安全相关
│   │       │   ├── JwtTokenProvider.java      # JWT工具类
│   │       │   ├── JwtAuthenticationFilter.java # JWT过滤器
│   │       │   └── UserPrincipal.java         # 用户主体
│   │       ├── exception/                     # 异常处理
│   │       │   ├── GlobalExceptionHandler.java # 全局异常处理
│   │       │   └── CustomException.java       # 自定义异常
│   │       └── util/                          # 工具类
│   │           ├── FileUtils.java             # 文件工具
│   │           ├── ValidationUtils.java       # 验证工具
│   │           └── DateUtils.java             # 日期工具
│   └── resources/
│       ├── application.yml                    # 主配置文件
│       ├── application-dev.yml                # 开发环境配置
│       ├── application-prod.yml               # 生产环境配置
│       ├── db/migration/                      # 数据库迁移脚本
│       └── static/                           # 静态资源
└── test/                                     # 测试代码
```

## 🔧 集成步骤

### 1. 创建Spring Boot项目

使用Spring Initializr创建项目，选择以下依赖：
- Spring Web
- Spring Security
- Spring Data JPA
- MySQL Driver
- Spring Data Redis
- Validation
- Spring Boot DevTools

### 2. 配置数据库连接

在`application.yml`中配置数据库连接：

```yaml
spring:
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
```

### 3. 创建实体类

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
```

### 4. 创建Repository层

```java
// UserRepository.java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByStudentId(String studentId);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    boolean existsByStudentId(String studentId);
    
    @Query("SELECT u FROM User u WHERE u.realName LIKE %:keyword% OR u.username LIKE %:keyword% OR u.studentId LIKE %:keyword%")
    Page<User> searchUsers(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT u FROM User u WHERE u.className = :className")
    List<User> findByClassName(@Param("className") String className);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.createTime >= :startDate")
    Long countNewUsersAfterDate(@Param("startDate") LocalDateTime startDate);
}
```

### 5. 创建Service层

```java
// UserService.java
@Service
@Transactional
@Slf4j
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private FileStorageService fileStorageService;
    
    public User getCurrentUser(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userRepository.findById(userPrincipal.getId())
            .orElseThrow(() -> new ResourceNotFoundException("用户不存在"));
    }
    
    public User updateCurrentUser(UpdateUserRequest request, Authentication authentication) {
        User user = getCurrentUser(authentication);
        
        // 更新用户信息
        if (request.getNickname() != null) {
            user.setNickname(request.getNickname());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getBirthday() != null) {
            user.setBirthday(request.getBirthday());
        }
        if (request.getGender() != null) {
            user.setGender(request.getGender());
        }
        
        return userRepository.save(user);
    }
    
    public String uploadAvatar(MultipartFile file, Authentication authentication) {
        User user = getCurrentUser(authentication);
        
        // 验证文件
        validateImageFile(file);
        
        // 删除旧头像
        if (user.getAvatar() != null) {
            fileStorageService.deleteFile(user.getAvatar());
        }
        
        // 上传新头像
        String fileName = fileStorageService.storeFile(file, "avatars");
        String avatarUrl = fileStorageService.getFileUrl(fileName);
        
        // 更新用户头像
        user.setAvatar(avatarUrl);
        userRepository.save(user);
        
        return avatarUrl;
    }
    
    private void validateImageFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BadRequestException("文件不能为空");
        }
        
        if (file.getSize() > 2 * 1024 * 1024) { // 2MB
            throw new BadRequestException("文件大小不能超过2MB");
        }
        
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new BadRequestException("只支持图片文件");
        }
    }
}
```

### 6. 创建Controller层

```java
// UserController.java
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
        try {
            User user = userService.getCurrentUser(authentication);
            return ApiResponse.success("获取成功", user);
        } catch (Exception e) {
            log.error("获取当前用户信息失败", e);
            return ApiResponse.error(500, "获取用户信息失败");
        }
    }
    
    @PutMapping("/me")
    public ApiResponse<User> updateCurrentUser(
            @RequestBody @Valid UpdateUserRequest request,
            Authentication authentication) {
        try {
            User user = userService.updateCurrentUser(request, authentication);
            return ApiResponse.success("更新成功", user);
        } catch (Exception e) {
            log.error("更新用户信息失败", e);
            return ApiResponse.error(500, "更新用户信息失败");
        }
    }
    
    @PostMapping("/me/avatar")
    public ApiResponse<Map<String, String>> uploadAvatar(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        try {
            String avatarUrl = userService.uploadAvatar(file, authentication);
            Map<String, String> result = new HashMap<>();
            result.put("avatarUrl", avatarUrl);
            return ApiResponse.success("头像上传成功", result);
        } catch (BadRequestException e) {
            return ApiResponse.error(400, e.getMessage());
        } catch (Exception e) {
            log.error("头像上传失败", e);
            return ApiResponse.error(500, "头像上传失败");
        }
    }
    
    @GetMapping("/{id}")
    public ApiResponse<User> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ApiResponse.success("获取成功", user);
        } catch (ResourceNotFoundException e) {
            return ApiResponse.error(404, e.getMessage());
        } catch (Exception e) {
            log.error("获取用户信息失败", e);
            return ApiResponse.error(500, "获取用户信息失败");
        }
    }
    
    @GetMapping("/search")
    public ApiResponse<Page<User>> searchUsers(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createTime") String sort,
            @RequestParam(defaultValue = "DESC") String direction) {
        try {
            Pageable pageable = PageRequest.of(page, size, 
                Sort.Direction.fromString(direction), sort);
            Page<User> users = userService.searchUsers(keyword, pageable);
            return ApiResponse.success("搜索成功", users);
        } catch (Exception e) {
            log.error("搜索用户失败", e);
            return ApiResponse.error(500, "搜索用户失败");
        }
    }
}
```

### 7. JWT认证集成

```java
// JwtTokenProvider.java
@Component
@Slf4j
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private long jwtExpirationInMs;
    
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date expiryDate = new Date(System.currentTimeMillis() + jwtExpirationInMs);
        
        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        
        return Long.parseLong(claims.getSubject());
    }
    
    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error("JWT token validation failed", e);
        }
        return false;
    }
}

// JwtAuthenticationFilter.java
@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
            
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                Long userId = tokenProvider.getUserIdFromToken(jwt);
                UserDetails userDetails = customUserDetailsService.loadUserById(userId);
                UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception ex) {
            log.error("Could not set user authentication in security context", ex);
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
```

### 8. 安全配置

```java
// SecurityConfig.java
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Slf4j
public class SecurityConfig {
    
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    
    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;
    
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
    
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/swagger-ui/**", "/api-docs/**").permitAll()
                .requestMatchers("/files/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/*/public/**").permitAll()
                .anyRequest().authenticated()
            );
        
        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### 9. 跨域配置

```java
// WebConfig.java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    @Value("${app.cors.allowed-origins}")
    private List<String> allowedOrigins;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins.toArray(new String[0]))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 静态文件访问
        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:" + uploadPath + "/");
    }
    
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // JSON消息转换器配置
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        converter.setObjectMapper(objectMapper);
        converters.add(converter);
    }
}
```

### 10. 全局异常处理

```java
// GlobalExceptionHandler.java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationException(
            MethodArgumentNotValidException ex) {
        
        List<String> errors = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());
        
        String message = String.join(", ", errors);
        ApiResponse<Object> response = ApiResponse.error(400, message);
        
        return ResponseEntity.badRequest().body(response);
    }
    
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleConstraintViolationException(
            ConstraintViolationException ex) {
        
        List<String> errors = ex.getConstraintViolations()
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.toList());
        
        String message = String.join(", ", errors);
        ApiResponse<Object> response = ApiResponse.error(400, message);
        
        return ResponseEntity.badRequest().body(response);
    }
    
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadRequestException(
            BadRequestException ex) {
        ApiResponse<Object> response = ApiResponse.error(400, ex.getMessage());
        return ResponseEntity.badRequest().body(response);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(
            ResourceNotFoundException ex) {
        ApiResponse<Object> response = ApiResponse.error(404, ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Object>> handleAccessDeniedException(
            AccessDeniedException ex) {
        ApiResponse<Object> response = ApiResponse.error(403, "权限不足");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }
    
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<Object>> handleAuthenticationException(
            AuthenticationException ex) {
        ApiResponse<Object> response = ApiResponse.error(401, "认证失败");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(Exception ex) {
        log.error("Unexpected error occurred", ex);
        ApiResponse<Object> response = ApiResponse.error(500, "系统内部错误");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
```

## 🔄 前后端集成

### 1. 环境变量配置

在前端项目根目录创建`.env`文件：

```env
# API基础URL
REACT_APP_API_BASE_URL=http://localhost:8080/api

# 文件访问URL
REACT_APP_FILE_BASE_URL=http://localhost:8080/files

# WebSocket URL
REACT_APP_WS_URL=ws://localhost:8080/ws

# 应用配置
REACT_APP_NAME=福州理工学院校友通讯网
REACT_APP_VERSION=1.0.0
```

### 2. API调用集成

更新前端API配置：

```typescript
// utils/api/index.ts
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
export const FILE_BASE_URL = process.env.REACT_APP_FILE_BASE_URL || 'http://localhost:8080/files';
```

### 3. 认证状态管理

创建认证Context：

```typescript
// contexts/AuthContext.tsx
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await services.user.getCurrentUser();
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (credentials: LoginRequest) => {
    const response = await services.auth.login(credentials);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    services.auth.logout();
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (loading) {
    return <FullScreenLoader message="检查登录状态..." />;
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 4. 更新App.tsx使用AuthContext

```typescript
// App.tsx
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

// AppRoutes.tsx
const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Routes>
      {user?.role === 'STUDENT' && (
        <Route path="/h5/*" element={<MobileLayout><H5Routes /></MobileLayout>} />
      )}
      {(user?.role === 'ADMIN' || user?.role === 'TEACHER') && (
        <Route path="/admin/*" element={<AdminLayout><AdminRoutes /></AdminLayout>} />
      )}
      <Route path="*" element={<Navigate to={user?.role === 'STUDENT' ? '/h5' : '/admin'} />} />
    </Routes>
  );
};
```

## 📚 开发工具集成

### 1. API文档 (Swagger)

```java
// SwaggerConfig.java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("cn.edu.fzit.alumni.controller"))
                .paths(PathSelectors.regex("/api.*"))
                .build()
                .apiInfo(apiInfo())
                .securitySchemes(Arrays.asList(apiKey()))
                .securityContexts(Arrays.asList(securityContext()));
    }
    
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("福州理工学院校友通讯网 API")
                .description("福州理工学院校友通讯网后端API接口文档")
                .version("1.0.0")
                .contact(new Contact("开发团队", "https://fzit.edu.cn", "dev@fzit.edu.cn"))
                .build();
    }
    
    private ApiKey apiKey() {
        return new ApiKey("JWT", "Authorization", "header");
    }
    
    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.regex("/api.*"))
                .build();
    }
    
    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
    }
}
```

访问API文档：`http://localhost:8080/swagger-ui.html`

### 2. 数据库迁移 (Flyway)

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-mysql</artifactId>
</dependency>
```

创建迁移脚本：`src/main/resources/db/migration/V1__Initial_schema.sql`

```sql
-- V1__Initial_schema.sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    real_name VARCHAR(50) NOT NULL,
    nickname VARCHAR(50),
    avatar VARCHAR(255),
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    birthday DATE,
    student_id VARCHAR(20) UNIQUE,
    class_name VARCHAR(100),
    major VARCHAR(100),
    grade VARCHAR(10),
    enrollment_year INT,
    graduation_year INT,
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    role ENUM('STUDENT', 'TEACHER', 'ADMIN') DEFAULT 'STUDENT',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_student_id (student_id),
    INDEX idx_class_name (class_name),
    INDEX idx_create_time (create_time)
);

-- 插入默认管理员用户
INSERT INTO users (username, password, email, real_name, role) VALUES 
('admin', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqyc5ByQx.BqmSCWT9rTkxy', 'admin@fzit.edu.cn', '系统管理员', 'ADMIN');
```

## 🚀 部署指南

### 1. 本地开发环境启动

```bash
# 启动后端
cd backend
mvn spring-boot:run

# 启动前端
cd frontend
npm install
npm start
```

### 2. Docker容器化部署

```bash
# 构建并运行
docker-compose up -d

# 查看日志
docker-compose logs -f alumni-app

# 停止服务
docker-compose down
```

### 3. 生产环境部署

```bash
# 1. 构建前端
cd frontend
npm run build

# 2. 构建后端
cd backend
mvn clean package -Dmaven.test.skip=true

# 3. 部署到服务器
scp target/alumni-system-1.0.0.jar user@server:/app/
scp docker-compose.yml user@server:/app/

# 4. 在服务器上启动
ssh user@server
cd /app
docker-compose up -d
```

## 📊 监控和运维

### 1. 应用监控

Spring Boot Actuator端点：
- `/actuator/health` - 健康检查
- `/actuator/metrics` - 指标监控
- `/actuator/info` - 应用信息
- `/actuator/loggers` - 日志级别管理

### 2. 日志配置

```yaml
# application.yml
logging:
  level:
    cn.edu.fzit.alumni: DEBUG
    org.springframework.web: INFO
  pattern:
    file: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n"
  file:
    name: logs/alumni-system.log
    max-size: 100MB
    max-history: 30
```

### 3. 性能优化

- 数据库连接池调优
- Redis缓存策略
- JVM参数优化
- 静态资源CDN
- 数据库索引优化

## 🔒 安全最佳实践

### 1. 密码安全
- 使用BCrypt加密
- 密码强度验证
- 登录失败锁定

### 2. API安全
- JWT令牌过期机制
- CORS配置
- 输入验证和转义
- SQL注入防护

### 3. 文件上传安全
- 文件类型验证
- 文件大小限制
- 病毒扫描
- 存储路径隔离

## 📋 测试策略

### 1. 单元测试

```java
@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
class UserServiceTest {
    
    @Autowired
    private UserService userService;
    
    @MockBean
    private UserRepository userRepository;
    
    @Test
    void shouldGetCurrentUser() {
        // Given
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        
        // When
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        
        // Then
        User result = userService.getUserById(1L);
        assertEquals("testuser", result.getUsername());
    }
}
```

### 2. 集成测试

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class UserControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldGetCurrentUser() {
        // 测试获取当前用户接口
        ResponseEntity<ApiResponse<User>> response = restTemplate
            .withBasicAuth("testuser", "password")
            .exchange("/api/users/me", HttpMethod.GET, null, 
                new ParameterizedTypeReference<ApiResponse<User>>() {});
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody().getData());
    }
}
```

## 📈 项目维护

### 1. 版本管理
- 语义化版本控制
- 变更日志维护
- 发布流程标准化

### 2. 代码质量
- SonarQube代码扫描
- CheckStyle代码规范
- PMD代码分析
- 单元测试覆盖率

### 3. 文档维护
- API文档自动生成
- 开发文档更新
- 部署文档完善

---

## 🎯 总结

本集成指南提供了完整的Spring Boot后端与React前端集成方案，包括：

✅ **完整的项目结构** - 标准的Spring Boot项目组织  
✅ **详细的配置文件** - 开发、测试、生产环境配置  
✅ **安全认证机制** - JWT + Spring Security  
✅ **数据访问层** - JPA + MySQL + Redis  
✅ **API文档** - Swagger自动生成  
✅ **容器化部署** - Docker + Docker Compose  
✅ **监控运维** - Actuator + 日志配置  
✅ **测试策略** - 单元测试 + 集成测试  

按照本指南，您可以快速搭建一个生产就绪的校友通讯网系统！🚀
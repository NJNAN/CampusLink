# 福州理工学院校友通讯网

一个完整的校友通讯网站，包含H5移动端和管理后台，支持动态发布、评论管理、点赞功能、活动管理、文件上传等功能。

## 🎯 项目概述

### 功能特性
- **H5移动端**：26个功能页面，涵盖个人主页、动态发布、活动发现、班级圈子等
- **管理后台**：47个管理页面，包含用户管理、内容审核、数据统计等
- **Spring Boot后端**：完整的API接口设计，支持JWT认证、文件上传等
- **响应式设计**：适配多种设备尺寸，优秀的用户体验

### 技术栈
- **前端**：React 18 + TypeScript + Tailwind CSS
- **UI组件**：Shadcn/UI + Lucide React Icons
- **路由**：React Router v6
- **状态管理**：React Context + Custom Hooks
- **HTTP客户端**：Axios
- **后端**：Spring Boot + Spring Security + JWT
- **数据库**：MySQL + JPA/Hibernate
- **部署**：Docker + Docker Compose

## 📦 项目结构

```
├── components/                 # React组件
│   ├── h5/                    # H5移动端页面（26个）
│   ├── admin/                 # 管理后台页面（47个）
│   ├── auth/                  # 认证相关组件
│   ├── layouts/               # 布局组件
│   ├── common/                # 通用组件
│   └── ui/                    # UI基础组件
├── utils/                     # 工具函数
│   └── api/                   # API相关
│       ├── config.ts          # API配置
│       ├── index.ts           # HTTP客户端
│       ├── services.ts        # API服务层
│       ├── hooks.ts           # 自定义Hook
│       ├── types.ts           # TypeScript类型
│       └── mock.ts            # Mock数据
├── styles/                    # 样式文件
├── public/                    # 静态资源
└── docs/                      # 文档
    ├── API_DOCUMENTATION.md   # API接口文档
    ├── SPRING_BOOT_INTEGRATION_GUIDE.md  # Spring Boot集成指南
    └── SIMPLIFIED_SPRING_BOOT_GUIDE.md   # 简化实现指南
```

## 🚀 快速开始

### 前端启动

1. **安装依赖**
```bash
npm install
```

2. **配置环境变量**
```bash
# 创建 .env 文件
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_FILE_BASE_URL=http://localhost:8080/files
REACT_APP_USE_MOCK=false
```

3. **启动开发服务器**
```bash
npm start
```

### 后端启动（Spring Boot）

1. **克隆后端代码**
```bash
git clone <spring-boot-backend-repo>
cd alumni-backend
```

2. **配置数据库**
```yaml
# application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/fuzhou_tech_alumni
    username: your_username
    password: your_password
```

3. **启动后端服务**
```bash
./mvnw spring-boot:run
```

### 使用Docker（推荐）

```bash
# 启动完整服务栈
docker-compose up -d
```

## 📱 功能展示

### H5移动端（26个页面）
- **个人中心**：个人主页、我的资料、我的简历
- **社交功能**：动态发布、评论互动、点赞收藏
- **学校生活**：班级圈子、活动发现、校园热点
- **生活服务**：食堂推荐、宿舍驿站、课程表
- **回忆录**：岁月回忆、照片相册、荣誉证书
- **系统功能**：消息中心、设置中心、帮助反馈

### 管理后台（47个页面）
- **用户管理**：用户列表、权限管理、认证审核
- **内容管理**：动态管理、活动管理、相册管理
- **数据统计**：用户统计、内容统计、行为分析
- **系统设置**：配置管理、主题管理、备份管理

## 🔌 API集成

### 快速切换模式

项目支持两种模式：

1. **Mock模式**（开发调试）
```typescript
// .env
REACT_APP_USE_MOCK=true
```

2. **API模式**（生产环境）
```typescript
// .env
REACT_APP_USE_MOCK=false
REACT_APP_API_BASE_URL=http://your-backend-api.com/api
```

### API服务使用

```typescript
import { services } from './utils/api/services';

// 获取用户信息
const user = await services.user.getCurrentUser();

// 发布动态
const post = await services.post.createPost({
  content: '这是一条动态',
  type: 'MOMENT'
});

// 上传文件
const file = await services.file.uploadFile(selectedFile);
```

## 🔐 认证系统

### 支持的用户角色
- **STUDENT**：学生用户，访问H5移动端
- **TEACHER**：教师用户，访问部分管理功能  
- **ADMIN**：管理员用户，访问所有功能

### 认证流程
1. 用户登录获取JWT Token
2. Token自动添加到请求头
3. Token过期自动刷新
4. 登出时清除所有认证信息

## 📚 API文档

详细的API接口文档请查看：
- [完整API文档](./API_DOCUMENTATION.md)
- [Spring Boot集成指南](./SPRING_BOOT_INTEGRATION_GUIDE.md)
- [简化实现指南](./SIMPLIFIED_SPRING_BOOT_GUIDE.md)

### 核心接口示例

```typescript
// 认证接口
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout

// 用户接口
GET /api/users/me
PUT /api/users/me
POST /api/users/me/avatar

// 动态接口
GET /api/posts
POST /api/posts
PUT /api/posts/{id}
DELETE /api/posts/{id}

// 文件上传
POST /api/files/upload
```

## 🎨 UI组件系统

基于Shadcn/UI构建，包含：
- **基础组件**：Button、Input、Card等
- **复合组件**：Table、Form、Dialog等
- **业务组件**：UserCard、PostCard等

### 主题定制

项目使用Tailwind CSS v4，支持深色模式和主题定制：

```css
/* styles/globals.css */
:root {
  --primary: #030213;
  --secondary: #f3f3f5;
  --accent: #e9ebef;
  /* ... 更多变量 */
}
```

## 🔧 开发指南

### 代码规范
- TypeScript严格模式
- ESLint + Prettier代码格式化
- 组件props类型定义
- 错误边界处理

### 最佳实践
- 使用自定义Hook封装业务逻辑
- 统一的API错误处理
- 响应式设计适配
- 无障碍访问支持

### 测试账号
```
学生账号：student / student
管理员账号：admin / admin
教师账号：teacher / teacher
```

## 📈 性能优化

- **代码分割**：路由级别的懒加载
- **图片优化**：WebP格式 + 压缩
- **缓存策略**：API响应缓存
- **包体积优化**：Tree Shaking + Bundle分析

## 🚀 部署指南

### 前端部署

```bash
# 构建生产版本
npm run build

# 使用Nginx部署
docker run -d -p 80:80 -v $(pwd)/build:/usr/share/nginx/html nginx
```

### 后端部署

```bash
# 构建Docker镜像
docker build -t alumni-backend .

# 启动服务
docker run -d -p 8080:8080 alumni-backend
```

### 完整部署

```bash
# 使用Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 贡献指南

1. Fork项目
2. 创建特性分支
3. 提交改动
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- 项目主页：https://github.com/your-repo/fuzhou-tech-alumni
- 问题反馈：https://github.com/your-repo/fuzhou-tech-alumni/issues
- 邮箱：dev@fzit.edu.cn

---

**福州理工学院校友通讯网** - 连接校友，传承情谊 ❤️
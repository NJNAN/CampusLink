# 多阶段构建Dockerfile
# 阶段1: 构建应用
FROM maven:3.8.4-openjdk-11-slim AS builder

# 设置工作目录
WORKDIR /app

# 复制Maven配置文件
COPY pom.xml .
COPY .mvn/ .mvn/
COPY mvnw .

# 下载依赖（利用Docker缓存）
RUN mvn dependency:go-offline -B

# 复制源代码
COPY src ./src

# 构建应用
RUN mvn clean package -DskipTests

# 阶段2: 运行时环境
FROM openjdk:11-jre-slim

# 设置时区
ENV TZ=Asia/Shanghai
RUN apt-get update && apt-get install -y tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

# 安装必要工具
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    vim \
    && rm -rf /var/lib/apt/lists/*

# 创建应用用户
RUN groupadd -r appuser && useradd -r -g appuser appuser

# 设置工作目录
WORKDIR /app

# 创建必要目录
RUN mkdir -p /app/uploads /app/temp /var/log/alumni-system && \
    chown -R appuser:appuser /app /var/log/alumni-system

# 从构建阶段复制JAR文件
COPY --from=builder /app/target/*.jar app.jar

# 复制配置文件和脚本
COPY docker/entrypoint.sh /entrypoint.sh
COPY docker/healthcheck.sh /healthcheck.sh

# 设置文件权限
RUN chmod +x /entrypoint.sh /healthcheck.sh && \
    chown appuser:appuser /entrypoint.sh /healthcheck.sh app.jar

# 切换到应用用户
USER appuser

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD /healthcheck.sh

# JVM参数配置
ENV JAVA_OPTS="-Xms512m -Xmx1024m -XX:+UseG1GC -XX:+UseStringDeduplication -XX:+OptimizeStringConcat"

# 应用参数配置
ENV APP_OPTS="--server.port=8080 --spring.profiles.active=prod"

# 启动应用
ENTRYPOINT ["/entrypoint.sh"]
CMD ["java", "$JAVA_OPTS", "-jar", "app.jar", "$APP_OPTS"]

# 元数据标签
LABEL maintainer="FZIT Alumni System Team" \
      version="1.0.0" \
      description="福州理工学院校友通讯网后端系统" \
      org.opencontainers.image.title="FZIT Alumni System" \
      org.opencontainers.image.description="福州理工学院校友通讯网后端API服务" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.vendor="福州理工学院" \
      org.opencontainers.image.licenses="MIT"
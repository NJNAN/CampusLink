#!/bin/bash

# 福州理工学院校友通讯网 - Docker入口脚本
# 用于应用启动前的环境准备和配置

set -e

echo "=== 福州理工学院校友通讯网系统启动 ==="
echo "启动时间: $(date)"
echo "Java版本: $(java -version 2>&1 | head -n 1)"
echo "系统信息: $(uname -a)"

# 环境变量设置
export LANG=C.UTF-8
export LC_ALL=C.UTF-8

# 创建必要目录
mkdir -p /app/uploads/{avatars,photos,documents,temp}
mkdir -p /var/log/alumni-system

# 设置文件权限
chmod 755 /app/uploads
chmod 755 /var/log/alumni-system

# 等待数据库启动
echo "等待数据库连接..."
while ! nc -z ${SPRING_DATASOURCE_HOST:-mysql} ${SPRING_DATASOURCE_PORT:-3306}; do
    echo "等待MySQL启动..."
    sleep 3
done
echo "数据库连接成功!"

# 等待Redis启动
echo "等待Redis连接..."
while ! nc -z ${SPRING_DATA_REDIS_HOST:-redis} ${SPRING_DATA_REDIS_PORT:-6379}; do
    echo "等待Redis启动..."
    sleep 2
done
echo "Redis连接成功!"

# 检查环境变量
if [ -z "$JWT_SECRET" ]; then
    echo "警告: JWT_SECRET 未设置，使用默认值"
    export JWT_SECRET="fuzhou-tech-alumni-jwt-secret-key-2024-make-it-long-enough-for-security"
fi

if [ -z "$SPRING_PROFILES_ACTIVE" ]; then
    echo "警告: SPRING_PROFILES_ACTIVE 未设置，使用默认值 prod"
    export SPRING_PROFILES_ACTIVE="prod"
fi

# JVM调优参数
JAVA_OPTS="-server"
JAVA_OPTS="$JAVA_OPTS -Xms${JVM_XMS:-512m}"
JAVA_OPTS="$JAVA_OPTS -Xmx${JVM_XMX:-1024m}"
JAVA_OPTS="$JAVA_OPTS -XX:+UseG1GC"
JAVA_OPTS="$JAVA_OPTS -XX:+UseStringDeduplication"
JAVA_OPTS="$JAVA_OPTS -XX:+OptimizeStringConcat"
JAVA_OPTS="$JAVA_OPTS -XX:+UseCompressedOops"
JAVA_OPTS="$JAVA_OPTS -XX:+UseCompressedClassPointers"
JAVA_OPTS="$JAVA_OPTS -XX:MaxGCPauseMillis=200"
JAVA_OPTS="$JAVA_OPTS -XX:+UnlockExperimentalVMOptions"
JAVA_OPTS="$JAVA_OPTS -XX:+UseCGroupMemoryLimitForHeap"

# GC日志配置
JAVA_OPTS="$JAVA_OPTS -Xloggc:/var/log/alumni-system/gc.log"
JAVA_OPTS="$JAVA_OPTS -XX:+PrintGCDetails"
JAVA_OPTS="$JAVA_OPTS -XX:+PrintGCTimeStamps"
JAVA_OPTS="$JAVA_OPTS -XX:+PrintGCApplicationStoppedTime"
JAVA_OPTS="$JAVA_OPTS -XX:+UseGCLogFileRotation"
JAVA_OPTS="$JAVA_OPTS -XX:NumberOfGCLogFiles=5"
JAVA_OPTS="$JAVA_OPTS -XX:GCLogFileSize=100M"

# JMX监控配置
if [ "$ENABLE_JMX" = "true" ]; then
    JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote"
    JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.port=${JMX_PORT:-9999}"
    JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.authenticate=false"
    JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.ssl=false"
    JAVA_OPTS="$JAVA_OPTS -Djava.rmi.server.hostname=${JMX_HOSTNAME:-localhost}"
    echo "JMX监控已启用，端口: ${JMX_PORT:-9999}"
fi

# 远程调试配置
if [ "$ENABLE_DEBUG" = "true" ]; then
    JAVA_OPTS="$JAVA_OPTS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=${DEBUG_PORT:-5005}"
    echo "远程调试已启用，端口: ${DEBUG_PORT:-5005}"
fi

# 性能分析配置
if [ "$ENABLE_PROFILING" = "true" ]; then
    JAVA_OPTS="$JAVA_OPTS -XX:+FlightRecorder"
    JAVA_OPTS="$JAVA_OPTS -XX:StartFlightRecording=duration=60s,filename=/var/log/alumni-system/flight-record.jfr"
    echo "Java Flight Recorder已启用"
fi

# 应用参数
APP_OPTS="--server.port=${SERVER_PORT:-8080}"
APP_OPTS="$APP_OPTS --spring.profiles.active=$SPRING_PROFILES_ACTIVE"
APP_OPTS="$APP_OPTS --logging.file.name=/var/log/alumni-system/alumni-system.log"
APP_OPTS="$APP_OPTS --management.endpoints.web.base-path=/actuator"

# 文件存储配置
if [ -n "$FILE_UPLOAD_PATH" ]; then
    APP_OPTS="$APP_OPTS --file.upload.path=$FILE_UPLOAD_PATH"
fi

if [ -n "$FILE_UPLOAD_URL_PREFIX" ]; then
    APP_OPTS="$APP_OPTS --file.upload.url-prefix=$FILE_UPLOAD_URL_PREFIX"
fi

# 数据库配置
if [ -n "$SPRING_DATASOURCE_URL" ]; then
    APP_OPTS="$APP_OPTS --spring.datasource.url=$SPRING_DATASOURCE_URL"
fi

if [ -n "$SPRING_DATASOURCE_PASSWORD" ]; then
    APP_OPTS="$APP_OPTS --spring.datasource.password=$SPRING_DATASOURCE_PASSWORD"
fi

# Redis配置
if [ -n "$SPRING_DATA_REDIS_HOST" ]; then
    APP_OPTS="$APP_OPTS --spring.data.redis.host=$SPRING_DATA_REDIS_HOST"
fi

if [ -n "$SPRING_DATA_REDIS_PASSWORD" ]; then
    APP_OPTS="$APP_OPTS --spring.data.redis.password=$SPRING_DATA_REDIS_PASSWORD"
fi

# JWT配置
if [ -n "$JWT_SECRET" ]; then
    APP_OPTS="$APP_OPTS --jwt.secret=$JWT_SECRET"
fi

# 输出启动参数
echo "Java选项: $JAVA_OPTS"
echo "应用选项: $APP_OPTS"
echo "活动配置文件: $SPRING_PROFILES_ACTIVE"

# 创建PID文件
echo $$ > /var/run/alumni-system.pid

# 定义优雅关闭函数
shutdown() {
    echo "收到关闭信号，正在优雅关闭应用..."
    if [ -f /var/run/alumni-system.pid ]; then
        PID=$(cat /var/run/alumni-system.pid)
        if kill -0 $PID 2>/dev/null; then
            echo "发送SIGTERM信号到进程 $PID"
            kill -TERM $PID
            
            # 等待应用优雅关闭
            for i in {1..30}; do
                if ! kill -0 $PID 2>/dev/null; then
                    echo "应用已优雅关闭"
                    break
                fi
                echo "等待应用关闭... ($i/30)"
                sleep 1
            done
            
            # 如果仍未关闭，强制终止
            if kill -0 $PID 2>/dev/null; then
                echo "强制终止应用"
                kill -KILL $PID
            fi
        fi
        rm -f /var/run/alumni-system.pid
    fi
    exit 0
}

# 注册信号处理器
trap 'shutdown' SIGTERM SIGINT

echo "=== 启动福州理工学院校友通讯网系统 ==="

# 启动应用
exec java $JAVA_OPTS -jar app.jar $APP_OPTS &

# 保存应用进程ID
APP_PID=$!
echo $APP_PID > /var/run/alumni-system.pid

echo "应用已启动，进程ID: $APP_PID"
echo "健康检查地址: http://localhost:${SERVER_PORT:-8080}/actuator/health"

# 等待应用进程
wait $APP_PID
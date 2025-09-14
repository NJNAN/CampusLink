#!/bin/bash

# 福州理工学院校友通讯网 - Docker健康检查脚本

set -e

# 配置变量
HEALTH_URL="http://localhost:${SERVER_PORT:-8080}/actuator/health"
TIMEOUT=10
MAX_RETRIES=3

# 检查函数
check_health() {
    local url=$1
    local timeout=$2
    
    # 使用curl检查健康状态
    response=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout $timeout --max-time $timeout "$url" 2>/dev/null || echo "000")
    
    if [ "$response" = "200" ]; then
        return 0
    else
        return 1
    fi
}

# 检查应用进程
check_process() {
    if [ -f /var/run/alumni-system.pid ]; then
        local pid=$(cat /var/run/alumni-system.pid)
        if kill -0 $pid 2>/dev/null; then
            return 0
        fi
    fi
    return 1
}

# 主健康检查逻辑
main() {
    echo "开始健康检查..."
    
    # 检查应用进程是否存在
    if ! check_process; then
        echo "ERROR: 应用进程不存在"
        exit 1
    fi
    
    # 检查HTTP健康端点
    local retry=0
    while [ $retry -lt $MAX_RETRIES ]; do
        if check_health "$HEALTH_URL" $TIMEOUT; then
            echo "SUCCESS: 应用健康检查通过"
            echo "检查时间: $(date)"
            echo "检查URL: $HEALTH_URL"
            
            # 获取详细健康信息
            if command -v curl >/dev/null 2>&1; then
                echo "健康详情:"
                curl -s --connect-timeout 5 --max-time 5 "$HEALTH_URL" 2>/dev/null | head -c 500
                echo
            fi
            
            exit 0
        else
            retry=$((retry + 1))
            echo "WARNING: 健康检查失败，重试 $retry/$MAX_RETRIES"
            
            if [ $retry -lt $MAX_RETRIES ]; then
                sleep 2
            fi
        fi
    done
    
    echo "ERROR: 健康检查失败，已达到最大重试次数"
    echo "检查时间: $(date)"
    echo "检查URL: $HEALTH_URL"
    
    # 输出应用日志的最后几行以便调试
    if [ -f "/var/log/alumni-system/alumni-system.log" ]; then
        echo "应用日志最后10行:"
        tail -n 10 /var/log/alumni-system/alumni-system.log 2>/dev/null || echo "无法读取日志文件"
    fi
    
    exit 1
}

# 执行健康检查
main "$@"
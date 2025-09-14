// 这个文件用于批量创建剩余的管理后台页面
// 包含：通知管理、数据统计、权限管理、日志管理、备份管理、配置管理、主题管理、
// 邮件模板管理、短信模板管理、API管理、文件管理、数据导入导出、系统监控、安全设置、版本管理

const adminPages = [
  {
    name: 'NotificationManagement',
    title: '通知管理',
    description: '管理系统通知和消息推送',
    icon: 'Bell',
    features: ['通知列表', '推送设置', '模板管理', '发送统计']
  },
  {
    name: 'StatisticsManagement', 
    title: '数据统计',
    description: '查看系统数据统计和分析报告',
    icon: 'BarChart3',
    features: ['用户统计', '内容统计', '活动统计', '访问分析']
  },
  {
    name: 'PermissionManagement',
    title: '权限管理', 
    description: '管理用户角色和权限分配',
    icon: 'Shield',
    features: ['角色管理', '权限分配', '用户组', '访问控制']
  },
  {
    name: 'LogManagement',
    title: '日志管理',
    description: '查看和管理系统操作日志',
    icon: 'FileText',
    features: ['操作日志', '错误日志', '访问日志', '日志分析']
  },
  {
    name: 'BackupManagement',
    title: '备份管理',
    description: '管理数据备份和恢复',
    icon: 'Download', 
    features: ['自动备份', '手动备份', '备份恢复', '备份策略']
  },
  {
    name: 'ConfigManagement',
    title: '配置管理',
    description: '管理系统配置参数',
    icon: 'Settings',
    features: ['参数配置', '环境变量', '功能开关', '配置版本']
  },
  {
    name: 'ThemeManagement',
    title: '主题管理',
    description: '管理系统主题和样式',
    icon: 'Palette',
    features: ['主题切换', '样式定制', '颜色配置', '布局设置']
  },
  {
    name: 'EmailTemplateManagement',
    title: '邮件模板管理',
    description: '管理邮件模板和内容',
    icon: 'Mail',
    features: ['模板编辑', '变量管理', '预览发送', '模板统计']
  },
  {
    name: 'SmsTemplateManagement', 
    title: '短信模板管理',
    description: '管理短信模板和发送',
    icon: 'MessageSquare',
    features: ['模板管理', '发送记录', '余额查询', '统计报表']
  },
  {
    name: 'ApiManagement',
    title: 'API管理',
    description: '管理API接口和密钥',
    icon: 'Code',
    features: ['接口管理', '密钥管理', '调用统计', '权限控制']
  },
  {
    name: 'FileManagement',
    title: '文件管理',
    description: '管理系统文件和存储',
    icon: 'FolderOpen',
    features: ['文件浏览', '上传管理', '存储统计', '清理工具']
  },
  {
    name: 'DataImportExport',
    title: '数据导入导出',
    description: '数据的导入导出功能',
    icon: 'Download',
    features: ['数据导入', '数据导出', '格式转换', '批量操作']
  },
  {
    name: 'SystemMonitoring',
    title: '系统监控',
    description: '监控系统运行状态',
    icon: 'Monitor',
    features: ['性能监控', '资源使用', '实时状态', '告警设置']
  },
  {
    name: 'SecuritySettings',
    title: '安全设置',
    description: '管理系统安全配置',
    icon: 'ShieldCheck',
    features: ['安全策略', '访问控制', '风险监控', '安全日志']
  },
  {
    name: 'VersionManagement',
    title: '版本管理',
    description: '管理系统版本和更新',
    icon: 'GitBranch',
    features: ['版本信息', '更新记录', '发布管理', '回滚功能']
  }
];

console.log('管理后台页面配置：', adminPages);
console.log('共需要创建', adminPages.length, '个页面');

export default adminPages;
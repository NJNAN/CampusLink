import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { BarChart3, Users, FileText, Calendar, TrendingUp, Download, Eye, MessageSquare, Heart, Share2 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StatisticsManagement() {
  const [timeRange, setTimeRange] = useState('7days');

  // 模拟数据
  const userGrowthData = [
    { date: '01-01', users: 120, newUsers: 20 },
    { date: '01-02', users: 145, newUsers: 25 },
    { date: '01-03', users: 160, newUsers: 15 },
    { date: '01-04', users: 180, newUsers: 20 },
    { date: '01-05', users: 195, newUsers: 15 },
    { date: '01-06', users: 220, newUsers: 25 },
    { date: '01-07', users: 250, newUsers: 30 }
  ];

  const contentStats = [
    { name: '动态发布', value: 1234, growth: 12.5 },
    { name: '图片上传', value: 5678, growth: 8.3 },
    { name: '评论数量', value: 3456, growth: 15.2 },
    { name: '点赞数量', value: 12456, growth: 20.1 }
  ];

  const activityData = [
    { month: '1月', participants: 450, events: 12 },
    { month: '2月', participants: 380, events: 8 },
    { month: '3月', participants: 520, events: 15 },
    { month: '4月', participants: 680, events: 18 },
    { month: '5月', participants: 750, events: 20 },
    { month: '6月', participants: 890, events: 25 }
  ];

  const userTypeData = [
    { name: '在校学生', value: 650, color: '#8884d8' },
    { name: '毕业校友', value: 420, color: '#82ca9d' },
    { name: '教职工', value: 180, color: '#ffc658' },
    { name: '管理员', value: 50, color: '#ff7300' }
  ];

  const deviceData = [
    { name: '移动端', value: 75, color: '#8884d8' },
    { name: '桌面端', value: 20, color: '#82ca9d' },
    { name: '平板端', value: 5, color: '#ffc658' }
  ];

  const pageViewData = [
    { page: '个人主页', views: 15420, unique: 8900 },
    { page: '班级动态', views: 12350, unique: 7800 },
    { page: '活动发现', views: 9800, unique: 6200 },
    { page: '校友街', views: 8900, unique: 5600 },
    { page: '消息中心', views: 7600, unique: 4800 }
  ];

  const engagementData = [
    { date: '01-01', likes: 245, comments: 156, shares: 89 },
    { date: '01-02', likes: 280, comments: 198, shares: 102 },
    { date: '01-03', likes: 320, comments: 220, shares: 115 },
    { date: '01-04', likes: 350, comments: 245, shares: 128 },
    { date: '01-05', likes: 380, comments: 280, shares: 145 },
    { date: '01-06', likes: 420, comments: 310, shares: 160 },
    { date: '01-07', likes: 450, comments: 340, shares: 180 }
  ];

  const exportData = (type: string) => {
    console.log(`导出${type}数据`);
    // 这里实现数据导出逻辑
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">数据统计</h1>
          <p className="text-muted-foreground mt-1">查看系统数据统计和分析报告</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">近7天</SelectItem>
              <SelectItem value="30days">近30天</SelectItem>
              <SelectItem value="90days">近90天</SelectItem>
              <SelectItem value="1year">近1年</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 概览统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">总用户数</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold">1,250</p>
                  <span className="ml-2 text-sm text-green-600">+12.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">总内容数</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold">8,456</p>
                  <span className="ml-2 text-sm text-green-600">+8.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">活动数量</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold">156</p>
                  <span className="ml-2 text-sm text-green-600">+15.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">活跃度</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold">78.5%</p>
                  <span className="ml-2 text-sm text-green-600">+5.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">用户统计</TabsTrigger>
          <TabsTrigger value="content">内容统计</TabsTrigger>
          <TabsTrigger value="activities">活动统计</TabsTrigger>
          <TabsTrigger value="engagement">互动统计</TabsTrigger>
          <TabsTrigger value="traffic">访问分析</TabsTrigger>
        </TabsList>

        {/* 用户统计 */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>用户增长趋势</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="users" stackId="1" stroke="#8884d8" fill="#8884d8" name="总用户" />
                    <Area type="monotone" dataKey="newUsers" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="新增用户" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>用户类型分布</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>设备使用情况</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {deviceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 内容统计 */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contentStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                      <p className="text-2xl font-semibold">{stat.value.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600">+{stat.growth}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>页面访问统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pageViewData.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{page.page}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-right">
                        <p className="font-medium">{page.views.toLocaleString()}</p>
                        <p className="text-muted-foreground">总访问</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{page.unique.toLocaleString()}</p>
                        <p className="text-muted-foreground">独立访客</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 活动统计 */}
        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>活动参与趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="participants" fill="#8884d8" name="参与人数" />
                  <Bar dataKey="events" fill="#82ca9d" name="活动数量" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-semibold">156</p>
                  <p className="text-sm text-muted-foreground mt-1">总活动数</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-semibold">4,250</p>
                  <p className="text-sm text-muted-foreground mt-1">总参与人次</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-semibold">72.3%</p>
                  <p className="text-sm text-muted-foreground mt-1">平均参与率</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 互动统计 */}
        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>用户互动趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="likes" stroke="#ff7300" strokeWidth={2} name="点赞" />
                  <Line type="monotone" dataKey="comments" stroke="#8884d8" strokeWidth={2} name="评论" />
                  <Line type="monotone" dataKey="shares" stroke="#82ca9d" strokeWidth={2} name="分享" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Heart className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">总点赞数</p>
                    <p className="text-2xl font-semibold">24,567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">总评论数</p>
                    <p className="text-2xl font-semibold">18,234</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Share2 className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">总分享数</p>
                    <p className="text-2xl font-semibold">9,876</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 访问分析 */}
        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold">45,678</p>
                  <p className="text-sm text-muted-foreground">总页面浏览量</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold">12,345</p>
                  <p className="text-sm text-muted-foreground">独立访客</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold">3.7</p>
                  <p className="text-sm text-muted-foreground">平均页面数/会话</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-semibold">2:35</p>
                  <p className="text-sm text-muted-foreground">平均停留时间</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>热门页面排行</CardTitle>
                <Button variant="outline" size="sm" onClick={() => exportData('traffic')}>
                  <Download className="h-4 w-4 mr-2" />
                  导出数据
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pageViewData.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="font-medium">{page.page}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-right">
                        <p className="font-medium">{page.views.toLocaleString()}</p>
                        <p className="text-muted-foreground">访问量</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{page.unique.toLocaleString()}</p>
                        <p className="text-muted-foreground">独立访客</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{((page.views / page.unique)).toFixed(1)}</p>
                        <p className="text-muted-foreground">页面/访客</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
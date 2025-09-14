import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';

interface LoginPageProps {
  onLogin: (role: 'student' | 'admin' | 'teacher') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [studentForm, setStudentForm] = useState({
    phone: '',
    password: ''
  });

  const [adminForm, setAdminForm] = useState({
    username: '',
    password: ''
  });

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.phone || !studentForm.password) {
      toast.error('请填写完整信息');
      return;
    }
    
    // 模拟验证
    if (studentForm.phone === '13888888888' && studentForm.password === '123456') {
      toast.success('学生登录成功');
      onLogin('student');
    } else {
      toast.error('手机号或密码错误');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminForm.username || !adminForm.password) {
      toast.error('请填写完整信息');
      return;
    }

    // 模拟验证
    if (adminForm.username === 'admin' && adminForm.password === 'admin') {
      toast.success('管理员登录成功');
      onLogin('admin');
    } else if (adminForm.username === 'teacher' && adminForm.password === 'teacher') {
      toast.success('教师登录成功');
      onLogin('teacher');
    } else {
      toast.error('用户名或密码错误');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2 text-gray-800">校友通讯网</h1>
          <p className="text-gray-600">连接同窗好友，分享美好时光</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>登录</CardTitle>
            <CardDescription>选择您的身份登录系统</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">学生/校友</TabsTrigger>
                <TabsTrigger value="admin">管理员/教师</TabsTrigger>
              </TabsList>

              <TabsContent value="student">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="请输入手机号"
                      value={studentForm.phone}
                      onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="请输入密码"
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    登录
                  </Button>
                  <div className="text-center text-sm text-gray-500 mt-4">
                    <p>测试账号：13888888888</p>
                    <p>测试密码：123456</p>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">用户名</Label>
                    <Input
                      id="username"
                      placeholder="请输入用户名"
                      value={adminForm.username}
                      onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">密码</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="请输入密码"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    登录
                  </Button>
                  <div className="text-center text-sm text-gray-500 mt-4">
                    <p>管理员：admin / admin</p>
                    <p>教师：teacher / teacher</p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
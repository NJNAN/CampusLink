import { useState } from 'react';
import { ArrowLeft, Search, HelpCircle, MessageSquare, Book, Settings, User, Shield, ChevronRight, Phone, Mail } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: '账户相关',
      icon: User,
      color: 'bg-blue-50 text-blue-600',
      items: [
        { title: '如何修改个人信息？', content: '进入"我的"->"个人信息"页面，点击编辑按钮即可修改头像、昵称、个人简介等信息。' },
        { title: '忘记密码怎么办？', content: '在登录页面点击"忘记密码"，输入手机号或邮箱，按照提示重置密码。' },
        { title: '如何绑定手机号？', content: '在"设置"->"账户安全"中可以绑定或更换手机号码。' },
        { title: '如何注销账户？', content: '在"设置"->"账户安全"->"注销账户"中申请注销，注销后数据无法恢复。' }
      ]
    },
    {
      title: '动态社交',
      icon: MessageSquare,
      color: 'bg-green-50 text-green-600',
      items: [
        { title: '如何发布动态？', content: '点击首页的"+"按钮，选择"发布动态"，添加文字、图片或视频内容即可发布。' },
        { title: '如何删除已发布的动态？', content: '在动态详情页点击右上角"..."菜单，选择"删除"即可。只能删除自己发布的动态。' },
        { title: '动态被举报了怎么办？', content: '我们会在24小时内审核被举报的内容，如确实违规会进行删除或限制处理。' },
        { title: '如何设置动态隐私？', content: '发布动态时可以选择"公开"、"仅好友可见"或"仅自己可见"。' }
      ]
    },
    {
      title: '班级功能',
      icon: Book,
      color: 'bg-purple-50 text-purple-600',
      items: [
        { title: '如何加入班级？', content: '通过班级邀请码或管理员邀请加入班级，也可以搜索班级名称申请加入。' },
        { title: '班级管理员权限有哪些？', content: '班级管理员可以管理成员、发布公告、组织活动、上传班级相册等。' },
        { title: '如何创建班级？', content: '在"班级"页面点击"创建班级"，填写班级信息并提交审核，审核通过后即可使用。' },
        { title: '班级成员如何管理？', content: '班级管理员可以在班级设置中管理成员，包括移除成员、设置管理员等。' }
      ]
    },
    {
      title: '活动报名',
      icon: Settings,
      color: 'bg-orange-50 text-orange-600',
      items: [
        { title: '如何报名活动？', content: '在活动详情页点击"立即报名"，填写报名信息并提交即可。' },
        { title: '如何取消报名？', content: '在活动报名截止前，可以在"我的活动"中取消报名。' },
        { title: '活动取消会通知吗？', content: '会通过站内消息和推送通知及时告知活动取消或变更信息。' },
        { title: '活动签到怎么操作？', content: '活动当天在活动现场扫描二维码或输入签到码完成签到。' }
      ]
    },
    {
      title: '隐私安全',
      icon: Shield,
      color: 'bg-red-50 text-red-600',
      items: [
        { title: '如何设置隐私权限？', content: '在"设置"->"隐私设置"中可以设置个人信息的可见范围和互动权限。' },
        { title: '如何举报不当内容？', content: '点击内容右上角"..."菜单，选择"举报"，选择举报原因并提交。' },
        { title: '个人信息会被泄露吗？', content: '我们严格保护用户隐私，不会向第三方泄露个人信息。详见隐私政策。' },
        { title: '如何屏蔽某个用户？', content: '在对方个人主页点击"..."菜单，选择"屏蔽用户"即可。' }
      ]
    }
  ];

  const contactMethods = [
    {
      type: '在线客服',
      icon: MessageSquare,
      value: '24小时在线服务',
      action: '立即咨询'
    },
    {
      type: '客服热线',
      icon: Phone,
      value: '400-123-4567',
      action: '拨打电话'
    },
    {
      type: '官方邮箱',
      icon: Mail,
      value: 'help@fzit.edu.cn',
      action: '发送邮件'
    }
  ];

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-medium">帮助中心</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 搜索框 */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索帮助内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* 快速入口 */}
        {!searchQuery && (
          <Card className="p-4">
            <h2 className="font-medium mb-3">常见问题</h2>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto p-3 flex-col space-y-1">
                <HelpCircle className="h-5 w-5" />
                <span className="text-xs">账户问题</span>
              </Button>
              <Button variant="outline" className="h-auto p-3 flex-col space-y-1">
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs">功能使用</span>
              </Button>
              <Button variant="outline" className="h-auto p-3 flex-col space-y-1">
                <Shield className="h-5 w-5" />
                <span className="text-xs">隐私安全</span>
              </Button>
              <Button variant="outline" className="h-auto p-3 flex-col space-y-1">
                <Settings className="h-5 w-5" />
                <span className="text-xs">设置问题</span>
              </Button>
            </div>
          </Card>
        )}

        {/* 帮助内容 */}
        <div className="space-y-4">
          {filteredCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="p-0 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}>
                    <category.icon className="h-4 w-4" />
                  </div>
                  <h2 className="font-medium">{category.title}</h2>
                  <Badge variant="secondary">{category.items.length}</Badge>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`${categoryIndex}-${itemIndex}`} className="border-0">
                    <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-gray-50">
                      <span className="font-medium">{item.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-gray-600">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))}
        </div>

        {/* 没有搜索结果 */}
        {searchQuery && filteredCategories.length === 0 && (
          <Card className="p-8 text-center">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-medium mb-2">没有找到相关内容</h3>
            <p className="text-sm text-gray-600 mb-4">
              试试其他关键词，或联系客服获取帮助
            </p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              清除搜索
            </Button>
          </Card>
        )}

        {/* 联系客服 */}
        <Card className="p-4">
          <h2 className="font-medium mb-3">联系我们</h2>
          <p className="text-sm text-gray-600 mb-4">
            如果以上内容无法解决您的问题，可以通过以下方式联系我们：
          </p>
          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <method.icon className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{method.type}</p>
                    <p className="text-sm text-gray-600">{method.value}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {method.action}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* 服务时间 */}
        <Card className="p-4 text-center">
          <h3 className="font-medium mb-2">服务时间</h3>
          <p className="text-sm text-gray-600">
            周一至周五 9:00-18:00<br />
            周末及节假日 10:00-16:00
          </p>
        </Card>

        {/* 底部安全区域 */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
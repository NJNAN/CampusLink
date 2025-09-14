import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { 
  Plus, Search, Edit, Trash2, Eye, Upload, Image as ImageIcon,
  MoreHorizontal, ArrowUp, ArrowDown, BarChart3, Calendar, Link,
  CheckCircle, XCircle, Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  description: string;
  position: 'home' | 'activity' | 'news' | 'alumni';
  order: number;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  clicks: number;
  views: number;
  createdAt: string;
  createdBy: string;
}

export default function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockBanners: Banner[] = [
        {
          id: '1',
          title: '福州理工学院2024年招生宣传',
          imageUrl: 'https://picsum.photos/800/300?random=1',
          linkUrl: 'https://www.fit.edu.cn/zhaosheng',
          description: '2024年本科招生简章发布，欢迎优秀学子报考',
          position: 'home',
          order: 1,
          isActive: true,
          startDate: '2024-01-01',
          endDate: '2024-06-30',
          clicks: 1234,
          views: 8765,
          createdAt: '2024-01-01',
          createdBy: '管理员'
        },
        {
          id: '2',
          title: '校友返校日活动通知',
          imageUrl: 'https://picsum.photos/800/300?random=2',
          linkUrl: 'https://www.fit.edu.cn/alumni',
          description: '邀请广大校友回母校参加建校20周年庆典',
          position: 'alumni',
          order: 1,
          isActive: true,
          startDate: '2024-03-01',
          endDate: '2024-05-01',
          clicks: 567,
          views: 2345,
          createdAt: '2024-03-01',
          createdBy: '校友办'
        },
        {
          id: '3',
          title: '春季学期开学典礼',
          imageUrl: 'https://picsum.photos/800/300?random=3',
          description: '新学期开学典礼直播通知',
          position: 'news',
          order: 2,
          isActive: false,
          startDate: '2024-02-20',
          endDate: '2024-02-25',
          clicks: 234,
          views: 1234,
          createdAt: '2024-02-15',
          createdBy: '学工部'
        },
        {
          id: '4',
          title: '计算机学院编程大赛',
          imageUrl: 'https://picsum.photos/800/300?random=4',
          linkUrl: 'https://www.fit.edu.cn/contest',
          description: '第五届程序设计竞赛开始报名',
          position: 'activity',
          order: 1,
          isActive: true,
          startDate: '2024-03-10',
          endDate: '2024-04-30',
          clicks: 789,
          views: 3456,
          createdAt: '2024-03-05',
          createdBy: '计算机学院'
        },
        {
          id: '5',
          title: '图书馆资源使用指南',
          imageUrl: 'https://picsum.photos/800/300?random=5',
          linkUrl: 'https://lib.fit.edu.cn',
          description: '新生图书馆使用指南和电子资源介绍',
          position: 'home',
          order: 3,
          isActive: true,
          startDate: '2024-01-15',
          clicks: 345,
          views: 1567,
          createdAt: '2024-01-10',
          createdBy: '图书馆'
        }
      ];

      setBanners(mockBanners);
    } catch (error) {
      console.error('加载横幅数据失败:', error);
      toast.error('加载数据失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = (bannerId: string) => {
    setBanners(banners.map(banner => 
      banner.id === bannerId ? { ...banner, isActive: !banner.isActive } : banner
    ));
    toast.success('状态已更新');
  };

  const handleDelete = (bannerId: string) => {
    if (window.confirm('确定要删除这个横幅吗？')) {
      setBanners(banners.filter(banner => banner.id !== bannerId));
      toast.success('横幅已删除');
    }
  };

  const handleMoveOrder = (bannerId: string, direction: 'up' | 'down') => {
    const banner = banners.find(b => b.id === bannerId);
    if (!banner) return;

    const samePositionBanners = banners.filter(b => b.position === banner.position);
    const currentIndex = samePositionBanners.findIndex(b => b.id === bannerId);
    
    if (direction === 'up' && currentIndex > 0) {
      const targetBanner = samePositionBanners[currentIndex - 1];
      setBanners(banners.map(b => {
        if (b.id === bannerId) return { ...b, order: targetBanner.order };
        if (b.id === targetBanner.id) return { ...b, order: banner.order };
        return b;
      }));
      toast.success('顺序已调整');
    } else if (direction === 'down' && currentIndex < samePositionBanners.length - 1) {
      const targetBanner = samePositionBanners[currentIndex + 1];
      setBanners(banners.map(b => {
        if (b.id === bannerId) return { ...b, order: targetBanner.order };
        if (b.id === targetBanner.id) return { ...b, order: banner.order };
        return b;
      }));
      toast.success('顺序已调整');
    }
  };

  const getPositionText = (position: string) => {
    switch (position) {
      case 'home': return '首页';
      case 'activity': return '活动页';
      case 'news': return '新闻页';
      case 'alumni': return '校友页';
      default: return '未知';
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'home': return 'bg-blue-100 text-blue-700';
      case 'activity': return 'bg-green-100 text-green-700';
      case 'news': return 'bg-orange-100 text-orange-700';
      case 'alumni': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         banner.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = positionFilter === 'all' || banner.position === positionFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && banner.isActive) ||
                         (statusFilter === 'inactive' && !banner.isActive);
    
    return matchesSearch && matchesPosition && matchesStatus;
  }).sort((a, b) => {
    if (a.position !== b.position) {
      return a.position.localeCompare(b.position);
    }
    return a.order - b.order;
  });

  const stats = {
    total: banners.length,
    active: banners.filter(b => b.isActive).length,
    totalClicks: banners.reduce((sum, b) => sum + b.clicks, 0),
    totalViews: banners.reduce((sum, b) => sum + b.views, 0)
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">横幅管理</h1>
          <p className="text-gray-600 mt-1">管理网站各页面的宣传横幅</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              添加横幅
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>添加新横幅</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Input placeholder="横幅标题" />
                <Input placeholder="链接地址（可选）" />
                <select className="w-full border rounded px-3 py-2">
                  <option>选择显示位置</option>
                  <option value="home">首页</option>
                  <option value="activity">活动页</option>
                  <option value="news">新闻页</option>
                  <option value="alumni">校友页</option>
                </select>
                <Input type="date" placeholder="开始日期" />
                <Input type="date" placeholder="结束日期（可选）" />
              </div>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">上传横幅图片</p>
                  <p className="text-xs text-gray-400">推荐尺寸：800x300px</p>
                </div>
                <textarea 
                  className="w-full border rounded px-3 py-2 h-24"
                  placeholder="横幅描述"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">取消</Button>
              <Button className="flex-1">保存</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总横幅数</p>
                <p className="text-2xl text-gray-900">{stats.total}</p>
              </div>
              <ImageIcon className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">活跃横幅</p>
                <p className="text-2xl text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总点击量</p>
                <p className="text-2xl text-purple-600">{stats.totalClicks.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总浏览量</p>
                <p className="text-2xl text-orange-600">{stats.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索横幅标题或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">位置筛选</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setPositionFilter('all')}>全部位置</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPositionFilter('home')}>首页</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPositionFilter('activity')}>活动页</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPositionFilter('news')}>新闻页</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPositionFilter('alumni')}>校友页</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">状态筛选</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>全部状态</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>活跃</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>停用</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* 横幅列表 */}
      <Card>
        <CardHeader>
          <CardTitle>横幅列表 ({filteredBanners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>横幅信息</TableHead>
                <TableHead>位置/顺序</TableHead>
                <TableHead>有效期</TableHead>
                <TableHead>数据统计</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBanners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={banner.imageUrl} 
                        alt={banner.title}
                        className="w-16 h-8 object-cover rounded"
                      />
                      <div>
                        <div className="text-sm">{banner.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{banner.description}</div>
                        {banner.linkUrl && (
                          <div className="flex items-center gap-1 text-xs text-blue-600">
                            <Link className="w-3 h-3" />
                            <span>有链接</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={`text-xs ${getPositionColor(banner.position)}`}>
                        {getPositionText(banner.position)}
                      </Badge>
                      <div className="text-xs text-gray-500">
                        排序: {banner.order}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div>{banner.startDate}</div>
                      {banner.endDate && (
                        <div className="text-xs text-gray-500">至 {banner.endDate}</div>
                      )}
                      {!banner.endDate && (
                        <div className="text-xs text-blue-600">长期有效</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <Eye className="w-3 h-3 text-gray-400" />
                        <span>{banner.views}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-3 h-3 text-gray-400" />
                        <span>{banner.clicks}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={banner.isActive}
                        onCheckedChange={() => handleToggleStatus(banner.id)}
                      />
                      <span className={`text-xs ${banner.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                        {banner.isActive ? '活跃' : '停用'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveOrder(banner.id, 'up')}
                        className="p-1 h-auto"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveOrder(banner.id, 'down')}
                        className="p-1 h-auto"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelectedBanner(banner)}>
                            <Eye className="w-4 h-4 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(banner.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 横幅详情对话框 */}
      <Dialog open={!!selectedBanner} onOpenChange={(open) => !open && setSelectedBanner(null)}>
        <DialogContent className="max-w-3xl">
          {selectedBanner && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBanner.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video">
                  <img 
                    src={selectedBanner.imageUrl} 
                    alt={selectedBanner.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm text-gray-700 mb-3">基本信息</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">显示位置:</span>
                        <Badge className={`text-xs ${getPositionColor(selectedBanner.position)}`}>
                          {getPositionText(selectedBanner.position)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">排序:</span>
                        <span>{selectedBanner.order}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">状态:</span>
                        <span className={selectedBanner.isActive ? 'text-green-600' : 'text-gray-500'}>
                          {selectedBanner.isActive ? '活跃' : '停用'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">创建者:</span>
                        <span>{selectedBanner.createdBy}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-700 mb-3">统计数据</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">浏览量:</span>
                        <span>{selectedBanner.views.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">点击量:</span>
                        <span>{selectedBanner.clicks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">  
                        <span className="text-gray-600">点击率:</span>
                        <span>
                          {selectedBanner.views > 0 
                            ? ((selectedBanner.clicks / selectedBanner.views) * 100).toFixed(2) + '%'
                            : '0%'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">创建时间:</span>
                        <span>{selectedBanner.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-700 mb-2">描述</h4>
                  <p className="text-sm text-gray-600">{selectedBanner.description}</p>
                </div>

                {selectedBanner.linkUrl && (
                  <div>
                    <h4 className="text-sm text-gray-700 mb-2">链接地址</h4>
                    <div className="flex items-center gap-2">
                      <Link className="w-4 h-4 text-blue-600" />
                      <a 
                        href={selectedBanner.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {selectedBanner.linkUrl}
                      </a>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm text-gray-700 mb-2">有效期</h4>
                  <div className="text-sm text-gray-600">
                    {selectedBanner.startDate} 
                    {selectedBanner.endDate ? ` 至 ${selectedBanner.endDate}` : ' (长期有效)'}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedBanner(null)}>
                  关闭
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  编辑
                </Button>
                <Button 
                  variant={selectedBanner.isActive ? "destructive" : "default"}
                  onClick={() => {
                    handleToggleStatus(selectedBanner.id);
                    setSelectedBanner(null);
                  }}
                >
                  {selectedBanner.isActive ? '停用' : '启用'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
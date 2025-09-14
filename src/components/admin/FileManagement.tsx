import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { FolderOpen, File, Image, Upload, Download, Trash2, Search, Grid, List } from 'lucide-react';

export default function FileManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const mockFiles = [
    { id: '1', name: 'avatar_001.jpg', type: 'image', size: '2.5 MB', uploadedBy: '张同学', uploadedAt: '2024-01-15', folder: 'avatars' },
    { id: '2', name: 'activity_poster.png', type: 'image', size: '4.8 MB', uploadedBy: '李老师', uploadedAt: '2024-01-14', folder: 'activities' },
    { id: '3', name: 'user_manual.pdf', type: 'document', size: '1.2 MB', uploadedBy: '管理员', uploadedAt: '2024-01-13', folder: 'documents' },
    { id: '4', name: 'graduation_photo.jpg', type: 'image', size: '6.3 MB', uploadedBy: '王同学', uploadedAt: '2024-01-12', folder: 'photos' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-8 w-8 text-blue-600" />;
      case 'document': return <File className="h-8 w-8 text-red-600" />;
      default: return <File className="h-8 w-8 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">文件管理</h1>
          <p className="text-muted-foreground mt-1">管理系统文件和存储</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            上传文件
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">总文件</span>
            </div>
            <p className="text-2xl font-semibold mt-2">2,456</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Image className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">图片文件</span>
            </div>
            <p className="text-2xl font-semibold mt-2">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <File className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">文档文件</span>
            </div>
            <p className="text-2xl font-semibold mt-2">567</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">存储使用</span>
            </div>
            <p className="text-2xl font-semibold mt-2">1.2 GB</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>文件列表</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索文件..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-3'}>
            {mockFiles.map((file) => (
              <div key={file.id} className={viewMode === 'grid' ? 'border rounded-lg p-4' : 'border rounded-lg p-4 flex items-center justify-between'}>
                {viewMode === 'grid' ? (
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      {getFileIcon(file.type)}
                    </div>
                    <h3 className="font-medium mb-1 truncate">{file.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{file.size}</p>
                      <p>{file.uploadedBy}</p>
                      <p>{file.uploadedAt}</p>
                    </div>
                    <Badge variant="outline" className="mt-2">{file.folder}</Badge>
                    <div className="flex space-x-1 mt-3">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <h3 className="font-medium">{file.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{file.size}</span>
                          <span>{file.uploadedBy}</span>
                          <span>{file.uploadedAt}</span>
                          <Badge variant="outline">{file.folder}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
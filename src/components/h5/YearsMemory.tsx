import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ArrowLeft, Calendar, Heart, MessageCircle, Image as ImageIcon, Plus, GraduationCap, Users, Camera, MapPin, Award, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function YearsMemory() {
  const navigate = useNavigate();
  
  // 入学照片
  const [enrollmentPhotos] = useState([
    { id: '1', title: '录取通知书', date: '2021-07', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400', likes: 52, comments: 15 },
    { id: '2', title: '初入校园', date: '2021-09', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400', likes: 89, comments: 23 },
    { id: '3', title: '宿舍第一天', date: '2021-09', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400', likes: 67, comments: 18 },
    { id: '4', title: '新生报到', date: '2021-09', image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400', likes: 74, comments: 20 }
  ]);

  // 教室一角
  const [classroomPhotos] = useState([
    { id: '1', title: '第一节课', date: '2021-09', image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400', likes: 43, comments: 12 },
    { id: '2', title: '专业课教室', date: '2021-10', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400', likes: 38, comments: 9 },
    { id: '3', title: '实验室时光', date: '2022-03', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', likes: 56, comments: 14 },
    { id: '4', title: '期末复习', date: '2022-06', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', likes: 65, comments: 17 }
  ]);

  // 校园相册
  const [campusPhotos] = useState([
    { id: '1', title: '春天的樱花', date: '2022-03', image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400', likes: 128, comments: 35 },
    { id: '2', title: '图书馆夜景', date: '2022-05', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', likes: 94, comments: 21 },
    { id: '3', title: '体育场晨跑', date: '2022-04', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', likes: 76, comments: 18 },
    { id: '4', title: '食堂聚餐', date: '2022-06', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', likes: 85, comments: 22 }
  ]);

  // 班级相册
  const [classPhotos] = useState([
    { id: '1', title: '班级合影', date: '2021-09', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400', likes: 156, comments: 42 },
    { id: '2', title: '班级聚餐', date: '2021-12', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400', likes: 89, comments: 26 },
    { id: '3', title: '春游合影', date: '2022-04', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400', likes: 112, comments: 28 },
    { id: '4', title: '毕业留念', date: '2025-06', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400', likes: 203, comments: 67 }
  ]);

  // 舍友合照
  const [roommatePhotos] = useState([
    { id: '1', title: '宿舍日常', date: '2021-10', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', likes: 67, comments: 19 },
    { id: '2', title: '深夜聊天', date: '2021-11', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400', likes: 54, comments: 15 },
    { id: '3', title: '生日庆祝', date: '2022-02', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400', likes: 78, comments: 21 },
    { id: '4', title: '考试加油', date: '2022-06', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', likes: 82, comments: 23 }
  ]);

  // 活动剪影
  const [activityPhotos] = useState([
    { id: '1', title: '迎新晚会', date: '2021-10', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400', likes: 145, comments: 38 },
    { id: '2', title: '社团活动', date: '2021-11', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400', likes: 98, comments: 24 },
    { id: '3', title: '运动会', date: '2022-04', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', likes: 126, comments: 31 },
    { id: '4', title: '文艺演出', date: '2022-05', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400', likes: 167, comments: 43 }
  ]);

  const renderPhotoGrid = (photos: any[]) => (
    <div className="grid grid-cols-2 gap-3">
      {photos.map((photo) => (
        <Card key={photo.id} className="border-0 shadow-sm overflow-hidden">
          <div className="relative">
            <ImageWithFallback 
              src={photo.image} 
              alt={photo.title} 
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <h4 className="text-white text-xs font-medium truncate">{photo.title}</h4>
              <p className="text-white/80 text-xs">{photo.date}</p>
            </div>
          </div>
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500 p-1">
                <Heart className="w-3 h-3" />
                <span className="text-xs">{photo.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500 p-1">
                <MessageCircle className="w-3 h-3" />
                <span className="text-xs">{photo.comments}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 顶部标题栏 */}
      <div className="bg-white p-4 border-b sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">岁月回忆</h1>
              <p className="text-sm text-gray-600">青春记忆，珍藏时光</p>
            </div>
          </div>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            上传
          </Button>
        </div>
      </div>

      {/* 分类相册 */}
      <div className="p-4">
        <Tabs defaultValue="enrollment" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-10 mb-4">
            <TabsTrigger value="enrollment" className="text-xs">
              <GraduationCap className="w-3 h-3 mr-1" />
              入学
            </TabsTrigger>
            <TabsTrigger value="campus" className="text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              校园
            </TabsTrigger>
            <TabsTrigger value="class" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              班级
            </TabsTrigger>
          </TabsList>
          
          <TabsList className="grid w-full grid-cols-3 h-10 mb-6">
            <TabsTrigger value="classroom" className="text-xs">
              <Camera className="w-3 h-3 mr-1" />
              教室
            </TabsTrigger>
            <TabsTrigger value="roommate" className="text-xs">
              <Home className="w-3 h-3 mr-1" />
              宿舍
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-xs">
              <Award className="w-3 h-3 mr-1" />
              活动
            </TabsTrigger>
          </TabsList>

          {/* 入学照片 */}
          <TabsContent value="enrollment" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <div>
                <h3 className="font-medium">入学时光</h3>
                <p className="text-sm text-gray-600">那些初入校园的青涩回忆</p>
              </div>
            </div>
            {renderPhotoGrid(enrollmentPhotos)}
          </TabsContent>

          {/* 校园相册 */}
          <TabsContent value="campus" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-green-500" />
              <div>
                <h3 className="font-medium">校园风光</h3>
                <p className="text-sm text-gray-600">美丽校园的四季变换</p>
              </div>
            </div>
            {renderPhotoGrid(campusPhotos)}
          </TabsContent>

          {/* 班级相册 */}
          <TabsContent value="class" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <h3 className="font-medium">班级记忆</h3>
                <p className="text-sm text-gray-600">同窗好友的珍贵合影</p>
              </div>
            </div>
            {renderPhotoGrid(classPhotos)}
          </TabsContent>

          {/* 教室一角 */}
          <TabsContent value="classroom" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-orange-500" />
              <div>
                <h3 className="font-medium">教室一角</h3>
                <p className="text-sm text-gray-600">学习生活的点点滴滴</p>
              </div>
            </div>
            {renderPhotoGrid(classroomPhotos)}
          </TabsContent>

          {/* 舍友合照 */}
          <TabsContent value="roommate" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-5 h-5 text-red-500" />
              <div>
                <h3 className="font-medium">宿舍生活</h3>
                <p className="text-sm text-gray-600">舍友间的温馨时光</p>
              </div>
            </div>
            {renderPhotoGrid(roommatePhotos)}
          </TabsContent>

          {/* 活动剪影 */}
          <TabsContent value="activity" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-yellow-500" />
              <div>
                <h3 className="font-medium">活动剪影</h3>
                <p className="text-sm text-gray-600">精彩活动的难忘瞬间</p>
              </div>
            </div>
            {renderPhotoGrid(activityPhotos)}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="h-20"></div>
    </div>
  );
}
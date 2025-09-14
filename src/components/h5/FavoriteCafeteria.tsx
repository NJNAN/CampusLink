import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, MapPin, Clock, Star, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FavoriteCafeteria() {
  const navigate = useNavigate();
  const [cafeterias] = useState([
    {
      id: '1', name: '第一食堂', location: '东区', 
      rating: 4.5, specialties: ['麻辣烫', '盖浇饭', '煲仔饭'],
      openTime: '06:30-21:30', price: '人均15元', likes: 89
    },
    {
      id: '2', name: '学生餐厅', location: '西区',
      rating: 4.2, specialties: ['沙县小吃', '兰州拉面', '黄焖鸡'],
      openTime: '07:00-21:00', price: '人均12元', likes: 67
    },
    {
      id: '3', name: '美食广场', location: '南区',
      rating: 4.0, specialties: ['火锅', '烧烤', '奶茶'],
      openTime: '10:00-22:00', price: '人均25元', likes: 45
    }
  ]);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg">心仪食堂</h1>
            <p className="text-sm text-gray-600">校园美食推荐</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {cafeterias.map((cafeteria) => (
          <Card key={cafeteria.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm mb-1">{cafeteria.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{cafeteria.location}</span>
                    <Clock className="w-3 h-3 ml-2" />
                    <span>{cafeteria.openTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm">{cafeteria.rating}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="text-xs text-gray-600">推荐菜品：</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cafeteria.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{cafeteria.price}</span>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-xs">{cafeteria.likes}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="h-20"></div>
    </div>
  );
}
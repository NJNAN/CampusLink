import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Clock, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  name: string;
  teacher: string;
  classroom: string;
  time: string;
  day: number; // 0-6 (周日-周六)
  period: number; // 1-12 (第几节课)
  weeks: string;
  type: string;
}

export default function CourseSchedule() {
  const navigate = useNavigate();
  const [currentWeek] = useState(3);
  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: '数据结构与算法',
      teacher: '李教授',
      classroom: 'A101',
      time: '08:00-09:35',
      day: 1,
      period: 1,
      weeks: '1-16周',
      type: '必修'
    },
    {
      id: '2',
      name: '计算机网络',
      teacher: '王教授',
      classroom: 'B205',
      time: '10:00-11:35',
      day: 1,
      period: 3,
      weeks: '1-16周',
      type: '必修'
    },
    {
      id: '3',
      name: '操作系统',
      teacher: '张教授',
      classroom: 'A203',
      time: '14:00-15:35',
      day: 2,
      period: 6,
      weeks: '1-16周',
      type: '必修'
    },
    {
      id: '4',
      name: '软件工程',
      teacher: '陈教授',
      classroom: 'C301',
      time: '08:00-09:35',
      day: 3,
      period: 1,
      weeks: '1-16周',
      type: '必修'
    },
    {
      id: '5',
      name: 'Web开发技术',
      teacher: '刘教授',
      classroom: 'D105',
      time: '10:00-11:35',
      day: 4,
      period: 3,
      weeks: '1-16周',
      type: '选修'
    }
  ]);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const periods = [
    { period: 1, time: '08:00-09:35' },
    { period: 3, time: '10:00-11:35' },
    { period: 5, time: '14:00-15:35' },
    { period: 7, time: '16:00-17:35' },
    { period: 9, time: '19:00-20:35' }
  ];

  const getCourseByDayAndPeriod = (day: number, period: number) => {
    return courses.find(course => course.day === day && course.period === period);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '必修': return 'bg-blue-100 text-blue-700';
      case '选修': return 'bg-green-100 text-green-700';
      case '实践': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">课程表</h1>
              <p className="text-sm text-gray-600">第{currentWeek}周</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-1" />
            切换周次
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* 今日课程 */}
        <Card className="border-0 shadow-sm mb-4">
          <CardContent className="p-4">
            <h3 className="text-sm mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              今日课程
            </h3>
            <div className="space-y-3">
              {courses.filter(course => course.day === new Date().getDay()).map((course) => (
                <div key={course.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-center min-w-0">
                    <div className="text-xs text-gray-500">时间</div>
                    <div className="text-sm">{course.time}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{course.name}</span>
                      <Badge className={`text-xs ${getTypeColor(course.type)}`}>
                        {course.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600">
                      {course.teacher} • {course.classroom}
                    </div>
                  </div>
                </div>
              ))}
              {courses.filter(course => course.day === new Date().getDay()).length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">今天没有课程安排</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 周课程表 */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm mb-3">本周课程表</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-96">
                <thead>
                  <tr>
                    <th className="text-xs text-gray-500 p-2 text-left w-16">时间</th>
                    {weekDays.slice(1, 6).map((day, index) => (
                      <th key={index} className="text-xs text-gray-500 p-2 text-center">
                        周{day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periods.map((period) => (
                    <tr key={period.period} className="border-t">
                      <td className="p-2 text-xs text-gray-600 align-top">
                        <div>{period.time}</div>
                      </td>
                      {[1, 2, 3, 4, 5].map((day) => {
                        const course = getCourseByDayAndPeriod(day, period.period);
                        return (
                          <td key={day} className="p-1 align-top">
                            {course ? (
                              <div className="bg-blue-100 p-2 rounded text-xs min-h-16">
                                <div className="text-blue-800 line-clamp-2 mb-1">
                                  {course.name}
                                </div>
                                <div className="text-blue-600 text-xs">
                                  {course.classroom}
                                </div>
                              </div>
                            ) : (
                              <div className="min-h-16"></div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 课程统计 */}
        <Card className="border-0 shadow-sm mt-4">
          <CardContent className="p-4">
            <h3 className="text-sm mb-3">本学期课程</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg text-blue-600">{courses.filter(c => c.type === '必修').length}</div>
                <div className="text-xs text-gray-500">必修课</div>
              </div>
              <div>
                <div className="text-lg text-green-600">{courses.filter(c => c.type === '选修').length}</div>
                <div className="text-xs text-gray-500">选修课</div>
              </div>
              <div>
                <div className="text-lg text-orange-600">{courses.length}</div>
                <div className="text-xs text-gray-500">总课程</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
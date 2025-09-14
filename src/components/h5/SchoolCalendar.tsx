import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Bell,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  type: 'exam' | 'holiday' | 'activity' | 'deadline' | 'meeting' | 'course';
  location?: string;
  description: string;
  isImportant: boolean;
}

export default function SchoolCalendar() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    // 模拟加载日程数据
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: '期末考试开始',
        date: '2024-01-15',
        startTime: '08:00',
        endTime: '18:00',
        type: 'exam',
        location: '各教学楼',
        description: '2024年春季学期期末考试正式开始，请同学们按时参加考试。',
        isImportant: true
      },
      {
        id: '2',
        title: '寒假开始',
        date: '2024-01-20',
        type: 'holiday',
        description: '寒假正式开始，祝同学们假期愉快！',
        isImportant: true
      },
      {
        id: '3',
        title: '春季学期开学',
        date: '2024-02-26',
        type: 'course',
        description: '春季学期正式开学，请同学们按时返校上课。',
        isImportant: true
      },
      {
        id: '4',
        title: '社团招新活动',
        date: '2024-01-18',
        startTime: '14:00',
        endTime: '17:00',
        type: 'activity',
        location: '学生活动中心',
        description: '各大社团开展招新活动，欢迎新同学加入。',
        isImportant: false
      },
      {
        id: '5',
        title: '选课截止',
        date: '2024-01-16',
        startTime: '23:59',
        type: 'deadline',
        description: '下学期选课系统关闭，请务必在截止时间前完成选课。',
        isImportant: true
      },
      {
        id: '6',
        title: '学术讲座',
        date: '2024-01-17',
        startTime: '19:00',
        endTime: '21:00',
        type: 'meeting',
        location: '学术报告厅',
        description: '邀请知名学者进行学术讲座，欢迎师生参加。',
        isImportant: false
      }
    ];

    setEvents(mockEvents);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-700';
      case 'holiday': return 'bg-green-100 text-green-700';
      case 'activity': return 'bg-blue-100 text-blue-700';
      case 'deadline': return 'bg-orange-100 text-orange-700';
      case 'meeting': return 'bg-purple-100 text-purple-700';
      case 'course': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'exam': return '考试';
      case 'holiday': return '假期';
      case 'activity': return '活动';
      case 'deadline': return '截止';
      case 'meeting': return '会议';
      case 'course': return '课程';
      default: return '其他';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getEventsForMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthNum = month.getMonth() + 1;
    const monthStr = `${year}-${monthNum.toString().padStart(2, '0')}`;
    return events.filter(event => event.date.startsWith(monthStr));
  };

  const getUpcomingEvents = (limit = 5) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    return events
      .filter(event => event.date >= todayStr)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, limit);
  };

  const hasEventsOnDate = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  const selectedDateEvents = getEventsForDate(selectedDate);
  const monthEvents = getEventsForMonth(currentMonth);
  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* 页面头部 */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">校历</h1>
              <p className="text-sm text-gray-600">学校日程安排</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            提醒
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="month" className="text-xs">月视图</TabsTrigger>
            <TabsTrigger value="list" className="text-xs">列表</TabsTrigger>
            <TabsTrigger value="week" className="text-xs">即将到来</TabsTrigger>
          </TabsList>

          <TabsContent value="month" className="mt-4">
            {/* 月份导航 */}
            <Card className="border-0 shadow-sm mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const prevMonth = new Date(currentMonth);
                      prevMonth.setMonth(prevMonth.getMonth() - 1);
                      setCurrentMonth(prevMonth);
                    }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h3 className="text-lg">
                    {currentMonth.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const nextMonth = new Date(currentMonth);
                      nextMonth.setMonth(nextMonth.getMonth() + 1);
                      setCurrentMonth(nextMonth);
                    }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="rounded-md border-0"
                  modifiers={{
                    hasEvents: (date) => hasEventsOnDate(date)
                  }}
                  modifiersStyles={{
                    hasEvents: { 
                      backgroundColor: 'rgb(59 130 246 / 0.1)',
                      color: 'rgb(59 130 246)',
                      fontWeight: 'bold'
                    }
                  }}
                />

                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-600 mb-2">本月共有 {monthEvents.length} 个日程</div>
                  <div className="flex justify-center gap-2">
                    <div className="flex items-center gap-1 text-xs">
                      <div className="w-3 h-3 bg-blue-200 rounded"></div>
                      <span>有日程</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 选中日期的事件 */}
            {selectedDateEvents.length > 0 && (
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    {formatDate(selectedDate.toISOString().split('T')[0])} 的日程
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => (
                      <div key={event.id} className="border-l-4 border-blue-500 pl-3 py-2">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm">{event.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                              {getEventTypeText(event.type)}
                            </Badge>
                            {event.isImportant && (
                              <Bell className="w-3 h-3 text-red-500" />
                            )}
                          </div>
                        </div>
                        {(event.startTime || event.location) && (
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-1">
                            {event.startTime && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {formatTime(event.startTime)}
                                  {event.endTime && ` - ${formatTime(event.endTime)}`}
                                </span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-gray-600">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            <div className="space-y-3">
              {events
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((event) => (
                  <Card key={event.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm">{event.title}</h3>
                            <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                              {getEventTypeText(event.type)}
                            </Badge>
                            {event.isImportant && (
                              <Bell className="w-3 h-3 text-red-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="w-3 h-3" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            {event.startTime && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {formatTime(event.startTime)}
                                  {event.endTime && ` - ${formatTime(event.endTime)}`}
                                </span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{event.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="week" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">即将到来的日程</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-l-4 border-green-500 pl-3 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm">{event.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                            {getEventTypeText(event.type)}
                          </Badge>
                          {event.isImportant && (
                            <Bell className="w-3 h-3 text-red-500" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-1">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        {event.startTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {formatTime(event.startTime)}
                              {event.endTime && ` - ${formatTime(event.endTime)}`}
                            </span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{event.description}</p>
                    </div>
                  ))}

                  {upcomingEvents.length === 0 && (
                    <div className="text-center py-8">
                      <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg text-gray-600 mb-2">暂无即将到来的日程</h3>
                      <p className="text-sm text-gray-500">最近没有安排的活动</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
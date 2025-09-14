import { useState } from 'react';
import { ArrowLeft, Globe, Check } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  available: boolean;
}

export default function LanguageSettings() {
  const navigate = useNavigate();
  
  const [selectedLanguage, setSelectedLanguage] = useState('zh-CN');
  
  const languages: Language[] = [
    {
      code: 'zh-CN',
      name: 'Chinese (Simplified)',
      nativeName: '简体中文',
      flag: '🇨🇳',
      available: true
    },
    {
      code: 'zh-TW',
      name: 'Chinese (Traditional)',
      nativeName: '繁體中文',
      flag: '🇹🇼',
      available: false
    },
    {
      code: 'en-US',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      available: false
    },
    {
      code: 'ja-JP',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
      available: false
    },
    {
      code: 'ko-KR',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      available: false
    },
    {
      code: 'es-ES',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      available: false
    },
    {
      code: 'fr-FR',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      available: false
    },
    {
      code: 'de-DE',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      available: false
    }
  ];

  const handleLanguageSelect = (languageCode: string, available: boolean) => {
    if (!available) {
      toast.info('该语言暂未支持，敬请期待');
      return;
    }

    setSelectedLanguage(languageCode);
    
    // 模拟保存设置
    setTimeout(() => {
      localStorage.setItem('language', languageCode);
      toast.success('语言设置已更新');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-medium">语言设置</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 当前语言 */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900">当前语言</h3>
              <p className="text-sm text-blue-700">
                {languages.find(lang => lang.code === selectedLanguage)?.nativeName}
              </p>
            </div>
          </div>
        </Card>

        {/* 可用语言列表 */}
        <Card className="p-0 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-sm font-medium text-gray-900">选择语言</h2>
            <p className="text-xs text-gray-600">更改应用界面语言</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {languages.map((language) => (
              <div 
                key={language.code}
                className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
                  !language.available ? 'opacity-50' : ''
                }`}
                onClick={() => handleLanguageSelect(language.code, language.available)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <div className="font-medium text-sm">{language.nativeName}</div>
                    <div className="text-xs text-gray-500">{language.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {!language.available && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      即将推出
                    </span>
                  )}
                  {selectedLanguage === language.code && language.available && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 语言说明 */}
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="space-y-2">
            <h3 className="font-medium text-yellow-900 text-sm">语言支持说明</h3>
            <div className="text-xs text-yellow-800 space-y-1">
              <p>• 目前仅支持简体中文，其他语言正在开发中</p>
              <p>• 更改语言后需要重启应用才能完全生效</p>
              <p>• 部分内容可能仍显示为默认语言</p>
            </div>
          </div>
        </Card>

        {/* 区域设置 */}
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm mb-2">区域设置</h3>
              <p className="text-xs text-gray-600 mb-3">
                区域设置会影响日期、时间和数字格式的显示
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-500">日期格式</div>
                <div className="text-sm font-medium">2024年1月15日</div>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-500">时间格式</div>
                <div className="text-sm font-medium">24小时制</div>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-500">数字格式</div>
                <div className="text-sm font-medium">1,234.56</div>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-500">货币格式</div>
                <div className="text-sm font-medium">¥ 1,234.56</div>
              </div>
            </div>
          </div>
        </Card>

        {/* 翻译贡献 */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
          <div className="text-center space-y-2">
            <h3 className="font-medium text-green-900 text-sm">帮助翻译</h3>
            <p className="text-xs text-green-700">
              如果您精通其他语言，欢迎参与翻译工作，让更多用户受益
            </p>
            <Button variant="outline" size="sm" className="text-green-700 border-green-300">
              了解更多
            </Button>
          </div>
        </Card>

        {/* 底部安全区域 */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}
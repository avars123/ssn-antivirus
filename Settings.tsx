import { Bell, Shield, Zap, Globe, Moon, Key, Database } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

export function Settings() {
  const settings = [
    {
      category: 'Защита',
      icon: Shield,
      items: [
        { id: 'realtime', label: 'Защита в реальном времени', description: 'Постоянный мониторинг системы', enabled: true },
        { id: 'cloud', label: 'Облачная защита', description: 'Расширенное обнаружение угроз', enabled: true },
        { id: 'behavioral', label: 'Поведенческий анализ', description: 'Обнаружение подозрительной активности', enabled: true },
      ],
    },
    {
      category: 'Сканирование',
      icon: Zap,
      items: [
        { id: 'autoScan', label: 'Автоматическое сканирование', description: 'Ежедневная быстрая проверка', enabled: true },
        { id: 'usb', label: 'Сканирование USB-устройств', description: 'Автопроверка внешних устройств', enabled: true },
        { id: 'email', label: 'Защита электронной почты', description: 'Проверка вложений электронной почты', enabled: false },
      ],
    },
    {
      category: 'Уведомления',
      icon: Bell,
      items: [
        { id: 'threats', label: 'Оповещения об угрозах', description: 'Уведомлять при обнаружении угроз', enabled: true },
        { id: 'updates', label: 'Уведомления об обновлениях', description: 'Оповещать о новых обновлениях', enabled: true },
        { id: 'summary', label: 'Еженедельный отчет', description: 'Еженедельный отчет о защите', enabled: false },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 dark:text-white">Настройки</h2>
        <p className="text-slate-500 dark:text-slate-400">Настройте параметры защиты</p>
      </div>

      {/* Settings Categories */}
      <div className="space-y-6">
        {settings.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <Card key={categoryIndex} className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                  <Icon className="w-5 h-5 text-white relative z-10" />
                </div>
                <h3 className="text-slate-900 dark:text-white">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={item.id}>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex-1">
                        <p className="text-slate-900 dark:text-white mb-1">{item.label}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                      </div>
                      <Switch defaultChecked={item.enabled} />
                    </div>
                    {itemIndex < category.items.length - 1 && (
                      <Separator className="bg-slate-200 dark:bg-slate-700" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional Settings */}
      <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
            <Database className="w-5 h-5 text-white relative z-10" />
          </div>
          <h3 className="text-slate-900 dark:text-white">Дополнительно</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-white/5 cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-white/50 transition-all shadow-lg">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <div>
                <p className="text-slate-900 dark:text-white">Обновление базы данных</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Последнее обновление: Сегодня</p>
              </div>
            </div>
            <span className="text-sm text-blue-600 dark:text-blue-400">Проверить</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-white/5 cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-white/50 transition-all shadow-lg">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <div>
                <p className="text-slate-900 dark:text-white">Информация о лицензии</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Премиум - Активна</p>
              </div>
            </div>
            <span className="text-sm text-blue-600 dark:text-blue-400">Подробнее</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-white/5 cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-white/50 transition-all shadow-lg">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <div>
                <p className="text-slate-900 dark:text-white">Оформление</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Системное</p>
              </div>
            </div>
            <span className="text-sm text-blue-600 dark:text-blue-400">Изменить</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

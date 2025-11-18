import { AlertTriangle, Trash2, RotateCcw, FileX, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export function Quarantine() {
  const quarantinedItems = [
    {
      name: 'suspicious_installer.exe',
      threat: 'Malware.Generic.2024',
      path: '/Users/admin/Downloads/',
      date: '2 мин назад',
      size: '2.4 МБ',
      risk: 'high',
    },
    {
      name: 'adware_bundle.dmg',
      threat: 'Adware.Installer',
      path: '/Users/admin/Desktop/',
      date: '1 час назад',
      size: '15.8 МБ',
      risk: 'medium',
    },
    {
      name: 'tracking_cookie.js',
      threat: 'PUP.Optional.Bundle',
      path: '/Users/admin/Library/Caches/',
      date: '3 часа назад',
      size: '124 КБ',
      risk: 'low',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 dark:text-white">Карантин</h2>
        <p className="text-slate-500 dark:text-slate-400">Изолированные угрозы и подозрительные файлы</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">В карантине</p>
              <p className="text-slate-900 dark:text-white">3 объекта</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Удалено</p>
              <p className="text-slate-900 dark:text-white">127 объектов</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <FileX className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Общий размер</p>
              <p className="text-slate-900 dark:text-white">18.3 МБ</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quarantined Items */}
      <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-slate-900 dark:text-white">Объекты в карантине</h3>
          <Button variant="outline" size="sm" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800">
            <Trash2 className="w-4 h-4 mr-2" />
            Очистить все
          </Button>
        </div>

        <div className="space-y-4">
          {quarantinedItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.risk === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                    item.risk === 'medium' ? 'bg-orange-100 dark:bg-orange-900/30' :
                    'bg-yellow-100 dark:bg-yellow-900/30'
                  }`}>
                    <FileX className={`w-6 h-6 ${
                      item.risk === 'high' ? 'text-red-600 dark:text-red-400' :
                      item.risk === 'medium' ? 'text-orange-600 dark:text-orange-400' :
                      'text-yellow-600 dark:text-yellow-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-slate-900 dark:text-white truncate">{item.name}</p>
                      <Badge className={
                        item.risk === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0' :
                        item.risk === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-0' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-0'
                      }>
                        {item.risk === 'high' ? 'высокая' : item.risk === 'medium' ? 'средняя' : 'низкая'}
                      </Badge>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-2">{item.threat}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="truncate">{item.path}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button variant="outline" size="sm" className="flex-1">
                  <RotateCcw className="w-3 h-3 mr-2" />
                  Восстановить
                </Button>
                <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                  <Trash2 className="w-3 h-3 mr-2" />
                  Удалить
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Empty State Alternative */}
      {quarantinedItems.length === 0 && (
        <Card className="p-12 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-slate-900 dark:text-white mb-2">Угроз не обнаружено</h3>
            <p className="text-slate-500 dark:text-slate-400">Карантин пуст. Все системы защищены.</p>
          </div>
        </Card>
      )}
    </div>
  );
}

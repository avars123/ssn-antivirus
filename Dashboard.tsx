import { Shield, Activity, Clock, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from './card';
import { Badge } from './badge';
import { Progress } from './progress';
import { motion } from 'motion/react';

export function Dashboard() {
  const threats = [
    { name: 'Malware.Generic.2024', severity: 'high', time: '2 мин назад', status: 'quarantined' },
    { name: 'Adware.Installer', severity: 'medium', time: '1 час назад', status: 'removed' },
    { name: 'PUP.Optional.Bundle', severity: 'low', time: '3 часа назад', status: 'removed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 dark:text-white">Панель безопасности</h2>
          <p className="text-slate-500 dark:text-slate-400">Статус защиты в реальном времени</p>
        </div>
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Защищено
        </Badge>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white shadow-2xl shadow-blue-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-lg">
                <Shield className="w-6 h-6" />
              </div>
              <Badge className="bg-white/30 text-white border border-white/40 backdrop-blur-xl">Активно</Badge>
            </div>
            <h3 className="text-white mb-1 relative z-10">Защита в реальном времени</h3>
            <p className="text-blue-100 text-sm relative z-10">Все системы под контролем</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white shadow-2xl shadow-purple-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <Badge className="bg-white/30 text-white border border-white/40 backdrop-blur-xl">24/7</Badge>
            </div>
            <h3 className="text-white mb-1 relative z-10">Файлов проверено</h3>
            <p className="text-purple-100 text-sm relative z-10">1 284 592 всего</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white shadow-2xl shadow-emerald-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <Badge className="bg-white/30 text-white border border-white/40 backdrop-blur-xl">Отлично</Badge>
            </div>
            <h3 className="text-white mb-1 relative z-10">Состояние системы</h3>
            <p className="text-emerald-100 text-sm relative z-10">Оптимальная производительность</p>
          </Card>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
        <h3 className="text-slate-900 dark:text-white mb-6">Производительность системы</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Использование ЦП</span>
              <span className="text-sm text-slate-900 dark:text-white">12%</span>
            </div>
            <Progress value={12} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Использование памяти</span>
              <span className="text-sm text-slate-900 dark:text-white">28%</span>
            </div>
            <Progress value={28} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Активность диска</span>
              <span className="text-sm text-slate-900 dark:text-white">8%</span>
            </div>
            <Progress value={8} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Recent Threats */}
      <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-slate-900 dark:text-white">Последние угрозы</h3>
          <Badge variant="outline" className="text-slate-600 dark:text-slate-400">
            За последние 24 часа
          </Badge>
        </div>
        <div className="space-y-4">
          {threats.map((threat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-white/5"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  threat.severity === 'high' ? 'bg-red-100 dark:bg-red-900/30' :
                  threat.severity === 'medium' ? 'bg-orange-100 dark:bg-orange-900/30' :
                  'bg-yellow-100 dark:bg-yellow-900/30'
                }`}>
                  <AlertCircle className={`w-5 h-5 ${
                    threat.severity === 'high' ? 'text-red-600 dark:text-red-400' :
                    threat.severity === 'medium' ? 'text-orange-600 dark:text-orange-400' :
                    'text-yellow-600 dark:text-yellow-400'
                  }`} />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white">{threat.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">{threat.time}</span>
                  </div>
                </div>
              </div>
              <Badge className={
                threat.status === 'quarantined' 
                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-0'
                  : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0'
              }>
                {threat.status === 'quarantined' ? 'В карантине' : 'Удалено'}
              </Badge>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}

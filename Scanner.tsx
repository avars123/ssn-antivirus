import { useState } from 'react';
import { Scan, Zap, HardDrive, Folder, Play, CheckCircle2, FileSearch } from 'lucide-react';
import { Card } from './card';
import { Button } from './button';
import { Progress } from './progress';
import { Badge } from './badge';
import { motion } from 'motion/react';

export function Scanner() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filesScanned, setFilesScanned] = useState(0);

  const startScan = (type: string) => {
    setScanning(true);
    setProgress(0);
    setFilesScanned(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return prev + 2;
      });
      setFilesScanned((prev) => prev + Math.floor(Math.random() * 100) + 50);
    }, 200);
  };

  const scanTypes = [
    {
      id: 'quick',
      icon: Zap,
      title: 'Быстрое сканирование',
      description: 'Проверка критических областей (2-3 мин)',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'full',
      icon: HardDrive,
      title: 'Полное сканирование',
      description: 'Полная проверка системы (30-60 мин)',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'custom',
      icon: Folder,
      title: 'Выборочное сканирование',
      description: 'Выберите конкретные папки',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 dark:text-white">Сканер угроз</h2>
        <p className="text-slate-500 dark:text-slate-400">Выберите тип сканирования для защиты системы</p>
      </div>

      {/* Scan Options */}
      {!scanning && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scanTypes.map((scan, index) => {
            const Icon = scan.icon;
            return (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 hover:shadow-2xl hover:border-white/40 transition-all cursor-pointer group shadow-xl shadow-black/5">
                  <div className={`w-16 h-16 bg-gradient-to-br ${scan.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                    <Icon className="w-8 h-8 text-white relative z-10" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white mb-2">{scan.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{scan.description}</p>
                  <Button 
                    onClick={() => startScan(scan.id)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Начать сканирование
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Scanning Progress */}
      {scanning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/5">
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                <Scan className="w-10 h-10 text-white relative z-10" />
              </motion.div>
              <h3 className="text-slate-900 dark:text-white mb-2">Идет сканирование...</h3>
              <p className="text-slate-500 dark:text-slate-400">Пожалуйста, подождите, пока мы проверяем вашу систему</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-600 dark:text-slate-400">Прогресс</span>
                  <span className="text-slate-900 dark:text-white">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-white/5">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Файлов проверено</p>
                  <p className="text-slate-900 dark:text-white">{filesScanned.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-white/5">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Найдено угроз</p>
                  <p className="text-slate-900 dark:text-white">0</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Scan Complete */}
      {!scanning && progress === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-2xl border border-green-200/50 dark:border-green-800/50 shadow-2xl shadow-green-500/10">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-green-500/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                <CheckCircle2 className="w-10 h-10 text-white relative z-10" />
              </div>
              <h3 className="text-slate-900 dark:text-white mb-2">Сканирование завершено!</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">Угроз не обнаружено. Ваша система защищена.</p>
              <div className="flex items-center justify-center gap-4">
                <div className="px-6 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Файлов проверено</p>
                  <p className="text-slate-900 dark:text-white">{filesScanned.toLocaleString()}</p>
                </div>
                <div className="px-6 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Затрачено времени</p>
                  <p className="text-slate-900 dark:text-white">2 мин 15 сек</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Recent Scans */}
      <Card className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
        <h3 className="text-slate-900 dark:text-white mb-6">Последние проверки</h3>
        <div className="space-y-3">
          {[
            { type: 'Быстрое сканирование', date: 'Сегодня, 14:30', threats: 0, files: 12450 },
            { type: 'Полное сканирование', date: 'Вчера, 10:15', threats: 2, files: 284592 },
            { type: 'Быстрое сканирование', date: '16 ноя, 16:45', threats: 0, files: 11230 },
          ].map((scan, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileSearch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white">{scan.type}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{scan.date} • {scan.files.toLocaleString()} files</p>
                </div>
              </div>
              <Badge className={scan.threats === 0 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0'
              }>
                {scan.threats === 0 ? 'Чисто' : `${scan.threats} угроз`}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

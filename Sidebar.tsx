import { Shield, Scan, AlertTriangle, Settings as SettingsIcon } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Панель управления', icon: Shield },
    { id: 'scanner', label: 'Сканер', icon: Scan },
    { id: 'quarantine', label: 'Карантин', icon: AlertTriangle },
    { id: 'settings', label: 'Настройки', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border-r border-white/20 dark:border-white/10 shadow-xl shadow-black/5">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
            <Shield className="w-6 h-6 text-white relative z-10" />
          </div>
          <div>
            <h1 className="text-slate-900 dark:text-white">ShieldGuard</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Премиум защита</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5 backdrop-blur-sm'
                }`}
              >
                {isActive && <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

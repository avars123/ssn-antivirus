import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Scanner } from './components/Scanner';
import { Quarantine } from './components/Quarantine';
import { Settings } from './components/Settings';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-blue-950 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-400/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="flex h-screen relative z-10">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {activeView === 'dashboard' && <Dashboard />}
            {activeView === 'scanner' && <Scanner />}
            {activeView === 'quarantine' && <Quarantine />}
            {activeView === 'settings' && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
}

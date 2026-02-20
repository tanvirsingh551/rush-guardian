import { useState, useEffect } from 'react';
import { Activity, Wifi, Cpu, Database } from 'lucide-react';

const stats = [
  { label: 'NODES ONLINE', icon: Wifi, value: 847, max: 900, color: 'text-neon-green' },
  { label: 'CPU LOAD', icon: Cpu, value: 73, max: 100, suffix: '%', color: 'text-neon-amber' },
  { label: 'SIGNALS ACTIVE', icon: Activity, value: 2341, max: 2500, color: 'text-secondary' },
  { label: 'DB OPS/S', icon: Database, value: 14200, max: 20000, color: 'text-neon-cyan' },
];

export default function SystemStats() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map(stat => {
        const jitter = Math.round((Math.random() - 0.5) * stat.max * 0.05);
        const current = Math.max(0, Math.min(stat.max, stat.value + jitter));
        return (
          <div key={stat.label} className="rounded border border-border bg-card p-3 text-center">
            <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
            <div className={`text-lg font-display font-bold ${stat.color}`}>
              {current.toLocaleString()}{stat.suffix || ''}
            </div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Activity, Wifi, Cpu, Database, Camera, Radar } from 'lucide-react';

const stats = [
  { label: 'CCTV NODES', icon: Camera, value: 847, max: 900, color: 'text-neon-teal' },
  { label: 'CPU LOAD', icon: Cpu, value: 73, max: 100, suffix: '%', color: 'text-neon-amber' },
  { label: 'SIGNALS', icon: Activity, value: 2341, max: 2500, color: 'text-neon-pink' },
  { label: 'RADAR', icon: Radar, value: 96, max: 100, suffix: '%', color: 'text-neon-green' },
  { label: 'NETWORK', icon: Wifi, value: 99, max: 100, suffix: '%', color: 'text-neon-purple' },
  { label: 'DB OPS/S', icon: Database, value: 14200, max: 20000, color: 'text-neon-teal' },
];

export default function SystemStats() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-6 gap-2">
      {stats.map(stat => {
        const jitter = Math.round((Math.random() - 0.5) * stat.max * 0.05);
        const current = Math.max(0, Math.min(stat.max, stat.value + jitter));
        return (
          <div key={stat.label} className="vice-card p-3 text-center group hover:box-glow-teal transition-all">
            <stat.icon className={`w-4 h-4 mx-auto mb-1.5 ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
            <div className={`text-base font-tech font-bold ${stat.color}`}>
              {current.toLocaleString()}{stat.suffix || ''}
            </div>
            <div className="text-[8px] text-muted-foreground uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { emergencyRoutes } from '@/data/mockData';
import { Navigation, CircleDot } from 'lucide-react';

export default function EmergencyRouting() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-display uppercase tracking-[0.3em] text-secondary">
        Emergency Route Clearance
      </h2>

      <div className="flex flex-col gap-2">
        {emergencyRoutes.map(route => (
          <div
            key={route.id}
            className={`
              rounded border bg-card p-3
              ${route.status === 'blocked' ? 'border-neon-red/40' : 
                route.status === 'clearing' ? 'border-neon-amber/30' : 'border-neon-green/30'}
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-secondary" />
                <span className="text-xs font-bold text-foreground">{route.unit}</span>
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-bold ${
                route.status === 'blocked' ? 'text-neon-red animate-blink' :
                route.status === 'clearing' ? 'text-neon-amber animate-pulse-neon' :
                'text-neon-green'
              }`}>
                {route.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
              <CircleDot className="w-2.5 h-2.5 text-neon-green" />
              <span>{route.origin}</span>
              <span className="text-secondary">→</span>
              <span>{route.destination}</span>
            </div>

            <div className="flex items-center gap-4 text-[10px]">
              <span className="text-muted-foreground">ETA <span className="text-foreground">{route.eta}</span></span>
              <span className="text-muted-foreground">SIGNALS <span className="text-secondary">{route.signalsOverridden}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

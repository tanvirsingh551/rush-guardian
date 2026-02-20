import { emergencyRoutes, type EmergencyRoute } from '@/data/mockData';
import { Navigation, CircleDot, Ambulance, Shield, Flame, Siren } from 'lucide-react';

const unitIcons: Record<EmergencyRoute['unitType'], React.ReactNode> = {
  ambulance: <Ambulance className="w-3.5 h-3.5 text-neon-green" />,
  swat: <Shield className="w-3.5 h-3.5 text-neon-teal" />,
  escort: <Siren className="w-3.5 h-3.5 text-neon-purple" />,
  fire: <Flame className="w-3.5 h-3.5 text-neon-orange" />,
};

const statusColors = {
  clearing: { text: 'text-neon-amber', bar: 'bg-neon-amber', border: 'border-neon-amber/20' },
  blocked: { text: 'text-neon-red', bar: 'bg-neon-red', border: 'border-neon-red/30' },
  clear: { text: 'text-neon-green', bar: 'bg-neon-green', border: 'border-neon-green/20' },
};

export default function EmergencyRouting() {
  return (
    <div className="vice-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Navigation className="w-4 h-4 text-neon-teal" />
        <h3 className="text-xs font-tech uppercase tracking-[0.3em] text-secondary">
          Smart Siren Routing
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {emergencyRoutes.map(route => {
          const colors = statusColors[route.status];
          return (
            <div key={route.id} className={`rounded-lg border bg-card/60 p-3 ${colors.border}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {unitIcons[route.unitType]}
                  <span className="text-xs font-bold text-foreground">{route.unit}</span>
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-bold ${colors.text} ${
                  route.status === 'blocked' ? 'animate-blink' : route.status === 'clearing' ? 'animate-pulse-neon' : ''
                }`}>
                  {route.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
                <CircleDot className="w-2.5 h-2.5 text-neon-green shrink-0" />
                <span className="truncate">{route.origin}</span>
                <span className="text-neon-pink">→</span>
                <span className="truncate">{route.destination}</span>
              </div>

              {/* Progress bar */}
              <div className="relative h-1.5 rounded-full bg-muted/50 overflow-hidden mb-2">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ${colors.bar}`}
                  style={{ width: `${route.progress}%` }}
                />
              </div>

              <div className="flex items-center gap-4 text-[10px]">
                <span className="text-muted-foreground">ETA <span className="text-foreground font-bold">{route.eta}</span></span>
                <span className="text-muted-foreground">SIGNALS <span className="text-neon-teal font-bold">{route.signalsOverridden}</span></span>
                <span className="ml-auto text-muted-foreground">{route.progress}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

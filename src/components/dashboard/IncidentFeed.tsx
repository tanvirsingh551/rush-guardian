import { incidents, type Incident, type IncidentType } from '@/data/mockData';
import { Siren, Ambulance, Shield, AlertTriangle, Radio } from 'lucide-react';

const iconMap: Record<IncidentType, React.ReactNode> = {
  chase: <Siren className="w-3.5 h-3.5 text-neon-red" />,
  emergency: <Ambulance className="w-3.5 h-3.5 text-neon-amber" />,
  vip: <Shield className="w-3.5 h-3.5 text-neon-cyan" />,
  gridlock: <AlertTriangle className="w-3.5 h-3.5 text-neon-amber" />,
  influencer: <Radio className="w-3.5 h-3.5 text-neon-purple" />,
};

const threatStars = (level: number) => (
  <div className="flex gap-[2px]">
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`text-[10px] ${i < level ? 'text-neon-red' : 'text-muted-foreground/30'}`}
      >
        ★
      </span>
    ))}
  </div>
);

export default function IncidentFeed() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-display uppercase tracking-[0.3em] text-secondary">
          Active Incidents
        </h2>
        <span className="text-[10px] text-neon-red animate-blink uppercase tracking-wider">
          ● LIVE
        </span>
      </div>

      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
        {incidents.map(inc => (
          <div
            key={inc.id}
            className={`
              rounded border bg-card p-3 transition-all
              ${inc.threatLevel >= 5 ? 'border-neon-red/40 animate-threat-pulse' : 
                inc.threatLevel >= 4 ? 'border-neon-amber/30' : 'border-border'}
            `}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                {iconMap[inc.type]}
                <span className="text-[10px] text-muted-foreground font-mono">{inc.id}</span>
              </div>
              {threatStars(inc.threatLevel)}
            </div>

            <p className="text-xs font-medium text-foreground mb-1">{inc.title}</p>
            <p className="text-[10px] text-muted-foreground mb-2">{inc.location}</p>

            <div className="flex items-center gap-3 text-[10px]">
              <span className="text-muted-foreground">T-{inc.timestamp}</span>
              {inc.speed && (
                <span className="text-neon-red">{inc.speed} KM/H</span>
              )}
              {inc.units && (
                <span className="text-secondary">{inc.units} UNITS</span>
              )}
              <span className={`ml-auto uppercase tracking-wider ${
                inc.status === 'active' ? 'text-neon-red' :
                inc.status === 'contained' ? 'text-neon-amber' : 'text-neon-green'
              }`}>
                {inc.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

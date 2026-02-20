import { incidents, type IncidentType } from '@/data/mockData';
import { Siren, Ambulance, Shield, AlertTriangle, Radio } from 'lucide-react';

const iconMap: Record<IncidentType, React.ReactNode> = {
  chase: <Siren className="w-3.5 h-3.5 text-neon-pink" />,
  emergency: <Ambulance className="w-3.5 h-3.5 text-neon-amber" />,
  vip: <Shield className="w-3.5 h-3.5 text-neon-teal" />,
  gridlock: <AlertTriangle className="w-3.5 h-3.5 text-neon-orange" />,
  influencer: <Radio className="w-3.5 h-3.5 text-neon-purple" />,
};

const typeColors: Record<IncidentType, string> = {
  chase: 'border-neon-pink/30',
  emergency: 'border-neon-amber/30',
  vip: 'border-neon-teal/20',
  gridlock: 'border-neon-orange/30',
  influencer: 'border-neon-purple/20',
};

const threatStars = (level: number) => (
  <div className="flex gap-[2px]">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-[10px] ${i < level ? 'text-neon-pink' : 'text-muted-foreground/20'}`}>★</span>
    ))}
  </div>
);

export default function IncidentFeed() {
  return (
    <div className="vice-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-tech uppercase tracking-[0.3em] text-secondary">
          Active Incidents
        </h3>
        <span className="text-[10px] text-neon-pink animate-blink uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" /> LIVE
        </span>
      </div>

      <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
        {incidents.map((inc, i) => (
          <div
            key={inc.id}
            className={`
              rounded-lg border bg-card/60 p-3 transition-all
              ${inc.threatLevel >= 5 ? 'border-neon-pink/40 animate-threat-pulse' : typeColors[inc.type]}
            `}
            style={{ animationDelay: `${i * 0.1}s` }}
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

            <div className="flex items-center gap-3 text-[10px] flex-wrap">
              <span className="text-muted-foreground">T-{inc.timestamp}</span>
              {inc.speed && <span className="text-neon-pink font-bold">{inc.speed} KM/H</span>}
              {inc.units && <span className="text-neon-teal">{inc.units} UNITS</span>}
              <span className={`ml-auto uppercase tracking-wider font-bold ${
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

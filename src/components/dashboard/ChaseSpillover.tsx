import { useState } from 'react';
import { spilloverZones, type SpilloverZone } from '@/data/mockData';
import { Hospital, GraduationCap, Building2, AlertTriangle, Users, TrafficCone, Route, Check, ChevronRight } from 'lucide-react';

const zoneIcons: Record<SpilloverZone['type'], React.ReactNode> = {
  hospital: <Hospital className="w-5 h-5 text-neon-red" />,
  school: <GraduationCap className="w-5 h-5 text-neon-amber" />,
  business: <Building2 className="w-5 h-5 text-neon-teal" />,
};

const zoneColors: Record<SpilloverZone['type'], { border: string; glow: string; accent: string }> = {
  hospital: { border: 'border-neon-red/40', glow: 'box-glow-red', accent: 'text-neon-red' },
  school: { border: 'border-neon-amber/40', glow: 'box-glow-amber', accent: 'text-neon-amber' },
  business: { border: 'border-neon-teal/30', glow: 'box-glow-teal', accent: 'text-neon-teal' },
};

export default function ChaseSpillover() {
  const [zones, setZones] = useState(spilloverZones);
  const [activatedActions, setActivatedActions] = useState<Record<string, Set<number>>>({});

  const activateAction = (zoneId: string, actionIdx: number) => {
    setActivatedActions(prev => {
      const zoneActions = new Set(prev[zoneId] || []);
      zoneActions.add(actionIdx);
      return { ...prev, [zoneId]: zoneActions };
    });

    // Simulate threat reduction
    setZones(prev => prev.map(z => 
      z.id === zoneId 
        ? { ...z, threatLevel: Math.max(10, z.threatLevel - 12), rerouted: true }
        : z
    ));
  };

  const totalThreats = zones.reduce((sum, z) => sum + z.threatLevel, 0);
  const avgThreat = Math.round(totalThreats / zones.length);

  return (
    <div className="vice-card-danger p-5 animate-zone-alert">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <AlertTriangle className="w-6 h-6 text-neon-red animate-pulse-neon" />
        </div>
        <div>
          <h2 className="text-sm font-display uppercase tracking-wider text-neon-red neon-glow-red">
            ⚠ Chase Spillover Event
          </h2>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            High-speed pursuit active across 3 critical zones — Signals failing — Citizens in panic
          </p>
        </div>
        <div className="ml-auto text-right">
          <div className="text-lg font-tech font-bold text-neon-red neon-glow-red">{avgThreat}%</div>
          <div className="text-[9px] text-muted-foreground uppercase">AVG THREAT</div>
        </div>
      </div>

      {/* Constraint Banner */}
      <div className="rounded border border-neon-pink/20 bg-neon-pink/5 px-3 py-2 mb-4 text-[10px] text-neon-pink flex items-center gap-2">
        <TrafficCone className="w-3.5 h-3.5 shrink-0" />
        <span className="uppercase tracking-wider">CONSTRAINT: You cannot stop the chase. You can only redirect chaos.</span>
      </div>

      {/* Zone Cards */}
      <div className="grid grid-cols-3 gap-3">
        {zones.map(zone => {
          const colors = zoneColors[zone.type];
          const zoneActivated = activatedActions[zone.id] || new Set();
          
          return (
            <div
              key={zone.id}
              className={`rounded-lg border bg-card/70 p-4 ${colors.border} ${
                zone.status === 'critical' ? 'animate-threat-pulse' : ''
              }`}
            >
              {/* Zone header */}
              <div className="flex items-center gap-2 mb-3">
                {zoneIcons[zone.type]}
                <div className="flex-1 min-w-0">
                  <div className={`text-[10px] uppercase tracking-wider font-bold ${colors.accent}`}>
                    {zone.type} ZONE
                  </div>
                  <div className="text-xs text-foreground truncate">{zone.name}</div>
                </div>
              </div>

              {/* Threat bar */}
              <div className="relative h-2 rounded-full bg-muted/50 overflow-hidden mb-3">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${zone.threatLevel}%`,
                    background: zone.threatLevel > 80 
                      ? `linear-gradient(90deg, hsl(var(--neon-amber)), hsl(var(--neon-red)))` 
                      : zone.threatLevel > 50 
                        ? `linear-gradient(90deg, hsl(var(--neon-teal)), hsl(var(--neon-amber)))` 
                        : `hsl(var(--neon-teal))`,
                  }}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] mb-3">
                <div className="flex items-center gap-1">
                  <Users className="w-2.5 h-2.5 text-muted-foreground" />
                  <span className="text-muted-foreground">CIV</span>
                  <span className="text-foreground font-bold ml-auto">{zone.civilians}</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-2.5 h-2.5 text-neon-red" />
                  <span className="text-muted-foreground">SIG↓</span>
                  <span className="text-neon-red font-bold ml-auto">{zone.signalsDown}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Route className="w-2.5 h-2.5 text-neon-amber" />
                  <span className="text-muted-foreground">ILLEGAL</span>
                  <span className="text-neon-amber font-bold ml-auto">{zone.illegalRoutes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">THREAT</span>
                  <span className={`font-bold font-tech ml-auto ${colors.accent}`}>{zone.threatLevel}%</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-1.5">
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">CONTAINMENT ACTIONS</div>
                {zone.actions.map((action, idx) => {
                  const isActive = zoneActivated.has(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => !isActive && activateAction(zone.id, idx)}
                      className={`
                        w-full text-left text-[10px] rounded px-2 py-1.5 border transition-all flex items-center gap-1.5
                        ${isActive 
                          ? 'border-neon-green/30 bg-neon-green/10 text-neon-green' 
                          : 'border-border bg-muted/20 text-foreground hover:border-neon-pink/30 hover:bg-neon-pink/5 cursor-pointer'
                        }
                      `}
                      disabled={isActive}
                    >
                      {isActive ? <Check className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-3 h-3 shrink-0 text-muted-foreground" />}
                      <span className="truncate">{action}</span>
                    </button>
                  );
                })}
              </div>

              {/* Status badge */}
              <div className={`mt-3 text-center text-[10px] uppercase tracking-widest font-bold ${
                zone.status === 'critical' ? 'text-neon-red' : zone.status === 'elevated' ? 'text-neon-amber' : 'text-neon-green'
              }`}>
                {zone.rerouted && '✓ REROUTED — '}{zone.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

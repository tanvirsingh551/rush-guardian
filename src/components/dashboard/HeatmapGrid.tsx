import { useState, useEffect, useMemo } from 'react';
import { generateGrid, type GridCell } from '@/data/mockData';

const getChaosColor = (level: number): string => {
  if (level > 80) return 'bg-neon-pink/70';
  if (level > 60) return 'bg-neon-red/50';
  if (level > 40) return 'bg-neon-amber/40';
  if (level > 20) return 'bg-neon-purple/20';
  return 'bg-neon-teal/10';
};

const getGlow = (level: number): string => {
  if (level > 80) return 'shadow-[0_0_12px_hsl(var(--neon-pink-glow)/0.6)]';
  if (level > 60) return 'shadow-[0_0_8px_hsl(var(--neon-red-glow)/0.3)]';
  return '';
};

export default function HeatmapGrid() {
  const [grid, setGrid] = useState<GridCell[]>([]);
  const [hoveredCell, setHoveredCell] = useState<GridCell | null>(null);

  useEffect(() => {
    setGrid(generateGrid());
    const interval = setInterval(() => {
      setGrid(prev => prev.map(cell => ({
        ...cell,
        chaosLevel: Math.max(0, Math.min(100, cell.chaosLevel + (Math.random() - 0.5) * 8)),
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const critical = grid.filter(c => c.chaosLevel > 80).length;
    const elevated = grid.filter(c => c.chaosLevel > 40 && c.chaosLevel <= 80).length;
    return { critical, elevated };
  }, [grid]);

  return (
    <div className="vice-card p-4 relative">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-tech uppercase tracking-[0.3em] text-secondary">
          Chaos Heatmap — San Viceroy
        </h3>
        <div className="flex gap-4 text-[10px] uppercase tracking-wider">
          <span className="text-neon-pink animate-pulse-neon">{stats.critical} CRITICAL</span>
          <span className="text-neon-amber">{stats.elevated} ELEVATED</span>
        </div>
      </div>
      
      <div className="relative rounded border border-border bg-background/50 p-2 overflow-hidden">
        <div className="absolute inset-0 scanline z-10" />
        
        <div className="grid grid-cols-12 gap-[2px]">
          {grid.map(cell => (
            <div
              key={cell.id}
              className={`
                relative aspect-square rounded-sm cursor-crosshair transition-all duration-700
                ${getChaosColor(cell.chaosLevel)}
                ${getGlow(cell.chaosLevel)}
                ${cell.chaosLevel > 80 ? 'animate-pulse-neon' : ''}
              `}
              onMouseEnter={() => setHoveredCell(cell)}
              onMouseLeave={() => setHoveredCell(null)}
            >
              {cell.incidents > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-primary-foreground drop-shadow-lg">{cell.incidents}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {hoveredCell && (
          <div className="absolute top-2 right-2 z-20 vice-card p-3 text-[10px] min-w-[150px]">
            <div className="text-neon-teal font-display text-[10px] mb-1.5">{hoveredCell.zone}</div>
            <div className="flex justify-between mb-0.5">
              <span className="text-muted-foreground">CHAOS</span>
              <span className={hoveredCell.chaosLevel > 60 ? 'text-neon-pink neon-glow-pink' : 'text-foreground'}>
                {Math.round(hoveredCell.chaosLevel)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SIGNAL</span>
              <span className={
                hoveredCell.signalStatus === 'lockdown' ? 'text-neon-red' :
                hoveredCell.signalStatus === 'emergency' ? 'text-neon-amber' :
                'text-neon-green'
              }>
                {hoveredCell.signalStatus.toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-3 text-[9px] text-muted-foreground uppercase tracking-wider">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-neon-teal/10" /> LOW</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-neon-purple/20" /> MOD</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-neon-amber/40" /> HIGH</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-neon-red/50" /> SEV</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-neon-pink/70 animate-pulse-neon" /> CRIT</div>
      </div>
    </div>
  );
}

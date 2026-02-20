import { useState, useEffect, useMemo } from 'react';
import { generateGrid, type GridCell } from '@/data/mockData';

const getChaosColor = (level: number): string => {
  if (level > 80) return 'bg-neon-red/80';
  if (level > 60) return 'bg-neon-red/50';
  if (level > 40) return 'bg-neon-amber/50';
  if (level > 20) return 'bg-neon-amber/25';
  return 'bg-neon-green/15';
};

const getGlow = (level: number): string => {
  if (level > 80) return 'shadow-[0_0_12px_hsl(var(--neon-red-glow)/0.6)]';
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
    return { critical, elevated, total: grid.length };
  }, [grid]);

  return (
    <div className="relative flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-display uppercase tracking-[0.3em] text-secondary">
          Chaos Heatmap — San Viceroy
        </h2>
        <div className="flex gap-3 text-[10px] uppercase tracking-wider">
          <span className="text-neon-red animate-pulse-neon">{stats.critical} CRITICAL</span>
          <span className="text-neon-amber">{stats.elevated} ELEVATED</span>
        </div>
      </div>
      
      <div className="relative rounded border border-border bg-card p-2 overflow-hidden">
        {/* Scanline overlay */}
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
                  <span className="text-[8px] font-bold text-primary-foreground">{cell.incidents}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredCell && (
          <div className="absolute top-2 right-2 z-20 bg-card border border-border rounded p-2 text-[10px] min-w-[140px]">
            <div className="text-secondary font-display text-[9px] mb-1">{hoveredCell.zone}</div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CHAOS</span>
              <span className={hoveredCell.chaosLevel > 60 ? 'text-neon-red' : 'text-foreground'}>
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

      {/* Legend */}
      <div className="flex items-center gap-4 text-[9px] text-muted-foreground uppercase tracking-wider">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-neon-green/15" /> LOW
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-neon-amber/25" /> MODERATE
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-neon-amber/50" /> HIGH
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-neon-red/50" /> SEVERE
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-neon-red/80 animate-pulse-neon" /> CRITICAL
        </div>
      </div>
    </div>
  );
}

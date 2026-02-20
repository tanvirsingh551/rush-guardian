import { useState, useEffect } from 'react';

export default function ThreatMeter() {
  const [level, setLevel] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.45) * 5)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const wantedStars = level > 90 ? 5 : level > 70 ? 4 : level > 50 ? 3 : level > 30 ? 2 : 1;

  return (
    <div className="rounded border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-display uppercase tracking-[0.3em] text-secondary">
          Wanted Level
        </h2>
        <span className="text-[10px] text-muted-foreground uppercase">CITY THREAT INDEX</span>
      </div>

      {/* Stars */}
      <div className="flex justify-center gap-2 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-3xl transition-all duration-500 ${
              i < wantedStars 
                ? 'text-neon-red neon-glow-red animate-pulse-neon' 
                : 'text-muted-foreground/20'
            }`}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Bar */}
      <div className="relative h-3 rounded-full bg-muted overflow-hidden mb-2">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 bg-gradient-to-r from-neon-green via-neon-amber to-neon-red"
          style={{ width: `${level}%` }}
        />
        <div className="absolute inset-0 scanline" />
      </div>

      <div className="flex justify-between text-[10px] uppercase tracking-wider">
        <span className="text-neon-green">CALM</span>
        <span className={`font-bold ${level > 70 ? 'text-neon-red neon-glow-red' : 'text-neon-amber'}`}>
          {Math.round(level)}%
        </span>
        <span className="text-neon-red">ANARCHY</span>
      </div>
    </div>
  );
}

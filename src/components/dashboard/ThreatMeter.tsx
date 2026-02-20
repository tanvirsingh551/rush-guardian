import { useState, useEffect } from 'react';

export default function ThreatMeter() {
  const [level, setLevel] = useState(82);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.45) * 5)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const wantedStars = level > 90 ? 5 : level > 70 ? 4 : level > 50 ? 3 : level > 30 ? 2 : 1;

  return (
    <div className="vice-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-tech uppercase tracking-[0.3em] text-secondary">
          Wanted Level
        </h3>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">CITY THREAT INDEX</span>
      </div>

      {/* GTA-style wanted stars */}
      <div className="flex justify-center gap-3 mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-4xl transition-all duration-500 ${
              i < wantedStars 
                ? 'text-neon-pink neon-glow-pink' 
                : 'text-muted-foreground/15'
            }`}
            style={{ 
              animationDelay: `${i * 0.15}s`,
              animation: i < wantedStars ? 'pulse-neon 2s ease-in-out infinite' : 'none',
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Gradient bar */}
      <div className="relative h-4 rounded-full bg-muted/50 overflow-hidden mb-3 border border-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
          style={{ 
            width: `${level}%`,
            background: `linear-gradient(90deg, hsl(var(--neon-teal)), hsl(var(--neon-amber)) 50%, hsl(var(--neon-pink)) 80%, hsl(var(--neon-red)))`,
          }}
        />
        <div className="absolute inset-0 scanline" />
      </div>

      <div className="flex justify-between text-[10px] uppercase tracking-wider">
        <span className="text-neon-teal">CALM</span>
        <span className={`font-bold font-tech text-sm ${level > 70 ? 'text-neon-pink neon-glow-pink' : 'text-neon-amber'}`}>
          {Math.round(level)}%
        </span>
        <span className="text-neon-pink">ANARCHY</span>
      </div>
    </div>
  );
}

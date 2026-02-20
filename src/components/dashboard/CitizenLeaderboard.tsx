import { citizenScores } from '@/data/mockData';
import { Trophy, Zap, AlertOctagon } from 'lucide-react';

export default function CitizenLeaderboard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-display uppercase tracking-[0.3em] text-secondary">
          Citizen Chaos Rankings
        </h2>
        <Trophy className="w-3.5 h-3.5 text-neon-amber" />
      </div>

      <div className="flex flex-col gap-1">
        {citizenScores.map((citizen, i) => (
          <div
            key={citizen.id}
            className={`
              flex items-center gap-3 rounded border bg-card px-3 py-2
              ${i === 0 ? 'border-neon-amber/40' : 'border-border'}
            `}
          >
            <span className={`text-sm font-display font-bold w-5 ${
              i === 0 ? 'text-neon-amber neon-glow-amber' : 
              i === 1 ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {citizen.rank}
            </span>

            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-foreground block truncate">
                {citizen.handle}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-neon-green">
                <Zap className="w-2.5 h-2.5" /> {citizen.cleared}
              </span>
              {citizen.violations > 0 && (
                <span className="flex items-center gap-1 text-neon-red">
                  <AlertOctagon className="w-2.5 h-2.5" /> {citizen.violations}
                </span>
              )}
              <span className="text-neon-amber font-bold w-14 text-right">
                {citizen.score.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

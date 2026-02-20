import { citizenScores } from '@/data/mockData';
import { Trophy, Zap, AlertOctagon, Flame } from 'lucide-react';

const rankEmoji = ['👑', '🥈', '🥉'];

export default function CitizenLeaderboard() {
  return (
    <div className="vice-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-neon-amber" />
          <h3 className="text-xs font-tech uppercase tracking-[0.3em] text-secondary">
            Citizen Chaos Rankings
          </h3>
        </div>
        <span className="text-[10px] text-muted-foreground uppercase">GAMIFIED</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {citizenScores.map((citizen, i) => (
          <div
            key={citizen.id}
            className={`
              flex items-center gap-3 rounded-lg border bg-card/60 px-3 py-2.5 transition-all
              ${i === 0 ? 'border-neon-amber/30 box-glow-amber' : 'border-border hover:border-neon-pink/20'}
            `}
          >
            <span className="text-sm w-6 text-center">
              {i < 3 ? rankEmoji[i] : (
                <span className="text-muted-foreground font-tech text-xs">{citizen.rank}</span>
              )}
            </span>

            <div className="flex-1 min-w-0">
              <span className={`text-xs font-bold block truncate ${
                i === 0 ? 'sunset-gradient-text' : 'text-foreground'
              }`}>
                {citizen.handle}
              </span>
              {citizen.streak > 0 && (
                <span className="text-[9px] text-neon-orange flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5" /> {citizen.streak} streak
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-[10px] shrink-0">
              <span className="flex items-center gap-1 text-neon-green">
                <Zap className="w-2.5 h-2.5" /> {citizen.cleared}
              </span>
              {citizen.violations > 0 && (
                <span className="flex items-center gap-1 text-neon-red">
                  <AlertOctagon className="w-2.5 h-2.5" /> {citizen.violations}
                </span>
              )}
              <span className="text-neon-amber font-bold font-tech w-16 text-right">
                {citizen.score.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

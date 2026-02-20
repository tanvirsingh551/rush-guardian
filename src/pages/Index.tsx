import { useState, useEffect } from 'react';
import HeatmapGrid from '@/components/dashboard/HeatmapGrid';
import IncidentFeed from '@/components/dashboard/IncidentFeed';
import ThreatMeter from '@/components/dashboard/ThreatMeter';
import EmergencyRouting from '@/components/dashboard/EmergencyRouting';
import CitizenLeaderboard from '@/components/dashboard/CitizenLeaderboard';
import SystemStats from '@/components/dashboard/SystemStats';
import { Shield, Radio } from 'lucide-react';

const Index = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background grid-bg relative">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-50 opacity-40" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-neon-red" />
            <h1 className="text-sm font-display uppercase tracking-[0.4em] text-foreground">
              Wanted Level <span className="text-neon-red neon-glow-red">∞</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider">
            <span className="text-muted-foreground">SAN VICEROY TRAFFIC INTELLIGENCE</span>
            <span className="text-neon-red animate-blink flex items-center gap-1">
              <Radio className="w-3 h-3" /> LIVE
            </span>
            <span className="text-secondary font-mono">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-[1800px] mx-auto p-4 grid grid-cols-12 gap-4">
        {/* Left Column — Heatmap & Stats */}
        <div className="col-span-8 flex flex-col gap-4">
          <ThreatMeter />
          <HeatmapGrid />
          <SystemStats />
        </div>

        {/* Right Column — Incidents & Routes */}
        <div className="col-span-4 flex flex-col gap-4">
          <IncidentFeed />
          <EmergencyRouting />
          <CitizenLeaderboard />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-2 text-center text-[9px] text-muted-foreground uppercase tracking-widest">
        SAN VICEROY DEPT. OF TRAFFIC INTELLIGENCE — CLASSIFIED — CLEARANCE LEVEL: OMEGA
      </footer>
    </div>
  );
};

export default Index;

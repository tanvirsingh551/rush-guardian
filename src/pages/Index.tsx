import { useState, useEffect } from 'react';
import viceCityBanner from '@/assets/vice-city-banner.jpg';
import HeatmapGrid from '@/components/dashboard/HeatmapGrid';
import IncidentFeed from '@/components/dashboard/IncidentFeed';
import ThreatMeter from '@/components/dashboard/ThreatMeter';
import EmergencyRouting from '@/components/dashboard/EmergencyRouting';
import CitizenLeaderboard from '@/components/dashboard/CitizenLeaderboard';
import SystemStats from '@/components/dashboard/SystemStats';
import ChaseSpillover from '@/components/dashboard/ChaseSpillover';
import { Shield, Radio, Crosshair } from 'lucide-react';

const Index = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background grid-bg relative overflow-x-hidden">
      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-neon-teal/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-50 opacity-30" />

      {/* Hero Banner */}
      <div className="relative h-32 overflow-hidden border-b border-border">
        <img 
          src={viceCityBanner} 
          alt="San Viceroy Skyline" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display uppercase tracking-[0.5em] sunset-gradient-text mb-1">
              Wanted Level ∞
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase tracking-[0.4em]">
              San Viceroy Traffic & Chase Intelligence System
            </p>
          </div>
        </div>
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md px-4 py-2.5 vice-divider">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-3">
            <Crosshair className="w-4 h-4 text-neon-pink animate-pulse-neon" />
            <span className="text-[11px] font-tech uppercase tracking-[0.3em] pink-teal-gradient-text">
              COMMAND CENTER
            </span>
          </div>

          <div className="flex items-center gap-5 text-[10px] uppercase tracking-wider">
            <span className="text-muted-foreground hidden md:block">DEPT. OF TRAFFIC INTELLIGENCE</span>
            <span className="text-neon-pink animate-blink flex items-center gap-1.5">
              <Radio className="w-3 h-3" /> LIVE FEED
            </span>
            <span className="text-neon-teal font-tech text-xs">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-[1800px] mx-auto p-4 flex flex-col gap-4">
        {/* Chase Spillover — Full Width Alert */}
        <ChaseSpillover />

        {/* Two Column Layout */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left — Main Intelligence */}
          <div className="col-span-8 flex flex-col gap-4">
            <ThreatMeter />
            <HeatmapGrid />
            <SystemStats />
          </div>

          {/* Right — Feeds */}
          <div className="col-span-4 flex flex-col gap-4">
            <IncidentFeed />
            <EmergencyRouting />
            <CitizenLeaderboard />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-3 vice-divider">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between text-[9px] text-muted-foreground uppercase tracking-[0.3em]">
          <span>SAN VICEROY DEPT. OF TRAFFIC INTELLIGENCE</span>
          <span className="pink-teal-gradient-text font-bold">CLASSIFIED — CLEARANCE LEVEL: OMEGA</span>
          <span>© 2026 VICE CITY PD</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;

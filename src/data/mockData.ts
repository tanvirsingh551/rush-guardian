export type IncidentType = 'chase' | 'emergency' | 'vip' | 'gridlock' | 'influencer';
export type ThreatLevel = 1 | 2 | 3 | 4 | 5;
export type ZoneType = 'hospital' | 'school' | 'business';

export interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  location: string;
  threatLevel: ThreatLevel;
  timestamp: string;
  status: 'active' | 'contained' | 'resolved';
  speed?: number;
  units?: number;
}

export interface GridCell {
  id: string;
  row: number;
  col: number;
  zone: string;
  chaosLevel: number;
  incidents: number;
  signalStatus: 'normal' | 'override' | 'emergency' | 'lockdown';
}

export interface CitizenScore {
  id: string;
  handle: string;
  score: number;
  cleared: number;
  violations: number;
  rank: number;
  streak: number;
}

export interface EmergencyRoute {
  id: string;
  unit: string;
  unitType: 'ambulance' | 'swat' | 'escort' | 'fire';
  origin: string;
  destination: string;
  eta: string;
  status: 'clearing' | 'blocked' | 'clear';
  signalsOverridden: number;
  progress: number;
}

export interface SpilloverZone {
  id: string;
  type: ZoneType;
  name: string;
  threatLevel: number;
  civilians: number;
  signalsDown: number;
  illegalRoutes: number;
  status: 'critical' | 'elevated' | 'contained';
  rerouted: boolean;
  actions: string[];
}

export const incidents: Incident[] = [
  { id: 'INC-001', type: 'chase', title: 'High-speed pursuit — stolen Infernus', location: 'Ocean Drive → Star Junction', threatLevel: 5, timestamp: '00:42', status: 'active', speed: 147, units: 8 },
  { id: 'INC-002', type: 'emergency', title: 'Critical patient transport — Code Red', location: 'Little Havana Medical → Downtown ER', threatLevel: 4, timestamp: '00:38', status: 'active', units: 2 },
  { id: 'INC-003', type: 'vip', title: 'Governor convoy — Route Delta', location: 'City Hall → Marina Helipad', threatLevel: 3, timestamp: '00:35', status: 'active', units: 6 },
  { id: 'INC-004', type: 'gridlock', title: 'Multi-vehicle pileup — 12 cars', location: 'Highway 1 — Interchange 7', threatLevel: 4, timestamp: '00:30', status: 'active' },
  { id: 'INC-005', type: 'influencer', title: 'Unauthorized roadshow — 50K live', location: 'Sunset Strip', threatLevel: 2, timestamp: '00:25', status: 'contained' },
  { id: 'INC-006', type: 'chase', title: 'Fleeing suspect — armed & dangerous', location: 'Industrial District → Spillover', threatLevel: 5, timestamp: '00:20', status: 'active', speed: 112, units: 12 },
];

export const generateGrid = (): GridCell[] => {
  const zones = ['Downtown', 'Ocean Side', 'Little Havana', 'Star Junction', 'Industrial', 'Marina', 'Sunset Strip', 'Northside', 'Vice Port', 'Palm Beach', 'Hyman Memorial', 'Washington Beach'];
  const cells: GridCell[] = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 12; c++) {
      const chaos = Math.random();
      let level: number;
      if (chaos > 0.9) level = 80 + Math.random() * 20;
      else if (chaos > 0.7) level = 50 + Math.random() * 30;
      else if (chaos > 0.4) level = 20 + Math.random() * 30;
      else level = Math.random() * 20;
      
      cells.push({
        id: `${r}-${c}`,
        row: r,
        col: c,
        zone: zones[Math.floor(Math.random() * zones.length)],
        chaosLevel: Math.round(level),
        incidents: level > 60 ? Math.floor(Math.random() * 3) + 1 : 0,
        signalStatus: level > 80 ? 'lockdown' : level > 60 ? 'emergency' : level > 40 ? 'override' : 'normal',
      });
    }
  }
  return cells;
};

export const citizenScores: CitizenScore[] = [
  { id: '1', handle: 'ROAD_WRAITH_99', score: 9420, cleared: 47, violations: 0, rank: 1, streak: 12 },
  { id: '2', handle: 'CIVIC_GHOST', score: 8750, cleared: 41, violations: 1, rank: 2, streak: 8 },
  { id: '3', handle: 'LANE_REAPER', score: 7300, cleared: 35, violations: 2, rank: 3, streak: 5 },
  { id: '4', handle: 'SIGNAL_SAINT', score: 6890, cleared: 33, violations: 0, rank: 4, streak: 15 },
  { id: '5', handle: 'VICEROY_VIPER', score: 5200, cleared: 24, violations: 5, rank: 5, streak: 2 },
  { id: '6', handle: 'PALM_PHANTOM', score: 4100, cleared: 19, violations: 3, rank: 6, streak: 0 },
];

export const emergencyRoutes: EmergencyRoute[] = [
  { id: 'ER-01', unit: 'AMB-14', unitType: 'ambulance', origin: 'Little Havana', destination: 'Downtown ER', eta: '2:34', status: 'clearing', signalsOverridden: 7, progress: 62 },
  { id: 'ER-02', unit: 'SWAT-3', unitType: 'swat', origin: 'Precinct 7', destination: 'Ocean Drive', eta: '4:12', status: 'blocked', signalsOverridden: 3, progress: 28 },
  { id: 'ER-03', unit: 'ESC-01', unitType: 'escort', origin: 'City Hall', destination: 'Marina Helipad', eta: '1:08', status: 'clear', signalsOverridden: 12, progress: 89 },
  { id: 'ER-04', unit: 'FIRE-7', unitType: 'fire', origin: 'Station 4', destination: 'Star Junction', eta: '3:45', status: 'clearing', signalsOverridden: 5, progress: 45 },
];

export const spilloverZones: SpilloverZone[] = [
  {
    id: 'SZ-01',
    type: 'hospital',
    name: 'Vice City Medical Center',
    threatLevel: 92,
    civilians: 340,
    signalsDown: 4,
    illegalRoutes: 12,
    status: 'critical',
    rerouted: false,
    actions: ['Activate perimeter lockdown', 'Deploy mobile barriers', 'Reroute AMB-14 via Palm Ave'],
  },
  {
    id: 'SZ-02',
    type: 'school',
    name: 'Washington Beach Academy',
    threatLevel: 78,
    civilians: 520,
    signalsDown: 2,
    illegalRoutes: 8,
    status: 'elevated',
    rerouted: false,
    actions: ['Trigger school lockdown protocol', 'Activate crossing guards AI', 'Block Highway 1 access ramp'],
  },
  {
    id: 'SZ-03',
    type: 'business',
    name: 'Hyman Memorial Financial District',
    threatLevel: 65,
    civilians: 1200,
    signalsDown: 6,
    illegalRoutes: 15,
    status: 'elevated',
    rerouted: false,
    actions: ['Close parking garage exits', 'Activate citizen incentive rewards', 'Deploy traffic drones'],
  },
];

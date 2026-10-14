export type Language = 'en' | 'bn';

export interface ProductionItem {
  id: string;
  title: { en: string; bn: string };
  playwright: { en: string; bn: string };
  role: { en: string; bn: string };
  venue: { en: string; bn: string };
  year: string;
  category: 'theatre' | 'set-design' | 'direction';
  synopsis: { en: string; bn: string };
  contributions: { en: string[]; bn: string[] };
  quote?: { en: string; bn: string };
  imagePlaceholderColor: string;
  badge: { en: string; bn: string };
  has3DViewer?: boolean;
}

export interface LeadershipItem {
  id: string;
  title: { en: string; bn: string };
  organization: { en: string; bn: string };
  role: { en: string; bn: string };
  period: string;
  description: { en: string; bn: string };
  metrics: {
    label: { en: string; bn: string };
    value: number;
    suffix?: string;
  }[];
  responsibilities: { en: string[]; bn: string[] };
}

export interface TechProject {
  id: string;
  title: { en: string; bn: string };
  category: { en: string; bn: string };
  problem: { en: string; bn: string };
  approach: { en: string; bn: string };
  stack: string[];
  result: { en: string; bn: string };
  status: 'live' | 'in-progress' | 'deployed';
  link?: string;
  github?: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'theatre' | 'leadership' | 'tech';
  level: number; // 1-100
  usedIn: { en: string; bn: string };
  position: [number, number, number];
}

export interface AppState {
  currentScene: number; // 0: Prologue, 1: Hero, 2: Theatre, 3: Leadership, 4: Tech, 5: Epilogue, 6: Contact
  lang: Language;
  houseLights: boolean;
  soundEnabled: boolean;
  ghostLightOn: boolean;
  is3DFallback: boolean;
  selectedDetail: ProductionItem | TechProject | null;
}

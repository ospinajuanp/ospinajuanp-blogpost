export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ospinajuanp-blogpost.vercel.app';

export const THEME_DARK = 'dark';
export const THEME_SECONDARY = 'secondary';
export const DEFAULT_THEME = THEME_DARK;

export interface Pillar {
  id: string;
  label: string;
  emoji: string;
}

export const PILLARS: Pillar[] = [
  { id: 'construccion', label: 'Construcción en público', emoji: '🏗️' },
  { id: 'oficios', label: 'Ingeniería y oficios', emoji: '🛠️' },
  { id: 'carrera', label: 'Trabajo, dinero y carrera', emoji: '💼' },
  { id: 'salud', label: 'Salud y cuerpo', emoji: '🫀' },
  { id: 'lecturas', label: 'Lecturas y pensamiento', emoji: '📚' },
  { id: 'fe', label: 'Fe y espiritualidad', emoji: '🕊️' },
  { id: 'relaciones', label: 'Relaciones y amistad', emoji: '🤝' },
  { id: 'rutinas', label: 'Rutinas y hobbies', emoji: '🎧' },
];

export function getPillar(id?: string): Pillar | undefined {
  if (!id) return undefined;
  return PILLARS.find(pillar => pillar.id === id);
}

export function getPillarLabel(id?: string): string {
  return getPillar(id)?.label ?? id ?? '';
}

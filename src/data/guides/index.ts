import tips from './tips';
import powerBerries from './power-berries';
import foraging from './foraging';
import stamina from './stamina';
import animals from './animals';
import tools from './tools';
import mining from './mining';
import fishing from './fishing';
import type { Guide } from './types';

export const guides: Guide[] = [
  tips,
  powerBerries,
  foraging,
  stamina,
  animals,
  tools,
  mining,
  fishing,
];

export function getGuideById(id: string): Guide | undefined {
  return guides.find((g) => g.id === id);
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides.filter((g) => g.category === category);
}

export type { Guide };
export type { GuideCategory, GuideSection } from './types';

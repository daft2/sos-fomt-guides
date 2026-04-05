export type { Festival, FestivalSeason } from './types';
export { springFestivals } from './spring';
export { summerFestivals } from './summer';
export { autumnFestivals } from './autumn';
export { winterFestivals } from './winter';

import { springFestivals } from './spring';
import { summerFestivals } from './summer';
import { autumnFestivals } from './autumn';
import { winterFestivals } from './winter';
import type { Festival } from './types';

export const allFestivals: Festival[] = [
  ...springFestivals,
  ...summerFestivals,
  ...autumnFestivals,
  ...winterFestivals,
];

export const festivalsBySeason = {
  spring: springFestivals,
  summer: summerFestivals,
  autumn: autumnFestivals,
  winter: winterFestivals,
} as const;

export function getFestivalById(id: string): Festival | undefined {
  return allFestivals.find((f) => f.id === id);
}

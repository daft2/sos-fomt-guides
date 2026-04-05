export type { Crop, Season, CropSource, GrowthStages, SellPrices } from './types';
export { springCrops } from './spring';
export { summerCrops } from './summer';
export { autumnCrops } from './autumn';

import { springCrops } from './spring';
import { summerCrops } from './summer';
import { autumnCrops } from './autumn';
import type { Crop } from './types';

export const allCrops: Crop[] = [...springCrops, ...summerCrops, ...autumnCrops];

export const cropsBySeason = {
  spring: springCrops,
  summer: summerCrops,
  autumn: autumnCrops,
} as const;

export function getCropById(id: string): Crop | undefined {
  return allCrops.find((c) => c.id === id);
}

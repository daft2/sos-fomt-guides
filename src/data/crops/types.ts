export type Season = 'spring' | 'summer' | 'autumn';

export type CropSource = 'General Store' | "Huang's Shop" | 'Special Event';

export interface GrowthStages {
  seed: number;
  sprout: number;
  young?: number;
  mature?: number;
  harvest: number; // total days to first harvest
}

export interface SellPrices {
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

export interface Crop {
  id: string;
  name: string;
  season: Season;
  source: CropSource;
  buyPrice: number;
  growthDays: GrowthStages;
  sellPrices: SellPrices;
  regrowDays: number | null; // null = no regrow
  unlockRequirement: string | null; // null = always available
  description: {
    id: string;
    en: string;
  };
  isFlower: boolean;
}

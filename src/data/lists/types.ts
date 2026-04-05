export type CropSeason = 'spring' | 'summer' | 'autumn';

export interface Crop {
  id: string;
  name: string;
  season: CropSeason;
  buyPrice: number;
  buyShop: 'general-store' | 'huangs-store';
  sellPriceSimple: number;
  sellPriceNormal: number;
  growDays: number;
  regrowDays: number | null;
  isFlower: boolean;
  unlockCondition?: string;
}

export interface Shop {
  id: string;
  name: string;
  owner: string[];
  hours: string;
  closedDays: string;
  items: string[];
}

export interface NpcGifts {
  npcId: string;
  npcName: string;
  birthday: string;
  alternateBirthday: string;
  favoriteGifts: string[];
}

export interface Ring {
  id: string;
  name: BilingualText;
  howToObtain: BilingualText;
}

export interface Location {
  id: number;
  name: string;
  description: BilingualText;
  hours?: string;
  closedDays?: string;
}

export interface Outfit {
  id: string;
  name: string;
  type: 'overalls' | 'hoodie' | 'special';
  unlockCondition: BilingualText;
}

export interface BilingualText {
  id: string;
  en: string;
}

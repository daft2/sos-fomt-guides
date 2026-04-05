export type FestivalSeason = 'spring' | 'summer' | 'autumn' | 'winter';

export interface Festival {
  id: string;
  name: string;
  season: FestivalSeason;
  date: number; // day of season
  time: string; // e.g. "10:00 AM – 06:00 PM"
  location: string;
  description: {
    id: string;
    en: string;
  };
  tips: {
    id: string;
    en: string;
  } | null;
  rewards: string[];
  isContest: boolean;
}

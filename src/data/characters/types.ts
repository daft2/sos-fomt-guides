export type CharacterCategory = 'bachelor' | 'bachelorette' | 'special';

export interface HeartEvent {
  heart: 'gray1' | 'gray2' | 'purple' | 'blue' | 'green' | 'yellow' | 'orange' | 'red' | 'event1' | 'event2' | 'event3';
  requirementPoints: number | null;
  days: string;
  time: string;
  weather: string;
  location: string;
  otherRequirements?: string;
  positiveAnswer?: string;
  negativeAnswer?: string;
}

export interface BilingualText {
  id: string;
  en: string;
}

export interface Character {
  id: string;
  name: string;
  category: CharacterCategory;
  birthday: string;
  alternateBirthday: string;
  residence: string;
  family: string[];
  rival: string | null;
  description: BilingualText;
  lovedGifts: string[];       // +9 FP / +500 LP (most loved)
  favoritedGift: string[];    // +9 FP / +800 LP (absolute favorite)
  likedGifts: string[];       // +3 FP / +300 LP
  dislikedGifts: string[];    // -3 FP / -500 LP
  hatedGifts: string[];       // -9 FP / -800 LP
  heartEvents: HeartEvent[];
}

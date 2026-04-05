export type EventType = 'normal' | 'limited' | 'secret';

export type WeatherRequirement = 'any' | 'sunny' | 'rainy' | 'snowy' | 'stormy' | 'rainy_or_snowy';

export type SeasonRequirement = 'any' | 'spring' | 'summer' | 'autumn' | 'winter';

export interface EventChoice {
  text: string;
  effect: string; // e.g. "+20 Friendship with Basil"
}

export interface EventRequirements {
  day?: string; // e.g. "Wednesday", "Any", "Saturday"
  time?: string; // e.g. "01:00 PM – 04:00 PM"
  weather?: WeatherRequirement;
  season?: SeasonRequirement;
  location: string; // where to trigger the event
  friendship?: string; // e.g. "8 notes with Basil"
  other?: string[]; // other conditions
}

export interface GameEvent {
  id: string;
  name: string;
  type: EventType;
  requirements: EventRequirements;
  description: {
    id: string;
    en: string;
  };
  choices: EventChoice[];
  reward: string | null;
}

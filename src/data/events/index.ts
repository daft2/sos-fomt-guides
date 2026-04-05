export type { GameEvent, EventType, EventRequirements, EventChoice, WeatherRequirement, SeasonRequirement } from './types';
export { normalEvents } from './normal';
export { limitedEvents } from './limited';
export { secretEvents } from './secret';

import { normalEvents } from './normal';
import { limitedEvents } from './limited';
import { secretEvents } from './secret';
import type { GameEvent } from './types';

export const allEvents: GameEvent[] = [
  ...normalEvents,
  ...limitedEvents,
  ...secretEvents,
];

export const eventsByType = {
  normal: normalEvents,
  limited: limitedEvents,
  secret: secretEvents,
} as const;

export function getEventById(id: string): GameEvent | undefined {
  return allEvents.find((e) => e.id === id);
}

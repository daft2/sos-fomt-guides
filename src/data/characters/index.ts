export type { Character, CharacterCategory, HeartEvent, BilingualText } from './types';

import rick from './rick';
import cliff from './cliff';
import gray from './gray';
import doctor from './doctor';
import kai from './kai';
import brandon from './brandon';
import popuri from './popuri';
import karen from './karen';
import marie from './marie';
import elly from './elly';
import ran from './ran';
import jennifer from './jennifer';
import harvestGoddess from './harvest-goddess';
import kappa from './kappa';
import bonVivant from './bon-vivant';
import huang from './huang';

export const characters = [
  rick,
  cliff,
  gray,
  doctor,
  kai,
  brandon,
  popuri,
  karen,
  marie,
  elly,
  ran,
  jennifer,
  harvestGoddess,
  kappa,
  bonVivant,
  huang,
];

export const bachelors = characters.filter((c) => c.category === 'bachelor');
export const bachelorettes = characters.filter((c) => c.category === 'bachelorette');
export const specialCharacters = characters.filter((c) => c.category === 'special');

export function getCharacterById(id: string) {
  return characters.find((c) => c.id === id);
}

export {
  rick, cliff, gray, doctor, kai, brandon,
  popuri, karen, marie, elly, ran, jennifer,
  harvestGoddess, kappa, bonVivant, huang,
};

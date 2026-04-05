import type { Character } from './types';

const kappa: Character = {
  id: 'kappa',
  name: 'Kappa',
  category: 'special',
  birthday: '8 Spring',
  alternateBirthday: '9 Spring',
  residence: "Mother's Hill Lake",
  family: [],
  rival: null,
  description: {
    id: 'Kappa merupakan makhluk gaib yang tinggal di danau Mother\'s Hill. Ia hanya mau menerima Cucumber sebagai hadiah dan hanya muncul di musim Spring, Summer, dan Autumn. Menikahi Kappa membutuhkan banyak persyaratan berat.',
    en: "Kappa is a mythical water sprite who lives in Mother's Hill Lake. He only accepts Cucumbers as gifts and only appears during Spring, Summer, and Autumn. Marrying him requires fulfilling an extensive list of conditions. After marriage he will not live in your house, but you can still have children.",
  },
  favoritedGift: ['Cucumber'],
  lovedGifts: ['Cucumber'],
  likedGifts: ['Cucumber'],
  dislikedGifts: [],
  hatedGifts: [],
  heartEvents: [
    {
      heart: 'event1',
      requirementPoints: null,
      days: 'Monday, Wednesday or Rainy/Snowy days',
      time: 'Any',
      weather: 'Any',
      location: 'Church (back room)',
      otherRequirements: "Talk to Carter, choose 'Confess', mention Kappa. CRITICAL: Must choose Kappa from Goddess list BEFORE this. Requirements: Red heart (60,000+ AP), Big Bed, Year 5+, sell ALL items in game (including Weed/Fish Bone), catch all fish including Whooper, find all Spring Mine and Lake Mine items, obtain Kappa Orb",
    },
    {
      heart: 'event2',
      requirementPoints: null,
      days: 'Any',
      time: 'Any',
      weather: 'Any',
      location: "Mother's Hill Lake",
      otherRequirements: "Throw Blue Feather (1,000G from General Store) into Mother's Hill Lake after all requirements met",
    },
  ],
};

export default kappa;

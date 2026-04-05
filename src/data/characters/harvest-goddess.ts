import type { Character } from './types';

const harvestGoddess: Character = {
  id: 'harvest-goddess',
  name: 'Harvest Goddess',
  category: 'special',
  birthday: 'Unknown',
  alternateBirthday: 'Unknown',
  residence: 'Goddess Pond',
  family: [],
  rival: null,
  description: {
    id: 'Harvest Goddess adalah dewi panen yang menjaga Mineral Town. Untuk menikahi sang dewi, ada banyak persyaratan berat yang harus dipenuhi termasuk menunggu hingga tahun kelima.',
    en: 'The Harvest Goddess is the divine protector of Mineral Town. Marrying her requires fulfilling extensive requirements including waiting until Year 5, catching every fish, shipping all items, and collecting all Goddess Orbs from the Spring Mine.',
  },
  favoritedGift: [],
  lovedGifts: [],
  likedGifts: ['Any item thrown into the Goddess Pond (1 per day)'],
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
      otherRequirements: "Talk to Carter and choose 'Confess' (appears randomly). Must have: Red heart with Goddess, Big Bed, Year 5+, all Shipping items sold (1 each), all fish caught, 9 Goddess Orbs (Goddess Gem), Teleport Stone from Lake Mine floor 255",
    },
    {
      heart: 'event2',
      requirementPoints: null,
      days: 'Any',
      time: 'Any',
      weather: 'Any',
      location: 'Goddess Pond',
      otherRequirements: "After Confess event: throw Blue Feather (bought from General Store for 1,000G) into the Goddess Pond",
    },
  ],
};

export default harvestGoddess;

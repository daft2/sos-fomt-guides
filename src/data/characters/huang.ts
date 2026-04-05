import type { Character } from './types';

const huang: Character = {
  id: 'huang',
  name: 'Huang',
  category: 'special',
  birthday: '19 Winter',
  alternateBirthday: '21 Winter',
  residence: "Zack's House (Mineral Beach)",
  family: [],
  rival: null,
  description: {
    id: 'Huang tiba di Mineral Town pada tanggal 3 Spring tahun pertama. Ia membuka lapak di rumah Zack dan bisa membeli barang yang tidak bisa dijual ke Zack. Untuk menikahi Huang, wajib membeli Flower Vase saat ia menawarkannya.',
    en: "Huang arrives in Mineral Town on Spring 3 of Year 1 and opens a shop at Zack's house. He buys items that cannot be sold through the shipping bin, including cooked dishes. To marry Huang, you must buy the Flower Vase when he offers it — refusing 5 times locks you out permanently.",
  },
  favoritedGift: [
    'Adamantite', 'Alexandrite', 'Bracelet', 'Diamond', 'Dress', 'Earrings',
    'Emerald', 'Face Pack', 'Ancient Fish Fossil', 'Gold', 'Gold Egg', 'Mithril',
    'Moonstone', 'Necklace', 'Orichalcum', 'Peridot', 'Mythic Orb',
    'Pink Diamond', "Pirate's Treasure", 'Ruby', 'Sand Rose', 'Face Lotion',
    'Sunscreen', 'Topaz',
  ],
  lovedGifts: [],
  likedGifts: [],
  dislikedGifts: [],
  hatedGifts: [],
  heartEvents: [
    {
      heart: 'event1',
      requirementPoints: 10000,
      days: 'Any',
      time: '11:10 AM–04:00 PM',
      weather: 'Any',
      location: "Zack's House",
      otherRequirements: "Empty inventory slot. Huang drops all his apples and asks you to keep it secret. You receive one of: HMSGB Apple, SUGDW Apple, or AEPFE Apple.",
    },
    {
      heart: 'event2',
      requirementPoints: 20000,
      days: 'Any',
      time: '11:10 AM–04:00 PM',
      weather: 'Any',
      location: "Zack's House",
      otherRequirements: '4+ Friendship Notes. Huang explains his buy/sell system. Tip: higher prices for Fish (Sun), Milk (Mon), Egg (Tue), Wool (Wed), Cheese (Thu), Mayo (Fri), Yarn (Sat).',
    },
    {
      heart: 'event3',
      requirementPoints: 30000,
      days: 'Any',
      time: '11:10 AM–04:00 PM',
      weather: 'Any',
      location: "Zack's House",
      otherRequirements: '6+ Friendship Notes; empty inventory slot. Huang offers an apple-guessing mini-game (free first time, 100G after). Guess 9/10 correctly → Mystery Ticket; guess all 10 → Mystery Flower.',
    },
  ],
};

export default huang;

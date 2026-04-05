import type { GameEvent } from './types';

export const secretEvents: GameEvent[] = [
  {
    id: 'nature-sprite-celebration',
    name: 'Nature Sprite Celebration',
    type: 'secret',
    requirements: {
      day: 'Any',
      time: 'Morning (upon leaving the house)',
      weather: 'any',
      location: 'Farm (exit the main house)',
      other: [
        'Must be married',
        'Sleep in the main farmhouse (not mountain/beach cabin)',
        'Talk to spouse at least 5 times',
        'Gift spouse at least twice',
        'Have empty inventory or fridge slot',
        'Three stages: ~35-69 days married (Event 1), ~70-104 days (Event 2), ~105+ days (Event 3)',
      ],
    },
    description: {
      id: 'Tiga tahap event dari para kurcaci merayakan pernikahan anda. Event 1 (35-69 hari): kurcaci Cherry dan Pumpkin memberikan Super Caffeine Potion. Event 2 (70-104 hari): kurcaci Sunny dan Mint memberikan Pink Diamond. Event 3 (105+ hari): kurcaci Blue dan Bor memberikan hadiah spesial lainnya.',
      en: 'Three-part event from the Nature Sprites celebrating your marriage. Event 1 (35–69 days): Cherry and Pumpkin give Super Caffeine Potion. Event 2 (70–104 days): Sunny and Mint give Pink Diamond. Event 3 (105+ days): Blue and Bor give another special gift.',
    },
    choices: [],
    reward: 'Super Caffeine Potion (Event 1), Pink Diamond (Event 2), special item (Event 3)',
  },
  {
    id: 'blackout',
    name: 'Blackout',
    type: 'secret',
    requirements: {
      day: 'Any',
      time: '06:00 AM',
      weather: 'stormy',
      season: 'summer',
      location: 'Home (indoor)',
      other: [
        'Season: Summer or Winter only',
        'Extreme storm weather required',
        'Must go to sleep due to being unable to leave',
      ],
    },
    description: {
      id: 'Saat cuaca sangat buruk di musim Summer atau Winter, anda tidak bisa keluar sama sekali dan tidak ada siaran TV. Satu-satunya pilihan adalah tidur. Saat tidur ada kemungkinan kecil terjadi mati listrik — tunggu hingga listrik kembali menyala.',
      en: 'During extreme storm weather in Summer or Winter, you cannot leave the house and there is no TV. The only option is to sleep. While sleeping, there is a small chance of a blackout — wait for the power to come back on.',
    },
    choices: [],
    reward: null,
  },
  {
    id: 'thomas-the-claus',
    name: 'Thomas the Claus',
    type: 'secret',
    requirements: {
      day: 'Winter 25',
      time: '09:00 PM – 12:00 AM',
      weather: 'any',
      season: 'winter',
      location: 'Home (go to sleep)',
      other: [
        'Give Ellen a Yarn Ball between Winter 1–23 so she can knit stockings for you',
      ],
    },
    description: {
      id: 'Mayor Thomas diam-diam masuk ke rumah dan memasukkan hadiah ke dalam kaos kaki yang dirajut Ellen. Hadiah berupa salah satu dari: Alexandrite, Mithril, Moonstone, Orichalcum, atau Sandrose (random).',
      en: 'Mayor Thomas secretly enters your home and places a gift in the stocking knitted by Ellen. Gift is one of: Alexandrite, Mithril, Moonstone, Orichalcum, or Sandrose (random).',
    },
    choices: [],
    reward: 'Random rare ore (Alexandrite, Mithril, Moonstone, Orichalcum, or Sandrose) + +20 Friendship with Mayor Thomas',
  },
  {
    id: 'new-years-strange-dreams',
    name: "New Year's Strange Dreams",
    type: 'secret',
    requirements: {
      day: 'Winter 30',
      time: 'After 06:00 PM',
      weather: 'any',
      season: 'winter',
      location: 'Home (do NOT attend either New Year festival)',
      other: [
        'Do not attend New Year\'s Soba at Rose Plaza',
        "Do not attend New Year's Party at Mother's Hill",
        'Save before midnight to re-roll the dream',
      ],
    },
    description: {
      id: 'Jika anda tidak menghadiri festival Soba maupun Party, anda akan bermimpi salah satu dari tiga mimpi aneh: menikahi Mayor Thomas di Church, para kurcaci bergabung membentuk Bon Vivant sambil berteriak "Combination completed!", atau bertarung melawan Karen yang misterius di Mineral Beach.',
      en: "If you skip both New Year's festivals, you dream one of three strange dreams: marrying Mayor Thomas at Church, Nature Sprites combining into Bon Vivant shouting \"Combination completed!\", or battling a mysterious Karen at Mineral Beach.",
    },
    choices: [],
    reward: null,
  },
  {
    id: 'moms-memorial',
    name: "Mom's Memorial",
    type: 'secret',
    requirements: {
      day: 'Autumn 5',
      time: '06:00 PM – 05:00 AM',
      weather: 'any',
      season: 'autumn',
      location: "Mother's Hill",
    },
    description: {
      id: 'Dudley tidak ada di Inn setiap tanggal 5 Autumn. Pergi ke Mother\'s Hill untuk menemukannya. Ia menghabiskan waktu di gunung untuk mengenang istrinya yang meninggal tepat pada tanggal tersebut.',
      en: "Dudley is absent from the Inn every Autumn 5. Go to Mother's Hill to find him. He spends the day on the mountain to mourn his wife who passed away on this date.",
    },
    choices: [],
    reward: null,
  },
];

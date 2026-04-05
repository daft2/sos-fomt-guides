import type { Festival } from './types';

export const springFestivals: Festival[] = [
  {
    id: 'mochi-bonanza',
    name: 'Mochi Bonanza',
    season: 'spring',
    date: 1,
    time: '06:00 PM – 12:00 AM',
    location: 'Rose Plaza',
    description: {
      id: 'Festival tahun baru kota Mineral Town. Tersedia mulai tahun kedua musim Spring. Rayakan pergantian tahun sambil menyantap kue mochi bersama para penduduk.',
      en: 'Mineral Town\'s New Year celebration, available from the second year in Spring. Celebrate the new year eating mochi with the townspeople.',
    },
    tips: {
      id: 'Kosongkan slot inventory sebelum festival untuk mendapatkan Mochi. Ajak bicara penduduk untuk +5 poin Friendship.',
      en: 'Clear inventory slots before the festival to receive Mochi. Talk to all residents for +5 Friendship points each.',
    },
    rewards: ['Mochi', '+5 Friendship with each resident spoken to'],
    isContest: false,
  },
  {
    id: 'white-day',
    name: 'White Day',
    season: 'spring',
    date: 14,
    time: '06:00 AM – 06:00 PM',
    location: 'Farm',
    description: {
      id: 'Bachelors dengan hati ungu (minimal 10.000 Affection) akan datang ke Farm membawakan Cookie atau Chocolate Cookie. Mereka yang memiliki hati kuning (minimal 40.000 AP) akan memberikan Chocolate Cookie.',
      en: 'Bachelors with purple heart (10,000+ Affection) visit your farm with Cookie or Chocolate Cookie. Those with yellow heart (40,000+ AP) bring Chocolate Cookie.',
    },
    tips: {
      id: 'Kosongkan inventory sebelum tidur di tanggal 14 jika sudah menikah. Anda bisa memberikan Cookie ke kandidat gadis untuk +1.000 AP dan +20 FP.',
      en: 'Clear inventory before sleeping on the 14th if married. You can give Cookie to female candidates for +1,000 AP and +20 FP.',
    },
    rewards: ['Cookie', 'Chocolate Cookie', 'Ring (if not yet received)', '+1,000 Affection with spouse (if married)'],
    isContest: false,
  },
  {
    id: 'spring-derby',
    name: 'Spring Derby',
    season: 'spring',
    date: 18,
    time: '10:00 AM – 06:00 PM',
    location: 'Rose Plaza',
    description: {
      id: 'Festival balap kuda musim semi. Mayor Thomas mengunjungi Farm di tanggal 17 untuk menanyakan partisipasi kuda anda. Beli tiket (100G/tiket) untuk bertaruh dan menangkan medal.',
      en: 'Spring horse racing festival. Mayor Thomas visits your farm on the 17th to ask about your horse\'s participation. Buy tickets (100G each) to bet and win medals.',
    },
    tips: {
      id: 'Semakin banyak hati kuda, semakin besar peluang menang. Tukar Brooch (18 medal) untuk keuntungan terbaik. Truth Jewel butuh 1.000 medal, Power Berry 900 medal.',
      en: 'More horse hearts = better chance of winning. Exchange Brooch (18 medals) for best profit. Truth Jewel costs 1,000 medals, Power Berry 900 medals.',
    },
    rewards: ['Medals (exchangeable)', 'Power Berry (first win)', '+20 Friendship with plaza residents (first win)'],
    isContest: true,
  },
  {
    id: 'cooking-exhibition',
    name: 'Cooking Exhibition',
    season: 'spring',
    date: 22,
    time: '10:00 AM – 06:00 PM',
    location: 'Rose Plaza',
    description: {
      id: 'Kontes memasak dengan tema yang berganti tiap tahun. Tahun 1: Juice, Tahun 2: Sweets, Tahun 3: Bread, Tahun 4: Noodles, Tahun 5: Rice. Semakin tinggi stamina recovery masakan, semakin tinggi nilai dari juri.',
      en: 'Cooking contest with rotating annual themes. Year 1: Juice, Year 2: Sweets, Year 3: Bread, Year 4: Noodles, Year 5: Rice. Higher stamina recovery = higher judge score.',
    },
    tips: {
      id: 'Butuh rumah yang sudah di-upgrade dan dapur. Setelah festival, Bon Vivant bisa ditemui di Rose Plaza 06:00–08:00 PM. Berikan Elli Leaves (favoritnya) untuk menambah Affection.',
      en: 'Requires upgraded house with kitchen. After the festival, Bon Vivant can be found in Rose Plaza 6–8 PM. Give Elli Leaves (his favorite) to increase Affection.',
    },
    rewards: ['+20 Friendship with all residents (if you win)'],
    isContest: true,
  },
];

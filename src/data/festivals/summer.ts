import type { Festival } from './types';

export const summerFestivals: Festival[] = [
  {
    id: 'fetch-fest',
    name: 'Fetch Fest',
    season: 'summer',
    date: 1,
    time: '10:00 AM – 06:00 PM',
    location: 'Mineral Beach',
    description: {
      id: 'Kontes Frisbee hewan peliharaan di pantai. Zack mengunjungi Farm sehari sebelumnya untuk mendaftarkan pet dewasa anda. Lempar Frisbee sejauh mungkin untuk menang.',
      en: 'Pet Frisbee contest at the beach. Zack visits your farm the day before to register your adult pet. Throw the Frisbee as far as possible to win.',
    },
    tips: {
      id: 'Tingkatkan poin pelatihan pet dengan bermain Frisbee di Mineral Beach sebelumnya. Pet harus sudah dewasa untuk berpartisipasi.',
      en: 'Increase your pet\'s training points by playing Frisbee at Mineral Beach beforehand. Pet must be fully grown to participate.',
    },
    rewards: ['Power Berry (first win)', '+20 Friendship with all residents (if you win)'],
    isContest: true,
  },
  {
    id: 'cluck-cluck-clash',
    name: 'Cluck-Cluck Clash',
    season: 'summer',
    date: 7,
    time: '10:00 AM – 06:00 PM',
    location: 'Rose Plaza',
    description: {
      id: 'Kontes sumo ayam. Rick mengunjungi Farm di tanggal 6 untuk mendaftarkan ayam anda. Tekan tombol yang diminta untuk menakut-nakuti ayam lawan hingga keluar dari garis.',
      en: 'Chicken sumo contest. Rick visits your farm on the 6th to register your chicken. Press the required button to scare the opposing chicken out of the ring.',
    },
    tips: {
      id: 'Pilih ayam dengan hati terbanyak untuk peluang menang terbaik. Ayam pemenang akan memproduksi Golden atau Platinum Egg tergantung waktu di dalam/luar ruangan.',
      en: 'Choose the chicken with the most hearts for the best winning chance. The winning chicken will produce Golden or Platinum Eggs depending on time spent indoors/outdoors.',
    },
    rewards: ['Chicken Sumo Gold Trophy', '+20 Friendship with all residents (if you win)', 'Golden/Platinum Egg production for winning chicken'],
    isContest: true,
  },
  {
    id: 'moo-moo',
    name: 'Moo-Moo',
    season: 'summer',
    date: 20,
    time: '10:00 AM – 06:00 PM',
    location: 'Rose Plaza',
    description: {
      id: 'Kontes sapi terbaik. Mugi mengunjungi Farm di tanggal 19 untuk mendaftarkan sapi anda. Mugi menjadi juri dan memilih sapi terbaik berdasarkan jumlah hati.',
      en: 'Best cow contest. Mugi visits your farm on the 19th to register your cow. Mugi is the judge and selects the best cow based on heart count.',
    },
    tips: {
      id: 'Pilih sapi dengan hati terbanyak atau maksimal. Sapi pemenang akan memproduksi Gold atau Platinum Milk tergantung waktu di dalam/luar ruangan.',
      en: 'Choose the cow with the most hearts. The winning cow will produce Gold or Platinum Milk depending on time spent indoors/outdoors.',
    },
    rewards: ['Cow Gold Trophy', '+20 Friendship with all residents (if you win)', 'Gold/Platinum Milk production for winning cow'],
    isContest: true,
  },
  {
    id: 'fireworks',
    name: 'Fireworks',
    season: 'summer',
    date: 24,
    time: '06:00 PM – 12:00 AM',
    location: 'Mineral Beach',
    description: {
      id: 'Festival kembang api di Mineral Beach saat matahari terbenam. Kandidat dengan hati hijau (minimal 30.000 AP) akan mengundang anda menonton bersama. Ajak bicara semua penduduk untuk +5 Friendship.',
      en: 'Fireworks festival at Mineral Beach at sunset. Candidates with green heart (30,000+ AP) will invite you to watch together. Talk to all residents for +5 Friendship.',
    },
    tips: {
      id: 'Jika sudah menikah, bicaralah dengan pasangan untuk memulai festival. Jika belum ada yang memiliki hati hijau, ajak bicara semua NPC untuk memulai.',
      en: 'If married, talk to your spouse to start the festival. If no one has a green heart yet, talk to all NPCs to begin.',
    },
    rewards: ['+5 Friendship with each resident spoken to'],
    isContest: false,
  },
];

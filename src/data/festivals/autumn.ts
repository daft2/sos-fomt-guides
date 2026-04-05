import type { Festival } from './types';

export const autumnFestivals: Festival[] = [
  {
    id: 'concert',
    name: 'Concert',
    season: 'autumn',
    date: 3,
    time: '06:00 PM – 12:00 AM',
    location: 'Church',
    description: {
      id: 'Konser musik sederhana di Church. Carter mengunjungi Farm di tanggal 2 untuk menanyakan partisipasi anda. Jika setuju, anda akan memainkan Ocarina dan mendapatkan +10 Friendship ekstra ke semua penduduk.',
      en: 'A simple music concert at the Church. Carter visits your farm on the 2nd to ask about your participation. If you agree, you play the Ocarina and gain +10 extra Friendship with all residents.',
    },
    tips: {
      id: 'Selalu terima ajakan Carter untuk memainkan alat musik — ekstra +10 Friendship sangat berharga.',
      en: 'Always accept Carter\'s invitation to play an instrument — the extra +10 Friendship is very valuable.',
    },
    rewards: ['+5 Friendship with each resident (base)', '+10 extra Friendship with all (if playing Ocarina)'],
    isContest: false,
  },
  {
    id: 'harvest',
    name: 'Harvest Festival',
    season: 'autumn',
    date: 9,
    time: '10:00 AM – 06:00 PM',
    location: 'Rose Plaza',
    description: {
      id: 'Para penduduk memasak bersama dalam periuk besar. Masukkan bahan makanan bergizi seperti Milk, Egg, atau sayuran ke dalam periuk untuk mendapatkan Stamina ekstra. Jangan masukkan bahan berbahaya.',
      en: 'Townspeople cook together in a large pot. Toss nutritious ingredients like Milk, Eggs, or vegetables into the pot for extra Stamina. Do not add harmful ingredients.',
    },
    tips: {
      id: 'Hindari memasukkan Poison Mushroom atau Red Grass — Stamina anda akan berkurang. Bicarakan dengan Mayor Thomas sambil memegang bahan untuk berkontribusi.',
      en: 'Avoid tossing Poison Mushroom or Red Grass — your Stamina will decrease. Talk to Mayor Thomas while holding an ingredient to contribute.',
    },
    rewards: ['Increased Stamina (if good ingredients added)', '+5 Friendship with each resident spoken to'],
    isContest: false,
  },
  {
    id: 'moonlight-night',
    name: 'Moonlight Night',
    season: 'autumn',
    date: 13,
    time: '06:00 PM – 12:00 AM',
    location: "Mother's Hill Summit",
    description: {
      id: 'Malam bulan purnama di puncak Mother\'s Hill. Pasangan atau kandidat dengan hati hijau (Affection tertinggi) menunggu anda di puncak. Bawa Moon Dumpling untuk Affection ekstra.',
      en: "Full moon viewing at Mother's Hill summit. Your spouse or the candidate with the highest Affection (green heart) waits for you at the summit. Bring Moon Dumplings for extra Affection.",
    },
    tips: {
      id: 'Bawa Moon Dumpling untuk mendapatkan +1.000 AP ekstra. Resep Moon Dumpling didapat dari TV (Delicious Cooking Show). Bahannya adalah Dango Flour dari General Store.',
      en: 'Bring Moon Dumplings for an extra +1,000 AP. Moon Dumpling recipe comes from TV (Delicious Cooking Show). Ingredient is Dango Flour from the General Store.',
    },
    rewards: ['+1,000 Affection with partner', '+1,000 extra Affection (with Moon Dumpling)'],
    isContest: false,
  },
  {
    id: 'autumn-derby',
    name: 'Autumn Derby',
    season: 'autumn',
    date: 18,
    time: '10:00 AM – 06:00 PM',
    location: 'Rose Plaza',
    description: {
      id: 'Festival balap kuda musim gugur. Sama seperti Spring Derby — Mayor Thomas mengunjungi Farm di tanggal 17 untuk menanyakan partisipasi kuda anda. Beli tiket (100G/tiket) untuk bertaruh.',
      en: 'Autumn horse racing festival. Same as Spring Derby — Mayor Thomas visits your farm on the 17th. Buy tickets (100G each) to bet and win medals.',
    },
    tips: {
      id: 'Semakin banyak hati kuda, semakin besar peluang menang. Tukar Brooch (18 medal) untuk keuntungan terbaik. Truth Jewel butuh 1.000 medal, Power Berry 900 medal.',
      en: 'More horse hearts = better chance of winning. Exchange Brooch (18 medals) for best profit. Truth Jewel costs 1,000 medals, Power Berry 900 medals.',
    },
    rewards: ['Medals (exchangeable)', 'Power Berry (first win)', '+20 Friendship with plaza residents (first win)'],
    isContest: true,
  },
  {
    id: 'fluffy',
    name: 'Fluffy Festival',
    season: 'autumn',
    date: 21,
    time: '10:00 AM – 06:00 PM',
    location: 'Rose Plaza',
    description: {
      id: 'Kontes Rabbit, Sheep, atau Alpaca terbaik. Mugi mengunjungi Farm di tanggal 20. Pilih hewan yang tidak sedang hamil, bulunya belum dicukur, dan memiliki hati terbanyak.',
      en: 'Best Rabbit, Sheep, or Alpaca contest. Mugi visits your farm on the 20th. Choose an animal that is not pregnant, unsheared, with the most hearts.',
    },
    tips: {
      id: 'Hewan pemenang menghasilkan Gold atau Platinum Fur berdasarkan waktu di dalam/luar ruangan. X Fur muncul dengan peluang sangat kecil saat hewan sering di luar.',
      en: 'The winning animal produces Gold or Platinum Fur based on time indoors/outdoors. X Fur has a very rare chance when the animal spends lots of time outside.',
    },
    rewards: ['Fluffy Festival Trophy', '+20 Friendship with all residents (if you win)', 'Gold/Platinum Fur production for winning animal'],
    isContest: true,
  },
  {
    id: 'pumpkin-jamboree',
    name: 'Pumpkin Jamboree',
    season: 'autumn',
    date: 30,
    time: 'Varies by visitor',
    location: 'Farm',
    description: {
      id: 'Penduduk kota mengunjungi Farm meminta camilan manis. Mei datang 06–07 AM (+20 FP), Yu datang 08–09 AM (+20 FP), Popuri datang 10–11 AM (+1.000 AP). Jika sudah menikah, ada pesta makan malam keluarga 06 PM–12 AM.',
      en: 'Town residents visit the farm asking for sweet snacks. Mei arrives 6–7 AM (+20 FP), Yu arrives 8–9 AM (+20 FP), Popuri arrives 10–11 AM (+1,000 AP). If married, family dinner party at 6 PM–12 AM.',
    },
    tips: {
      id: 'Siapkan Baked Yam (Yam + Oven), Baked Apple (Apple + Frying Pan), atau Chocolate (100G di General Store) sebagai camilan. Jika menikah dengan Kappa atau Harvest Goddess, pesta keluarga tidak berlaku.',
      en: 'Prepare Baked Yam (Yam + Oven), Baked Apple (Apple + Pan), or Chocolate (100G at General Store) as snacks. If married to Kappa or Harvest Goddess, the family party does not apply.',
    },
    rewards: ['+20 Friendship with Mei and Yu', '+1,000 Affection with Popuri', '+1,000 Affection with spouse (if married)', '+20 Friendship with child (if married)'],
    isContest: false,
  },
];

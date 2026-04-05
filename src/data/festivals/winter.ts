import type { Festival } from './types';

export const winterFestivals: Festival[] = [
  {
    id: 'valentines-day',
    name: "Valentine's Day",
    season: 'winter',
    date: 14,
    time: '06:00 AM – 06:00 PM',
    location: 'Farm',
    description: {
      id: 'Kandidat gadis dengan hati ungu (minimal 10.000 AP) datang ke Farm membawa Chocolate atau Orangette. Mereka dengan hati kuning (minimal 40.000 AP) memberikan Orangette beserta Ring.',
      en: 'Female candidates with purple heart (10,000+ AP) visit the farm with Chocolate or Orangette. Those with yellow heart (40,000+ AP) bring Orangette along with a Ring.',
    },
    tips: {
      id: 'Kosongkan inventory sebelum tidur di tanggal 14 jika sudah menikah. Anda bisa membalas pemberian pasangan dengan Chocolate untuk +1.000 AP dan +20 FP.',
      en: 'Clear inventory before sleeping on the 14th if married. You can reciprocate with Chocolate for +1,000 AP and +20 FP.',
    },
    rewards: ['Chocolate', 'Orangette', 'Ring (from yellow-heart candidate)', '+1,000 Affection with spouse (if married)'],
    isContest: false,
  },
  {
    id: 'starlight-night',
    name: 'Starlight Night',
    season: 'winter',
    date: 24,
    time: '06:00 PM – 12:00 AM',
    location: "Candidate's home",
    description: {
      id: 'Malam romantis bersama gebetan. Mayor Thomas mengunjungi Farm di tanggal 23 membawa undangan dari kandidat dengan hati hijau. Pilih satu kandidat untuk dihabiskan malam bersamanya.',
      en: 'Romantic evening with your love interest. Mayor Thomas visits on the 23rd with invitations from green-heart candidates. Choose one candidate to spend the evening with.',
    },
    tips: {
      id: 'Kai tidak berpartisipasi kecuali anda sudah menikah dengannya. Karakter perempuan yang menerima undangan Brandon, Cliff, Doc, Gray, atau Jennifer akan mendapat Ring.',
      en: 'Kai does not participate unless you are married to him. Female characters who accept an invitation from Brandon, Cliff, Doc, Gray, or Jennifer will receive a Ring.',
    },
    rewards: ['+2,000 Affection with chosen candidate', '+30 Friendship with chosen candidate', 'Ring (female player from certain bachelors)'],
    isContest: false,
  },
  {
    id: 'new-years-soba',
    name: "New Year's Soba",
    season: 'winter',
    date: 30,
    time: '06:00 PM – 12:00 AM',
    location: 'Rose Plaza',
    description: {
      id: 'Salah satu dari tiga pilihan perayaan tahun baru (bersama New Year\'s Party dan New Year\'s Strange Dreams). Makan mie Soba keberuntungan bersama penduduk kota dan terima 9 Buckwheat Flour.',
      en: "One of three New Year's Eve celebration choices (alongside New Year's Party and Strange Dreams). Eat lucky Soba noodles with townsfolk and receive 9 Buckwheat Flour.",
    },
    tips: {
      id: 'Buckwheat Flour tidak dijual di General Store — ini satu-satunya cara mendapatkannya secara konsisten. Digunakan untuk Zaru Soba dan Tempura Soba.',
      en: "Buckwheat Flour is not sold at the General Store — this is the most consistent way to obtain it. Used for Zaru Soba and Tempura Soba.",
    },
    rewards: ['9 Buckwheat Flour', '+5 Friendship with each resident spoken to'],
    isContest: false,
  },
  {
    id: 'new-years-party',
    name: "New Year's Party",
    season: 'winter',
    date: 1, // technically 1 Spring, midnight
    time: '12:00 AM – 04:00 AM',
    location: "Mother's Hill Summit",
    description: {
      id: 'Salah satu dari tiga pilihan perayaan tahun baru. Pergi ke puncak Mother\'s Hill antara 12:00–04:00 AM untuk menyaksikan terbitnya fajar di tahun baru bersama seluruh penduduk kota.',
      en: "One of three New Year's Eve celebration choices. Go to Mother's Hill summit between midnight and 4 AM to watch the first sunrise of the new year with the townspeople.",
    },
    tips: {
      id: 'Anda tidak bisa menghadiri New Year\'s Soba dan New Year\'s Party sekaligus. Pilih satu atau tidak keduanya untuk event rahasia New Year\'s Strange Dreams.',
      en: "You cannot attend both New Year's Soba and New Year's Party. Skip both for the secret New Year's Strange Dreams event.",
    },
    rewards: ['+5 Friendship with each resident spoken to'],
    isContest: false,
  },
];

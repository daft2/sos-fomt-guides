import type { Location } from './types';

export const locations: Location[] = [
  {
    id: 1,
    name: "Basil's House",
    description: {
      id: 'Basil dan istrinya Anna serta Marie tinggal disini. Basil bekerja sebagai Ahli Botani dan membuat perpustakaan di sebelah rumahnya. Anna menyelenggarakan kelas memasak setiap hari Saturday jika hati Anna telah maksimal.',
      en: "Basil, his wife Anna, and their daughter Marie live here. Basil is a botanist who built the library next door. Anna holds cooking classes here every Saturday once her friendship is maxed.",
    },
  },
  {
    id: 2,
    name: 'Library',
    description: {
      id: 'Perpustakaan Mineral Town. Anda bisa menemukan Truth Jewel di lantai 2, rak buku bagian kanan tengah.',
      en: "Mineral Town's library. A Truth Jewel can be found on the 2nd floor in the center-right bookshelf.",
    },
    hours: '10:00 AM – 04:00 PM',
    closedDays: 'Monday & Festival days',
  },
  {
    id: 3,
    name: "Ellen's House",
    description: {
      id: 'Rumah Ellen, nenek yang mengurus cucunya Elly dan Yu. Rajin mengunjungi Ellen bisa memberikan resep masakan spesial.',
      en: "Ellen's house, where the grandmother cares for her grandchildren Elly and Yu. Visiting Ellen regularly can reward you with special recipes.",
    },
  },
  {
    id: 4,
    name: "Mayor's House",
    description: {
      id: 'Rumah Mayor Thomas, juga tempat tinggal anaknya Harris. Kulkas di rumah Mayor menyimpan Truth Jewel ke-9 (buka Monday–Friday).',
      en: "Mayor Thomas's house, also home to his son Harris. The fridge inside holds the 9th Truth Jewel (accessible Monday–Friday).",
    },
  },
  {
    id: 5,
    name: 'General Store',
    description: {
      id: 'Toko Jeff yang menjual bibit musiman, makanan, dan upgrade tas. Buka Monday, Wednesday–Saturday.',
      en: "Jeff's shop selling seasonal seeds, food, and bag upgrades. Open Monday, Wednesday–Saturday.",
    },
    hours: '09:00 AM – 05:00 PM',
    closedDays: 'Tuesday, Sunday & Festival days',
  },
  {
    id: 6,
    name: 'Mineral Clinic',
    description: {
      id: 'Klinik yang dikelola Doctor dan Elly. Menjual Stamina Booster, Caffeine, dan pemeriksaan kesehatan.',
      en: 'The clinic run by Doctor and Elli. Sells Stamina Boosters, Caffeine, and medical examinations.',
    },
    hours: '09:00 AM – 04:00 PM',
    closedDays: 'Wednesday & Festival days',
  },
  {
    id: 7,
    name: 'Church',
    description: {
      id: 'Gereja yang dikelola Carter. Di sini anda bisa melakukan Blessing untuk Cursed Tool (Monday & Wednesday atau saat hujan/salju 01:00–04:00 PM). Nature Sprite tinggal di bagian belakang Church.',
      en: "The church managed by Carter. Here you can perform Blessing on Cursed Tools (Monday & Wednesday or during rain/snow 01:00–04:00 PM). Nature Sprites live behind the church.",
    },
    hours: '10:00 AM – 07:00 PM',
    closedDays: 'Festival days',
  },
  {
    id: 8,
    name: "Nature Sprite's Hut",
    description: {
      id: 'Tempat tinggal para Nature Sprite di belakang Church. Berikan hadiah setiap hari untuk berteman dengan mereka.',
      en: "The Nature Sprites' home behind the Church. Give them daily gifts to build friendship.",
    },
    hours: '09:00 AM – 06:00 PM',
    closedDays: 'None',
  },
  {
    id: 9,
    name: 'Adge Winery & Cellar',
    description: {
      id: 'Toko anggur milik Duke dan Manna. Menjual Grape Juice dan Premium Grape Juice.',
      en: "Duke and Manna's wine cellar. Sells Grape Juice and Premium Grape Juice.",
    },
    hours: '10:00 AM – 12:00 PM',
    closedDays: 'Saturday & Festival days',
  },
  {
    id: 10,
    name: 'Inn',
    description: {
      id: 'Penginapan milik Dudley. Menjual makanan dan minuman, minuman gratis menambah 1 Stamina. Cliff tinggal disini.',
      en: "Dudley's inn. Sells food and drinks; free drinks restore 1 Stamina. Cliff lives here.",
    },
    hours: '08:00 AM – 09:00 PM',
    closedDays: 'Festival days & Fall 5 after 05:00 PM',
  },
  {
    id: 11,
    name: 'Forge',
    description: {
      id: 'Pandai besi milik Saibara dan Gray. Untuk upgrade Tool, membeli Milker, Brush, Clipper, dan aksesoris.',
      en: "Saibara and Gray's forge. Used for tool upgrades, and sells Milker, Brush, Clipper, and accessories.",
    },
    hours: '10:00 AM – 04:00 PM',
    closedDays: 'Thursday & Festival days',
  },
  {
    id: 12,
    name: 'Rose Plaza',
    description: {
      id: 'Alun-alun kota tempat mayoritas Festival diadakan. Van membuka toko hewan peliharaan di sini setiap tanggal 15 musim.',
      en: "The town square where most Festivals are held. Van opens his pet shop here on the 15th of each season.",
    },
  },
  {
    id: 13,
    name: "Kai's Beach Cafe",
    description: {
      id: 'Kafe pantai Kai yang hanya buka saat musim Summer (Monday–Saturday). Menjual makanan dan minuman.',
      en: "Kai's beachside café, only open during Summer (Monday–Saturday). Sells food and drinks.",
    },
    hours: '11:00 AM – 01:00 PM & 05:00 PM – 07:00 PM',
    closedDays: 'Sunday & all seasons except Summer',
  },
  {
    id: 14,
    name: "Zack's House",
    description: {
      id: 'Rumah Zack di tepi pantai. Huang membuka lapaknya disini. Anda bisa mendapatkan Fishing Rod dari Zack.',
      en: "Zack's beachside house where Huang sets up his stall. You can receive the Fishing Rod from Zack here.",
    },
    hours: '11:00 AM – 04:00 PM (Huang)',
    closedDays: 'Festival days',
  },
  {
    id: 15,
    name: 'PoPoultry',
    description: {
      id: 'Peternakan ayam dan kelinci milik keluarga Popuri. Beli Chicken, Angora Rabbit, dan perlengkapan kandang.',
      en: "Popuri's family poultry farm. Buy Chickens, Angora Rabbits, and coop equipment.",
    },
    hours: '11:00 AM – 04:00 PM',
    closedDays: 'Sunday & Festival days',
  },
  {
    id: 16,
    name: 'Yodel Ranch',
    description: {
      id: 'Ranch milik Mugi dan Mei. Beli Cow, Sheep, Alpaca, Fodder, dan Breeding Kit.',
      en: "Mugi and Mei's ranch. Buy Cows, Sheep, Alpacas, Fodder, and Breeding Kits.",
    },
    hours: '10:00 AM – 03:00 PM',
    closedDays: 'Monday & Festival days',
  },
  {
    id: 17,
    name: 'Workshop',
    description: {
      id: 'Workshop milik Gotts dan Brandon. Untuk upgrade rumah, kandang, membeli furniture, dan pohon buah.',
      en: "Gotts and Brandon's workshop. Used for house and barn upgrades, furniture purchases, and fruit tree orders.",
    },
    hours: '11:00 AM – 04:00 PM',
    closedDays: 'Saturday & Festival days',
  },
  {
    id: 18,
    name: "Mother's Hill",
    description: {
      id: 'Puncak gunung di luar Mineral Town. Danau di sini membeku di musim Winter untuk mengakses Lake Mine.',
      en: "The mountain summit outside Mineral Town. The lake here freezes in Winter, granting access to the Lake Mine.",
    },
  },
  {
    id: 19,
    name: "Jennifer's Tent",
    description: {
      id: 'Tenda tempat tinggal Jennifer di area danau Mother\'s Hill.',
      en: "Jennifer's tent near the Mother's Hill lake area.",
    },
  },
  {
    id: 20,
    name: 'Lake Mine',
    description: {
      id: 'Tambang di tengah danau Mother\'s Hill. Hanya bisa diakses saat musim Winter atau dengan Travel Stone. Berisi permata berharga dan Cursed Tools.',
      en: "The mine in the center of Mother's Hill lake. Only accessible in Winter or with the Travel Stone. Contains valuable gemstones and Cursed Tools.",
    },
    closedDays: 'All seasons except Winter (without Travel Stone)',
  },
  {
    id: 21,
    name: 'Spring Mine',
    description: {
      id: 'Tambang di dekat Hot Spring. Berisi material upgrade Tool seperti Copper, Silver, Gold, Mithril, dan Mythic Ore. Bisa diakses semua musim kecuali Winter.',
      en: 'The mine near the Hot Spring. Contains tool upgrade materials like Copper, Silver, Gold, Mithril, and Mythic Ore. Accessible all seasons except Winter.',
    },
    closedDays: 'Winter',
  },
  {
    id: 22,
    name: 'Goddess Spring',
    description: {
      id: 'Kolam air terjun tempat Harvest Goddess bisa ditemui. Lemparkan item setiap hari untuk mendapatkan reward spesial.',
      en: 'The waterfall pond where the Harvest Goddess can be met. Throw one item per day to earn special rewards.',
    },
  },
  {
    id: 23,
    name: 'Hot Spring',
    description: {
      id: 'Pemandian air panas di dekat Farm dan Spring Mine. Berendam memulihkan 1 Stamina dan 1 Fatigue per menit dalam game. Gratis!',
      en: 'The hot spring near the Farm and Spring Mine. Soaking restores 1 Stamina and 1 Fatigue per in-game minute. Free!',
    },
  },
];

import type { Guide } from './types';

const stamina: Guide = {
  id: 'stamina',
  title: {
    id: 'Panduan Mengelola Stamina & Fatigue',
    en: 'Stamina & Fatigue Management Guide',
  },
  category: 'stamina',
  sections: [
    {
      heading: { id: 'Stamina & Fatigue', en: 'Stamina & Fatigue' },
      body: {
        id: 'Ada dua komponen energi: Stamina (STA) — icon Power Berry, berkurang saat beraktivitas. Setiap Power Berry mewakili 15 poin stamina. Fatigue (FAT) — icon wajah, meningkat seiring kelelahan. Di awal permainan karakter memiliki 150 poin Stamina (10 icon Power Berry). Stamina berkurang dari nilai tertinggi ke 0, sedangkan Fatigue meningkat dari 0 ke 100. Jika Fatigue mencapai 100, karakter pingsan dan dibawa ke Mineral Clinic.',
        en: 'There are two energy components: Stamina (STA) — a Power Berry icon that decreases with activity. Each Power Berry represents 15 stamina points. Fatigue (FAT) — a face icon that increases as you tire. At the start you have 150 Stamina (10 Power Berry icons). Stamina counts down from max to 0; Fatigue counts up from 0 to 100. If Fatigue reaches 100, your character faints and is taken to the Mineral Clinic.',
      },
    },
    {
      heading: { id: 'Biaya Stamina Per Tool', en: 'Stamina Cost Per Tool' },
      body: {
        id: 'Biaya stamina berbeda-beda per Tool dan meningkat seiring upgrade (namun jauh lebih efisien secara keseluruhan): Axe: L1=2, L2=4, L3=5, L4=8, L5=10, Cursed=20, Mythic=10 STA. Fishing Pole: 2 STA di semua level. Hammer: L1=2, L2=4, L3=5, L4=8, L5=10, Cursed=15, Mythic=20 STA. Hoe: L1=2, L2=3, L3=4, L4=5, L5=7, Cursed=15, Mythic=40 STA. Sickle: L1=2, L2=3, L3=5, L4=7, L5=10, Cursed=15, Mythic=20 STA. Watering Can: L1=2, L2=4, L3=6, L4=8, L5=10, Cursed=15, Mythic=20 STA. Jatuh di lubang Mine: -20 STA (1 lantai), -30 (2), -40 (3), -60 (4), -70 (5 lantai).',
        en: 'Stamina costs vary by Tool and increase with upgrades (but are far more efficient overall): Axe: L1=2, L2=4, L3=5, L4=8, L5=10, Cursed=20, Mythic=10 STA. Fishing Pole: 2 STA at all levels. Hammer: L1=2, L2=4, L3=5, L4=8, L5=10, Cursed=15, Mythic=20 STA. Hoe: L1=2, L2=3, L3=4, L4=5, L5=7, Cursed=15, Mythic=40 STA. Sickle: L1=2, L2=3, L3=5, L4=7, L5=10, Cursed=15, Mythic=20 STA. Watering Can: L1=2, L2=4, L3=6, L4=8, L5=10, Cursed=15, Mythic=20 STA. Falling in Mine holes: -20 STA (1 floor), -30 (2), -40 (3), -60 (4), -70 (5 floors).',
      },
    },
    {
      heading: { id: 'Level Fatigue', en: 'Fatigue Levels' },
      body: {
        id: 'Cek icon Fatigue: Merah (Tersenyum Riang) = 0 poin. Kuning (Tersenyum Biasa) = 1–49 poin. Hijau (Lesu) = 50–79 poin. Biru (Pening) = 80–100 poin. Fatigue bertambah +1 saat menggunakan Tool saat hujan/salju atau setelah 10:00 PM; +2 FAT setelah 00:00 AM; +2 FAT saat Stamina = 0; +3–4 FAT tidur terlalu larut; +10 FAT tidak tidur sama sekali; +10 FAT dari Cursed Tool.',
        en: 'Check the Fatigue icon: Red (Happy Smile) = 0 points. Yellow (Normal Smile) = 1–49 points. Green (Sluggish) = 50–79 points. Blue (Dizzy) = 80–100 points. Fatigue increases by +1 when using tools in rain/snow or after 10:00 PM; +2 FAT after 00:00 AM; +2 FAT when Stamina = 0; +3–4 FAT from sleeping very late; +10 FAT from not sleeping at all; +10 FAT from Cursed Tools.',
      },
    },
    {
      heading: { id: 'Cara Memulihkan Stamina & Fatigue', en: 'How to Recover Stamina & Fatigue' },
      body: {
        id: 'Menyantap Makanan: Dudley\'s Inn dan Kai\'s Beach Cafe menjual makanan siap santap. Setiap makanan memiliki pemulihan berbeda. Tidur: Pemulihan stamina = 50 + 7 poin per jam tidur. Pemulihan fatigue = 5 + 2 poin per jam tidur. Karakter bangun pukul 06:00 AM. Hot Spring: Memulihkan 1 STA dan 1 FAT per menit dalam game. Gem: Goddess Gem memulihkan 1 Stamina; Kappa Gem memulihkan 1 Fatigue. Flower Vase: Letakkan bunga tertentu di vas untuk pemulihan pasif.',
        en: 'Eating Food: Dudley\'s Inn and Kai\'s Beach Cafe sell ready-made food. Each food item restores different amounts. Sleep: Stamina recovery = 50 + 7 points per hour slept. Fatigue recovery = 5 + 2 points per hour slept. Character wakes at 06:00 AM. Hot Spring: Restores 1 STA and 1 FAT per in-game minute. Gems: Goddess Gem restores 1 Stamina; Kappa Gem restores 1 Fatigue. Flower Vase: Place specific flowers in the vase for passive recovery.',
      },
    },
    {
      heading: { id: 'Flower Vase', en: 'Flower Vase' },
      body: {
        id: 'Beli Flower Vase dari Huang di tanggal 11 Spring (perlu >5,000 G). Letakkan bunga di vas untuk pemulihan pasif. Bunga akan layu jadi perlu diganti: Moondrop Flower (+10 STA, 7 hari). Toy Flower (-7 FAT, 5 hari). Pinkcat Flower (-5 FAT, 5 hari). Blue Magic Flower (+3 STA, 10 hari). Red Magic Flower (-10 FAT, 5 hari). Sunsweet Flower (-20 FAT, 2 hari). PERHATIAN: Jika menolak tawaran Huang 4 kali berturut-turut, ia tidak akan pernah menawarkan lagi.',
        en: 'Buy the Flower Vase from Huang on Spring 11 (requires >5,000 G). Place flowers in the vase for passive recovery. Flowers will wilt and need replacing: Moondrop Flower (+10 STA, 7 days). Toy Flower (-7 FAT, 5 days). Pinkcat Flower (-5 FAT, 5 days). Blue Magic Flower (+3 STA, 10 days). Red Magic Flower (-10 FAT, 5 days). Sunsweet Flower (-20 FAT, 2 days). WARNING: Refusing Huang\'s offer 4 times in a row means he will never offer it again.',
      },
    },
    {
      heading: { id: 'Efisiensi Pemulihan Stamina', en: 'Efficient Stamina Recovery' },
      body: {
        id: 'Resep termudah: Curry Udon (+60 STA) dari Wheat Flour (50 G) + Curry Powder (50 G), keduanya bisa dibeli di General Store. Resep: Udon = Wheat Flour + Knife + Pot + Rolling Pin; Curry Udon = Udon + Curry Powder + Pot. Pemulihan terbesar: Stamina Booster XL (+100 STA) dari Elly di Clinic (1,000 G), tersedia setelah jual 50 Blue Grass. Bahan buat sendiri: Stamina Booster + Honey + Orange Grass + Black Grass + True Magic Red Flower + Blue Grass.',
        en: 'Easiest recipe: Curry Udon (+60 STA) from Wheat Flour (50 G) + Curry Powder (50 G), both sold at the General Store. Recipe: Udon = Wheat Flour + Knife + Pot + Rolling Pin; Curry Udon = Udon + Curry Powder + Pot. Highest recovery: Stamina Booster XL (+100 STA) from Elly at the Clinic (1,000 G), available after selling 50 Blue Grass. DIY ingredients: Stamina Booster + Honey + Orange Grass + Black Grass + True Magic Red Flower + Blue Grass.',
      },
    },
    {
      heading: { id: 'Efisiensi Pemulihan Fatigue', en: 'Efficient Fatigue Recovery' },
      body: {
        id: 'Caffeine (1,000 G, -20 FAT) dan Super Caffeine (2,000 G, -50 FAT) tersedia dari Elly di Mineral Clinic. Buat sendiri: Caffeine = Honey + Orange Grass + White Grass + True Magic Red Flower. Super Caffeine = Caffeine + Green Grass. Alternatif: Vegetable Juice (-20 FAT) dan Spicy Vegetable Stir Fry (-20 FAT).',
        en: 'Caffeine (1,000 G, -20 FAT) and Super Caffeine (2,000 G, -50 FAT) are available from Elly at the Mineral Clinic. DIY: Caffeine = Honey + Orange Grass + White Grass + True Magic Red Flower. Super Caffeine = Caffeine + Green Grass. Alternatives: Vegetable Juice (-20 FAT) and Spicy Vegetable Stir Fry (-20 FAT).',
      },
    },
  ],
};

export default stamina;

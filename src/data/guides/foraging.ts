import type { Guide } from './types';

const foraging: Guide = {
  id: 'foraging',
  title: {
    id: 'Panduan Foraging – SoS FoMT',
    en: 'Foraging Guide – SoS FoMT',
  },
  category: 'farming',
  sections: [
    {
      heading: { id: 'Apa itu Foraging?', en: 'What Is Foraging?' },
      body: {
        id: 'Item Foraging adalah item dari alam liar seperti jamur, bunga, dan rerumputan yang bisa dijual atau digunakan sebagai bahan masakan. Jenis item yang muncul bergantung dari musim dan muncul setiap hari namun tidak selalu di tempat yang sama.',
        en: 'Forage items are wild-found items such as mushrooms, flowers, and grasses that can be sold or used in recipes. The types available depend on the season and appear daily but not always in the same spots.',
      },
    },
    {
      heading: { id: 'Lokasi Foraging', en: 'Foraging Locations' },
      body: {
        id: 'Lokasi yang bisa dikunjungi setiap harinya: Area hutan selatan dekat Gotts, area sebelah Hot Spring dan kolam Harvest Goddess, jalur menuju puncak Mother\'s Hill, area selatan danau dekat tenda Jennifer, area rerumputan di jalur masuk Mother\'s Hill, Secret Forest, Mineral Beach, hutan dekat Church. Item Forage tidak muncul di puncak Mother\'s Hill atau di hutan Church saat Spring/Summer.',
        en: 'Daily foraging locations: Southern forest near Gotts, area near Hot Spring and Goddess pond, path to Mother\'s Hill summit, south of the lake near Jennifer\'s tent, grassy area at Mother\'s Hill entrance, Secret Forest, Mineral Beach, forest near Church. Forage items do not appear at the top of Mother\'s Hill or the Church forest in Spring/Summer.',
      },
    },
    {
      heading: { id: 'Item Foraging Musim Spring', en: 'Spring Foraging Items' },
      body: {
        id: 'Moondrop Flower (10 G) – jalur Mother\'s Hill, Secret Forest, hutan selatan. Toy Flower (10 G) – jalur Mother\'s Hill, Secret Forest. Branch (1 G) – Mineral Beach, jalur Mother\'s Hill, hutan selatan. Bamboo Shoot (50 G) – area selatan danau dekat Jennifer. Blue Grass (30 G) – jalur Mother\'s Hill, Hot Spring, Secret Forest, hutan selatan. Yellow Grass (40 G) – Mineral Beach. Orange Grass (30 G) – Mineral Beach.',
        en: 'Moondrop Flower (10 G) – Mother\'s Hill path, Secret Forest, southern forest. Toy Flower (10 G) – Mother\'s Hill path, Secret Forest. Branch (1 G) – Mineral Beach, Mother\'s Hill path, southern forest. Bamboo Shoot (50 G) – south of the lake near Jennifer\'s tent. Blue Grass (30 G) – Mother\'s Hill path, Hot Spring, Secret Forest, southern forest. Yellow Grass (40 G) – Mineral Beach. Orange Grass (30 G) – Mineral Beach.',
      },
    },
    {
      heading: { id: 'Item Foraging Musim Summer', en: 'Summer Foraging Items' },
      body: {
        id: 'Pink Cat Flower (10 G) – jalur Mother\'s Hill, Hot Spring, Secret Forest. Branch (1 G) – Mineral Beach, jalur Mother\'s Hill, hutan selatan. Wild Grapes (30 G) – area selatan danau, jalur Mother\'s Hill, Secret Forest, hutan selatan. Blue Grass (30 G) – Hot Spring, hutan selatan. Green Grass (30 G) – area danau, jalur Mother\'s Hill, Hot Spring, Secret Forest. Red Grass (35 G) – area danau, Hot Spring, jalur Mother\'s Hill, Secret Forest, hutan selatan. Purple Grass (40 G) – Mineral Beach.',
        en: 'Pink Cat Flower (10 G) – Mother\'s Hill path, Hot Spring, Secret Forest. Branch (1 G) – Mineral Beach, Mother\'s Hill path, southern forest. Wild Grapes (30 G) – south of lake, Mother\'s Hill path, Secret Forest, southern forest. Blue Grass (30 G) – Hot Spring, southern forest. Green Grass (30 G) – lake area, Mother\'s Hill path, Hot Spring, Secret Forest. Red Grass (35 G) – lake area, Hot Spring, Mother\'s Hill path, Secret Forest, southern forest. Purple Grass (40 G) – Mineral Beach.',
      },
    },
    {
      heading: { id: 'Item Foraging Musim Autumn', en: 'Autumn Foraging Items' },
      body: {
        id: 'Blue Magic Red Flower (10 G) – jalur Mother\'s Hill, Secret Forest, hutan selatan. Sunsweet Flower (10 G) – Secret Forest. Branch (1 G) – Mineral Beach, jalur Mother\'s Hill, hutan selatan. Orange (30 G) – Secret Forest. Chestnut (50 G) – jalur Mother\'s Hill. Mushroom (50 G) – hutan Church, jalur Mother\'s Hill, Secret Forest, hutan selatan. Poison Mushroom (50 G) – lokasi sama dengan Mushroom. Matsutake (500 G) – area selatan danau (hancurkan batuan besar dengan Gold Hammer), hutan Church. Green Grass (30 G) – area danau, Hot Spring. Red Grass (35 G) – banyak lokasi. Indigo Grass (30 G) – Mineral Beach.',
        en: 'Blue Magic Red Flower (10 G) – Mother\'s Hill path, Secret Forest, southern forest. Sunsweet Flower (10 G) – Secret Forest. Branch (1 G) – Mineral Beach, Mother\'s Hill path, southern forest. Orange (30 G) – Secret Forest. Chestnut (50 G) – Mother\'s Hill path. Mushroom (50 G) – Church forest, Mother\'s Hill path, Secret Forest, southern forest. Poison Mushroom (50 G) – same as Mushroom. Matsutake (500 G) – south of lake (break large rock with Gold Hammer), Church forest. Green Grass (30 G) – lake area, Hot Spring. Red Grass (35 G) – multiple locations. Indigo Grass (30 G) – Mineral Beach.',
      },
    },
    {
      heading: { id: 'Item Foraging Musim Winter', en: 'Winter Foraging Items' },
      body: {
        id: 'Branch (1 G) – hutan selatan. Orange (30 G) – hutan selatan. White Grass (150 G) – hutan dekat Church, hutan selatan. CATATAN: White Grass tersembunyi di balik pepohonan dekat jalur rumah Gotts ke Mother\'s Hill. White Grass bisa diberikan sebagai hadiah ke Harvest Goddess.',
        en: 'Branch (1 G) – southern forest. Orange (30 G) – southern forest. White Grass (150 G) – forest near Church, southern forest. NOTE: White Grass hides behind trees near the path from Gotts\'s house toward Mother\'s Hill. White Grass can be given as a gift to the Harvest Goddess.',
      },
    },
    {
      heading: { id: 'Blue Grass & Green Grass Penting', en: 'Important: Blue Grass & Green Grass' },
      body: {
        id: 'Item Forage paling penting untuk dikumpulkan setiap hari adalah Blue Grass dan Green Grass. Setelah berhasil menjual minimal 50 masing-masing, anda bisa membeli Stamina Booster XL dan Super Caffeine di Mineral Clinic. Black Grass tidak ditemukan di alam liar — hanya bisa diperoleh saat menggali petak di tambang dengan Hoe.',
        en: 'The most important forage items to collect daily are Blue Grass and Green Grass. After selling at least 50 of each, you can buy Stamina Booster XL and Super Caffeine at the Mineral Clinic. Black Grass is not found in the wild — it can only be obtained by digging tiles in the mine with a Hoe.',
      },
    },
  ],
};

export default foraging;

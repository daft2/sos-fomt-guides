import type { Guide } from './types';

const mining: Guide = {
  id: 'mining',
  title: {
    id: 'Panduan Menambang di Spring & Lake Mine – SoS FoMT',
    en: 'Mining Guide: Spring & Lake Mine – SoS FoMT',
  },
  category: 'mining',
  sections: [
    {
      heading: { id: 'Dua Jenis Tambang', en: 'Two Types of Mines' },
      body: {
        id: 'Ada dua tambang: Spring Mine (dekat kolam Harvest Goddess, bisa diakses semua musim kecuali Winter) dan Lake Mine (di tengah danau Mother\'s Hill, hanya bisa diakses musim Winter saat danau membeku, atau kapan saja dengan Travel Stone). Masing-masing tambang memiliki 255 lantai. Spring Mine: material untuk upgrade Tool. Lake Mine: batuan permata berharga yang bisa dijual mahal.',
        en: 'There are two mines: Spring Mine (near the Harvest Goddess pond, accessible all seasons except Winter) and Lake Mine (in the center of Mother\'s Hill lake, only accessible in Winter when the lake freezes, or anytime with a Travel Stone). Each mine has 255 floors. Spring Mine yields tool upgrade materials. Lake Mine yields valuable gemstones.',
      },
    },
    {
      heading: { id: 'Trik Menambang', en: 'Mining Tricks' },
      body: {
        id: 'Gunakan trik Save & Load untuk efisiensi: save saat masuk lantai baru, gali semua petak dan catat mana yang menghasilkan tangga/item berharga, load dan gali hanya petak tersebut. Tangga tidak muncul di sekitar tangga tempat turun, jadi tidak perlu mencari di area itu. Tangga bisa tersembunyi di bawah bebatuan — hancurkan dulu, lalu gali dengan Hoe.',
        en: 'Use the Save & Load trick for efficiency: save upon entering a new floor, dig all tiles and note which ones have stairs or valuable items, then load and only dig those tiles. Stairs never appear near the stairs you came down from, so skip that area. Stairs can also hide under rocks — break the rock, then dig with the Hoe.',
      },
    },
    {
      heading: { id: 'Lubang Malapetaka', en: 'Pitfall Holes' },
      body: {
        id: 'Lubang tersembunyi di tanah yang bisa digali (tidak di bawah batu). Jika jatuh: -20 STA (1 lantai), -30 (2), -40 (3), -60 (4), -70 (5 lantai). Lubang muncul di sekitar tangga dan pinggir dinding. Di Spring Mine: lantai 20–93, 101–193, 200–248. Di Lake Mine: lantai 10–68 (kecuali lantai digit akhir 9), 80–90, 130–140, 150–160, 170–180, 200, 240–248. Bawa makanan pemulihan stamina sebagai persediaan.',
        en: 'Holes are hidden in tillable soil (not under rocks). Falling costs: -20 STA (1 floor), -30 (2), -40 (3), -60 (4), -70 (5 floors). Holes appear near stairs and along walls. In Spring Mine: floors 20–93, 101–193, 200–248. In Lake Mine: floors 10–68 (except floors ending in 9), 80–90, 130–140, 150–160, 170–180, 200, 240–248. Bring stamina-recovery food as a precaution.',
      },
    },
    {
      heading: { id: 'Elevator', en: 'Elevator' },
      body: {
        id: 'Elevator tersedia setelah memberikan minimal 100 item ke Harvest Goddess. Masuk ke dalam Mine lalu keluar lagi untuk memicu dialog event Elevator. Elevator berhenti di lantai: 0, 50, 100, 150, 200, 225. Opsi lantai hanya tersedia setelah anda mencapai lantai tersebut menggunakan tangga terlebih dulu.',
        en: 'The Elevator becomes available after giving the Harvest Goddess at least 100 items. Enter the Mine and then exit to trigger the Elevator dialogue event. The Elevator stops at floors: 0, 50, 100, 150, 200, 225. Each floor option is only available after you reach it via stairs first.',
      },
    },
    {
      heading: { id: 'Material Spring Mine', en: 'Spring Mine Materials' },
      body: {
        id: 'Material yang bisa diperoleh di Spring Mine: Scrap Ore (1 G, semua lantai). Copper (15 G, semua lantai). Silver (20 G, lantai 3–255). Gold (25 G, lantai 6–255). Mithril (40 G, lantai 9–255). Orichalcum (50 G, lantai 10–255). Adamantite (50 G, lantai 10–255). Mythic Ore (20,000 G, lantai 60, 102, 123, 152, 155, 171, 190, 202, 222, 231–255) — hanya muncul setelah semua Cursed Tool diubah ke Blessed.',
        en: 'Materials found in Spring Mine: Scrap Ore (1 G, all floors). Copper (15 G, all floors). Silver (20 G, floors 3–255). Gold (25 G, floors 6–255). Mithril (40 G, floors 9–255). Orichalcum (50 G, floors 10–255). Adamantite (50 G, floors 10–255). Mythic Ore (20,000 G, floors 60, 102, 123, 152, 155, 171, 190, 202, 222, 231–255) — only appears after all Cursed Tools are converted to Blessed.',
      },
    },
    {
      heading: { id: 'Harta Karun Spring Mine', en: 'Spring Mine Treasures' },
      body: {
        id: 'Power Berry: lantai 100, gali semua petak. Goddess Jewel (9 buah): lantai 60, 102, 123, 152, 155, 171, 190, 202, 222. Harvest Sprite Statue: lantai 160–189. Goddess Statue: lantai 220–249. Tomatosetta Stone: lantai 255 (gali dengan Hoe) — berisi resep Ketchup, bisa dijual ke Huang (58,000–70,000 G). Travel Stone: lantai 255 (pecahkan batu dengan Hammer, tersedia mulai tahun ke-3).',
        en: 'Power Berry: floor 100, dig all tiles. Goddess Jewels (9 total): floors 60, 102, 123, 152, 155, 171, 190, 202, 222. Harvest Sprite Statue: floors 160–189. Goddess Statue: floors 220–249. Tomatosetta Stone: floor 255 (dig with Hoe) — teaches Ketchup recipe, can be sold to Huang (58,000–70,000 G). Travel Stone: floor 255 (break rock with Hammer, available from Year 3 onward).',
      },
    },
    {
      heading: { id: 'Permata Lake Mine', en: 'Lake Mine Gemstones' },
      body: {
        id: 'Permata di Lake Mine: Turquoise (50 G), Moonstone (55 G, lantai digit akhir 8), Sandrose (60 G, lantai digit akhir 9), Aquamarine (60 G), Amethyst (60 G), Jade (62 G), Agate (62 G), Fluorite (65 G), Peridot (68 G), Topaz (70 G), Garnet (75 G), Sapphire (75 G), Ruby (75 G), Emerald (80 G, lantai digit akhir 5), Diamond (100 G, lantai 10/20/30/70/90/110/130/170/190/201–255), Pink Diamond (10,000 G, lantai tertentu), Alexandrite (10,000 G, lantai 50/100/150/200/210–255). Alexandrite berubah merah di dalam dan hijau di luar.',
        en: 'Gemstones in Lake Mine: Turquoise (50 G), Moonstone (55 G, floors ending in 8), Sandrose (60 G, floors ending in 9), Aquamarine (60 G), Amethyst (60 G), Jade (62 G), Agate (62 G), Fluorite (65 G), Peridot (68 G), Topaz (70 G), Garnet (75 G), Sapphire (75 G), Ruby (75 G), Emerald (80 G, floors ending in 5), Diamond (100 G, floors 10/20/30/70/90/110/130/170/190/201–255), Pink Diamond (10,000 G, select floors), Alexandrite (10,000 G, floors 50/100/150/200/210–255). Alexandrite appears red indoors and green outdoors.',
      },
    },
    {
      heading: { id: 'Harta Karun Lake Mine', en: 'Lake Mine Treasures' },
      body: {
        id: 'Power Berry: lantai 19, gali semua petak. Kolam ikan tersembunyi: lantai 9 — bisa memancing ikan legendaris Coelacanth dengan Cursed/Blessed/Mythic Fishing Rod. Kappa Jewel (9 buah): lantai 40, 60, 80, 120, 140, 160, 180, dan 255. Kappa Statue: lantai 101–120.',
        en: 'Power Berry: floor 19, dig all tiles. Hidden fishing pond: floor 9 — you can fish for the legendary Coelacanth with a Cursed/Blessed/Mythic Fishing Rod. Kappa Jewels (9 total): floors 40, 60, 80, 120, 140, 160, 180, and 255. Kappa Statue: floors 101–120.',
      },
    },
  ],
};

export default mining;

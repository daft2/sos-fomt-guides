import type { Guide } from './types';

const fishing: Guide = {
  id: 'fishing',
  title: {
    id: 'Panduan Memancing & Ikan Legendaris – SoS FoMT',
    en: 'Fishing & Legendary Fish Guide – SoS FoMT',
  },
  category: 'fishing',
  sections: [
    {
      heading: { id: 'Mendapatkan Fishing Rod', en: 'Getting the Fishing Rod' },
      body: {
        id: 'Kunjungi rumah Zack di tepi pantai. Jadwal Zack di rumah: 06:00–07:00 AM, 11:00 AM–04:30 PM, 08:10–10:00 PM, 10:00 AM–12:00 PM (Sunday). Pastikan ada slot kosong untuk Tool dan anda pernah berbicara dengan Zack sebelumnya. Zack akan memberikan Cheap Fishing Rod lewat cutscene.',
        en: 'Visit Zack\'s house by the beach. Zack\'s home schedule: 06:00–07:00 AM, 11:00 AM–04:30 PM, 08:10–10:00 PM, 10:00 AM–12:00 PM (Sunday). Make sure you have an empty tool slot and have spoken to Zack at least once before. Zack will give you the Cheap Fishing Rod via a cutscene.',
      },
    },
    {
      heading: { id: 'Upgrade Fishing Rod', en: 'Fishing Rod Upgrades' },
      body: {
        id: 'Upgrade di Forge (Saibara): Copper Fishing Rod = 1 Copper Ore + 1,000 G + 10% EXP (1 hari). Silver Fishing Rod = 1 Silver Ore + 2,000 G + 30% EXP (2 hari). Golden Fishing Rod = 1 Gold Ore + 3,000 G + 55% EXP (3 hari). Mithril Fishing Rod = 1 Mithril Ore + 5,000 G + 100% EXP (4 hari). Cursed Fishing Rod = lantai 29 Lake Mine (butuh semua Tool Mithril). Blessed Fishing Rod = gunakan Cursed 50 kali. Mythic Fishing Rod = 1 Mythic Ore + 50,000 G (7 hari, butuh semua Tool Blessed). Semakin tinggi level, semakin besar peluang mendapat ikan lebih besar.',
        en: 'Upgrade at the Forge (Saibara): Copper Fishing Rod = 1 Copper Ore + 1,000 G + 10% EXP (1 day). Silver Fishing Rod = 1 Silver Ore + 2,000 G + 30% EXP (2 days). Golden Fishing Rod = 1 Gold Ore + 3,000 G + 55% EXP (3 days). Mithril Fishing Rod = 1 Mithril Ore + 5,000 G + 100% EXP (4 days). Cursed Fishing Rod = Lake Mine floor 29 (requires all tools at Mithril). Blessed Fishing Rod = use Cursed 50 times. Mythic Fishing Rod = 1 Mythic Ore + 50,000 G (7 days, requires all tools at Blessed). Higher level rods give better chances of larger fish.',
      },
    },
    {
      heading: { id: 'Kategori & Harga Ikan', en: 'Fish Categories & Prices' },
      body: {
        id: 'Ikan dibagi tiga kategori: Small Fish (< 24 cm): 50 G (Normal) / 60 G (Simple). Medium Fish (25–49 cm): 120 G (Normal) / 144 G (Simple). Large Fish (50 cm+): 200 G (Normal) / 240 G (Simple). Ada 8 lokasi memancing: Laut Mineral Beach, Danau atas gunung, Kolam Secret Forest, Kolam air terjun, Sungai atas gunung dekat jembatan, Hot Spring, Sungai di bawah Farm, Kolam Lake Mine lantai 9.',
        en: 'Fish are divided into three categories: Small Fish (< 24 cm): 50 G (Normal) / 60 G (Simple). Medium Fish (25–49 cm): 120 G (Normal) / 144 G (Simple). Large Fish (50 cm+): 200 G (Normal) / 240 G (Simple). There are 8 fishing locations: Mineral Beach ocean, Mountain lake, Secret Forest pond, Waterfall pond, Mountain river near the bridge, Hot Spring, River below the Farm, Lake Mine floor 9 pond.',
      },
    },
    {
      heading: { id: 'Ikan Legendaris (Guardian Fish)', en: 'Legendary Fish (Guardian Fish)' },
      body: {
        id: 'Ada 7 ikan legendaris, hanya bisa dipancing dengan Cursed/Blessed/Mythic Rod. Setelah ditangkap, ikan dilepas kembali (tidak bisa disimpan atau dijual). Huchen: Spring/Summer/Autumn, sungai di bawah Farm, syarat: tahu resep Baked Fish + Sashimi + Sushi. Anglerfish: Spring atau Winter, laut, syarat: pancing antara 10:00 PM – 08:00 AM. Hot Spring Catfish: Winter, Hot Spring, tanpa syarat. Carp: Spring/Summer/Autumn, danau atas gunung, syarat: jual minimal 200 ikan. Coelacanth: semua musim, kolam Lake Mine lantai 9, syarat: tangkap 5 ikan legendaris lainnya. Squid: Spring & Winter, laut, syarat: pancing antara 09:00 AM – 12:00 AM. Arapaima Gigas: Summer, kolam Secret Forest, syarat: pancing minimal 50 jenis ikan.',
        en: 'There are 7 legendary fish, catchable only with Cursed/Blessed/Mythic Rods. After catching, the fish is released (cannot be kept or sold). Huchen: Spring/Summer/Autumn, river below Farm, requires: know recipes for Baked Fish + Sashimi + Sushi. Anglerfish: Spring or Winter, ocean, requires: fish between 10:00 PM – 08:00 AM. Hot Spring Catfish: Winter, Hot Spring, no requirements. Carp: Spring/Summer/Autumn, mountain lake, requires: sell at least 200 fish. Coelacanth: all seasons, Lake Mine floor 9 pond, requires: catch 5 other legendary fish. Squid: Spring & Winter, ocean, requires: fish between 09:00 AM – 12:00 AM. Arapaima Gigas: Summer, Secret Forest pond, requires: catch at least 50 species of fish.',
      },
    },
    {
      heading: { id: 'Harta Karun Saat Memancing', en: 'Fishing Treasures' },
      body: {
        id: 'Item spesial hanya bisa ditemukan dengan Mithril Fishing Rod atau lebih tinggi: Letter in a Bottle (musim Spring) — berisi resep French Fries, bisa dijual ke Huang (60,000–67,000 G). Pirate Treasure (musim Summer) — bisa diperoleh berkali-kali, dijual melalui Shipping Bin (10,000 G) atau Huang (9,000–16,000 G), dibutuhkan sebagai bahan resep Summer Sun. Ancient Fossil (musim Autumn) — bisa diperoleh berkali-kali, Shipping Bin (5,000 G) atau Huang (4,800–5,700 G), bahan resep Summer Sun. Power Berry (musim Winter) — salah satu dari 10 Power Berry tersembunyi.',
        en: 'Special items can only be found with a Mithril Fishing Rod or better: Letter in a Bottle (Spring) — contains French Fries recipe, can be sold to Huang (60,000–67,000 G). Pirate Treasure (Summer) — can be found multiple times, sell via Shipping Bin (10,000 G) or to Huang (9,000–16,000 G), needed for Summer Sun recipe. Ancient Fossil (Autumn) — can be found multiple times, Shipping Bin (5,000 G) or Huang (4,800–5,700 G), needed for Summer Sun recipe. Power Berry (Winter) — one of the 10 hidden Power Berries.',
      },
    },
  ],
};

export default fishing;

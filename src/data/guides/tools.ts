import type { Guide } from './types';

const tools: Guide = {
  id: 'tools',
  title: {
    id: 'Panduan Upgrade Tool – SoS FoMT',
    en: 'Tool Upgrade Guide – SoS FoMT',
  },
  category: 'farming',
  sections: [
    {
      heading: { id: 'Tool Dasar', en: 'Starting Tools' },
      body: {
        id: 'Di awal permainan anda mendapatkan: Iron Hammer, Iron Hoe, Iron Sickle, Iron Axe, dan Iron Watering Can (level 1). Cheap Fishing Rod bisa diperoleh dari Zack. Tool bisa disimpan di Tool Box di rumah. Slot inventory Tool terpisah dari item biasa.',
        en: 'At the start you receive: Iron Hammer, Iron Hoe, Iron Sickle, Iron Axe, and Iron Watering Can (level 1). The Cheap Fishing Rod can be obtained from Zack. Tools can be stored in the Tool Box at your house. The tool inventory slot is separate from regular items.',
      },
    },
    {
      heading: { id: 'Upgrade di Forge', en: 'Upgrading at the Forge' },
      body: {
        id: 'Upgrade Tool melalui Saibara di Forge (buka Friday–Wednesday, 10:00 AM – 04:00 PM, tutup Thursday). Level upgrade dan biaya: Copper (L2) = 1,000 G + EXP min 10%. Silver (L3) = 2,000 G + EXP min 28%. Gold (L4) = 3,000 G + EXP min 55%. Mithril (L5) = 5,000 G + EXP 100%. Proses upgrade memakan waktu 1 hari per kenaikan level. Jika EXP sudah melebihi level berikutnya, anda bisa skip langsung.',
        en: 'Upgrade tools through Saibara at the Forge (open Friday–Wednesday, 10:00 AM – 04:00 PM, closed Thursday). Upgrade levels and costs: Copper (L2) = 1,000 G + 10% EXP min. Silver (L3) = 2,000 G + 28% EXP min. Gold (L4) = 3,000 G + 55% EXP min. Mithril (L5) = 5,000 G + 100% EXP. Upgrade takes 1 day per level. If your EXP already exceeds the next required level, you can skip directly.',
      },
    },
    {
      heading: { id: 'Persiapan Upgrade', en: 'Upgrade Requirements' },
      body: {
        id: 'Ada dua syarat upgrade: (1) Tool EXP — gunakan Tool secara rutin untuk mendapatkan EXP. Lihat level dan EXP di Main Menu > Tool. Menggunakan Hammer untuk memecahkan batu = 100 EXP; mengayunkan saja = 50 EXP. (2) Ore — bawa Ore dari Spring Mine: Copper, Silver, Gold, Mithril dari berbagai kedalaman. Semakin dalam, semakin langka Ore yang ditemukan.',
        en: 'Two upgrade requirements: (1) Tool EXP — use the tool regularly to earn EXP. View level and EXP in Main Menu > Tool. Using the Hammer to break rocks = 100 EXP; just swinging = 50 EXP. (2) Ore — bring Ore from Spring Mine: Copper, Silver, Gold, Mithril at various depths. The deeper you go, the rarer the Ore.',
      },
    },
    {
      heading: { id: 'Cursed Tool', en: 'Cursed Tools' },
      body: {
        id: 'Cursed Tool ditemukan di Lake Mine (hanya bisa diakses saat Winter) setelah semua Tool di-upgrade ke Mithril. Jauh lebih kuat tapi menguras lebih banyak stamina. Cursed Tool tidak bisa dilepas dari inventory hingga dikutuk-cekal. Lokasi di Lake Mine: Lantai 29=Cursed Fishing Rod, 39=Cursed Hoe, 49=Cursed Axe, 59=Cursed Hammer, 69=Cursed Watering Can, 79=Cursed Sickle. Gunakan trik Save & Load saat masuk lantai tersebut.',
        en: 'Cursed Tools are found in the Lake Mine (only accessible in Winter) after all tools are upgraded to Mithril. Much more powerful but drains more stamina. Cursed Tools cannot be removed from inventory until the curse is lifted. Lake Mine floors: 29=Cursed Fishing Rod, 39=Cursed Hoe, 49=Cursed Axe, 59=Cursed Hammer, 69=Cursed Watering Can, 79=Cursed Sickle. Use the Save & Load trick when entering those floors.',
      },
    },
    {
      heading: { id: 'Blessed Tool', en: 'Blessed Tools' },
      body: {
        id: 'Lepaskan kutukan dengan cara Blessing: Cursed Fishing Rod = pakai 50 kali (tidak perlu benar-benar memancing). Cursed Hoe = Blessing oleh Carter di Church sebanyak 5 kali (buka Monday & Wednesday atau hari hujan/salju, 01:00–04:00 PM). Cursed Axe = pakai 50 kali. Cursed Hammer = pasang di inventory equip selama 5 hari berturut-turut. Cursed Watering Can = Blessing oleh Carter 5 kali. Cursed Sickle = pasang di inventory equip selama 5 hari.',
        en: 'Remove curses via Blessing: Cursed Fishing Rod = use 50 times (no need to actually fish). Cursed Hoe = blessed by Carter at Church 5 times (open Monday & Wednesday or rainy/snowy days, 01:00–04:00 PM). Cursed Axe = use 50 times. Cursed Hammer = equip in tool slot for 5 consecutive days. Cursed Watering Can = blessed by Carter 5 times. Cursed Sickle = equip in tool slot for 5 consecutive days.',
      },
    },
    {
      heading: { id: 'Mythic Tool', en: 'Mythic Tools' },
      body: {
        id: 'Mythic Tool adalah Tool terbaik di SoS FoMT. Syarat: semua Tool sudah Blessed. Kumpulkan Mythic Ore di Spring Mine lantai 60, 102, 123, 152, 155, 171, 190, 202, 222. Biaya upgrade: 50,000 G per Tool, waktu pengerjaan 7 hari. Mythic Ore hanya muncul setelah semua Cursed Tool diubah menjadi Blessed Tool.',
        en: 'Mythic Tools are the best tools in SoS FoMT. Requirements: all tools must be Blessed. Collect Mythic Ore from Spring Mine floors 60, 102, 123, 152, 155, 171, 190, 202, 222. Upgrade cost: 50,000 G per tool, takes 7 days. Mythic Ore only appears after all Cursed Tools are converted to Blessed Tools.',
      },
    },
  ],
};

export default tools;

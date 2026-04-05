import type { Guide } from './types';

const animals: Guide = {
  id: 'animals',
  title: {
    id: 'Panduan Hewan Peliharaan & Hewan Ternak – SoS FoMT',
    en: 'Pets & Livestock Guide – SoS FoMT',
  },
  category: 'animals',
  sections: [
    {
      heading: { id: 'Hewan Peliharaan (Pet)', en: 'Pets' },
      body: {
        id: 'Untuk memiliki hewan peliharaan, undang Van ke Mineral Town dengan memberikan hadiah ke Harvest Goddess selama 30 hari. Van membuka toko hewan di Rose Plaza setiap tanggal 15 musim (12:00 PM – 06:00 PM, tutup saat cuaca buruk atau Festival). Anda bisa memiliki maksimal 5 hewan peliharaan. Tersedia: Spring=Kucing (Shorthair, Bengal, Calico, 20,000 G). Summer=Penguin (Blue, Navy, 30,000 G). Fall=Anjing (Mineral Dog, Black Shiba, Papillon, 10,000–20,000 G). Winter=Capybara (Capybara, White Capybara, 30,000 G).',
        en: 'To get pets, invite Van to Mineral Town by offering gifts to the Harvest Goddess for 30 days. Van opens a pet shop at Rose Plaza on the 15th of each season (12:00 PM – 06:00 PM, closed in bad weather or on Festival days). You can own up to 5 pets. Available: Spring=Cats (Shorthair, Bengal, Calico, 20,000 G). Summer=Penguins (Blue, Navy, 30,000 G). Fall=Dogs (Mineral Dog, Black Shiba, Papillon, 10,000–20,000 G). Winter=Capybaras (Capybara, White Capybara, 30,000 G).',
      },
    },
    {
      heading: { id: 'Merawat Hewan Peliharaan', en: 'Caring for Pets' },
      body: {
        id: 'Hewan peliharaan keluar otomatis saat cerah dan kembali pukul 08:00 PM. Tambah Affection dengan: Berbicara (+1/hari), Bersiul (+1/hari), Pet Treat dari Van\'s Pet Shop (1,000 G, +1/hari). Hewan peliharaan kedua bisa dibeli setelah hewan pertama memiliki minimal 8 hati.',
        en: 'Pets go outside automatically in sunny weather and return at 08:00 PM. Increase Affection by: Talking (+1/day), Whistling (+1/day), Pet Treats from Van\'s Pet Shop (1,000 G, +1/day). A second pet can be purchased only after your first pet has at least 8 hearts.',
      },
    },
    {
      heading: { id: 'Melatih Hewan Peliharaan – Frisbee', en: 'Training Pets – Frisbee' },
      body: {
        id: 'Bermain Frisbee hanya untuk hewan dewasa (sekitar 60 hari). Beli Pet Frisbee dari Huang (5,000 G, musim Fall). Pergi ke Mineral Beach, cek papan di sebelah kursi duduk. Frisbee hanya bisa dimainkan selain musim Winter. Hati menentukan frekuensi: 0=tidak bisa, 1-2=1x/hari, 3-4=2x/hari, 5-7=3x/hari, 8-9=4x/hari, 10=5x/hari. Jika Frisbee terlempar >30 meter, hewan bisa menggali item tersembunyi seperti Agate atau Gold Ore.',
        en: 'Frisbee is only available for adult pets (around 60 days old). Buy a Pet Frisbee from Huang (5,000 G, Fall season). Go to Mineral Beach and check the board next to the seat. Frisbee can only be played outside of Winter. Hearts determine frequency: 0=cannot play, 1-2=1x/day, 3-4=2x/day, 5-7=3x/day, 8-9=4x/day, 10=5x/day. If the Frisbee travels more than 30 meters, the pet may dig up hidden items like Agate or Gold Ore.',
      },
    },
    {
      heading: { id: 'Chicken & Angora Rabbit', en: 'Chicken & Angora Rabbit' },
      body: {
        id: 'Dibeli di PoPoultry (buka 11:00 AM – 04:00 PM, tutup Sunday): White Chicken (1,500 G), Brown Chicken (1,500 G), Angora Rabbit (3,000 G). Kandang awal muat 4 hewan. Upgrade kandang butuh 350 Lumber + 200 Stone + 5,000 G. Chicken menghasilkan telur tiap hari jika diberi makan. Angora Rabbit menghasilkan Fur tiap 5 hari dan bisa dicukur dengan Clipper. Tidak bisa mati karena usia atau sakit. Tambah hati dengan: bicara, beri makan langsung, habiskan 5 jam di luar kandang, sikat (khusus Rabbit).',
        en: 'Purchased at PoPoultry (open 11:00 AM – 04:00 PM, closed Sunday): White Chicken (1,500 G), Brown Chicken (1,500 G), Angora Rabbit (3,000 G). Initial coop holds 4 animals. Upgrade coop requires 350 Lumber + 200 Stone + 5,000 G. Chickens produce eggs daily when fed. Angora Rabbits produce Fur every 5 days and can be sheared with a Clipper. Cannot die from age or illness. Raise hearts by: talking, hand-feeding, spending 5+ hours outside, and brushing (Rabbits only).',
      },
    },
    {
      heading: { id: 'Hasil Produksi Chicken & Rabbit', en: 'Chicken & Rabbit Production' },
      body: {
        id: 'Chicken: Normal Egg (0-3 hati, 50 G) → Mayonnaise S (100 G). Good Egg (4-7 hati, 80 G) → Mayonnaise M (150 G). Excellent Egg (8-10 hati, 150 G) → Mayonnaise L (230 G). Golden Egg (menang festival, 200 G) → Mayonnaise G (230 G). Platinum Egg (1,000 jam di luar, 240 G) → Mayonnaise P (450 G). X Egg (240 G) → Mayonnaise X (800 G). Angora Rabbit: Fur S (0-3 hati, 240 G) → Yarn S (530 G). Fur M (4-7 hati, 400 G) → Yarn M (920 G). Fur L (8-10 hati, 720 G) → Yarn L (1,400 G). Fur G (festival, 1,000 G) → Yarn G (2,000 G). Fur P (1,500 G) → Yarn P (2,800 G). Fur X (1,800 G) → Yarn X (3,200 G).',
        en: 'Chicken: Normal Egg (0-3 hearts, 50 G) → Mayonnaise S (100 G). Good Egg (4-7 hearts, 80 G) → Mayonnaise M (150 G). Excellent Egg (8-10 hearts, 150 G) → Mayonnaise L (230 G). Golden Egg (win festival, 200 G) → Mayonnaise G (230 G). Platinum Egg (1,000 hrs outside, 240 G) → Mayonnaise P (450 G). X Egg (240 G) → Mayonnaise X (800 G). Angora Rabbit: Fur S (0-3 hearts, 240 G) → Yarn S (530 G). Fur M (4-7 hearts, 400 G) → Yarn M (920 G). Fur L (8-10 hearts, 720 G) → Yarn L (1,400 G). Fur G (festival, 1,000 G) → Yarn G (2,000 G). Fur P (1,500 G) → Yarn P (2,800 G). Fur X (1,800 G) → Yarn X (3,200 G).',
      },
    },
    {
      heading: { id: 'Cow, Sheep & Alpaca', en: 'Cow, Sheep & Alpaca' },
      body: {
        id: 'Dibeli di Yodel Ranch (buka 10:00 AM – 03:00 PM, tutup Monday): Normal Cow (5,000 G), Coffee/Strawberry/Fruit Cow (10,000 G), Sheep (4,000 G), Alpaca (4,000 G). Kandang awal muat 8 hewan, upgrade ke 16 dengan 400 Lumber + 250 Stone + 6,800 G. Cow dewasa menghasilkan Milk tiap hari jika diberi makan atau merumput. Sheep/Alpaca menghasilkan Wool/Fleece tiap 7 hari. Gunakan Milker (2,000 G dari Saibara) untuk memerah susu dan Clipper (1,800 G) untuk mencukur bulu.',
        en: 'Purchased at Yodel Ranch (open 10:00 AM – 03:00 PM, closed Monday): Normal Cow (5,000 G), Coffee/Strawberry/Fruit Cow (10,000 G), Sheep (4,000 G), Alpaca (4,000 G). Initial barn holds 8 animals, upgrade to 16 with 400 Lumber + 250 Stone + 6,800 G. An adult Cow produces Milk daily when fed or grazing. Sheep/Alpaca produce Wool/Fleece every 7 days. Use a Milker (2,000 G from Saibara) to collect milk and a Clipper (1,800 G) to shear wool.',
      },
    },
    {
      heading: { id: 'Hasil Produksi Cow, Sheep & Alpaca', en: 'Cow, Sheep & Alpaca Production' },
      body: {
        id: 'Normal Cow Milk: S (0-3 hati, 100 G) → Cheese S (250 G). M (4-7 hati, 220 G) → Cheese M (380 G). L (8-10 hati, 360 G) → Cheese L (540 G). G (festival, 500 G) → Cheese G (700 G). P (600 G) → Cheese P (820 G). X (800 G) → Cheese X (1,500 G). Butter dari Normal Milk (150 G). Sheep Wool: S (400 G) → Yarn S (530 G). M (700 G) → Yarn M (920 G). L (1,300 G) → Yarn L (1,400 G). G (2,500 G) → Yarn G (2,000 G). P (3,200 G) → Yarn P (2,800 G). X (3,600 G) → Yarn X (3,200 G). Alpaca Fleece: nilai jual sama dengan Sheep Wool.',
        en: 'Normal Cow Milk: S (0-3 hearts, 100 G) → Cheese S (250 G). M (4-7 hearts, 220 G) → Cheese M (380 G). L (8-10 hearts, 360 G) → Cheese L (540 G). G (festival, 500 G) → Cheese G (700 G). P (600 G) → Cheese P (820 G). X (800 G) → Cheese X (1,500 G). Butter from Normal Milk (150 G). Sheep Wool: S (400 G) → Yarn S (530 G). M (700 G) → Yarn M (920 G). L (1,300 G) → Yarn L (1,400 G). G (2,500 G) → Yarn G (2,000 G). P (3,200 G) → Yarn P (2,800 G). X (3,600 G) → Yarn X (3,200 G). Alpaca Fleece: same sell values as Sheep Wool.',
      },
    },
    {
      heading: { id: 'Breeding (Pembiakan)', en: 'Breeding' },
      body: {
        id: 'Breeding memungkinkan hewan ternak memiliki lebih dari 5 slot hati. Chicken: Letakkan telur di boks inkubasi → anak ayam menetas setelah 3 hari dengan +1 slot hati, dewasa setelah 7 hari. Angora Rabbit: Beli Rabbit Breeding di PoPoultry (2,000 G) → anak Rabbit dewasa setelah 10 hari jika diberi makan setiap hari. Cow: Beli Cow Breeding Kit dari Mugi (3,000 G) → bayi sapi lahir ~21 hari, dewasa 14+9 hari. Sheep/Alpaca: Pastikan bulu belum dicukur sebelum diberikan Breeding Kit → bayi dewasa setelah 14 hari.',
        en: 'Breeding allows livestock to exceed 5 heart slots. Chicken: Place an egg in the incubation box → chick hatches after 3 days with +1 heart slot, grows up after 7 days. Angora Rabbit: Buy Rabbit Breeding at PoPoultry (2,000 G) → baby grows up after 10 days if fed daily. Cow: Buy Cow Breeding Kit from Mugi (3,000 G) → calf born ~21 days, fully grown in 14+9 days. Sheep/Alpaca: Ensure wool is unshorn before using Breeding Kit → baby grows up after 14 days.',
      },
    },
  ],
};

export default animals;

import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import CategoryCard from "~/components/CategoryCard";

export default function ListsIndex() {
  const { t } = useI18n();

  const listSections = [
    {
      href: "/lists/seeds",
      title: "Seeds",
      titleId: "Bibit (Seeds)",
      subtitle: "All crops by season with prices and grow times",
      subtitleId: "Semua bibit per musim dengan harga dan waktu tumbuh",
      count: 22,
    },
    {
      href: "/lists/shops",
      title: "Shops",
      titleId: "Toko",
      subtitle: "Shop hours, owners, and item lists",
      subtitleId: "Jam buka toko, pemilik, dan daftar item",
      count: 10,
    },
    {
      href: "/lists/npc-gifts",
      title: "NPC Gifts",
      titleId: "Hadiah NPC",
      subtitle: "Favorite gifts for every NPC",
      subtitleId: "Hadiah favorit setiap NPC",
      count: 40,
    },
    {
      href: "/lists/rings",
      title: "Rings",
      titleId: "Cincin",
      subtitle: "All 7 collectible rings and how to obtain them",
      subtitleId: "Semua 7 cincin koleksi dan cara mendapatkannya",
      count: 7,
    },
    {
      href: "/lists/locations",
      title: "Town Locations",
      titleId: "Lokasi Kota",
      subtitle: "All locations in Mineral Town",
      subtitleId: "Semua lokasi di Mineral Town",
      count: 23,
    },
    {
      href: "/lists/outfits",
      title: "Outfits",
      titleId: "Kostum",
      subtitle: "Costumes and how to unlock them",
      subtitleId: "Kostum dan cara membukanya",
      count: 18,
    },
  ];

  return (
    <Layout
      title={t("lists.title")}
      subtitle={t("lists.subtitle")}
      breadcrumb={
        <A href="/" class="text-sm text-accent hover:underline">
          ← {t("nav.home")}
        </A>
      }
    >
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listSections.map((section) => (
          <CategoryCard
            href={section.href}
            title={section.title}
            description={section.subtitle}
            count={section.count}
          />
        ))}
      </div>
    </Layout>
  );
}

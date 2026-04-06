import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";

export default function About() {
  const { t, lang } = useI18n();

  return (
    <Layout
      title={t("about.title")}
      breadcrumb={
        <A href="/" class="text-sm text-accent hover:underline">
          ← {t("nav.home")}
        </A>
      }
    >
      <div class="mx-auto max-w-2xl space-y-6">
        {/* App description */}
        <div class="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 class="mb-2 font-semibold text-slate-900 dark:text-slate-100">
            {lang() === "id" ? "Tentang Aplikasi Ini" : "About This App"}
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            {t("about.description")}
          </p>
          <ul class="mt-3 space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
            {lang() === "id" ? (
              <>
                <li>• Preferensi hadiah dan jadwal 16 karakter NPC</li>
                <li>• Data 44 tanaman untuk musim semi, panas, dan gugur</li>
                <li>• 120 resep masakan beserta bahan-bahannya</li>
                <li>• Jadwal festival tahunan dan lokasinya</li>
                <li>• Heart event dan momen cerita penting</li>
                <li>• Panduan dan tips bermain</li>
                <li>• Daftar item: tambang, ikan, hewan, dan lainnya</li>
                <li>• Sistem markah untuk menyimpan item favorit</li>
                <li>• Tersedia dalam Bahasa Indonesia dan Inggris</li>
              </>
            ) : (
              <>
                <li>• Gift preferences and schedules for 16 NPCs</li>
                <li>• 44 crops across spring, summer, and autumn seasons</li>
                <li>• 120 cooking recipes with ingredients</li>
                <li>• Annual festival schedule and locations</li>
                <li>• Heart events and key story moments</li>
                <li>• Gameplay guides and tips</li>
                <li>• Item lists: mine items, fish, animals, and more</li>
                <li>• Bookmark system to save your favorite items</li>
                <li>• Available in Indonesian and English</li>
              </>
            )}
          </ul>
        </div>

        {/* Game info */}
        <div class="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <h2 class="mb-2 font-semibold text-slate-900 dark:text-slate-100">
            Story of Seasons: Friends of Mineral Town
          </h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {lang() === "id"
              ? "Remake dari game Game Boy Advance klasik Harvest Moon: Friends of Mineral Town, dirilis tahun 2020 oleh Marvelous Inc. Bertani, beternak, membangun hubungan dengan penduduk desa, dan jelajahi pesona Mineral Town."
              : "A remake of the beloved Game Boy Advance classic Harvest Moon: Friends of Mineral Town, released in 2020 by Marvelous Inc. Grow crops, raise animals, build relationships, and explore the charming Mineral Town."}
          </p>
          <div class="mt-4 flex flex-wrap gap-3">
            <a
              href="https://www.marv.jp/special/story-of-seasons/fomt/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-400 dark:hover:border-accent dark:hover:text-accent transition-colors"
            >
              {lang() === "id" ? "Situs Resmi" : "Official Site"} ↗
            </a>
            <a
              href="https://store.steampowered.com/app/1175480/Story_of_Seasons_Friends_of_Mineral_Town/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-400 dark:hover:border-accent dark:hover:text-accent transition-colors"
            >
              Steam ↗
            </a>
          </div>
        </div>

        {/* Data source / credits */}
        <div class="rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
          <h2 class="mb-2 font-semibold text-amber-900 dark:text-amber-300">
            {lang() === "id" ? "Sumber Data" : "Data Sources & Credits"}
          </h2>
          <p class="text-sm text-amber-800 dark:text-amber-400">
            {lang() === "id"
              ? "Data dalam aplikasi ini dikumpulkan dari panduan komunitas, wiki penggemar, dan dokumen PDF yang disusun oleh komunitas pemain Story of Seasons: Friends of Mineral Town."
              : "Data in this app was collected from community guides, fan wikis, and a PDF document compiled by the Story of Seasons: Friends of Mineral Town player community."}
          </p>
          <ul class="mt-3 space-y-1 text-xs text-amber-700 dark:text-amber-500">
            <li>• {lang() === "id" ? "Panduan komunitas SoS:FoMT (PDF)" : "SoS:FoMT community guide (PDF)"}</li>
            <li>• {lang() === "id" ? "Wiki penggemar Harvest Moon / Story of Seasons" : "Harvest Moon / Story of Seasons fan wikis"}</li>
            <li>• {lang() === "id" ? "Pengujian langsung oleh pemain" : "In-game testing by players"}</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <p class="text-xs text-slate-400 dark:text-slate-600">
          {lang() === "id"
            ? "Aplikasi penggemar yang tidak berafiliasi dengan Marvelous Inc. atau XSEED Games. Story of Seasons adalah merek dagang dari Marvelous Inc."
            : "Fan-made app. Not affiliated with Marvelous Inc. or XSEED Games. Story of Seasons is a trademark of Marvelous Inc."}
        </p>
      </div>
    </Layout>
  );
}

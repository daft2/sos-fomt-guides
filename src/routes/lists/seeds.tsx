import { createSignal, createMemo, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import FilterTabs from "~/components/FilterTabs";
import Badge from "~/components/Badge";
import SearchBar from "~/components/SearchBar";
import { seeds } from "~/data/lists";
import type { CropSeason } from "~/data/lists/types";

type SeasonFilter = CropSeason | "all";

const SEASON_COLORS: Record<CropSeason, string> = {
  spring: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  summer: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  autumn: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
};

const SEASON_LABELS: Record<CropSeason, string> = {
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
};

export default function SeedsList() {
  const { t } = useI18n();
  const [season, setSeason] = createSignal<SeasonFilter>("all");
  const [query, setQuery] = createSignal("");

  const filtered = createMemo(() => {
    const s = season();
    const q = query().toLowerCase().trim();
    const base = s === "all" ? seeds : seeds.filter((c) => c.season === s);
    if (!q) return base;
    return base.filter((c) => c.name.toLowerCase().includes(q));
  });

  const tabs = [
    { value: "all" as SeasonFilter, label: t("common.all"), count: seeds.length },
    { value: "spring" as SeasonFilter, label: t("common.season.spring"), count: seeds.filter((s) => s.season === "spring").length },
    { value: "summer" as SeasonFilter, label: t("common.season.summer"), count: seeds.filter((s) => s.season === "summer").length },
    { value: "autumn" as SeasonFilter, label: t("common.season.fall"), count: seeds.filter((s) => s.season === "autumn").length },
  ];

  return (
    <Layout
      title="Seeds"
      subtitle="All seeds with grow times and prices"
      breadcrumb={
        <A href="/lists" class="text-sm text-sky-600 hover:underline dark:text-sky-400">
          ← {t("lists.title")}
        </A>
      }
    >
      <div class="space-y-4">
        <SearchBar value={query()} onInput={setQuery} placeholder={t("common.search")} />
        <FilterTabs tabs={tabs} active={season()} onChange={setSeason} />

        {/* Mobile: cards; Desktop: table */}
        <div class="hidden overflow-x-auto md:block">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200 text-left text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <th class="pb-2 pr-4 font-medium">Name</th>
                <th class="pb-2 pr-4 font-medium">Season</th>
                <th class="pb-2 pr-4 font-medium">Shop</th>
                <th class="pb-2 pr-4 font-medium text-right">Buy</th>
                <th class="pb-2 pr-4 font-medium text-right">Sell (Normal)</th>
                <th class="pb-2 pr-4 font-medium text-right">Sell (Simple)</th>
                <th class="pb-2 pr-4 font-medium text-right">Grow</th>
                <th class="pb-2 font-medium text-right">Regrow</th>
              </tr>
            </thead>
            <tbody>
              <For each={filtered()}>
                {(seed) => (
                  <tr class="border-b border-slate-100 dark:border-slate-800">
                    <td class="py-2 pr-4">
                      <span class="font-medium text-slate-900 dark:text-slate-100">{seed.name}</span>
                      <Show when={seed.isFlower}>
                        <Badge class="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">Flower</Badge>
                      </Show>
                    </td>
                    <td class="py-2 pr-4">
                      <Badge class={SEASON_COLORS[seed.season]}>{SEASON_LABELS[seed.season]}</Badge>
                    </td>
                    <td class="py-2 pr-4 text-slate-500 dark:text-slate-400">
                      {seed.buyShop === "general-store" ? "General Store" : "Huang's Store"}
                    </td>
                    <td class="py-2 pr-4 text-right text-slate-700 dark:text-slate-300">
                      {seed.buyPrice > 0 ? `${seed.buyPrice}G` : "—"}
                    </td>
                    <td class="py-2 pr-4 text-right text-slate-700 dark:text-slate-300">{seed.sellPriceNormal}G</td>
                    <td class="py-2 pr-4 text-right text-slate-700 dark:text-slate-300">{seed.sellPriceSimple}G</td>
                    <td class="py-2 pr-4 text-right text-slate-700 dark:text-slate-300">{seed.growDays}d</td>
                    <td class="py-2 text-right text-slate-700 dark:text-slate-300">
                      {seed.regrowDays ? `${seed.regrowDays}d` : "—"}
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div class="grid grid-cols-1 gap-3 md:hidden">
          <For each={filtered()}>
            {(seed) => (
              <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <div class="mb-2 flex items-center justify-between gap-2">
                  <span class="font-semibold text-slate-900 dark:text-slate-100">{seed.name}</span>
                  <Badge class={SEASON_COLORS[seed.season]}>{SEASON_LABELS[seed.season]}</Badge>
                </div>
                <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <span>Buy: {seed.buyPrice > 0 ? `${seed.buyPrice}G` : "—"}</span>
                  <span>Sell (N): {seed.sellPriceNormal}G</span>
                  <span>Sell (S): {seed.sellPriceSimple}G</span>
                  <span>Grow: {seed.growDays}d</span>
                  <span>Regrow: {seed.regrowDays ? `${seed.regrowDays}d` : "—"}</span>
                </div>
                <Show when={seed.unlockCondition}>
                  <p class="mt-2 rounded-lg bg-amber-50 px-2 py-1 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                    {seed.unlockCondition}
                  </p>
                </Show>
              </div>
            )}
          </For>
        </div>

        {filtered().length === 0 && (
          <p class="py-12 text-center text-slate-400 dark:text-slate-500">{t("common.notFound")}</p>
        )}
      </div>
    </Layout>
  );
}

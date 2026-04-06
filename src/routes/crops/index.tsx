import { createSignal, createMemo, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import FilterTabs from "~/components/FilterTabs";
import DataCard from "~/components/DataCard";
import Badge from "~/components/Badge";
import SearchBar from "~/components/SearchBar";
import { allCrops, cropsBySeason } from "~/data/crops";
import type { Season } from "~/data/crops/types";

type SeasonFilter = Season | "all";

const SEASON_COLORS: Record<Season, string> = {
  spring: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  summer: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  autumn: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
};

export default function CropsIndex() {
  const { t } = useI18n();
  const [season, setSeason] = createSignal<SeasonFilter>("all");
  const [query, setQuery] = createSignal("");

  const filtered = createMemo(() => {
    const s = season();
    const q = query().toLowerCase().trim();
    const base = s === "all" ? allCrops : cropsBySeason[s];
    if (!q) return base;
    return base.filter((c) => c.name.toLowerCase().includes(q));
  });

  const tabs = [
    { value: "all" as SeasonFilter, label: t("common.all"), count: allCrops.length },
    { value: "spring" as SeasonFilter, label: t("common.season.spring"), count: cropsBySeason.spring.length },
    { value: "summer" as SeasonFilter, label: t("common.season.summer"), count: cropsBySeason.summer.length },
    { value: "autumn" as SeasonFilter, label: t("common.season.fall"), count: cropsBySeason.autumn.length },
  ];

  return (
    <Layout
      title={t("crops.title")}
      subtitle={t("crops.subtitle")}
      breadcrumb={
        <A href="/" class="text-sm text-accent hover:underline">
          ← {t("nav.home")}
        </A>
      }
    >
      <div class="space-y-4">
        <SearchBar value={query()} onInput={setQuery} placeholder={t("common.search")} />
        <FilterTabs tabs={tabs} active={season()} onChange={setSeason} />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <For each={filtered()}>
            {(crop) => (
              <DataCard
                id={crop.id}
                category="crops"
                name={crop.name}
                href={`/crops/${crop.id}`}
                subtitle={`${t("crops.buyPrice")}: ${crop.buyPrice}G · ${t("crops.days")}: ${crop.growthDays.harvest}`}
                meta={crop.regrowDays ? `↻ ${crop.regrowDays}d` : undefined}
                badge={
                  <Badge
                    class={SEASON_COLORS[crop.season]}
                  >
                    {t(`common.season.${crop.season === "autumn" ? "fall" : crop.season}`)}
                  </Badge>
                }
              />
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

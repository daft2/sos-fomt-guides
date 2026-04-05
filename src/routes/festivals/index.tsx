import { createSignal, createMemo, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import FilterTabs from "~/components/FilterTabs";
import DataCard from "~/components/DataCard";
import Badge from "~/components/Badge";
import SearchBar from "~/components/SearchBar";
import { allFestivals, festivalsBySeason } from "~/data/festivals";
import type { FestivalSeason } from "~/data/festivals/types";

type SeasonFilter = FestivalSeason | "all";

const SEASON_COLORS: Record<FestivalSeason, string> = {
  spring: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  summer: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  autumn: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  winter: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
};

export default function FestivalsIndex() {
  const { t } = useI18n();
  const [season, setSeason] = createSignal<SeasonFilter>("all");
  const [query, setQuery] = createSignal("");

  const filtered = createMemo(() => {
    const s = season();
    const q = query().toLowerCase().trim();
    const base = s === "all" ? allFestivals : festivalsBySeason[s];
    if (!q) return base;
    return base.filter((f) => f.name.toLowerCase().includes(q));
  });

  const tabs = [
    { value: "all" as SeasonFilter, label: t("common.all"), count: allFestivals.length },
    { value: "spring" as SeasonFilter, label: t("common.season.spring"), count: festivalsBySeason.spring.length },
    { value: "summer" as SeasonFilter, label: t("common.season.summer"), count: festivalsBySeason.summer.length },
    { value: "autumn" as SeasonFilter, label: t("common.season.fall"), count: festivalsBySeason.autumn.length },
    { value: "winter" as SeasonFilter, label: t("common.season.winter"), count: festivalsBySeason.winter.length },
  ];

  return (
    <Layout
      title={t("festivals.title")}
      subtitle={t("festivals.subtitle")}
      breadcrumb={
        <A href="/" class="text-sm text-sky-600 hover:underline dark:text-sky-400">
          ← {t("nav.home")}
        </A>
      }
    >
      <div class="space-y-4">
        <SearchBar value={query()} onInput={setQuery} placeholder={t("common.search")} />
        <FilterTabs tabs={tabs} active={season()} onChange={setSeason} />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <For each={filtered()}>
            {(festival) => (
              <DataCard
                id={festival.id}
                category="festivals"
                name={festival.name}
                href={`/festivals/${festival.id}`}
                subtitle={`${t("festivals.date")}: ${festival.date} · ${festival.location}`}
                meta={festival.isContest ? "Contest" : undefined}
                badge={
                  <Badge class={SEASON_COLORS[festival.season]}>
                    {t(`common.season.${festival.season === "autumn" ? "fall" : festival.season}`)}
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

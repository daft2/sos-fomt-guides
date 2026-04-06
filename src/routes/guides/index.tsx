import { createSignal, createMemo, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import FilterTabs from "~/components/FilterTabs";
import DataCard from "~/components/DataCard";
import Badge from "~/components/Badge";
import SearchBar from "~/components/SearchBar";
import { guides } from "~/data/guides";
import type { GuideCategory } from "~/data/guides/types";

type CategoryFilter = GuideCategory | "all";


const CATEGORY_LABELS: Record<GuideCategory, string> = {
  tips: "Tips & Tricks",
  farming: "Farming",
  animals: "Animals",
  mining: "Mining",
  fishing: "Fishing",
  stamina: "Stamina",
};

const ALL_CATEGORIES: GuideCategory[] = ["tips", "farming", "animals", "mining", "fishing", "stamina"];

export default function GuidesIndex() {
  const { t, lang } = useI18n();
  const [category, setCategory] = createSignal<CategoryFilter>("all");
  const [query, setQuery] = createSignal("");

  const filtered = createMemo(() => {
    const c = category();
    const q = query().toLowerCase().trim();
    const base = c === "all" ? guides : guides.filter((g) => g.category === c);
    if (!q) return base;
    return base.filter(
      (g) =>
        g.title.id.toLowerCase().includes(q) ||
        g.title.en.toLowerCase().includes(q)
    );
  });

  const tabs = [
    { value: "all" as CategoryFilter, label: t("common.all"), count: guides.length },
    ...ALL_CATEGORIES.map((cat) => ({
      value: cat as CategoryFilter,
      label: CATEGORY_LABELS[cat],
      count: guides.filter((g) => g.category === cat).length,
    })),
  ];

  return (
    <Layout
      title={t("guides.title")}
      subtitle={t("guides.subtitle")}
      breadcrumb={
        <A href="/" class="text-sm text-accent hover:underline">
          ← {t("nav.home")}
        </A>
      }
    >
      <div class="space-y-4">
        <SearchBar value={query()} onInput={setQuery} placeholder={t("common.search")} />
        <FilterTabs tabs={tabs} active={category()} onChange={setCategory} />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <For each={filtered()}>
            {(guide) => (
              <DataCard
                id={guide.id}
                category="guides"
                name={lang() === "id" ? guide.title.id : guide.title.en}
                href={`/guides/${guide.id}`}
                subtitle={`${guide.sections.length} sections`}
                badge={
                  <Badge variant="default">
                    {CATEGORY_LABELS[guide.category]}
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

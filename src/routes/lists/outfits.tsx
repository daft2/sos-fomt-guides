import { createSignal, createMemo, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import FilterTabs from "~/components/FilterTabs";
import Badge from "~/components/Badge";
import { outfits } from "~/data/lists";
import type { Outfit } from "~/data/lists/types";

type TypeFilter = Outfit["type"] | "all";

const TYPE_COLORS: Record<Outfit["type"], string> = {
  overalls: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  hoodie: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  special: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
};

const TYPE_LABELS: Record<Outfit["type"], string> = {
  overalls: "Overalls",
  hoodie: "Hoodie",
  special: "Special / DLC",
};

export default function OutfitsList() {
  const { t, lang } = useI18n();
  const [typeFilter, setTypeFilter] = createSignal<TypeFilter>("all");

  const filtered = createMemo(() => {
    const f = typeFilter();
    if (f === "all") return outfits;
    return outfits.filter((o) => o.type === f);
  });

  const tabs = [
    { value: "all" as TypeFilter, label: t("common.all"), count: outfits.length },
    { value: "overalls" as TypeFilter, label: "Overalls", count: outfits.filter((o) => o.type === "overalls").length },
    { value: "hoodie" as TypeFilter, label: "Hoodie", count: outfits.filter((o) => o.type === "hoodie").length },
    { value: "special" as TypeFilter, label: "Special", count: outfits.filter((o) => o.type === "special").length },
  ];

  return (
    <Layout
      title="Outfits"
      subtitle="Costumes and how to unlock them"
      breadcrumb={
        <A href="/lists" class="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-white transition-colors">
          {"\u2190"} {t("lists.title")}
        </A>
      }
    >
      <div class="space-y-4">
        <FilterTabs tabs={tabs} active={typeFilter()} onChange={setTypeFilter} />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <For each={filtered()}>
            {(outfit) => (
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <div class="mb-2 flex items-start justify-between gap-2">
                  <h3 class="font-semibold text-slate-900 dark:text-slate-100">{outfit.name}</h3>
                  <Badge class={TYPE_COLORS[outfit.type]}>{TYPE_LABELS[outfit.type]}</Badge>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  {lang() === "id" ? outfit.unlockCondition.id : outfit.unlockCondition.en}
                </p>
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

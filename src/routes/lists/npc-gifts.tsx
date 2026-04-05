import { createSignal, createMemo, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import SearchBar from "~/components/SearchBar";
import Badge from "~/components/Badge";
import { npcGifts } from "~/data/lists";

type SeasonFilter = "spring" | "summer" | "fall" | "winter" | "all";

const SEASON_RANGES: Record<Exclude<SeasonFilter, "all">, (birthday: string) => boolean> = {
  spring: (b) => b.startsWith("Spring"),
  summer: (b) => b.startsWith("Summer"),
  fall: (b) => b.startsWith("Fall"),
  winter: (b) => b.startsWith("Winter"),
};

import FilterTabs from "~/components/FilterTabs";

export default function NpcGiftsList() {
  const { t } = useI18n();
  const [query, setQuery] = createSignal("");
  const [season, setSeason] = createSignal<SeasonFilter>("all");

  const filtered = createMemo(() => {
    const q = query().toLowerCase().trim();
    const s = season();
    let base = npcGifts;
    if (s !== "all") {
      base = base.filter((n) => SEASON_RANGES[s](n.birthday));
    }
    if (!q) return base;
    return base.filter(
      (n) =>
        n.npcName.toLowerCase().includes(q) ||
        n.favoriteGifts.some((g) => g.toLowerCase().includes(q))
    );
  });

  const tabs = [
    { value: "all" as SeasonFilter, label: t("common.all"), count: npcGifts.length },
    { value: "spring" as SeasonFilter, label: t("common.season.spring"), count: npcGifts.filter((n) => n.birthday.startsWith("Spring")).length },
    { value: "summer" as SeasonFilter, label: t("common.season.summer"), count: npcGifts.filter((n) => n.birthday.startsWith("Summer")).length },
    { value: "fall" as SeasonFilter, label: t("common.season.fall"), count: npcGifts.filter((n) => n.birthday.startsWith("Fall")).length },
    { value: "winter" as SeasonFilter, label: t("common.season.winter"), count: npcGifts.filter((n) => n.birthday.startsWith("Winter")).length },
  ];

  return (
    <Layout
      title="NPC Favorite Gifts"
      subtitle="What every NPC loves to receive"
      breadcrumb={
        <A href="/lists" class="text-sm text-sky-600 hover:underline dark:text-sky-400">
          ← {t("lists.title")}
        </A>
      }
    >
      <div class="space-y-4">
        <SearchBar value={query()} onInput={setQuery} placeholder="Search NPC or gift…" />
        <FilterTabs tabs={tabs} active={season()} onChange={setSeason} />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <For each={filtered()}>
            {(npc) => (
              <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <div class="mb-2 flex items-center justify-between gap-2">
                  <h3 class="font-semibold text-slate-900 dark:text-slate-100">{npc.npcName}</h3>
                  <span class="text-xs text-slate-400 dark:text-slate-500">{npc.birthday}</span>
                </div>
                <Show when={npc.alternateBirthday}>
                  <p class="mb-2 text-xs text-slate-400 dark:text-slate-500">
                    Alt birthday: {npc.alternateBirthday}
                  </p>
                </Show>
                <div class="flex flex-wrap gap-1.5">
                  <For each={npc.favoriteGifts}>
                    {(gift) => (
                      <Badge class="bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
                        {gift}
                      </Badge>
                    )}
                  </For>
                </div>
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

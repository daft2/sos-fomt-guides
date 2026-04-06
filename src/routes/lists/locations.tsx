import { createSignal, createMemo, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import SearchBar from "~/components/SearchBar";
import { locations } from "~/data/lists";

export default function LocationsList() {
  const { t, lang } = useI18n();
  const [query, setQuery] = createSignal("");

  const filtered = createMemo(() => {
    const q = query().toLowerCase().trim();
    if (!q) return locations;
    return locations.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description.en.toLowerCase().includes(q) ||
        l.description.id.toLowerCase().includes(q)
    );
  });

  return (
    <Layout
      title="Town Locations"
      subtitle="All locations in Mineral Town"
      breadcrumb={
        <A href="/lists" class="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-white transition-colors">
          {"\u2190"} {t("lists.title")}
        </A>
      }
    >
      <div class="space-y-4">
        <SearchBar value={query()} onInput={setQuery} placeholder={t("common.search")} />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <For each={filtered()}>
            {(loc) => (
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <div class="mb-2 flex items-start gap-3">
                  <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {loc.id}
                  </span>
                  <h3 class="font-semibold text-slate-900 dark:text-slate-100">{loc.name}</h3>
                </div>
                <p class="mb-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {lang() === "id" ? loc.description.id : loc.description.en}
                </p>
                <Show when={loc.hours || loc.closedDays}>
                  <div class="border-t border-slate-100 pt-2 dark:border-slate-800">
                    <Show when={loc.hours}>
                      <p class="text-xs text-slate-500 dark:text-slate-400">
                        <span class="font-medium">Hours:</span> {loc.hours}
                      </p>
                    </Show>
                    <Show when={loc.closedDays}>
                      <p class="text-xs text-slate-500 dark:text-slate-400">
                        <span class="font-medium">Closed:</span> {loc.closedDays}
                      </p>
                    </Show>
                  </div>
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

import { createSignal, createMemo, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import SearchBar from "~/components/SearchBar";
import { shops } from "~/data/lists";

export default function ShopsList() {
  const { t } = useI18n();
  const [query, setQuery] = createSignal("");

  const filtered = createMemo(() => {
    const q = query().toLowerCase().trim();
    if (!q) return shops;
    return shops.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.owner.some((o) => o.toLowerCase().includes(q))
    );
  });

  return (
    <Layout
      title="Shops"
      subtitle="Shop hours, owners, and items"
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
            {(shop) => (
              <div class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <h2 class="mb-1 font-semibold text-slate-900 dark:text-slate-100">{shop.name}</h2>
                <p class="mb-3 text-sm text-slate-500 dark:text-slate-400">
                  {shop.owner.join(", ")}
                </p>
                <div class="mb-3 space-y-1 text-sm">
                  <div class="flex gap-2">
                    <span class="w-20 shrink-0 text-slate-400 dark:text-slate-500">Hours</span>
                    <span class="text-slate-700 dark:text-slate-300">{shop.hours}</span>
                  </div>
                  <div class="flex gap-2">
                    <span class="w-20 shrink-0 text-slate-400 dark:text-slate-500">Closed</span>
                    <span class="text-slate-700 dark:text-slate-300">{shop.closedDays}</span>
                  </div>
                </div>
                <div class="border-t border-slate-100 pt-3 dark:border-slate-800">
                  <p class="mb-1 text-xs font-medium text-slate-400 dark:text-slate-500">ITEMS</p>
                  <ul class="space-y-0.5">
                    <For each={shop.items}>
                      {(item) => (
                        <li class="text-sm text-slate-600 dark:text-slate-400">• {item}</li>
                      )}
                    </For>
                  </ul>
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

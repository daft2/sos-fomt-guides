import { For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import { rings } from "~/data/lists";

export default function RingsList() {
  const { t, lang } = useI18n();

  return (
    <Layout
      title="Rings"
      subtitle="All 7 collectible rings and how to obtain them"
      breadcrumb={
        <A href="/lists" class="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-white transition-colors">
          {"\u2190"} {t("lists.title")}
        </A>
      }
    >
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <For each={rings}>
          {(ring, i) => (
            <div class="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <div class="mb-3 flex items-start gap-3">
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {i() + 1}
                </span>
                <h2 class="font-semibold text-slate-900 dark:text-slate-100">
                  {lang() === "id" ? ring.name.id : ring.name.en}
                </h2>
              </div>
              <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {lang() === "id" ? ring.howToObtain.id : ring.howToObtain.en}
              </p>
            </div>
          )}
        </For>
      </div>
    </Layout>
  );
}

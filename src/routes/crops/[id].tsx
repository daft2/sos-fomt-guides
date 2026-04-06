import { useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import { useBookmarks } from "~/lib/bookmarks";
import Layout from "~/components/Layout";
import Badge from "~/components/Badge";
import { getCropById } from "~/data/crops";
import type { Season } from "~/data/crops/types";

const SEASON_COLORS: Record<Season, string> = {
  spring: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  summer: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  autumn: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
};

export default function CropDetail() {
  const params = useParams();
  const { t, lang } = useI18n();
  const { toggle, isBookmarked } = useBookmarks();

  const crop = () => getCropById(params.id);

  return (
    <Show
      when={crop()}
      fallback={
        <Layout
          breadcrumb={
            <A href="/crops" class="text-sm text-accent hover:underline">
              ← {t("crops.title")}
            </A>
          }
        >
          <p class="py-12 text-center text-slate-400">{t("common.notFound")}</p>
        </Layout>
      }
    >
      {(c) => (
        <Layout
          title={c().name}
          breadcrumb={
            <A href="/crops" class="text-sm text-accent hover:underline">
              ← {t("crops.title")}
            </A>
          }
          actions={
            <button
              onClick={() => toggle(c().id, "crops", c().name)}
              class={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                isBookmarked(c().id)
                  ? "border-accent bg-accent-light/20 text-accent-dark dark:border-accent dark:bg-accent/10 dark:text-accent-light"
                  : "border-slate-200 bg-white text-slate-600 hover:border-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {isBookmarked(c().id) ? t("common.bookmarked") : t("common.bookmark")}
            </button>
          }
        >
          <div class="mx-auto max-w-2xl space-y-6">
            {/* Season + type badges */}
            <div class="flex flex-wrap gap-2">
              <Badge class={SEASON_COLORS[c().season]}>
                {t(`common.season.${c().season === "autumn" ? "fall" : c().season}`)}
              </Badge>
              {c().isFlower && (
                <Badge variant="default">Flower</Badge>
              )}
              {c().unlockRequirement && (
                <Badge variant="accent">Unlockable</Badge>
              )}
            </div>

            {/* Description */}
            <p class="text-slate-600 dark:text-slate-400">
              {lang() === "id" ? c().description.id : c().description.en}
            </p>

            {/* Stats grid */}
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs text-slate-400 dark:text-slate-500">{t("crops.buyPrice")}</p>
                <p class="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{c().buyPrice}G</p>
              </div>
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs text-slate-400 dark:text-slate-500">{t("crops.days")}</p>
                <p class="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{c().growthDays.harvest}d</p>
              </div>
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs text-slate-400 dark:text-slate-500">{t("crops.regrowDays")}</p>
                <p class="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {c().regrowDays ? `${c().regrowDays}d` : "—"}
                </p>
              </div>
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs text-slate-400 dark:text-slate-500">{t("crops.source")}</p>
                <p class="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{c().source}</p>
              </div>
            </div>

            {/* Sell prices */}
            <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <h2 class="mb-3 font-semibold text-slate-900 dark:text-slate-100">{t("crops.sellPrice")}</h2>
              <div class="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div class="flex flex-col items-center gap-1">
                    <span class="text-xs font-medium text-slate-400">{star}</span>
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {(c().sellPrices as Record<string, number>)[`star${star}`]}G
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unlock requirement */}
            <Show when={c().unlockRequirement}>
              <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                <p class="text-xs font-medium text-amber-700 dark:text-amber-400">Unlock Requirement</p>
                <p class="mt-1 text-sm text-amber-800 dark:text-amber-300">{c().unlockRequirement}</p>
              </div>
            </Show>
          </div>
        </Layout>
      )}
    </Show>
  );
}

import { useParams } from "@solidjs/router";
import { Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import { useBookmarks } from "~/lib/bookmarks";
import Layout from "~/components/Layout";
import Badge from "~/components/Badge";
import { getEventById } from "~/data/events";
import type { EventType } from "~/data/events/types";

const TYPE_COLORS: Record<EventType, string> = {
  normal: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  limited: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  secret: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
};

const TYPE_LABELS: Record<EventType, string> = {
  normal: "Normal Event",
  limited: "Limited Event",
  secret: "Secret Event",
};

export default function EventDetail() {
  const params = useParams();
  const { t, lang } = useI18n();
  const { toggle, isBookmarked } = useBookmarks();

  const event = () => getEventById(params.id);

  return (
    <Show
      when={event()}
      fallback={
        <Layout
          breadcrumb={
            <A href="/events" class="text-sm text-accent hover:underline">
              ← {t("events.title")}
            </A>
          }
        >
          <p class="py-12 text-center text-slate-400">{t("common.notFound")}</p>
        </Layout>
      }
    >
      {(ev) => (
        <Layout
          title={ev().name}
          breadcrumb={
            <A href="/events" class="text-sm text-accent hover:underline">
              ← {t("events.title")}
            </A>
          }
          actions={
            <button
              onClick={() => toggle(ev().id, "events", ev().name)}
              class={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                isBookmarked(ev().id)
                  ? "border-accent bg-accent-light/20 text-accent-dark dark:border-accent dark:bg-accent/10 dark:text-accent-light"
                  : "border-slate-200 bg-white text-slate-600 hover:border-accent dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {isBookmarked(ev().id) ? t("common.bookmarked") : t("common.bookmark")}
            </button>
          }
        >
          <div class="mx-auto max-w-2xl space-y-6">
            {/* Type badge */}
            <div class="flex flex-wrap gap-2">
              <Badge class={TYPE_COLORS[ev().type]}>
                {TYPE_LABELS[ev().type]}
              </Badge>
            </div>

            {/* Description */}
            <p class="text-slate-600 dark:text-slate-400">
              {lang() === "id" ? ev().description.id : ev().description.en}
            </p>

            {/* Requirements */}
            <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <h2 class="mb-3 font-semibold text-slate-900 dark:text-slate-100">Requirements</h2>
              <dl class="space-y-2 text-sm">
                <Show when={ev().requirements.day}>
                  <div class="flex gap-2">
                    <dt class="w-24 shrink-0 text-slate-400 dark:text-slate-500">Day</dt>
                    <dd class="text-slate-700 dark:text-slate-300">{ev().requirements.day}</dd>
                  </div>
                </Show>
                <Show when={ev().requirements.time}>
                  <div class="flex gap-2">
                    <dt class="w-24 shrink-0 text-slate-400 dark:text-slate-500">Time</dt>
                    <dd class="text-slate-700 dark:text-slate-300">{ev().requirements.time}</dd>
                  </div>
                </Show>
                <Show when={ev().requirements.weather && ev().requirements.weather !== "any"}>
                  <div class="flex gap-2">
                    <dt class="w-24 shrink-0 text-slate-400 dark:text-slate-500">Weather</dt>
                    <dd class="capitalize text-slate-700 dark:text-slate-300">{ev().requirements.weather}</dd>
                  </div>
                </Show>
                <Show when={ev().requirements.season && ev().requirements.season !== "any"}>
                  <div class="flex gap-2">
                    <dt class="w-24 shrink-0 text-slate-400 dark:text-slate-500">Season</dt>
                    <dd class="capitalize text-slate-700 dark:text-slate-300">{ev().requirements.season}</dd>
                  </div>
                </Show>
                <div class="flex gap-2">
                  <dt class="w-24 shrink-0 text-slate-400 dark:text-slate-500">Location</dt>
                  <dd class="text-slate-700 dark:text-slate-300">{ev().requirements.location}</dd>
                </div>
                <Show when={ev().requirements.friendship}>
                  <div class="flex gap-2">
                    <dt class="w-24 shrink-0 text-slate-400 dark:text-slate-500">{t("events.hearts")}</dt>
                    <dd class="text-slate-700 dark:text-slate-300">{ev().requirements.friendship}</dd>
                  </div>
                </Show>
                <Show when={ev().requirements.other && ev().requirements.other!.length > 0}>
                  <div class="flex gap-2">
                    <dt class="w-24 shrink-0 text-slate-400 dark:text-slate-500">Other</dt>
                    <dd class="space-y-1 text-slate-700 dark:text-slate-300">
                      <For each={ev().requirements.other}>
                        {(cond) => <p>• {cond}</p>}
                      </For>
                    </dd>
                  </div>
                </Show>
              </dl>
            </div>

            {/* Choices */}
            <Show when={ev().choices.length > 0}>
              <div class="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <h2 class="mb-3 font-semibold text-slate-900 dark:text-slate-100">Choices</h2>
                <div class="space-y-3">
                  <For each={ev().choices}>
                    {(choice) => (
                      <div class="rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                        <p class="font-medium text-slate-800 dark:text-slate-200">"{choice.text}"</p>
                        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{choice.effect}</p>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </Show>

            {/* Reward */}
            <Show when={ev().reward}>
              <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                <p class="text-xs font-medium text-amber-700 dark:text-amber-400">Reward</p>
                <p class="mt-1 text-sm text-amber-800 dark:text-amber-300">{ev().reward}</p>
              </div>
            </Show>
          </div>
        </Layout>
      )}
    </Show>
  );
}

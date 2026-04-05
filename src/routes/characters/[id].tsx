import { useParams } from "@solidjs/router";
import { Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { useI18n } from "~/lib/i18n";
import { useBookmarks } from "~/lib/bookmarks";
import Layout from "~/components/Layout";
import Badge from "~/components/Badge";
import { characters } from "~/data/characters";
import type { CharacterCategory } from "~/data/characters/types";

const CATEGORY_COLORS: Record<CharacterCategory, string> = {
  bachelor: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  bachelorette: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  special: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
};

const HEART_COLORS: Record<string, string> = {
  gray1: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  gray2: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  green: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  event1: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  event2: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  event3: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
};

interface GiftSectionProps {
  label: string;
  gifts: string[];
  class?: string;
}

function GiftSection(props: GiftSectionProps) {
  if (!props.gifts.length) return null;
  return (
    <div class={`rounded-xl border p-4 ${props.class ?? "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"}`}>
      <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {props.label}
      </p>
      <div class="flex flex-wrap gap-1.5">
        <For each={props.gifts}>
          {(gift) => (
            <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {gift}
            </span>
          )}
        </For>
      </div>
    </div>
  );
}

export default function CharacterDetail() {
  const params = useParams();
  const { t, lang } = useI18n();
  const { toggle, isBookmarked } = useBookmarks();

  const char = () => characters.find((c) => c.id === params.id);

  return (
    <Show
      when={char()}
      fallback={
        <Layout
          breadcrumb={
            <A href="/characters" class="text-sm text-sky-600 hover:underline dark:text-sky-400">
              ← {t("characters.title")}
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
            <A href="/characters" class="text-sm text-sky-600 hover:underline dark:text-sky-400">
              ← {t("characters.title")}
            </A>
          }
          actions={
            <button
              onClick={() => toggle(c().id, "characters", c().name)}
              class={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                isBookmarked(c().id)
                  ? "border-sky-400 bg-sky-50 text-sky-700 dark:border-sky-500 dark:bg-sky-900/30 dark:text-sky-300"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {isBookmarked(c().id) ? `★ ${t("common.bookmarked")}` : `☆ ${t("common.bookmark")}`}
            </button>
          }
        >
          <div class="mx-auto max-w-2xl space-y-6">
            {/* Category + rival badges */}
            <div class="flex flex-wrap gap-2">
              <Badge class={CATEGORY_COLORS[c().category]}>
                {c().category === "bachelor"
                  ? (lang() === "id" ? "Bujangan" : "Bachelor")
                  : c().category === "bachelorette"
                  ? (lang() === "id" ? "Gadis" : "Bachelorette")
                  : (lang() === "id" ? "Spesial" : "Special")}
              </Badge>
              {c().rival && (
                <Badge variant="default">
                  {lang() === "id" ? "Rival" : "Rival"}: {c().rival}
                </Badge>
              )}
            </div>

            {/* Description */}
            <p class="text-slate-600 dark:text-slate-400">
              {lang() === "id" ? c().description.id : c().description.en}
            </p>

            {/* Info grid */}
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs text-slate-400 dark:text-slate-500">{t("characters.birthday")}</p>
                <p class="mt-1 font-semibold text-slate-900 dark:text-slate-100">{c().birthday}</p>
                {c().alternateBirthday && (
                  <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">({c().alternateBirthday})</p>
                )}
              </div>
              <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <p class="text-xs text-slate-400 dark:text-slate-500">{t("characters.location")}</p>
                <p class="mt-1 font-semibold text-slate-900 dark:text-slate-100">{c().residence}</p>
              </div>
              {c().family.length > 0 && (
                <div class="col-span-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <p class="text-xs text-slate-400 dark:text-slate-500">{lang() === "id" ? "Keluarga" : "Family"}</p>
                  <p class="mt-1 text-sm text-slate-700 dark:text-slate-300">{c().family.join(", ")}</p>
                </div>
              )}
            </div>

            {/* Gifts */}
            <div class="space-y-3">
              <h2 class="font-semibold text-slate-900 dark:text-slate-100">
                {lang() === "id" ? "Hadiah" : "Gifts"}
              </h2>
              <GiftSection
                label={lang() === "id" ? "❤️ Hadiah Terfavorit (+800 LP)" : "❤️ Most Loved (+800 LP)"}
                gifts={c().favoritedGift}
                class="border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/10"
              />
              <GiftSection
                label={lang() === "id" ? "💛 Hadiah Favorit (+500 LP)" : "💛 Loved (+500 LP)"}
                gifts={c().lovedGifts}
                class="border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/10"
              />
              <GiftSection
                label={t("characters.gifts.liked")}
                gifts={c().likedGifts}
              />
              <GiftSection
                label={t("characters.gifts.disliked")}
                gifts={c().dislikedGifts}
                class="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50"
              />
              <GiftSection
                label={t("characters.gifts.hated")}
                gifts={c().hatedGifts}
                class="border-red-200 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/5"
              />
            </div>

            {/* Heart events */}
            {c().heartEvents.length > 0 && (
              <div class="space-y-3">
                <h2 class="font-semibold text-slate-900 dark:text-slate-100">
                  {t("characters.schedule")}
                </h2>
                <div class="space-y-2">
                  <For each={c().heartEvents}>
                    {(event) => (
                      <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                        <div class="flex items-center gap-2 mb-2">
                          <Badge class={HEART_COLORS[event.heart]}>
                            {event.heart.toUpperCase()}
                          </Badge>
                          {event.requirementPoints && (
                            <span class="text-xs text-slate-400">{event.requirementPoints} pts</span>
                          )}
                        </div>
                        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <div>
                            <span class="text-xs text-slate-400">{lang() === "id" ? "Hari" : "Days"}: </span>
                            <span class="text-slate-700 dark:text-slate-300">{event.days}</span>
                          </div>
                          <div>
                            <span class="text-xs text-slate-400">{lang() === "id" ? "Waktu" : "Time"}: </span>
                            <span class="text-slate-700 dark:text-slate-300">{event.time}</span>
                          </div>
                          <div>
                            <span class="text-xs text-slate-400">{lang() === "id" ? "Cuaca" : "Weather"}: </span>
                            <span class="text-slate-700 dark:text-slate-300">{event.weather}</span>
                          </div>
                          <div>
                            <span class="text-xs text-slate-400">{t("characters.location")}: </span>
                            <span class="text-slate-700 dark:text-slate-300">{event.location}</span>
                          </div>
                        </div>
                        {event.otherRequirements && (
                          <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">{event.otherRequirements}</p>
                        )}
                      </div>
                    )}
                  </For>
                </div>
              </div>
            )}
          </div>
        </Layout>
      )}
    </Show>
  );
}

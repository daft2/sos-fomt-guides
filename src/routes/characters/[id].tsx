import { useParams } from "@solidjs/router";
import { Show, For, createMemo } from "solid-js";
import { A } from "@solidjs/router";
import { Calendar, MapPin, Users as UsersIcon, Heart, Clock, CloudRain } from "lucide-solid";
import { useI18n } from "~/lib/i18n";
import Layout from "~/components/Layout";
import Badge from "~/components/Badge";
import BookmarkButton from "~/components/BookmarkButton";
import { characters } from "~/data/characters";
import { allEvents } from "~/data/events";
import { allFestivals } from "~/data/festivals";
import type { CharacterCategory } from "~/data/characters/types";

const CATEGORY_LABELS: Record<CharacterCategory, { en: string; id: string }> = {
  bachelor: { en: "Bachelor", id: "Bujangan" },
  bachelorette: { en: "Bachelorette", id: "Gadis" },
  special: { en: "Special", id: "Spesial" },
};

// Heart dot colors — semantic, kept for accessibility
const HEART_DOT: Record<string, string> = {
  gray1:  "bg-slate-400",
  gray2:  "bg-slate-400",
  purple: "bg-purple-500",
  blue:   "bg-blue-500",
  green:  "bg-green-500",
  yellow: "bg-yellow-400",
  orange: "bg-orange-500",
  red:    "bg-red-500",
  event1: "bg-pink-500",
  event2: "bg-pink-500",
  event3: "bg-pink-500",
};

const HEART_LABEL: Record<string, string> = {
  gray1:  "Gray (1)",
  gray2:  "Gray (2)",
  purple: "Purple",
  blue:   "Blue",
  green:  "Green",
  yellow: "Yellow",
  orange: "Orange",
  red:    "Red",
  event1: "Event 1",
  event2: "Event 2",
  event3: "Event 3",
};

interface GiftTierConfig {
  labelEn: string;
  labelId: string;
  dotClass: string;
  heartColor: string;
}

const GIFT_TIERS: GiftTierConfig[] = [
  { labelEn: "Most Loved (+800 LP)", labelId: "Terfavorit (+800 LP)", dotClass: "bg-red-500", heartColor: "text-red-500" },
  { labelEn: "Loved (+500 LP)",      labelId: "Favorit (+500 LP)",    dotClass: "bg-yellow-400", heartColor: "text-yellow-500" },
  { labelEn: "Liked (+300 LP)",      labelId: "Disukai (+300 LP)",    dotClass: "bg-slate-400", heartColor: "text-slate-400" },
  { labelEn: "Disliked (-500 LP)",   labelId: "Tidak Disukai (-500 LP)", dotClass: "bg-slate-300", heartColor: "text-slate-300" },
  { labelEn: "Hated (-800 LP)",      labelId: "Dibenci (-800 LP)",    dotClass: "bg-red-300", heartColor: "text-red-300" },
];

interface GiftSectionProps {
  tier: GiftTierConfig;
  gifts: string[];
  lang: string;
}

function GiftSection(props: GiftSectionProps) {
  if (!props.gifts.length) return null;
  return (
    <div class="border-b border-slate-200 py-3 dark:border-slate-700 last:border-0">
      <div class="mb-2 flex items-center gap-1.5">
        <Heart class={`h-3.5 w-3.5 ${props.tier.heartColor}`} />
        <span class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {props.lang === "id" ? props.tier.labelId : props.tier.labelEn}
        </span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <For each={props.gifts}>
          {(gift) => (
            <span class="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
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

  const char = () => characters.find((c) => c.id === params.id);

  const relatedEvents = createMemo(() => {
    const c = char();
    if (!c) return [];
    const name = c.name.toLowerCase();
    return allEvents.filter((e) => {
      const desc = (e.description.en + e.description.id).toLowerCase();
      const friendship = (e.requirements.friendship ?? "").toLowerCase();
      const other = (e.requirements.other ?? []).join(" ").toLowerCase();
      return desc.includes(name) || friendship.includes(name) || other.includes(name);
    });
  });

  const relatedFestivals = createMemo(() => {
    const c = char();
    if (!c) return [];
    const name = c.name.toLowerCase();
    return allFestivals.filter((f) => {
      const desc = (f.description.en + f.description.id).toLowerCase();
      return desc.includes(name);
    });
  });

  return (
    <Show
      when={char()}
      fallback={
        <Layout
          breadcrumb={
            <A
              href="/characters"
              class="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-white transition-colors"
            >
              {"\u2190"} {t("characters.title")}
            </A>
          }
        >
          <p class="py-16 text-center text-slate-400 dark:text-slate-500">{t("common.notFound")}</p>
        </Layout>
      }
    >
      {(c) => (
        <Layout
          title={c().name}
          breadcrumb={
            <A
              href="/characters"
              class="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-white transition-colors"
            >
              {"\u2190"} {t("characters.title")}
            </A>
          }
          actions={
            <BookmarkButton id={c().id} category="characters" name={c().name} />
          }
        >
          <div class="mx-auto max-w-2xl space-y-8">
            {/* Badges + description */}
            <div>
              <div class="flex flex-wrap gap-2">
                <Badge variant="default">
                  {lang() === "id"
                    ? CATEGORY_LABELS[c().category].id
                    : CATEGORY_LABELS[c().category].en}
                </Badge>
                <Show when={c().rival}>
                  <Badge variant="default">
                    {lang() === "id" ? "Rival" : "Rival"}: {c().rival}
                  </Badge>
                </Show>
              </div>
              <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {lang() === "id" ? c().description.id : c().description.en}
              </p>
            </div>

            {/* Info rows */}
            <div>
              <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {lang() === "id" ? "Informasi" : "Info"}
              </h2>
              <div class="divide-y divide-slate-100 dark:divide-slate-800">
                <div class="flex items-center gap-2 py-2">
                  <Calendar class="h-4 w-4 shrink-0 text-slate-400" />
                  <span class="w-24 shrink-0 text-xs text-slate-400 dark:text-slate-500">
                    {t("characters.birthday")}
                  </span>
                  <span class="text-sm text-slate-800 dark:text-slate-200">
                    {c().birthday}
                    <Show when={c().alternateBirthday}>
                      <span class="ml-1 text-xs text-slate-400">({c().alternateBirthday})</span>
                    </Show>
                  </span>
                </div>
                <div class="flex items-center gap-2 py-2">
                  <MapPin class="h-4 w-4 shrink-0 text-slate-400" />
                  <span class="w-24 shrink-0 text-xs text-slate-400 dark:text-slate-500">
                    {t("characters.location")}
                  </span>
                  <span class="text-sm text-slate-800 dark:text-slate-200">{c().residence}</span>
                </div>
                <Show when={c().rival}>
                  <div class="flex items-center gap-2 py-2">
                    <Heart class="h-4 w-4 shrink-0 text-slate-400" />
                    <span class="w-24 shrink-0 text-xs text-slate-400 dark:text-slate-500">
                      {lang() === "id" ? "Rival" : "Rival"}
                    </span>
                    <span class="text-sm text-slate-800 dark:text-slate-200">{c().rival}</span>
                  </div>
                </Show>
                <Show when={c().family.length > 0}>
                  <div class="flex items-start gap-2 py-2">
                    <UsersIcon class="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    <span class="w-24 shrink-0 text-xs text-slate-400 dark:text-slate-500">
                      {lang() === "id" ? "Keluarga" : "Family"}
                    </span>
                    <div class="flex flex-wrap gap-1.5">
                      <For each={c().family}>
                        {(member) => (
                          <span class="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {member}
                          </span>
                        )}
                      </For>
                    </div>
                  </div>
                </Show>
              </div>
            </div>

            {/* Gifts */}
            <div>
              <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {lang() === "id" ? "Hadiah" : "Gifts"}
              </h2>
              <GiftSection tier={GIFT_TIERS[0]} gifts={c().favoritedGift} lang={lang()} />
              <GiftSection tier={GIFT_TIERS[1]} gifts={c().lovedGifts} lang={lang()} />
              <GiftSection tier={GIFT_TIERS[2]} gifts={c().likedGifts} lang={lang()} />
              <GiftSection tier={GIFT_TIERS[3]} gifts={c().dislikedGifts} lang={lang()} />
              <GiftSection tier={GIFT_TIERS[4]} gifts={c().hatedGifts} lang={lang()} />
            </div>

            {/* Heart events — timeline style */}
            <Show when={c().heartEvents.length > 0}>
              <div>
                <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {lang() === "id" ? "Heart Events" : "Heart Events"}
                </h2>
                <div class="divide-y divide-slate-100 dark:divide-slate-800">
                  <For each={c().heartEvents}>
                    {(event) => (
                      <div class="flex gap-3 py-3">
                        {/* Timeline dot */}
                        <div class="mt-1.5 flex flex-col items-center">
                          <span class={`h-2.5 w-2.5 rounded-full ${HEART_DOT[event.heart]}`} />
                        </div>
                        {/* Content */}
                        <div class="min-w-0 flex-1">
                          {/* Line 1: heart label + points */}
                          <div class="flex flex-wrap items-center gap-2">
                            <span class="text-sm font-medium text-slate-800 dark:text-slate-200">
                              {HEART_LABEL[event.heart]}
                            </span>
                            <Show when={event.requirementPoints}>
                              <span class="text-xs text-slate-400 dark:text-slate-500">
                                {event.requirementPoints?.toLocaleString()} pts
                              </span>
                            </Show>
                          </div>
                          {/* Line 2: meta info */}
                          <div class="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                            <span class="inline-flex items-center gap-1">
                              <Calendar class="h-3 w-3" />
                              {event.days}
                            </span>
                            <span class="inline-flex items-center gap-1">
                              <Clock class="h-3 w-3" />
                              {event.time}
                            </span>
                            <span class="inline-flex items-center gap-1">
                              <MapPin class="h-3 w-3" />
                              {event.location}
                            </span>
                            <span class="inline-flex items-center gap-1">
                              <CloudRain class="h-3 w-3" />
                              {event.weather}
                            </span>
                          </div>
                          {/* Requirements note */}
                          <Show when={event.otherRequirements}>
                            <p class="mt-1.5 rounded bg-slate-50 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              {event.otherRequirements}
                            </p>
                          </Show>
                          {/* Answers */}
                          <Show when={event.positiveAnswer || event.negativeAnswer}>
                            <div class="mt-1.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                              <Show when={event.positiveAnswer}>
                                <div class="rounded border border-green-200 bg-green-50 px-2.5 py-1.5 dark:border-green-900/40 dark:bg-green-900/10">
                                  <p class="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                                    {lang() === "id" ? "Jawaban Positif" : "Positive"}
                                  </p>
                                  <p class="text-xs text-green-800 dark:text-green-300">{event.positiveAnswer}</p>
                                </div>
                              </Show>
                              <Show when={event.negativeAnswer}>
                                <div class="rounded border border-red-200 bg-red-50 px-2.5 py-1.5 dark:border-red-900/40 dark:bg-red-900/10">
                                  <p class="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                                    {lang() === "id" ? "Jawaban Negatif" : "Negative"}
                                  </p>
                                  <p class="text-xs text-red-800 dark:text-red-300">{event.negativeAnswer}</p>
                                </div>
                              </Show>
                            </div>
                          </Show>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </Show>

            {/* Related Events */}
            <Show when={relatedEvents().length > 0}>
              <div>
                <h2 class="mb-3 text-lg font-medium text-slate-900 dark:text-slate-100">
                  {lang() === "id" ? "Event Terkait" : "Related Events"}
                </h2>
                <div class="divide-y divide-slate-100 dark:divide-slate-800">
                  <For each={relatedEvents()}>
                    {(event) => (
                      <A
                        href={`/events/${event.id}`}
                        class="flex items-center justify-between gap-4 py-2.5 hover:text-accent dark:hover:text-accent-light transition-colors"
                      >
                        <span class="text-sm text-slate-800 dark:text-slate-200">{event.name}</span>
                        <div class="flex shrink-0 items-center gap-2">
                          <Badge variant="default">{event.type}</Badge>
                          <span class="text-xs text-slate-400 dark:text-slate-500">{event.requirements.location}</span>
                        </div>
                      </A>
                    )}
                  </For>
                </div>
              </div>
            </Show>

            {/* Related Festivals */}
            <Show when={relatedFestivals().length > 0}>
              <div>
                <h2 class="mb-3 text-lg font-medium text-slate-900 dark:text-slate-100">
                  {lang() === "id" ? "Festival Terkait" : "Related Festivals"}
                </h2>
                <div class="divide-y divide-slate-100 dark:divide-slate-800">
                  <For each={relatedFestivals()}>
                    {(festival) => (
                      <A
                        href={`/festivals/${festival.id}`}
                        class="flex items-center justify-between gap-4 py-2.5 hover:text-accent dark:hover:text-accent-light transition-colors"
                      >
                        <span class="text-sm text-slate-800 dark:text-slate-200">{festival.name}</span>
                        <div class="flex shrink-0 items-center gap-2">
                          <Badge variant="default">{festival.season}</Badge>
                          <span class="text-xs text-slate-400 dark:text-slate-500">
                            {festival.season.charAt(0).toUpperCase() + festival.season.slice(1)} {festival.date}
                          </span>
                        </div>
                      </A>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </Layout>
      )}
    </Show>
  );
}

import { JSX, Show } from "solid-js";
import { A } from "@solidjs/router";
import BookmarkButton from "./BookmarkButton";
import type { BookmarkCategory } from "~/lib/bookmarks";

interface DataCardProps {
  id: string;
  category: BookmarkCategory;
  name: string;
  href: string;
  subtitle?: string;
  meta?: string;
  badge?: JSX.Element;
  image?: string;
  class?: string;
}

export default function DataCard(props: DataCardProps) {
  return (
    <div
      class={`group relative flex flex-col rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 ${props.class ?? ""}`}
    >
      <Show when={props.image}>
        <div class="aspect-video w-full overflow-hidden rounded-t-lg bg-slate-100 dark:bg-slate-800">
          <img
            src={props.image}
            alt={props.name}
            class="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </Show>
      <div class="flex flex-1 flex-col gap-2 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50">
        <div class="flex items-start justify-between gap-2">
          <A
            href={props.href}
            class="flex-1 font-semibold leading-snug text-slate-900 hover:text-accent-dark dark:text-slate-100 dark:hover:text-green-400"
          >
            {props.name}
          </A>
          <BookmarkButton id={props.id} category={props.category} name={props.name} />
        </div>
        <Show when={props.subtitle}>
          <p class="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{props.subtitle}</p>
        </Show>
        <div class="mt-auto flex items-center gap-2 pt-1">
          <Show when={props.badge}>{props.badge}</Show>
          <Show when={props.meta}>
            <span class="ml-auto text-xs text-slate-400 dark:text-slate-500">{props.meta}</span>
          </Show>
        </div>
      </div>
    </div>
  );
}

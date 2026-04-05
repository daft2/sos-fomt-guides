import { JSX } from "solid-js";
import { A } from "@solidjs/router";

interface CategoryCardProps {
  href: string;
  title: string;
  description?: string;
  icon?: JSX.Element;
  count?: number;
  class?: string;
}

export default function CategoryCard(props: CategoryCardProps) {
  return (
    <A
      href={props.href}
      class={`group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-sky-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-500 ${props.class ?? ""}`}
    >
      {props.icon && (
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
          {props.icon}
        </div>
      )}
      <div class="flex flex-col gap-1">
        <h3 class="font-semibold text-slate-900 group-hover:text-sky-600 dark:text-slate-100 dark:group-hover:text-sky-400">
          {props.title}
        </h3>
        {props.description && (
          <p class="text-sm text-slate-500 dark:text-slate-400">{props.description}</p>
        )}
      </div>
      {props.count !== undefined && (
        <span class="mt-auto text-xs text-slate-400 dark:text-slate-500">
          {props.count} items
        </span>
      )}
    </A>
  );
}

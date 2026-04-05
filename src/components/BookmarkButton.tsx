import { useBookmarks } from "~/lib/bookmarks";
import type { BookmarkCategory } from "~/lib/bookmarks";

interface BookmarkButtonProps {
  id: string;
  category: BookmarkCategory;
  name: string;
  class?: string;
}

export default function BookmarkButton(props: BookmarkButtonProps) {
  const { toggle, isBookmarked } = useBookmarks();

  return (
    <button
      type="button"
      aria-label={isBookmarked(props.id) ? "Remove bookmark" : "Add bookmark"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(props.id, props.category, props.name);
      }}
      class={`flex items-center justify-center rounded-lg p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
        isBookmarked(props.id)
          ? "text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
          : "text-slate-400 hover:text-amber-500 dark:text-slate-600 dark:hover:text-amber-400"
      } ${props.class ?? ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isBookmarked(props.id) ? "currentColor" : "none"}
        stroke="currentColor"
        stroke-width="2"
        class="h-5 w-5"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    </button>
  );
}

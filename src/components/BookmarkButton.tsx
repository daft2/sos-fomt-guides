import { Bookmark } from "lucide-solid";
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
      class={`flex items-center justify-center rounded-lg p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        isBookmarked(props.id)
          ? "text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300"
          : "text-slate-300 hover:text-amber-500 dark:text-slate-600 dark:hover:text-amber-400"
      } ${props.class ?? ""}`}
    >
      <Bookmark
        class="h-5 w-5"
        fill={isBookmarked(props.id) ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
}

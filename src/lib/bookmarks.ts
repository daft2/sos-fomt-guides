import { createContext, useContext, ParentComponent } from "solid-js";
import { createStorageSignal } from "./createStorageSignal";

export type BookmarkCategory =
  | "characters"
  | "crops"
  | "recipes"
  | "festivals"
  | "events"
  | "guides"
  | "lists";

export interface Bookmark {
  id: string;
  category: BookmarkCategory;
  name: string;
  savedAt: number;
}

interface BookmarksContextValue {
  toggle: (id: string, category: BookmarkCategory, name: string) => void;
  isBookmarked: (id: string) => boolean;
  getAll: () => Bookmark[];
  getByCategory: (category: BookmarkCategory) => Bookmark[];
}

const BookmarksContext = createContext<BookmarksContextValue>();

export const BookmarkProvider: ParentComponent = (props) => {
  const [bookmarks, setBookmarks] = createStorageSignal<Bookmark[]>(
    "sos-fomt-bookmarks",
    []
  );

  const toggle = (id: string, category: BookmarkCategory, name: string) => {
    const current = bookmarks();
    const exists = current.findIndex((b) => b.id === id);
    if (exists >= 0) {
      setBookmarks(current.filter((b) => b.id !== id));
    } else {
      setBookmarks([...current, { id, category, name, savedAt: Date.now() }]);
    }
  };

  const isBookmarked = (id: string) => bookmarks().some((b) => b.id === id);

  const getAll = () => bookmarks();

  const getByCategory = (category: BookmarkCategory) =>
    bookmarks().filter((b) => b.category === category);

  return (
    <BookmarksContext.Provider value={{ toggle, isBookmarked, getAll, getByCategory }}>
      {props.children}
    </BookmarksContext.Provider>
  );
};

export function useBookmarks(): BookmarksContextValue {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error("useBookmarks must be used within a BookmarkProvider");
  return ctx;
}

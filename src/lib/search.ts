import { createSignal } from "solid-js";
import type { BookmarkCategory } from "./bookmarks";

export interface SearchIndexEntry {
  id: string;
  category: BookmarkCategory;
  name: { id: string; en: string };
  keywords: { id: string; en: string };
}

export interface SearchResult {
  id: string;
  category: BookmarkCategory;
  name: { id: string; en: string };
  snippet: string;
}

let searchIndex: SearchIndexEntry[] = [];

export function setSearchIndex(entries: SearchIndexEntry[]) {
  searchIndex = entries;
}

function matchEntry(
  entry: SearchIndexEntry,
  query: string,
  lang: "id" | "en"
): SearchResult | null {
  const q = query.toLowerCase();
  const name = entry.name[lang].toLowerCase();
  const keywords = entry.keywords[lang].toLowerCase();

  if (name.includes(q) || keywords.includes(q)) {
    let snippet = entry.name[lang];
    const kwMatch = entry.keywords[lang]
      .split(",")
      .map((k) => k.trim())
      .find((k) => k.toLowerCase().includes(q));
    if (kwMatch) snippet = kwMatch;
    return {
      id: entry.id,
      category: entry.category,
      name: entry.name,
      snippet,
    };
  }
  return null;
}

export function searchEntries(
  query: string,
  lang: "id" | "en" = "en"
): SearchResult[] {
  if (!query.trim()) return [];
  return searchIndex
    .map((e) => matchEntry(e, query, lang))
    .filter((r): r is SearchResult => r !== null);
}

// Debounced search hook
export function createDebouncedSearch(lang: () => "id" | "en") {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal<SearchResult[]>([]);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const handleInput = (value: string) => {
    setQuery(value);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setResults(searchEntries(value, lang()));
    }, 150);
  };

  return { query, results, handleInput };
}

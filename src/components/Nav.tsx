import { useLocation, A } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { Heart, Menu, X } from "lucide-solid";
import ThemeToggle from "~/components/ThemeToggle";
import LanguageToggle from "~/components/LanguageToggle";
import { useI18n } from "~/lib/i18n";
import { useBookmarks } from "~/lib/bookmarks";

interface NavLink {
  href: string;
  labelKey: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/characters", labelKey: "nav.characters" },
  { href: "/crops", labelKey: "nav.crops" },
  { href: "/recipes", labelKey: "nav.recipes" },
  { href: "/festivals", labelKey: "nav.festivals" },
  { href: "/events", labelKey: "nav.events" },
  { href: "/guides", labelKey: "nav.guides" },
  { href: "/lists", labelKey: "nav.lists" },
];

export default function Nav() {
  const location = useLocation();
  const { t } = useI18n();
  const { getAll } = useBookmarks();
  const [menuOpen, setMenuOpen] = createSignal(false);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(path + "/");

  const desktopLinkClass = (path: string) =>
    `px-3 py-1.5 rounded-md text-sm transition-colors ${
      isActive(path)
        ? "text-accent font-medium"
        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
    }`;

  const mobileLinkClass = (path: string) =>
    `flex items-center px-3 py-3 rounded-lg text-sm transition-colors ${
      isActive(path)
        ? "text-accent font-medium bg-accent/5"
        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
    }`;

  const bookmarkCount = () => getAll().length;

  return (
    <nav class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div class="flex items-center h-14 gap-4">

          {/* Logo */}
          <A
            href="/"
            class="flex-shrink-0 text-slate-900 dark:text-white font-bold text-sm sm:text-base tracking-tight hover:text-accent transition-colors"
          >
            SoS FoMT
          </A>

          {/* Divider — desktop */}
          <div class="hidden md:block h-5 w-px bg-slate-200 dark:bg-slate-700" />

          {/* Desktop nav links */}
          <ul class="hidden md:flex items-center gap-0.5 flex-1">
            <For each={NAV_LINKS}>
              {(link) => (
                <li>
                  <A href={link.href} class={desktopLinkClass(link.href)}>
                    {t(link.labelKey)}
                  </A>
                </li>
              )}
            </For>
          </ul>

          {/* Right-side controls */}
          <div class="ml-auto flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />

            {/* Bookmarks icon */}
            <A
              href="/bookmarks"
              class={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                isActive("/bookmarks")
                  ? "text-accent"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              aria-label={t("nav.bookmarks")}
              title={t("nav.bookmarks")}
            >
              <Heart class="h-5 w-5" fill="currentColor" />
              {bookmarkCount() > 0 && (
                <span class="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.1rem] h-[1.1rem] rounded-full bg-accent text-white text-[10px] font-bold px-0.5">
                  {bookmarkCount() > 99 ? "99+" : bookmarkCount()}
                </span>
              )}
            </A>

            {/* Hamburger — mobile only */}
            <button
              class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen()}
            >
              {menuOpen() ? <X class="h-5 w-5" /> : <Menu class="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          class={`md:hidden overflow-hidden transition-all duration-200 ${menuOpen() ? "max-h-screen pb-3" : "max-h-0"}`}
        >
          <ul class="flex flex-col gap-0.5 border-t border-slate-200 dark:border-slate-700 pt-2">
            <For each={NAV_LINKS}>
              {(link) => (
                <li>
                  <A
                    href={link.href}
                    class={mobileLinkClass(link.href)}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(link.labelKey)}
                  </A>
                </li>
              )}
            </For>
            <li class="mt-1 pt-1 border-t border-slate-200 dark:border-slate-700">
              <A
                href="/bookmarks"
                class={mobileLinkClass("/bookmarks")}
                onClick={() => setMenuOpen(false)}
              >
                <span class="flex-1">{t("nav.bookmarks")}</span>
                {bookmarkCount() > 0 && (
                  <span class="inline-flex items-center justify-center rounded-full bg-accent text-white text-xs font-bold px-1.5 py-0.5">
                    {bookmarkCount()}
                  </span>
                )}
              </A>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

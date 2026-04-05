import { useLocation, A } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import ThemeToggle from "~/components/ThemeToggle";
import LanguageToggle from "~/components/LanguageToggle";
import { useI18n } from "~/lib/i18n";
import { useBookmarks } from "~/lib/bookmarks";

interface NavLink {
  href: string;
  labelKey: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", labelKey: "nav.home" },
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

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded text-sm font-medium transition-colors ${
      isActive(path)
        ? "bg-green-700 dark:bg-green-800 text-white"
        : "text-gray-100 hover:bg-green-700/60 dark:hover:bg-green-900/60"
    }`;

  const bookmarkCount = () => getAll().length;

  return (
    <nav class="bg-green-800 dark:bg-slate-900 transition-colors duration-300 shadow-md">
      <div class="container mx-auto px-4">
        {/* Top bar */}
        <div class="flex items-center h-14 gap-2">
          {/* Logo / title */}
          <A
            href="/"
            class="flex-shrink-0 text-white font-bold text-base sm:text-lg tracking-tight hover:opacity-90 transition-opacity"
          >
            SoS FoMT
          </A>

          {/* Desktop nav links */}
          <ul class="hidden md:flex items-center gap-0.5 ml-4">
            <For each={NAV_LINKS}>
              {(link) => (
                <li>
                  <A href={link.href} class={linkClass(link.href)}>
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

            {/* Bookmarks icon with count badge */}
            <A
              href="/bookmarks"
              class={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                isActive("/bookmarks")
                  ? "bg-green-700 dark:bg-green-800 text-white"
                  : "text-gray-100 hover:bg-green-700/60 dark:hover:bg-green-900/60"
              }`}
              aria-label={t("nav.bookmarks")}
              title={t("nav.bookmarks")}
            >
              {/* Heart icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              {/* Count badge */}
              {bookmarkCount() > 0 && (
                <span class="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.1rem] h-[1.1rem] rounded-full bg-amber-400 text-slate-900 text-[10px] font-bold px-0.5">
                  {bookmarkCount() > 99 ? "99+" : bookmarkCount()}
                </span>
              )}
            </A>

            {/* Hamburger button — mobile only */}
            <button
              class="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-green-700/60 dark:hover:bg-green-900/60 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen()}
            >
              <span
                class={`block w-5 h-0.5 bg-white transition-transform duration-200 origin-center ${menuOpen() ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                class={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${menuOpen() ? "opacity-0" : ""}`}
              />
              <span
                class={`block w-5 h-0.5 bg-white transition-transform duration-200 origin-center ${menuOpen() ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          class={`md:hidden overflow-hidden transition-all duration-200 ${menuOpen() ? "max-h-96 pb-3" : "max-h-0"}`}
        >
          <ul class="flex flex-col gap-1">
            <For each={NAV_LINKS}>
              {(link) => (
                <li>
                  <A
                    href={link.href}
                    class={linkClass(link.href)}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(link.labelKey)}
                  </A>
                </li>
              )}
            </For>
            <li>
              <A
                href="/bookmarks"
                class={linkClass("/bookmarks")}
                onClick={() => setMenuOpen(false)}
              >
                {t("nav.bookmarks")}
                {bookmarkCount() > 0 && (
                  <span class="ml-2 inline-flex items-center justify-center rounded-full bg-amber-400 text-slate-900 text-xs font-bold px-1.5 py-0.5">
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

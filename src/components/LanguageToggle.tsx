import { useI18n } from "~/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <button
      type="button"
      onClick={() => setLang(lang() === "en" ? "id" : "en")}
      aria-label="Toggle language"
      class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
    >
      <span aria-hidden="true">
        {lang() === "en" ? "🇮🇩" : "🇬🇧"}
      </span>
      {lang() === "en" ? "ID" : "EN"}
    </button>
  );
}

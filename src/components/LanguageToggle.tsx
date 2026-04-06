import { Globe } from "lucide-solid";
import { useI18n } from "~/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <button
      type="button"
      onClick={() => setLang(lang() === "en" ? "id" : "en")}
      aria-label={`Switch language (current: ${lang() === "en" ? "English" : "Indonesia"})`}
      title={`Language: ${lang() === "en" ? "English" : "Indonesia"}`}
      class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:border-accent hover:text-accent dark:hover:border-accent dark:hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Globe class="h-4 w-4" />
      {lang() === "en" ? "ID" : "EN"}
    </button>
  );
}

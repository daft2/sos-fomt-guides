import { createContext, useContext, ParentComponent } from "solid-js";
import { createStorageSignal } from "./createStorageSignal";
import { en } from "~/data/i18n/en";
import { id } from "~/data/i18n/id";

export type Locale = "id" | "en";

const translations: Record<Locale, Record<string, string>> = { en, id };

interface I18nContextValue {
  lang: () => Locale;
  setLang: (lang: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>();

export const I18nProvider: ParentComponent = (props) => {
  const [lang, setLang] = createStorageSignal<Locale>("locale", "id");

  const t = (key: string): string => {
    return translations[lang()][key] ?? translations["id"][key] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {props.children}
    </I18nContext.Provider>
  );
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es.json";
import en from "./locales/en.json";
import ca from "./locales/ca.json";

const pathDetector = {
  type: "languageDetector" as const,
  init() {},
  detect(): string {
    const path = window.location.pathname;
    if (path.startsWith("/en")) return "en";
    if (path.startsWith("/ca")) return "ca";
    return "es";
  },
  cacheUserLanguage() {},
};

i18n
  .use(pathDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      ca: { translation: ca },
    },
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

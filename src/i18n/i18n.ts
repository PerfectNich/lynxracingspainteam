import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es.json";
import en from "./locales/en.json";

const pathDetector = {
  type: "languageDetector" as const,
  init() {},
  detect(): string {
    return window.location.pathname.startsWith("/en") ? "en" : "es";
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
    },
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

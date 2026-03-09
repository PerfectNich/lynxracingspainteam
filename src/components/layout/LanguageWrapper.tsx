import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function LanguageWrapper() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useLayoutEffect(() => {
    const lang = location.pathname.startsWith("/en") ? "en" : "es";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [location.pathname, i18n]);

  return <Outlet />;
}

import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function LanguageWrapper() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useLayoutEffect(() => {
    let lang = "es";
    if (/^\/en(?:\/|$)/.test(location.pathname)) lang = "en";
    else if (/^\/ca(?:\/|$)/.test(location.pathname)) lang = "ca";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [location.pathname, i18n]);

  return <Outlet />;
}

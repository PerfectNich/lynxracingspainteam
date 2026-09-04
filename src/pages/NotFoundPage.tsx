import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const prefix = i18n.language === "en" ? "/en" : i18n.language === "ca" ? "/ca" : "";
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center gap-5 px-6 py-16 text-center">
      <p className="text-5xl font-black text-lynx-orange">404</p>
      <h1 className="text-2xl font-bold text-white">{t("interface.notFound")}</h1>
      <p className="text-lynx-text/75">{t("interface.notFoundText")}</p>
      <Link to={`${prefix}/`} className="rounded-lg border border-lynx-orange px-6 py-3 font-bold">{t("nav.home")}</Link>
    </section>
  );
}

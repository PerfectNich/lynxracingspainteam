import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaCopy } from "react-icons/fa";
import sponsors from "../data/sponsors.json";
import type { Sponsor } from "../types";
import { assetUrl } from "../utils/assetUrl";

function SponsorCard({ sponsor, featured = false }: { sponsor: Sponsor; featured?: boolean }) {
  const { t, i18n } = useTranslation();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const lang = i18n.language === "en" ? "en" : i18n.language === "ca" ? "ca" : "es";
  const localized = (text?: Partial<Record<"es" | "en" | "ca", string>>) => text?.[lang] || text?.es;
  const offer = sponsor.discount;
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const activeOffer = offer && (!offer.expiresOn || offer.expiresOn >= today) ? offer : null;

  async function copyCode() {
    if (!activeOffer?.code) return;
    try {
      await navigator.clipboard.writeText(activeOffer.code);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <article className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border ${featured ? "border-lynx-orange/50 bg-gradient-to-br from-lynx-orange/10 to-lynx-dark-card md:grid md:grid-cols-2" : "border-lynx-border bg-lynx-dark-card"}`}>
      <div className={`flex items-center justify-center border-b border-white/5 bg-black/20 p-8 ${featured ? "min-h-64 md:border-b-0 md:border-r" : "h-48"}`}>
        <img src={assetUrl(sponsor.logo)} alt={sponsor.name} loading={featured ? "eager" : "lazy"} className="max-h-36 max-w-full object-contain" />
      </div>
      <div className="flex flex-1 flex-col items-start p-6 sm:p-8">
        {featured && <p className="mb-3 text-xs uppercase tracking-[0.22em] text-lynx-orange">{t("home.main_sponsor_label")}</p>}
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-orbitron)" }}>{sponsor.name}</h2>
        <p className="mt-3 mb-6 text-lynx-text/75">{localized(sponsor.description) || t("sponsors.partner_description", { name: sponsor.name })}</p>
        {activeOffer && (
          <div className="mb-6 w-full rounded-xl border border-lynx-orange/30 bg-lynx-orange/5 p-4">
            <p className="font-bold text-lynx-orange">{localized(activeOffer.description)}</p>
            {activeOffer.code && <div className="mt-3 flex flex-wrap items-center gap-3">
              <code className="select-all break-all rounded bg-black/30 px-3 py-2 text-white">{activeOffer.code}</code>
              <button type="button" onClick={copyCode} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-lynx-orange/40 px-3 py-2 text-sm text-white hover:bg-lynx-orange/15 focus-visible:outline-2 focus-visible:outline-lynx-orange">
                <FaCopy aria-hidden="true" />{t(copyState === "copied" ? "sponsors.copied" : "sponsors.copy")}
              </button>
            </div>}
            <p role="status" className="mt-2 text-sm text-lynx-text/70">{copyState === "failed" ? t("sponsors.copy_failed") : copyState === "copied" ? t("sponsors.copied") : ""}</p>
            {localized(activeOffer.terms) && <p className="mt-2 text-sm text-lynx-text/70">{localized(activeOffer.terms)}</p>}
            {activeOffer.expiresOn && <p className="mt-2 text-sm text-lynx-text/70">{t("sponsors.expires", { date: new Intl.DateTimeFormat(lang).format(new Date(`${activeOffer.expiresOn}T12:00:00`)) })}</p>}
          </div>
        )}
        {sponsor.url && <a href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={`${t("sponsors.visit")} · ${sponsor.name}`} className="mt-auto inline-flex min-h-11 items-center gap-3 rounded-lg border border-lynx-orange/40 px-4 py-2 font-semibold text-lynx-orange hover:bg-lynx-orange/10 focus-visible:outline-2 focus-visible:outline-lynx-orange">{t("sponsors.visit")}<FaArrowRight aria-hidden="true" /></a>}
      </div>
    </article>
  );
}

export function SponsorsPage() {
  const { t } = useTranslation();
  const visible = (sponsors as Sponsor[]).filter((sponsor) => sponsor.published !== false);
  const main = visible.find((sponsor) => sponsor.name === "RM Motor");
  return (
    <div className="px-6 pb-20">
      <header className="mx-auto max-w-3xl py-20 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-lynx-orange">{t("sponsors.label")}</p>
        <h1 className="text-4xl font-black text-white sm:text-6xl" style={{ fontFamily: "var(--font-orbitron)" }}>{t("nav.sponsors")}</h1>
        <p className="mt-6 text-lg text-lynx-text/70">{t("sponsors.intro")}</p>
      </header>
      <div className="mx-auto max-w-6xl space-y-8">
        {main && <SponsorCard sponsor={main} featured />}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.filter((sponsor) => sponsor !== main).map((sponsor) => <SponsorCard key={sponsor.name} sponsor={sponsor} />)}
        </div>
      </div>
    </div>
  );
}

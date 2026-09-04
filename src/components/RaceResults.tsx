import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { raceResults } from "../data/race-results";

export function RaceResults({ featured = false }: { featured?: boolean }) {
  const { t, i18n } = useTranslation();
  const prefix = i18n.language === "en" ? "/en" : i18n.language === "ca" ? "/ca" : "";
  const results = featured
    ? raceResults.filter((entry) => entry.featured)
    : [...raceResults].sort((a, b) => b.year - a.year);

  if (featured && results.length === 0) return null;

  return (
    <section className={featured ? "min-w-0 py-4" : "mx-auto max-w-5xl px-6 py-10"} aria-labelledby={featured ? "featured-result" : "race-history"}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 id={featured ? "featured-result" : "race-history"} className="text-xl font-bold text-white">
          {t(featured ? "racing.featured" : "racing.history")}
        </h2>
        <Link to={`${prefix}/palmares`} className="text-sm font-semibold text-lynx-orange hover:underline">
          {t("nav.palmares")} &rarr;
        </Link>
      </div>
      <div className="divide-y divide-lynx-border border-y border-lynx-border">
        {results.map((entry) => (
          <article key={entry.id} className="flex items-start gap-4 py-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-lynx-border text-xl font-black text-lynx-orange">
              P{entry.pos}
            </span>
            <div className="min-w-0">
              <p className="mb-1 text-xs text-lynx-text/65">{entry.year} · {entry.simulator} · <span className="uppercase">{entry.car}</span></p>
              <h3 className="font-bold text-white">{entry.event}</h3>
              <p className="mt-2 text-sm leading-relaxed text-lynx-text/80">{entry.drivers.join(" · ")}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

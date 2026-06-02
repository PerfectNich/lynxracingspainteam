import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GradientDots } from "@/components/ui/gradient-dots";
import results from "../data/results.json";
import type { ResultsCategory } from "../types";

function posStyle(pos: number) {
  if (pos === 1) return { badge: "#EAB308", text: "text-yellow-400" };
  if (pos === 2) return { badge: "#CBD5E1", text: "text-slate-300" };
  if (pos === 3) return { badge: "#CD7C2F", text: "text-amber-500" };
  return { badge: "#6B7280", text: "text-zinc-400" };
}

function ResultsTable({
  category,
  delay = 0,
}: {
  category: ResultsCategory;
  delay?: number;
}) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h2
        className="text-2xl md:text-3xl font-black text-white mb-6"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        {category.title}
      </h2>

      <div className="md:hidden flex flex-col gap-3">
        {category.results.map((result, i) => {
          const style = posStyle(result.pos);
          return (
            <motion.div
              key={`${result.driver}-${result.pos}-mobile`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + i * 0.05 }}
              className="rounded-xl border border-lynx-border bg-lynx-dark-card p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-black font-black text-xs flex-shrink-0"
                  style={{
                    backgroundColor: style.badge,
                    fontFamily: "var(--font-orbitron)",
                  }}
                >
                  {result.pos}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-white font-semibold leading-tight"
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontSize: "1rem",
                    }}
                  >
                    {result.driver}
                  </p>
                  <p
                    className="text-lynx-text/60 text-sm"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {result.simulator}
                  </p>
                </div>
                <span
                  className={`ml-auto font-black ${style.text}`}
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {result.points}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p
                    className="text-lynx-orange uppercase tracking-widest text-[11px]"
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontWeight: 700,
                    }}
                  >
                    {t("results.total_time")}
                  </p>
                  <p
                    className="text-lynx-text/70"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {result.time}
                  </p>
                </div>
                <div>
                  <p
                    className="text-lynx-orange uppercase tracking-widest text-[11px]"
                    style={{
                      fontFamily: "var(--font-rajdhani)",
                      fontWeight: 700,
                    }}
                  >
                    {t("results.points")}
                  </p>
                  <p
                    className={`font-black ${style.text}`}
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    {result.points}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="hidden md:block rounded-xl overflow-hidden border border-lynx-border">
        <div
          className="grid gap-0 text-lynx-orange text-xs tracking-widest uppercase px-4 py-3 border-b border-lynx-border bg-lynx-dark-card"
          style={{
            gridTemplateColumns: "3rem 1fr 1fr 1fr 3rem",
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 700,
          }}
        >
          <span className="text-center">{t("results.pos")}</span>
          <span>{t("results.driver")}</span>
          <span>{t("results.simulator")}</span>
          <span>{t("results.total_time")}</span>
          <span className="text-center">{t("results.points")}</span>
        </div>

        {category.results.map((result, i) => {
          const style = posStyle(result.pos);
          return (
            <motion.div
              key={`${result.driver}-${result.pos}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + i * 0.05 }}
              className="grid items-center px-4 py-3 border-b border-lynx-border/50 last:border-0 hover:bg-white/5 transition-colors duration-200"
              style={{ gridTemplateColumns: "3rem 1fr 1fr 1fr 3rem" }}
            >
              <div className="flex justify-center">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-black font-black text-xs"
                  style={{
                    backgroundColor: style.badge,
                    fontFamily: "var(--font-orbitron)",
                  }}
                >
                  {result.pos}
                </span>
              </div>

              <span
                className="text-white font-semibold"
                style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1rem" }}
              >
                {result.driver}
              </span>
              <span
                className="text-lynx-text/60"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                {result.simulator}
              </span>
              <span
                className="text-lynx-text/60"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                {result.time}
              </span>
              <span
                className={`text-center font-black ${style.text}`}
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {result.points}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function ResultHighlight({
  title,
  driver,
  simulator,
  pos,
  points,
}: {
  title: string;
  driver: string;
  simulator: string;
  pos: number;
  points: number;
}) {
  const style = posStyle(pos);

  return (
    <div className="rounded-2xl border border-lynx-border bg-lynx-dark-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-black"
          style={{ backgroundColor: style.badge }}
        >
          <FaTrophy size={14} />
        </span>
        <div>
          <p
            className="text-xs uppercase tracking-[0.25em] text-lynx-orange"
            style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
          >
            {title}
          </p>
          <p className={`text-lg font-black ${style.text}`} style={{ fontFamily: "var(--font-orbitron)" }}>
            P{pos}
          </p>
        </div>
      </div>

      <p className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-orbitron)" }}>
        {driver}
      </p>
      <p className="mt-1 text-lynx-text/65" style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1rem" }}>
        {simulator}
      </p>
      <p
        className="mt-4 text-sm uppercase tracking-[0.22em] text-lynx-text/55"
        style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
      >
        {points} pts
      </p>
    </div>
  );
}

export function ResultsPage() {
  const { t, i18n } = useTranslation();
  const { endurance, rally } = results as {
    endurance: ResultsCategory;
    rally: ResultsCategory;
  };
  const prefix = i18n.language === "en" ? "/en" : i18n.language === "ca" ? "/ca" : "";
  const palmaresPath = `${prefix}/palmares`;
  const highlights = [
    { title: endurance.title, ...endurance.results[0] },
    { title: rally.title, ...rally.results[0] },
  ];

  return (
    <div className="overflow-x-hidden">
      <div className="relative overflow-hidden py-24 px-6 text-center border-b border-lynx-border">
        <div className="absolute inset-0 opacity-15">
          <GradientDots
            dotSize={5}
            spacing={14}
            duration={35}
            colorCycleDuration={7}
            backgroundColor="#0b0b0b"
          />
        </div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,106,0,0.5) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p
            className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
          >
            {t("results.hero_label")}
          </p>
          <h1
            className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("results.page_title")}
          </h1>
          <p
            className="mx-auto mt-4 max-w-2xl text-lynx-text/60"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.05rem" }}
          >
            {t("results.subtitle")}
          </p>
        </motion.div>
      </div>

      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-14">
          <div className="grid gap-5 md:grid-cols-2">
            {highlights.map((highlight) => (
              <ResultHighlight
                key={`${highlight.title}-${highlight.driver}`}
                title={highlight.title}
                driver={highlight.driver}
                simulator={highlight.simulator}
                pos={highlight.pos}
                points={highlight.points}
              />
            ))}
          </div>

          <ResultsTable category={endurance} delay={0} />
          <ResultsTable category={rally} delay={0.1} />

          <div className="rounded-2xl border border-lynx-border bg-lynx-dark-card px-6 py-6 text-center">
            <p
              className="mb-3 text-xs uppercase tracking-[0.35em] text-lynx-orange"
              style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
            >
              {t("results.cta_label")}
            </p>
            <p
              className="mx-auto max-w-2xl text-lynx-text/70"
              style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.02rem" }}
            >
              {t("results.cta_text")}
            </p>
            <Link
              to={palmaresPath}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-lynx-orange px-6 py-3 text-sm tracking-widest text-lynx-orange transition-all duration-300 hover:bg-lynx-orange hover:text-black"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {t("results.cta_link")}
              <FaArrowRight className="ml-2" size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

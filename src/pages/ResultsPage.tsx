import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GradientDots } from "@/components/ui/gradient-dots";
import results from "../data/results.json";
import type { ResultsCategory } from "../types";

function posStyle(pos: number) {
  if (pos === 1) return { badge: "#EAB308", text: "text-yellow-400" };
  if (pos === 2) return { badge: "#CBD5E1", text: "text-slate-300" };
  if (pos === 3) return { badge: "#CD7C2F", text: "text-amber-500" };
  return { badge: "#6B7280", text: "text-zinc-400" };
}

function ResultsTable({ category, delay = 0 }: { category: ResultsCategory; delay?: number }) {
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
        style={{ fontFamily: 'var(--font-orbitron)' }}
      >
        {category.title}
      </h2>

      <div className="rounded-xl overflow-hidden border border-lynx-border">
        {/* Header */}
        <div
          className="grid gap-0 text-lynx-orange text-xs tracking-widest uppercase px-4 py-3 border-b border-lynx-border bg-lynx-dark-card"
          style={{ gridTemplateColumns: '3rem 1fr 1fr 1fr 3rem', fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}
        >
          <span className="text-center">{t("results.pos")}</span>
          <span>{t("results.driver")}</span>
          <span>{t("results.simulator")}</span>
          <span>{t("results.total_time")}</span>
          <span className="text-center">{t("results.points")}</span>
        </div>

        {/* Rows */}
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
              style={{ gridTemplateColumns: '3rem 1fr 1fr 1fr 3rem' }}
            >
              {/* Posición */}
              <div className="flex justify-center">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-black font-black text-xs"
                  style={{ backgroundColor: style.badge, fontFamily: 'var(--font-orbitron)' }}
                >
                  {result.pos}
                </span>
              </div>

              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '1rem' }}>
                {result.driver}
              </span>
              <span className="text-lynx-text/60" style={{ fontFamily: 'var(--font-rajdhani)' }}>
                {result.simulator}
              </span>
              <span className="text-lynx-text/60" style={{ fontFamily: 'var(--font-rajdhani)' }}>
                {result.time}
              </span>
              <span className={`text-center font-black ${style.text}`} style={{ fontFamily: 'var(--font-orbitron)' }}>
                {result.points}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function ResultsPage() {
  const { t } = useTranslation();
  const { endurance, rally } = results as { endurance: ResultsCategory; rally: ResultsCategory };

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <div className="relative overflow-hidden py-24 px-6 text-center border-b border-lynx-border">
        <div className="absolute inset-0 opacity-15">
          <GradientDots dotSize={5} spacing={14} duration={35} colorCycleDuration={7} backgroundColor="#0b0b0b" />
        </div>
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,106,0,0.5) 0%, transparent 70%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}>
            Clasificaciones
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}>
            {t("results.page_title")}
          </h1>
        </motion.div>
      </div>

      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-14">
          <ResultsTable category={endurance} delay={0} />
          <ResultsTable category={rally} delay={0.1} />
        </div>
      </section>
    </div>
  );
}

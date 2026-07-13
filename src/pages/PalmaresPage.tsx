import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { assetUrl } from "../utils/assetUrl";
import { GradientDots } from "@/components/ui/gradient-dots";

interface PalmaresEntry {
  pos: number;
  event: string;
  simulator: string;
  drivers: string[];
  car: string;
  year: number;
}

const DATA: PalmaresEntry[] = [
  {
    pos: 1,
    event: "Resistencia 4h Barcelona - Benéfica de La Cueva",
    simulator: "ACC",
    drivers: ["Kiko Ribes", "Xavier Sobrerroca"],
    car: "porsche",
    year: 2023,
  },
  {
    pos: 1,
    event: "Campeonato CNE II - VRGirona",
    simulator: "ACC",
    drivers: ["Juan Serrano", "Josh Mopar", "Xavier Sobrerroca"],
    car: "aston",
    year: 2023,
  },
  {
    pos: 2,
    event: "Resistencia 8h Suzuka - CER-V",
    simulator: "ACC",
    drivers: ["Dani Gala", "Juan Serrano", "Jorge Pola"],
    car: "aston",
    year: 2022,
  },
  {
    pos: 3,
    event: "Resistencia 9h Kyalami - CER-V",
    simulator: "ACC",
    drivers: ["Kiko Ribes", "Juan Serrano"],
    car: "aston",
    year: 2022,
  },
  {
    pos: 4,
    event: "Endurance 4h Titanium Red",
    simulator: "ACC",
    drivers: ["Jordi Capdevila", "Francisco Sierra"],
    car: "ferrari",
    year: 2025,
  },
  {
    pos: 7,
    event: "Resistencia 24h Nordschleife - Pitskill",
    simulator: "ACC",
    drivers: [
      "Jordi Capdevila",
      "Luis Ungo",
      "Juan Serrano",
      "Xavier Sobrerroca",
      "Albert Gombau",
    ],
    car: "ferrari",
    year: 2025,
  },
  {
    pos: 2,
    event: "Resistencia 24h Daytona",
    simulator: "iRacing",
    drivers: [
      "Jordi Capdevila",
      "Jesus Jimenez",
      "Francisco Sierra",
      "Luis Ungo",
      "Xavier Sobrerroca",
    ],
    car: "porsche",
    year: 2026,
  },
  {
    pos: 2,
    event: "Resistencia 24h Nordschleife",
    simulator: "iRacing",
    drivers: [
      "Relja Ljubobratovic",
      "Marc Garcia",
      "Rubén Juarez",
      "Josh Mopar",
      "Juan Serrano",
      "Juanjo Morales",
    ],
    car: "ford",
    year: 2026,
  },
  {
    pos: 5,
    event: "24H de Spa - Orange",
    simulator: "iRacing",
    drivers: [
      "Albert Gombau",
      "Juanjo Morales",
      "Marc Garcia",
      "Angel Alvarado",
      "Relja Ljubobratovic",
    ],
    car: "acura",
    year: 2026,
  },
  {
    pos: 25,
    event: "24H de Spa - Blue",
    simulator: "iRacing",
    drivers: [
      "Francisco Sierra",
      "Jordi Capdevila",
      "Luis Ungo",
      "Emiliano Sturniolo",
      "Jesus Jimenez",
    ],
    car: "ferrari",
    year: 2026,
  },
  {
    pos: 2,
    event: "Resistencia 12h Sebring",
    simulator: "iRacing",
    drivers: ["Nacho Jarrin", "Albert Gombau", "Fran Gambin"],
    car: "porsche",
    year: 2026,
  },
  {
    pos: 3,
    event: "Resistencia 12h Mount Panorama",
    simulator: "iRacing",
    drivers: ["Angel Alvarado", "Albert Gombau", "Nacho Jarrin"],
    car: "mclaren",
    year: 2026,
  },
  {
    pos: 4,
    event: "Resistencia 6h Watkins Glen",
    simulator: "iRacing",
    drivers: ["Albert Gombau", "Lalo Sanchez"],
    car: "acura",
    year: 2024,
  },
  {
    pos: 4,
    event: "Resistencia 6h Sebring",
    simulator: "iRacing",
    drivers: ["Jordi Capdevila", "Francisco Sierra"],
    car: "porsche",
    year: 2026,
  },
];

const ordered = [...DATA].sort((a, b) => b.year - a.year || a.pos - b.pos);

function podiumStyle(pos: number): { bg: string; badge: string; text: string } {
  if (pos === 1) {
    return {
      bg: "linear-gradient(135deg, rgba(234,179,8,0.25) 0%, rgba(161,122,5,0.12) 100%)",
      badge: "#EAB308",
      text: "text-yellow-400",
    };
  }

  if (pos === 2) {
    return {
      bg: "linear-gradient(135deg, rgba(203,213,225,0.22) 0%, rgba(148,163,184,0.10) 100%)",
      badge: "#CBD5E1",
      text: "text-slate-300",
    };
  }

  if (pos === 3) {
    return {
      bg: "linear-gradient(135deg, rgba(194,120,50,0.28) 0%, rgba(146,82,20,0.12) 100%)",
      badge: "#CD7C2F",
      text: "text-amber-500",
    };
  }

  return {
    bg: "linear-gradient(135deg, rgba(60,60,70,0.30) 0%, rgba(30,30,35,0.15) 100%)",
    badge: "#6B7280",
    text: "text-zinc-400",
  };
}

function SummaryCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-lynx-border bg-lynx-dark-card px-5 py-4 text-center shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
      <p
        className="text-3xl font-black text-white"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        {value}
      </p>
      <p
        className="mt-2 text-xs uppercase tracking-[0.24em] text-lynx-text/60"
        style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
      >
        {label}
      </p>
    </div>
  );
}

function HighlightCard({ entry }: { entry: PalmaresEntry }) {
  const style = podiumStyle(entry.pos);

  return (
    <div
      className="rounded-[1.75rem] border border-lynx-border p-5"
      style={{ background: style.bg }}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-black text-black"
          style={{ backgroundColor: style.badge, fontFamily: "var(--font-orbitron)" }}
        >
          P{entry.pos}
        </span>
        <span
          className="text-xs uppercase tracking-[0.24em] text-lynx-text/60"
          style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
        >
          {entry.simulator} · {entry.year}
        </span>
      </div>

      <h3
        className="text-lg font-black text-white"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        {entry.event}
      </h3>
      <p
        className="mt-3 text-sm text-lynx-text/70"
        style={{ fontFamily: "var(--font-rajdhani)" }}
      >
        {entry.drivers.join(" · ")}
      </p>
    </div>
  );
}

function AccordionItem({ entry, index }: { entry: PalmaresEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const style = podiumStyle(entry.pos);
  const isFord = entry.car === "ford";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="overflow-hidden rounded-xl border border-lynx-border"
    >
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/5"
        style={{ background: open ? style.bg : "transparent" }}
      >
        <span
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-black text-black"
          style={{ background: style.badge, fontFamily: "var(--font-orbitron)" }}
        >
          P{entry.pos}
        </span>

        <div className="min-w-0 flex-1">
          <p
            className="font-bold text-white"
            style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.85rem" }}
          >
            {entry.event}
          </p>
          <p
            className="mt-0.5 text-xs text-lynx-text/50"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            {entry.simulator} · {entry.year}
          </p>
        </div>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-sm text-lynx-text/40"
        >
          <FaChevronDown />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="relative flex flex-col items-start gap-6 border-t border-lynx-border/50 px-5 py-6 sm:flex-row sm:items-center"
              style={{ background: style.bg }}
            >
              <span
                className={`pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-black ${style.text}`}
                style={{
                  fontFamily: "var(--font-orbitron)",
                  fontSize: "clamp(4rem, 10vw, 7rem)",
                  opacity: 0.15,
                  filter: "blur(3px)",
                  lineHeight: 1,
                }}
              >
                P{entry.pos}
              </span>

              <div className="relative z-10 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 p-3 shadow-lg">
                <img
                  src={assetUrl(`/marcas/${entry.car}.svg`)}
                  alt={entry.car}
                  className="max-h-full max-w-full object-contain"
                  style={
                    isFord
                      ? {
                          filter: "none",
                          backgroundColor: "#fff",
                          borderRadius: "999px",
                          padding: "0.3rem",
                        }
                      : { filter: "brightness(0) invert(1)" }
                  }
                />
              </div>

              <div className="relative z-10 flex-1">
                <p
                  className="mb-2 text-xs uppercase tracking-widest text-lynx-orange"
                  style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                >
                  {entry.drivers.length} {entry.drivers.length === 1 ? "piloto" : "pilotos"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.drivers.map((driver) => (
                    <span
                      key={driver}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-sm text-white"
                      style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
                    >
                      {driver}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PalmaresPage() {
  const { t } = useTranslation();
  const wins = DATA.filter((entry) => entry.pos === 1).length;
  const podiums = DATA.filter((entry) => entry.pos <= 3).length;
  const simulators = new Set(DATA.map((entry) => entry.simulator)).size;
  const seasons = new Set(DATA.map((entry) => entry.year)).size;
  const highlights = [...DATA].sort((a, b) => a.pos - b.pos || b.year - a.year).slice(0, 4);
  const columns = [
    { label: t("palmares.acc_label"), key: "ACC" },
    { label: t("palmares.iracing_label"), key: "iRacing" },
  ];

  return (
    <div className="overflow-x-hidden">
      <div className="relative overflow-hidden border-b border-lynx-border px-6 py-24 text-center">
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
            className="mb-3 text-xs uppercase tracking-[0.4em] text-lynx-orange"
            style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
          >
            {t("palmares.hero_label")}
          </p>
          <h1
            className="text-4xl font-black text-white md:text-6xl"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("palmares.page_title")}
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-lynx-text/60"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.05rem" }}
          >
            {t("palmares.intro")}
          </p>
        </motion.div>
      </div>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard value={String(wins)} label={t("palmares.stats.wins")} />
            <SummaryCard value={String(podiums)} label={t("palmares.stats.podiums")} />
            <SummaryCard value={String(simulators)} label={t("palmares.stats.simulators")} />
            <SummaryCard value={String(seasons)} label={t("palmares.stats.seasons")} />
          </div>

          <div className="mb-12">
            <p
              className="mb-3 text-xs uppercase tracking-[0.35em] text-lynx-orange"
              style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
            >
              {t("palmares.highlights_label")}
            </p>
            <div className="grid gap-5 lg:grid-cols-2">
              {highlights.map((entry) => (
                <HighlightCard key={`${entry.event}-${entry.year}-highlight`} entry={entry} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            {columns.map((column) => {
              const entries = ordered.filter((entry) => entry.simulator === column.key);

              return (
                <div key={column.key} className="flex flex-col gap-3">
                  <h2
                    className="mb-1 text-xs uppercase tracking-[0.4em] text-lynx-orange"
                    style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                  >
                    {column.label}
                  </h2>
                  {entries.map((entry, index) => (
                    <AccordionItem key={`${entry.event}-${entry.year}`} entry={entry} index={index} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

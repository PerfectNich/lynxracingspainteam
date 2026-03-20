import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
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
  // ACC
  { pos: 1, event: "Resistencia 4h Barcelona – Benéfica de La Cueva", simulator: "ACC", drivers: ["Kiko Ribes", "Xavier Sobrerroca"], car: "porsche", year: 2023 },
  { pos: 1, event: "Campeonato CNE II – VRGirona", simulator: "ACC", drivers: ["Juan Serrano", "Josh Mopar", "Xavier Sobrerroca"], car: "aston", year: 2023 },
  { pos: 2, event: "Resistencia 8h Suzuka – CER-V", simulator: "ACC", drivers: ["Dani Gala", "Juan Serrano", "Jorge Pola"], car: "aston", year: 2022 },
  { pos: 3, event: "Resistencia 9h Kyalami – CER-V", simulator: "ACC", drivers: ["Kiko Ribes", "Juan Serrano"], car: "aston", year: 2022 },
  { pos: 4, event: "Endurance 4h Titanium Red", simulator: "ACC", drivers: ["Jordi Capdevila", "Francisco Sierra"], car: "ferrari", year: 2025 },
  { pos: 7, event: "Resistencia 24h Nordschleife – Pitskill", simulator: "ACC", drivers: ["Jordi Capdevila", "Luis Ungo", "Juan Serrano", "Xavier Sobrerroca", "Albert Gombau"], car: "ferrari", year: 2025 },
  // iRacing
  { pos: 2, event: "Resistencia 24h Daytona", simulator: "iRacing", drivers: ["Jordi Capdevila", "Jesús Jiménez", "Francisco Sierra", "Luis Ungo", "Xavier Sobrerroca"], car: "porsche", year: 2026 },
  { pos: 3, event: "Resistencia 12h Mount Panorama", simulator: "iRacing", drivers: ["Angel Alvarado", "Albert Gombau", "Nacho Jarrín"], car: "mclaren", year: 2026 },
  { pos: 4, event: "Resistencia 6h Watkins Glen", simulator: "iRacing", drivers: ["Albert Gombau", "Lalo Sanchez"], car: "acura", year: 2024 },
  { pos: 4, event: "Resistencia 6h Sebring", simulator: "iRacing", drivers: ["Jordi Capdevila", "Francisco Sierra"], car: "porsche", year: 2026 },
];

// Ordenar: podio primero, luego por posición
const sorted = [...DATA].sort((a, b) => a.pos - b.pos);

function podiumStyle(pos: number): { bg: string; badge: string; text: string } {
  if (pos === 1) return {
    bg: "linear-gradient(135deg, rgba(234,179,8,0.25) 0%, rgba(161,122,5,0.12) 100%)",
    badge: "#EAB308",
    text: "text-yellow-400",
  };
  if (pos === 2) return {
    bg: "linear-gradient(135deg, rgba(203,213,225,0.22) 0%, rgba(148,163,184,0.10) 100%)",
    badge: "#CBD5E1",
    text: "text-slate-300",
  };
  if (pos === 3) return {
    bg: "linear-gradient(135deg, rgba(194,120,50,0.28) 0%, rgba(146,82,20,0.12) 100%)",
    badge: "#CD7C2F",
    text: "text-amber-500",
  };
  return {
    bg: "linear-gradient(135deg, rgba(60,60,70,0.30) 0%, rgba(30,30,35,0.15) 100%)",
    badge: "#6B7280",
    text: "text-zinc-400",
  };
}

function AccordionItem({ entry, index }: { entry: PalmaresEntry; index: number }) {
  const [open, setOpen] = useState(false);
  const style = podiumStyle(entry.pos);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-xl overflow-hidden border border-lynx-border"
    >
      {/* Header – siempre visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors duration-200"
        style={{ background: open ? style.bg : 'transparent' }}
      >
        {/* Badge posición */}
        <span
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-black font-black text-sm"
          style={{ background: style.badge, fontFamily: 'var(--font-orbitron)' }}
        >
          P{entry.pos}
        </span>

        {/* Nombre del evento */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold truncate"
            style={{ fontFamily: 'var(--font-orbitron)', fontSize: '0.85rem' }}>
            {entry.event}
          </p>
          <p className="text-lynx-text/50 text-xs mt-0.5"
            style={{ fontFamily: 'var(--font-rajdhani)' }}>
            {entry.simulator} · {entry.year}
          </p>
        </div>

        {/* Caret */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-lynx-text/40 text-lg select-none"
        >
          ▾
        </motion.span>
      </button>

      {/* Body – acordeón */}
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
              className="relative px-5 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-lynx-border/50"
              style={{ background: style.bg }}
            >
              {/* Posición blureada de fondo */}
              <span
                className={`absolute right-6 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none ${style.text}`}
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'clamp(4rem, 10vw, 7rem)',
                  opacity: 0.15,
                  filter: 'blur(3px)',
                  lineHeight: 1,
                }}
              >
                P{entry.pos}
              </span>

              {/* Logo del coche */}
              <div className="relative z-10 flex-shrink-0 w-20 h-20 rounded-full bg-black/40 border border-white/10 flex items-center justify-center p-3 shadow-lg">
                <img
                  src={assetUrl(`/marcas/${entry.car}.svg`)}
                  alt={entry.car}
                  className="max-w-full max-h-full object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>

              {/* Pilotos */}
              <div className="relative z-10 flex-1">
                <p className="text-lynx-orange text-xs tracking-widest uppercase mb-2"
                  style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}>
                  Pilotos
                </p>
                <div className="flex flex-wrap gap-2">
                  {entry.drivers.map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1 rounded-full bg-black/30 border border-white/10 text-white text-sm"
                      style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600 }}
                    >
                      {d}
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
            Logros del equipo
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}>
            {t("palmares.page_title")}
          </h1>
          <p className="text-lynx-text/60 mt-4 max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '1.05rem' }}>
            {t("palmares.intro")}
          </p>
        </motion.div>
      </div>

      {/* Acordeón – columna por simulador */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {[
            { label: "Assetto Corsa", key: "ACC" },
            { label: "iRacing", key: "iRacing" },
          ].map((col) => {
            const entries = sorted.filter((e) => e.simulator === col.key);
            return (
              <div key={col.key} className="flex flex-col gap-3">
                <h2 className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-1"
                  style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}>
                  {col.label}
                </h2>
                {entries.map((entry, i) => (
                  <AccordionItem key={`${entry.event}-${entry.year}`} entry={entry} index={i} />
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

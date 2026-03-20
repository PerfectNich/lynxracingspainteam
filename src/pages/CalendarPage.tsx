import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GradientDots } from "@/components/ui/gradient-dots";

export function CalendarPage() {
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
            Temporada 2025 · 2026
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}>
            {t("calendar.page_title")}
          </h1>
        </motion.div>
      </div>

      {/* Iframe del calendario */}
      <section className="py-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-lynx-border"
          style={{ boxShadow: '0 0 30px rgba(255,106,0,0.1)' }}
        >
          <iframe
            src="https://calendar.google.com/calendar/embed?src=MmU4M2UzNGQxYTZhMTE3NWU3NjRmZDhmMGFkY2JmZGI0NzFhYjQyMjdlNTk4NTQxMDUxZjcxNTQ3ZTFjYTU1NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&ctz=Europe/Madrid&mode=AGENDA&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&bgcolor=%230b0b0b&color=%23ff6a00"
            scrolling="no"
            className="w-full border-0"
            style={{ height: '70vh', minHeight: 480 }}
            title={t("calendar.section_title")}
          />
        </motion.div>
      </section>
    </div>
  );
}

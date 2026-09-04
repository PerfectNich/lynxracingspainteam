import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCar, FaFlagCheckered, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { GradientDots } from "@/components/ui/gradient-dots";
import teamEvent from "../data/team-event.json";
import { RaceResults } from "../components/RaceResults";

const eventDate = (value: string) => new Date(`${value}T12:00:00`);

function getDaysUntil(dateValue?: string | null) {
  if (!dateValue) {
    return null;
  }

  const today = new Date();
  const todayMidday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0);
  const event = eventDate(dateValue);
  const diffMs = event.getTime() - todayMidday.getTime();

  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

export function CalendarPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-GB" : i18n.language === "ca" ? "ca-ES" : "es-ES";
  const entries = Array.isArray(teamEvent.entries) ? teamEvent.entries : [];
  const daysUntilStart = getDaysUntil(teamEvent.startDate);
  const isCompleted = teamEvent.status === "completed";
  const dateRange =
    teamEvent.startDate && teamEvent.endDate
      ? `${new Intl.DateTimeFormat(locale, {
          day: "numeric",
          month: "long",
        }).format(eventDate(teamEvent.startDate))} - ${new Intl.DateTimeFormat(locale, {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(eventDate(teamEvent.endDate))}`
      : t("calendar.pending");

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
            {t("calendar.season_label")}
          </p>
          <h1
            className="text-4xl font-black text-white md:text-6xl"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("calendar.page_title")}
          </h1>
        </motion.div>
      </div>

      <section className="px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl"
        >

          <div className="relative mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-lynx-border pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-lynx-orange/30 bg-lynx-orange/10 text-lynx-orange">
                <FaRegCalendarAlt />
              </div>
              <div>
                <p
                  className="text-xs uppercase tracking-[0.35em] text-lynx-orange"
                  style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                >
                  {t(isCompleted ? "calendar.completed" : "racing.upcoming")}
                </p>
                <p
                  className="mt-1 text-sm text-lynx-text/60"
                  style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
                >
                  {t("calendar.confirmed_events_only")}
                </p>
              </div>
            </div>
            <span
              className="rounded-full border border-lynx-orange/30 bg-lynx-orange/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-lynx-orange"
              style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
            >
              {isCompleted ? t("calendar.completed") : t("calendar.preparing")}
            </span>
          </div>

          <div className="relative grid gap-8">
            <div>
              <p
                className="mb-3 text-xs uppercase tracking-[0.32em] text-lynx-text/55"
                style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
              >
                {teamEvent.simulator} · {teamEvent.category}
              </p>
              <h2
                className="text-4xl font-black text-white sm:text-5xl"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {teamEvent.title}
              </h2>
              <div className="mt-4 inline-flex rounded-full border border-lynx-orange/30 bg-lynx-orange/10 px-4 py-2">
                <span
                  className="text-xs uppercase tracking-[0.22em] text-lynx-orange"
                  style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                >
                  {isCompleted
                    ? t("calendar.finished_event")
                    : daysUntilStart === null
                      ? t("calendar.pending")
                      : t("calendar.countdown", { count: daysUntilStart })}
                </span>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <p
                    className="mb-2 text-[11px] uppercase tracking-[0.24em] text-lynx-text/50"
                    style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                  >
                    {t("calendar.date_label")}
                  </p>
                  <p
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {dateRange}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <p
                    className="mb-2 text-[11px] uppercase tracking-[0.24em] text-lynx-text/50"
                    style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                  >
                    {t("calendar.entry")}
                  </p>
                  <p
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {teamEvent.teams} {t("calendar.team_entries")}
                  </p>
                </div>
              </div>

              {teamEvent.car ? (
                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 p-4">
                  <FaCar className="flex-shrink-0 text-lynx-orange" />
                  <div>
                    <p
                      className="text-[11px] uppercase tracking-[0.24em] text-lynx-text/50"
                      style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                    >
                      {t("calendar.car")}
                    </p>
                    <p
                      className="mt-1 font-bold text-white"
                      style={{ fontFamily: "var(--font-rajdhani)" }}
                    >
                      {teamEvent.car}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="min-w-0 border-t border-lynx-border pt-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lynx-orange/12 text-lynx-orange">
                  <FaUsers />
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.28em] text-lynx-orange"
                    style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                  >
                    {t("calendar.drivers")}
                  </p>
                  <p className="mt-1 text-sm text-lynx-text/55" style={{ fontFamily: "var(--font-rajdhani)" }}>
                    {entries.length > 0 ? t("calendar.team_lineups") : t("calendar.gt3_lineup")}
                  </p>
                </div>
              </div>

              {entries.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {entries.map((entry) => (
                    <div key={entry.name} className="min-w-0 rounded-lg border border-lynx-border bg-lynx-dark-card p-4">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p
                            className="text-xs uppercase tracking-[0.24em] text-lynx-orange"
                            style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                          >
                            {entry.name}
                          </p>
                          <p className="mt-1 text-sm text-white" style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}>
                            {entry.car ? `${entry.category} · ${entry.car}` : entry.category}
                          </p>
                        </div>
                        {entry.result ? (
                          <span
                            className="rounded-full border border-lynx-orange/30 bg-lynx-orange/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-lynx-orange"
                            style={{ fontFamily: "var(--font-orbitron)" }}
                          >
                            {entry.result}
                          </span>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        {entry.drivers.map((driver, index) => (
                          <div
                            key={`${entry.name}-${driver}`}
                            className="flex items-center gap-3 rounded-xl border border-white/7 bg-black/20 px-4 py-3"
                          >
                            <span
                              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-lynx-orange/12 text-xs text-lynx-orange"
                              style={{ fontFamily: "var(--font-orbitron)", fontWeight: 700 }}
                            >
                              {index + 1}
                            </span>
                            <span className="font-semibold text-white" style={{ fontFamily: "var(--font-rajdhani)" }}>
                              {driver}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {teamEvent.drivers.map((driver, index) => (
                    <div
                      key={driver}
                      className="flex items-center gap-3 rounded-xl border border-white/7 bg-black/20 px-4 py-3"
                    >
                      <span
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-lynx-orange/12 text-xs text-lynx-orange"
                        style={{ fontFamily: "var(--font-orbitron)", fontWeight: 700 }}
                      >
                        {index + 1}
                      </span>
                      <span className="font-semibold text-white" style={{ fontFamily: "var(--font-rajdhani)" }}>
                        {driver}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex items-center gap-2 text-sm text-lynx-text/55">
                <FaFlagCheckered className="text-lynx-orange" />
                <span style={{ fontFamily: "var(--font-rajdhani)" }}>
                  {t("calendar.lineup_note")}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <RaceResults />
    </div>
  );
}

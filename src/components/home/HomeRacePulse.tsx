import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import teamEvent from "../../data/team-event.json";

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

export function HomeRacePulse() {
  const { t, i18n } = useTranslation();
  const prefix = i18n.language === "en" ? "/en" : i18n.language === "ca" ? "/ca" : "";
  const calendarPath = `${prefix}/agenda`;
  const daysUntilStart = getDaysUntil(teamEvent.startDate);
  const isCompleted = teamEvent.status === "completed";

  const locale = i18n.language === "en" ? "en-GB" : i18n.language === "ca" ? "ca-ES" : "es-ES";
  const entries = Array.isArray(teamEvent.entries) ? teamEvent.entries : [];
  const formattedDate =
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
    <section className="relative border-y border-lynx-border bg-lynx-dark-card px-6 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center md:mb-12"
        >
          <p
            className="mb-3 text-xs uppercase tracking-[0.4em] text-lynx-orange"
            style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
          >
            {t("home.pulse_label")}
          </p>
          <h2
            className="text-2xl font-black text-white sm:text-3xl md:text-5xl"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("home.pulse_title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-2xl border border-lynx-border bg-gradient-to-br from-lynx-orange/10 via-black/20 to-black/30 p-5 md:p-6"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3
              className="text-xl font-black text-white md:text-2xl"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {teamEvent.title}
            </h3>
            <span
              className="rounded-full border border-lynx-orange/30 bg-lynx-orange/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-lynx-orange"
              style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
            >
              {isCompleted
                ? t("calendar.completed")
                : daysUntilStart === null
                  ? t("calendar.pending")
                  : t("calendar.countdown", { count: daysUntilStart })}
            </span>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/8 bg-black/20 px-4 py-3">
              <p
                className="mb-2 text-[11px] uppercase tracking-[0.25em] text-lynx-text/50"
                style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
              >
                {t("home.pulse_date_label")}
              </p>
              <p className="text-white" style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}>
                {formattedDate}
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-black/20 px-4 py-3">
              <p
                className="mb-2 text-[11px] uppercase tracking-[0.25em] text-lynx-text/50"
                style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
              >
                {t("home.pulse_format_label")}
              </p>
              <p className="text-white" style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}>
                {teamEvent.category} · {teamEvent.teams} {t("calendar.team_entries")}
              </p>
            </div>
          </div>

          {entries.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {entries.map((entry) => (
                <div key={entry.name} className="rounded-xl border border-white/8 bg-black/20 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className="text-[11px] uppercase tracking-[0.25em] text-lynx-orange"
                      style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                    >
                      {entry.name} · {entry.category}
                    </p>
                    {entry.result ? (
                      <span
                        className="rounded-full border border-lynx-orange/30 bg-lynx-orange/10 px-2 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-lynx-orange"
                        style={{ fontFamily: "var(--font-orbitron)" }}
                      >
                        {entry.result}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-white" style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}>
                    {entry.car ?? entry.drivers.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <Link
            to={calendarPath}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-lynx-orange px-6 py-3 text-sm tracking-widest text-lynx-orange transition-all duration-300 hover:bg-lynx-orange hover:text-black sm:w-auto"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("home.pulse_calendar_link")}
            <FaArrowRight className="ml-2" size={12} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

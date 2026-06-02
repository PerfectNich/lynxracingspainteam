import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaRegCalendarAlt, FaTrophy } from "react-icons/fa";
import { GradientDots } from "@/components/ui/gradient-dots";
import upcomingEvents from "../data/upcoming-events.json";

interface CalendarEvent {
  title: string;
  date: string | null;
}

const calendarUrl =
  "https://calendar.google.com/calendar/embed?src=MmU4M2UzNGQxYTZhMTE3NWU3NjRmZDhmMGFkY2JmZGI0NzFhYjQyMjdlNTk4NTQxMDUxZjcxNTQ3ZTFjYTU1NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&ctz=Europe%2FMadrid";

export function CalendarPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-GB" : i18n.language === "ca" ? "ca-ES" : "es-ES";
  const events = (upcomingEvents as CalendarEvent[])
    .filter((event) => {
      if (!event.date) return false;
      return new Date(event.date) >= new Date();
    })
    .sort((left, right) => {
      if (!left.date || !right.date) return 0;
      return new Date(left.date).getTime() - new Date(right.date).getTime();
    });

  const formatDate = (value: string | null) =>
    value
      ? new Intl.DateTimeFormat(locale, {
          day: "2-digit",
          month: "2-digit",
        }).format(new Date(value))
      : t("calendar.pending");

  const formatTime = (value: string | null) =>
    value
      ? new Intl.DateTimeFormat(locale, {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(value))
      : t("calendar.pending");

  const formatRelative = (value: string | null) => {
    if (!value) return t("calendar.pending");

    const eventDate = new Date(value);
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfEventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    const diffDays = Math.round((startOfEventDay.getTime() - startOfToday.getTime()) / 86400000);

    if (diffDays < 0) {
      if (i18n.language === "en") return "past event";
      if (i18n.language === "ca") return "ja passat";
      return "ya pasado";
    }

    if (diffDays === 0) return t("calendar.today");
    if (diffDays === 1) return t("calendar.tomorrow");

    if (i18n.language === "en") return `in ${diffDays} days`;
    if (i18n.language === "ca") return `en ${diffDays} dies`;
    return `en ${diffDays} días`;
  };

  const parsedColumns = events.reduce<Record<"acc" | "iracing", Record<string, CalendarEvent[]>>>(
    (acc, event) => {
    const parts = event.title.split(" - ").map((part) => part.trim()).filter(Boolean);
      const group = parts.length > 1 ? parts.slice(0, -1).join(" - ") : t("calendar.other_events");
    const itemTitle = parts.length > 1 ? parts[parts.length - 1] : event.title;
    const normalizedEvent = { ...event, title: itemTitle };
      const bucket = group.startsWith("ACC") ? "acc" : "iracing";

      if (!acc[bucket][group]) acc[bucket][group] = [];
      acc[bucket][group].push(normalizedEvent);
      return acc;
    },
    { acc: {}, iracing: {} },
  );

  const columns = [
    { key: "acc" as const, title: t("calendar.acc_column"), groups: Object.entries(parsedColumns.acc) },
    {
      key: "iracing" as const,
      title: t("calendar.iracing_column"),
      groups: Object.entries(parsedColumns.iracing),
    },
  ];

  const hasEvents = columns.some((column) => column.groups.length > 0);

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

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-lynx-border bg-lynx-dark-card p-5 shadow-[0_22px_80px_rgba(0,0,0,0.24)] md:p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-lynx-orange/30 bg-lynx-orange/10 text-lynx-orange">
                <FaRegCalendarAlt />
              </div>
              <div>
                <p
                  className="text-xs uppercase tracking-[0.35em] text-lynx-orange"
                  style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                >
                  {t("calendar.list_label")}
                </p>
                <h2
                  className="text-xl font-black text-white"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {t("calendar.section_title")}
                </h2>
              </div>
            </div>

            {hasEvents ? (
              <div className="grid gap-8 lg:grid-cols-2">
                {columns.map((column) => (
                <div key={column.key} className="rounded-[1.75rem] border border-lynx-border bg-black/16 p-4 md:p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-lynx-orange/20 bg-lynx-orange/10 text-lynx-orange">
                      <FaTrophy size={14} />
                    </div>
                    <h3
                      className="text-lg font-black text-white md:text-xl"
                      style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                      {column.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {column.groups.map(([group, groupItems]) => (
                      <div key={`${column.key}-${group}`}>
                        <h4
                          className="mb-3 text-base font-black text-white"
                          style={{ fontFamily: "var(--font-orbitron)" }}
                        >
                          {group}
                        </h4>

                        <div className="space-y-3">
                          {groupItems.map((event) => (
                            <div
                              key={`${column.key}-${group}-${event.title}-${event.date ?? "pending"}`}
                              className="rounded-2xl border border-lynx-border bg-black/18 px-4 py-3 transition-colors duration-200 hover:border-lynx-orange/30"
                            >
                              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                                <div className="flex min-w-0 items-center gap-3">
                                  <span className="h-3 w-3 flex-shrink-0 rounded-full bg-lynx-orange" />
                                  <p
                                    className="text-white sm:truncate"
                                    style={{
                                      fontFamily: "var(--font-rajdhani)",
                                      fontSize: "0.98rem",
                                      fontWeight: 600,
                                    }}
                                    title={event.title}
                                  >
                                    {event.title}
                                  </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 text-sm sm:flex-nowrap sm:justify-end">
                                  <span
                                    className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-lynx-text/75"
                                    style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                                  >
                                    {formatDate(event.date)} · {formatTime(event.date)}
                                  </span>
                                  <span
                                    className="rounded-full border border-lynx-orange/25 bg-lynx-orange/10 px-3 py-1 text-lynx-orange"
                                    style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
                                  >
                                    {formatRelative(event.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-lynx-border bg-black/16 px-5 py-10 text-center">
                <p
                  className="text-base text-lynx-text/75"
                  style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 600 }}
                >
                  {t("calendar.pending")}
                </p>
              </div>
            )}

            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-lynx-orange px-6 py-3 text-sm tracking-[0.18em] text-lynx-orange transition-all duration-300 hover:bg-lynx-orange hover:text-black"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {t("calendar.open_full")}
              <FaArrowRight className="ml-2" size={12} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { FaCircle, FaTwitch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import liveStatus from "../../data/live-status.json";

type LiveStatus = {
  enabled: boolean;
  label: string;
  channelName: string;
  driverName?: string;
  liveChannels?: string[];
  liveDrivers?: string[];
  liveCount?: number;
  additionalLiveCount?: number;
  isMainChannelLive?: boolean;
  url: string;
  ctaUrl?: string;
};

const liveConfig = liveStatus as LiveStatus;

function formatNameList(names: string[], language: string) {
  if (names.length <= 2) {
    return new Intl.ListFormat(language, { style: "long", type: "conjunction" }).format(names);
  }

  return new Intl.ListFormat(language, { style: "long", type: "conjunction" }).format(names);
}

export function LiveNowBadge() {
  const { i18n, t } = useTranslation();

  if (!liveConfig.enabled) {
    return null;
  }

  const liveCount = liveConfig.liveCount ?? 1;
  const additionalLiveCount = liveConfig.additionalLiveCount ?? 0;

  let description = liveConfig.driverName
    ? t("home.live_badge.driver_live", { driver: liveConfig.driverName })
    : t("home.live_badge.team_live");

  if (liveConfig.isMainChannelLive) {
    description = t("home.live_badge.main_channel_live");
  }

  if (liveCount > 1) {
    const liveDrivers = liveConfig.liveDrivers?.filter(Boolean) ?? [];

    description =
      liveDrivers.length > 1
        ? t("home.live_badge.multiple_live_names", {
            drivers: formatNameList(liveDrivers, i18n.language),
          })
        : t("home.live_badge.multiple_live", { count: liveCount });
  }

  const href = liveConfig.ctaUrl ?? liveConfig.url;
  const isExternalLink = href.startsWith("http");

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6">
      <a
        href={href}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
        className="pointer-events-auto group flex max-w-[19rem] items-center gap-3 rounded-2xl border border-lynx-orange/60 bg-black/88 px-4 py-3 text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-lynx-orange hover:bg-black"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-lynx-orange/30 bg-lynx-orange/10 text-lynx-orange">
          <FaTwitch size={18} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <FaCircle className="text-[0.55rem] text-red-500 animate-pulse" aria-hidden="true" />
            <p
              className="text-[0.65rem] uppercase tracking-[0.28em] text-lynx-orange"
              style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
            >
              {t("home.live_badge.live_now")}
            </p>
          </div>

          <p
            className="mt-1 truncate text-sm font-bold text-white"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {liveConfig.label}
          </p>

          <p
            className="mt-1 text-sm leading-tight text-lynx-text/80"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            {description}
          </p>

          {additionalLiveCount > 0 ? (
            <p
              className="mt-1 text-xs uppercase tracking-[0.18em] text-lynx-orange/80"
              style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
            >
              {t("home.live_badge.more_streams", { count: additionalLiveCount })}
            </p>
          ) : null}
        </div>

        <span
          className="shrink-0 rounded-full border border-lynx-orange/40 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-lynx-orange transition-colors duration-300 group-hover:border-lynx-orange group-hover:text-white"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {t("home.live_badge.watch")}
        </span>
      </a>
    </div>
  );
}

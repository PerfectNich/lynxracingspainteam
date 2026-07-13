import { useEffect, useState } from "react";
import { FaCircle, FaTwitch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { assetUrl } from "../../utils/assetUrl";

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

function formatNameList(names: string[], language: string) {
  return new Intl.ListFormat(language, { style: "long", type: "conjunction" }).format(names);
}

export function LiveNowBadge() {
  const { i18n, t } = useTranslation();
  const [liveConfig, setLiveConfig] = useState<LiveStatus | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadLiveStatus = async () => {
      try {
        const minuteStamp = Math.floor(Date.now() / 60000);
        const response = await fetch(`${assetUrl("/live-status.json")}?v=${minuteStamp}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as LiveStatus;
        if (isMounted) {
          setLiveConfig(payload);
          if (!payload.enabled) {
            setExpanded(false);
          }
        }
      } catch {
        if (isMounted) {
          setLiveConfig(null);
          setExpanded(false);
        }
      }
    };

    void loadLiveStatus();
    const intervalId = window.setInterval(() => {
      void loadLiveStatus();
    }, 60000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  if (!liveConfig?.enabled) {
    return null;
  }

  const liveCount = liveConfig.liveCount ?? 1;
  const additionalLiveCount = liveConfig.additionalLiveCount ?? 0;
  const liveChannels = liveConfig.liveChannels?.filter(Boolean) ?? [];
  const liveDrivers = liveConfig.liveDrivers?.filter(Boolean) ?? [];
  const liveOptions =
    liveChannels.length > 0
      ? liveChannels.map((channel, index) => ({
          channel,
          label: liveDrivers[index] ?? channel,
          url: `https://www.twitch.tv/${channel}`,
        }))
      : [
          {
            channel: liveConfig.channelName,
            label: liveConfig.driverName ?? liveConfig.label,
            url: liveConfig.url,
          },
        ];
  const hasMultipleLiveOptions = liveOptions.length > 1;
  const primaryLiveUrl = liveOptions[0]?.url ?? liveConfig.url;

  let description = liveConfig.driverName
    ? t("home.live_badge.driver_live", { driver: liveConfig.driverName })
    : t("home.live_badge.team_live");

  if (liveConfig.isMainChannelLive) {
    description = t("home.live_badge.main_channel_live");
  }

  if (liveCount > 1) {
    description =
      liveDrivers.length > 1
        ? t("home.live_badge.multiple_live_names", {
            drivers: formatNameList(liveDrivers, i18n.language),
          })
        : t("home.live_badge.multiple_live", { count: liveCount });
  }

  function handleBadgeClick() {
    if (hasMultipleLiveOptions) {
      setExpanded((current) => !current);
      return;
    }

    window.open(primaryLiveUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6">
      <button
        type="button"
        onClick={handleBadgeClick}
        aria-expanded={hasMultipleLiveOptions ? expanded : undefined}
        className="pointer-events-auto group flex max-w-[19rem] items-center gap-3 rounded-2xl border border-lynx-orange/60 bg-black/88 px-4 py-3 text-left text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-lynx-orange hover:bg-black"
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
      </button>

      {expanded ? (
        <div className="pointer-events-auto mt-2 max-w-[19rem] overflow-hidden rounded-2xl border border-lynx-orange/35 bg-black/92 p-2 text-white shadow-[0_18px_45px_rgba(0,0,0,0.42)] backdrop-blur-md">
          {liveOptions.map((option) => (
            <a
              key={option.channel}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-lynx-orange/12"
            >
              <span className="min-w-0">
                <span
                  className="block truncate text-sm font-bold text-white"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {option.label}
                </span>
                <span
                  className="mt-0.5 block truncate text-xs text-lynx-text/65"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  twitch.tv/{option.channel}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-red-400/60 bg-red-500/12 px-2 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-red-100">
                <FaCircle className="text-[0.45rem] text-red-400" aria-hidden="true" />
                Live
              </span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

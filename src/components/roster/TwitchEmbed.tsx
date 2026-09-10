import { FaTwitch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface TwitchEmbedProps {
  channel: string;
  height?: number;
}

export function TwitchEmbed({ channel, height = 220 }: TwitchEmbedProps) {
  const { t } = useTranslation();
  const parent = window.location.hostname || "localhost";

  return (
    <div className="rounded-xl overflow-hidden border border-lynx-border bg-lynx-dark-card flex flex-col">
      <a
        href={`https://www.twitch.tv/${encodeURIComponent(channel)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3 border-b border-lynx-border hover:bg-[#9146ff]/15 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#bf94ff]"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#9146ff" }}
        >
          <FaTwitch className="text-white text-xs" />
        </div>
        <span
          className="text-white font-bold text-sm truncate flex-1"
          style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.78rem" }}
        >
          {channel}
        </span>
        <span
          className="flex-shrink-0 text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontWeight: 700,
            color: "#bf94ff",
            borderColor: "#9146ff44",
            backgroundColor: "#9146ff12",
          }}
        >
          {t("roster.open_twitch")} ↗
        </span>
      </a>

      <iframe
        src={`https://player.twitch.tv/?channel=${encodeURIComponent(channel)}&parent=${encodeURIComponent(parent)}&muted=true&autoplay=false`}
        loading="lazy"
        width="100%"
        height={height}
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        referrerPolicy="strict-origin-when-cross-origin"
        title={`Twitch stream - ${channel}`}
        className="border-0 w-full"
      />
    </div>
  );
}

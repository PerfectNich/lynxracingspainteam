import { FaTwitch } from "react-icons/fa";

interface TwitchEmbedProps {
  channel: string;
  height?: number;
}

export function TwitchEmbed({ channel, height = 220 }: TwitchEmbedProps) {
  const parent = window.location.hostname || "localhost";

  return (
    <div className="rounded-xl overflow-hidden border border-lynx-border bg-lynx-dark-card flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-lynx-border">
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
            color: "#9146ff",
            borderColor: "#9146ff44",
            backgroundColor: "#9146ff12",
          }}
        >
          Twitch
        </span>
      </div>

      <iframe
        src={`https://player.twitch.tv/?channel=${encodeURIComponent(channel)}&parent=${encodeURIComponent(parent)}&muted=true`}
        width="100%"
        height={height}
        allowFullScreen
        title={`Twitch stream - ${channel}`}
        className="border-0 w-full"
      />
    </div>
  );
}

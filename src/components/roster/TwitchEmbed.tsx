interface TwitchEmbedProps {
  channel: string;
}

export function TwitchEmbed({ channel }: TwitchEmbedProps) {
  const parent = window.location.hostname || "localhost";

  return (
    <div className="bg-lynx-dark-card border-l-4 border-lynx-orange rounded-lg overflow-hidden shadow-orange-glow">
      <h3 className="m-0 p-3 text-base text-lynx-orange text-center bg-lynx-dark-menu border-b border-lynx-orange">
        {channel}
      </h3>
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=${parent}&muted=true`}
        width="100%"
        height="300"
        allowFullScreen
        title={`Twitch stream - ${channel}`}
        className="border-0"
      />
    </div>
  );
}

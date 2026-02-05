export function DiscordWidget() {
  return (
    <div className="hidden md:block absolute top-[100px] right-5 w-[300px] h-[300px] z-[1001] shadow-orange-glow rounded-lg overflow-hidden">
      <iframe
        src="https://discord.com/widget?id=959966624381796393&theme=dark"
        width="300"
        height="400"
        allowTransparency={true}
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        title="Discord Widget"
      />
    </div>
  );
}

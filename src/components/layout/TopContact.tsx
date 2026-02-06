import { FaDiscord } from "react-icons/fa";

export function TopContact() {
  return (
    <a
      href="https://discord.gg/H8eNsptxVw"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed top-3 right-5 text-sm z-[1001] bg-black/60 px-3 py-1.5 rounded-md shadow-orange-glow items-center gap-2 text-lynx-orange font-bold hover:text-white transition-colors"
    >
      <FaDiscord /> Discord
    </a>
  );
}

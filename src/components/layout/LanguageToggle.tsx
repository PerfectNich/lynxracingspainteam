import { Link } from "react-router-dom";

interface LanguageToggleProps {
  isEn: boolean;
  to: string;
}

export function LanguageToggle({ isEn, to }: LanguageToggleProps) {
  return (
    <Link
      to={to}
      className="relative flex items-center bg-lynx-dark-card border border-lynx-border rounded-full p-0.5 w-[4.2rem] h-8 hover:border-lynx-orange/50 transition-colors"
      aria-label={isEn ? "Cambiar a español" : "Switch to English"}
    >
      {/* Sliding highlight */}
      <span
        className="absolute top-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full bg-lynx-orange/20 transition-all duration-300 ease-in-out"
        style={{ left: isEn ? "calc(50% + 1px)" : "2px" }}
      />

      {/* Spanish flag */}
      <span
        className="relative z-10 flex-1 text-center text-base transition-all duration-300"
        style={{
          transform: `scale(${!isEn ? 1.2 : 0.9})`,
          opacity: !isEn ? 1 : 0.5,
        }}
      >
        🇪🇸
      </span>

      {/* English flag */}
      <span
        className="relative z-10 flex-1 text-center text-base transition-all duration-300"
        style={{
          transform: `scale(${isEn ? 1.2 : 0.9})`,
          opacity: isEn ? 1 : 0.5,
        }}
      >
        🇬🇧
      </span>
    </Link>
  );
}

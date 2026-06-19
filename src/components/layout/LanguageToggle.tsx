import { Link } from "react-router-dom";
import { assetUrl } from "../../utils/assetUrl";

interface LanguageToggleProps {
  lang: string;
  basePath: string;
}

const flags = [
  { code: "es", src: "/banderas/spain.png", alt: "Español", prefix: "", height: "h-3.5" },
  { code: "ca", src: "/banderas/cat.jpg", alt: "Català", prefix: "/ca", height: "h-3.5" },
  { code: "en", src: "/banderas/uk.png", alt: "English", prefix: "/en", height: "h-3" },
];

export function LanguageToggle({ lang, basePath }: LanguageToggleProps) {
  const activeIndex = flags.findIndex((f) => f.code === lang);

  return (
    <div className="relative grid grid-cols-3 items-center bg-lynx-dark-card border border-lynx-border rounded-full p-0.5 w-[6.5rem] h-8 hover:border-lynx-orange/50 transition-colors">
      {/* Sliding highlight */}
      <span
        className="absolute top-0.5 h-[calc(100%-4px)] rounded-full bg-lynx-orange/20 transition-all duration-300 ease-in-out"
        style={{
          left: `calc(2px + ${activeIndex} * (100% - 4px) / 3)`,
          width: "calc((100% - 4px) / 3)",
        }}
      />

      {flags.map((flag) => {
        const isActive = flag.code === lang;
        const to = flag.prefix + basePath;
        return (
          <Link
            key={flag.code}
            to={to || "/"}
            className="relative z-10 flex justify-center items-center"
            aria-label={flag.alt}
          >
            <img
              src={assetUrl(flag.src)}
              alt={flag.alt}
              className={`${flag.height} w-auto rounded-sm transition-all duration-300`}
              style={{
                transform: `scale(${isActive ? 1.15 : 0.95})`,
                opacity: isActive ? 1 : 0.5,
              }}
            />
          </Link>
        );
      })}
    </div>
  );
}

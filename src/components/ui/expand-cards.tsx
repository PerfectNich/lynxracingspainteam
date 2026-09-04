import { useEffect, useState } from "react";

export interface ExpandCardItem {
  id: string;
  imageSrc: string;
  imagePosition?: string;
  flagSrc?: string;
  name?: string;
  dorsal?: string | null;
}

interface ExpandCardsProps {
  items: ExpandCardItem[];
  cardHeight?: number;
  expandedWidth?: number;
  collapsedWidth?: number;
  defaultExpanded?: number;
  onSelect?: (item: ExpandCardItem) => void;
}

export function ExpandCards({
  items,
  cardHeight = 280,
  expandedWidth = 300,
  collapsedWidth = 72,
  defaultExpanded,
  onSelect,
}: ExpandCardsProps) {
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    defaultExpanded ?? null
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px), (hover: none), (pointer: coarse)"
    );

    const syncLayout = () => {
      setIsCompactLayout(mediaQuery.matches);
      if (mediaQuery.matches) {
        setExpandedIndex((current) => current ?? defaultExpanded ?? 0);
      }
    };

    syncLayout();
    mediaQuery.addEventListener("change", syncLayout);

    return () => mediaQuery.removeEventListener("change", syncLayout);
  }, [defaultExpanded]);

  return (
    <div
      className={`flex items-center gap-1 w-full ${
        isCompactLayout ? "justify-start" : "justify-center"
      }`}
    >
      {items.map((item, idx) => (
        <button
          key={item.id}
          type="button"
          aria-haspopup={onSelect ? "dialog" : undefined}
          className="relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out flex-shrink-0 border-0 p-0 bg-transparent text-left"
          style={{
            width: isCompactLayout
              ? `${Math.min(expandedWidth, 220)}px`
              : expandedIndex === idx
                ? `${expandedWidth}px`
                : `${collapsedWidth}px`,
            height: `${cardHeight}px`,
          }}
          onMouseEnter={() => setExpandedIndex(idx)}
          onFocus={() => setExpandedIndex(idx)}
          onBlur={() => !isCompactLayout && setExpandedIndex(null)}
          onMouseLeave={() => !isCompactLayout && setExpandedIndex(null)}
          onClick={() => onSelect ? onSelect(item) :
            setExpandedIndex((current) =>
              current === idx && !isCompactLayout ? null : idx
            )
          }
        >
          <img
            src={item.imageSrc}
            alt={item.name ?? `Card ${idx + 1}`}
            className="w-full h-full object-cover"
            style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
          />

          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isCompactLayout || expandedIndex === idx
                ? "bg-black/10"
                : "bg-black/50"
            }`}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col items-center justify-end pb-4 px-3 transition-opacity duration-300 ${
              isCompactLayout || expandedIndex === idx
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            {item.flagSrc && (
              <img
                src={item.flagSrc}
                alt="flag"
                className="w-8 h-5 object-cover rounded-sm mb-2 opacity-90"
              />
            )}
            {item.name && (
              <p
                className="text-white font-bold text-sm text-center leading-tight"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {item.name}
              </p>
            )}
            {item.dorsal && (
              <p
                className="text-lynx-orange text-2xl font-black mt-1"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                #{item.dorsal}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

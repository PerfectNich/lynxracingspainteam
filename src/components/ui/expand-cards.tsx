import { useState } from "react";

export interface ExpandCardItem {
  id: string;
  imageSrc: string;
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
}

export function ExpandCards({
  items,
  cardHeight = 280,
  expandedWidth = 300,
  collapsedWidth = 72,
  defaultExpanded,
}: ExpandCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    defaultExpanded ?? null
  );

  return (
    <div className="flex items-center justify-center gap-1 w-full">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out flex-shrink-0"
          style={{
            width: expandedIndex === idx ? `${expandedWidth}px` : `${collapsedWidth}px`,
            height: `${cardHeight}px`,
          }}
          onMouseEnter={() => setExpandedIndex(idx)}
          onMouseLeave={() => setExpandedIndex(null)}
        >
          <img
            src={item.imageSrc}
            alt={item.name ?? `Card ${idx + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Oscurecimiento para tarjetas colapsadas */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            expandedIndex === idx ? 'bg-black/0' : 'bg-black/50'
          }`} />

          {/* Overlay info al expandir */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col items-center justify-end pb-4 px-3 transition-opacity duration-300 ${
            expandedIndex === idx ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Bandera pequeña */}
            {item.flagSrc && (
              <img
                src={item.flagSrc}
                alt="flag"
                className="w-8 h-5 object-cover rounded-sm mb-2 opacity-90"
              />
            )}
            {item.name && (
              <p className="text-white font-bold text-sm text-center leading-tight"
                style={{ fontFamily: 'var(--font-orbitron)' }}>
                {item.name}
              </p>
            )}
            {item.dorsal && (
              <p className="text-lynx-orange text-2xl font-black mt-1"
                style={{ fontFamily: 'var(--font-orbitron)' }}>
                #{item.dorsal}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

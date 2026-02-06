import { useState } from "react";
import type { MediaItem } from "../../types";
import { Lightbox } from "./Lightbox";

interface GalleryGridProps {
  items: MediaItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-orange-glow cursor-pointer group"
            onClick={() => handleClick(index)}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt || item.game}
                className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <video
                poster={item.poster}
                className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                controls
                preload="metadata"
              >
                <source src={item.src} type="video/mp4" />
                Tu navegador no soporta video HTML5
              </video>
            )}
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </>
  );
}

import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import type { MediaItem } from "../../types";
import { Lightbox } from "./Lightbox";
import { assetUrl } from "../../utils/assetUrl";

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
                src={assetUrl(item.src)}
                alt={item.alt || item.game}
                className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="relative">
                <img
                  src={item.poster ? assetUrl(item.poster) : undefined}
                  alt={item.game || "Video"}
                  className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 rounded-full p-4 group-hover:bg-lynx-orange/80 transition-colors duration-300">
                    <FaPlay className="text-white text-2xl ml-1" />
                  </div>
                </div>
              </div>
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

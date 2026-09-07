import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlay } from "react-icons/fa";
import mediaItems from "../data/media.json";
import { Lightbox } from "../components/media/Lightbox";
import { assetUrl } from "../utils/assetUrl";
import type { MediaItem } from "../types";

const allItems = mediaItems as MediaItem[];

export function MediaPage() {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="px-3 pb-12 pt-6 sm:px-6 sm:pt-10">
      <h1 className="sr-only">{t("media.page_title")}</h1>
      <section
        aria-label={t("media.gallery_title")}
        className="mx-auto grid max-w-[1600px] grid-cols-2 auto-rows-[clamp(110px,20vw,220px)] gap-2 md:grid-cols-6 md:auto-rows-[clamp(140px,14vw,230px)] md:gap-3"
      >
        {allItems.map((item, index) => {
          // New uploads inherit a size without needing per-photo metadata.
          // Keep DOM order and visual order aligned for keyboard navigation.
          const featured = index % 12 === 0 || index % 12 === 7;
          const isVideo = item.type === "video";
          const preview = isVideo ? item.poster : item.src;

          return (
            <button
              key={item.src}
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={`${t(isVideo ? "media.videos_title" : "media.page_title")} ${index + 1}: ${item.alt || item.game}`}
              aria-haspopup="dialog"
              className={`group relative min-h-0 min-w-0 overflow-hidden rounded-sm border-0 bg-lynx-dark-card p-0 cursor-pointer ${
                featured ? "col-span-2 row-span-2 md:col-span-4" : "col-span-1 md:col-span-2"
              }`}
            >
              {preview ? (
                <img
                  src={assetUrl(preview)}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none"
                />
              ) : (
                <video
                  src={assetUrl(item.src)}
                  preload="none"
                  muted
                  playsInline
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
              )}
              {isVideo && (
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/65 text-white transition-colors group-hover:bg-lynx-orange">
                    <FaPlay className="ml-0.5" size={16} />
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          items={allItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}

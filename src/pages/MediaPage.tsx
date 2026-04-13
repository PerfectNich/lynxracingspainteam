import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import mediaItems from "../data/media.json";
import { FocusCards } from "@/components/ui/focus-cards";
import { GradientDots } from "@/components/ui/gradient-dots";
import { Lightbox } from "../components/media/Lightbox";
import type { MediaItem } from "../types";

const hiddenGames = ["AMS2", "RRE"];
const allItems = (mediaItems as MediaItem[]).filter(
  (item) => !hiddenGames.includes(item.game ?? "")
);

const imageItems = allItems.filter((item) => item.type === "image");
const imageCards = imageItems.map((item) => ({
  title: item.game ?? "",
  src: item.src,
}));

const videoItems = allItems.filter((item) => item.type === "video");

export function MediaPage() {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="overflow-x-hidden">
      <div className="relative overflow-hidden py-24 px-6 text-center border-b border-lynx-border">
        <div className="absolute inset-0 opacity-15">
          <GradientDots
            dotSize={5}
            spacing={14}
            duration={35}
            colorCycleDuration={7}
            backgroundColor="#0b0b0b"
          />
        </div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,106,0,0.5) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <p
            className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
          >
            {t("media.section_label")}
          </p>
          <h1
            className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("media.page_title")}
          </h1>
        </motion.div>
      </div>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {imageCards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-16"
            >
              <FocusCards cards={imageCards} onCardClick={setLightboxIndex} />
            </motion.div>
          )}

          {videoItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2
                className="text-2xl font-black text-white mb-8"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {t("media.videos_title")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-lg overflow-hidden bg-lynx-dark-card border border-lynx-border"
                  >
                    <video
                      src={item.src}
                      poster={item.poster}
                      controls
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          items={imageItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      )}
    </div>
  );
}

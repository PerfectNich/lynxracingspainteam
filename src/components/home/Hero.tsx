import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { assetUrl } from "../../utils/assetUrl";
import { EtherealShadow } from "@/components/ui/etheral-shadow";

export function Hero() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const saveData =
    typeof navigator !== "undefined" &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const shouldLoadVideo = !prefersReducedMotion && !saveData;

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        height: "68svh",
        minHeight: "360px",
        maxHeight: "640px",
        background:
          "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255,106,0,0.3), transparent 72%), #080808",
      }}
    >

      {/* EtherealShadow de fondo */}
      {shouldLoadVideo && !videoReady && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <EtherealShadow
            color="rgba(255, 106, 0, 0.9)"
            animation={{ scale: 100, speed: 85 }}
            noise={{ opacity: 1, scale: 1.2 }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}

      {shouldLoadVideo && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 1 }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
        >
          <source src={assetUrl("/videos/hero-promo.mp4")} type="video/mp4" />
        </video>
      )}

      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            "radial-gradient(ellipse 48% 46% at 50% 48%, rgba(255,106,0,0.08) 0%, transparent 72%), radial-gradient(ellipse 88% 82% at 50% 46%, transparent 38%, rgba(3,3,3,0.42) 74%, rgba(3,3,3,0.82) 100%), linear-gradient(180deg, rgba(5,5,5,0.36) 0%, rgba(5,5,5,0.12) 42%, rgba(8,8,8,0.72) 100%)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          zIndex: 10,
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0) 0%, rgba(8,8,8,0.7) 45%, rgba(20,20,20,1) 100%)",
        }}
      />

      {/* Logo y texto encima */}
      <div className="relative flex flex-col items-center text-center px-6" style={{ zIndex: 20 }}>
        <h1 className="sr-only">Lynx Racing Spain Team</h1>
        <img
          src={assetUrl("/logo.jpg")}
          alt="Lynx Racing Spain Team"
          className="w-32 md:w-44 lg:w-48 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(255,106,0,1)] rounded-lg"
          loading="eager"
        />
        <p
          className="text-base md:text-2xl text-lynx-orange-light tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600 }}
        >
          {t("hero.subtitle")}
        </p>
      </div>

      {/* Indicador de scroll */}
      <div
        style={{ position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}
        className="flex flex-col items-center gap-2 opacity-60"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-lynx-text"
          style={{ fontFamily: 'var(--font-rajdhani)' }}>
          {t("hero.scroll")}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-lynx-orange to-transparent" />
      </div>
    </div>
  );
}

import { useTranslation } from "react-i18next";
import { assetUrl } from "../../utils/assetUrl";
import { EtherealShadow } from "@/components/ui/etheral-shadow";

export function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '100svh', background: '#080808' }}>

      {/* EtherealShadow de fondo */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <EtherealShadow
          color="rgba(255, 106, 0, 0.9)"
          animation={{ scale: 100, speed: 85 }}
          noise={{ opacity: 1, scale: 1.2 }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Logo y texto encima */}
      <div className="relative flex flex-col items-center text-center px-6" style={{ zIndex: 20 }}>
        <img
          src={assetUrl("/logo.jpg")}
          alt="Lynx Racing Spain Team"
          className="w-36 md:w-56 lg:w-72 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(255,106,0,1)] rounded-lg"
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
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}
        className="flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs tracking-[0.3em] uppercase text-lynx-text"
          style={{ fontFamily: 'var(--font-rajdhani)' }}>
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-lynx-orange to-transparent" />
      </div>
    </div>
  );
}

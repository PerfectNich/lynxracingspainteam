import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import sponsors from "../../data/sponsors.json";
import type { Sponsor } from "../../types";
import { assetUrl } from "../../utils/assetUrl";

const mainSponsor = (sponsors as Sponsor[]).find((sponsor) => sponsor.name === "RM Motor");

export function MainSponsorSpotlight() {
  const { t } = useTranslation();

  if (!mainSponsor || !mainSponsor.url) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto mb-10 max-w-4xl"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-lynx-orange/40 bg-[linear-gradient(135deg,rgba(255,106,0,0.16),rgba(20,20,20,0.98)_38%,rgba(12,12,12,0.98))] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.38)] md:p-8">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(255,106,0,0.22) 0%, transparent 38%)",
          }}
        />

        <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1.2fr_auto]">
          <div className="text-center md:text-left">
            <p
              className="mb-3 text-xs uppercase tracking-[0.42em] text-lynx-orange"
              style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
            >
              {t("home.main_sponsor_label")}
            </p>
            <h3
              className="mb-3 text-2xl font-black text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {mainSponsor.name}
            </h3>
            <p
              className="max-w-2xl text-base text-lynx-text/72 sm:text-lg"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              {t("home.main_sponsor_text")}
            </p>
          </div>

          <div className="flex flex-col items-center gap-5">
            <div className="flex min-h-[160px] min-w-[260px] items-center justify-center rounded-[1.5rem] border border-white/8 bg-black/25 px-8 py-6 backdrop-blur-sm">
              <img
                src={assetUrl(mainSponsor.logo)}
                alt={mainSponsor.name}
                className="max-h-[110px] w-auto object-contain drop-shadow-[0_0_28px_rgba(255,106,0,0.22)]"
              />
            </div>

            <a
              href={mainSponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-lynx-orange bg-lynx-orange px-6 py-3 text-sm tracking-[0.18em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-lynx-orange-light"
              style={{ fontFamily: "var(--font-orbitron)", color: "#000" }}
            >
              <FaInstagram aria-hidden="true" />
              {t("home.main_sponsor_cta")}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

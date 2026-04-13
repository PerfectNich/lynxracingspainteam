import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRight, FaDiscord, FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Hero } from "../components/home/Hero";
import { HomeRacePulse } from "../components/home/HomeRacePulse";
import { SimulatorsGrid } from "../components/home/SimulatorsGrid";
import { SponsorCarousel } from "../components/home/SponsorCarousel";
import { GradientDots } from "@/components/ui/gradient-dots";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3 text-xs uppercase tracking-[0.4em] text-lynx-orange"
      style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-5 text-2xl font-black text-white sm:text-3xl md:mb-6 md:text-5xl"
      style={{ fontFamily: "var(--font-orbitron)" }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div className="my-2 flex items-center gap-4">
      <div className="h-px flex-1 bg-lynx-border" />
      <div className="h-2 w-2 rotate-45 bg-lynx-orange" />
      <div className="h-px flex-1 bg-lynx-border" />
    </div>
  );
}

export function HomePage() {
  const { t, i18n } = useTranslation();
  const prefix = i18n.language === "en" ? "/en" : i18n.language === "ca" ? "/ca" : "";
  const rosterPath = `${prefix}/roster`;
  const mediaPath = `${prefix}/multimedia`;

  return (
    <div className="overflow-x-hidden">
      <Hero />

      <section className="relative bg-lynx-dark-card px-6 py-8 sm:py-10">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <GradientDots
            dotSize={5}
            spacing={14}
            duration={40}
            colorCycleDuration={8}
            backgroundColor="#141414"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8 text-center"
          >
            <SectionLabel>{t("home.sponsors_label")}</SectionLabel>
            <SectionHeading>Sponsors</SectionHeading>
            <Divider />
          </motion.div>

          <SponsorCarousel />
        </div>
      </section>

      <section className="relative px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionLabel>{t("home.about_label")}</SectionLabel>
            <SectionHeading>{t("home.about_title")}</SectionHeading>
            <p
              className="text-base leading-relaxed text-lynx-text/80 sm:text-lg"
              style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.08rem" }}
            >
              {t("home.about_text")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-lynx-dark-card px-6 py-16 md:py-20">
        <div className="absolute inset-0 opacity-20">
          <GradientDots
            dotSize={4}
            spacing={12}
            duration={50}
            colorCycleDuration={10}
            backgroundColor="#141414"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <SectionLabel>{t("home.simulators_label")}</SectionLabel>
            <SectionHeading>{t("home.simulators_title")}</SectionHeading>
            <Divider />
          </motion.div>
          <SimulatorsGrid />
        </div>
      </section>

      <HomeRacePulse />

      <section className="relative overflow-hidden px-6 py-20 md:py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,106,0,0.4) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <SectionLabel>{t("home.team_label")}</SectionLabel>
          <SectionHeading>{t("home.roster_title")}</SectionHeading>
          <p
            className="mb-8 text-base text-lynx-text/70 sm:text-lg"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            {t("home.roster_text")}
          </p>
          <Link
            to={rosterPath}
            className="inline-flex w-full items-center justify-center rounded-full border border-lynx-orange px-8 py-3 text-sm tracking-widest text-lynx-orange transition-all duration-300 hover:bg-lynx-orange hover:text-black sm:w-auto"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("home.roster_link")}
            <FaArrowRight className="ml-2" size={12} aria-hidden="true" />
          </Link>
        </motion.div>
      </section>

      <section className="relative border-t border-lynx-border bg-lynx-dark-card px-6 py-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <SectionLabel>{t("home.gallery_label")}</SectionLabel>
          <SectionHeading>{t("home.gallery_title")}</SectionHeading>
          <p
            className="mb-8 text-base text-lynx-text/70 sm:text-lg"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            {t("home.gallery_text")}
          </p>
          <Link
            to={mediaPath}
            className="inline-flex w-full items-center justify-center rounded-full border border-lynx-orange px-8 py-3 text-sm tracking-widest text-lynx-orange transition-all duration-300 hover:bg-lynx-orange hover:text-black sm:w-auto"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("home.gallery_link")}
            <FaArrowRight className="ml-2" size={12} aria-hidden="true" />
          </Link>
        </motion.div>
      </section>

      <section className="relative px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-xl text-center"
        >
          <SectionLabel>{t("home.contact_label")}</SectionLabel>
          <SectionHeading>{t("home.contact_title")}</SectionHeading>
          <Divider />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-3xl text-lynx-text/70 sm:gap-8">
            <a
              href="mailto:lynxracingspain@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-125 hover:text-lynx-orange"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.instagram.com/lynxracingspain/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-125 hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/LynxRacingSpain"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-125 hover:text-white"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://discord.gg/H8eNsptxVw"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-125 hover:text-social-discord"
            >
              <FaDiscord />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61571491793124"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-200 hover:scale-125 hover:text-social-facebook"
            >
              <FaFacebook />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

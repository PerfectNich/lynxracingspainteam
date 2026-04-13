import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Hero } from "../components/home/Hero";
import { HomeRacePulse } from "../components/home/HomeRacePulse";
import { MainSponsorSpotlight } from "../components/home/MainSponsorSpotlight";
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
      className="mb-5 text-2xl font-black text-white sm:text-3xl md:mb-4 md:text-5xl"
      style={{ fontFamily: "var(--font-orbitron)" }}
    >
      {children}
    </h2>
  );
}

function SectionIntro({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mx-auto max-w-3xl text-base leading-relaxed text-lynx-text/68 sm:text-lg"
      style={{ fontFamily: "var(--font-rajdhani)" }}
    >
      {children}
    </p>
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
            <SectionHeading>{t("home.sponsors_title")}</SectionHeading>
            <Divider />
          </motion.div>

          <MainSponsorSpotlight />
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

      <section className="relative bg-lynx-dark-card px-6 py-16 md:py-20">
        <div className="absolute inset-0 opacity-20">
          <GradientDots
            dotSize={4}
            spacing={12}
            duration={48}
            colorCycleDuration={10}
            backgroundColor="#141414"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <SectionLabel>{t("home.team_label")}</SectionLabel>
          <SectionHeading>{t("home.roster_title")}</SectionHeading>
          <SectionIntro>{t("home.roster_text")}</SectionIntro>
          <Link
            to={rosterPath}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-lynx-orange px-8 py-3 text-sm tracking-widest text-lynx-orange transition-all duration-300 hover:bg-lynx-orange hover:text-black sm:w-auto"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("home.roster_link")}
            <FaArrowRight className="ml-2" size={12} aria-hidden="true" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
}

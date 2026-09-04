import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowRight, FaDiscord, FaEnvelope } from "react-icons/fa";
import { Hero } from "../components/home/Hero";
import { HomeRacePulse } from "../components/home/HomeRacePulse";
import { RaceResults } from "../components/RaceResults";
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

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-lynx-border bg-lynx-dark-card px-5 py-4 text-center shadow-[0_14px_40px_rgba(0,0,0,0.18)]">
      <p
        className="text-3xl font-black text-white"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        {value}
      </p>
      <p
        className="mt-2 text-sm uppercase tracking-[0.18em] text-lynx-text/60"
        style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
      >
        {label}
      </p>
    </div>
  );
}

export function HomePage() {
  const { t, i18n } = useTranslation();
  const prefix = i18n.language === "en" ? "/en" : i18n.language === "ca" ? "/ca" : "";
  const rosterPath = `${prefix}/roster`;
  const stats = [
    {
      value: t("home.stats.years_value"),
      label: t("home.stats.years_label"),
    },
    {
      value: t("home.stats.races_value"),
      label: t("home.stats.races_label"),
    },
    {
      value: t("home.stats.platforms_value"),
      label: t("home.stats.platforms_label"),
    },
  ];

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <div className="mx-auto grid max-w-6xl items-start gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <HomeRacePulse />
        <RaceResults featured />
      </div>

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
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionLabel>{t("home.stats_label")}</SectionLabel>
            <div className="mb-10 grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
            <SectionLabel>{t("home.about_label")}</SectionLabel>
            <SectionHeading>{t("home.about_title")}</SectionHeading>
            <p
              className="text-base leading-relaxed text-lynx-text/80 sm:text-lg"
              style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.08rem" }}
            >
              {t("home.about_text")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-12 rounded-[1.75rem] border border-lynx-border bg-lynx-dark-card p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:p-8"
          >
            <SectionLabel>{t("contact.join_label")}</SectionLabel>
            <h3
              className="text-2xl font-black text-white md:text-3xl"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {t("contact.join_title")}
            </h3>
            <p
              className="mx-auto mt-4 max-w-2xl text-lynx-text/70"
              style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.05rem" }}
            >
              {t("contact.join_text")}
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://discord.gg/H8eNsptxVw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-lynx-orange px-6 py-3 text-sm tracking-widest text-lynx-orange transition-all duration-300 hover:bg-lynx-orange hover:text-black"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                <FaDiscord className="mr-2" size={14} aria-hidden="true" />
                {t("contact.join_discord")}
              </a>
              <a
                href="mailto:lynxracingspain@gmail.com"
                className="inline-flex items-center justify-center rounded-full border border-lynx-border px-6 py-3 text-sm tracking-widest text-white transition-all duration-300 hover:border-lynx-orange hover:text-lynx-orange"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                <FaEnvelope className="mr-2" size={14} aria-hidden="true" />
                {t("contact.join_email")}
              </a>
            </div>
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

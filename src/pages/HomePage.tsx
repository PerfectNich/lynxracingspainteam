import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Hero } from "../components/home/Hero";
import { SponsorCarousel } from "../components/home/SponsorCarousel";
import { SimulatorsGrid } from "../components/home/SimulatorsGrid";
import { DiscordWidget } from "../components/home/DiscordWidget";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";
import { FaEnvelope, FaInstagram, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function HomePage() {
  const { t, i18n } = useTranslation();
  const rosterPath = i18n.language === "en" ? "/en/roster" : "/roster";

  return (
    <>
      <Hero />
      <DiscordWidget />

      <Section id="sponsors">
        <SectionTitle>Sponsors</SectionTitle>
        <SponsorCarousel />
      </Section>

      <Section id="equipo">
        <SectionTitle>{t("home.about_title")}</SectionTitle>
        <p className="text-lg md:text-xl leading-relaxed">
          {t("home.about_text")}
        </p>
      </Section>

      <Section id="simuladores">
        <SectionTitle>{t("home.simulators_title")}</SectionTitle>
        <SimulatorsGrid />
      </Section>

      <Section id="roster-link">
        <SectionTitle>{t("home.roster_title")}</SectionTitle>
        <p className="text-lg md:text-xl leading-relaxed">
          {t("home.roster_text")}{" "}
          <Link to={rosterPath} className="text-lynx-orange hover:text-white">
            {t("home.roster_link")}
          </Link>
          .
        </p>
      </Section>

      <Section id="contacto">
        <SectionTitle>{t("home.contact_title")}</SectionTitle>
        <div className="flex justify-center items-center gap-8 text-4xl">
          <a
            href="mailto:lynxracingspain@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.instagram.com/lynxracingspain/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/LynxRacingSpain"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://discord.gg/H8eNsptxVw"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform"
          >
            <FaDiscord />
          </a>
        </div>
      </Section>
    </>
  );
}

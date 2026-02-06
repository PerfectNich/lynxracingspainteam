import { Link } from "react-router-dom";
import { Hero } from "../components/home/Hero";
import { SponsorCarousel } from "../components/home/SponsorCarousel";
import { SimulatorsGrid } from "../components/home/SimulatorsGrid";
import { DiscordWidget } from "../components/home/DiscordWidget";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";
import { FaEnvelope, FaInstagram, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function HomePage() {
  return (
    <>
      <Hero />
      <DiscordWidget />

      <Section id="sponsors">
        <SectionTitle>Sponsors</SectionTitle>
        <SponsorCarousel />
      </Section>

      <Section id="equipo">
        <SectionTitle>Sobre el Equipo</SectionTitle>
        <p className="text-lg md:text-xl leading-relaxed">
          Comunidad del equipo hispano Lynx Racing Spain Team, equipo con más de
          3 años de trayectoria y con cientos de carreras competidas y algún que
          otro evento hecho. Nos puedes encontrar en Assetto, iRacing, LMU,
          entre otros!
        </p>
      </Section>

      <Section id="simuladores">
        <SectionTitle>Simuladores</SectionTitle>
        <SimulatorsGrid />
      </Section>

      <Section id="roster-link">
        <SectionTitle>Roster del Equipo</SectionTitle>
        <p className="text-lg md:text-xl leading-relaxed">
          Puedes ver todos nuestros pilotos y sus Twitch{" "}
          <Link to="/roster" className="text-lynx-orange hover:text-white">
            aquí
          </Link>
          .
        </p>
      </Section>

      <Section id="contacto">
        <SectionTitle>Contacto</SectionTitle>
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

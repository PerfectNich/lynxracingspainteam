import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Hero } from "../components/home/Hero";
import { SimulatorsGrid } from "../components/home/SimulatorsGrid";
import { GradientDots } from "@/components/ui/gradient-dots";
import { FaEnvelope, FaInstagram, FaDiscord, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import sponsorsData from "../data/sponsors.json";
import type { Sponsor } from "../types";
import { assetUrl } from "../utils/assetUrl";

const sponsors = sponsorsData as Sponsor[];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-3"
      style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl md:text-5xl font-black text-white mb-6"
      style={{ fontFamily: 'var(--font-orbitron)' }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="h-px flex-1 bg-lynx-border" />
      <div className="w-2 h-2 rotate-45 bg-lynx-orange" />
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

      {/* ── Sponsors ── */}
      <section className="relative py-10 px-6 bg-lynx-dark-card">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <GradientDots
            dotSize={5}
            spacing={14}
            duration={40}
            colorCycleDuration={8}
            backgroundColor="#141414"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <SectionLabel>Colaboradores</SectionLabel>
            <SectionHeading>Sponsors</SectionHeading>
            <Divider />
          </motion.div>

          {/* All sponsors – una sola fila, tarjetas desordenadas */}
          <div className="flex flex-nowrap justify-center gap-3 overflow-x-auto pb-8 pt-6">
            {sponsors.map((s, i) => {
              const rotations = [-4, 3, -6, 5, -2, 4, -3];
              const rot = rotations[i % rotations.length];
              const cardClass = "flex-shrink-0 bg-lynx-dark border border-lynx-border rounded-xl p-4 flex items-center justify-center hover:border-lynx-orange transition-colors duration-300";
              const cardStyle = { width: 128, height: 80 };
              const inner = (
                <img src={assetUrl(s.logo)} alt={s.name}
                  className="max-h-12 max-w-[100px] object-contain" />
              );
              return (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, rotate: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, rotate: rot, scale: 1 }}
                  whileHover={{ rotate: 0, scale: 1.1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
                >
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer"
                      className={cardClass} style={cardStyle}>{inner}</a>
                  ) : (
                    <div className={cardClass} style={cardStyle}>{inner}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionLabel>Quiénes somos</SectionLabel>
            <SectionHeading>{t("home.about_title")}</SectionHeading>
            <p
              className="text-lynx-text/80 text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '1.15rem' }}
            >
              {t("home.about_text")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Simulators ── */}
      <section className="relative py-20 px-6 bg-lynx-dark-card">
        <div className="absolute inset-0 opacity-20">
          <GradientDots
            dotSize={4}
            spacing={12}
            duration={50}
            colorCycleDuration={10}
            backgroundColor="#141414"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <SectionLabel>Plataformas</SectionLabel>
            <SectionHeading>{t("home.simulators_title")}</SectionHeading>
            <Divider />
          </motion.div>
          <SimulatorsGrid />
        </div>
      </section>

      {/* ── Roster CTA ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,106,0,0.4) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <SectionLabel>Nuestro equipo</SectionLabel>
          <SectionHeading>{t("home.roster_title")}</SectionHeading>
          <p
            className="text-lynx-text/70 text-lg mb-8"
            style={{ fontFamily: 'var(--font-rajdhani)' }}
          >
            {t("home.roster_text")}
          </p>
          <Link
            to={rosterPath}
            className="inline-block border border-lynx-orange text-lynx-orange px-8 py-3 rounded-full font-orbitron text-sm tracking-widest hover:bg-lynx-orange hover:text-black transition-all duration-300"
          >
            {t("home.roster_link")} →
          </Link>
        </motion.div>
      </section>

      {/* ── Media CTA ── */}
      <section className="relative py-16 px-6 bg-lynx-dark-card border-t border-lynx-border">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <SectionLabel>Galería</SectionLabel>
          <SectionHeading>Multimedia</SectionHeading>
          <p
            className="text-lynx-text/70 text-lg mb-8"
            style={{ fontFamily: 'var(--font-rajdhani)' }}
          >
            Fotos y vídeos de nuestras carreras y entrenamientos.
          </p>
          <Link
            to={mediaPath}
            className="inline-block border border-lynx-orange text-lynx-orange px-8 py-3 rounded-full font-orbitron text-sm tracking-widest hover:bg-lynx-orange hover:text-black transition-all duration-300"
          >
            Ver galería →
          </Link>
        </motion.div>
      </section>

      {/* ── Contact ── */}
      <section className="relative py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl mx-auto text-center"
        >
          <SectionLabel>Contacto</SectionLabel>
          <SectionHeading>{t("home.contact_title")}</SectionHeading>
          <Divider />
          <div className="flex justify-center items-center gap-8 mt-10 text-3xl text-lynx-text/70">
            <a href="mailto:lynxracingspain@gmail.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-lynx-orange hover:scale-125 transition-all duration-200">
              <FaEnvelope />
            </a>
            <a href="https://www.instagram.com/lynxracingspain/" target="_blank" rel="noopener noreferrer"
              className="hover:text-pink-500 hover:scale-125 transition-all duration-200">
              <FaInstagram />
            </a>
            <a href="https://x.com/LynxRacingSpain" target="_blank" rel="noopener noreferrer"
              className="hover:text-white hover:scale-125 transition-all duration-200">
              <FaXTwitter />
            </a>
            <a href="https://discord.gg/H8eNsptxVw" target="_blank" rel="noopener noreferrer"
              className="hover:text-social-discord hover:scale-125 transition-all duration-200">
              <FaDiscord />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61571491793124" target="_blank" rel="noopener noreferrer"
              className="hover:text-social-facebook hover:scale-125 transition-all duration-200">
              <FaFacebook />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

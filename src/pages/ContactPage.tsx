import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowRight, FaDiscord, FaEnvelope, FaFacebook, FaInstagram, FaTwitch } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GradientDots } from "@/components/ui/gradient-dots";

export function ContactPage() {
  const { t } = useTranslation();

  const socialLinks = [
    { name: "Discord", url: "https://discord.gg/H8eNsptxVw", icon: FaDiscord, color: "#7289da" },
    { name: "Twitter / X", url: "https://x.com/LynxRacingSpain", icon: FaXTwitter, color: "#1da1f2" },
    { name: "Instagram", url: "https://www.instagram.com/lynxracingspain/", icon: FaInstagram, color: "#e1306c" },
    { name: "Twitch", url: "https://www.twitch.tv/lynxracingspainteam", icon: FaTwitch, color: "#9146ff" },
    {
      name: "Facebook",
      url: "https://www.facebook.com/people/Lynxracingspainteam/100083332022870/",
      icon: FaFacebook,
      color: "#1877f2",
    },
    {
      name: t("contact.email"),
      url: "mailto:lynxracingspain@gmail.com",
      icon: FaEnvelope,
      color: "#ff6a00",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      <div className="relative overflow-hidden border-b border-lynx-border px-6 py-24 text-center">
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
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p
            className="mb-3 text-xs uppercase tracking-[0.4em] text-lynx-orange"
            style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
          >
            {t("contact.hero_label")}
          </p>
          <h1
            className="text-4xl font-black text-white md:text-6xl"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("contact.page_title")}
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-lynx-text/60"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.05rem" }}
          >
            {t("contact.description")}
          </p>
        </motion.div>
      </div>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ y: -3 }}
              className="group flex items-center gap-4 rounded-xl border border-lynx-border bg-lynx-dark-card px-5 py-3.5 transition-colors duration-300 hover:border-lynx-orange"
            >
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-base text-white"
                style={{ backgroundColor: link.color }}
              >
                <link.icon />
              </div>
              <span
                className="font-bold text-white transition-colors duration-200 group-hover:text-lynx-orange"
                style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 600, fontSize: "1rem" }}
              >
                {link.name}
              </span>
              <span
                className="ml-auto text-sm text-lynx-text/30 transition-colors duration-200 group-hover:text-lynx-orange"
                aria-hidden="true"
              >
                <FaArrowRight size={12} />
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-[1.75rem] border border-lynx-border bg-lynx-dark-card p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <p
            className="mb-3 text-xs uppercase tracking-[0.35em] text-lynx-orange"
            style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
          >
            {t("contact.join_label")}
          </p>
          <h2
            className="text-2xl font-black text-white md:text-3xl"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("contact.join_title")}
          </h2>
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
        </div>
      </section>
    </div>
  );
}

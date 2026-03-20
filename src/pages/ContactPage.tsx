import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GradientDots } from "@/components/ui/gradient-dots";
import { FaDiscord, FaInstagram, FaTwitch, FaEnvelope, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function ContactPage() {
  const { t } = useTranslation();

  const socialLinks = [
    { name: "Discord",      url: "https://discord.gg/H8eNsptxVw",                                    icon: FaDiscord,   color: "#7289da" },
    { name: "Twitter / X",  url: "https://x.com/LynxRacingSpain",                                    icon: FaXTwitter,  color: "#1da1f2" },
    { name: "Instagram",    url: "https://www.instagram.com/lynxracingspain/",                        icon: FaInstagram, color: "#e1306c" },
    { name: "Twitch",       url: "https://www.twitch.tv/lynxracingspainteam",                         icon: FaTwitch,    color: "#9146ff" },
    { name: "Facebook",     url: "https://www.facebook.com/people/Lynxracingspainteam/100083332022870/", icon: FaFacebook,  color: "#1877f2" },
    { name: t("contact.email"), url: "mailto:lynxracingspain@gmail.com",                              icon: FaEnvelope,  color: "#ff6a00" },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <div className="relative overflow-hidden py-24 px-6 text-center border-b border-lynx-border">
        <div className="absolute inset-0 opacity-15">
          <GradientDots dotSize={5} spacing={14} duration={35} colorCycleDuration={7} backgroundColor="#0b0b0b" />
        </div>
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,106,0,0.5) 0%, transparent 70%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}>
            Encuéntranos
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}>
            {t("contact.page_title")}
          </h1>
          <p className="text-lynx-text/60 mt-4 max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '1.05rem' }}>
            {t("contact.description")}
          </p>
        </motion.div>
      </div>

      {/* Social links */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="flex items-center gap-4 px-5 py-3.5 rounded-xl border border-lynx-border bg-lynx-dark-card hover:border-lynx-orange transition-colors duration-300 group"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-base"
                style={{ backgroundColor: link.color }}
              >
                <link.icon />
              </div>
              <span
                className="text-white font-bold group-hover:text-lynx-orange transition-colors duration-200"
                style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 600, fontSize: '1rem' }}
              >
                {link.name}
              </span>
              <span className="ml-auto text-lynx-text/30 group-hover:text-lynx-orange transition-colors duration-200 text-sm">→</span>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}

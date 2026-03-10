import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";
import { FaDiscord, FaInstagram, FaTwitch, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function ContactPage() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: "Discord",
      url: "https://discord.gg/H8eNsptxVw",
      icon: FaDiscord,
      className: "bg-social-discord",
    },
    {
      name: "Twitter / X",
      url: "https://x.com/LynxRacingSpain",
      icon: FaXTwitter,
      className: "bg-social-twitter",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/lynxracingspain/",
      icon: FaInstagram,
      className: "bg-social-instagram",
    },
    {
      name: "Twitch",
      url: "https://www.twitch.tv/lynxracingspainteam",
      icon: FaTwitch,
      className: "bg-social-twitch",
    },
    {
      name: t("contact.email"),
      url: "mailto:lynxracingspain@gmail.com",
      icon: FaEnvelope,
      className: "bg-lynx-orange",
    },
  ];

  return (
    <>
      <PageHeader title={t("contact.page_title")} />

      <Section className="flex-1">
        <SectionTitle>{t("contact.section_title")}</SectionTitle>
        <p className="text-lg md:text-xl leading-relaxed mb-8">
          {t("contact.description")}
        </p>

        <div className="flex justify-center gap-3 md:gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={link.name}
              className={`social-link inline-flex items-center justify-center p-4 !text-white no-underline rounded-full transition-all duration-300 hover:scale-125 hover:shadow-orange-glow ${link.className}`}
            >
              <link.icon className="text-3xl" />
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}

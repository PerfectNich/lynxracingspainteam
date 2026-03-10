import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";
import { assetUrl } from "../utils/assetUrl";

export function PalmaresPage() {
  const { t } = useTranslation();

  const medal = (pos: number) => {
    switch (pos) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "";
    }
  };

  const carLogo = (brand: string) => (
    <span className="ml-2 inline-block w-6 h-6">
      <img src={assetUrl(`/marcas/${brand}.png`)} alt={brand} className="w-full h-full object-contain" />
    </span>
  );

  const eventName = (key: string) => (
    <span className="font-semibold" style={{ color: "var(--color-lynx-orange-light)" }}>
      {t(key)}
    </span>
  );

  return (
    <>
      <PageHeader title={t("palmares.page_title")} />

      <Section>
        <p className="text-lynx-text text-center">
          {t("palmares.intro")}
        </p>
        <hr className="border-lynx-border my-6" />

        <SectionTitle>Assetto Corsa Competizione</SectionTitle>
        <ul className="list-disc list-inside space-y-1">
          <li>{medal(1)} {eventName("palmares.acc.e1")} Kiko Ribes | Xavier Sobrerroca – 2023 {carLogo("porsche")}</li>
          <li>{medal(2)} {eventName("palmares.acc.e2")} Dani Gala | Juan Serrano | Jorge Pola – 2022 {carLogo("aston")}</li>
          <li>{medal(3)} {eventName("palmares.acc.e3")} Kiko Ribes | Juan Serrano – 2022 {carLogo("aston")}</li>
          <li>{medal(7)} {eventName("palmares.acc.e4")} Jordi Capdevila | Luis Ungo | Juan Serrano | Xavier Sobrerroca | Albert Gombau – 2025 {carLogo("ferrari")}</li>
          <li>{medal(1)} {eventName("palmares.acc.e5")} Juan Serrano | Josh Mopar | Xavier Sobrerroca – 2023 {carLogo("aston")}</li>
          <li>{medal(4)} {eventName("palmares.acc.e6")} Jordi Capdevila | Francisco Sierra – 2025 {carLogo("ferrari")}</li>
        </ul>
        <hr className="border-lynx-border my-6" />

        <SectionTitle>iRacing</SectionTitle>
        <ul className="list-disc list-inside space-y-1">
          <li>{medal(2)} {eventName("palmares.iracing.e1")} Jordi Capdevila | Jesús Jiménez | Francisco Sierra | Luis Ungo | Xavier Sobrerroca – 2026 {carLogo("porsche")}</li>
          <li>{medal(4)} {eventName("palmares.iracing.e2")} Albert Gombau | Lalo Sanchez – 2024 {carLogo("acura")}</li>
          <li>{medal(3)} {eventName("palmares.iracing.e3")} Angel Alvarado | Albert Gombau | Nacho Jarrín - 2026 {carLogo("mclaren")}</li>
          <li>{eventName("palmares.iracing.e4")} Jordi Capdevila | Francisco Sierra - 2026 {carLogo("porsche")}</li>
        </ul>
      </Section>
    </>
  );
}

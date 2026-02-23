import { PageHeader } from "../../components/common/PageHeader";
import { Section } from "../../components/common/Section";
import { SectionTitle } from "../../components/common/SectionTitle";
import { assetUrl } from "../../utils/assetUrl";

export function PalmaresPageEN() {
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

  return (
    <>
      <PageHeader title="Palmarès (EN)" />

      <Section>
        <p className="text-lynx-text text-center">
          Below are the team's notable results and achievements across simulators.
          Pilot names are kept as in the original language.
        </p>
        <hr className="border-lynx-border my-6" />

        <SectionTitle>Assetto Corsa Competizione</SectionTitle>
        <ul className="list-disc list-inside space-y-1">
          <li>
            {medal(1)} <span className="font-semibold" style={{ color: "var(--color-lynx-orange-light)" }}>
              4h Barcelona Endurance | La Cueva Charity
            </span>{" "}
            Kiko Ribes | Xavier Sobrerroca – 2023
            <span className="ml-2 inline-block w-4 h-4">
              <img src={assetUrl("/marcas/porsche.png")} alt="Porsche" className="w-full h-full object-contain" />
            </span>
          </li>
          <li>
            {medal(2)} <span className="font-semibold" style={{ color: "var(--color-lynx-orange-light)" }}>
              8h Suzuka Endurance | CER-V
            </span>{" "}
            Dani Gala | Juan Serrano | Jorge Pola – 2022
            <span className="ml-2 inline-block w-4 h-4">
              <img src={assetUrl("/marcas/aston.png")} alt="Aston" className="w-full h-full object-contain" />
            </span>
          </li>
        </ul>

        <hr className="border-lynx-border my-6" />

        <SectionTitle>iRacing</SectionTitle>
        <ul className="list-disc list-inside space-y-1">
          <li>
            {medal(2)} <span className="font-semibold" style={{ color: "var(--color-lynx-orange-light)" }}>
              24h Daytona Endurance
            </span>{" "}
            Jordi Capdevila | Jesus Jimenez | Francisco Sierra | Luis Ungo | Xavier Sobrerroca – 2026
            <span className="ml-2 inline-block w-4 h-4">
              <img src={assetUrl("/marcas/porsche.png")} alt="Porsche" className="w-full h-full object-contain" />
            </span>
          </li>
        </ul>
      </Section>
    </>
  );
}

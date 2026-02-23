import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";

export function PalmaresPage() {
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
      <PageHeader title="Palmarés" />

      <Section>
        <p className="text-lynx-text text-center">
          A continuación mostramos los puestos destacados conseguidos por el
          equipo en las diferentes categorías. Se incluyen sólo las posiciones
          de podio o buenas clasificaciones relevantes.
        </p>

        <SectionTitle>Equipo / Resistencias</SectionTitle>
        <ul className="list-disc list-inside space-y-1">
          <li>
            {medal(1)} ACC – P1 Resistencia 4h Barcelona | Benéfica de La Cueva
            (Kiko Ribes + Xavier Sobrerroca) – 2023
          </li>
          <li>
            {medal(2)} ACC – P2 Resistencia 8h Suzuka | CER-V (Dani Gala + Juan
            Serrano + Jorge Pola) – 2022
          </li>
          <li>
            {medal(3)} ACC – P3 Resistencia 9h Kyalami | CER-V (Kiko Ribes + Juan
            Serrano) – 2022
          </li>
          <li>
            {medal(7)} ACC – P7 Resistencia 24h Nordschleife | Pitskill (Capi,
            Mcrally, Juan, Xavi, Gombi) – 2025
          </li>
          <li>
            {medal(1)} ACC – P1 Campeonato CNE II VRGirona (Juan, Mopar, Xavi)
            – 2023
          </li>
          <li>
            {medal(4)} ACC – P4 Endurance 4h Titanium Red | Jordi Capdevila,
            Kikologo
          </li>
        </ul>

        <SectionTitle>iRacing</SectionTitle>
        <ul className="list-disc list-inside space-y-1">
          <li>
            {medal(2)} iRacing – P2 Resistencia 24h Daytona | Capi, Jesus,
            Kikologo, Luis, Xavi – 2026 | Porsche GT3
          </li>
          <li>
            {medal(4)} iRacing – P4 Resistencia 6h Watkins Glen | Gombi, Lalo –
            2024 | Coche: Acura GTP
          </li>
          <li>
            {medal(3)} iRacing – P3 Resistencia 12h Mount Panorama | Angel -
            Gombau - Nacho – mclaren
          </li>
        </ul>
      </Section>
    </>
  );
}
 
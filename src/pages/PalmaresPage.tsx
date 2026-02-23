import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";
import { assetUrl } from "../utils/assetUrl";

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
          A continuación mostramos los puestos destacados y/o conseguidos por el
          equipo en las diferentes simuladores. 
        </p>
        <hr className="border-lynx-border my-6" />

        <SectionTitle>Assetto Corsa Competizione</SectionTitle>
        <ul className="list-disc list-inside space-y-1">
          <li>
            {medal(1)} P1 Resistencia 4h Barcelona | Benéfica de La Cueva
            (Kiko Ribes + Xavier Sobrerroca) – 2023
            <span className="ml-2 inline-block w-4 h-4">
              <img
                src={assetUrl("/marcas/porsche.png")}
                alt="Porsche"
                className="w-full h-full object-contain"
              />
            </span>
          </li>
          <li>
            {medal(2)} P2 Resistencia 8h Suzuka | CER-V (Dani Gala + Juan
            Serrano + Jorge Pola) – 2022
            <span className="ml-2 inline-block w-4 h-4">
              <img
                src={assetUrl("/marcas/aston.png")}
                alt="Aston"
                className="w-full h-full object-contain"
              />
            </span>
          </li>
          <li>
            {medal(3)} P3 Resistencia 9h Kyalami | CER-V (Kiko Ribes + Juan
            Serrano) – 2022
            <span className="ml-2 inline-block w-4 h-4">
              <img
                src={assetUrl("/marcas/aston.png")}
                alt="Aston"
                className="w-full h-full object-contain"
              />
            </span>
          </li>
          <li>
            {medal(7)} P7 Resistencia 24h Nordschleife | Pitskill (Jordi Capdevila,
            Luis Ungo, Juan Serrano, Xavier Sobrerroca, Albert Gombau) – 2025
            <span className="ml-2 inline-block w-4 h-4">
              <img
                src={assetUrl("/marcas/ferrari.png")}
                alt="Ferrari"
                className="w-full h-full object-contain"
              />
            </span>
          </li>
          <li>
            {medal(1)} P1 Campeonato CNE II VRGirona (Juan Serrano, Josh Mopar, Xavier Sobrerroca)
            – 2023
            <span className="ml-2 inline-block w-4 h-4">
              <img
                src={assetUrl("/marcas/aston.png")}
                alt="Aston"
                className="w-full h-full object-contain"
              />
            </span>
          </li>
          <li>
            {medal(4)} P4 Endurance 4h Titanium Red | Jordi Capdevila,
            Francisco Sierra - 2025
            <span className="ml-2 inline-block w-4 h-4">
              <img
                src={assetUrl("/marcas/ferrari.png")}
                alt="Ferrari"
                className="w-full h-full object-contain"
              />
            </span>
          </li>
        </ul>
        <hr className="border-lynx-border my-6" />

        <SectionTitle>iRacing</SectionTitle>
        <ul className="list-disc list-inside space-y-1">
          <li>
            {medal(2)} P2 Resistencia 24h Daytona | Jordi Capdevila, Jesus Jimenez,
            Francisco Sierra, Luis Ungo, Xavier Sobrerroca – 2026 | 
            <span className="ml-2 inline-block w-4 h-4">
              <img
                src={assetUrl("/marcas/porsche.png")}
                alt="Porsche"
                className="w-full h-full object-contain"
              />
            </span>
          </li>
          <li>
            {medal(4)}  P4 Resistencia 6h Watkins Glen | Albert Gombau, Lalo Sanchez –
            2024 | 
            <span className="ml-2 inline-block w-4 h-4">
              <img
                src={assetUrl("/marcas/acura.png")}
                alt="Acura"
                className="w-full h-full object-contain"
              />
            </span>
          
          </li>
          <li>
            {medal(3)} P3 Resistencia 12h Mount Panorama | Angel Alvarado -
            Albert Gombau - Nacho Jarrín – 
            <span className="ml-2 inline-block w-4 h-4">
              <img
                src={assetUrl("/marcas/mclaren.png")}
                alt="Mclaren"
                className="w-full h-full object-contain"
              />
            </span>
            
          </li>
        </ul>
      </Section>
    </>
  );
}
 
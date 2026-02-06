import results from "../data/results.json";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";
import type { ResultsCategory } from "../types";

function ResultsTable({ category }: { category: ResultsCategory }) {
  return (
    <div className="mb-12">
      <SectionTitle>{category.title}</SectionTitle>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-12">
          <thead>
            <tr>
              <th className="bg-lynx-dark-card text-lynx-orange p-3 text-center border-b border-lynx-border">
                Pos
              </th>
              <th className="bg-lynx-dark-card text-lynx-orange p-3 text-center border-b border-lynx-border">
                Piloto
              </th>
              <th className="bg-lynx-dark-card text-lynx-orange p-3 text-center border-b border-lynx-border">
                Simulador
              </th>
              <th className="bg-lynx-dark-card text-lynx-orange p-3 text-center border-b border-lynx-border">
                Tiempo Total
              </th>
              <th className="bg-lynx-dark-card text-lynx-orange p-3 text-center border-b border-lynx-border">
                Puntos
              </th>
            </tr>
          </thead>
          <tbody>
            {category.results.map((result) => (
              <tr
                key={`${result.driver}-${result.pos}`}
                className="even:bg-[#1a1a1a] hover:bg-lynx-border hover:scale-[1.01] transition-all duration-200"
              >
                <td className="p-3 text-center border-b border-lynx-border">
                  {result.pos}
                </td>
                <td className="p-3 text-center border-b border-lynx-border">
                  {result.driver}
                </td>
                <td className="p-3 text-center border-b border-lynx-border">
                  {result.simulator}
                </td>
                <td className="p-3 text-center border-b border-lynx-border">
                  {result.time}
                </td>
                <td className="p-3 text-center border-b border-lynx-border">
                  {result.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ResultsPage() {
  const { endurance, rally } = results as {
    endurance: ResultsCategory;
    rally: ResultsCategory;
  };

  return (
    <>
      <PageHeader title="Resultados y Endurance" />

      <Section>
        <ResultsTable category={endurance} />
        <ResultsTable category={rally} />
      </Section>
    </>
  );
}

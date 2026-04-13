import simulators from "../../data/simulators.json";
import { Card } from "../common/Card";

const excluded = ["Automobilista 2", "Gran Turismo"];

export function SimulatorsGrid() {
  const all = simulators.filter((sim) => {
    const name = typeof sim === "string" ? sim : sim.name;
    return !excluded.includes(name);
  });

  // Assetto en la segunda fila, el resto en la primera
  const nonAssetto = all.filter((s) => !(typeof s === "string" ? s : s.name).startsWith("Assetto"));
  const assetto = all.filter((s) => (typeof s === "string" ? s : s.name).startsWith("Assetto"));
  const ordered = [...nonAssetto, ...assetto];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
      {ordered.map((sim) => {
        const name = typeof sim === "string" ? sim : sim.name;
        const url = typeof sim === "string" ? undefined : sim.url;

        if (url) {
          return (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer">
              <Card className="text-center py-4 sm:py-5 min-h-16 flex items-center justify-center">
                {name}
              </Card>
            </a>
          );
        }

        return (
          <Card key={name} className="text-center py-4 sm:py-5 min-h-16 flex items-center justify-center">
            {name}
          </Card>
        );
      })}
    </div>
  );
}

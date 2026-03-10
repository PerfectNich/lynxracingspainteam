import simulators from "../../data/simulators.json";
import { Card } from "../common/Card";

export function SimulatorsGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
      {simulators.map((sim) => {
        const name = typeof sim === "string" ? sim : sim.name;
        const url = typeof sim === "string" ? undefined : sim.url;

        if (url) {
          return (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer">
              <Card className="text-center py-5">{name}</Card>
            </a>
          );
        }

        return (
          <Card key={name} className="text-center py-5">
            {name}
          </Card>
        );
      })}
    </div>
  );
}

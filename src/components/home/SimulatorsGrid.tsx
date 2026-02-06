import simulators from "../../data/simulators.json";
import { Card } from "../common/Card";

export function SimulatorsGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
      {simulators.map((sim) => (
        <Card key={sim} className="text-center py-5">
          {sim}
        </Card>
      ))}
    </div>
  );
}

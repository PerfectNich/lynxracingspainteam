import data from "./team-event.json";

interface TeamEvent {
  title: string;
  startDate: string | null;
  endDate: string | null;
  simulator: string;
  category: string;
  teams: number;
  status: "preparing" | "completed";
  car: string | null;
  drivers: string[];
  entries: {
    name: string;
    category: string;
    car?: string | null;
    result?: string | null;
    drivers: string[];
  }[];
}

const teamEvent = data as TeamEvent;
export default teamEvent;

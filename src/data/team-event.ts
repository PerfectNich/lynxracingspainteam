import data from "./team-event.json";

interface TeamEvent {
  title: string;
  startDate: string | null;
  endDate: string | null;
  startTime?: string | null;
  simulator: string | null;
  category: string | null;
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
  otherEvents?: {
    titleKey: string;
    startDate: string | null;
    endDate: string | null;
    startTime?: string | null;
    simulator: string | null;
    category: string;
    status: "tentative" | "preparing";
    car: string | null;
    drivers: string[];
  }[];
}

const teamEvent = data as TeamEvent;
export default teamEvent;

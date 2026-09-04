import results from "./race-results.json";

export interface PalmaresEntry {
  id: string;
  pos: number;
  event: string;
  simulator: string;
  drivers: string[];
  car: string;
  year: number;
  featured: boolean;
}

export const raceResults: PalmaresEntry[] = results;

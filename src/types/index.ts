export interface Member {
  name: string;
  dorsal: string | null;
  country: string;
  twitch: string | null;
}

export interface Sponsor {
  name: string;
  logo: string;
  url: string | null;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
  game: string;
}

export interface RaceResult {
  pos: number;
  driver: string;
  simulator: string;
  time: string;
  points: number;
}

export interface ResultsCategory {
  title: string;
  results: RaceResult[];
}

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
  nameKey: string;
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

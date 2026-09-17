export interface Member {
  name: string;
  dorsal: string | null;
  country: string;
  twitch: string | null;
  portrait?: string;
  portraitPosition?: string;
}

export interface Sponsor {
  name: string;
  logo: string;
  url: string | null;
  published?: boolean;
  description?: Partial<Record<"es" | "en" | "ca", string>>;
  discount?: {
    code?: string;
    description: Partial<Record<"es" | "en" | "ca", string>>;
    terms?: Partial<Record<"es" | "en" | "ca", string>>;
    expiresOn?: string;
  } | null;
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

export type EventCategory = "Conference" | "Summit" | "Forum" | "Workshop" | "Networking";

export type EventItem = {
  slug: string;
  title: string;
  category: EventCategory;
  theme: string;
  start: string;
  end: string;
  timeZone: string;
  venue: string;
  city: string;
  region: string;
  travel: string;
  excerpt: string;
  description: string[];
  image: string;
  imageAlt: string;
  priceFrom: number;
  currency: "USD";
  featured?: boolean;
  speakerSlugs: string[];
};

export type Speaker = {
  slug: string;
  name: string;
  title: string;
  expertise: string[];
  bio: string;
  image: string;
  imageAlt: string;
};

export type Session = {
  id: string;
  eventSlug: string;
  start: string;
  end: string;
  title: string;
  speakerSlug?: string;
  category: string;
  location: string;
  description: string;
};

export type TicketTier = {
  id: string;
  name: string;
  price: number;
  currency: "USD";
  summary: string;
  benefits: string[];
};

export type Sponsor = {
  name: string;
  tier: string;
  href?: string;
};

export type Timing = "upcoming" | "live" | "past";

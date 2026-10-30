export const site = {
  name: "B&JEvents",
  identity: "B&JEvents — Events & Conference Hub",
  tagline: "Creating Moments. Connecting People. Inspiring Possibilities.",
  statement:
    "We bring people, ideas, and opportunities together through extraordinary events, professional conferences, creative experiences, and meaningful connections.",
  description:
    "B&JEvents designs professional conferences, workshops, and gatherings where people, ideas, and opportunities meet.",
  announcement: "Something extraordinary is happening. Discover our upcoming experiences.",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/speakers", label: "Speakers" },
  { href: "/schedule", label: "Schedule" },
  { href: "/contact", label: "Contact" },
] as const;

/** Add a real profile URL here when one exists. Empty entries are not rendered. */
export const socialLinks: { label: string; href: string }[] = [];

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export const interestSubjects: Record<string, string> = {
  corporate: "Corporate event inquiry",
  workshop: "Workshop inquiry",
  networking: "Networking event inquiry",
  planning: "Event planning inquiry",
  "plan-event": "Plan your event",
};

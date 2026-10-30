import type { EventItem, Session, Timing } from "../types";

/** First-render clock so server and client markup match. Live components replace it after mount. */
export const initialClock = Date.parse("2026-10-29T19:00:00.000Z");

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function clampQuantity(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(6, Math.max(1, Math.floor(value)));
}

export function ticketTotal(price: number, quantity: number) {
  return price * clampQuantity(quantity);
}

export function eventTiming(startIso: string, endIso: string, nowMs: number): Timing {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  if (nowMs < start) return "upcoming";
  if (nowMs < end) return "live";
  return "past";
}

export function countdownParts(targetIso: string, nowMs: number) {
  const diff = new Date(targetIso).getTime() - nowMs;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, status: "complete" as const };
  }
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    status: "upcoming" as const,
  };
}

export function filterEvents(
  events: EventItem[],
  query: { q: string; category: string; when: "all" | "upcoming" | "past"; now: number },
) {
  const needle = query.q.trim().toLowerCase();
  return events
    .filter((event) => {
      const timing = eventTiming(event.start, event.end, query.now);
      const past = timing === "past";
      if (query.when === "upcoming" && past) return false;
      if (query.when === "past" && !past) return false;
      if (query.category !== "all" && event.category !== query.category) return false;
      if (!needle) return true;
      const haystack = [event.title, event.city, event.venue, event.category, event.theme, event.excerpt]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    })
    .sort((a, b) => {
      const aTime = new Date(a.start).getTime();
      const bTime = new Date(b.start).getTime();
      if (query.when === "past") return bTime - aTime;
      return aTime - bTime;
    });
}

export function filterSpeakers<T extends { name: string; title: string; bio: string; expertise: string[] }>(
  speakers: T[],
  query: { q: string; expertise: string },
) {
  const needle = query.q.trim().toLowerCase();
  return speakers.filter((speaker) => {
    if (query.expertise !== "all" && !speaker.expertise.includes(query.expertise)) return false;
    if (!needle) return true;
    const haystack = [speaker.name, speaker.title, speaker.bio, ...speaker.expertise].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

export function sortSessions(sessions: Session[]) {
  return [...sessions].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

export function formatMoney(amount: number, currency: "USD" = "USD") {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted} ${currency}`;
}

export function formatTime(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(new Date(iso));
}

export function dayKey(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export function dayLabel(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(new Date(iso));
}

export function timeZoneName(iso: string, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(new Date(iso));
  return parts.find((part) => part.type === "timeZoneName")?.value ?? timeZone;
}

export function formatEventWhen(start: string, end: string, timeZone: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const sameDay = dayKey(start, timeZone) === dayKey(end, timeZone);
  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  });
  const zone = timeZoneName(start, timeZone);
  if (sameDay) {
    return `${date.format(startDate)} · ${formatTime(start, timeZone)}–${formatTime(end, timeZone)} ${zone}`;
  }
  return `${date.format(startDate)} – ${date.format(endDate)} · ${zone}`;
}

export function formatShortDate(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(new Date(iso));
}

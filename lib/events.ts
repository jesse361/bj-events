import { eventTiming } from "./domain";
import type { EventItem } from "../types";

/**
 * Sample program used to demonstrate the website.
 * Dates, venues, prices, and descriptions are illustrative and easy to replace.
 */
export const events: EventItem[] = [
  {
    slug: "future-of-technology-conference",
    title: "Future of Technology Conference",
    category: "Conference",
    theme: "Ideas worth building, shared in a room that can hold them.",
    start: "2027-03-18T08:30:00-04:00",
    end: "2027-03-19T17:00:00-04:00",
    timeZone: "America/New_York",
    venue: "Harbor Hall",
    city: "New York",
    region: "Sample venue near the Manhattan waterfront",
    travel:
      "Sample travel note: guests often arrive through the regional rail network or a taxi from the nearest airport. Routes should be confirmed once a venue contract is in place.",
    excerpt: "Two days of keynotes, conversations, and workshops on how technology meets the people who use it.",
    description: [
      "This sample conference is the flagship program on the B&JEvents website. It shows how a multi-day gathering can move from a morning welcome to an evening of unhurried conversation.",
      "The schedule balances a main stage with smaller rooms, so guests can listen, practice, and meet without the day feeling crowded.",
      "Venue, speakers, and ticket availability are illustrative. Replace this copy when the real program is confirmed.",
    ],
    image: "/images/event-technology.jpg",
    imageAlt: "A speaker presenting on stage to a seated conference audience.",
    priceFrom: 149,
    currency: "USD",
    featured: true,
    speakerSlugs: ["amara-cole", "julian-hart", "priya-raman", "elias-navarro", "naomi-chen", "marcus-adeyemi"],
  },
  {
    slug: "networking-and-connections",
    title: "Networking & Connections Experience",
    category: "Networking",
    theme: "An evening arranged so introductions feel natural.",
    start: "2027-02-11T18:00:00-05:00",
    end: "2027-02-11T21:30:00-05:00",
    timeZone: "America/New_York",
    venue: "The Conservatory",
    city: "Boston",
    region: "Sample evening venue",
    travel:
      "Sample travel note: the illustrated venue sits in central Boston. Guests would typically arrive by subway, rideshare, or a short walk from nearby hotels.",
    excerpt: "A hosted evening for people who want a real conversation, not a crowded room of name badges.",
    description: [
      "This sample gathering is built around hosted introductions, a short welcome, and time that actually belongs to the guests.",
      "It is designed as a single evening so people can arrive after work and leave with a few meaningful contacts.",
    ],
    image: "/images/event-networking.jpg",
    imageAlt: "Professionals talking together around a table during an evening gathering.",
    priceFrom: 79,
    currency: "USD",
    speakerSlugs: ["naomi-chen", "marcus-adeyemi"],
  },
  {
    slug: "business-leadership-summit",
    title: "Business Leadership Summit",
    category: "Summit",
    theme: "Clear thinking for people who host teams and decisions.",
    start: "2027-04-22T09:00:00-05:00",
    end: "2027-04-22T17:30:00-05:00",
    timeZone: "America/Chicago",
    venue: "The Atrium",
    city: "Chicago",
    region: "Sample downtown venue",
    travel:
      "Sample travel note: downtown Chicago is served by major airports and the elevated train. Allow extra time if the program day begins at nine.",
    excerpt: "A one-day summit for people leading teams, with practical conversations and room to compare notes.",
    description: [
      "The sample summit keeps the program to a single day: a focused morning, a working lunch, and an afternoon of smaller roundtables.",
      "It is written for operators and hosts who want ideas they can use with their own teams the following week.",
    ],
    image: "/images/event-leadership.jpg",
    imageAlt: "Colleagues in a bright meeting room gathered around a table in discussion.",
    priceFrom: 189,
    currency: "USD",
    speakerSlugs: ["julian-hart", "elias-navarro"],
  },
  {
    slug: "creative-entrepreneurs-forum",
    title: "Creative Entrepreneurs Forum",
    category: "Forum",
    theme: "Practice, critique, and company for independent makers.",
    start: "2027-05-14T10:00:00-07:00",
    end: "2027-05-14T18:00:00-07:00",
    timeZone: "America/Los_Angeles",
    venue: "Studio House",
    city: "Los Angeles",
    region: "Sample studio venue",
    travel:
      "Sample travel note: plan for Los Angeles traffic. Rideshare from the west side or a nearby hotel is the simplest illustrated route.",
    excerpt: "A forum for founders and makers who want critique, company, and a day that feels made rather than staged.",
    description: [
      "This sample forum uses a studio setting: fewer slides, more shared work, and time to talk through what guests are actually building.",
      "The day closes with an open forum so the room can respond to what it heard.",
    ],
    image: "/images/event-creative.jpg",
    imageAlt: "A small group reviewing work together on a laptop in a bright studio.",
    priceFrom: 129,
    currency: "USD",
    speakerSlugs: ["priya-raman", "naomi-chen"],
  },
  {
    slug: "digital-innovation-workshop",
    title: "Digital Innovation Workshop",
    category: "Workshop",
    theme: "A working day for trying an idea, not only hearing about it.",
    start: "2027-06-03T09:30:00-05:00",
    end: "2027-06-03T16:00:00-05:00",
    timeZone: "America/Chicago",
    venue: "Northlight Rooms",
    city: "Austin",
    region: "Sample workshop rooms",
    travel:
      "Sample travel note: Austin-Bergstrom is the nearest major airport in this illustration. Most guests would continue by rideshare.",
    excerpt: "A hands-on workshop for teams who want to leave with a draft, a decision, or a clearer brief.",
    description: [
      "The sample workshop is intentionally small. Tables are set for making, and the timetable leaves room to revise an idea before the day ends.",
      "It suits teams who already know the problem and want a structured day to work on it together.",
    ],
    image: "/images/event-workshop.jpg",
    imageAlt: "People collaborating around laptops and notes in a workshop setting.",
    priceFrom: 219,
    currency: "USD",
    speakerSlugs: ["elias-navarro", "amara-cole"],
  },
  {
    slug: "emerging-technologies-conference",
    title: "Emerging Technologies Conference",
    category: "Conference",
    theme: "New tools, explained with care and put in context.",
    start: "2027-09-09T09:00:00-07:00",
    end: "2027-09-10T16:00:00-07:00",
    timeZone: "America/Los_Angeles",
    venue: "Pacific Center",
    city: "Seattle",
    region: "Sample waterfront conference center",
    travel:
      "Sample travel note: Sea-Tac connects to the city by light rail in this illustration. Downtown hotels are a short ride from the sample venue.",
    excerpt: "A two-day conference on tools and practices that are just arriving, hosted with context instead of hype.",
    description: [
      "This sample conference gives new technology a slower reading: what it changes, who it affects, and where a team should be careful.",
      "The second day is shorter, so guests can travel home without missing the close.",
    ],
    image: "/images/event-emerging.jpg",
    imageAlt: "An audience watching a presenter on a conference stage with large screens.",
    priceFrom: 249,
    currency: "USD",
    speakerSlugs: ["marcus-adeyemi", "amara-cole", "julian-hart"],
  },
  {
    slug: "design-and-dialogue",
    title: "Design & Dialogue Gathering",
    category: "Forum",
    theme: "A past sample program about critique and conversation.",
    start: "2026-06-12T10:00:00-05:00",
    end: "2026-06-12T16:00:00-05:00",
    timeZone: "America/Chicago",
    venue: "Sample rooms, River North",
    city: "Chicago",
    region: "Illustrative past venue",
    travel: "Sample travel note retained for the archive view. This program date has passed.",
    excerpt: "A past sample forum used to show how completed programs remain easy to find.",
    description: [
      "This entry is a past sample so the events page can filter completed programs separately from what is still ahead.",
      "Nothing on this page confirms that the gathering took place at a real venue.",
    ],
    image: "/images/event-past-design.jpg",
    imageAlt: "A team meeting in a glass-walled room, used as the image for a past sample forum.",
    priceFrom: 99,
    currency: "USD",
    speakerSlugs: ["priya-raman", "naomi-chen"],
  },
  {
    slug: "autumn-leadership-forum",
    title: "Autumn Leadership Forum",
    category: "Summit",
    theme: "A past sample day for leadership conversations.",
    start: "2026-09-04T09:00:00-04:00",
    end: "2026-09-04T17:00:00-04:00",
    timeZone: "America/New_York",
    venue: "Sample hall, Back Bay",
    city: "Boston",
    region: "Illustrative past venue",
    travel: "Sample travel note retained for the archive view. This program date has passed.",
    excerpt: "A past sample summit kept on the calendar so guests can browse earlier programs.",
    description: [
      "This is sample archive content. It gives the schedule and event pages a completed program to display.",
      "Speakers and the venue name are placeholders.",
    ],
    image: "/images/event-past-autumn.jpg",
    imageAlt: "A presenter speaking at a lectern in a formal meeting room.",
    priceFrom: 159,
    currency: "USD",
    speakerSlugs: ["julian-hart", "marcus-adeyemi"],
  },
];

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function getFeaturedEvent() {
  return events.find((event) => event.featured) ?? events[0];
}

export function relatedEvents(slug: string, limit = 3) {
  const current = getEvent(slug);
  if (!current) return [];
  const sameCategory = events.filter((event) => event.slug !== slug && event.category === current.category);
  const others = events.filter((event) => event.slug !== slug && event.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function upcomingEvents(now: number) {
  return events
    .filter((event) => eventTiming(event.start, event.end, now) !== "past")
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

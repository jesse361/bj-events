"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { filterEvents, initialClock } from "@/lib/domain";
import { cn } from "@/lib/cn";
import type { EventCategory, EventItem } from "@/types";

const categories: Array<EventCategory | "all"> = ["all", "Conference", "Summit", "Forum", "Workshop", "Networking"];
const whens = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "all", label: "All" },
] as const;

export function EventExplorer({ events }: { events: EventItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [when, setWhen] = useState<(typeof whens)[number]["id"]>("upcoming");
  const [clock, setClock] = useState(initialClock);

  useEffect(() => {
    const update = () => setClock(Date.now());
    const timeout = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 60_000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  const results = filterEvents(events, { q: query, category, when, now: clock });

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full max-w-md">
          <label htmlFor="event-search" className="text-sm font-semibold text-forest">
            Search events
          </label>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-quiet" aria-hidden="true" />
            <input
              id="event-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, city, or theme"
              className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-sm text-ink"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Show upcoming or past events">
          {whens.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={when === item.id}
              onClick={() => setWhen(item.id)}
              className={cn(
                "h-10 rounded-full px-4 text-sm",
                when === item.id ? "bg-forest text-white" : "border border-line bg-white text-quiet",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Event categories">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={cn(
              "h-9 rounded-full px-3 text-sm",
              category === item ? "bg-sage text-forest" : "text-quiet hover:bg-sage-light",
            )}
          >
            {item === "all" ? "All categories" : item}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-quiet" aria-live="polite">
        {results.length === 0 ? "No events match that search." : `${results.length} ${results.length === 1 ? "event" : "events"}`}
      </p>
      {results.length === 0 ? (
        <div className="mt-8 rounded-[1.6rem] bg-white px-6 py-12">
          <h2 className="font-serif text-3xl text-forest">Nothing matches yet.</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
            Try another word, or switch between upcoming and past programs. The list uses the sample calendar on this site.
          </p>
          <button
            type="button"
            className="mt-6 text-sm font-semibold text-forest underline-offset-4 hover:underline"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setWhen("all");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {results.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

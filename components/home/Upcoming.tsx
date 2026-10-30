"use client";

import { useEffect, useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventTiming, initialClock } from "@/lib/domain";
import type { EventItem } from "@/types";

export function Upcoming({ events }: { events: EventItem[] }) {
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

  const visible = events
    .filter((event) => eventTiming(event.start, event.end, clock) !== "past")
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 6);
  return (
    <section className="bg-ivory py-20 md:py-28" aria-labelledby="upcoming-heading">
      <Container>
        <SectionHeading
          id="upcoming-heading"
          label="Upcoming experiences"
          title="Discover Events Worth Being Part Of."
          text="From professional conferences to creative workshops, discover experiences designed to inspire, connect, and create opportunities."
        />
        <p className="mt-4 text-sm text-quiet">Sample program details, shown so the calendar can be reviewed and replaced.</p>
        <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
        <div className="mt-12">
          <ButtonLink href="/events">Explore All Events</ButtonLink>
        </div>
      </Container>
    </section>
  );
}

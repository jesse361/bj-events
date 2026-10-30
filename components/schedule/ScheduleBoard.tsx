"use client";

import { useMemo, useState } from "react";
import { dayKey, dayLabel, formatTime } from "@/lib/domain";
import { cn } from "@/lib/cn";
import { getSpeaker } from "@/lib/speakers";
import type { EventItem, Session } from "@/types";

export function ScheduleBoard({
  events,
  sessions,
  initialSlug,
}: {
  events: EventItem[];
  sessions: Session[];
  initialSlug: string;
}) {
  const [eventSlug, setEventSlug] = useState(initialSlug);
  const [day, setDay] = useState<string | null>(null);
  const event = events.find((item) => item.slug === eventSlug) ?? events[0];

  const days = useMemo(() => {
    if (!event) return [];
    const list = sessions
      .filter((session) => session.eventSlug === event.slug)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    const groups = new Map<string, { key: string; label: string; items: Session[] }>();
    for (const session of list) {
      const key = dayKey(session.start, event.timeZone);
      const current = groups.get(key);
      if (current) current.items.push(session);
      else groups.set(key, { key, label: dayLabel(session.start, event.timeZone), items: [session] });
    }
    return Array.from(groups.values());
  }, [event, sessions]);

  const activeKey = day && days.some((item) => item.key === day) ? day : days[0]?.key;
  const active = days.find((item) => item.key === activeKey);

  return (
    <div>
      <label htmlFor="schedule-event" className="text-sm font-semibold text-forest">
        Program
      </label>
      <select
        id="schedule-event"
        value={event?.slug}
        onChange={(change) => {
          setEventSlug(change.target.value);
          setDay(null);
        }}
        className="mt-2 h-12 w-full max-w-lg rounded-full border border-line bg-white px-4 text-sm"
      >
        {events.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.title}
          </option>
        ))}
      </select>
      {days.length > 1 ? (
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Event days">
          {days.map((item, index) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={item.key === activeKey}
              onClick={() => setDay(item.key)}
              className={cn(
                "h-10 rounded-full px-4 text-sm",
                item.key === activeKey ? "bg-forest text-white" : "border border-line bg-white text-quiet",
              )}
            >
              Day {index + 1}
            </button>
          ))}
        </div>
      ) : null}
      {active ? (
        <div className="mt-8">
          <h2 className="font-serif text-3xl text-forest">{active.label}</h2>
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {active.items.map((session) => {
              const speaker = session.speakerSlug ? getSpeaker(session.speakerSlug) : undefined;
              return (
                <li key={session.id} className="grid gap-2 py-5 md:grid-cols-[8.5rem_minmax(0,1fr)]">
                  <time className="font-serif text-xl text-forest" dateTime={session.start}>
                    {event ? formatTime(session.start, event.timeZone) : ""}
                  </time>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-serif text-2xl text-forest">{session.title}</h3>
                      <p className="text-xs uppercase tracking-[0.14em] text-quiet">{session.category}</p>
                    </div>
                    <p className="mt-1 text-sm text-quiet">
                      {speaker ? speaker.name : "Program team"} · {session.location}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">{session.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <p className="mt-8 text-muted">No sessions have been added for this program yet.</p>
      )}
    </div>
  );
}

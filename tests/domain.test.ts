import assert from "node:assert/strict";
import test from "node:test";
import { countdownParts, eventTiming, filterEvents, filterSpeakers, ticketTotal } from "../lib/domain";
import { events, getFeaturedEvent } from "../lib/events";
import { sessionsFor } from "../lib/schedule";
import { speakers } from "../lib/speakers";

const now = Date.parse("2026-10-29T12:00:00-07:00");

test("sample calendar splits around 29 October 2026", () => {
  const upcoming = events.filter((event) => eventTiming(event.start, event.end, now) !== "past");
  const past = events.filter((event) => eventTiming(event.start, event.end, now) === "past");
  assert.equal(upcoming.length, 6);
  assert.equal(past.length, 2);
});

test("featured countdown stops at the start instant", () => {
  const featured = getFeaturedEvent();
  const before = countdownParts(featured.start, Date.parse("2027-03-17T09:00:00-04:00"));
  assert.equal(before.status, "upcoming");
  assert.ok(before.days >= 0);
  const atStart = countdownParts(featured.start, Date.parse(featured.start));
  assert.equal(atStart.status, "complete");
  assert.equal(atStart.seconds, 0);
  assert.equal(eventTiming(featured.start, featured.end, Date.parse(featured.start)), "live");
  assert.equal(eventTiming(featured.start, featured.end, Date.parse(featured.end)), "past");
});

test("ticket totals respect quantity limits", () => {
  assert.equal(ticketTotal(149, 3), 447);
  assert.equal(ticketTotal(149, 0), 149);
  assert.equal(ticketTotal(349, 99), 349 * 6);
});

test("event search uses program data", () => {
  const found = filterEvents(events, { q: "austin", category: "all", when: "all", now });
  assert.equal(found.length, 1);
  assert.equal(found[0]?.slug, "digital-innovation-workshop");
  const empty = filterEvents(events, { q: "zzzz-not-a-city", category: "all", when: "all", now });
  assert.equal(empty.length, 0);
});

test("sessions for each program are chronological", () => {
  for (const event of events) {
    const list = sessionsFor(event.slug);
    for (let index = 1; index < list.length; index += 1) {
      assert.ok(Date.parse(list[index].start) >= Date.parse(list[index - 1].start));
    }
  }
});

test("speaker expertise filter matches sample profiles", () => {
  const design = filterSpeakers(speakers, { q: "", expertise: "Design" });
  assert.ok(design.length >= 1);
  assert.ok(design.every((speaker) => speaker.expertise.includes("Design")));
});

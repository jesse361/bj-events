import Image from "next/image";
import Link from "next/link";
import { EventCard } from "@/components/events/EventCard";
import { Countdown } from "@/components/ui/Countdown";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SponsorShowcase } from "@/components/ui/Sponsors";
import { formatEventWhen, formatMoney, formatTime } from "@/lib/domain";
import { getSpeaker } from "@/lib/speakers";
import { ticketTiers } from "@/lib/tickets";
import type { EventItem, Session } from "@/types";

export function EventDetail({
  event,
  sessions,
  related,
}: {
  event: EventItem;
  sessions: Session[];
  related: EventItem[];
}) {
  const speakers = event.speakerSlugs
    .map((slug) => getSpeaker(slug))
    .filter((speaker): speaker is NonNullable<ReturnType<typeof getSpeaker>> => Boolean(speaker));

  return (
    <article>
      <Container className="py-10 md:py-14">
        <p className="eyebrow">{event.category}</p>
        <h1 className="section-title mt-3 max-w-4xl text-forest">{event.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{event.theme}</p>
        <div className="relative mt-8 min-h-[16rem] overflow-hidden rounded-[1.8rem] bg-sage sm:min-h-[28rem]">
          <Image src={event.image} alt={event.imageAlt} fill priority sizes="(max-width: 1180px) 100vw, 1180px" className="object-cover" />
        </div>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["When", formatEventWhen(event.start, event.end, event.timeZone)],
            ["Venue", `${event.venue}, ${event.city}`],
            ["Theme", event.theme],
            ["Sample from", formatMoney(event.priceFrom, event.currency)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[1.4rem] bg-ivory px-5 py-4">
              <dt className="text-xs uppercase tracking-[0.16em] text-quiet">{label}</dt>
              <dd className="mt-2 text-sm leading-6 text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-quiet">Prices shown here are sample figures, not a confirmed offer.</p>
      </Container>

      <section className="bg-ivory py-16" aria-labelledby="about-event">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <h2 id="about-event" className="font-serif text-4xl text-forest">
              About this program
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-muted">
              {event.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-[1.8rem] bg-white p-6">
            <h2 className="font-serif text-3xl text-forest">Countdown</h2>
            <p className="mt-2 text-sm text-quiet">Timed to this program’s start, in its own time zone.</p>
            <div className="mt-5">
              <Countdown start={event.start} end={event.end} title={event.title} tone="dark" />
            </div>
            <ButtonLink href={`/tickets?event=${event.slug}`} className="mt-6 w-full">
              Register
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16" aria-labelledby="event-speakers">
        <Container>
          <h2 id="event-speakers" className="font-serif text-4xl text-forest">
            Speakers
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {speakers.map((speaker) => (
              <li key={speaker.slug}>
                <Link href="/speakers" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-sage">
                    <Image src={speaker.image} alt={speaker.imageAlt} fill sizes="240px" className="object-cover" />
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-forest group-hover:underline">{speaker.name}</h3>
                  <p className="text-sm text-quiet">{speaker.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sage-light py-16" aria-labelledby="event-schedule">
        <Container>
          <h2 id="event-schedule" className="font-serif text-4xl text-forest">
            Schedule
          </h2>
          {sessions.length === 0 ? (
            <p className="mt-4 text-muted">A session list has not been added for this program yet.</p>
          ) : (
            <ol className="mt-8 divide-y divide-forest/10">
              {sessions.map((session) => {
                const speaker = session.speakerSlug ? getSpeaker(session.speakerSlug) : undefined;
                return (
                  <li key={session.id} className="grid gap-2 py-5 md:grid-cols-[9rem_minmax(0,1fr)]">
                    <time className="font-serif text-xl text-forest" dateTime={session.start}>
                      {formatTime(session.start, event.timeZone)}
                    </time>
                    <div>
                      <h3 className="font-serif text-2xl text-forest">{session.title}</h3>
                      <p className="mt-1 text-sm text-quiet">
                        {session.category}
                        {speaker ? ` · ${speaker.name}` : ""} · {session.location}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted">{session.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
          <ButtonLink href="/schedule" variant="secondary" className="mt-8">
            View full schedule
          </ButtonLink>
        </Container>
      </section>

      <section className="bg-white py-16" aria-labelledby="event-tickets">
        <Container>
          <h2 id="event-tickets" className="font-serif text-4xl text-forest">
            Ticket options
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-quiet">
            Sample categories for this demonstration. Selecting one opens the registration form, which does not take payment.
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {ticketTiers.map((tier) => (
              <article key={tier.id} className="rounded-[1.6rem] border border-line p-6">
                <h3 className="font-serif text-2xl text-forest">{tier.name}</h3>
                <p className="mt-3 font-serif text-3xl text-forest">{formatMoney(tier.price, tier.currency)}</p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <ButtonLink href={`/tickets?event=${event.slug}&tier=${tier.id}`} className="mt-6 w-full">
                  Register
                </ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-16" aria-labelledby="event-travel">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="event-travel" className="font-serif text-4xl text-forest">
              Venue and travel
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              {event.venue} · {event.city}. {event.region}.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">{event.travel}</p>
          </div>
          <div className="relative min-h-64 overflow-hidden rounded-[1.6rem] bg-sage">
            <Image
              src="/images/venue-interior.jpg"
              alt="An elegant event room with tables prepared for a gathering."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16" aria-labelledby="event-partners">
        <Container>
          <h2 id="event-partners" className="font-serif text-4xl text-forest">
            Sponsors and partners
          </h2>
          <div className="mt-8">
            <SponsorShowcase id={`sponsors-${event.slug}`} />
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="bg-sage-light py-16" aria-labelledby="related-events">
          <Container>
            <h2 id="related-events" className="font-serif text-4xl text-forest">
              Related events
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <EventCard key={item.slug} event={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  );
}

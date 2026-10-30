import Image from "next/image";
import { Countdown } from "@/components/ui/Countdown";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { formatEventWhen } from "@/lib/domain";
import type { EventItem } from "@/types";

export function Featured({ event }: { event: EventItem }) {
  return (
    <section className="on-dark bg-forest py-20 text-white md:py-28" aria-labelledby="featured-heading">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0">
          <p className="eyebrow text-mist">Featured experience</p>
          <h2 id="featured-heading" className="section-title mt-3 text-white">
            Experiences That Bring People Together.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-mist">
            {event.title} is the sample program used for the countdown. {event.excerpt}
          </p>
          <p className="mt-4 text-sm text-mist">{formatEventWhen(event.start, event.end, event.timeZone)}</p>
          <p className="mt-1 text-sm text-mist">
            {event.venue}, {event.city}
          </p>
          <div className="mt-8 max-w-lg">
            <Countdown start={event.start} end={event.end} title={event.title} tone="light" />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/events" variant="light">
              Explore Events
            </ButtonLink>
            <ButtonLink href={`/events/${event.slug}`} variant="ghost">
              View this program
            </ButtonLink>
          </div>
        </div>
        <div className="relative min-h-[18rem] overflow-hidden rounded-[1.8rem] bg-forest-deep sm:min-h-[26rem]">
          <Image
            src="/images/featured-hall.jpg"
            alt="A conference audience seated in a darkened auditorium, facing a lit stage."
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { formatMoney, formatShortDate } from "@/lib/domain";
import type { EventItem } from "@/types";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/events/${event.slug}`} className="media-frame relative block aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-sage">
        <Image
          src={event.image}
          alt={event.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      </Link>
      <p className="eyebrow mt-5">{event.category}</p>
      <h3 className="mt-2 font-serif text-[1.7rem] leading-tight text-forest">
        <Link href={`/events/${event.slug}`} className="hover:underline">
          {event.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-quiet">
        {formatShortDate(event.start, event.timeZone)} · {event.city}
      </p>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{event.excerpt}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <Link href={`/events/${event.slug}`} className="text-sm font-semibold text-forest underline-offset-4 hover:underline">
          View details
        </Link>
        <p className="text-sm text-quiet">Sample from {formatMoney(event.priceFrom, event.currency)}</p>
      </div>
    </article>
  );
}

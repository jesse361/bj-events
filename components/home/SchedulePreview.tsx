import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { formatTime } from "@/lib/domain";
import { getSpeaker } from "@/lib/speakers";
import type { Session } from "@/types";

export function SchedulePreview({ sessions, timeZone }: { sessions: Session[]; timeZone: string }) {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="schedule-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 id="schedule-heading" className="section-title text-forest">
              Every Moment, Thoughtfully Planned.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              A preview of the sample flagship program, listed in the order the day unfolds.
            </p>
          </div>
          <ButtonLink href="/schedule" variant="secondary">
            View Full Schedule
          </ButtonLink>
        </div>
        <ol className="mt-12 divide-y divide-line border-y border-line">
          {sessions.map((session) => {
            const speaker = session.speakerSlug ? getSpeaker(session.speakerSlug) : undefined;
            return (
              <li key={session.id} className="grid gap-2 py-5 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
                <time className="font-serif text-xl text-forest" dateTime={session.start}>
                  {formatTime(session.start, timeZone)}
                </time>
                <div className="min-w-0">
                  <h3 className="font-serif text-2xl text-forest">{session.title}</h3>
                  <p className="mt-1 text-sm text-quiet">
                    {speaker ? speaker.name : "Hosted by the program team"} · {session.location}
                  </p>
                </div>
                <p className="text-sm uppercase tracking-[0.14em] text-quiet">{session.category}</p>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-sm">
          <Link href="/schedule" className="font-semibold text-forest underline-offset-4 hover:underline">
            See the complete timetable
          </Link>
        </p>
      </Container>
    </section>
  );
}

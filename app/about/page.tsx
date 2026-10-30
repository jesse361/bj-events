import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "How B&JEvents approaches conferences, workshops, and gatherings.",
};

const values = [
  {
    title: "Attention to detail",
    body: "Arrival, pacing, sightlines, and the close of the day are decided before the doors open.",
  },
  {
    title: "Creative clarity",
    body: "A program should have a point of view. Decoration follows the idea, rather than replacing it.",
  },
  {
    title: "Room for people",
    body: "The timetable leaves space for guests to meet, not only to listen.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro label="About us" title="A studio for gatherings with a point of view." text={site.statement} />
      <section className="bg-white py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-sage">
            <Image
              src="/images/about-gathering.jpg"
              alt="A collaborative working session around a shared table."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-4xl text-forest">Who we are</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              B&JEvents plans conferences, workshops, networking gatherings, and the occasional special assembly. The work is the experience itself: who is invited, how the day is sequenced, and how people leave.
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              A published company history, founding year, and list of awards are not part of this site. What is here is the approach: listen first, design a clear program, and host it with care.
            </p>
            <h2 className="mt-10 font-serif text-4xl text-forest">How a program takes shape</h2>
            <ol className="mt-5 space-y-4 text-base leading-7 text-muted">
              <li>Discovery and planning — the purpose, the guests, and the constraints.</li>
              <li>Creative development — the concept, the rooms, and the order of the day.</li>
              <li>Execution — hospitality, timing, and a close that feels finished.</li>
            </ol>
          </div>
        </Container>
      </section>
      <section className="bg-sage-light py-16 md:py-24">
        <Container>
          <h2 className="font-serif text-4xl text-forest">What we hold to</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <li key={value.title} className="rounded-[1.6rem] bg-white p-6">
                <h3 className="font-serif text-2xl text-forest">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{value.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/events">Explore events</ButtonLink>
            <ButtonLink href="/contact?interest=plan-event" variant="secondary">
              Plan your event
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

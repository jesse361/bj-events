import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Starburst } from "@/components/ui/Ornaments";

const values = [
  { title: "Who we are", body: "A studio for conferences, workshops, and gatherings that treat hospitality as part of the idea." },
  { title: "Our approach", body: "We shape the room, the timetable, and the way people meet so the day feels considered." },
  { title: "A commitment to quality", body: "Details are decided early: arrival, sightlines, pauses, and the close of the day." },
];

export function AboutBand() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="about-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto h-[28rem] w-full max-w-md sm:h-[32rem]">
          <span className="pointer-events-none absolute left-6 top-4 h-28 w-28 rounded-full border border-forest/15" aria-hidden="true" />
          <Starburst className="absolute right-8 top-6 text-gold" />
          <div className="absolute left-0 top-8 h-64 w-64 overflow-hidden rounded-full bg-sage sm:h-72 sm:w-72">
            <Image
              src="/images/about-gathering.jpg"
              alt="Colleagues collaborating around a table during a working session."
              fill
              sizes="288px"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-4 right-0 h-48 w-48 overflow-hidden rounded-full border-8 border-white bg-sage sm:h-56 sm:w-56">
            <Image
              src="/images/about-conversation.jpg"
              alt="People talking together over a shared table in a bright room."
              fill
              sizes="224px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="min-w-0">
          <p className="eyebrow">About us</p>
          <h2 id="about-heading" className="section-title mt-3 text-forest">
            Bringing People Together Through Experiences That Matter.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
            At B&JEvents, we believe exceptional events create more than memories. They create relationships, inspire
            ideas, and open doors to new possibilities.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            Our planning philosophy is simple: understand the people in the room, design a sequence they can follow,
            and leave enough quiet for a real conversation to happen.
          </p>
          <ul className="mt-8 space-y-5">
            {values.map((value) => (
              <li key={value.title}>
                <h3 className="font-serif text-2xl text-forest">{value.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{value.body}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/about" className="mt-8">
            Discover Our Story
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

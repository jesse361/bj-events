import Image from "next/image";
import { Starburst } from "@/components/ui/Ornaments";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const frames = [
  {
    src: "/images/hero-conference.jpg",
    alt: "A professional audience seated at a conference, facing a stage.",
    className: "h-52 sm:h-72 lg:h-[28rem]",
  },
  {
    src: "/images/hero-speaker.jpg",
    alt: "A keynote speaker holding a microphone on a conference stage.",
    className: "h-64 sm:h-[22rem] lg:h-[34rem]",
    priority: true,
  },
  {
    src: "/images/hero-networking.jpg",
    alt: "Guests in conversation at a seated networking gathering.",
    className: "h-44 sm:h-64 lg:h-[23rem]",
  },
];

export function Hero() {
  return (
    <section className="bg-white">
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-20">
        <div className="rise min-w-0 max-w-xl">
          <p className="eyebrow">B&J Events & Conference Hub</p>
          <h1 className="display mt-5 text-forest">Where Great Ideas Become Extraordinary Experiences.</h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Bringing people together through exceptional conferences, inspiring events, meaningful connections, and
            experiences that create lasting impressions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/events" className="w-full sm:w-auto">
              Explore Events
            </ButtonLink>
            <ButtonLink href="/contact?interest=plan-event" variant="secondary" className="w-full sm:w-auto">
              Plan Your Event
            </ButtonLink>
          </div>
        </div>
        <div className="relative isolate mx-auto w-full min-w-0 max-w-lg lg:max-w-none">
          <div className="absolute inset-x-6 top-8 -z-10 h-[78%] rounded-[40%] bg-sage-light" aria-hidden="true" />
          <span className="pointer-events-none absolute left-[6%] top-[16%] h-24 w-24 rounded-full border border-forest/15 sm:h-36 sm:w-36" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-[14%] right-[8%] h-14 w-14 rounded-full border border-gold/70" aria-hidden="true" />
          <Starburst className="absolute right-[12%] top-[7%] text-gold" />
          <Starburst className="absolute bottom-[22%] left-[2%] h-3 w-3 text-forest/50" />
          <div className="grid grid-cols-3 items-end gap-2 sm:gap-4">
            {frames.map((frame) => (
              <div key={frame.src} className={cn("relative overflow-hidden rounded-full bg-sage", frame.className)}>
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  priority={frame.priority}
                  sizes="(max-width: 1024px) 30vw, 220px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

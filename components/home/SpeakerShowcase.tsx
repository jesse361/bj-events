import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Speaker } from "@/types";

export function SpeakerShowcase({ speakers }: { speakers: Speaker[] }) {
  return (
    <section className="bg-ivory py-20 md:py-28" aria-labelledby="speakers-heading">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="speakers-heading" title="Meet the Voices That Inspire Change." />
          <ButtonLink href="/speakers" variant="secondary" className="shrink-0">
            All speakers
          </ButtonLink>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-quiet">Sample profiles, shown until confirmed speakers are announced.</p>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <li key={speaker.slug}>
              <article className="h-full">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-sage">
                  <Image src={speaker.image} alt={speaker.imageAlt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                </div>
                <h3 className="mt-4 font-serif text-2xl text-forest">{speaker.name}</h3>
                <p className="mt-1 text-sm text-quiet">{speaker.title}</p>
                <p className="mt-2 text-sm text-forest">{speaker.expertise.join(" · ")}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{speaker.bio}</p>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm">
          <Link href="/speakers" className="font-semibold text-forest underline-offset-4 hover:underline">
            View the full speaker directory
          </Link>
        </p>
      </Container>
    </section>
  );
}

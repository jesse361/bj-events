import { Building2, CalendarCheck, Presentation, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    title: "Corporate Events & Conferences",
    body: "Multi-session programs with a clear theme, a confident stage, and time for the audience to take part.",
    href: "/contact?interest=corporate",
    image: "/images/event-leadership.jpg",
    alt: "A professional meeting underway in a bright conference room.",
    icon: Building2,
  },
  {
    title: "Workshops & Professional Training",
    body: "Smaller rooms arranged for practice, discussion, and time with a facilitator.",
    href: "/contact?interest=workshop",
    image: "/images/event-workshop.jpg",
    alt: "Participants working together during a training session.",
    icon: Presentation,
  },
  {
    title: "Networking & Business Gatherings",
    body: "Evenings and assemblies hosted so introductions feel welcome rather than forced.",
    href: "/contact?interest=networking",
    image: "/images/event-networking.jpg",
    alt: "Guests talking during a business gathering.",
    icon: Users,
  },
  {
    title: "Event Planning & Management",
    body: "Concept, schedule, hospitality, and the run of show, held together from the first briefing to the close.",
    href: "/contact?interest=planning",
    image: "/images/about-gathering.jpg",
    alt: "A planning conversation around a shared table.",
    icon: CalendarCheck,
  },
];

export function Services() {
  return (
    <section className="bg-sage-light py-20 md:py-28" aria-labelledby="services-heading">
      <Container>
        <SectionHeading
          id="services-heading"
          label="What we do"
          title="Everything You Need to Create an Exceptional Event."
        />
        <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="group min-w-0">
                <div className="media-frame relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-sage">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" />
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-forest">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.55rem] leading-tight text-forest">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{service.body}</p>
                    <Link href={service.href} className="mt-3 inline-flex text-sm font-semibold text-forest underline-offset-4 hover:underline">
                      Plan this experience
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

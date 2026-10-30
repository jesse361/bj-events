import { Eye, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";

const reasons = [
  {
    number: "01",
    title: "Attention to Detail.",
    body: "Every part of the experience is thoughtfully considered.",
    icon: Eye,
  },
  {
    number: "02",
    title: "Creative Excellence.",
    body: "We approach every event with creativity, clarity, and purpose.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Meaningful Connections.",
    body: "We create opportunities for people to meet, share ideas, and build relationships.",
    icon: Users,
  },
];

export function WhyChoose() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="why-heading">
      <Container>
        <h2 id="why-heading" className="section-title mx-auto max-w-3xl text-center text-forest">
          More Than Events. We Create Meaningful Experiences.
        </h2>
        <ol className="mt-14 grid gap-12 md:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <li key={reason.number} className="text-center">
                <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-line bg-ivory text-forest">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <p className="mt-6 text-sm tracking-[0.18em] text-quiet">{reason.number}</p>
                <h3 className="mt-2 font-serif text-3xl text-forest">{reason.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted">{reason.body}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

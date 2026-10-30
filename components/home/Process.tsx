"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const steps = [
  {
    number: "01",
    title: "Discovery & Planning",
    body: "Understand the vision, objectives, audience, and requirements.",
  },
  {
    number: "02",
    title: "Creative Development",
    body: "Develop the event concept, experience, schedule, and execution strategy.",
  },
  {
    number: "03",
    title: "Execution & Experience",
    body: "Coordinate the details and deliver a memorable, professionally organized experience.",
  },
];

export function Process() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="process-heading">
      <Container>
        <h2 id="process-heading" className="section-title max-w-xl text-forest">
          A Thoughtful Process. Extraordinary Results.
        </h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => {
            const selected = active === index;
            return (
              <button
                key={step.number}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={cn(
                  "rounded-[2rem] p-7 text-left transition-colors sm:p-8",
                  selected ? "bg-sage" : "bg-transparent hover:bg-sage-light",
                )}
              >
                <span className="font-serif text-5xl text-forest">{step.number}</span>
                <span className="mt-6 block font-serif text-2xl text-forest">
                  {step.title}
                </span>
                <span className="mt-3 block text-sm leading-6 text-quiet">{step.body}</span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

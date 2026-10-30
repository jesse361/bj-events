import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageIntro({
  label,
  title,
  text,
  children,
}: {
  label: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-ivory">
      <Container className="py-14 md:py-20">
        <p className="eyebrow">{label}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.02] text-forest">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{text}</p>
        {children}
      </Container>
    </section>
  );
}

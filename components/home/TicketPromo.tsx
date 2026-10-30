import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { formatMoney } from "@/lib/domain";
import { cn } from "@/lib/cn";
import { ticketTiers } from "@/lib/tickets";

export function TicketPromo() {
  return (
    <section className="bg-sage-light py-20 md:py-28" aria-labelledby="tickets-heading">
      <Container>
        <h2 id="tickets-heading" className="section-title max-w-2xl text-forest">
          Your Next Great Experience Starts Here.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-quiet">
          Sample prices in US dollars. They are editable figures for this demonstration and are not confirmed offers or
          availability.
        </p>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {ticketTiers.map((tier) => {
            const featured = tier.id === "vip";
            return (
              <article
                key={tier.id}
                className={cn("flex h-full flex-col rounded-[1.8rem] p-7 sm:p-8", featured ? "on-dark bg-forest text-white" : "bg-white")}
              >
                <h3 className={cn("font-serif text-3xl", featured ? "text-white" : "text-forest")}>{tier.name}</h3>
                <p className={cn("mt-4 font-serif text-4xl", featured ? "text-white" : "text-forest")}>
                  {formatMoney(tier.price, tier.currency)}
                </p>
                <p className={cn("mt-3 text-sm leading-6", featured ? "text-mist" : "text-muted")}>{tier.summary}</p>
                <ul className={cn("mt-6 flex-1 space-y-2 text-sm leading-6", featured ? "text-mist" : "text-quiet")}>
                  {tier.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <ButtonLink href={`/tickets?tier=${tier.id}`} variant={featured ? "light" : "primary"} className="mt-8 w-full">
                  Register
                </ButtonLink>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-sm">
          <Link href="/tickets" className="font-semibold text-forest underline-offset-4 hover:underline">
            Continue to registration
          </Link>
        </p>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { Registration } from "@/components/tickets/Registration";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { events } from "@/lib/events";

export const metadata: Metadata = {
  title: "Tickets",
  description: "Sample ticket categories for B&JEvents. Registration on this page is a demonstration and does not process payment.",
};

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string; tier?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <PageIntro
        label="Tickets"
        title="Choose a way to take part."
        text="Three sample categories, with prices in US dollars. The form calculates a total and confirms a demonstration. It does not take payment."
      />
      <section className="bg-sage-light py-12 md:py-16">
        <Container>
          <Registration events={events} initialEvent={params.event} initialTier={params.tier} />
        </Container>
      </section>
    </>
  );
}

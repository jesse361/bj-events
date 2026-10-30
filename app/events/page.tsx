import type { Metadata } from "next";
import { EventExplorer } from "@/components/events/EventExplorer";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { events } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Search upcoming and past sample programs from B&JEvents, including conferences, summits, forums, and workshops.",
};

export default function EventsPage() {
  return (
    <>
      <PageIntro
        label="Events"
        title="Programs worth gathering for."
        text="Search the sample calendar by name, city, or theme, and switch between what is still ahead and what has already passed."
      />
      <section className="bg-ivory py-12 md:py-16">
        <Container>
          <EventExplorer events={events} />
        </Container>
      </section>
    </>
  );
}

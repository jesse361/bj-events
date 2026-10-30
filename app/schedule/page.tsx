import type { Metadata } from "next";
import { ScheduleBoard } from "@/components/schedule/ScheduleBoard";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { events, getFeaturedEvent } from "@/lib/events";
import { sessions } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "Schedule",
  description: "A chronological schedule for each B&JEvents sample program, organized by day and time.",
};

export default function SchedulePage() {
  return (
    <>
      <PageIntro
        label="Schedule"
        title="Every moment, in order."
        text="Choose a program and, where a gathering runs longer than a day, move between days. Sessions stay in time order."
      />
      <section className="bg-white py-12 md:py-16">
        <Container>
          <ScheduleBoard events={events} sessions={sessions} initialSlug={getFeaturedEvent().slug} />
        </Container>
      </section>
    </>
  );
}

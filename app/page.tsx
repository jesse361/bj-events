import type { Metadata } from "next";
import { AboutBand } from "@/components/home/AboutBand";
import { Featured } from "@/components/home/Featured";
import { Hero } from "@/components/home/Hero";
import { NewsletterBand } from "@/components/home/NewsletterBand";
import { Partners } from "@/components/home/Partners";
import { Process } from "@/components/home/Process";
import { SchedulePreview } from "@/components/home/SchedulePreview";
import { Services } from "@/components/home/Services";
import { SpeakerShowcase } from "@/components/home/SpeakerShowcase";
import { TicketPromo } from "@/components/home/TicketPromo";
import { Upcoming } from "@/components/home/Upcoming";
import { WhyChoose } from "@/components/home/WhyChoose";
import { events, getFeaturedEvent } from "@/lib/events";
import { sessionsFor } from "@/lib/schedule";
import { site } from "@/lib/site";
import { speakers } from "@/lib/speakers";

export const metadata: Metadata = {
  title: site.identity,
  description: site.description,
};

export default function HomePage() {
  const featured = getFeaturedEvent();
  const preview = sessionsFor(featured.slug).slice(0, 5);
  return (
    <>
      <Hero />
      <Partners />
      <Upcoming events={events} />
      <AboutBand />
      <Services />
      <Process />
      <Featured event={featured} />
      <WhyChoose />
      <SpeakerShowcase speakers={speakers.slice(0, 3)} />
      <SchedulePreview sessions={preview} timeZone={featured.timeZone} />
      <TicketPromo />
      <NewsletterBand />
    </>
  );
}

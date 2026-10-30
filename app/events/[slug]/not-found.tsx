import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function EventNotFound() {
  return (
    <Container className="py-24">
      <p className="eyebrow">Events</p>
      <h1 className="section-title mt-3 text-forest">We could not find that event.</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">
        The link may be out of date, or the program is not part of the sample calendar.
      </p>
      <ButtonLink href="/events" className="mt-8">
        Back to events
      </ButtonLink>
    </Container>
  );
}

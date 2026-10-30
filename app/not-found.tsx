import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="eyebrow">404</p>
      <h1 className="section-title mt-3 text-forest">This page is not on the program.</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">The address does not match a page on B&JEvents.</p>
      <ButtonLink href="/" className="mt-8">
        Return home
      </ButtonLink>
    </Container>
  );
}

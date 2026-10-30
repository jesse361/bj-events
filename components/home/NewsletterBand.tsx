import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Container";

export function NewsletterBand() {
  return (
    <section id="newsletter" className="bg-sage py-20 md:py-24" aria-labelledby="newsletter-heading">
      <Container className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
        <div>
          <h2 id="newsletter-heading" className="section-title text-forest">
            Stay Connected to What Matters.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-quiet">
            Be the first to discover upcoming events, exciting opportunities, and exclusive announcements.
          </p>
        </div>
        <NewsletterForm id="newsletter-home" />
      </Container>
    </section>
  );
}

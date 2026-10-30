import { SponsorShowcase } from "@/components/ui/Sponsors";
import { Container } from "@/components/ui/Container";

export function Partners() {
  return (
    <section className="bg-white pb-6" aria-labelledby="partners-heading">
      <Container>
        <div className="rounded-[2rem] bg-sage px-5 py-10 sm:px-10 sm:py-12">
          <h2 id="partners-heading" className="font-serif text-2xl text-forest sm:text-3xl">
            Built Around People, Partnerships & Possibilities.
          </h2>
          <div className="mt-8">
            <SponsorShowcase />
          </div>
        </div>
      </Container>
    </section>
  );
}

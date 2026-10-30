import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "Placeholder terms for the B&JEvents website.",
};

export default function TermsPage() {
  return (
    <>
      <PageIntro
        label="Terms"
        title="Terms for using this website."
        text="These notes are a placeholder until formal terms are published. They are not a contract for a ticket or a venue."
      />
      <section className="bg-white py-14">
        <Container className="max-w-3xl space-y-4 text-base leading-7 text-muted">
          <p>
            Programs, dates, venues, speakers, and prices on this website are sample content for demonstration. They are not offers, reservations, or confirmations of availability.
          </p>
          <p>
            The registration form does not process payment. A confirmation on that page means only that the demonstration was completed in the browser.
          </p>
          <p>Partner wordmarks are examples. They do not indicate a sponsorship, endorsement, or commercial relationship.</p>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How the B&JEvents website treats information entered into its forms.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        label="Privacy"
        title="A plain account of this website."
        text="This page is a placeholder for a policy reviewed by counsel. It describes how the site behaves today."
      />
      <section className="bg-white py-14">
        <Container className="max-w-3xl space-y-4 text-base leading-7 text-muted">
          <p>
            Contact and newsletter forms validate what you type in the browser and, when a delivery address is configured on the server, send that information to it. They do not store a copy on this website.
          </p>
          <p>
            If no delivery service is configured, the form tells you the message or subscription was not sent. Ticket registration is a demonstration: the summary stays in the page and is not transmitted as an order.
          </p>
          <p>Sample event, speaker, and sponsor content is illustrative and should not be treated as a record about a real person or organization.</p>
        </Container>
      </section>
    </>
  );
}

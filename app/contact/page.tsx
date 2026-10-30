import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { interestSubjects, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to B&JEvents about a program, a partnership question, or a visit.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const params = await searchParams;
  const subject = params.interest ? interestSubjects[params.interest] ?? "" : "";

  return (
    <>
      <PageIntro
        label="Contact"
        title="Tell us what you want to gather."
        text="Share a name, an email, and a short note. If a delivery service is connected, the message is sent. If it is not, the form will say so plainly."
      />
      <section className="bg-ivory py-12 md:py-16">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.1fr)]">
          <aside>
            <h2 className="font-serif text-3xl text-forest">How to reach us</h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              A public phone number and street address have not been published. The form is the way to write to B&JEvents on this site.
            </p>
            {socialLinks.length > 0 ? (
              <ul className="mt-6 space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm font-semibold text-forest underline-offset-4 hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm leading-6 text-muted">Social profiles will be listed here when they are available.</p>
            )}
          </aside>
          <ContactForm initialSubject={subject} />
        </Container>
      </section>
    </>
  );
}

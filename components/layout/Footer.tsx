import Link from "next/link";
import { Copyright } from "@/components/layout/Copyright";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { site, socialLinks } from "@/lib/site";

const explore = [
  { href: "/events", label: "Events" },
  { href: "/speakers", label: "Speakers" },
  { href: "/schedule", label: "Schedule" },
  { href: "/tickets", label: "Tickets" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="on-dark bg-forest-deep text-white">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-white">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-mist">{site.statement}</p>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-mist">Explore</h2>
          <ul className="mt-5 space-y-3">
            {explore.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-mist">Stay connected</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-mist">
            Be the first to discover upcoming events, exciting opportunities, and exclusive announcements.
          </p>
          <div className="mt-5 max-w-md">
            <NewsletterForm id="newsletter-footer" tone="dark" />
          </div>
          {socialLinks.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white underline-offset-4 hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-mist">Social profiles will be added when they are available.</p>
          )}
          <p className="mt-4 text-sm text-mist">
            A public phone number and street address have not been published yet. Use the contact form to write to us.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-4 py-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Copyright />
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms and conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

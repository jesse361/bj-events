# B&JEvents

A Next.js site for B&JEvents — Events & Conference Hub. Programs, speakers, venues, prices, and partner wordmarks in the interface are sample content.

```bash
npm run dev
```

Open the URL printed by the dev server.

## Configuration

Set `NEXT_PUBLIC_SITE_URL` to the production origin when you have one. That enables absolute Open Graph URLs and fills the sitemap.

- `CONTACT_ENDPOINT` — an HTTPS URL that accepts a JSON contact message. Until it is set, the contact form validates input and reports that the message was not sent.
- `NEWSLETTER_ENDPOINT` — an HTTPS URL that accepts a JSON email subscription. Until it is set, the newsletter form does not claim anyone was subscribed.

Ticket registration is a demonstration in the browser. It does not process payment.

No public phone number, street address, or social profile is published until those details are added in `lib/site.ts`.

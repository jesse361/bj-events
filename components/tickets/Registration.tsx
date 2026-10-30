"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { clampQuantity, eventTiming, formatMoney, initialClock, isValidEmail, ticketTotal } from "@/lib/domain";
import { cn } from "@/lib/cn";
import { getTier, ticketTiers } from "@/lib/tickets";
import type { EventItem } from "@/types";

export function Registration({
  events,
  initialEvent,
  initialTier,
}: {
  events: EventItem[];
  initialEvent?: string;
  initialTier?: string;
}) {
  const [clock, setClock] = useState(initialClock);

  useEffect(() => {
    const update = () => setClock(Date.now());
    const timeout = window.setTimeout(update, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const upcoming = events.filter((event) => eventTiming(event.start, event.end, clock) !== "past");
  const startingEvent = upcoming.some((event) => event.slug === initialEvent) ? initialEvent ?? "" : upcoming[0]?.slug ?? "";
  const startingTier = ticketTiers.some((tier) => tier.id === initialTier) ? initialTier ?? ticketTiers[0].id : ticketTiers[0].id;
  const [eventSlug, setEventSlug] = useState(startingEvent);
  const [tierId, setTierId] = useState(startingTier);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<{
    name: string;
    email: string;
    eventTitle: string;
    tierName: string;
    quantity: number;
    total: string;
  } | null>(null);

  const tier = getTier(tierId) ?? ticketTiers[0];
  const count = clampQuantity(quantity);
  const total = ticketTotal(tier.price, count);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 2) nextErrors.name = "Enter the name for this registration.";
    if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address, such as name@example.com.";
    if (!eventSlug) nextErrors.event = "Choose a program.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const selected = events.find((item) => item.slug === eventSlug);
    setConfirmation({
      name: name.trim(),
      email: email.trim(),
      eventTitle: selected?.title ?? "Program",
      tierName: tier.name,
      quantity: count,
      total: formatMoney(total, tier.currency),
    });
  }

  if (confirmation) {
    return (
      <div role="status" className="rounded-[1.8rem] bg-white p-6 sm:p-8">
        <p className="eyebrow">Demonstration only</p>
        <h2 className="mt-3 font-serif text-4xl text-forest">No payment was processed.</h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
          This summary stays on this page. No ticket was reserved, no seat was held, and no charge was made.
        </p>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          {[
            ["Name", confirmation.name],
            ["Email", confirmation.email],
            ["Program", confirmation.eventTitle],
            ["Category", confirmation.tierName],
            ["Quantity", String(confirmation.quantity)],
            ["Sample total", confirmation.total],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-ivory px-4 py-3">
              <dt className="text-quiet">{label}</dt>
              <dd className="mt-1 font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          className="mt-6 text-sm font-semibold text-forest underline-offset-4 hover:underline"
          onClick={() => setConfirmation(null)}
        >
          Start another demonstration
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate id="register" className="grid gap-8">
      <p className="rounded-[1.4rem] bg-sage px-5 py-4 text-sm leading-6 text-quiet">
        Registration on this page is a demonstration. Sample prices are not confirmed offers. Submitting does not process a payment or reserve a place.
      </p>
      {upcoming.length === 0 ? (
        <p className="text-muted">There are no upcoming sample programs to register for.</p>
      ) : (
        <>
          <fieldset>
            <legend className="font-serif text-3xl text-forest">Ticket category</legend>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {ticketTiers.map((item) => {
                const selected = item.id === tier.id;
                return (
                  <label
                    key={item.id}
                    className={cn(
                      "block cursor-pointer rounded-[1.6rem] border p-5",
                      selected ? "border-forest bg-white" : "border-transparent bg-white/70",
                    )}
                  >
                    <input
                      type="radio"
                      name="tier"
                      value={item.id}
                      checked={selected}
                      onChange={() => setTierId(item.id)}
                      className="sr-only"
                    />
                    <span className="font-serif text-2xl text-forest">{item.name}</span>
                    <span className="mt-2 block font-serif text-3xl text-forest">{formatMoney(item.price, item.currency)}</span>
                    <span className="mt-2 block text-sm leading-6 text-muted">{item.summary}</span>
                    <ul className="mt-4 space-y-1 text-sm leading-6 text-quiet">
                      {item.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-5 rounded-[1.8rem] bg-white p-6 sm:p-8">
            <div>
              <label htmlFor="ticket-event" className="text-sm font-semibold text-forest">
                Program
              </label>
              <select
                id="ticket-event"
                value={eventSlug}
                onChange={(change) => setEventSlug(change.target.value)}
                aria-invalid={Boolean(errors.event)}
                aria-describedby={errors.event ? "ticket-event-error" : undefined}
                className="mt-2 h-12 w-full rounded-2xl border border-line bg-white px-4 text-sm"
              >
                {upcoming.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.event ? (
                <p id="ticket-event-error" className="mt-2 text-sm text-ink">
                  {errors.event}
                </p>
              ) : null}
            </div>
            <div>
              <p id="quantity-label" className="text-sm font-semibold text-forest">
                Quantity
              </p>
              <div className="mt-2 flex items-center gap-3" role="group" aria-labelledby="quantity-label">
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line"
                  onClick={() => setQuantity((value) => clampQuantity(value - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <output className="min-w-8 text-center font-serif text-2xl text-forest" aria-live="polite">
                  {count}
                </output>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line"
                  onClick={() => setQuantity((value) => clampQuantity(value + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="text-sm text-quiet">Up to 6</p>
              </div>
            </div>
            <div>
              <label htmlFor="guest-name" className="text-sm font-semibold text-forest">
                Name
              </label>
              <input
                id="guest-name"
                value={name}
                onChange={(change) => setName(change.target.value)}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "guest-name-error" : undefined}
                className="mt-2 h-12 w-full rounded-2xl border border-line px-4 text-sm"
              />
              {errors.name ? (
                <p id="guest-name-error" className="mt-2 text-sm text-ink">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="guest-email" className="text-sm font-semibold text-forest">
                Email
              </label>
              <input
                id="guest-email"
                type="email"
                value={email}
                onChange={(change) => setEmail(change.target.value)}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "guest-email-error" : undefined}
                className="mt-2 h-12 w-full rounded-2xl border border-line px-4 text-sm"
              />
              {errors.email ? (
                <p id="guest-email-error" className="mt-2 text-sm text-ink">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <p className="text-base text-ink">
              {count} × {formatMoney(tier.price, tier.currency)} = <strong>{formatMoney(total, tier.currency)}</strong>
            </p>
            <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-forest text-sm font-semibold text-white sm:w-auto sm:px-8">
              Submit demonstration
            </button>
          </div>
        </>
      )}
    </form>
  );
}

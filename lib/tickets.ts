import type { TicketTier } from "@/types";

/**
 * Sample prices in US dollars. Edit these figures when real ticket offers exist.
 * They are not confirmed prices and do not represent availability.
 */
export const ticketTiers: TicketTier[] = [
  {
    id: "general",
    name: "General Admission",
    price: 149,
    currency: "USD",
    summary: "A seat in the program and access to the shared sessions.",
    benefits: [
      "Entry to the selected sample program",
      "Shared sessions and the main gathering spaces",
      "A printed or digital run of show",
    ],
  },
  {
    id: "vip",
    name: "VIP Access",
    price: 349,
    currency: "USD",
    summary: "General admission plus a quieter arrival and hosted introductions.",
    benefits: [
      "Everything in General Admission",
      "A reserved arrival window",
      "Hosted introductions during the connections session",
      "Seat selection when a room plan is published",
    ],
  },
  {
    id: "premium",
    name: "Premium Experience",
    price: 649,
    currency: "USD",
    summary: "The fullest sample tier, with workshop priority and a closing conversation.",
    benefits: [
      "Everything in VIP Access",
      "Priority placement in the workshop",
      "A small-group conversation at the close of the day",
      "A named host for questions before the program",
    ],
  },
];

export function getTier(id: string) {
  return ticketTiers.find((tier) => tier.id === id);
}

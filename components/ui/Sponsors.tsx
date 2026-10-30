import { sponsors } from "@/lib/sponsors";
import type { Sponsor } from "@/types";

export function SponsorShowcase({ items = sponsors, id = "partners" }: { items?: Sponsor[]; id?: string }) {
  return (
    <div>
      <ul id={id} className="flex gap-x-10 gap-y-6 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
        {items.map((sponsor) => (
          <li key={sponsor.name} className="shrink-0">
            {sponsor.href ? (
              <a
                href={sponsor.href}
                className="font-serif text-2xl text-forest/80 hover:text-forest"
                rel="noreferrer"
                target="_blank"
              >
                {sponsor.name}
              </a>
            ) : (
              <span className="font-serif text-2xl tracking-tight text-forest/75">{sponsor.name}</span>
            )}
            <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.16em] text-quiet">{sponsor.tier}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-quiet">Example wordmarks only. These are not partnerships or endorsements.</p>
    </div>
  );
}

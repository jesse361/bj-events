"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { filterSpeakers } from "@/lib/domain";
import { cn } from "@/lib/cn";
import type { Speaker } from "@/types";

export function SpeakerDirectory({ speakers, expertise }: { speakers: Speaker[]; expertise: string[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const results = filterSpeakers(speakers, { q: query, expertise: topic });

  return (
    <div>
      <div className="max-w-md">
        <label htmlFor="speaker-search" className="text-sm font-semibold text-forest">
          Search speakers
        </label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-quiet" aria-hidden="true" />
          <input
            id="speaker-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or expertise"
            className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-sm"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Expertise">
        {["all", ...expertise].map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={topic === item}
            onClick={() => setTopic(item)}
            className={cn("h-9 rounded-full px-3 text-sm", topic === item ? "bg-forest text-white" : "bg-white text-quiet")}
          >
            {item === "all" ? "All expertise" : item}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-quiet" aria-live="polite">
        {results.length === 0 ? "No speakers match that search." : `${results.length} sample profiles`}
      </p>
      {results.length === 0 ? (
        <div className="mt-8 rounded-[1.6rem] bg-white px-6 py-12">
          <h2 className="font-serif text-3xl text-forest">No profiles match.</h2>
          <button type="button" className="mt-4 text-sm font-semibold text-forest underline" onClick={() => { setQuery(""); setTopic("all"); }}>
            Clear search
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((speaker) => (
            <li key={speaker.slug}>
              <article className="h-full rounded-[1.6rem] bg-white p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem] bg-sage">
                  <Image src={speaker.image} alt={speaker.imageAlt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                </div>
                <h2 className="mt-4 font-serif text-3xl text-forest">{speaker.name}</h2>
                <p className="mt-1 text-sm text-quiet">{speaker.title}</p>
                <p className="mt-2 text-sm font-semibold text-forest">{speaker.expertise.join(" · ")}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{speaker.bio}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

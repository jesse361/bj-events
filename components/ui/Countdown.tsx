"use client";

import { useEffect, useState } from "react";
import { countdownParts, eventTiming } from "@/lib/domain";
import { cn } from "@/lib/cn";

const units = ["Days", "Hours", "Minutes", "Seconds"] as const;

export function Countdown({
  start,
  end,
  title,
  tone = "light",
}: {
  start: string;
  end: string;
  title: string;
  tone?: "light" | "dark";
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const timing = now === null ? "upcoming" : eventTiming(start, end, now);
  const parts = countdownParts(start, now ?? new Date(start).getTime() - 1);
  const values = [parts.days, parts.hours, parts.minutes, parts.seconds];
  const light = tone === "light";

  let message = `${title} begins soon.`;
  if (timing === "live") message = `${title} is underway.`;
  if (timing === "past") message = `${title} has concluded.`;
  if (timing === "upcoming" && now !== null) {
    message = `${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, and ${parts.seconds} seconds until ${title}.`;
  }

  return (
    <div role="timer" aria-label={now === null ? `Countdown to ${title}` : message}>
      {timing === "upcoming" ? (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {units.map((unit, index) => (
            <div
              key={unit}
              className={cn(
                "rounded-2xl px-1 py-3 text-center sm:px-3 sm:py-4",
                light ? "bg-white/10" : "bg-sage",
              )}
            >
              <div className={cn("font-serif text-2xl leading-none sm:text-4xl", light ? "text-white" : "text-forest")}>
                {now === null ? "—" : String(values[index]).padStart(2, "0")}
              </div>
              <div className={cn("mt-2 text-[0.65rem] uppercase tracking-[0.14em] sm:text-xs", light ? "text-mist" : "text-quiet")}>
                {unit}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={cn("font-serif text-3xl leading-tight", light ? "text-white" : "text-forest")}>
          {timing === "live" ? "This experience is underway." : "This experience has concluded."}
        </p>
      )}
    </div>
  );
}

import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <Link href="/" className={cn("inline-flex min-w-0 items-center gap-2.5", light ? "text-white" : "text-forest")}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current" aria-hidden="true">
        <span className="font-serif text-[0.95rem] leading-none tracking-tight">B&J</span>
      </span>
      <span className="min-w-0 leading-none">
        <span className="block truncate font-serif text-[1.35rem] tracking-tight">B&JEvents</span>
        <span className={cn("mt-1 block text-[0.58rem] uppercase tracking-[0.18em]", light ? "text-mist" : "text-quiet")}>
          Conference Hub
        </span>
      </span>
    </Link>
  );
}

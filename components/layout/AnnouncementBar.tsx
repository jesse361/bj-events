import Link from "next/link";
import { site } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="on-dark bg-forest text-white">
      <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-1 px-4 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:px-6 sm:text-center">
        <p>{site.announcement}</p>
        <Link href="/events" className="shrink-0 font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white">
          Explore events
        </Link>
      </div>
    </div>
  );
}

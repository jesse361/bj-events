import { cn } from "@/lib/cn";

export function Starburst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 1.5 22.4 14.2 35.8 8.2 25.2 18.2 38.5 20 25.2 21.8 35.8 31.8 22.4 25.8 20 38.5 17.6 25.8 4.2 31.8 14.8 21.8 1.5 20 14.8 18.2 4.2 8.2 17.6 14.2 20 1.5Z"
      />
    </svg>
  );
}

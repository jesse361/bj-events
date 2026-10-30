import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-forest text-white hover:bg-forest-deep",
  secondary: "border border-forest/20 bg-white text-forest hover:border-forest hover:bg-sage",
  light: "bg-white text-forest hover:bg-sage",
  ghost: "border border-white/35 bg-transparent text-white hover:bg-white/10",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-full px-6 text-center text-sm font-semibold tracking-wide transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

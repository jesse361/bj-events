"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { navLinks } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpenPath(null);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function trapFocus(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !menuRef.current) return;
    const items = menuRef.current.querySelectorAll<HTMLElement>("a, button");
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto grid h-[4.5rem] max-w-[1180px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm text-quiet transition-colors hover:text-forest",
                  active && "font-semibold text-forest",
                )}
              >
                {link.label}
                {active ? <span className="absolute -bottom-2 left-0 right-0 h-px bg-forest" /> : null}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <ButtonLink href="/tickets" className="h-10 px-4 sm:px-5">
            <span className="sm:hidden">Tickets</span>
            <span className="hidden sm:inline">Get Tickets</span>
          </ButtonLink>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-forest lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpenPath(pathname)}
          >
            <span className="sr-only">Open menu</span>
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>

      <div
        id="mobile-navigation"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        onKeyDown={trapFocus}
        className={cn(
          "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ivory px-5 py-5 lg:hidden",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-forest"
            onClick={() => setOpenPath(null)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-12 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn("py-2 font-serif text-4xl text-forest", active && "underline decoration-gold decoration-2 underline-offset-8")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <ButtonLink href="/tickets" className="mt-10 w-full">
          Get Tickets
        </ButtonLink>
      </div>
    </>
  );
}

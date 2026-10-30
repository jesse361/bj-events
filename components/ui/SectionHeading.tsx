import { cn } from "@/lib/cn";

export function SectionHeading({
  label,
  title,
  text,
  align = "left",
  tone = "dark",
  id,
}: {
  label?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  id?: string;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      {label ? <p className={cn("eyebrow", tone === "light" && "text-mist")}>{label}</p> : null}
      <h2 id={id} className={cn("section-title mt-3 text-forest", tone === "light" && "text-white")}>
        {title}
      </h2>
      {text ? (
        <p className={cn("mt-4 text-base leading-7 text-muted sm:text-lg sm:leading-8", tone === "light" && "text-mist")}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

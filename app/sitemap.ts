import type { MetadataRoute } from "next";
import { events } from "@/lib/events";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  const paths = [
    "",
    "/events",
    "/speakers",
    "/schedule",
    "/tickets",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    ...events.map((event) => `/events/${event.slug}`),
  ];
  return paths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
  }));
}

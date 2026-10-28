import type { MetadataRoute } from "next";
import { projects } from "./data";

const base = "https://mohssinechedgane.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/latest", "/contact"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...pages, ...work];
}

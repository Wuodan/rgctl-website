import type { MetadataRoute } from "next";
import { listDocSlugs } from "@/lib/docs";
import { listLanguages } from "@/lib/languages";
import { projects } from "@/lib/projects";

export const dynamic = "force-static";

const SITE = "https://rgctl.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/install/",
    "/agents/",
    "/projects/",
    "/demo/",
    "/community/",
    "/docs/guides/",
    "/docs/languages/",
  ];

  const docPaths = listDocSlugs()
    .filter((slug) => !(slug.length === 1 && slug[0] === "guides"))
    .map((slug) => `/docs/${slug.join("/")}/`);

  const langPaths = listLanguages().map((l) => `/docs/languages/${l.id}/`);
  const projectPaths = projects.map((p) => `/projects/${p.slug}/`);

  const all = [
    ...new Set([...staticPaths, ...projectPaths, ...docPaths, ...langPaths]),
  ];
  const now = new Date();
  return all.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/docs/guides/") ? 0.8 : 0.6,
  }));
}

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type GuideDemoMeta = {
  slug: string;
  title: string;
  blurb: string;
};

type AgentManifestEntry = {
  slug: string;
  title: string;
  script: string;
  status: string;
};

type AgentManifest = {
  scripts: AgentManifestEntry[];
};

let cached: AgentManifest | null = null;

function loadManifest(): AgentManifest {
  const isProd = process.env.NODE_ENV === "production";
  if (isProd && cached) return cached;
  const path = join(process.cwd(), "docs/videos/agent/manifest.json");
  if (!existsSync(path)) {
    const empty: AgentManifest = { scripts: [] };
    if (isProd) cached = empty;
    return empty;
  }
  const parsed = JSON.parse(readFileSync(path, "utf8")) as AgentManifest;
  if (isProd) cached = parsed;
  return parsed;
}

function goalFor(entry: AgentManifestEntry): string {
  const scriptPath = join(process.cwd(), "docs/videos/agent", entry.script);
  if (existsSync(scriptPath)) {
    const text = readFileSync(scriptPath, "utf8");
    const match = text.match(/^\*\*Goal:\*\*\s*(.+)$/m);
    if (match?.[1]) return match[1].trim();
  }
  return "A coding agent answers a real question with rgctl evidence.";
}

/** Guide slugs that have an agent recording. */
export function listGuideDemoMetas(): GuideDemoMeta[] {
  return loadManifest()
    .scripts.filter((entry) => entry.status === "recorded" || entry.status === "vhs")
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      blurb:
        entry.slug === "cli-command-reference"
          ? "CLI command taxonomy, canonical verbs, and aliases (VHS walkthrough)."
          : goalFor(entry),
    }));
}

export function getGuideDemoMeta(slug: string): GuideDemoMeta | null {
  return listGuideDemoMetas().find((g) => g.slug === slug) ?? null;
}

/** True when the agent MP4 is present for build-time embedding. */
export function guideDemoMp4Exists(slug: string): boolean {
  const candidates = [
    join(process.cwd(), "public/demos", `guide-${slug}.mp4`),
    join(process.cwd(), "docs/videos/agent/recordings", `${slug}.mp4`),
  ];
  return candidates.some((p) => existsSync(p));
}

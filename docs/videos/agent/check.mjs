#!/usr/bin/env node
/**
 * Validate the agent-video manifest against the scripts and the guide tree.
 *
 * Run from the website repo:
 *   pnpm check:agent-videos
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const base = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(base, "../../..");
const errors = [];

function fail(message) {
  errors.push(message);
}

const manifestPath = path.join(base, "manifest.json");
if (!existsSync(manifestPath)) {
  console.error("MISSING docs/videos/agent/manifest.json");
  process.exit(1);
}

let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
} catch (error) {
  console.error(`INVALID manifest.json: ${error.message}`);
  process.exit(1);
}

if (!Array.isArray(manifest.scripts) || manifest.scripts.length === 0) {
  fail("manifest.json must contain a non-empty scripts[] array");
}

const slugs = new Set();
const scriptPaths = new Set();
const entries = Array.isArray(manifest.scripts) ? manifest.scripts : [];

for (const entry of entries) {
  const label = entry?.slug ? `[${entry.slug}]` : "[unknown]";
  for (const field of ["slug", "title", "guide", "script", "fixture", "questions", "status"]) {
    if (entry?.[field] === undefined || entry?.[field] === "") {
      fail(`${label} missing required field: ${field}`);
    }
  }
  if (!entry?.slug || !entry?.script) continue;

  if (slugs.has(entry.slug)) fail(`${label} duplicate slug`);
  slugs.add(entry.slug);

  const scriptPath = path.resolve(base, entry.script);
  if (!scriptPath.startsWith(base + path.sep)) {
    fail(`${label} script path escapes docs/videos/agent: ${entry.script}`);
  } else if (scriptPaths.has(scriptPath)) {
    fail(`${label} duplicate script path: ${entry.script}`);
  } else {
    scriptPaths.add(scriptPath);
    if (!existsSync(scriptPath)) {
      fail(`${label} script does not exist: ${entry.script}`);
    } else {
      const text = readFileSync(scriptPath, "utf8");
      const count = (text.match(/^### \d+\./gm) ?? []).length;
      if (count !== entry.questions) {
        fail(`${label} manifest says ${entry.questions} questions, script has ${count}`);
      }
      if (!text.includes("## Questions")) {
        fail(`${label} script is missing a "## Questions" section`);
      }
    }
  }

  if (entry.slug === "full-demo") {
    if (!existsSync(path.join(websiteRoot, "src/app/demo/page.tsx"))) {
      fail(`${label} full demo page is missing`);
    }
  } else {
    const guidePath = path.join(websiteRoot, "docs/guides", `${entry.slug}.md`);
    if (!existsSync(guidePath)) {
      fail(`${label} guide does not exist: docs/guides/${entry.slug}.md`);
    }
    if (entry.guide !== `/docs/guides/${entry.slug}/`) {
      fail(`${label} guide path should be /docs/guides/${entry.slug}/`);
    }
  }

  for (const field of ["video", "poster", "captions", "transcript"]) {
    if (!entry[field]) continue;
    const filePath = path.resolve(base, entry[field]);
    if (!filePath.startsWith(base + path.sep)) {
      fail(`${label} ${field} path escapes docs/videos/agent: ${entry[field]}`);
    } else if (!existsSync(filePath)) {
      fail(`${label} ${field} file does not exist: ${entry[field]}`);
    }
  }
}

const guides = readdirSync(path.join(websiteRoot, "docs/guides"))
  .filter((name) => name.endsWith(".md") && name !== "README.md")
  .map((name) => name.slice(0, -3));
const scripted = new Set(entries.map((entry) => entry.slug).filter((slug) => slug !== "full-demo"));

for (const guide of guides) {
  if (!scripted.has(guide)) fail(`missing script for guide: ${guide}`);
}
for (const slug of scripted) {
  if (!guides.includes(slug)) fail(`script has no matching guide: ${slug}`);
}

if (errors.length) {
  console.error(`Agent video validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const recorded = entries.filter((entry) => entry.status === "recorded").length;
console.log(
  `Agent videos OK: ${entries.length} scripts (${guides.length} guides + full demo), ${recorded} recorded.`,
);

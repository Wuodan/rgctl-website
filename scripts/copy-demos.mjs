/**
 * Copy demo media into public/demos/.
 * Prefer local docs/videos/, then RGCTL_REPO/docs/videos/ for the homepage CLI showcase.
 * Guide demos are the agent recordings under docs/videos/agent/recordings/<slug>.mp4.
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(here, "..");
const destDir = join(siteRoot, "public/demos");

function resolveRgctlRepo() {
  const candidates = [
    process.env.RGCTL_REPO,
    join(siteRoot, "../rgctl"),
    join(siteRoot, "../rbuilder"),
  ].filter(Boolean);
  for (const c of candidates) {
    const abs = resolve(c);
    if (existsSync(join(abs, "docs/videos"))) return abs;
  }
  return null;
}

mkdirSync(destDir, { recursive: true });

const files = [
  ["docs/videos/user-guide-cli.gif", "user-guide-cli.gif"],
  ["docs/videos/user-guide-cli.mp4", "user-guide-cli.mp4"],
];

const rgctlRepo = resolveRgctlRepo();
const roots = [siteRoot, rgctlRepo].filter(Boolean);

let copied = 0;
for (const [rel, name] of files) {
  let from = null;
  for (const root of roots) {
    const candidate = join(root, rel);
    if (existsSync(candidate)) {
      from = candidate;
      break;
    }
  }
  if (!from) {
    console.warn(`[copy-demos] skip missing: ${rel}`);
    continue;
  }
  cpSync(from, join(destDir, name));
  copied += 1;
  console.log(`[copy-demos] ${from} → public/demos/${name}`);
}

// Agent recordings are the current guide demos. The old VHS files are no
// longer copied; docs/videos/ is retained for the historical tape scripts.
const agentManifestPath = join(siteRoot, "docs/videos/agent/manifest.json");
const agentRecordings = join(siteRoot, "docs/videos/agent/recordings");
if (existsSync(agentManifestPath) && existsSync(agentRecordings)) {
  const manifest = JSON.parse(readFileSync(agentManifestPath, "utf8"));
  for (const entry of manifest.scripts ?? []) {
    if (entry.status !== "recorded" || entry.slug === "cli-command-reference") continue;
    // Guides stay silent on the site. Voiced social copies live under
    // recordings/socials and are intentionally not copied here.
    const from = join(agentRecordings, `${entry.slug}.mp4`);
    if (!existsSync(from)) continue;
    const destName = `guide-${entry.slug}.mp4`;
    cpSync(from, join(destDir, destName));
    copied += 1;
    console.log(`[copy-demos] ${from} → public/demos/${destName}`);
  }
}

// The command reference keeps its historical VHS walkthrough.
const cliVhs = join(siteRoot, "docs/videos/user-guide-cli.mp4");
if (existsSync(cliVhs)) {
  cpSync(cliVhs, join(destDir, "guide-cli-command-reference.mp4"));
  copied += 1;
  console.log(`[copy-demos] ${cliVhs} → public/demos/guide-cli-command-reference.mp4`);
}

if (copied === 0) {
  console.warn(
    "[copy-demos] no demo media found — place files under docs/videos/ or set RGCTL_REPO",
  );
}

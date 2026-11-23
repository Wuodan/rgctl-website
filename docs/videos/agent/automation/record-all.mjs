import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const base = path.resolve(here, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(base, "manifest.json"), "utf8"));
const logPath = path.join(base, ".work", "record-all.log");
fs.mkdirSync(path.dirname(logPath), { recursive: true });
const log = (line) => {
  fs.appendFileSync(logPath, line + "\n");
  console.log(line);
};

const force = process.argv.includes("--force");
const slugs = manifest.scripts
  .filter((entry) => entry.slug !== "full-demo")
  .filter((entry) => force || !["recorded", "vhs"].includes(entry.status))
  .map((entry) => entry.slug);

log(`Batch start: ${slugs.length} guide(s), force=${force}`);

for (const slug of slugs) {
  const entry = manifest.scripts.find((item) => item.slug === slug);
  const args = [
    path.join(base, "automation/record.mjs"),
    "--slug",
    slug,
    "--agent",
    "claude",
    "--publish",
  ];
  if (slug === "markdown-context-graph") {
    args.push("--fixture", "example/k8s-website");
  }
  log(`\n=== ${slug} — ${entry.title}`);
  const result = spawnSync(process.execPath, args, {
    cwd: base,
    env: { ...process.env, DEMO_THEME: "chat" },
    encoding: "utf8",
    timeout: 900000,
  });
  if (result.stdout) log(result.stdout.trim());
  if (result.stderr) log(result.stderr.trim());
  if (result.error) log(`ERROR: ${result.error.message}`);
  log(`=== ${slug} exit=${result.status ?? "timeout"}`);
}

const check = spawnSync(process.execPath, [path.join(base, "check.mjs")], {
  encoding: "utf8",
});
log(check.stdout?.trim() ?? "");
if (check.stderr) log(check.stderr.trim());
log(`Batch complete. Log: ${logPath}`);

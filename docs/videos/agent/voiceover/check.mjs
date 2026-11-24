#!/usr/bin/env node
/**
 * Validate voiceover scripts and generated audio.
 *
 *   pnpm voiceover:check
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const base = path.dirname(fileURLToPath(import.meta.url));
const scriptDir = path.join(base, "script");
const manifestPath = path.join(base, "manifest.json");
const errors = [];

const scripts = readdirSync(scriptDir)
  .filter((name) => name.endsWith(".md"))
  .sort();

if (scripts.length === 0) {
  console.error("No voiceover scripts found in docs/videos/agent/voiceover/script");
  process.exit(1);
}

for (const name of scripts) {
  const slug = name.slice(0, -3);
  const text = readFileSync(path.join(scriptDir, name), "utf8");
  if (!/^##\s+Intro/m.test(text)) errors.push(`${slug}: missing Intro`);
  if (!/^##\s+Walkthrough/m.test(text)) errors.push(`${slug}: missing Walkthrough`);
  if (!/^##\s+On screen/m.test(text)) errors.push(`${slug}: missing On screen`);
  if (!/^##\s+Outro/m.test(text)) errors.push(`${slug}: missing Outro`);
  if (!/^>\s+rgctl is an open-source/m.test(text)) {
    errors.push(`${slug}: Intro must start with the standard rgctl sentence`);
  }
  if (!/^>\s+Try rgctl at rgctl\.io\/install/m.test(text)) {
    errors.push(`${slug}: Outro must invite people to try rgctl`);
  }
}

let manifest = null;
if (existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    errors.push(`manifest.json is invalid: ${error.message}`);
  }
}

if (manifest) {
  for (const entry of manifest.scripts ?? []) {
    if (!entry?.slug) {
      errors.push("manifest entry is missing slug");
      continue;
    }
    if (!scripts.includes(`${entry.slug}.md`)) {
      errors.push(`${entry.slug}: manifest entry has no script`);
    }
    if (["generated", "mock"].includes(entry.status)) {
      if (!entry.audio || !existsSync(path.join(base, entry.audio))) {
        errors.push(`${entry.slug}: ${entry.status} audio does not exist: ${entry.audio ?? "missing audio field"}`);
      }
      if (!entry.durationSec || entry.durationSec <= 0) {
        errors.push(`${entry.slug}: generated audio has no positive durationSec`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Voiceover validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const generated = (manifest?.scripts ?? []).filter((entry) => ["generated", "mock"].includes(entry.status)).length;
console.log(`Voiceovers OK: ${scripts.length} scripts, ${generated} generated.`);

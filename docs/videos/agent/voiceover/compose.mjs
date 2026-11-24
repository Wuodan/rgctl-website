#!/usr/bin/env node
/**
 * Mux voiceover audio into the guide videos.
 *
 *   pnpm voiceover:compose -- --slug blast-radius-analysis --publish
 *   pnpm voiceover:compose:all
 *
 * Output: docs/videos/agent/recordings/socials/<slug>.mp4
 *
 * Audio is placed at the start of the video. If the narration is longer than
 * the picture, the last video frame is held so the outro is not lost. If it is
 * shorter, the audio is padded with silence to the video duration.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { loadEnv, value } from "../automation/lib/env.mjs";

const base = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const finalDir = path.resolve(option("--out-dir", path.join(base, "..", "recordings", "socials")));
const manifestPath = path.join(finalDir, "manifest.json");
const env = loadEnv(path.join(base, ".env.voiceover"));

function flag(name) { return argv.includes(name); }
function option(name, fallback = "") {
  const index = argv.indexOf(name);
  return index >= 0 && argv[index + 1] && !argv[index + 1].startsWith("--") ? argv[index + 1] : fallback;
}
function die(message) { console.error(`compose: ${message}`); process.exit(1); }

function ffprobe(file, entries) {
  const result = spawnSync("ffprobe", ["-v", "error", "-show_entries", entries, "-of", "csv=p=0", file], { encoding: "utf8" });
  if (result.status !== 0) die(`ffprobe failed: ${file}`);
  return result.stdout.trim();
}
function durationOf(file) { return Number(ffprobe(file, "format=duration")); }

function videoEncoderArgs() {
  const available = spawnSync("ffmpeg", ["-hide_banner", "-encoders"], { encoding: "utf8" }).stdout || "";
  if (/libx264/.test(available)) return ["libx264", "-preset", "medium", "-crf", "18"];
  if (/libopenh264/.test(available)) return ["libopenh264", "-b:v", "6M"];
  return ["mpeg4", "-q:v", "3"];
}


function loadJson(file, fallback) {
  if (!existsSync(file)) return fallback;
  return JSON.parse(readFileSync(file, "utf8"));
}

const voiceover = loadJson(path.join(base, "manifest.json"), { scripts: [] });
const agent = loadJson(path.join(base, "..", "manifest.json"), { scripts: [] });
const agentBySlug = new Map((agent.scripts ?? []).map((entry) => [entry.slug, entry]));
const voiceBySlug = new Map((voiceover.scripts ?? []).map((entry) => [entry.slug, entry]));
const finalManifest = loadJson(manifestPath, { schemaVersion: 1, scripts: [] });

function videoFor(slug) {
  return slug === "cli-command-reference"
    ? path.resolve(base, "../../user-guide-cli.mp4")
    : path.resolve(base, "..", "recordings", `${slug}.mp4`);
}

const slugs = flag("--all") || !option("--slug")
  ? [...voiceBySlug.keys()].filter((slug) => voiceBySlug.get(slug)?.audio).sort()
  : [option("--slug")];

if (!slugs.length) die("no voiceover audio found; run pnpm voiceover:build:all first");

let built = 0;
mkdirSync(finalDir, { recursive: true });

for (const slug of slugs) {
  const entry = voiceBySlug.get(slug);
  if (!entry?.audio) {
    if (flag("--all")) {
      console.warn(`${slug}: no generated audio, skipping (run pnpm voiceover:build -- --slug ${slug})`);
      continue;
    }
    die(`${slug}: no generated audio in voiceover manifest`);
  }

  const audio = path.resolve(base, entry.audio);
  const video = videoFor(slug);
  if (!existsSync(audio)) die(`${slug}: audio file missing: ${entry.audio}`);
  if (!existsSync(video)) die(`${slug}: video missing: ${video}`);

  const output = path.join(finalDir, `${slug}.mp4`);
  if (!flag("--force") && existsSync(output)) {
    console.log(`${slug}: final exists, skipping (use --force)`);
    continue;
  }

  const videoDuration = durationOf(video);
  const audioDuration = durationOf(audio);
  const drift = audioDuration - videoDuration;
  if (Math.abs(drift) > 15) {
    console.warn(`${slug}: voiceover ${audioDuration.toFixed(1)}s vs video ${videoDuration.toFixed(1)}s — review the cut before publishing`);
  }
  const target = Math.max(videoDuration, audioDuration);
  const extendVideo = target > videoDuration + 0.05;
  const filter = [
    extendVideo
      ? `[0:v]tpad=stop_mode=clone:stop_duration=${(target - videoDuration).toFixed(3)},setpts=PTS-STARTPTS[v]`
      : null,
    `[1:a]apad=whole_dur=${target.toFixed(3)},atrim=0:${target.toFixed(3)},asetpts=PTS-STARTPTS[a]`,
  ].filter(Boolean).join(";");

  const args = ["-y", "-i", video, "-i", audio];
  args.push("-filter_complex", filter);
  if (extendVideo) {
    args.push("-map", "[v]", "-c:v", ...videoEncoderArgs());
  } else {
    args.push("-map", "0:v", "-c:v", "copy");
  }
  args.push(
    "-map", "[a]", "-c:a", "aac", "-b:a", "192k",
    "-t", target.toFixed(3),
    "-movflags", "+faststart",
    output,
  );

  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.status !== 0) die(`ffmpeg failed for ${slug}`);

  const durationSec = durationOf(output);
  const data = {
    slug,
    status: "voiced",
    title: agentBySlug.get(slug)?.title ?? slug,
    video: path.relative(finalDir, output),
    sourceVideo: path.relative(path.dirname(finalDir), video),
    audio: path.relative(path.dirname(finalDir), audio),
    durationSec: Number(durationSec.toFixed(2)),
    videoDurationSec: Number(videoDuration.toFixed(2)),
    audioDurationSec: Number(audioDuration.toFixed(2)),
    extendedVideo: extendVideo,
    model: entry.model ?? value(env, "ELEVENLABS_MODEL", "eleven_multilingual_v2"),
    generatedAt: new Date().toISOString(),
  };
  const scripts = finalManifest.scripts ?? [];
  const index = scripts.findIndex((item) => item.slug === slug);
  if (index >= 0) scripts[index] = { ...scripts[index], ...data };
  else scripts.push(data);
  finalManifest.schemaVersion = 1;
  finalManifest.scripts = scripts;
  finalManifest.updatedAt = new Date().toISOString();
  built += 1;
  console.log(`${slug}: wrote ${path.relative(process.cwd(), output)} (${durationSec.toFixed(1)}s${extendVideo ? ", held last frame" : ""})`);
}

if (flag("--publish")) {
  writeFileSync(manifestPath, `${JSON.stringify(finalManifest, null, 2)}\n`);
  console.log(`Updated ${path.relative(process.cwd(), manifestPath)}`);
}
console.log(`Compose complete: ${built} file(s).`);

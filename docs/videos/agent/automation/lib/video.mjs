import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";
import { bool, number, value } from "./env.mjs";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeJsonForHtml(json) {
  return json
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

function resolveChromium(config) {
  const executablePath = value(config, "DEMO_PLAYWRIGHT_CHROMIUM");
  if (executablePath) return { executablePath };

  // Playwright may be pinned to a headless-shell build that is not installed
  // locally. Reuse a full Chromium from the same Playwright cache when present.
  const cache = path.join(os.homedir(), ".cache", "ms-playwright");
  if (!fs.existsSync(cache)) return {};
  const candidates = fs
    .readdirSync(cache)
    .filter((name) => name.startsWith("chromium-"))
    .sort()
    .reverse()
    .flatMap((name) => [
      path.join(cache, name, "chrome-linux64", "chrome"),
      path.join(cache, name, "chrome-linux", "chrome"),
    ]);
  const found = candidates.find((candidate) => fs.existsSync(candidate));
  return found ? { executablePath: found } : {};
}

export async function renderTimeline({
  timeline,
  slug,
  output,
  config,
  baseDir,
}) {
  const width = number(config, "DEMO_VIEWPORT_WIDTH", 1920);
  const height = number(config, "DEMO_VIEWPORT_HEIGHT", 1080);
  const pauseMs = number(config, "DEMO_PAUSE_MS", 650);
  const endPauseMs = number(config, "DEMO_END_PAUSE_MS", 1000);
  const introMs = number(config, "DEMO_INTRO_MS", 2800);
  const outroMs = number(config, "DEMO_OUTRO_MS", 3000);
  const timeoutMs = number(config, "DEMO_TIMEOUT_MS", 300000);

  const workDir = path.resolve(baseDir, value(config, "DEMO_WORK_DIR", ".work"));
  const rawDir = path.join(workDir, slug, "raw");
  const htmlDir = path.join(workDir, slug);
  fs.rmSync(rawDir, { recursive: true, force: true });
  ensureDir(rawDir);
  ensureDir(path.dirname(output));

  const templateName = timeline.meta?.theme === "dashboard" ? "dashboard.html" : "index.html";
  const templatePath = path.join(baseDir, "automation/renderer", templateName);
  const logoPath = path.resolve(baseDir, "../../../public/brand/rgctl-logo-dark.svg");
  const template = fs.readFileSync(templatePath, "utf8");
  const logo = fs.readFileSync(logoPath).toString("base64");

  const enriched = {
    ...timeline,
    meta: {
      ...timeline.meta,
      pauseMs,
      endPauseMs,
      introMs,
      outroMs,
      questionCount: timeline.meta?.questionCount ?? 0,
    },
  };

  const htmlPath = path.join(htmlDir, "render.html");
  fs.writeFileSync(
    htmlPath,
    template
      .replaceAll("__LOGO__", `data:image/svg+xml;base64,${logo}`)
      .replaceAll("__DEMO_SCALE__", (width / 1600).toFixed(4))
      // Use a function so `$&`, `$'`, and similar shell fragments in the
      // transcript are not interpreted as String.replace replacement patterns.
      .replace("__TIMELINE__", () => escapeJsonForHtml(JSON.stringify(enriched))),
    "utf8",
  );

  const browser = await chromium.launch({ headless: true, ...resolveChromium(config) });
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    recordVideo: { dir: rawDir, size: { width, height } },
  });
  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(String(error)));

  let video;
  try {
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
    await page.waitForTimeout(250);
    await page.waitForFunction(() => window.__done === true, null, { timeout: timeoutMs });
    const renderError = await page.evaluate(() => window.__error || null);
    if (renderError) throw new Error(`Renderer failed: ${renderError}`);
    if (pageErrors.length) throw new Error(`Page errors: ${pageErrors.join("; ")}`);
    await page.waitForTimeout(endPauseMs);
    video = page.video();
  } finally {
    await context.close();
    await browser.close();
  }

  if (!video) throw new Error("Playwright did not create a video recording.");

  const rawFiles = fs
    .readdirSync(rawDir)
    .filter((name) => name.endsWith(".webm"))
    .map((name) => path.join(rawDir, name))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  if (!rawFiles.length) throw new Error(`Playwright produced no WebM video in ${rawDir}`);
  const rawPath = path.join(rawDir, `${slug}-${Date.now()}.webm`);
  fs.copyFileSync(rawFiles[0], rawPath);

  const ffmpeg = value(config, "DEMO_FFMPEG_BIN", "ffmpeg");
  const crf = String(number(config, "DEMO_VIDEO_CRF", 20));
  const bitrate = value(config, "DEMO_VIDEO_BITRATE", "6M");
  let encoder = value(config, "DEMO_VIDEO_ENCODER");
  if (!encoder) {
    try {
      const available = execFileSync(ffmpeg, ["-hide_banner", "-encoders"], {
        encoding: "utf8",
      });
      encoder = /libx264/.test(available)
        ? "libx264"
        : /libopenh264/.test(available)
          ? "libopenh264"
          : "mpeg4";
    } catch {
      encoder = "mpeg4";
    }
  }

  const codecArgs =
    encoder === "libx264"
      ? ["-preset", "medium", "-crf", crf]
      : encoder === "libopenh264"
        ? ["-b:v", bitrate]
        : ["-q:v", "3"];

  try {
    execFileSync(
      ffmpeg,
      [
        "-y",
        "-i",
        rawPath,
        "-vf",
        `scale=${width}:${height}:flags=lanczos`,
        "-c:v",
        encoder,
        ...codecArgs,
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-an",
        output,
      ],
      { stdio: "pipe" },
    );
  } catch (error) {
    const stderr = error?.stderr?.toString?.() ?? "";
    throw new Error(`ffmpeg failed (${encoder}): ${stderr.slice(-2000) || error.message}`);
  }

  let duration = 0;
  try {
    const ffprobe = value(config, "DEMO_FFPROBE_BIN", "ffprobe");
    const out = execFileSync(
      ffprobe,
      ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", output],
      { encoding: "utf8" },
    );
    duration = Number(out.trim()) || 0;
  } catch {
    duration = 0;
  }

  if (!bool(config, "DEMO_KEEP_RAW", false)) {
    fs.rmSync(rawPath, { force: true });
    fs.rmSync(rawDir, { recursive: true, force: true });
  }

  return { output, duration, rawPath, htmlPath };
}

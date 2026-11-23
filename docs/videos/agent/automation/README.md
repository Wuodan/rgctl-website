# Agent recording automation

This is the transcript-first pipeline: run a real coding agent, save its structured events, render a branded chat/terminal view, and record it with Playwright.

```text
question script
   → agent adapter (Claude Code, later OpenCode)
   → transcript (.work/<slug>/transcript.json)
   → renderer (HTML)
   → Playwright video
   → ffmpeg MP4
   → manifest + check
```

## Setup

Copy the ignored env file and add the key:

```bash
cp docs/videos/agent/.env.demo.agent.example docs/videos/agent/.env.demo.agent
# edit DEEPSEEK_API_KEY
```

The same key drives both clients:

| Client | Endpoint | Default model |
|---|---|---|
| Claude Code | `https://api.deepseek.com/anthropic` | `deepseek-flash` |
| OpenCode | `https://api.deepseek.com` | `deepseek/deepseek-chat` |

Claude Code uses the Anthropic-compatible endpoint. OpenCode uses the OpenAI-compatible endpoint and the provider sample in `config/opencode.deepseek.json`.

## Run

```bash
# Pipeline smoke test — no key, deterministic mock events
pnpm agent:record --slug blast-radius-analysis --agent mock

# Real Claude Code run (requires DEEPSEEK_API_KEY)
pnpm agent:record --slug blast-radius-analysis --agent claude

# Publish: write recordings/<slug>.mp4 + transcripts/<slug>.json and update the manifest
pnpm agent:record --slug blast-radius-analysis --agent claude --publish
```

Outputs:

- `.work/<slug>/transcript.json` — normalized events
- `.work/<slug>/render.html` — the rendered page
- `.work/<slug>/<slug>.mp4` — local preview
- `recordings/<slug>.mp4` — published video
- `transcripts/<slug>.json` — published transcript

## Themes

- `chat` (default) — the dark chat view with the grid background.
- `dashboard` — the same Q&A layout using the rgctl Universe v2 dashboard palette: `#0b0d10` canvas, `#0a0e14` panels, `#38bdf8` sky accent, zinc text, and flat borders.

```bash
pnpm agent:record --slug blast-radius-analysis --agent claude --theme dashboard \
  --out docs/videos/agent/recordings/blast-radius-analysis-dashboard.mp4
```

Every recording includes the animated intro, persistent “Why it matters” evidence caption, and outro. Recordings render at **1920×1080** with a higher-quality encode. Token counts are intentionally not shown.

## Current adapters

- **mock** — deterministic renderer test, clearly labeled as a renderer test.
- **claude** — headless Claude Code with `--output-format stream-json`, replaying a session across questions.
- **opencode** — configuration is ready in `config/opencode.deepseek.json`; the UI/API adapter is the next implementation.

## Safety and reproducibility

- Use a disposable fixture copy. Claude Code can be given a narrow `CLAUDE_ALLOWED_TOOLS` list; never use `--dangerously-skip-permissions` on a real checkout.
- The default `CLAUDE_MAX_BUDGET_USD=2` limits a take.
- Published manifests should record `model`, `rgctlVersion`, and `fixtureCommit`.
- The renderer plays the actual transcript; do not fabricate tool calls. If the transcript is a replay, label it in the manifest/description.

## Recordly

[Recordly evaluation](recordly-evaluation.md): useful for manual zoom/cursor polish on real UI recordings, not suitable as the default automated renderer. The internal smoke-export path is experimental.

## Social distribution

See [social-content-plan.md](../social-content-plan.md) for the publishing stack: Playwright/Remotion for assets, Postiz or Ayrshare for scheduling, and a human approval gate.

## Why not screen-capture a desktop IDE?

Cursor/Antigravity desktop automation needs accessibility hooks, a virtual display, and brittle selectors. A structured agent transcript plus a browser renderer is reproducible, works in CI, and lets you regenerate the video after a design change.

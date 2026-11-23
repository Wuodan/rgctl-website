# AGENTS.md — rgctl website

This repository is the rgctl marketing site and documentation hub. It also contains the **coding-agent video pipeline**.

Read this file before changing guide demos. The operational source of truth is under [`docs/videos/agent/`](docs/videos/agent/).

## Repository commands

```bash
pnpm install
pnpm dev                 # local site
pnpm build               # static export into out/
pnpm lint
pnpm check:agent-videos  # manifest / script / recording validation
pnpm agent:record:all    # record every script that is not already recorded or VHS
```

The product repository is normally a sibling checkout at `../rbuilder` (override with `RGCTL_REPO`). The demos use `rgctl` from that checkout or from `PATH`.

## Where the video pieces live

```text
docs/videos/agent/
├── manifest.json          # guide → script, status, recording metadata
├── scripts/<slug>.md      # user-voice questions and expected evidence
├── automation/            # recorder, Claude adapter, renderers
├── recordings/<slug>.mp4  # final agent videos
├── transcripts/<slug>.json
├── setup-demo.sh          # install agent pack + index a fixture
├── CONTRIBUTING.md
├── RECORDING.md
└── .env.demo.agent.example
```

The site copies `recordings/<slug>.mp4` to `public/demos/guide-<slug>.mp4` at build time. `src/lib/guide-demos.ts` reads the agent manifest, and guide pages render the matching video.

`docs/videos/` is the historical VHS tree. Do not add new guide videos there.

## Prerequisites

- Node.js 22 and pnpm
- Playwright Chromium (the recorder finds a cached browser automatically)
- `ffmpeg` and `ffprobe`
- `rgctl`, built from the product repo:
  ```bash
  cargo build --release --bin rgctl --manifest-path ../rbuilder/Cargo.toml
  ```
- Claude Code (`claude`) for real recordings
- A DeepSeek API key for the recording agent

## Credentials

The key is **never committed**:

```bash
cp docs/videos/agent/.env.demo.agent.example docs/videos/agent/.env.demo.agent
# edit DEEPSEEK_API_KEY
```

The file is ignored by `docs/videos/agent/.gitignore`. Keep it local. The recorder loads it directly; do not export the key into shell history or commit it into transcripts.

Claude Code uses DeepSeek's Anthropic-compatible endpoint:

```text
https://api.deepseek.com/anthropic   model: deepseek-flash
```

## Prepare fixtures

### Standard Java guides (CoolStore)

```bash
INDEX_ARGS='-l java --with-git --with-cfg --with-universe' \
  ./docs/videos/agent/setup-demo.sh --agent claude
```

This installs the agent pack into `example/coolstore-weblogic` and builds the graph. Use a disposable checkout or clean `.claude/` and `.rgctl/` after recording.

### Markdown guide

```bash
FIXTURE=example/k8s-website INDEX_ARGS='' \
  ./docs/videos/agent/setup-demo.sh --agent claude --skip-index
```

### Community detection (metasfresh)

`example/metasfresh-4.9.8b` already has a large indexed graph (roughly 960k nodes and 3M edges):

```bash
FIXTURE=example/metasfresh-4.9.8b \
  ./docs/videos/agent/setup-demo.sh --agent claude --skip-index
```

### PR review (real PR #2)

The PR review recording uses [sshaaf/coolstore-weblogic PR #2](https://github.com/sshaaf/coolstore-weblogic/pull/2) against `sshaaf/main`. Build a disposable fixture and both graph states:

```bash
mkdir -p docs/videos/agent/.work/fixtures
git clone ../rbuilder/example/coolstore-weblogic \
  docs/videos/agent/.work/fixtures/pr-review
cd docs/videos/agent/.work/fixtures/pr-review

git remote add sshaaf https://github.com/sshaaf/coolstore-weblogic.git
git fetch sshaaf refs/pull/2/head:pr-2 refs/heads/main:sshaaf-main
git fetch --unshallow sshaaf

git checkout sshaaf-main
FIXTURE="$PWD" INDEX_ARGS='-l java --with-git --with-cfg' \
  ../../../setup-demo.sh --agent claude
mkdir -p .rgctl-base
cp -a .rgctl/. .rgctl-base/.rgctl/

git checkout pr-2
FIXTURE="$PWD" INDEX_ARGS='-l java --with-git --with-cfg' \
  ../../../setup-demo.sh --agent claude
```

The relative path to `setup-demo.sh` above assumes the fixture is at `docs/videos/agent/.work/fixtures/pr-review`; adjust it if you use another location. Keep the PR fixture under `.work/`; it is ignored.

## Record

### One guide

```bash
# No-key pipeline smoke test
pnpm agent:record --slug blast-radius-analysis --agent mock

# Real recording
pnpm agent:record --slug blast-radius-analysis --agent claude

# Publish: recordings/<slug>.mp4 + transcripts/<slug>.json + manifest
pnpm agent:record --slug blast-radius-analysis --agent claude --publish

# Render an existing transcript without a model call
pnpm agent:record --slug blast-radius-analysis --agent claude \
  --transcript docs/videos/agent/transcripts/blast-radius-analysis.json --publish
```

For the PR fixture, run this from the **website repo root**:

```bash
PR_FIXTURE="$PWD/docs/videos/agent/.work/fixtures/pr-review"

pnpm agent:record --slug pr-review --agent claude \
  --fixture "$PR_FIXTURE" \
  --publish
```

### All guides

```bash
pnpm agent:record:all
```

The batch runner skips `recorded` and `vhs` entries. It is sequential because each run is a real agent session; expect roughly 30–60 minutes and model usage. Retry a single failed slug rather than rerunning everything.

## What the recorder does

1. Parses the blockquoted questions from `scripts/<slug>.md`.
2. Runs Claude Code with `--output-format stream-json` in one session.
3. Captures assistant text, tool calls, tool results, and captions.
4. Redacts local paths and removes `nvm` noise.
5. Renders the branded 1920×1080 page with Playwright.
6. Encodes H.264 with ffmpeg.
7. With `--publish`, updates `manifest.json` and runs `check.mjs`.

The session pane shows only questions and answers. Commands and outputs appear in the Evidence panel. Evidence is filtered to `rgctl` commands only. The “Why it matters” caption stays visible for the whole session.

Intro/outro and quality settings are in `docs/videos/agent/.env.demo.agent`:

```text
DEMO_VIEWPORT_WIDTH=1920
DEMO_VIEWPORT_HEIGHT=1080
DEMO_INTRO_MS=2800
DEMO_OUTRO_MS=3000
DEMO_VIDEO_CRF=16
DEMO_VIDEO_BITRATE=10M
```

Use a disposable fixture for `bypassPermissions`. Do not run the recorder with auto-approval against a real checkout.

## Validate and publish to the site

```bash
pnpm check:agent-videos
pnpm build
```

The build copies agent recordings into `public/demos/guide-<slug>.mp4`. Confirm:

```bash
ls out/demos/guide-*.mp4 | wc -l
# 22
```

`src/lib/guide-demos.ts` builds the page metadata from the agent manifest and script goals. `src/components/guide-demo.tsx` labels the player “Agent walkthrough”.

### CLI Command Reference exception

The CLI command reference intentionally keeps the old VHS walkthrough. `scripts/copy-demos.mjs` copies `docs/videos/user-guide-cli.mp4` to `public/demos/guide-cli-command-reference.mp4`, and the guide-demo component labels it “CLI walkthrough (VHS)”. Its manifest status is `vhs`, not `recorded`; do not re-record it unless the product decision changes.

## Common failures

- **`page.waitForFunction` timeout**: the transcript likely contains a shell fragment such as `$'` that corrupts `String.replace`. The timeline replacement must use a function; do not use a string replacement with `$`-bearing JSON.
- **Claude timeout**: one question exceeded `CLAUDE_TIMEOUT_MS` (currently 600s). Retry the single guide; do not rerun the whole batch.
- **Agent sees no graph**: confirm `which rgctl`, the fixture `.rgctl/`, and `rgctl status`. The agent’s shell must see the same binary as yours.
- **PR review has no deltas**: check `.rgctl-base/.rgctl/` and the base/head refs. A PR with an unrelated history will produce empty deltas.
- **Large media**: recordings are ~5–15 MB each; 22 videos are roughly 240 MB. Prefer re-rendering from a transcript over re-running the model.

## Do not commit

- `.env.demo.agent`
- `.work/`
- `recordings/.work/`
- generated `.claude/`, `.cursor/`, `.agents/` fixtures
- raw test videos or `pr-review-test.*`

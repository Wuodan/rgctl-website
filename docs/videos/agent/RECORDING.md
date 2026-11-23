# Recording an agent walkthrough

The goal is not to show a terminal running rgctl. It is to show a **coding agent answering a user's question with rgctl evidence**, then acting on that evidence.

## Pick the agent and the view

| Agent | Best for | What stays on screen |
|---|---|---|
| Cursor (Agent mode) | Polished guide videos | Chat/agent panel and the terminal or diff it opens |
| Claude Code | Fast, reproducible terminal takes | One terminal showing the question, tool calls, and answer |
| Codex | Reproducible CLI-agent takes | One terminal showing the conversation and commands |
| Antigravity | IDE-agent walkthroughs | Agent panel plus the relevant editor/terminal |

Use a dark theme, a clean fixture, and a window that is already sized for 16:9. Hide the file explorer, minimap, notifications, and any personal tabs unless the story needs them.

## Preflight

1. Build or install the `rgctl` version you intend to show:
   ```bash
   cargo build --release --bin rgctl --manifest-path ../rbuilder/Cargo.toml
   ```
2. Run the setup script:
   ```bash
   ./docs/videos/agent/setup-demo.sh --agent cursor
   ```
3. Open the fixture (`example/coolstore-weblogic`) in the agent.
4. Do a **dry run** of the whole script once. Check that the agent finds `rgctl`, answers with evidence, and does not stall on an approval prompt.
5. Reset the fixture to a clean state (`git status`, remove generated `.rgctl` only if you need a cold start), then start the real take.

Record the versions for the manifest:

```bash
rgctl --version
git -C example/coolstore-weblogic rev-parse --short HEAD
```

Every automated recording starts with the animated brand intro, includes a lower-third evidence caption, and ends with the install/guide outro. The timings are controlled by `DEMO_INTRO_MS` and `DEMO_OUTRO_MS`.

## First take: blast radius

A concrete 60–90 second take:

1. Prepare the fixture:
   ```bash
   ./docs/videos/agent/setup-demo.sh --agent cursor
   ```
2. Open `example/coolstore-weblogic` in Cursor, switch to **Agent** mode, and open the
   terminal panel. Hide the explorer and minimap.
3. Open [scripts/blast-radius-analysis.md](scripts/blast-radius-analysis.md) beside
   the agent so you can paste questions without hunting for them.
4. Paste question 1:
   > I need to change `priceShoppingCart`. Which callers and endpoints are in the blast radius?
5. Let the agent finish. Keep the caller list and the command it used visible.
6. Paste question 2 (depth and entry points), then question 4 (the PR risk summary).
7. Stop the recording and trim the setup/approval pauses. Export as
   `recordings/blast-radius-analysis.mp4`.

For a terminal-only take with Claude Code, run `claude` in the fixture and use the
same questions; the terminal is the entire scene.

## Capture settings

- **Resolution:** record at 1920×1080 or higher; export at 1080p.
- **Frame rate:** 30 fps is enough; 60 fps only if you need smooth scrolling.
- **Terminal font:** 16–18 px; agent chat font 15–16 px. Zoom the UI rather than scaling the video down.
- **Audio:** voiceover is optional. If you use it, record a clean mic track separately. If not, keep the take silent and add captions.
- **Cursor:** show the pointer when clicking; avoid circling or shaking it.
- **Privacy:** use the demo fixture only. No tokens, private repo names, customer data, or personal home-directory paths.

### Tools

- **OBS Studio** — free and cross-platform; use Window Capture for the agent window, optionally a second scene with a title card.
- **Screen Studio** (macOS) — automatic zooms and smooth pans if you want a polished edit.
- **wf-recorder / Kooha** (Linux Wayland) — simple screen capture.
- **QuickTime** (macOS) — quick takes.
- **ffmpeg** — trim, normalize, caption, and export.

A simple OBS scene:

```text
Scene: Agent
  Source: Window Capture (Cursor / terminal)
  Source: Audio Input (optional voiceover)
  Filter: Crop/Pad to 1920×1080
```

For a two-pane story, capture the agent window and the terminal side by side, or use the agent's built-in terminal. Avoid a picture-in-picture webcam unless it adds context.

## Take structure

1. **Cold open (2–3 s):** title card with the guide name and the user question.
2. **Question (5–10 s):** paste or type the question, then pause.
3. **Agent work (20–60 s):** let the agent choose commands and explain the evidence. Keep the tool calls visible but cut long waits.
4. **Follow-up (10–20 s):** ask for the decision, risk, or artifact.
5. **Close (3–5 s):** show the final answer or artifact and the guide URL.

For the [full demo](scripts/full-demo.md), record each chapter separately and join them; keep one continuous conversation if possible.

## Edit and export

- Cut dead air and failed tool runs, but keep the question → evidence → answer chain.
- Speed up long indexing or scanning to 2–4×; never speed up the answer itself.
- Add lower-third titles for the guide name and rgctl version.
- Add captions/SRT for silent accessibility. The existing CLI videos use burned captions; for agent videos, a separate `.srt` is easier to maintain.

Export a broadly compatible MP4:

```bash
ffmpeg -i raw.mkv \
  -vf "scale=1920:1080:flags=lanczos" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart \
  recordings/<slug>.mp4
```

For a silent take, replace the audio options with `-an`.

## Publish

1. Put the final MP4 in `recordings/<slug>.mp4`.
2. Optionally add `recordings/<slug>.png` (poster) and `recordings/<slug>.srt`.
3. Update the manifest entry:
   ```json
   {
     "status": "recorded",
     "video": "recordings/<slug>.mp4",
     "poster": "recordings/<slug>.png",
     "captions": "recordings/<slug>.srt",
     "durationSec": 84,
     "recordedWith": "cursor",
     "rgctlVersion": "0.4.29",
     "fixtureCommit": "<short sha>"
   }
   ```
4. Run `pnpm check:agent-videos`.
5. Commit the recording and manifest together, and describe the take in the PR.

## What makes a good take

- The viewer can read the question and the answer without pausing.
- The agent uses rgctl evidence instead of guessing from file reads.
- The agent says when the graph is stale, a finding is inconclusive, or a symbol is unresolved.
- The final artifact is concrete: a caller list, a review note, a migration phase, a SARIF file, or a VEX statement.
- The recording feels like a person getting work done, not a product demo reading a feature list.

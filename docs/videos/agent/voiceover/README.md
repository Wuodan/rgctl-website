# Voiceover scripts

One narration script for every recorded guide video. These are **spoken voiceover scripts**, not subtitle files.

## Format

Each script has the same shape:

- **Intro** — first sentence must describe rgctl; second sentence must be specific to this video.
- **Walkthrough** — short spoken beats aligned to the questions and evidence on screen.
- **On screen** — the user questions or CLI chapters the viewer sees.
- **Outro** — invite the viewer to try rgctl and join the community.

The first intro line is intentionally consistent across the set:

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.

The second line changes per video. The outro is also consistent:

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community.

## Delivery

- Warm, direct, technically confident. Roughly 150 words per minute.
- Do not read commands character by character; let the screen show the command while the narration explains why it matters.
- Pause briefly after each question and after the key evidence lands.
- Timestamps are approximate; align them to the actual video, not the script.
- Record a clean 48 kHz WAV, normalize to about −16 LUFS, and keep music under the voice if used.

## File naming

`script/<slug>.md` matches the manifest slug. Generated audio goes to `sound/<slug>.mp3`.

```text
docs/videos/agent/voiceover/script/blast-radius-analysis.md
docs/videos/agent/voiceover/script/pr-review.md
docs/videos/agent/voiceover/script/cli-command-reference.md
```

The CLI Command Reference script covers the retained VHS walkthrough.

## When a video changes

Update the walkthrough beats and the intro hook to match the new evidence. Keep the rgctl intro sentence and the community/install outro stable so the series feels consistent.

## Build audio with ElevenLabs

The audio pipeline mirrors the video pipeline: markdown is the source of truth, generated stems are cached, and a manifest records what was built.

```bash
cp docs/videos/agent/voiceover/.env.voiceover.example \
  docs/videos/agent/voiceover/.env.voiceover
# set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID

pnpm voiceover:build -- --slug blast-radius-analysis --publish
```

Build every script:

```bash
pnpm voiceover:build:all
```

Test the parser and ffmpeg join without spending credits:

```bash
pnpm voiceover:build -- --slug blast-radius-analysis --dry-run
pnpm voiceover:build -- --slug blast-radius-analysis --mock
```

### ElevenLabs CLI

The pipeline uses the official [ElevenLabs CLI](https://github.com/elevenlabs/cli). It resolves in this order:

1. `ELEVENLABS_CLI` from `.env.voiceover`
2. `elevenlabs` on `PATH`
3. `npx --yes @elevenlabs/cli@1.13.0`

Install it if you build often:

```bash
npm install -g @elevenlabs/cli
# or: brew install elevenlabs/tap/elevenlabs
```

The CLI authenticates with `ELEVENLABS_API_KEY` (`xi-...`). Get a key and a voice ID from the ElevenLabs dashboard.

### Settings

| Variable | Default | Purpose |
|---|---|---|
| `ELEVENLABS_API_KEY` | — | API key; never commit |
| `ELEVENLABS_VOICE_ID` | — | Voice to narrate the series |
| `ELEVENLABS_MODEL` | `eleven_multilingual_v2` | ElevenLabs model |
| `ELEVENLABS_OUTPUT_FORMAT` | `mp3_44100_128` | Generated section format |
| `VOICEOVER_GAP_MS` | `350` | Pause between sections |
| `ELEVENLABS_CLI` | auto | Explicit CLI executable |

Voice style, stability, and similar settings are configured on the voice in the ElevenLabs dashboard. Keep the same voice across the series.

### Pipeline stages

1. Parse the `Intro`, `Beat`, and `Outro` blockquotes from each script.
2. Synthesize each section with `elevenlabs say` to `sound/<slug>/NN-<section>.mp3`.
3. Join the stems with the configured silence gap using `ffmpeg`.
4. Probe durations and write the combined `sound/<slug>.mp3`.
5. With `--publish`, update `manifest.json` with section timings and generation metadata.

Generated files:

```text
docs/videos/agent/voiceover/sound/<slug>/00-intro.mp3
docs/videos/agent/voiceover/sound/<slug>/01-beat-1.mp3
...
docs/videos/agent/voiceover/sound/<slug>.mp3   # deliverable
docs/videos/agent/voiceover/manifest.json
```

The per-section stems are ignored by git; the combined MP3 is the reviewable deliverable.

### Validate

```bash
pnpm voiceover:check
```

The validator checks that every script has Intro/Walkthrough/On screen/Outro, the standard rgctl intro, the install/community outro, and that any generated audio referenced by the manifest exists.

### Mux into a video

After aligning the narration to the edit:

```bash
ffmpeg -i docs/videos/agent/recordings/blast-radius-analysis.mp4 \
  -i docs/videos/agent/voiceover/sound/blast-radius-analysis.mp3 \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest \
  /tmp/blast-radius-analysis-voiced.mp4
```

Do not replace the published video until the voiceover has been reviewed.

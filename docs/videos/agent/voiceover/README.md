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

## DeepSeek TTS alternative

DeepSeek also has a Text-to-Speech API. It is much simpler than ElevenLabs: two
fixed voices (`stella`, default, and `tide`), ten languages, WAV/PCM output, and
no voice cloning or speed control.

Use it for short-form narration:

```bash
node docs/videos/agent/voiceover/deepseek-tts.mjs \
  --script docs/videos/agent/voiceover/short/blast-radius-analysis.md \
  --output docs/videos/agent/recordings/socials/shorts/blast-radius-analysis.voiceover.wav \
  --voice stella
```

The provider reads `DEEPSEEK_API_KEY` from `.env.voiceover`, falls back to
`.env.demo.agent`, and calls `POST https://api.deepseek.com/v1/tools/tts`.

Then pass the track to the native short renderer:

```bash
pnpm voiceover:shorts -- --slug blast-radius-analysis \
  --audio docs/videos/agent/recordings/socials/shorts/blast-radius-analysis.voiceover.wav \
  --force --publish
```

For a final, normalized social track, run the WAV through `loudnorm` before
muxing; the blast-radius example is normalized to about −17 dB mean.

### Validate

```bash
pnpm voiceover:check
```

The validator checks that every script has Intro/Walkthrough/On screen/Outro, the standard rgctl intro, the install/community outro, and that any generated audio referenced by the manifest exists.

## Compose the guide video with voiceover

Mux the generated narration into the guide video:

```bash
pnpm voiceover:compose -- --slug blast-radius-analysis --publish
pnpm voiceover:compose:all
```

Outputs:

```text
docs/videos/agent/recordings/socials/<slug>.mp4
docs/videos/agent/recordings/socials/manifest.json
```

The composed file carries both the original video and the voiceover audio. It is a **social export only**. The website continues to use the silent `recordings/<slug>.mp4`; `scripts/copy-demos.mjs` never copies `socials/` into the guide demos.

The current composition is intentionally simple:

- narration starts at the beginning of the video
- if narration is shorter, audio is padded with silence
- if narration is longer, the last video frame is held until the audio outro finishes

The renderer does not emit per-question timestamps yet, so review the composed video before publishing. Use the section timings in `manifest.json` to make editorial cuts if a beat needs to move.

The human-editable fallback is:

```bash
ffmpeg -i docs/videos/agent/recordings/blast-radius-analysis.mp4 \
  -i docs/videos/agent/voiceover/sound/blast-radius-analysis.mp3 \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest \
  /tmp/blast-radius-analysis-voiced.mp4
```

## Vertical shorts for YouTube, TikTok, and Reels

Build a native 1080×1920 short from the agent transcript:

```bash
pnpm voiceover:shorts -- --slug blast-radius-analysis --publish
pnpm voiceover:shorts:all
```

The short is **not a crop of the 16:9 guide**. It is rendered by `automation/renderer/short.html` from the transcript:

- persistent **WHY IT MATTERS** block at the top
- chat-only session, with the evidence panel removed
- one `rgctl` command at a time in a constrained **EVIDENCE** box at the bottom
- a short-specific vertical intro and outro, sized for Shorts/TikTok/Reels
- the first two question blocks by default

The audio is taken from `recordings/socials/<slug>.mp4`, or `sound/<slug>.mp3` when no social copy exists. It is padded/trimmed to the short's visual duration. To supply a different track:

```bash
pnpm voiceover:shorts -- --slug blast-radius-analysis --audio path/to/short-voiceover.mp3
```

Options:

```bash
# Keep four question blocks instead of two
pnpm voiceover:shorts -- --slug blast-radius-analysis --questions 4 --publish

# Render without audio (layout testing only)
pnpm voiceover:shorts -- --slug blast-radius-analysis --silent --publish
```

Outputs:

```text
docs/videos/agent/recordings/socials/shorts/<slug>.mp4
docs/videos/agent/recordings/socials/shorts/manifest.json
```

The manifest records the template, question count, commands shown, duration, aspect ratio, title, description, hashtags, and target platforms. The short-specific intro/outro copy lives in `short.html`, not in the long-form renderer.

## Full generation order

```bash
# 1. Build or record, in parallel where possible
pnpm agent:record:all
pnpm voiceover:build:all

# 2. Put them together
pnpm voiceover:compose:all

# 3. Vertical cutdowns
pnpm voiceover:shorts:all

# 4. Validate and deploy
pnpm check:agent-videos
pnpm build
```

Do not publish a composed video until the voiceover and cutdown have been reviewed.

# Social media exports

Voiced guide copies and vertical shorts live here. They are separate from the
silent guide recordings used by the website.

```text
socials/
├── <slug>.mp4                    # 16:9 guide + voiceover
├── <slug>.voiceover.mp3
├── manifest.json
└── shorts/
    ├── <slug>.mp4                # native 1080×1920 short + voiceover
    ├── <slug>.voiceover.wav
    └── manifest.json
```

## Blast radius example

- The 16:9 social copy uses a local `espeak-ng` placeholder narration.
- The short uses **DeepSeek TTS `stella`** with a dedicated 34s short script at
  `voiceover/short/blast-radius-analysis.md`.

Regenerate the short voice and video:

```bash
node docs/videos/agent/voiceover/deepseek-tts.mjs \
  --script docs/videos/agent/voiceover/short/blast-radius-analysis.md \
  --output docs/videos/agent/recordings/socials/shorts/blast-radius-analysis.voiceover.wav \
  --voice stella

pnpm voiceover:shorts -- --slug blast-radius-analysis \
  --audio docs/videos/agent/recordings/socials/shorts/blast-radius-analysis.voiceover.wav \
  --force --publish
```

The website copy step deliberately does **not** read this directory; guide pages
continue to use the silent recordings.

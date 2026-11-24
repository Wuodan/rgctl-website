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
    └── manifest.json
```

The blast-radius example was rendered with a local `espeak-ng` placeholder voice,
not ElevenLabs. Configure `docs/videos/agent/voiceover/.env.voiceover` and run:

```bash
pnpm voiceover:build -- --slug blast-radius-analysis --force --publish
pnpm voiceover:compose -- --slug blast-radius-analysis --force --publish
pnpm voiceover:shorts -- --slug blast-radius-analysis --force --publish
```

The website copy step deliberately does **not** read this directory; guide pages
continue to use the silent recordings.

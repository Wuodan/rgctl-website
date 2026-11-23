# Recordly evaluation

Evaluated [recordly.dev](https://recordly.dev/) for zoom animations, cursor polish, and whether it belongs in the automated agent-video pipeline.

## Verdict

**Use Recordly as an optional manual polish tool for real UI recordings. Do not make it the default automated renderer.**

The current Playwright/HTML renderer is a better fit for the 22 guide clips and CI: it is headless, deterministic, and already drives the transcript. Recordly is excellent at the editing layer, but it is a desktop Electron app with no supported CLI or headless export API.

For zooms inside our generated UI, add camera/zoom events to the renderer instead. For a flagship take recorded from a real Cursor/OpenCode window, a human can use Recordly afterwards.

## Feature fit

Recordly provides:

- automatic zoom suggestions from cursor activity, plus manual zoom regions
- smooth cursor movement, cursor size, motion blur, click bounce, cursor sway, and click effects
- timeline trimming, speed regions, annotations, webcam overlay, and frame styling
- MP4 and GIF export
- `.recordly` project files
- macOS, Windows, and Linux builds

Those are the right effects for a demo. The catch is how they are produced: Recordly is designed around recording a display/window and editing it in a GUI, not around accepting a structured transcript and rendering a deterministic composition.

## Automation assessment

| Question | Finding |
|---|---|
| Supported CLI? | No documented CLI for opening a project and exporting a video. |
| Headless export? | There is an internal smoke-export path (`RECORDLY_SMOKE_EXPORT=1`, `RECORDLY_SMOKE_EXPORT_PROJECT`, `RECORDLY_SMOKE_EXPORT_OUTPUT`) used by the project's export benchmarks. It opens an Electron editor and drives export, so it needs a display. |
| Stable project format? | `.recordly` is JSON with `version`, `videoPath`, and `editor.zoomRegions`, but the schema changes between releases. |
| CI-friendly? | Not currently. Building native helpers, running Electron, and driving an internal test hook is too much for a docs video pipeline. |
| Linux? | AppImage is available, but cursor hiding is not supported; exports can show both the real cursor and the rendered cursor overlay. AppImage sandbox/FUSE issues are documented by the project. |
| License? | AGPLv3. Using it to edit a video is fine; copying its code into the website or shipping a modified build has AGPL obligations. |

The internal smoke export is interesting: it can load a project, render it, and write MP4. A future experiment could generate a `.recordly` project with manual zoom regions and invoke that path under Xvfb. That would be a pinned, version-specific integration, not a supported API. It is not worth doing before we have real recordings worth polishing.

## Auto-zoom caveat for our videos

Auto-zoom suggestions are driven by cursor activity captured by Recordly. Our Playwright video has no OS cursor and no cursor telemetry, so Recordly cannot infer where to zoom. We would have to:

- record a real desktop agent window with Recordly, or
- generate manual zoom regions in a `.recordly` project, or
- record synthetic cursor telemetry alongside the Playwright video.

The first option loses the automation benefit. The second is possible but version-sensitive. The third is more work than adding camera transforms to our renderer.

## Recommendation

1. Keep the automated pipeline as-is: transcript → HTML renderer → Playwright → ffmpeg.
2. Add zoom/cursor events to the renderer:
   ```json
   {"type":"camera","scale":1.35,"focus":{"x":0.62,"y":0.35},"durationMs":650}
   ```
   Wrap the stage in a camera element, animate `transform: scale() translate()`, and draw a synthetic cursor when a tool card or answer needs emphasis.
3. Use Recordly manually for the full demo **only if** we record a real OpenCode/Cursor window. It is a good editor for that footage.
4. If we later want Recordly in automation, pin a commit, generate a project with manual zooms, run the smoke export under Xvfb, and verify the output. Treat it as experimental and keep it out of the default CI path.

## Official source warning

The official project is the [Recordly GitHub repository](https://github.com/webadderallorg/Recordly) and [recordly.dev](https://recordly.dev/), under AGPLv3. Search results also surface `recordly.vip`, which advertises a paid one-time license. That is not the repository's download path. Use the official GitHub releases, verify the build, and do not upload credentials or payment details to a lookalike domain.

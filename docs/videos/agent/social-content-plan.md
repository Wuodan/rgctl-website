# Social content automation

How to turn the agent-video work into social content without turning the project into a manual video-editing job.

## The three layers

| Layer | Options | Fit for rgctl |
|---|---|---|
| **Create the asset** | Existing Playwright/HTML renderer; Remotion; Revideo; OpusClip/Descript/Canva; Recordly for manual polish | Start with Playwright; add Remotion only for motion-graphics templates |
| **Voice and captions** | Silent + SRT; OpenAI TTS; ElevenLabs; Piper; Whisper for transcript timing | Silent + captions first; voiceover later |
| **Publish and schedule** | Postiz (self-hosted, AGPL); Mixpost (self-hosted, MIT/Pro); Ayrshare (managed API); direct platform APIs | Postiz self-hosted for control; Ayrshare if we do not want to host |
| **Orchestrate** | DSH agent; GitHub Actions; n8n/Temporal/Trigger.dev | DSH + GitHub Actions + a scheduler API/MCP |

## Recommended stack

1. **Playwright/HTML for the first social templates.** We already have a deterministic renderer and the brand system. Add 9:16 and 1:1 wrappers around the same transcript instead of building a second video pipeline.
2. **Remotion only when we need real motion design.** It is code-driven, parameterized, and agent-friendly, but it adds a React video project and a license decision. For the first clips, CSS transforms and ffmpeg are enough.
3. **Postiz for publishing.** It is open source, self-hostable, supports LinkedIn Pages, X, YouTube, Bluesky, Mastodon, and more, and exposes an API/MCP/agent surface. It also has approvals and analytics. Use the official [Postiz docs](https://docs.postiz.com/) and [GitHub repo](https://github.com/gitroomhq/postiz-app).
4. **Ayrshare as the managed fallback.** If we do not want to operate Postiz, Ayrshare provides one API for 14+ networks, with a $149/month Premium plan at the time of writing. That is convenient but more expensive than self-hosting for one brand.
5. **Recordly for the manual flagship edit.** Use it only after recording a real agent UI; it is not part of the automated path.

## What the agent can own

| Stage | Agent-owned? | Gate |
|---|---|---|
| Pick the guide and hook | Yes | Human selects the weekly theme |
| Write the short script and caption | Yes | Human reviews claims and tone |
| Render 16:9 / 9:16 / 1:1 assets | Yes | Automated checks for duration, size, text overflow |
| Generate SRT and thumbnail | Yes | Visual spot-check |
| Create a scheduled draft | Yes | Human approves first posts |
| Publish autonomously | Later | Only evergreen, pre-approved content with rate limits |
| Read analytics and propose next hooks | Yes | Human decides the calendar |

The realistic target is **L2/L3 autonomy**: the agent creates the assets and schedules drafts, but a human approves the post before it goes live. Fully autonomous posting is a brand and accuracy risk, especially for security claims.

## Content model

Keep one source of truth per guide:

```json
{
  "slug": "blast-radius-analysis",
  "sourceVideo": "recordings/blast-radius-analysis.mp4",
  "transcript": "transcripts/blast-radius-analysis.json",
  "formats": ["16:9", "9:16", "1:1"],
  "hook": "Change one method. See every caller before you edit.",
  "caption": "rgctl maps the blast radius before your agent touches the code.",
  "hashtags": ["#rust", "#devtools", "#codingagents"],
  "cta": "Install rgctl: https://rgctl.io/install/",
  "approval": "required",
  "channels": ["linkedin-page", "x", "youtube-shorts"]
}
```

Generate variants from that file rather than maintaining separate copies of the copy and timing.

## Pipeline

```text
question script / recording
        ↓
content brief (hook, caption, CTA, channels)
        ↓
render 16:9 + 9:16 + 1:1
        ↓
captions / thumbnail / QA
        ↓
approval (PR or scheduler)
        ↓
schedule via Postiz API/MCP
        ↓
analytics → next brief
```

Use UTM-tagged links per channel and keep the raw assets in an artifact store, not in git. Check in the content brief, the final caption, and the approved MP4; keep drafts in the ignored work tree.

## Platform notes

- **LinkedIn Page:** use a scheduler or the LinkedIn Posts API with an approved app. Direct API access takes app review; a self-hosted scheduler avoids building OAuth and scheduling yourself.
- **X:** API pricing is pay-per-usage and rate limits matter. A scheduler is simpler than posting directly.
- **YouTube Shorts:** long-lived OAuth and quota; schedule through the same tool.
- **TikTok/Instagram:** Content Posting/Graph API access and app review; treat as optional later channels.
- **Bluesky/Mastodon:** easy API access and a good fit for the open-source audience.

## Risks and guardrails

- No fabricated security claims; link to the guide or repo evidence.
- No auto-posting until the first batch is reviewed.
- Use licensed music or no music; do not use unlicensed tracks.
- Keep personal LinkedIn profiles out of automated posting unless explicitly authorized.
- Store social credentials in secrets, scoped to the scheduler, not in the repo or `.env.demo.agent`.
- Add rate limits and duplicate-post checks.

## Next implementation step

Add a `docs/social/` or `docs/videos/agent/social/` catalog with one brief per guide, a `pnpm social:render` command that produces 9:16/1:1 variants from the existing transcript, and a Postiz adapter. Start with three posts, measure, then batch.

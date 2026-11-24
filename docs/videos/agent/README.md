# Agent videos

Working directory for **coding-agent walkthroughs** — the counterpart to the CLI tapes in [`docs/videos`](../README.md).

The CLI videos show the commands. These videos should show a user asking an agent a real question and the agent using rgctl to answer it, explain the evidence, and make a safer change.

## Start here

- **New contributor:** [CONTRIBUTING.md](CONTRIBUTING.md) — setup, agent configuration, script and PR workflow.
- **Agents:** [AGENTS.md](../../AGENTS.md) — end-to-end reproduction instructions for agents.
- **Recording a take:** [RECORDING.md](RECORDING.md) — screen layout, capture settings, editing, and export.
- **Voiceover scripts and audio:** [voiceover/README.md](voiceover/README.md) — narration scripts, ElevenLabs audio, composed guide videos, and vertical shorts.
- **Agent setup:** [config/README.md](config/README.md) — one-command fixture setup and per-agent notes.
- **Script template:** [TEMPLATE.md](TEMPLATE.md).
- **Automated recorder:** [automation/README.md](automation/README.md) — transcript-first Claude/OpenCode pipeline.
- **Demo credentials:** copy [.env.demo.agent.example](.env.demo.agent.example) to `.env.demo.agent` and add the DeepSeek key; the real file is ignored.
- **Social content plan:** [social-content-plan.md](social-content-plan.md) — options for autonomous creation, scheduling, and approval.
- **Validate:** `pnpm check:agent-videos`.

## Layout

```text
docs/videos/agent/
├── .env.demo.agent.example # DeepSeek credentials/settings template
├── automation/             # transcript-first recorder + renderer
├── config/                 # per-agent setup, OpenCode provider sample
├── manifest.json           # guide → script mapping
├── recordings/             # silent guide MP4s used by the site
│   └── socials/            # voiced 16:9 copies and 1080x1920 shorts
├── scripts/                # one question script per guide
│   ├── agent-skill.md
│   ├── full-demo.md        # optional long-form chaptered script
│   └── …
└── transcripts/            # published agent event logs
```

## Setup checklist

- [x] Working directory and 22 guide scripts (plus the full demo).
- [x] Per-agent setup notes in [config/README.md](config/README.md).
- [x] One-command fixture prep in [setup-demo.sh](setup-demo.sh).
- [x] Transcript-first recorder (`pnpm agent:record`) with a mock smoke test and Claude adapter.
- [x] DeepSeek credential template for Claude Code and OpenCode.
- [x] Manifest validator (`pnpm check:agent-videos`) wired into the website workflow.
- [ ] Record and commit the take for each script.

## Recording setup

1. Install rgctl and the agent pack (`rgctl -r example/coolstore-weblogic install --skill --tools cursor,claude,codex,antigravity,agents`).
2. Prepare the fixture. Most scripts use `example/coolstore-weblogic` from `scripts/fetch-profile-repos.sh`; the markdown script uses `example/k8s-website` and `tests/fixtures/markdown-context`.
3. Index the fixture once with the flags noted in the script. For temporal scripts (`ci-policy-checks`, `pr-review`), create the base snapshot before starting the take.
4. Open the coding agent in the fixture and ask the script questions verbatim.
5. Capture both the chat and the terminal/tool activity. The answer should be understandable without seeing every command, but the evidence should be visible.

Each script is derived from the guide's use cases; the questions are written in the user's voice, not as CLI commands.

## Question style

- Ask as a user would: outcomes and risk, not command syntax.
- Let the agent choose the rgctl command and the output format.
- Follow up for evidence, trade-offs, and the next action.
- Do not leak the command or the expected JSON shape in the prompt.

## Script index

| Guide | Questions | Script |
|---|---:|---|
| [Agent pack (skills)](/docs/guides/agent-skill/) | 5 | [`agent-skill.md`](scripts/agent-skill.md) |
| [Blast Radius Analysis](/docs/guides/blast-radius-analysis/) | 4 | [`blast-radius-analysis.md`](scripts/blast-radius-analysis.md) |
| [CI Policy Checks](/docs/guides/ci-policy-checks/) | 4 | [`ci-policy-checks.md`](scripts/ci-policy-checks.md) |
| [CLI Command Reference & Architecture Guide](/docs/guides/cli-command-reference/) | 4 | [`cli-command-reference.md`](scripts/cli-command-reference.md) |
| [Clone Detection](/docs/guides/clone-detection/) | 4 | [`clone-detection.md`](scripts/clone-detection.md) |
| [Community Detection](/docs/guides/community-detection/) | 4 | [`community-detection.md`](scripts/community-detection.md) |
| [Dependency Injection and Frameworks](/docs/guides/dependency-injection-and-frameworks/) | 4 | [`dependency-injection-and-frameworks.md`](scripts/dependency-injection-and-frameworks.md) |
| [Discovering and Indexing a Codebase](/docs/guides/discovering-and-indexing/) | 5 | [`discovering-and-indexing.md`](scripts/discovering-and-indexing.md) |
| [Exporting Graphs](/docs/guides/exporting-graphs/) | 4 | [`exporting-graphs.md`](scripts/exporting-graphs.md) |
| [Graph Metrics](/docs/guides/graph-metrics/) | 4 | [`graph-metrics.md`](scripts/graph-metrics.md) |
| [HTTP Server and Dashboard](/docs/guides/http-server-and-dashboard/) | 4 | [`http-server-and-dashboard.md`](scripts/http-server-and-dashboard.md) |
| [Hybrid CPG](/docs/guides/hybrid-cpg/) | 4 | [`hybrid-cpg.md`](scripts/hybrid-cpg.md) |
| [Inspecting CFG, PDG, and Dominance](/docs/guides/inspecting-cfg-pdg-dominance/) | 4 | [`inspecting-cfg-pdg-dominance.md`](scripts/inspecting-cfg-pdg-dominance.md) |
| [Markdown Context Graph](/docs/guides/markdown-context-graph/) | 5 | [`markdown-context-graph.md`](scripts/markdown-context-graph.md) |
| [Migration Planning](/docs/guides/migration-planning/) | 4 | [`migration-planning.md`](scripts/migration-planning.md) |
| [Program Slicing](/docs/guides/program-slicing/) | 4 | [`program-slicing.md`](scripts/program-slicing.md) |
| [Pull Request Review](/docs/guides/pr-review/) | 4 | [`pr-review.md`](scripts/pr-review.md) |
| [Semantic Search](/docs/guides/semantic-search/) | 4 | [`semantic-search.md`](scripts/semantic-search.md) |
| [Structured graph queries](/docs/guides/structured-query/) | 5 | [`structured-query.md`](scripts/structured-query.md) |
| [Single-Advisory Vulnerability Reachability](/docs/guides/vulnerability-and-osv-analysis/) | 4 | [`vulnerability-and-osv-analysis.md`](scripts/vulnerability-and-osv-analysis.md) |
| [Batch Vulnerability Scanning, OSV Fetch & SARIF](/docs/guides/vulnerability-reachability/) | 5 | [`vulnerability-reachability.md`](scripts/vulnerability-reachability.md) |
| [Watch mode and incremental update](/docs/guides/watch-mode/) | 4 | [`watch-mode.md`](scripts/watch-mode.md) |
| **Full agent demo** (chaptered) | 7 | [`full-demo.md`](scripts/full-demo.md) |

## Adding a script

Start from [TEMPLATE.md](TEMPLATE.md), keep the same three sections (Guide, Fixture, Goal → Questions → What the agent should show), and add the guide to `manifest.json`. Keep the questions in the user's voice; the expected evidence can mention the rgctl command the agent should reach for. Run `pnpm check:agent-videos` before opening the PR.

# Contributing an agent video

This directory holds the question scripts for coding-agent walkthroughs. A script is the source of truth for a recording: it should sound like a user talking to an agent, not like a CLI tutorial.

## Quick start

From the website repo:

```bash
# Product repo is a sibling checkout at ../rbuilder by default.
./docs/videos/agent/setup-demo.sh --agent cursor

# Or install the pack for several agents:
./docs/videos/agent/setup-demo.sh --agent cursor,claude,codex
```

The setup script:

1. Finds `rgctl` on `PATH` or uses `$RGCTL_REPO/target/release/rgctl`.
2. Installs the embedded agent pack into the fixture with `rgctl install --skill`.
3. Indexes the fixture with `discover` (skip with `--skip-index`).
4. Prints the fixture, agent tools, and graph status so the take starts from a known state.

Useful overrides:

| Variable | Default | Purpose |
|---|---|---|
| `FIXTURE` | `example/coolstore-weblogic` | Repo to demo |
| `RGCTL_REPO` | `../rbuilder` | Product checkout that owns the fixture |
| `RGCTL_BIN` | discovered | Explicit rgctl binary |
| `AGENT_TOOLS` | `cursor` | Comma-separated `--tools` ids |
| `INDEX_ARGS` | `-l java --with-git` | Extra arguments for `discover` |
| `SKIP_INDEX` | `0` | Set to `1` to leave indexing to the recorder |

## Agent configuration

The pack is generated into the fixture; do **not** commit `.cursor/`, `.claude/`, `.agents/`, or generated command files from the demo fixture. Run `rgctl install --list-agents` to see the exact destination for each adapter.

`$FIXTURE_DIR` below is the absolute path printed by `setup-demo.sh`. If you are working from the product repo instead, use `-r example/coolstore-weblogic`.

| Agent | Install | Launch / UI notes |
|---|---|---|
| Cursor | `rgctl -r "$FIXTURE_DIR" install --skill --tools cursor` | Open the fixture folder, use **Agent** mode, allow the terminal actions the script needs, and keep the chat and terminal visible. Generated files live under `.cursor/skills/` and `.cursor/commands/`. |
| Claude Code | `rgctl -r "$FIXTURE_DIR" install --skill --tools claude` | Run `claude` in the fixture. Approve tool use as it happens. Generated files live under `.claude/skills/`. |
| Codex | `rgctl -r "$FIXTURE_DIR" install --skill --tools codex,agents` | Run `codex` in the fixture. Codex, `agents`, and Zed share `.agents/skills/`. |
| Antigravity | `rgctl -r "$FIXTURE_DIR" install --skill --tools antigravity` | Open the fixture in Antigravity and use its agent panel. Run `rgctl install --list-agents` for the current path. |

For a reproducible take, confirm the agent can see the same `rgctl` binary as your shell:

```bash
which rgctl
rgctl --version
```

If the agent runs in a restricted shell, make sure the directory containing `rgctl` is on its `PATH`; otherwise it will fall back to reading files and the recording will not demonstrate the graph.

### Index profiles

Most scripts use the default `discover` profile. Some questions need a little more:

- **Metrics / churn:** `--with-git` (the setup script includes it by default).
- **Field mutations / CPG:** `--with-cfg` (the guide explains when this is required).
- **Semantic search:** run `rgctl semantic index` after discovery.
- **Dashboard:** `serve --with-universe` for the architecture view.
- **Temporal scripts:** `ci-policy-checks` and `pr-review` need a base snapshot and a head snapshot; follow the base/head steps in those guides. Keep `.rgctl-base/` out of commits.

## Add or update a script

1. Pick the guide under `docs/guides/` and read its **Use Cases** section.
2. Copy [TEMPLATE.md](TEMPLATE.md) to `scripts/<guide-slug>.md`.
3. Write 4–5 questions in the user's voice. Do not put `rgctl` flags or expected JSON in the questions.
4. Add or update the entry in [manifest.json](manifest.json):
   ```json
   {
     "slug": "<guide-slug>",
     "title": "<guide title>",
     "guide": "/docs/guides/<guide-slug>/",
     "script": "scripts/<guide-slug>.md",
     "fixture": "example/coolstore-weblogic",
     "questions": 4,
     "status": "scripted"
   }
   ```
5. Run the validator:
   ```bash
   pnpm check:agent-videos
   ```
6. Smoke-test the renderer without a model key:
   ```bash
   pnpm agent:record --slug <guide-slug> --agent mock
   ```
7. For a real take, add `DEEPSEEK_API_KEY` to the ignored `.env.demo.agent`, then:
   ```bash
   pnpm agent:record --slug <guide-slug> --agent claude --publish
   ```
8. Open a PR. The validator also runs in the website workflow; never commit `.env.demo.agent` or `.work/`.

## Recording handoff

Read [RECORDING.md](RECORDING.md) before the first take. When a recording is ready:

- Put the MP4 in `recordings/<slug>.mp4` (poster and SRT optional).
- Add `video`, `poster`, and `captions` paths plus `durationSec`, `recordedWith`, `rgctlVersion`, and `fixtureCommit` to the manifest entry.
- Change `status` from `scripted` to `recorded`.
- Keep raw takes under `recordings/.work/`; it is gitignored.

## PR checklist

- [ ] The script maps to an existing guide and use case.
- [ ] Questions sound like a user, not a command reference.
- [ ] The expected evidence is something the viewer can actually see.
- [ ] The fixture and any pre-indexing steps are stated.
- [ ] `manifest.json` is valid and `pnpm check:agent-videos` passes.
- [ ] No tokens, private repositories, customer names, or personal paths are visible.
- [ ] The recording is 16:9, readable at 1080p, and named after the script slug.

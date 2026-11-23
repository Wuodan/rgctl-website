# Demo configuration

These are the settings that make the agent videos reproducible. The generated agent pack belongs in the **fixture**, not in this repo.

## Prerequisites

- `rgctl` on `PATH`, or `$RGCTL_REPO/target/release/rgctl`
- A sibling product checkout (`../rbuilder`) with `example/coolstore-weblogic`
- `git` and `jq`
- One of: Cursor, Claude Code, Codex, or Antigravity

## Credentials

Copy `.env.demo.agent.example` to `.env.demo.agent` (ignored) and add the DeepSeek key. Claude Code uses the Anthropic-compatible endpoint; OpenCode uses the OpenAI-compatible endpoint. The adapter loads the file directly, so you do not need to export it in your shell.

## One-command setup

```bash
./docs/videos/agent/setup-demo.sh --agent cursor
```

Inside the product checkout (`../rbuilder`), the script runs:

```text
rgctl -r example/coolstore-weblogic install --skill --tools cursor
rgctl -r example/coolstore-weblogic discover . -l java --with-git
rgctl -r example/coolstore-weblogic status
```

The first command writes the generated skill and command files into the fixture. The second builds the graph. The third proves the snapshot exists before recording.

## Agent launcher

| Agent | Command | Generated pack |
|---|---|---|
| Cursor | `cursor example/coolstore-weblogic` (from `../rbuilder`) | `.cursor/skills/`, `.cursor/commands/` |
| Claude Code | `cd example/coolstore-weblogic && claude` (from `../rbuilder`) | `.claude/skills/` |
| Codex | `cd example/coolstore-weblogic && codex` (from `../rbuilder`) | `.agents/skills/` (shared with `agents`/Zed) |
| Antigravity | open `example/coolstore-weblogic` (from `../rbuilder`) | run `rgctl install --list-agents` for the path |

Confirm the agent sees the binary:

```bash
which rgctl
rgctl --version
```

If the agent's terminal has a different `PATH`, add the directory containing `rgctl` to that shell before launching, or use `RGCTL_BIN=/absolute/path/to/rgctl` with the setup script.

## Index profiles

| Script type | Index |
|---|---|
| Most guides | `discover . -l java --with-git` |
| Field mutations / CPG | add `--with-cfg` |
| Semantic search | `rgctl semantic index` after discovery |
| Dashboard | `serve --with-universe` |
| CI policy / PR review | base snapshot + head snapshot; follow the guide |
| Markdown graph | `discover .` on `example/k8s-website`, plus the markdown fixture |

Do not commit `.rgctl/`, `.rgctl-base/`, or generated agent directories from a demo fixture.

## Base snapshots for temporal guides

`ci-policy-checks` and `pr-review` compare a base snapshot with a head snapshot. The guides define the exact commands and scopes; the recording setup only needs to leave the base artifact in place and a clean branch checked out before the take.

## Security

- Use the demo fixture; never a private customer repository.
- Do not show API keys, tokens, SSH agents, or personal paths.
- Prefer explicit terminal approvals so the recording shows the agent's intent; if you auto-approve for speed, review the commands before the take.

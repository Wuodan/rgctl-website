# Pull Request Review — Voiceover Script

**Video:** [`../../recordings/pr-review.mp4`](../../recordings/pr-review.mp4)  
**Runtime:** ~94s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent reviews sshaaf/coolstore-weblogic PR #2 structurally, using the real PR diff and graph deltas.

## Walkthrough

### Beat 1 — A real PR

> The agent reviews sshaaf/coolstore-weblogic PR #2 against sshaaf/main. It sees 42 changed symbols, 16 added call edges, and 20 removed edges.

### Beat 2 — Read the deltas

> It checks for retargeted calls and finds none. The apparent caller changes are re-attributions after line shifts, not replacements. It also finds that the policy gate is vacuous because the policy domain IDs map to no nodes.

### Beat 3 — Write the review

> The final review covers behavior changes, test gaps, and the one policy finding that matters. That is a structural review, not a line-by-line diff.

## On screen

- “Review PR #2 from sshaaf/coolstore-weblogic against sshaaf/main: which call paths changed and which callers were rewired?”
- “Are there retargeted calls where an old method was replaced by a new one?”
- “Does PR #2 introduce any new architecture violations compared with sshaaf/main?”
- “Summarize the risk in four sections for the PR description.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.

# CI Policy Checks — Voiceover Script

**Video:** [`../../recordings/ci-policy-checks.mp4`](../../recordings/ci-policy-checks.mp4)  
**Runtime:** ~33.2s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent checks a branch for new architecture-policy violations and separates fresh regressions from legacy debt.

## Walkthrough

### Beat 1 — New versus old

> The agent starts from a branch and asks a temporal question: did this change introduce a policy violation compared with main? It distinguishes new findings from pre-existing debt instead of failing on the backlog.

### Beat 2 — Explain the gate

> It shows the rule, the symbol, and the file that triggered it, then explains how to scope the gate to new violations only. The viewer sees a PR check that is actionable, not just red.

### Beat 3 — Why it works

> The gate is built on base and head graph states. A diff tells you what changed; the graph tells you what it now violates.

## On screen

- “This branch changes `ShoppingCartService`. Did it introduce new policy violations compared with main?”
- “Which findings are new, which were already on main, and which were resolved?”
- “If I only want to block new violations, how should we scope the gate?”
- “Explain the failing rule and the exact symbol/file that triggered it so I can fix it.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.

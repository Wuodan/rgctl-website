# Migration Planning — Voiceover Script

**Video:** [`../../recordings/migration-planning.mp4`](../../recordings/migration-planning.mp4)  
**Runtime:** ~49.4s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent builds a dependency-aware migration plan and explains which part of a monolith should be extracted first.

## Walkthrough

### Beat 1 — Plan from dependencies

> The agent generates a migration plan and explains why the first package is first. Coupling, centrality, and blast radius drive the order.

### Beat 2 — Group the work

> The plan is grouped into phases that preserve dependency order instead of inventing sprints from package names.

### Beat 3 — Call out the risk

> The highest-risk extraction is named explicitly, with the preparation needed before anyone cuts the seam. Planning a migration is mostly knowing what not to move yet.

## On screen

- “Generate a migration plan for this monolith. What should we extract first?”
- “Why is that package first? Show the dependency and risk evidence.”
- “Group the plan into phases we can fit into sprints.”
- “Which extraction is highest risk, and what should we do before it?”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.

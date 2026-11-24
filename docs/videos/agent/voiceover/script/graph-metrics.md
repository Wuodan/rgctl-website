# Graph Metrics — Voiceover Script

**Video:** [`../../recordings/graph-metrics.mp4`](../../recordings/graph-metrics.mp4)  
**Runtime:** ~49.9s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent ranks structural bottlenecks and combines graph centrality with git churn to choose what to refactor first.

## Walkthrough

### Beat 1 — Rank the structure

> The agent ranks functions by PageRank, betweenness, and churn, while filtering test and generated code. The ranking exposes the structural bottlenecks.

### Beat 2 — Explain the score

> It explains why priceShoppingCart ranks where it does and which functions bridge otherwise separate modules. A number is only useful when the viewer can see the signal behind it.

### Beat 3 — Turn it into a plan

> The final output is a refactoring priority: hotspots, review targets, and the functions that deserve a blast-radius check before anyone edits them.

## On screen

- “Which functions are the structural bottlenecks in this codebase?”
- “Rank the top files by PageRank plus recent git churn.”
- “Which functions bridge otherwise separate modules?”
- “Explain in plain language why `priceShoppingCart` ranks where it does.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.

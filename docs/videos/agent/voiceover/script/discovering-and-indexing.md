# Discovering and Indexing a Codebase — Voiceover Script

**Video:** [`../../recordings/discovering-and-indexing.mp4`](../../recordings/discovering-and-indexing.mp4)  
**Runtime:** ~76.9s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent builds an index for a Java codebase, verifies what the graph contains, and shows how to scope indexing for a larger repository.

## Walkthrough

### Beat 1 — Build the right index

> The agent indexes the Java backend and reports node and edge counts. It shows how to scope discovery to one language instead of indexing a frontend nobody asked about.

### Beat 2 — Add the right passes

> Git churn, CFG, and multi-repo merge are choices, not defaults. The agent explains which pass each question needs and verifies the resulting snapshot before trusting an answer.

### Beat 3 — Prove freshness

> Status is part of the answer. The graph is useful only when the agent knows whether it is current, stale, or missing.

## On screen

- “Index this repository for agent use and tell me what you found.”
- “Index only the Java backend, not the Angular frontend, and explain what changed.”
- “I need git churn and co-change data for a hotspot review. What should you enable?”
- “This is a two-service monorepo. How would you index and merge them?”
- “Verify the index is current and give me the function and edge counts.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.

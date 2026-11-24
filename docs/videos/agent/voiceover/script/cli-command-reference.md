# CLI Command Reference & Architecture Guide — Voiceover Script

**Video:** [`../../../user-guide-cli.mp4`](../../../user-guide-cli.mp4)  
**Runtime:** ~76.6s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> This CLI walkthrough tours the command surface behind those agent answers, from indexing and lookup to call graphs, slicing, security, and review.

## Walkthrough

### Beat 1 — Index and inspect

> The walkthrough begins with discover, status, and find: build the graph, prove it is current, and resolve symbols into deterministic JSON.

### Beat 2 — Traverse and analyze

> Callers, blast radius, communities, and metrics turn the graph into impact and architecture. The CLI is designed so an agent can request a compact answer without reading the repository.

### Beat 3 — Go deeper

> CFG and PDG inspection, program slicing, clone detection, semantic search, policy checks, and review show the same graph underneath. Finally, the agent pack connects all of it to an AI coding agent.

## On screen (CLI chapters)

- 0:00 — Index once: `discover`
- 0:06 — Status and symbol lookup: `status`, `find`
- 0:11 — Call-graph traversal: `callers`
- 0:16 — Impact before editing: `blast-radius`
- 0:24 — Communities and metrics
- 0:33 — CFG and field mutations: `inspect`, `cpg`
- 0:40 — Backward program slicing
- 0:47 — Clone detection
- 0:53 — Offline semantic search
- 0:58 — Policy checks and migration relations
- 1:07 — PR call-path deltas and agent pack install

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.

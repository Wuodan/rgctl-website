# Community Detection — Voiceover Script

**Video:** [`../../recordings/community-detection.mp4`](../../recordings/community-detection.mp4)  
**Runtime:** ~59s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent maps metasfresh — roughly 960,000 nodes and 3 million edges — into functional communities and tests whether those communities are usable service boundaries.

## Walkthrough

### Beat 1 — A very large graph

> Metasfresh is a 960,000-node ERP with about 3 million edges. The agent first maps functional communities, then checks whether those communities line up with order-to-cash, procure-to-pay, manufacturing, and inventory.

### Beat 2 — Read the boundaries

> Community labels are noisy, so the agent verifies domains through module structure and graph evidence. Modularity is only about 0.553, which means the boundaries are soft, not clean service seams.

### Beat 3 — Find the seam

> The top betweenness bridges cluster in material disposition, the planning kernel linking purchase, production, inventory, and shipment. That is the worst place to cut and the strongest evidence that architecture needs graph-level analysis.

## On screen

- “Map this codebase into functional communities. Which ones look like the order-to-cash domain?”
- “Which community has the most cross-boundary calls, and what does that imply for a codebase this size?”
- “Which communities look like good service-extraction candidates?”
- “Explain this architecture to a new engineer in five sentences.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.

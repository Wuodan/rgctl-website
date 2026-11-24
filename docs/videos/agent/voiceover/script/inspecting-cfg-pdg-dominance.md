# Inspecting CFG, PDG, and Dominance — Voiceover Script

**Video:** [`../../recordings/inspecting-cfg-pdg-dominance.mp4`](../../recordings/inspecting-cfg-pdg-dominance.mp4)  
**Runtime:** ~35.8s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent inspects control flow, program dependencies, and dominance when a slice or flow result needs a human-readable explanation.

## Walkthrough

### Beat 1 — When a slice looks wrong

> The agent walks the control-flow graph of priceShoppingCart, including branches and loops, and follows the program dependence graph back from a specific line.

### Beat 2 — Check dominance

> The dominator tree explains which block guards the discount logic. That is the difference between reading source order and knowing which statement actually controls reachability.

### Beat 3 — Correct the answer

> The agent uses the raw graph to confirm or reject the earlier slice. When the evidence disagrees, the graph wins.

## On screen

- “Walk me through the control flow of `priceShoppingCart`, including branches and loops.”
- “At line 68, which statements contribute to `sc`, and why?”
- “Show the dominator tree and explain which block guards the discount logic.”
- “This slice result looks wrong. Inspect the CFG/PDG and tell me whether the edge is real.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.

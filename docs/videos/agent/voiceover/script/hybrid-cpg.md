# Hybrid CPG — Voiceover Script

**Video:** [`../../recordings/hybrid-cpg.mp4`](../../recordings/hybrid-cpg.mp4)  
**Runtime:** ~78.8s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent follows field mutations and data flow through the hybrid code property graph.

## Walkthrough

### Beat 1 — Follow mutations

> The agent traces every place a ShoppingCart field is mutated and follows quantity through the pricing path. The CFG supplies statement-level evidence that a call graph cannot.

### Beat 2 — See both directions

> Calls give the neighborhood; data flow gives the dependencies inside each function. The agent uses both views instead of treating a CPG as one giant diagram.

### Beat 3 — Export the proof

> The CPG can be exported for another graph tool. That makes the analysis inspectable outside the agent conversation.

## On screen

- “Trace every place the `ShoppingCart` fields are mutated.”
- “Show the data flow of `quantity` through `priceShoppingCart`.”
- “What calls does `priceShoppingCart` make, and who calls it?”
- “Export the CPG so I can inspect it in an external graph tool.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.

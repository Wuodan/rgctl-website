# Agent pack (skills) — Voiceover Script

**Video:** [`../../recordings/agent-skill.mp4`](../../recordings/agent-skill.mp4)  
**Runtime:** ~67.3s  
**Delivery:** warm, direct, ~150 wpm. Pause after each question and let the evidence land.

## Intro (0:00–0:06)

> rgctl is an open-source, MIT-licensed code knowledge graph built in Rust for AI coding agents.
>
> In this walkthrough, a coding agent uses the installed rgctl skill to assess a refactor, plan tests, compare migration candidates, and review the result against architecture rules.

## Walkthrough

### Beat 1 — Start with the change

> The agent starts with a rename of priceShoppingCart. Before it edits anything, it asks the graph for callers and blast radius, so the first answer is evidence rather than a guess.

### Beat 2 — Make the work concrete

> When the conversation moves to porting and tests, the agent uses call structure, slices, and real branches to explain what must be preserved. It then compares safe extraction candidates and reviews the current diff against architecture rules.

### Beat 3 — The difference

> The point is not that the agent can run commands. It is that every recommendation is anchored to resolved symbols, call edges, and policy evidence that grep cannot reconstruct.

## On screen

- “I'm about to rename `priceShoppingCart` and change its signature. Before I edit, tell me every caller and what else could break.”
- “Use the graph to explain the cart pricing flow so I can port the same logic to Go.”
- “Write a test plan for the pricing path that covers its real branches, not just line coverage.”
- “Which parts of this monolith are the safest to extract first, and which are too coupled to touch?”
- “Review the current diff against the architecture rules and flag anything new.”

## Outro (last ~10s)

> Try rgctl at rgctl.io/install. Star the repository at github.com/rgctl/rgctl, and join the community on Discord at rgctl.io/community. If you build something with rgctl, we would love to see it.
